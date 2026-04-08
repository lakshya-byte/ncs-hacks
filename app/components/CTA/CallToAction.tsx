'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

/* ── Particle config ── */
const DRIFT = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: 5 + Math.random() * 90,
  y: 10 + Math.random() * 80,
  size: 1.5 + Math.random() * 2,
  dur: 6 + Math.random() * 8,
  delay: Math.random() * 5,
  opacity: 0.2 + Math.random() * 0.45,
}));

/* ── Ripple type ── */
interface Ripple {
  id: number;
  x: number;
  y: number;
}

export default function CallToAction() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const runeRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);

  const [inView, setInView] = useState(false);
  const [btnHover, setBtnHover] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const rippleId = useRef(0);

  /* ── Intersection Observer ── */
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.25 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  /* ── Ripple on click ── */
  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = rippleId.current++;
    setRipples((prev) => [...prev, { id, x, y }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 900);
  }, []);

  /* ── CSS transition delay helper ── */
  const appear = (delayMs: number) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0) scale(1)' : 'translateY(32px) scale(0.97)',
    transition: `opacity 900ms cubic-bezier(0.22,1,0.36,1) ${delayMs}ms,
                 transform 1000ms cubic-bezier(0.34,1.56,0.64,1) ${delayMs}ms`,
  });

  return (
    <section
      ref={sectionRef}
      id="cta-ascension"
      style={{
        position: 'relative',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: '#080706',
        textAlign: 'center',
        padding: '1rem 2rem 2rem 2rem',
      }}
    >
      {/* ══ BACKGROUND ══ */}

      {/* Ambient radial glow */}
      <div
        ref={lightRef}
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          opacity: inView ? 1 : 0,
          transition: 'opacity 2s ease',
        }}
      >
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-55%)',
          width: '90vw',
          height: '90vw',
          maxWidth: '900px',
          maxHeight: '900px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,162,39,0.1) 0%, rgba(201,162,39,0.04) 35%, transparent 65%)',
          animation: 'ctaGlowBreath 5s ease-in-out infinite',
        }} />

        {/* Light rays */}
        <div style={{
          position: 'absolute',
          top: '-10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100vw',
          height: '80vh',
          background: `conic-gradient(from 260deg at 50% 0%,
            transparent 0deg,
            rgba(245,217,128,0.02) 10deg,
            transparent 22deg,
            rgba(201,162,39,0.01) 36deg,
            transparent 50deg,
            rgba(245,217,128,0.03) 64deg,
            transparent 78deg,
            rgba(201,162,39,0.01) 92deg,
            transparent 108deg
          )`,
          pointerEvents: 'none',
          mixBlendMode: 'multiply',
          animation: 'ctaRaySpin 80s linear infinite',
        }} />

        {/* Paper texture */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
          opacity: 0.022,
          mixBlendMode: 'overlay',
        }} />
      </div>

      {/* Drifting particles */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {DRIFT.map((p) => (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              borderRadius: '50%',
              background: 'radial-gradient(circle, #f5d980, #c9a227)',
              boxShadow: `0 0 ${p.size * 4}px rgba(201,162,39,0.5)`,
              opacity: inView ? p.opacity : 0,
              animation: `nibble-particle ${p.dur}s ease-in-out ${p.delay}s infinite`,
              transition: 'opacity 1500ms ease',
            }}
          />
        ))}
      </div>

      {/* ══ CONTENT ══ */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: '820px',
          width: '100%',
        }}
      >
        {/* Floating rune orb */}
        <div
          ref={runeRef}
          style={{
            ...appear(0),
            marginBottom: '1.5rem',
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            border: '1.5px solid rgba(201,162,39,0.45)',
            background: 'radial-gradient(circle at 35% 30%, #fff9e6, #f5d980 40%, #c9a227 70%, #7a5210)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 30px rgba(201,162,39,0.35), inset 0 2px 0 rgba(255,255,255,0.5)',
            animation: inView ? 'ctaRuneSpin 50s linear infinite, divinePulse 3.5s ease-in-out infinite' : 'none',
          }}
        >
          <span style={{ fontFamily:'var(--font-heading)', fontSize: '1.6rem', color: 'rgba(55,25,0,0.85)' }}>ᛉ</span>
        </div>

        {/* Pre-heading */}
        <div style={{ ...appear(120), marginBottom: '1rem' }}>
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.62rem',
              fontWeight: 700,
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: 'rgba(201,162,39,0.8)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              justifyContent: 'center',
            }}
          >
            <span style={{ width: '40px', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(201,162,39,0.6))' }} />
            Final Ascension
            <span style={{ width: '40px', height: '1px', background: 'linear-gradient(90deg, rgba(201,162,39,0.6), transparent)' }} />
          </span>
        </div>

        {/* Main Headline */}
        <h2
          ref={headlineRef}
          style={{
            ...appear(220),
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(3rem, 8vw, 7rem)',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            lineHeight: 1.0,
            margin: '0 0 1rem',
          }}
        >
          <span style={{
            display: 'block',
            background: 'linear-gradient(160deg, #fff 0%, #f5d980 40%, #c9a227 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 4px 20px rgba(201,162,39,0.25))',
          }}>
            Only the Worthy
          </span>
          <span style={{
            display: 'block',
            background: 'linear-gradient(160deg, #fff 0%, #f5d980 50%, #d4af37 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 4px 20px rgba(201,162,39,0.2))',
            fontSize: '0.65em',
            letterSpacing: '0.2em',
          }}>
            Ascend.
          </span>
        </h2>

        {/* Subtext */}
        <p
          ref={subtextRef}
          style={{
            ...appear(380),
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            color: 'rgba(255,255,255,0.7)',
            letterSpacing: '0.12em',
            lineHeight: 1.7,
            maxWidth: '520px',
            margin: '0 0 2rem',
          }}
        >
          The realm awaits your creation. Forge something that defies the ordinary — and let your name echo through INOUT.
        </p>

        {/* CTA Button */}
        <div style={appear(520)}>
          <a
            ref={buttonRef}
            href="https://inout2026.devfolio.co/overview"
            target="_blank"
            rel="noopener noreferrer"
            id="cta-ascend-btn"
            onClick={handleClick}
            onMouseEnter={() => setBtnHover(true)}
            onMouseLeave={() => setBtnHover(false)}
            style={{
              position: 'relative',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              padding: '18px 52px',
              borderRadius: '60px',
              textDecoration: 'none',
              overflow: 'hidden',
              transform: btnHover ? 'scale(1.05) translateY(-3px)' : 'scale(1) translateY(0)',
              transition: 'transform 350ms cubic-bezier(0.34,1.56,0.64,1), box-shadow 350ms ease',
              boxShadow: btnHover
                ? '0 0 0 1.5px rgba(245,217,128,0.9), 0 0 30px rgba(201,162,39,0.7), 0 0 70px rgba(201,162,39,0.35), 0 12px 40px rgba(0,0,0,0.18)'
                : '0 0 0 1px rgba(201,162,39,0.45), 0 0 18px rgba(201,162,39,0.3), 0 6px 24px rgba(0,0,0,0.14)',
              cursor: 'pointer',
            }}
          >
            {/* Outer ambient glow */}
            <span style={{
              position: 'absolute',
              inset: '-16px',
              borderRadius: '80px',
              background: 'radial-gradient(ellipse at center, rgba(201,162,39,0.3) 0%, transparent 70%)',
              filter: 'blur(14px)',
              animation: 'ctaGlowBreath 3s ease-in-out infinite',
              opacity: btnHover ? 1 : 0.55,
              transition: 'opacity 400ms ease',
              pointerEvents: 'none',
            }} />

            {/* Conic spinning border */}
            <span style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '60px',
              padding: '1.5px',
              background: 'conic-gradient(from 0deg, #7a5010 0%, #f5d980 20%, #c9a227 40%, #f8d44c 60%, #8a5e0a 80%, #f5d980 90%, #7a5010 100%)',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
              animation: 'borderEnergy 3s linear infinite',
              opacity: btnHover ? 1 : 0.8,
              transition: 'opacity 300ms ease',
              pointerEvents: 'none',
            }} />

            {/* Main fill */}
            <span style={{
              position: 'absolute',
              inset: '1.5px',
              borderRadius: '58px',
              background: btnHover
                ? 'linear-gradient(135deg, #f0c840 0%, #f5d980 30%, #fce97a 55%, #d4a820 80%, #f5d980 100%)'
                : 'linear-gradient(135deg, #5c3a08 0%, #9a7220 25%, #c9a227 45%, #e8c040 60%, #a07820 80%, #5c3a08 100%)',
              transition: 'background 400ms ease',
              boxShadow: btnHover
                ? 'inset 0 1px 0 rgba(255,255,255,0.65), inset 0 -2px 0 rgba(80,40,0,0.35)'
                : 'inset 0 1px 0 rgba(255,255,255,0.22), inset 0 -2px 0 rgba(0,0,0,0.32)',
              pointerEvents: 'none',
            }} />

            {/* Shimmer sweep */}
            <span style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              width: '60%',
              borderRadius: '60px',
              background: 'linear-gradient(105deg, transparent 0%, rgba(255,255,255,0.45) 50%, transparent 100%)',
              animation: btnHover ? 'ctaSweep 0.6s ease-out forwards' : 'ctaSweep 4s ease-in-out infinite 1.5s',
              pointerEvents: 'none',
            }} />

            {/* Pulse ring on hover */}
            {btnHover && (
              <span style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '60px',
                border: '1.5px solid rgba(249,212,76,0.85)',
                animation: 'energyPulse 0.7s ease-out forwards',
                pointerEvents: 'none',
              }} />
            )}
            {btnHover && (
              <span style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '60px',
                border: '1px solid rgba(249,212,76,0.45)',
                animation: 'energyPulse 0.7s ease-out 0.22s forwards',
                pointerEvents: 'none',
              }} />
            )}

            {/* Click ripples */}
            {ripples.map((r) => (
              <span
                key={r.id}
                style={{
                  position: 'absolute',
                  left: r.x,
                  top: r.y,
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.7)',
                  transform: 'translate(-50%, -50%) scale(0)',
                  animation: 'ctaRipple 0.9s cubic-bezier(0.22,1,0.36,1) forwards',
                  pointerEvents: 'none',
                }}
              />
            ))}

            {/* Rune icon */}
            <span style={{
              position: 'relative',
              zIndex: 2,
              fontFamily: 'var(--font-heading)',
              fontSize: '1.15rem',
              lineHeight: 1,
              color: btnHover ? 'rgba(55,25,0,0.9)' : 'rgba(245,217,128,0.95)',
              filter: btnHover ? 'drop-shadow(0 0 4px rgba(255,190,0,0.5))' : 'drop-shadow(0 0 8px rgba(255,215,0,0.6))',
              transform: btnHover ? 'rotate(-15deg) scale(1.2)' : 'rotate(0deg) scale(1)',
              transition: 'transform 350ms cubic-bezier(0.34,1.56,0.64,1), color 300ms ease, filter 300ms ease',
            }}>
              ᚦ
            </span>

            {/* Label */}
            <span style={{
              position: 'relative',
              zIndex: 2,
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              fontSize: '0.72rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: btnHover ? 'rgba(45,20,0,0.95)' : '#fff',
              textShadow: btnHover ? 'none' : '0 1px 10px rgba(0,0,0,0.5)',
              transition: 'color 300ms ease, text-shadow 300ms ease',
            }}>
              Enter the Hackathon
            </span>
          </a>
        </div>

        {/* Small urgency note below */}
        <div style={{ ...appear(680), marginTop: '1.5rem' }}>
          <p style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '0.6rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'rgba(201,162,39,0.55)',
          }}>
            ᚠ &nbsp; The forge closes soon &nbsp; ᚠ
          </p>
        </div>
      </div>

      {/* ══ BOTTOM FADE-OUT ══ */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '120px',
        background: 'linear-gradient(0deg, #080706 0%, transparent 100%)',
        pointerEvents: 'none',
      }} />

      {/* ══ KEYFRAMES ══ */}
      <style>{`
        @keyframes ctaGlowBreath {
          0%, 100% { transform: translate(-50%,-55%) scale(1); opacity: 0.8; }
          50% { transform: translate(-50%,-55%) scale(1.08); opacity: 1; }
        }
        @keyframes ctaRuneSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes ctaRaySpin {
          from { transform: translateX(-50%) rotate(0deg); }
          to { transform: translateX(-50%) rotate(360deg); }
        }
        @keyframes ctaRipple {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 0.8; }
          100% { transform: translate(-50%, -50%) scale(30); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
