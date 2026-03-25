'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 160;
const FRAME_DIR = '/ezgif-4228b47dc4eb8e89-jpg';

function getFrameSrc(index: number): string {
  const padded = String(index).padStart(3, '0');
  return `${FRAME_DIR}/ezgif-frame-${padded}.jpg`;
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export default function AsgardCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const [loadProgress, setLoadProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const scrollProgressRef = useRef(0);

  // Preload all frames
  const preloadFrames = useCallback(() => {
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    return new Promise<HTMLImageElement[]>((resolve) => {
      for (let i = 1; i <= TOTAL_FRAMES; i++) {
        const img = new Image();
        img.src = getFrameSrc(i);
        img.onload = () => {
          loadedCount++;
          setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
          if (loadedCount === TOTAL_FRAMES) resolve(images);
        };
        img.onerror = () => {
          loadedCount++;
          setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
          if (loadedCount === TOTAL_FRAMES) resolve(images);
        };
        images[i - 1] = img;
      }
    });
  }, []);

  const drawFrame = useCallback(
    (ctx: CanvasRenderingContext2D, frameIndex: number, progress: number) => {
      const canvas = ctx.canvas;
      const img = imagesRef.current[frameIndex];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Cover fill: maintain aspect ratio
      const scale = Math.max(
        canvas.width / img.naturalWidth,
        canvas.height / img.naturalHeight
      );
      const w = img.naturalWidth * scale;
      const h = img.naturalHeight * scale;
      const x = (canvas.width - w) / 2;
      const y = (canvas.height - h) / 2;

      // Cinematic zoom: slight scale increase as progress goes 0→1
      const zoomFactor = 1 + progress * 0.08;
      const zw = w * zoomFactor;
      const zh = h * zoomFactor;
      const zx = (canvas.width - zw) / 2;
      const zy = (canvas.height - zh) / 2;

      // Blur: high at start, 0 at end
      const blurPx = Math.max(0, (1 - progress) * 6);
      ctx.filter = blurPx > 0.1 ? `blur(${blurPx.toFixed(1)}px)` : 'none';

      ctx.drawImage(img, zx, zy, zw, zh);
      ctx.filter = 'none';

      // Brightness overlay: dim at start → bright mid → golden at end
      if (progress < 0.5) {
        const alpha = (0.5 - progress) * 0.7;
        ctx.fillStyle = `rgba(0,0,0,${alpha})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else {
        // Bloom / golden light at the end
        const bloomAlpha = (progress - 0.5) * 0.35;
        const gradient = ctx.createRadialGradient(
          canvas.width / 2,
          canvas.height / 2,
          0,
          canvas.width / 2,
          canvas.height / 2,
          canvas.width * 0.6
        );
        gradient.addColorStop(0, `rgba(255, 220, 120, ${bloomAlpha})`);
        gradient.addColorStop(1, 'rgba(255, 200, 80, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    },
    []
  );

  // RAF render loop with lerp smoothing
  const renderLoop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Lerp current frame toward target
    currentFrameRef.current = lerp(
      currentFrameRef.current,
      targetFrameRef.current,
      0.12
    );

    const frameIndex = Math.min(
      Math.round(currentFrameRef.current),
      TOTAL_FRAMES - 1
    );

    const progress = scrollProgressRef.current;
    drawFrame(ctx, frameIndex, progress);

    rafRef.current = requestAnimationFrame(renderLoop);
  }, [drawFrame]);

  useEffect(() => {
    (async () => {
      const imgs = await preloadFrames();
      imagesRef.current = imgs;
      setLoaded(true);
    })();
  }, [preloadFrames]);

  useEffect(() => {
    if (!loaded) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Start render loop
    rafRef.current = requestAnimationFrame(renderLoop);

    // GSAP ScrollTrigger mapping scroll → frame
    const trigger = ScrollTrigger.create({
      trigger: '#scroll-container',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.2,
      onUpdate: (self) => {
        const progress = self.progress;
        scrollProgressRef.current = progress;
        targetFrameRef.current = Math.floor(progress * (TOTAL_FRAMES - 1));
      },
    });

    return () => {
      window.removeEventListener('resize', resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      trigger.kill();
    };
  }, [loaded, renderLoop]);

  return (
    <>
      {!loaded && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: '#000',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
          }}
        >
          <div
            style={{
              fontFamily: 'Cinzel, serif',
              color: '#c9a227',
              fontSize: '1.1rem',
              letterSpacing: '0.25em',
              marginBottom: '2rem',
            }}
          >
            LOADING ASGARD
          </div>
          <div
            style={{
              width: 260,
              height: 3,
              background: 'rgba(255,255,255,0.1)',
              borderRadius: 9999,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${loadProgress}%`,
                background: 'linear-gradient(90deg, #c9a227, #f5d980)',
                borderRadius: 9999,
                transition: 'width 0.2s ease',
              }}
            />
          </div>
          <div
            style={{
              marginTop: '1rem',
              color: 'rgba(255,255,255,0.4)',
              fontSize: '0.8rem',
              letterSpacing: '0.1em',
            }}
          >
            {loadProgress}%
          </div>
        </div>
      )}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          display: 'block',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.8s ease',
        }}
      />
    </>
  );
}
