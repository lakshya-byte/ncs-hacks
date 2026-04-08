'use client';

import React, { useRef } from 'react';
import Image from 'next/image';

// ─────────────────────────────────────────────────────────────────────────────
// PHOTO REGISTRY
// Add more photos here as they become available.
// Each entry: { src, alt, aspect }
// aspect: 'square' | 'portrait' | 'landscape'
// ─────────────────────────────────────────────────────────────────────────────
const ALL_PHOTOS = [
  { src: '/event_photos/image.png', alt: 'Memories of JSS', aspect: 'landscape' as const },
  { src: '/event_photos/image copy.png', alt: 'NCS Hackathon Event', aspect: 'portrait' as const },
  { src: '/event_photos/image copy 2.png', alt: 'Hackathon Memories', aspect: 'landscape' as const },
  { src: '/event_photos/image copy 3.png', alt: 'NCS Event', aspect: 'portrait' as const },
  { src: '/event_photos/image copy 4.png', alt: 'JSS Moments', aspect: 'landscape' as const },
  { src: '/event_photos/image copy 5.png', alt: 'NCS Highlights', aspect: 'portrait' as const },
  { src: '/event_photos/image copy 6.png', alt: 'Hackathon Journey', aspect: 'landscape' as const },
  { src: '/event_photos/image copy 7.png', alt: 'Stage NCS', aspect: 'landscape' as const },
];

// Deterministic distribution across 4 columns.
// When there's only one photo we tile it so each column has enough height.
function buildColumn(colIndex: number, count = 7): typeof ALL_PHOTOS {
  const pool = [...ALL_PHOTOS];
  const result: typeof ALL_PHOTOS = [];
  for (let i = 0; i < count; i++) {
    result.push(pool[(colIndex * 3 + i) % pool.length]);
  }
  return result;
}

