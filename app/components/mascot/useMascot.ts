'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  getAnchorOffscreenPosition,
  getAnchorScreenPosition,
  getCooldownMs,
  getMotionProfile,
  getMoodFromSection,
  MASCOT_SECTION_IDS,
  getVisibleDurationMs,
  overlapsInteractiveElement,
  pickNextAnchor,
  type MascotAnchor,
  type MascotSectionMood,
  type MascotState,
} from './MascotLogic';
import { getMessageForReason, type MascotMessage, type MascotMessageReason } from './MascotMessages';

interface Point {
  x: number;
  y: number;
}

export interface MascotRenderModel {
  state: MascotState;
  anchor: MascotAnchor;
  mood: MascotSectionMood;
  visible: boolean;
  hovered: boolean;
  clicked: boolean;
  bubbleVisible: boolean;
  message: MascotMessage;
  pulse: number;
  mascotSize: number;
}

export interface MascotController {
  model: MascotRenderModel;
  mascotRef: React.RefObject<HTMLDivElement | null>;
  onHoverChange: (hovered: boolean) => void;
  onClickMascot: () => void;
}

const BASE_SIZE_DESKTOP = 104;
const BASE_SIZE_MOBILE = 78;
const MESSAGE_HIDE_DELAY = 3600;
const IDLE_HINT_DELAY = 12500;
const ENTER_DURATION = 620;
const EXIT_DURATION = 360;

