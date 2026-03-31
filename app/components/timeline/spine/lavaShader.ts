'use client';

// ─── Noise Utilities ────────────────────────────────────────────────────────
// Smooth hash function
const hash2 = (x: number, y: number): number => {
  const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123;
  return n - Math.floor(n);
};

// Bilinear interpolation value noise
const vnoise = (x: number, y: number): number => {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = x - ix;
  const fy = y - iy;
  // Smoothstep
  const ux = fx * fx * (3 - 2 * fx);
  const uy = fy * fy * (3 - 2 * fy);
  return (
    hash2(ix, iy) * (1 - ux) * (1 - uy) +
    hash2(ix + 1, iy) * ux * (1 - uy) +
    hash2(ix, iy + 1) * (1 - ux) * uy +
    hash2(ix + 1, iy + 1) * ux * uy
  );
};

// Fractal Brownian Motion – layered noise for rich organic detail
const fbm = (x: number, y: number, octaves = 4): number => {
  let val = 0;
  let amp = 0.5;
  let freq = 1;
  let max = 0;
  for (let i = 0; i < octaves; i++) {
    val += vnoise(x * freq, y * freq) * amp;
    max += amp;
    amp *= 0.5;
    freq *= 2.1;
  }
  return val / max;
};

// ─── Blob Types ─────────────────────────────────────────────────────────────
export type LavaBlob = {
  /** 0..1 vertical seed position within the channel height */
  ySeed: number;
  /** Relative horizontal wander seed */
  xSeed: number;
  /** Radius seed 0..1 */
  rSeed: number;
  /** Phase offset for oscillation */
  phase: number;
  /** Speed multiplier */
  speedMult: number;
  /** Unique noise seed to break determinism */
  noiseSeed: number;
};

export const createLavaBlobs = (count: number): LavaBlob[] =>
  Array.from({ length: count }, (_, i) => ({
    ySeed: i / count,
    xSeed: hash2(i * 17.3, i * 5.7),
    rSeed: hash2(i * 3.1, i * 11.9),
    phase: hash2(i * 7.3, 42) * Math.PI * 2,
    speedMult: 0.55 + hash2(i * 2.3, i * 9.1) * 0.9,
    noiseSeed: hash2(i * 41.7, i * 13.3) * 100,
  }));

// ─── Channel Constants ───────────────────────────────────────────────────────
const CHANNEL_HALF_W = 6;   // px – hard boundary; blobs stay inside this
const GLOW_RADIUS_MAX = 16; // px – max outer glow radius