// Column config — direction, speed, slight tilt for visual depth
const COLUMNS = [
  { direction: 'up',   duration: 36, nudge: -1 },
  { direction: 'down', duration: 48, nudge:  1 },
  { direction: 'up',   duration: 40, nudge: -0.5 },
  { direction: 'down', duration: 30, nudge:  0.5 },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// SINGLE PHOTO CARD
// ─────────────────────────────────────────────────────────────────────────────
function PhotoCard({
  photo,
  index,
}: {
  photo: (typeof ALL_PHOTOS)[0];
  index: number;
}) {
  // Alternate aspect ratios based on position for organic feel
  const aspectRatios = ['4/5', '1/1', '4/3', '3/4', '1/1', '4/5', '4/3'];
  const ratio = aspectRatios[index % aspectRatios.length];

  return (
    <div
      className="memories-card group relative w-full shrink-0 overflow-hidden"
      style={{
        aspectRatio: ratio,
        borderRadius: '16px',
        border: '1px solid rgba(212,175,55,0.15)',
        boxShadow: '0 4px 25px rgba(0,0,0,0.4)',
        cursor: 'pointer',
        willChange: 'transform',
        transition: 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease, border-color 0.4s ease',
        background: 'rgba(25,25,25,0.8)',
      }}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes="(max-width: 640px) 45vw, (max-width: 1024px) 22vw, 20vw"
        className="object-cover object-center transition-all duration-700 group-hover:scale-[1.06] group-hover:brightness-110"
        quality={80}
      />

      {/* Hover gold shimmer overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            'linear-gradient(135deg, transparent 40%, rgba(212,175,55,0.12) 60%, transparent 80%)',
        }}
      />

      {/* Hover border glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{
          borderRadius: '16px',
          boxShadow: 'inset 0 0 0 1.5px rgba(212,175,55,0.5)',
        }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SINGLE COLUMN — infinite scroll via CSS animation
// ─────────────────────────────────────────────────────────────────────────────
function ScrollColumn({
  colIndex,
  direction,
  duration,
  nudge,
}: {
  colIndex: number;
  direction: 'up' | 'down';
  duration: number;
  nudge: number;
}) {
  const photos = buildColumn(colIndex, 8);
  const stripRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (stripRef.current) stripRef.current.style.animationPlayState = 'paused';
  };
  const handleMouseLeave = () => {
    if (stripRef.current) stripRef.current.style.animationPlayState = 'running';
  };

  return (
    <div
      className="relative overflow-hidden flex-1 min-w-0"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `rotate(${nudge}deg) scale(1.04)`,
        transformOrigin: 'center center',
        cursor: 'default',
      }}
    >
      {/* The scroll strip — duplicated for seamless loop */}
      <div
        ref={stripRef}
        className={direction === 'up' ? 'memories-scroll-up' : 'memories-scroll-down'}
        style={{ animationDuration: `${duration}s` }}
      >
        {/* Original set */}
        <div className="flex flex-col gap-3 px-1.5 pb-3">
          {photos.map((photo, i) => (
            <PhotoCard key={`col${colIndex}-a-${i}`} photo={photo} index={i} />
          ))}
        </div>
        {/* Duplicate for seamless loop */}
        <div className="flex flex-col gap-3 px-1.5 pb-3" aria-hidden="true">
          {photos.map((photo, i) => (
            <PhotoCard key={`col${colIndex}-b-${i}`} photo={photo} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN SECTION
// ─────────────────────────────────────────────────────────────────────────────
export default function PhotoStream() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="memories"
      style={{
        position: 'relative',
        width: '100%',
        height: 'clamp(700px, 130vh, 1100px)',
        overflow: 'hidden',
        background: '#080706',
      }}
    >
      {/* ── Keyframe definitions ── */}
      <style>{`
        @keyframes memories-up {
          0%   { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes memories-down {
          0%   { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
        .memories-scroll-up {
          animation: memories-up linear infinite;
          will-change: transform;
        }
        .memories-scroll-down {
          animation: memories-down linear infinite;
          will-change: transform;
        }
        /* Card hover — done in CSS so it works even when column is paused */
        .memories-card:hover {
          transform: scale(1.04);
          box-shadow: 0 16px 48px rgba(0,0,0,0.14), 0 0 0 1.5px rgba(212,175,55,0.45) !important;
          border-color: rgba(212,175,55,0.5) !important;
          z-index: 10;
        }

        /* Responsive grid */
        .memories-grid {
          display: flex;
          gap: clamp(0.5rem, 1.5vw, 1.25rem);
          width: 100%;
          height: 100%;
          align-items: flex-start;
        }
        @media (max-width: 768px) {
          .memories-grid > *:nth-child(3),
          .memories-grid > *:nth-child(4) {
            display: none;
          }
        }
        @media (max-width: 480px) {
          .memories-grid > *:nth-child(2) {
            display: none;
          }
        }
      `}</style>

      {/* ── Subtle parchment background texture ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(184,134,11,0.02) 60px, rgba(184,134,11,0.02) 61px)',
          zIndex: 0,
        }}
      />

      {/* ── Warm central radial glow ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.07) 0%, transparent 65%)',
          zIndex: 0,
        }}
      />

      {/* ── 4-column scroll grid (slightly tilted for depth) ── */}
      <div
        className="memories-grid absolute"
        style={{
          top: '-5%',
          left: 'clamp(-1rem, -2vw, -1.5rem)',
          right: 'clamp(-1rem, -2vw, -1.5rem)',
          bottom: '-5%',
          padding: '0 clamp(0.5rem, 2vw, 1.5rem)',
          transform: 'rotate(-2deg) scale(1.06)',
          transformOrigin: 'center center',
          zIndex: 1,
        }}
      >
        {COLUMNS.map((col, i) => (
          <ScrollColumn
            key={i}
            colIndex={i}
            direction={col.direction}
            duration={col.duration}
            nudge={0} /* Per-column tilt handled inside ScrollColumn */
          />
        ))}
      </div>

      {/* ── Top fade mask — creates infinite illusion ── */}
      <div
        className="absolute inset-x-0 top-0 pointer-events-none"
        style={{
          height: '28%',
          background:
            'linear-gradient(to bottom, #080706 0%, rgba(8,7,6,0.8) 50%, transparent 100%)',
          zIndex: 10,
        }}
      />

      {/* ── Bottom fade mask ── */}
      <div
        className="absolute inset-x-0 bottom-0 pointer-events-none"
        style={{
          height: '28%',
          background:
            'linear-gradient(to top, #080706 0%, rgba(8,7,6,0.8) 50%, transparent 100%)',
          zIndex: 10,
        }}
      />

      {/* ── Left fade ── */}
      <div
        className="absolute inset-y-0 left-0 pointer-events-none"
        style={{
          width: '6%',
          background: 'linear-gradient(to right, #080706, transparent)',
          zIndex: 10,
        }}
      />

      {/* ── Right fade ── */}
      <div
        className="absolute inset-y-0 right-0 pointer-events-none"
        style={{
          width: '6%',
          background: 'linear-gradient(to left, #080706, transparent)',
          zIndex: 10,
        }}
      />

      {/* ══ Centred text overlay ══ */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
        style={{ zIndex: 20 }}
      >
        {/* Frosted pill behind text */}
        <div
          style={{
            padding: 'clamp(1.5rem, 3vw, 2.5rem) clamp(2rem, 5vw, 4rem)',
            borderRadius: '24px',
            background: 'rgba(15,15,15,0.72)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            border: '1px solid rgba(212,175,55,0.25)',
            boxShadow: '0 8px 48px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.1) inset',
            textAlign: 'center',
            maxWidth: 'clamp(280px, 55vw, 620px)',
            width: '90%',
          }}
        >
          {/* Eyebrow */}
          <p
            className="font-heading uppercase"
            style={{
              fontSize: 'clamp(0.55rem, 0.8vw, 0.7rem)',
              letterSpacing: '0.48em',
              color: '#B8860B',
              fontWeight: 700,
              marginBottom: '0.85rem',
              opacity: 0.8,
            }}
          >
            ✦&nbsp;&nbsp;INOUT HACKS&nbsp;&nbsp;✦
          </p>

          {/* Main heading */}
          <h2
            className="font-heading uppercase"
            style={{
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              fontWeight: 900,
              letterSpacing: '0.06em',
              lineHeight: 1.05,
              color: '#fff',
              marginBottom: '0.85rem',
            }}
          >
            Memories of{' '}
            <span
              style={{
                background:
                  'linear-gradient(135deg, #c9a227 0%, #f5d980 50%, #9a6c10 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              JSS
            </span>
          </h2>

          {/* Gold ornament */}
          <div
            className="flex items-center justify-center gap-3"
            style={{ marginBottom: '0.85rem' }}
          >
            <div
              style={{
                width: '40px',
                height: '1px',
                background: 'linear-gradient(to right, transparent, rgba(201,162,39,0.6))',
              }}
            />
            <div
              style={{
                width: '6px',
                height: '6px',
                background: '#c9a227',
                transform: 'rotate(45deg)',
                flexShrink: 0,
              }}
            />
            <div
              style={{
                width: '40px',
                height: '1px',
                background: 'linear-gradient(to left, transparent, rgba(201,162,39,0.6))',
              }}
            />
          </div>

          {/* Subtitle */}
          <p
            className="font-body"
            style={{
              fontSize: 'clamp(0.72rem, 1vw, 0.875rem)',
              color: 'rgba(255,255,255,0.6)',
              fontWeight: 500,
              letterSpacing: '0.03em',
              lineHeight: 1.6,
            }}
          >
            A legacy forged in code — hover to pause the flow
          </p>
        </div>
      </div>
    </section>
  );
}
