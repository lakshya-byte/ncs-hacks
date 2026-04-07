'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function ShootingStars() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    let spawnTimer: gsap.core.Tween | null = null;

    const spawnStar = () => {
      // 1. Create star element
      const star = document.createElement('div');
      
      // 2. Randomized properties
      const left = Math.random() * 100;
      const width = 2 + Math.random() * 2; // Thicker as requested
      const height = 120 + Math.random() * 120;
      const duration = 4 + Math.random() * 5;
      const opacity = 0.4 + Math.random() * 0.5; // Brighter
      const delay = Math.random() * 1;

      // 3. Initial styling
      Object.assign(star.style, {
        position: 'absolute',
        left: `${left}%`,
        top: '-20vh',
        width: `${width}px`,
        height: `${height}px`,
        background: 'linear-gradient(to bottom, transparent, #f5d980, transparent)',
        opacity: '0',
        pointerEvents: 'none',
        borderRadius: '2px',
        boxShadow: '0 0 32px rgba(245, 217, 128, 0.7)', // Brighter glow

        willChange: 'transform, opacity',
      });

      container.appendChild(star);

      // 4. GSAP Animation (Free Fall with easing)
      gsap.to(star, {
        y: '130vh',
        opacity: opacity,
        duration: duration,
        delay: delay,
        ease: 'power1.in', // Accelerating free fall
        onComplete: () => {
          star.remove();
        },
      });

      // 5. Schedule next spawn with varied interval (randomly come) - reduced density
      const nextSpawn = 0.8 + Math.random() * 1.5;
      spawnTimer = gsap.delayedCall(nextSpawn, spawnStar);
    };

    // Initial stars shower (fewer stars now)
    for (let i = 0; i < 4; i++) {
      gsap.delayedCall(i * 1.2, spawnStar);
    }

    return () => {
      if (spawnTimer) spawnTimer.kill();
      // Remove all active stars on unmount
      if (container) {
        while (container.firstChild) {
          container.removeChild(container.firstChild);
        }
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden" 
      style={{ zIndex: -1 }}
      aria-hidden="true"
    />
  );
}
