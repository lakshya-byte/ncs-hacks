'use client';

import React, { useEffect, useRef } from 'react';

/* ── Static sparkle positions (generated once, stable across renders) ── */
const SPARKLES = [
  { x: 4,  y: 18, s: 3,   d: 1.8, delay: 0.0  },
  { x: 11, y: 72, s: 2,   d: 2.4, delay: 0.6  },
  { x: 18, y: 35, s: 4,   d: 1.6, delay: 1.1  },
  { x: 24, y: 85, s: 2.5, d: 2.1, delay: 0.3  },
  { x: 31, y: 12, s: 3,   d: 2.8, delay: 1.7  },
  { x: 38, y: 58, s: 2,   d: 1.5, delay: 0.9  },
  { x: 44, y: 28, s: 4.5, d: 2.0, delay: 0.4  },
  { x: 50, y: 78, s: 2,   d: 2.6, delay: 1.3  },
  { x: 56, y: 42, s: 3.5, d: 1.9, delay: 0.7  },
  { x: 63, y: 15, s: 2.5, d: 2.3, delay: 1.5  },
  { x: 69, y: 65, s: 3,   d: 1.7, delay: 0.2  },
  { x: 75, y: 88, s: 2,   d: 2.5, delay: 1.0  },
  { x: 82, y: 32, s: 4,   d: 2.2, delay: 0.8  },
  { x: 88, y: 52, s: 2.5, d: 1.6, delay: 1.6  },
  { x: 94, y: 22, s: 3,   d: 2.0, delay: 0.5  },
  { x: 7,  y: 50, s: 2,   d: 1.8, delay: 2.0  },
  { x: 27, y: 68, s: 3.5, d: 2.7, delay: 1.2  },
  { x: 59, y: 90, s: 2,   d: 1.4, delay: 0.1  },
  { x: 71, y: 5,  s: 3,   d: 2.1, delay: 1.8  },
  { x: 90, y: 75, s: 2.5, d: 1.9, delay: 0.35 },
];

/* ── Marquee item — repeated enough to seamlessly loop ── */
const ITEM_COUNT = 8;

