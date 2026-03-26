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

      // Cinematic zoom: slight scale increase as progress goes 0→1
      const zoomFactor = 1 + progress * 0.08;
      const zw = w * zoomFactor;
      const zh = h * zoomFactor;
      const zx = (canvas.width - zw) / 2;
      const zy = (canvas.height - zh) / 2;

      ctx.drawImage(img, zx, zy, zw, zh);

      // Bloom / golden light at the end
      if (progress > 0.5) {
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
      end: () => "+=" + (window.innerHeight * 5),
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
        <div className="absolute inset-0 bg-black flex flex-col items-center justify-center z-100">
          <div className="font-[Cinzel,serif] text-[#c9a227] text-[1.1rem] tracking-[0.25em] mb-8">
            LOADING ASGARD
          </div>
          <div className="w-[260px] h-[3px] bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[linear-gradient(90deg,#c9a227,#f5d980)] rounded-full transition-[width] duration-200 ease-[ease]"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
          <div className="mt-4 text-white/40 text-[0.8rem] tracking-widest">
            {loadProgress}%
          </div>
        </div>
      )}
      <canvas
        ref={canvasRef}
        className={`absolute top-0 left-0 w-full h-full block -z-10 transition-opacity duration-800 ease-[ease] ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </>
  );
}
