'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { MascotController, type BrainSnapshot } from './MascotController';
import type { MascotBehaviorState } from './MascotLogic';
import type { MascotMessage } from './MascotMessages';

export interface MascotRenderModel {
  state: MascotBehaviorState;
  visible: boolean;
  bubbleVisible: boolean;
  message: MascotMessage;
  sizeClass: string;
}

export interface MascotControllerBindings {
  model: MascotRenderModel;
  mascotRef: React.RefObject<HTMLDivElement | null>;
  bubbleRef: React.RefObject<HTMLDivElement | null>;
  onHoverChange: (hovered: boolean) => void;
  onClickMascot: () => void;
}

const DEFAULT_MESSAGE: MascotMessage = {
  id: 'boot',
  text: 'Welcome, warrior… Asgard awaits.',
  tone: 'epic',
  priority: 1,
  trigger: 'onEnter',
  section: 'hero',
  cooldownMs: 10000,
};

export function useMascot(): MascotControllerBindings {
  const mascotRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<MascotController | null>(null);
  const rafRef = useRef<number | null>(null);
  const scrollRef = useRef({ y: 0, at: 0 });
  const hideBubbleTimerRef = useRef<number | null>(null);
  const lastStateRef = useRef<MascotBehaviorState>('IDLE');

  const [model, setModel] = useState<MascotRenderModel>({
    state: 'IDLE',
    visible: true,
    bubbleVisible: false,
    message: DEFAULT_MESSAGE,
    sizeClass: 'w-32',
  });

  const syncFromBrain = useCallback((snapshot: BrainSnapshot) => {
    const mascot = mascotRef.current;
    if (mascot) {
      gsap.to(mascot, {
        x: snapshot.point.x,
        y: snapshot.point.y,
        duration: 0.45,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }

    if (lastStateRef.current !== snapshot.state && mascot) {
      if (snapshot.state === 'GUIDING' || snapshot.state === 'EXCITED') {
        gsap.fromTo(
          mascot,
          { rotate: -8, scale: 0.8, yPercent: 8 },
          {
            rotate: 0,
            scale: 1,
            yPercent: 0,
            duration: 0.82,
            ease: 'bounce.out',
            overwrite: 'auto',
          },
        );
      }

      if (snapshot.state === 'IDLE') {
        gsap.to(mascot, {
          y: '+=8',
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          duration: 1.8,
          overwrite: false,
        });
      } else {
        gsap.killTweensOf(mascot, 'y');
      }

      lastStateRef.current = snapshot.state;
    }

    if (snapshot.bubbleVisible && bubbleRef.current) {
      gsap.fromTo(
        bubbleRef.current,
        { opacity: 0, y: 8, filter: 'blur(8px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.32,
          ease: 'power2.out',
        },
      );
    }

    setModel((previous) => {
      if (
        previous.state === snapshot.state &&
        previous.visible === snapshot.visible &&
        previous.bubbleVisible === snapshot.bubbleVisible &&
        previous.message.id === snapshot.message.id &&
        previous.sizeClass === snapshot.sizeClass
      ) {
        return previous;
      }

      return {
        state: snapshot.state,
        visible: snapshot.visible,
        bubbleVisible: snapshot.bubbleVisible,
        message: snapshot.message,
        sizeClass: snapshot.sizeClass,
      };
    });
  }, []);

  useEffect(() => {
    const controller = new MascotController(() => ({
      width: window.innerWidth,
      height: window.innerHeight,
    }));
    controllerRef.current = controller;

    const sectionIds = controller.getSectionIds();

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        let winner: IntersectionObserverEntry | null = null;
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue;
          }
          if (!winner || entry.intersectionRatio > winner.intersectionRatio) {
            winner = entry;
          }
        }

        if (winner && winner.target.id) {
          controller.onSectionObserved(winner.target.id, performance.now());
        }
      },
      { threshold: [0.25, 0.5, 0.7], rootMargin: '-20% 0px -20% 0px' },
    );

    for (const sectionId of sectionIds) {
      const element = document.getElementById(sectionId);
      if (element) {
        sectionObserver.observe(element);
      }
    }

    const now = performance.now();
    scrollRef.current = { y: window.scrollY, at: now };
    controller.setInitialSection('hero');

    const onMouseMove = (event: MouseEvent) => {
      controller.onCursorMove(event.clientX, event.clientY, performance.now());
    };

    const onScroll = () => {
      const current = performance.now();
      const deltaY = window.scrollY - scrollRef.current.y;
      const deltaMs = current - scrollRef.current.at;
      scrollRef.current = { y: window.scrollY, at: current };
      controller.onScroll(deltaY, deltaMs, current);
    };

    const onMouseOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) {
        return;
      }

      if (target.closest('[data-mascot-context="important"], .card-wrapper, .timeline-card, .faq-card')) {
        controller.onHoverImportant(performance.now());
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('mouseover', onMouseOver, { passive: true });

    const tick = () => {
      const snapshot = controller.tick(performance.now());
      syncFromBrain(snapshot);
      rafRef.current = window.requestAnimationFrame(tick);
    };

    rafRef.current = window.requestAnimationFrame(tick);
    const mascotElement = mascotRef.current;
    const bubbleElement = bubbleRef.current;

    return () => {
      sectionObserver.disconnect();
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('mouseover', onMouseOver);

      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }

      if (hideBubbleTimerRef.current !== null) {
        window.clearTimeout(hideBubbleTimerRef.current);
      }

      gsap.killTweensOf(mascotElement);
      gsap.killTweensOf(bubbleElement);
    };
  }, [syncFromBrain]);

  useEffect(() => {
    if (hideBubbleTimerRef.current !== null) {
      window.clearTimeout(hideBubbleTimerRef.current);
    }

    if (!model.bubbleVisible) {
      return;
    }

    hideBubbleTimerRef.current = window.setTimeout(() => {
      controllerRef.current?.hideBubble();
    }, 3800);
  }, [model.bubbleVisible, model.message.id]);

  const onHoverChange = useCallback((hovered: boolean) => {
    if (hovered) {
      controllerRef.current?.onHoverImportant(performance.now());
    }
  }, []);

  const onClickMascot = useCallback(() => {
    const mascot = mascotRef.current;
    if (!mascot) {
      return;
    }

    controllerRef.current?.onHoverImportant(performance.now());

    gsap.fromTo(
      mascot,
      { scale: 0.8 },
      {
        scale: 1.1,
        keyframes: [{ scale: 0.8 }, { scale: 1.1 }, { scale: 1 }],
        duration: 0.48,
        ease: 'power2.out',
      },
    );
  }, []);

  return useMemo(
    () => ({
      model,
      mascotRef,
      bubbleRef,
      onHoverChange,
      onClickMascot,
    }),
    [model, onClickMascot, onHoverChange],
  );
}