export default function MarqueeStrip() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /* ── Optional canvas starfield ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width  = canvas.offsetWidth  * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener('resize', resize);

    /* micro stars */
    const stars = Array.from({ length: 120 }, () => ({
      x:  Math.random() * (canvas.offsetWidth),
      y:  Math.random() * (canvas.offsetHeight),
      r:  0.4 + Math.random() * 1.2,
      a:  Math.random(),
      da: 0.005 + Math.random() * 0.012,
    }));

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      stars.forEach((s) => {
        s.a += s.da;
        if (s.a > 1 || s.a < 0) s.da *= -1;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${s.a * 0.7})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '260px',
        overflow: 'hidden',
        background: 'linear-gradient(150deg, #080706 0%, #121110 50%, #080706 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'center',
      }}
    >
      {/* ── Starfield canvas ── */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* ── Radial deep-blue glow ── */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 50% 50%, rgba(201, 168, 76,0.18) 0%, rgba(80,40,0,0.1) 45%, transparent 72%)',
        pointerEvents: 'none',
        zIndex: 1,
      }} />

      {/* ── Gold aurora shimmer at top ── */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '-10%',
        width: '120%',
        height: '40%',
        background: 'linear-gradient(180deg, rgba(201, 168, 76,0.12) 0%, transparent 100%)',
        filter: 'blur(14px)',
        pointerEvents: 'none',
        zIndex: 1,
        animation: 'stripAurora 8s ease-in-out infinite',
      }} />

      {/* ── Gold top border ── */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: '1px',
        background: 'linear-gradient(90deg, transparent 0%, rgba(201, 168, 76,0.25) 15%, rgba(245,217,128,0.7) 50%, rgba(201, 168, 76,0.25) 85%, transparent 100%)',
        zIndex: 3,
      }} />

      {/* ── CSS Sparkles (4-point stars) ── */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2 }}>
        {SPARKLES.map((sp, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${sp.x}%`,
              top:  `${sp.y}%`,
              width:  `${sp.s}px`,
              height: `${sp.s}px`,
              animation: `sparkleFlare ${sp.d}s ease-in-out ${sp.delay}s infinite`,
              zIndex: 2,
            }}
          >
            {/* 4-point star shape via two rotated bars */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(90deg, transparent 45%, rgba(255,255,255,0.9) 50%, transparent 55%)',
            }} />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(0deg, transparent 45%, rgba(255,255,255,0.9) 50%, transparent 55%)',
            }} />
            {/* Core dot */}
            <div style={{
              position: 'absolute',
              top: '50%', left: '50%',
              transform: 'translate(-50%,-50%)',
              width: `${Math.max(1, sp.s * 0.4)}px`,
              height: `${Math.max(1, sp.s * 0.4)}px`,
              borderRadius: '50%',
              background: '#fff',
              boxShadow: `0 0 ${sp.s * 2}px rgba(255,255,255,0.8), 0 0 ${sp.s * 4}px rgba(180,200,255,0.4)`,
            }} />
          </div>
        ))}

        {/* Gold sparkles (bigger, rarer) */}
        {[
          { x: 15, y: 40, s: 7, d: 3.5, delay: 0.5 },
          { x: 42, y: 65, s: 6, d: 4.0, delay: 1.8 },
          { x: 67, y: 25, s: 8, d: 3.2, delay: 0.9 },
          { x: 85, y: 60, s: 6, d: 3.8, delay: 2.3 },
          { x: 52, y: 80, s: 5, d: 4.2, delay: 0.2 },
        ].map((sp, i) => (
          <div
            key={`gold-${i}`}
            style={{
              position: 'absolute',
              left: `${sp.x}%`,
              top:  `${sp.y}%`,
              width:  `${sp.s}px`,
              height: `${sp.s}px`,
              animation: `goldSparkle ${sp.d}s ease-in-out ${sp.delay}s infinite`,
            }}
          >
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(90deg, transparent 40%, rgba(245,217,128,0.95) 50%, transparent 60%)',
            }} />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(0deg, transparent 40%, rgba(245,217,128,0.95) 50%, transparent 60%)',
            }} />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(45deg, transparent 42%, rgba(255,235,130,0.6) 50%, transparent 58%)',
            }} />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(-45deg, transparent 42%, rgba(255,235,130,0.6) 50%, transparent 58%)',
            }} />
            <div style={{
              position: 'absolute',
              top: '50%', left: '50%',
              transform: 'translate(-50%,-50%)',
              width: `${sp.s * 0.35}px`,
              height: `${sp.s * 0.35}px`,
              borderRadius: '50%',
              background: '#F5E0A3',
              boxShadow: `0 0 ${sp.s}px rgba(245,217,128,0.9), 0 0 ${sp.s * 3}px rgba(201, 168, 76,0.5)`,
            }} />
          </div>
        ))}
      </div>

      {/* ══════════════════════════════════
          SCROLLING ROWS
      ══════════════════════════════════ */}
      <div style={{ position: 'relative', zIndex: 4, overflow: 'hidden', padding: '0' }}>

        {/* Row 1 — scrolls left — large bold text */}
        <div style={{
          display: 'flex',
          width: 'max-content',
          animation: 'marqueeLeft 32s linear infinite',
          padding: '2.2rem 0 0.6rem',
        }}>
          {Array.from({ length: ITEM_COUNT }).map((_, i) => (
            <div
              key={i}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0',
                flexShrink: 0,
                whiteSpace: 'nowrap',
              }}
            >
              <span style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
                fontWeight: 900,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                padding: '0 3rem',
                background: 'linear-gradient(135deg, #8F722E 0%, #C9A84C 28%, #F5E0A3 50%, #F5E0A3 62%, #C9A84C 76%, #8F722E 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 14px rgba(201, 168, 76,0.35))',
              }}>
                {i % 2 === 0 ? 'NIBBLE COMPUTER SOCIETY' : 'CSE TECHNICAL COUNCIL'}
              </span>
              {/* Gem separator — alternates between rune and star */}
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                border: `1px solid rgba(201, 168, 76,0.45)`,
                background: 'radial-gradient(circle at 35% 35%, rgba(245,217,128,0.25), rgba(201, 168, 76,0.1))',
                boxShadow: '0 0 12px rgba(201, 168, 76,0.3)',
                color: '#F5E0A3',
                fontFamily: 'var(--font-heading)',
                fontSize: '1.1rem',
                flexShrink: 0,
              }}>
                {i % 2 === 0 ? 'ᚦ' : '✦'}
              </span>
            </div>
          ))}
        </div>

        {/* Row 2 — scrolls right — subtitle */}
        <div style={{
          display: 'flex',
          width: 'max-content',
          animation: 'marqueeRight 24s linear infinite',
          padding: '0.4rem 0',
        }}>
          {Array.from({ length: ITEM_COUNT }).map((_, i) => (
            <div
              key={i}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0',
                flexShrink: 0,
                whiteSpace: 'nowrap',
              }}
            >
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(0.85rem, 1.8vw, 1.25rem)',
                fontWeight: 800,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                padding: '0 2.5rem',
                color: 'rgba(245,217,128,0.45)',
              }}>
                ᚠ &nbsp; NIBBLE COMPUTER SOCIETY · CSE TECHNICAL COUNCIL · JSSATEN &nbsp; ᚠ
              </span>
              <span style={{
                color: 'rgba(201, 168, 76,0.3)',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.75rem',
                padding: '0 1rem',
              }}>
                ✦
              </span>
            </div>
          ))}
        </div>

        {/* Row 3 — scrolls left — even slower, rune sequence */}
        <div style={{
          display: 'flex',
          width: 'max-content',
          animation: 'marqueeLeft 48s linear infinite',
          padding: '0.5rem 0 2rem',
        }}>
          {Array.from({ length: ITEM_COUNT * 2 }).map((_, i) => (
            <span
              key={i}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(0.65rem, 1.2vw, 0.9rem)',
                letterSpacing: '0.55em',
                padding: '0 2rem',
                color: 'rgba(201, 168, 76,0.2)',
                flexShrink: 0,
                whiteSpace: 'nowrap',
              }}
            >
              ᚠ ᚢ ᚦ ᚨ ᚱ ᚲ ᚷ ᚹ ᚺ ᚾ ᛁ ᛃ ᛇ ᛈ ᛉ ᛊ ᛏ ᛒ ᛖ ᛗ ᛚ ᛜ ᛞ ᛟ
            </span>
          ))}
        </div>
      </div>

      {/* ── Edge fade masks ── */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, bottom: 0,
        width: '140px',
        background: 'linear-gradient(90deg, #080706 0%, transparent 100%)',
        pointerEvents: 'none',
        zIndex: 5,
      }} />
      <div style={{
        position: 'absolute',
        top: 0, right: 0, bottom: 0,
        width: '140px',
        background: 'linear-gradient(270deg, #080706 0%, transparent 100%)',
        pointerEvents: 'none',
        zIndex: 5,
      }} />

      {/* ── Bottom separator ── */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(201, 168, 76,0.35) 30%, rgba(245,217,128,0.6) 50%, rgba(201, 168, 76,0.35) 70%, transparent)',
        zIndex: 3,
      }} />

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes marqueeLeft {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marqueeRight {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        @keyframes sparkleFlare {
          0%, 100% { opacity: 0; transform: scale(0.5) rotate(0deg); }
          50%       { opacity: 1; transform: scale(1) rotate(20deg); }
        }
        @keyframes goldSparkle {
          0%, 100% { opacity: 0; transform: scale(0.4) rotate(0deg); }
          40%       { opacity: 0.9; transform: scale(1.1) rotate(15deg); }
          60%       { opacity: 0.7; transform: scale(0.9) rotate(-5deg); }
        }
        @keyframes stripAurora {
          0%, 100% { opacity: 0.6; transform: translateX(0) scaleY(1); }
          50%       { opacity: 1;   transform: translateX(4%) scaleY(1.15); }
        }
      `}</style>
    </div>
  );
}
