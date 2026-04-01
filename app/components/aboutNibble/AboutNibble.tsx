'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

/* ─────────────────────────────────────────────
   STORY LINES — each has a scroll threshold (0–1)
   at which it becomes fully visible
───────────────────────────────────────────── */
const STORY_LINES = [
  {
    rune: 'ᚠ',
    label: 'Origin',
    text: 'From the divine forge of imagination,',
    sub: 'we shape bold digital realms.',
    threshold: 0.08,
  },
  {
    rune: 'ᚢ',
    label: 'Craft',
    text: 'Every idea forged through precision,',
    sub: 'craft, and fearless experimentation.',
    threshold: 0.28,
  },
  {
    rune: 'ᚦ',
    label: 'Rise',
    text: 'Builders rise. Engineers ascend.',
    sub: 'Legends are built one commit at a time.',
    threshold: 0.48,
  },
  {
    rune: 'ᚨ',
    label: 'Legacy',
    text: 'Welcome to the Kingdom of Nibble —',
    sub: 'where innovation becomes legacy.',
    threshold: 0.68,
  },
];

/* Particle config */
const PARTICLES = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  x: 10 + Math.random() * 80,
  y: 15 + Math.random() * 70,
  size: 1.5 + Math.random() * 2.5,
  dur: 5 + Math.random() * 6,
  delay: Math.random() * 4,
  opacity: 0.3 + Math.random() * 0.5,
}));

