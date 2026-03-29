'use client';

import { RefObject, useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createLavaStreaks, renderLava } from './lavaShader';

const LAVA_STREAK_COUNT = 18;
const MAX_FRAME_DELTA = 0.05;
const MIN_SCROLL_SPEED = -5;
const MAX_SCROLL_SPEED = 5;
const SCROLL_VELOCITY_SCALE = 1000;
const BASE_TIME_INCREMENT = 0.018;
const SPEED_TIME_MULTIPLIER = 0.08;
const BASE_FLOW_SPEED = 28;
const SPEED_FLOW_MULTIPLIER = 130;

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
    const streaks = createLavaStreaks(LAVA_STREAK_COUNT);

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
      const delta = Math.min(MAX_FRAME_DELTA, (timestamp - previousTimestamp) / 1000);
      previousTimestamp = timestamp;

      const rawVelocity = ScrollTrigger.getVelocity();
      const speed = Math.max(
        MIN_SCROLL_SPEED,
        Math.min(MAX_SCROLL_SPEED, rawVelocity / SCROLL_VELOCITY_SCALE),
      );
      const direction = Math.sign(speed) || 1;
      const speedMagnitude = Math.abs(speed);

      time += BASE_TIME_INCREMENT + speedMagnitude * SPEED_TIME_MULTIPLIER;
      flowOffset += (BASE_FLOW_SPEED + speedMagnitude * SPEED_FLOW_MULTIPLIER) * delta * direction;

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