// ─── Main Render ─────────────────────────────────────────────────────────────
export const renderLava = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  flowOffset: number,
  speed: number,
  blobs: LavaBlob[],
): void => {
  const cx = width / 2;
  const speedMag = Math.abs(speed);

  // 1. Clear
  ctx.clearRect(0, 0, width, height);

  // ── 2. Dark molten channel base ────────────────────────────────────────────
  const baseGrad = ctx.createLinearGradient(cx - CHANNEL_HALF_W, 0, cx + CHANNEL_HALF_W, 0);
  baseGrad.addColorStop(0,   'rgba(80, 30, 0, 0.0)');
  baseGrad.addColorStop(0.2, 'rgba(140, 55, 5, 0.45)');
  baseGrad.addColorStop(0.5, 'rgba(180, 80, 10, 0.60)');
  baseGrad.addColorStop(0.8, 'rgba(140, 55, 5, 0.45)');
  baseGrad.addColorStop(1,   'rgba(80, 30, 0, 0.0)');
  ctx.fillStyle = baseGrad;
  ctx.fillRect(cx - CHANNEL_HALF_W, 0, CHANNEL_HALF_W * 2, height);

  // ── 3. Additive blob layer ──────────────────────────────────────────────────
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';

  const blobCount = blobs.length;
  for (let i = 0; i < blobCount; i++) {
    const blob = blobs[i];

    // Vertical position – wraps around so blobs loop seamlessly
    const travelY = flowOffset * blob.speedMult + blob.ySeed * height;
    const rawY = ((travelY % (height + 200)) + height + 200) % (height + 200) - 100;

    // --- Horizontal distortion (noise-driven, stays in channel) ---
    const nxInput = blob.noiseSeed + time * 0.11;
    const nyInput = blob.noiseSeed * 0.37 + time * 0.07;
    const noiseX = (fbm(nxInput, nyInput, 3) - 0.5) * 2; // -1..1

    // Secondary sine wobble for chaotic organic feel
    const wobbleX =
      Math.sin(time * 0.9 + blob.phase) * 2.2 +
      Math.sin(time * 1.7 + blob.phase * 1.3) * 1.1;

    // Combine but clamp hard to channel
    const rawX = cx + noiseX * (CHANNEL_HALF_W * 0.7) + wobbleX;
    const blobX = Math.max(cx - CHANNEL_HALF_W + 2, Math.min(cx + CHANNEL_HALF_W - 2, rawX));

    // --- Radius: base + oscillating + speed boost ---
    const baseRadius =
      3.5 + blob.rSeed * 5.5 +
      Math.sin(time * 1.1 + blob.phase) * 1.8 +
      Math.sin(time * 2.3 + blob.phase * 0.7) * 0.9;
    const speedBoost = speedMag * 1.6;
    const r = Math.max(1.5, Math.min(CHANNEL_HALF_W * 1.2, baseRadius + speedBoost));

    // --- Vertical stretch: blobs elongate when scrolling fast ---
    const stretchY = 1 + speedMag * 0.7;

    // --- Color intensity: hotter core blobs are brighter ---
    const heat = 0.5 + blob.rSeed * 0.5;
    const alpha = 0.55 + heat * 0.3 + speedMag * 0.08;

    // --- Draw stretched radial gradient blob ---
    ctx.save();
    ctx.translate(blobX, rawY);
    ctx.scale(1, stretchY);

    const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, r);
    // Core: bright almost-white gold
    grad.addColorStop(0,   `rgba(255, 248, 200, ${Math.min(1, alpha * 1.35)})`);
    // Bright gold
    grad.addColorStop(0.25, `rgba(255, 215, 50, ${Math.min(1, alpha * 1.1)})`);
    // Orange mid
    grad.addColorStop(0.55, `rgba(255, 120, 10, ${alpha})`);
    // Deep amber outer
    grad.addColorStop(0.82, `rgba(200, 55, 5, ${alpha * 0.45})`);
    // Fade to transparent
    grad.addColorStop(1,   'rgba(100, 20, 0, 0)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  ctx.restore();

  // ── 4. Turbulence distortion overlay ──────────────────────────────────────
  // Render thin "tendrils" of bright noise to give the surface chaos
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  ctx.globalAlpha = 0.18 + speedMag * 0.06;

  const tendrilCount = 6;
  for (let t = 0; t < tendrilCount; t++) {
    const seed = t * 17.3 + 5.1;
    const x0 = cx + (fbm(seed, time * 0.08, 3) - 0.5) * (CHANNEL_HALF_W * 1.4);
    const clampedX = Math.max(cx - CHANNEL_HALF_W + 1, Math.min(cx + CHANNEL_HALF_W - 1, x0));

    const segLen = 40 + fbm(seed * 1.3, flowOffset * 0.003 + t, 2) * 80;
    const yStart = ((flowOffset * (0.6 + t * 0.07) + t * (height / tendrilCount)) % (height + segLen * 2) + height + segLen * 2) % (height + segLen * 2) - segLen;

    // Build a bezier tendril – not a straight line
    const cpX1 = clampedX + (fbm(seed * 2.1, time * 0.14, 2) - 0.5) * 8;
    const cpX2 = clampedX + (fbm(seed * 3.7, time * 0.10, 2) - 0.5) * 8;

    const flowGrad = ctx.createLinearGradient(clampedX, yStart, clampedX, yStart + segLen);
    flowGrad.addColorStop(0,   'rgba(255, 250, 220, 0)');
    flowGrad.addColorStop(0.3, 'rgba(255, 230, 130, 0.9)');
    flowGrad.addColorStop(0.7, 'rgba(255, 160, 40, 0.7)');
    flowGrad.addColorStop(1,   'rgba(255, 80, 10, 0)');

    ctx.strokeStyle = flowGrad;
    ctx.lineWidth = 1.5 + fbm(seed * 0.7, time * 0.12) * 2;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(clampedX, yStart);
    ctx.bezierCurveTo(cpX1, yStart + segLen * 0.33, cpX2, yStart + segLen * 0.66, clampedX, yStart + segLen);
    ctx.stroke();
  }

  ctx.restore();

  // ── 5. Outer glow bloom ─────────────────────────────────────────────────────
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  const glowAlpha = Math.min(0.55, 0.18 + speedMag * 0.22);
  const glowRadius = Math.min(GLOW_RADIUS_MAX, 7 + speedMag * 9);

  const glowGrad = ctx.createRadialGradient(cx, height / 2, 0, cx, height / 2, glowRadius + CHANNEL_HALF_W);
  glowGrad.addColorStop(0,   `rgba(255, 220, 100, ${glowAlpha})`);
  glowGrad.addColorStop(0.5, `rgba(255, 140, 20, ${glowAlpha * 0.4})`);
  glowGrad.addColorStop(1,   'rgba(200, 60, 0, 0)');

  ctx.fillStyle = glowGrad;
  ctx.fillRect(cx - glowRadius - CHANNEL_HALF_W, 0, (glowRadius + CHANNEL_HALF_W) * 2, height);
  ctx.restore();

  // ── 6. Edge squash vignette – reinforce channel boundary ───────────────────
  const vigLeft = ctx.createLinearGradient(cx - CHANNEL_HALF_W - 4, 0, cx - CHANNEL_HALF_W + 2, 0);
  vigLeft.addColorStop(0, 'rgba(0,0,0,0.55)');
  vigLeft.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = vigLeft;
  ctx.fillRect(cx - CHANNEL_HALF_W - 4, 0, 6, height);

  const vigRight = ctx.createLinearGradient(cx + CHANNEL_HALF_W - 2, 0, cx + CHANNEL_HALF_W + 4, 0);
  vigRight.addColorStop(0, 'rgba(0,0,0,0)');
  vigRight.addColorStop(1, 'rgba(0,0,0,0.55)');
  ctx.fillStyle = vigRight;
  ctx.fillRect(cx + CHANNEL_HALF_W - 2, 0, 6, height);
};