export function useMascot(): MascotController {
  const [state, setState] = useState<MascotState>('hidden');
  const [anchor, setAnchor] = useState<MascotAnchor>('bottom-right');
  const [mood, setMood] = useState<MascotSectionMood>('calm');
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [bubbleVisible, setBubbleVisible] = useState(false);
  const [message, setMessage] = useState<MascotMessage>(() => getMessageForReason('first-visit', 'calm'));
  const [pulse, setPulse] = useState(0);
  const [mascotSize, setMascotSize] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches
      ? BASE_SIZE_MOBILE
      : BASE_SIZE_DESKTOP,
  );

  const mascotRef = useRef<HTMLDivElement>(null);

  const isMobileRef = useRef(false);
  const currentPositionRef = useRef<Point>({ x: 0, y: 0 });
  const basePositionRef = useRef<Point>({ x: 0, y: 0 });
  const offscreenPositionRef = useRef<Point>({ x: 0, y: 0 });
  const cursorRef = useRef<Point>({ x: 0.5, y: 0.5 });

  const stateRef = useRef<MascotState>('hidden');
  const anchorRef = useRef<MascotAnchor>('bottom-right');
  const moodRef = useRef<MascotSectionMood>('calm');
  const lastSectionRef = useRef('home');

  const rafRef = useRef<number | null>(null);
  const mouseRafRef = useRef<number | null>(null);
  const scrollRafRef = useRef<number | null>(null);

  const cooldownTimerRef = useRef<number | null>(null);
  const visibleTimerRef = useRef<number | null>(null);
  const bounceTimerRef = useRef<number | null>(null);
  const messageTimerRef = useRef<number | null>(null);
  const idleTimerRef = useRef<number | null>(null);
  const clickTimerRef = useRef<number | null>(null);

  const shouldFollowCursorRef = useRef(true);
  const pulseRef = useRef(0);

  const clearTimer = useCallback((timerRef: React.MutableRefObject<number | null>) => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const transitionTo = useCallback((nextState: MascotState) => {
    stateRef.current = nextState;
    setState(nextState);
  }, []);

  const showMessage = useCallback(
    (reason: MascotMessageReason, customMood?: MascotSectionMood) => {
      const nextMood = customMood ?? moodRef.current;
      setMessage(getMessageForReason(reason, nextMood));
      setBubbleVisible(true);
      clearTimer(messageTimerRef);
      messageTimerRef.current = window.setTimeout(() => {
        setBubbleVisible(false);
      }, MESSAGE_HIDE_DELAY);
    },
    [clearTimer],
  );

  const onHoverChange = useCallback(
    (nextHovered: boolean) => {
      setHovered(nextHovered);
      if (nextHovered && (stateRef.current === 'active' || stateRef.current === 'interacting')) {
        transitionTo('interacting');
        showMessage('manual');
      } else if (!nextHovered && stateRef.current === 'interacting') {
        transitionTo('active');
      }
    },
    [showMessage, transitionTo],
  );

  const onClickMascot = useCallback(() => {
    setClicked(true);
    if (clickTimerRef.current !== null) {
      window.clearTimeout(clickTimerRef.current);
    }
    clickTimerRef.current = window.setTimeout(() => setClicked(false), 240);

    pulseRef.current = 1;
    setPulse(1);
    window.setTimeout(() => {
      pulseRef.current = 0;
      setPulse(0);
    }, 420);

    showMessage('click');
  }, [showMessage]);

  useEffect(() => {
    const applyPositionStyle = (point: Point) => {
      const element = mascotRef.current;
      if (!element) {
        return;
      }
      element.style.transform = `translate3d(${point.x.toFixed(2)}px, ${point.y.toFixed(2)}px, 0)`;
    };

    const computeSafeAnchorPosition = (
      nextAnchor: MascotAnchor,
    ): { anchor: MascotAnchor; base: Point; offscreen: Point } => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const size = isMobileRef.current ? BASE_SIZE_MOBILE : BASE_SIZE_DESKTOP;

      const order: MascotAnchor[] = [
        nextAnchor,
        ...(['bottom-right', 'bottom-left', 'top-right', 'mid-left'] as MascotAnchor[]).filter((a) => a !== nextAnchor),
      ];

      for (const candidate of order) {
        const base = getAnchorScreenPosition(candidate, viewportWidth, viewportHeight, size, isMobileRef.current);
        const rect = {
          left: base.x,
          top: base.y,
          right: base.x + size,
          bottom: base.y + size,
        };

        if (!overlapsInteractiveElement(rect)) {
          const offscreen = getAnchorOffscreenPosition(candidate, viewportWidth, viewportHeight, size);
          return { anchor: candidate, base, offscreen };
        }
      }

      const fallback = getAnchorScreenPosition(nextAnchor, viewportWidth, viewportHeight, size, isMobileRef.current);
      return {
        anchor: nextAnchor,
        base: fallback,
        offscreen: getAnchorOffscreenPosition(nextAnchor, viewportWidth, viewportHeight, size),
      };
    };

    const scheduleIdleHint = () => {
      clearTimer(idleTimerRef);
      idleTimerRef.current = window.setTimeout(() => {
        if (stateRef.current === 'active' || stateRef.current === 'interacting') {
          showMessage('idle');
        }
      }, IDLE_HINT_DELAY);
    };

    const scheduleRandomBounce = () => {
      clearTimer(bounceTimerRef);
      const profile = getMotionProfile(moodRef.current, isMobileRef.current);
      bounceTimerRef.current = window.setTimeout(() => {
        if (stateRef.current === 'active') {
          pulseRef.current = 1;
          setPulse(1);
          window.setTimeout(() => {
            pulseRef.current = 0;
            setPulse(0);
          }, 420);
          scheduleRandomBounce();
        }
      }, profile.idleBounceInterval + Math.floor(Math.random() * 1200));
    };

    const scheduleNextAppearance = () => {
      clearTimer(cooldownTimerRef);
      cooldownTimerRef.current = window.setTimeout(() => {
        const pickedAnchor = pickNextAnchor(anchorRef.current, isMobileRef.current);
        const { anchor: safeAnchor, base, offscreen } = computeSafeAnchorPosition(pickedAnchor);

        anchorRef.current = safeAnchor;
        setAnchor(safeAnchor);
        basePositionRef.current = base;
        offscreenPositionRef.current = offscreen;
        currentPositionRef.current = offscreen;
        applyPositionStyle(offscreen);

        setVisible(true);
        shouldFollowCursorRef.current = true;
        transitionTo('entering');

        window.setTimeout(() => {
          transitionTo('active');
          scheduleIdleHint();
          scheduleRandomBounce();
        }, ENTER_DURATION);

        clearTimer(visibleTimerRef);
        visibleTimerRef.current = window.setTimeout(() => {
          transitionTo('exiting');
          shouldFollowCursorRef.current = false;

          window.setTimeout(() => {
            transitionTo('hidden');
            setVisible(false);
            scheduleNextAppearance();
          }, EXIT_DURATION);
        }, getVisibleDurationMs(isMobileRef.current));
      }, getCooldownMs());
    };

    const updateSectionMood = (sectionId: string) => {
      if (sectionId === lastSectionRef.current) {
        return;
      }

      lastSectionRef.current = sectionId;
      const nextMood = getMoodFromSection(sectionId);
      moodRef.current = nextMood;
      setMood(nextMood);

      if (stateRef.current === 'active' || stateRef.current === 'interacting') {
        showMessage('section-change', nextMood);
      }
    };

    isMobileRef.current = window.matchMedia('(max-width: 768px)').matches;
    const initialAnchor = isMobileRef.current ? 'bottom-right' : 'bottom-left';
    const { anchor: safeAnchor, base, offscreen } = computeSafeAnchorPosition(initialAnchor);

    anchorRef.current = safeAnchor;
    setAnchor(safeAnchor);
    basePositionRef.current = base;
    offscreenPositionRef.current = offscreen;
    currentPositionRef.current = offscreen;
    applyPositionStyle(offscreen);
    transitionTo('idle');

    window.setTimeout(() => {
      setVisible(true);
      shouldFollowCursorRef.current = true;
      transitionTo('entering');
      showMessage('first-visit');

      window.setTimeout(() => {
        transitionTo('active');
        scheduleIdleHint();
        scheduleRandomBounce();
      }, ENTER_DURATION);

      clearTimer(visibleTimerRef);
      visibleTimerRef.current = window.setTimeout(() => {
        transitionTo('exiting');
        shouldFollowCursorRef.current = false;

        window.setTimeout(() => {
          transitionTo('hidden');
          setVisible(false);
          scheduleNextAppearance();
        }, EXIT_DURATION);
      }, getVisibleDurationMs(isMobileRef.current));
    }, 800);

    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const onMediaChange = (event: MediaQueryListEvent) => {
      isMobileRef.current = event.matches;
      setMascotSize(event.matches ? BASE_SIZE_MOBILE : BASE_SIZE_DESKTOP);
      const pinnedAnchor = event.matches ? 'bottom-right' : anchorRef.current;
      const { anchor: updatedAnchor, base: updatedBase, offscreen: updatedOffscreen } = computeSafeAnchorPosition(pinnedAnchor);
      anchorRef.current = updatedAnchor;
      setAnchor(updatedAnchor);
      basePositionRef.current = updatedBase;
      offscreenPositionRef.current = updatedOffscreen;
      if (stateRef.current === 'hidden' || stateRef.current === 'exiting') {
        currentPositionRef.current = updatedOffscreen;
        applyPositionStyle(updatedOffscreen);
      }
    };

    mediaQuery.addEventListener('change', onMediaChange);

    const handleMouseMove = (event: MouseEvent) => {
      if (mouseRafRef.current !== null) {
        return;
      }
      mouseRafRef.current = window.requestAnimationFrame(() => {
        cursorRef.current = {
          x: event.clientX / window.innerWidth,
          y: event.clientY / window.innerHeight,
        };
        mouseRafRef.current = null;
      });
    };

    const handleScroll = () => {
      if (scrollRafRef.current !== null) {
        return;
      }
      scrollRafRef.current = window.requestAnimationFrame(() => {
        for (const id of MASCOT_SECTION_IDS) {
          const element = document.getElementById(id);
          if (!element) {
            continue;
          }
          const rect = element.getBoundingClientRect();
          const midpoint = window.innerHeight * 0.5;
          if (rect.top <= midpoint && rect.bottom >= midpoint) {
            updateSectionMood(id);
            break;
          }
        }
        scrollRafRef.current = null;
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    let lastTick = 0;
    const tick = (timestamp: number) => {
      if (!lastTick) {
        lastTick = timestamp;
      }
      const dt = Math.min(32, timestamp - lastTick);
      lastTick = timestamp;

      const profile = getMotionProfile(moodRef.current, isMobileRef.current);
      const basePoint = basePositionRef.current;
      const cursor = cursorRef.current;

      const offsetX = shouldFollowCursorRef.current ? (cursor.x - 0.5) * profile.followStrength : 0;
      const offsetY = shouldFollowCursorRef.current ? (cursor.y - 0.5) * profile.followStrength : 0;
      const floatY = Math.sin(timestamp * profile.floatSpeed) * profile.floatAmplitude;
      const pulseOffset = pulseRef.current * -6;

      const targetPoint =
        stateRef.current === 'entering'
          ? basePoint
          : stateRef.current === 'hidden' || stateRef.current === 'exiting'
            ? offscreenPositionRef.current
            : {
                x: basePoint.x + offsetX,
                y: basePoint.y + floatY + offsetY + pulseOffset,
              };

      // 16.67ms = one 60fps frame; this computes an exponentially-weighted interpolation factor.
      const lerp = 1 - Math.pow(0.0001, dt / 16.67);
      currentPositionRef.current = {
        x: currentPositionRef.current.x + (targetPoint.x - currentPositionRef.current.x) * lerp,
        y: currentPositionRef.current.y + (targetPoint.y - currentPositionRef.current.y) * lerp,
      };

      applyPositionStyle(currentPositionRef.current);
      rafRef.current = window.requestAnimationFrame(tick);
    };

    rafRef.current = window.requestAnimationFrame(tick);

    return () => {
      mediaQuery.removeEventListener('change', onMediaChange);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);

      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
      if (mouseRafRef.current !== null) {
        window.cancelAnimationFrame(mouseRafRef.current);
      }
      if (scrollRafRef.current !== null) {
        window.cancelAnimationFrame(scrollRafRef.current);
      }

      clearTimer(cooldownTimerRef);
      clearTimer(visibleTimerRef);
      clearTimer(bounceTimerRef);
      clearTimer(messageTimerRef);
      clearTimer(idleTimerRef);
      clearTimer(clickTimerRef);
    };
  }, [clearTimer, showMessage, transitionTo]);

  const model = useMemo<MascotRenderModel>(
    () => ({
      state,
      anchor,
      mood,
      visible,
      hovered,
      clicked,
      bubbleVisible,
      message,
      pulse,
      mascotSize,
    }),
    [state, anchor, mood, visible, hovered, clicked, bubbleVisible, message, pulse, mascotSize],
  );

  return {
    model,
    mascotRef,
    onHoverChange,
    onClickMascot,
  };
}
