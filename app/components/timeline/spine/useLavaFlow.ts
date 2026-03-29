'use client';

import { RefObject, useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createLavaStreaks, renderLava } from './lavaShader';

export const useLavaFlow = (canvasRef: RefObject<HTMLCanvasElement | null>) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    let rafId = 0;
    let width = 0;
    let height = 0;
    let time = 0;
    let flowOffset = 0;
    let previousTimestamp = performance.now();
    const streaks = createLavaStreaks(18);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    const frame = (timestamp: number) => {
      const delta = Math.min(0.05, (timestamp - previousTimestamp) / 1000);
      previousTimestamp = timestamp;

      const rawVelocity = ScrollTrigger.getVelocity();
      const speed = Math.max(-5, Math.min(5, rawVelocity / 1000));
      const direction = Math.sign(speed) || 1;
      const speedMagnitude = Math.abs(speed);

      time += 0.018 + speedMagnitude * 0.08;
      flowOffset += (28 + speedMagnitude * 130) * delta * direction;

      renderLava(ctx, width, height, time, flowOffset, speed, streaks);
      rafId = window.requestAnimationFrame(frame);
    };

    rafId = window.requestAnimationFrame(frame);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, [canvasRef]);
};
