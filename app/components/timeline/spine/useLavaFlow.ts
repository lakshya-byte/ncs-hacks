'use client';

import { RefObject, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createLavaBlobs, renderLava } from './lavaShader';

gsap.registerPlugin(ScrollTrigger);

// ── Tuning Constants ──────────────────────────────────────────────────────────
const LAVA_BLOB_COUNT     = 16;   // 10–20 for target spec
const MAX_FRAME_DELTA     = 0.05; // cap large deltas (tab hidden etc.)
const SCROLL_VELOCITY_SCALE = 900;
const MIN_SPEED           = -4;
const MAX_SPEED           = 4;

// Base flow when completely idle
const BASE_FLOW_PX_S      = 22;
// Extra flow per unit of scroll speed magnitude
const SCROLL_FLOW_MULT    = 110;
// How fast the displayed speed smoothly tracks the raw scroll velocity
const SPEED_SMOOTH        = 8;    // lerp factor per second
// How fast the internal clock advances
const BASE_TIME_RATE      = 0.016;
const SPEED_TIME_MULT     = 0.06;

export const useLavaFlow = (canvasRef: RefObject<HTMLCanvasElement | null>) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId        = 0;
    let width        = 0;
    let height       = 0;
    let time         = 0;
    let flowOffset   = 0;
    // Smoothed speed value so the lava reacts fluidly, not jarringly
    let smoothSpeed  = 0;
    let prevTs       = performance.now();

    const blobs = createLavaBlobs(LAVA_BLOB_COUNT);
    const st = ScrollTrigger.create({});

    // ── Canvas resize ─────────────────────────────────────────────────────────
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width  = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      const dpr = window.devicePixelRatio || 1;
      canvas.width  = Math.floor(width  * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    // Use ResizeObserver so the canvas remeasures when GSAP un-collapses the parent.
    // window 'resize' alone misses the moment scaleY goes from 0 → 1.
    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas);
    window.addEventListener('resize', resize);

    // ── Animation loop ────────────────────────────────────────────────────────
    const frame = (ts: number) => {
      const delta = Math.min(MAX_FRAME_DELTA, (ts - prevTs) / 1000);
      prevTs = ts;

      // Raw velocity from GSAP (px/s, positive = scrolling down)
      const rawVelocity: number = st.getVelocity() ?? 0;
      const targetSpeed = Math.max(MIN_SPEED, Math.min(MAX_SPEED, rawVelocity / SCROLL_VELOCITY_SCALE));

      // Exponential smooth toward target speed so movement feels viscous
      smoothSpeed += (targetSpeed - smoothSpeed) * Math.min(1, SPEED_SMOOTH * delta);

      const speedMag   = Math.abs(smoothSpeed);
      const direction  = Math.sign(smoothSpeed) || 1; // default: downward

      // Advance internal clock (drives noise & oscillations)
      time += (BASE_TIME_RATE + speedMag * SPEED_TIME_MULT) * (delta / 0.016);

      // Advance flow offset (drives vertical blob travel)
      flowOffset += (BASE_FLOW_PX_S + speedMag * SCROLL_FLOW_MULT) * delta * direction;

      renderLava(ctx, width, height, time, flowOffset, smoothSpeed, blobs);
      rafId = window.requestAnimationFrame(frame);
    };

    rafId = window.requestAnimationFrame(frame);

    return () => {
      window.cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener('resize', resize);
    };
  }, [canvasRef]);
};
