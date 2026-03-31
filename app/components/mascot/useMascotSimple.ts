'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { getSectionMessages } from './MascotMessages';
import { isMascotSection, sections } from './MascotLogic';
import type { MascotSection } from './MascotLogic';

// ── Position corners ──────────────────────────────────────────────────────────
type Corner = 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';

// Weighted random: bottom positions appear more often
const CORNERS: Corner[] = [
  'bottom-left', 'bottom-right',
  'bottom-left', 'bottom-right', // doubled weight for bottom
  'top-left', 'top-right',
];

function pickCorner(avoid?: Corner): Corner {
  const pool = avoid ? CORNERS.filter((c) => c !== avoid) : CORNERS;
  return pool[Math.floor(Math.random() * pool.length)];
}

// Translate offset for entry slide (slides in from its edge)
export function entryOffset(corner: Corner): { x: number; y: number } {
  const amount = 80;
  switch (corner) {
    case 'bottom-left':  return { x: -amount, y: amount };
    case 'bottom-right': return { x:  amount, y: amount };
    case 'top-left':     return { x: -amount, y: -amount };
    case 'top-right':    return { x:  amount, y: -amount };
  }
}

// ── State ─────────────────────────────────────────────────────────────────────
export interface MascotState {
  visible: boolean;
  corner: Corner;
  entryDone: boolean;       // true once slide-in completes
  bubbleVisible: boolean;
  message: string;
  section: MascotSection;
}

const COOLDOWN_MS = 12_000;
const BUBBLE_DURATION_MS = 4_000;
const BUBBLE_DELAY_MS = 350;

// ── Hook ─────────────────────────────────────────────────────────────────────
export function useMascotSimple() {
  const [state, setState] = useState<MascotState>({
    visible: false,
    corner: 'bottom-right',
    entryDone: false,
    bubbleVisible: false,
    message: 'Welcome to Asgard.',
    section: 'hero',
  });

  const lastCornerRef   = useRef<Corner | undefined>(undefined);
  const lastTriggerRef  = useRef<number>(0);
  const bubbleTimerRef  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const exitTimerRef    = useRef<ReturnType<typeof setTimeout> | null>(null);
  const seenRef         = useRef<Set<string>>(new Set());

  const clearTimers = useCallback(() => {
    if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current);
    if (exitTimerRef.current)   clearTimeout(exitTimerRef.current);
  }, []);

  const triggerSection = useCallback((sectionId: string) => {
    if (!isMascotSection(sectionId)) return;

    const now = Date.now();
    if (now - lastTriggerRef.current < COOLDOWN_MS) return;
    lastTriggerRef.current = now;

    // Pick message — avoid repeats, cycle if all seen
    const pool = getSectionMessages(sectionId as MascotSection, 'onEnter');
    const unseen = pool.filter((m) => !seenRef.current.has(m.id));
    const candidates = unseen.length > 0 ? unseen : pool;
    if (candidates.length === 0) return;
    const chosen = candidates[Math.floor(Math.random() * candidates.length)];
    seenRef.current.add(chosen.id);

    const corner = pickCorner(lastCornerRef.current);
    lastCornerRef.current = corner;

    clearTimers();

    // 1. Enter
    setState({
      visible: true,
      corner,
      entryDone: false,
      bubbleVisible: false,
      message: chosen.text,
      section: sectionId as MascotSection,
    });

    // 2. After entry animation completes → mark entryDone
    setTimeout(() => {
      setState((prev) => ({ ...prev, entryDone: true }));
    }, 550);

    // 3. Bubble appears
    bubbleTimerRef.current = setTimeout(() => {
      setState((prev) => ({ ...prev, bubbleVisible: true }));

      // 4. Bubble hides, then mascot exits
      exitTimerRef.current = setTimeout(() => {
        setState((prev) => ({ ...prev, bubbleVisible: false }));
        setTimeout(() => {
          setState((prev) => ({ ...prev, visible: false, entryDone: false }));
        }, 400);
      }, BUBBLE_DURATION_MS);

    }, BUBBLE_DELAY_MS);
  }, [clearTimers]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the most-visible intersecting section
        let best: IntersectionObserverEntry | null = null;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          if (!best || entry.intersectionRatio > best.intersectionRatio) {
            best = entry;
          }
        }
        if (best?.target.id) {
          triggerSection(best.target.id);
        }
      },
      { threshold: 0.6, rootMargin: '0px 0px -10% 0px' }
    );

    for (const id of sections) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => {
      observer.disconnect();
      clearTimers();
    };
  }, [triggerSection, clearTimers]);

  return { state, entryOffset };
}