export default function KingdomOfNibble() {
  const outerRef = useRef<HTMLDivElement>(null);     // scroll container (200vh)
  const stickyRef = useRef<HTMLDivElement>(null);    // sticky 100vh stage
  const [progress, setProgress] = useState(0);       // 0 → 1 across the scroll range

  /* Track scroll progress */
  useEffect(() => {
    const onScroll = () => {
      const el = outerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      // How far the top of the outer element has scrolled past the viewport top
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / total));
      setProgress(p);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Helper: compute opacity + translateY for each line */
  const lineStyle = (threshold: number, windowSize = 0.18) => {
    const raw = (progress - threshold) / windowSize;
    const opacity = Math.max(0, Math.min(1, raw));
    const y = Math.max(0, 40 - raw * 40);
    const blur = Math.max(0, 8 - raw * 8);
    return { opacity, y, blur };
  };

  /* Central orb glow pulsing based on progress */
  const orbScale = 0.9 + progress * 0.22;
  const orbGlow = Math.round(progress * 40);

  return (
    /* ── OUTER: tall scroll container ── */
    <div ref={outerRef} style={{ height: '260vh', position: 'relative' }} id="about">

      {/* ── STICKY STAGE ── */}
      <div
        ref={stickyRef}
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(170deg, #fdfcf7 0%, #f8f3e6 50%, #f3edd8 100%)',
        }}
      >
        {/* ══ BACKGROUND LAYERS ══ */}

        {/* Radial gold glow — intensifies with progress */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(ellipse at 50% 40%, rgba(201,162,39,${0.04 + progress * 0.10}) 0%, transparent 65%)`,
            pointerEvents: 'none',
            transition: 'background 200ms linear',
          }}
        />

        {/* Soft light rays */}
        <div
          style={{
            position: 'absolute',
            top: '-20%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80vw',
            height: '90vh',
            background: `
              conic-gradient(from 265deg at 50% 0%,
                transparent 0deg,
                rgba(245,217,128,${0.04 + progress * 0.06}) 8deg,
                transparent 18deg,
                rgba(201,162,39,${0.03 + progress * 0.05}) 28deg,
                transparent 40deg,
                rgba(245,217,128,${0.05 + progress * 0.07}) 52deg,
                transparent 65deg,
                rgba(201,162,39,${0.03 + progress * 0.04}) 80deg,
                transparent 95deg
              )
            `,
            pointerEvents: 'none',
            mixBlendMode: 'multiply',
            opacity: 0.6 + progress * 0.4,
            transition: 'opacity 300ms linear',
          }}
        />

        {/* Floating particles */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          {PARTICLES.map((p) => (
            <div
              key={p.id}
              style={{
                position: 'absolute',
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                borderRadius: '50%',
                background: `radial-gradient(circle, #f5d980, #c9a227)`,
                boxShadow: `0 0 ${p.size * 3}px rgba(201,162,39,0.6)`,
                opacity: progress > 0.05 ? p.opacity : 0,
                animation: `nibble-particle ${p.dur}s ease-in-out ${p.delay}s infinite`,
                transition: 'opacity 800ms ease',
              }}
            />
          ))}
        </div>

        {/* Grain micro-texture */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundSize: '160px 160px',
            opacity: 0.028,
            mixBlendMode: 'overlay',
            pointerEvents: 'none',
          }}
        />

        {/* ══ CONTENT LAYOUT ══ */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            width: '100%',
            maxWidth: '1100px',
            padding: '0 2rem',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '4rem',
            alignItems: 'center',
          }}
          className="scroll-story-grid"
        >
          {/* ── LEFT: TEXT REVEAL COLUMN ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>

            {/* Section eyebrow */}
            <div
              style={{
                opacity: progress > 0 ? 1 : 0,
                transform: `translateY(${progress > 0 ? 0 : 20}px)`,
                transition: 'opacity 700ms ease, transform 700ms ease',
                marginBottom: '2.5rem',
              }}
            >
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 18px',
                  borderRadius: '40px',
                  border: '1px solid rgba(201,162,39,0.35)',
                  background: 'rgba(255,255,255,0.7)',
                  backdropFilter: 'blur(10px)',
                  fontSize: '0.62rem',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  letterSpacing: '0.28em',
                  textTransform: 'uppercase',
                  color: '#8f6b14',
                }}
              >
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#c9a227', boxShadow: '0 0 8px rgba(201,162,39,0.7)', animation: 'goldFlicker 3s infinite' }} />
                Official Technical Society
              </span>
            </div>

            {/* Main heading */}
            <div
              style={{
                opacity: progress > 0 ? Math.min(1, progress / 0.06) : 0,
                transform: `translateY(${Math.max(0, 30 - (progress / 0.06) * 30)}px)`,
                marginBottom: '3rem',
              }}
            >
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(2.8rem, 5vw, 4.5rem)',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  lineHeight: 1.05,
                  color: '#1a1005',
                  margin: 0,
                }}
              >
                The Kingdom<br />
                <span
                  style={{
                    background: 'linear-gradient(135deg, #6b4a0a 0%, #c9a227 35%, #f5d980 60%, #c9a227 80%, #6b4a0a 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: 'drop-shadow(0 2px 12px rgba(201,162,39,0.35))',
                  }}
                >
                  Of Nibble
                </span>
              </h2>
            </div>

            {/* Story lines — scroll-driven reveal */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {STORY_LINES.map((item) => {
                const { opacity, y, blur } = lineStyle(item.threshold);
                return (
                  <div
                    key={item.rune}
                    style={{
                      opacity,
                      transform: `translateY(${y}px)`,
                      filter: `blur(${blur}px)`,
                      transition: 'none', // pure scroll-driven — no CSS transition
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '1rem',
                    }}
                  >
                    {/* Rune badge */}
                    <div
                      style={{
                        flexShrink: 0,
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        border: '1px solid rgba(201,162,39,0.4)',
                        background: 'radial-gradient(circle at 35% 35%, #f5d980, #c9a227 55%, #7a5210)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: `0 0 ${8 + Math.round(opacity * 14)}px rgba(201,162,39,${0.3 + opacity * 0.4})`,
                        color: 'rgba(60,30,0,0.85)',
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1rem',
                        marginTop: '2px',
                      }}
                    >
                      {item.rune}
                    </div>
                    <div>
                      <p
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: 'clamp(1.05rem, 2.2vw, 1.35rem)',
                          fontWeight: 700,
                          letterSpacing: '0.05em',
                          color: '#1a1005',
                          margin: 0,
                          lineHeight: 1.3,
                        }}
                      >
                        {item.text}
                      </p>
                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
                          color: '#6b5a30',
                          margin: '4px 0 0',
                          letterSpacing: '0.03em',
                          lineHeight: 1.5,
                        }}
                      >
                        {item.sub}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Scroll hint */}
            <div
              style={{
                marginTop: '2.5rem',
                opacity: progress < 0.85 ? Math.max(0, (0.15 - Math.abs(progress - 0.07)) / 0.15) : 0,
                transition: 'opacity 400ms ease',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <div style={{ height: '1px', width: '32px', background: 'linear-gradient(90deg, transparent, rgba(201,162,39,0.5))' }} />
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.58rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(201,162,39,0.6)' }}>
                Scroll to reveal
              </span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ color: '#c9a227', animation: 'scrollPulse 2s ease-in-out infinite' }}>
                <path d="M12 5v14M12 19l-4-4M12 19l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {/* ── RIGHT: CENTRAL VISUAL ORBS ── */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              minHeight: '460px',
            }}
            className="scroll-story-visual"
          >
            {/* Outer ambient ring */}
            <div
              style={{
                position: 'absolute',
                width: `${280 + orbGlow}px`,
                height: `${280 + orbGlow}px`,
                borderRadius: '50%',
                border: `1px solid rgba(201,162,39,${0.1 + progress * 0.2})`,
                background: `radial-gradient(circle, rgba(201,162,39,${0.03 + progress * 0.07}) 0%, transparent 70%)`,
                boxShadow: `0 0 ${40 + orbGlow * 2}px rgba(201,162,39,${0.08 + progress * 0.15})`,
                transition: 'none',
                animation: 'divineFloat 7s ease-in-out infinite',
              }}
            />

            {/* Mid ring */}
            <div
              style={{
                position: 'absolute',
                width: `${200 + orbGlow / 2}px`,
                height: `${200 + orbGlow / 2}px`,
                borderRadius: '50%',
                border: `1px solid rgba(201,162,39,${0.18 + progress * 0.25})`,
                animation: 'divineFloat 5s ease-in-out 0.5s infinite',
              }}
            />

            {/* Main image card */}
            <div
              style={{
                position: 'relative',
                width: '340px',
                height: '240px',
                borderRadius: '2rem',
                border: '1px solid rgba(201,162,39,0.4)',
                background: 'rgba(255,252,240,0.7)',
                backdropFilter: 'blur(12px)',
                overflow: 'hidden',
                transform: `scale(${orbScale})`,
                transition: 'none',
                boxShadow: `
                  0 ${20 + orbGlow}px ${60 + orbGlow * 2}px rgba(0,0,0,${0.06 + progress * 0.09}),
                  0 0 ${orbGlow + 10}px rgba(201,162,39,${0.1 + progress * 0.2}),
                  inset 0 1px 0 rgba(255,255,255,0.8)
                `,
                animation: 'divineFloat 6s ease-in-out 1s infinite',
              }}
            >
              <Image
                src="/aboutNibbleBackground.png"
                alt="Kingdom of Nibble"
                fill
                sizes="340px"
                style={{ objectFit: 'cover', objectPosition: 'center', opacity: 0.55, mixBlendMode: 'luminosity' }}
              />
              {/* Shimmer */}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, transparent 50%, rgba(201,162,39,0.08) 100%)', pointerEvents: 'none' }} />

              {/* Gold bottom glow */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%', background: 'linear-gradient(0deg, rgba(201,162,39,0.12) 0%, transparent 100%)', pointerEvents: 'none' }} />
            </div>

            {/* Core orb on top of card */}
            <div
              style={{
                position: 'absolute',
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                border: '1.5px solid rgba(201,162,39,0.6)',
                background: 'radial-gradient(circle at 35% 30%, #fff9e6, #f5d980 40%, #c9a227 70%, #7a5210)',
                boxShadow: `0 0 ${20 + orbGlow}px rgba(201,162,39,0.55), inset 0 2px 0 rgba(255,255,255,0.7)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'rgba(60,30,0,0.85)',
                fontFamily: 'var(--font-heading)',
                fontSize: '1.8rem',
                transform: `scale(${0.85 + progress * 0.25})`,
                transition: 'none',
                animation: 'divinePulse 3.5s ease-in-out infinite',
              }}
            >
              ✦
            </div>

            {/* Tags that materialize */}
            {[
              { label: 'Innovation', x: '90%', y: '12%', th: 0.20 },
              { label: 'Engineering', x: '-12%', y: '18%', th: 0.32 },
              { label: 'Community', x: '85%', y: '72%', th: 0.44 },
              { label: 'Leadership', x: '-15%', y: '76%', th: 0.56 },
            ].map((tag) => {
              const { opacity: tOp, y: tY } = lineStyle(tag.th, 0.14);
              return (
                <div
                  key={tag.label}
                  style={{
                    position: 'absolute',
                    left: tag.x,
                    top: tag.y,
                    opacity: tOp,
                    transform: `translateY(${tY * 0.4}px)`,
                    padding: '5px 14px',
                    borderRadius: '20px',
                    border: '1px solid rgba(201,162,39,0.3)',
                    background: 'rgba(255,255,255,0.75)',
                    backdropFilter: 'blur(8px)',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.58rem',
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#8f6b14',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {tag.label}
                </div>
              );
            })}
          </div>
        </div>

        {/* ══ PROGRESS BAR (left vertical) ══ */}
        <div
          style={{
            position: 'absolute',
            left: '2.5rem',
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0',
            zIndex: 10,
            opacity: progress > 0.03 ? 1 : 0,
            transition: 'opacity 500ms ease',
          }}
          className="scroll-progress-bar-container"
        >
          <div
            style={{
              width: '1px',
              height: '180px',
              background: 'rgba(201,162,39,0.15)',
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '1px',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${progress * 100}%`,
                background: 'linear-gradient(180deg, #f5d980, #c9a227)',
                boxShadow: '0 0 8px rgba(201,162,39,0.6)',
                borderRadius: '1px',
                transition: 'none',
              }}
            />
          </div>
          <div
            style={{
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              background: '#c9a227',
              marginTop: '4px',
              boxShadow: '0 0 8px rgba(201,162,39,0.7)',
            }}
          />
        </div>

        {/* Inline keyframes */}
        <style>{`
          @keyframes divineFloat {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-12px) rotate(0.4deg); }
          }
          @keyframes divinePulse {
            0%, 100% { box-shadow: 0 0 20px rgba(201,162,39,0.4), inset 0 2px 0 rgba(255,255,255,0.7); }
            50% { box-shadow: 0 0 45px rgba(201,162,39,0.7), inset 0 2px 0 rgba(255,255,255,0.7); }
          }
          @media (max-width: 768px) {
            .scroll-story-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
            .scroll-story-visual { display: none !important; }
            .scroll-progress-bar-container { display: none !important; }
          }
        `}</style>

      </div>{/* end sticky */}
    </div>/* end outer */
  );
}