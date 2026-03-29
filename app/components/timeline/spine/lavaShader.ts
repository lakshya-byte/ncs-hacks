'use client';

export type LavaStreak = {
  phase: number;
  amplitude: number;
  width: number;
  speed: number;
  noiseSeed: number;
};

const STREAK_PHASE_STEP = 0.62;
const STREAK_BASE_AMPLITUDE = 3;
const STREAK_AMPLITUDE_VARIANCE = 0.9;
const STREAK_BASE_WIDTH = 1.4;
const STREAK_WIDTH_VARIANCE = 0.45;
const STREAK_BASE_SPEED = 0.65;
const STREAK_SPEED_VARIANCE = 0.18;
const STREAK_NOISE_SEED_STEP = 13.7;
const LAVA_TRACK_WIDTH = 14;
const LAVA_SEGMENT_LENGTH = 140;
const LAVA_SEGMENT_SPACING = 56;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const hash = (x: number, y: number) => {
  const value = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123;
  return value - Math.floor(value);
};

const valueNoise = (x: number, y: number) => {
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const xf = x - x0;
  const yf = y - y0;

  const u = xf * xf * (3 - 2 * xf);
  const v = yf * yf * (3 - 2 * yf);

  const n00 = hash(x0, y0);
  const n10 = hash(x0 + 1, y0);
  const n01 = hash(x0, y0 + 1);
  const n11 = hash(x0 + 1, y0 + 1);

  return lerp(lerp(n00, n10, u), lerp(n01, n11, u), v);
};

export const createLavaStreaks = (count: number): LavaStreak[] =>
  Array.from({ length: count }, (_, index) => ({
    phase: index * STREAK_PHASE_STEP,
    amplitude: STREAK_BASE_AMPLITUDE + ((index % 6) + 1) * STREAK_AMPLITUDE_VARIANCE,
    width: STREAK_BASE_WIDTH + (index % 4) * STREAK_WIDTH_VARIANCE,
    speed: STREAK_BASE_SPEED + (index % 5) * STREAK_SPEED_VARIANCE,
    noiseSeed: index * STREAK_NOISE_SEED_STEP,
  }));

export const renderLava = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  flowOffset: number,
  speed: number,
  streaks: LavaStreak[],
) => {
  const centerX = width / 2;
  const speedStrength = Math.min(1.6, Math.abs(speed) * 0.45);

  ctx.clearRect(0, 0, width, height);

  const coreGradient = ctx.createLinearGradient(centerX, 0, centerX, height);
  coreGradient.addColorStop(0, 'rgba(120, 72, 22, 0.32)');
  coreGradient.addColorStop(0.35, 'rgba(191, 113, 28, 0.42)');
  coreGradient.addColorStop(0.7, 'rgba(226, 142, 38, 0.34)');
  coreGradient.addColorStop(1, 'rgba(119, 71, 20, 0.28)');
  ctx.fillStyle = coreGradient;
  ctx.fillRect(centerX - LAVA_TRACK_WIDTH / 2, 0, LAVA_TRACK_WIDTH, height);

  ctx.globalAlpha = 0.95;
  for (let i = 0; i < streaks.length; i += 1) {
    const streak = streaks[i];
    const wave = Math.sin(time * 1.35 + streak.phase) * streak.amplitude;
    const organicNoise =
      (valueNoise(streak.noiseSeed, time * 0.26) - 0.5) * 10 +
      (valueNoise(time * 0.18, streak.noiseSeed * 0.07) - 0.5) * 14;
    const x = centerX + wave + organicNoise;
    const travel = flowOffset * streak.speed + i * 33;

    for (let y = -LAVA_SEGMENT_LENGTH; y < height + LAVA_SEGMENT_LENGTH; y += LAVA_SEGMENT_SPACING) {
      const yPos =
        ((y + travel) % (height + LAVA_SEGMENT_LENGTH * 2)) - LAVA_SEGMENT_LENGTH;

      if (yPos > height + LAVA_SEGMENT_LENGTH || yPos < -LAVA_SEGMENT_LENGTH) {
        continue;
      }

      const gradient = ctx.createLinearGradient(x, yPos, x, yPos + LAVA_SEGMENT_LENGTH);
      gradient.addColorStop(0, 'rgba(255, 215, 89, 0)');
      gradient.addColorStop(0.2, 'rgba(255, 229, 155, 0.92)');
      gradient.addColorStop(0.62, 'rgba(255, 140, 0, 0.88)');
      gradient.addColorStop(1, 'rgba(255, 90, 0, 0)');

      const wobble = Math.sin(time * 2 + i * 0.4 + y * 0.015) * 3;
      ctx.strokeStyle = gradient;
      ctx.lineWidth = streak.width + Math.sin(time + i * 0.5) * 0.45;
      ctx.beginPath();
      ctx.moveTo(x, yPos);
      ctx.quadraticCurveTo(
        x + wobble,
        yPos + LAVA_SEGMENT_LENGTH * 0.55,
        x,
        yPos + LAVA_SEGMENT_LENGTH,
      );
      ctx.stroke();
    }
  }

  const glowAlpha = Math.min(0.75, 0.28 + speedStrength * 0.3);
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.shadowBlur = 18 + speedStrength * 26;
  ctx.shadowColor = '#ffd571';
  ctx.globalAlpha = glowAlpha;

  for (let i = 0; i < streaks.length; i += 2) {
    const streak = streaks[i];
    const x =
      centerX +
      Math.sin(time * 1.6 + streak.phase) * (streak.amplitude + 1.4) +
      (valueNoise(streak.noiseSeed * 0.2, time * 0.2) - 0.5) * 16;
    const yPos = ((flowOffset * streak.speed + i * 51) % (height + 180)) - 90;
    const glowGradient = ctx.createLinearGradient(x, yPos, x, yPos + 180);
    glowGradient.addColorStop(0, 'rgba(255, 238, 189, 0)');
    glowGradient.addColorStop(0.35, 'rgba(255, 220, 120, 0.8)');
    glowGradient.addColorStop(1, 'rgba(255, 170, 70, 0)');
    ctx.strokeStyle = glowGradient;
    ctx.lineWidth = streak.width + 1.2;
    ctx.beginPath();
    ctx.moveTo(x, yPos);
    ctx.lineTo(x, yPos + 180);
    ctx.stroke();
  }

  ctx.restore();
  ctx.globalAlpha = 1;
};
