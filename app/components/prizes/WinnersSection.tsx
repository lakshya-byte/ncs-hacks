'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';



gsap.registerPlugin(ScrollTrigger);

// ── Particle sizes — deterministic, never Math.random() in render ─────────────
const PARTICLE_SIZES = [3, 4, 3.5, 4.5, 3, 4];

// ── Winner data ───────────────────────────────────────────────────────────────
const WINNERS = [
  {
    id: 1,
    title: 'KING OF AI',
    track: 'Artificial Intelligence',
    subtitle: 'Grand Champion • AI Track',
    rune: 'ᚠ',
    image: '/winners/AI.png',
    prize: '',
    accent: '#B8860B',
    accentLight: '#FFF3C4',
    borderColor: 'rgba(184,134,11,0.45)',
    hoverBorder: 'rgba(212,175,55,0.85)',
    glowColor: 'rgba(212,175,55,0.35)',
  },
  {
    id: 2,
    title: 'ODIN OF WEB',
    track: 'Web Development',
    subtitle: 'Grand Champion • Web Track',
    rune: 'ᚹ',
    image: '/winners/web.png',
    prize: '',
    accent: '#1C5FAE',
    accentLight: '#DDEEFF',
    borderColor: 'rgba(28,95,174,0.4)',
    hoverBorder: 'rgba(56,140,210,0.75)',
    glowColor: 'rgba(56,140,220,0.28)',
  },
  {
    id: 3,
    title: 'ARCHITECT OF WEB3',
    track: 'Blockchain',
    subtitle: 'Grand Champion • Blockchain Track',
    rune: 'ᛟ',
    image: '/winners/blockchain.png',
    prize: '',
    accent: '#6B21A8',
    accentLight: '#F3E8FF',
    borderColor: 'rgba(107,33,168,0.35)',
    hoverBorder: 'rgba(147,80,200,0.75)',
    glowColor: 'rgba(130,60,190,0.28)',
  },
  {
    id: 4,
    title: 'CREATOR OF REALMS',
    track: 'Open Innovation',
    subtitle: 'Grand Champion • Open Innovation',
    rune: 'ᚷ',
    image: '/winners/open_innovation.png',
    prize: '',
    accent: '#9A3412',
    accentLight: '#FEE2CC',
    borderColor: 'rgba(154,52,18,0.4)',
    hoverBorder: 'rgba(220,90,40,0.75)',
    glowColor: 'rgba(200,80,30,0.28)',
  },
] as const;

type Winner = typeof WINNERS[number];

// ─────────────────────────────────────────────────────────────────────────────
// TAROT CARD — 3D flip card. FRONT = parchment rune. BACK = revealed image.
// ─────────────────────────────────────────────────────────────────────────────
const TarotCard = React.forwardRef<
  HTMLDivElement,
  { winner: Winner; flipped: boolean; index: number }
>(function TarotCard({ winner, flipped, index }, ref) {
  const [hovered, setHovered] = useState(false);
  const floatRef = useRef<HTMLDivElement>(null);
  const flipRef = useRef<HTMLDivElement>(null);

  // Float animation — runs in useEffect so no Math.random() in render
  useEffect(() => {
    const el = floatRef.current;
    if (!el) return;
    const amplitudes = [5, 4, 6, 4.5];
    const rotations = [0.8, -0.7, 1.0, -0.6];
    const durations = [3.0, 3.4, 2.8, 3.2];
    const tl = gsap.timeline({ repeat: -1, yoyo: true, delay: index * 0.3 });
    tl.to(el, {
      y: -amplitudes[index % 4],
      rotation: rotations[index % 4],
      duration: durations[index % 4],
      ease: 'sine.inOut',
    });
    return () => { tl.kill(); };
  }, [index]);

  // 3D flip driven by `flipped` prop — GSAP handles the Y rotation
  useEffect(() => {
    const el = flipRef.current;
    if (!el) return;
    gsap.to(el, {
      rotateY: flipped ? 180 : 0,
      duration: 0.9,
      ease: 'power3.inOut',
      delay: index * 0.12,        // stagger cards 0.12s apart
    });
  }, [flipped, index]);

  // Merge forwardRef + local floatRef
  const setRefs = useCallback(
    (el: HTMLDivElement | null) => {
      (floatRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
      if (typeof ref === 'function') ref(el);
      else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
    },
    [ref]
  );

  const cardShadow = hovered
    ? `0 32px 80px rgba(0,0,0,0.18), 0 0 0 2px ${winner.hoverBorder}, 0 12px 40px ${winner.glowColor}`
    : `0 8px 40px rgba(0,0,0,0.10), 0 0 0 1.5px ${winner.borderColor}`;

  return (
    <div
      ref={ref}
      className="winners-card-outer relative flex flex-col items-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      id={`winner-card-${winner.id}`}
    >
      {/* ── Title block above card ── */}
      <div className="mb-4 text-center w-full px-1">
        <p
          className="font-heading uppercase tracking-widest"
          style={{
            fontSize: 'clamp(0.55rem, 0.75vw, 0.68rem)',
            color: winner.accent,
            letterSpacing: '0.35em',
            marginBottom: '4px',
            fontWeight: 700,
          }}
        >
          {winner.track}
        </p>
        <h3
          className="font-heading uppercase"
          style={{
            fontSize: 'clamp(0.75rem, 1.1vw, 1rem)',
            letterSpacing: '0.12em',
            color: '#fff',
            fontWeight: 800,
            lineHeight: 1.25,
          }}
        >
          {winner.title}
        </h3>
      </div>

      {/* ── Float shell ── */}
      <div
        ref={setRefs}
        className="relative w-full"
        style={{ aspectRatio: '3 / 4.4', willChange: 'transform', perspective: '900px' }}
      >
        {/* Ambient glow behind card */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            borderRadius: '16px',
            background: `radial-gradient(ellipse at 50% 70%, ${winner.glowColor} 0%, transparent 72%)`,
            opacity: hovered ? 1 : 0.4,
            transition: 'opacity 0.6s ease',
            transform: 'scale(1.18) translateY(5%)',
            filter: 'blur(20px)',
            zIndex: 0,
          }}
        />

        {/* 3D flip container */}
        <div
          ref={flipRef}
          className="absolute inset-0"
          style={{
            transformStyle: 'preserve-3d',
            borderRadius: '16px',
            transform: 'rotateY(0deg)',
            zIndex: 1,
          }}
        >
          {/* ══ FRONT FACE — Parchment + Rune ══ */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              borderRadius: '16px',
              background:
                'rgba(20,20,20,0.85)',
              boxShadow: cardShadow,
              border: `1.5px solid ${winner.borderColor}`,
              backdropFilter: 'blur(20px)',
              transition: 'box-shadow 0.45s ease',
            }}
          >
            {/* Corner ornaments */}
            {[
              { top: '10px', left: '10px', borderTop: `1.5px solid ${winner.borderColor}`, borderLeft: `1.5px solid ${winner.borderColor}` },
              { top: '10px', right: '10px', borderTop: `1.5px solid ${winner.borderColor}`, borderRight: `1.5px solid ${winner.borderColor}` },
              { bottom: '10px', left: '10px', borderBottom: `1.5px solid ${winner.borderColor}`, borderLeft: `1.5px solid ${winner.borderColor}` },
              { bottom: '10px', right: '10px', borderBottom: `1.5px solid ${winner.borderColor}`, borderRight: `1.5px solid ${winner.borderColor}` },
            ].map((s, ci) => (
              <div key={ci} className="absolute w-5 h-5" style={s} />
            ))}

            {/* Inner frame */}
            <div
              className="absolute inset-[14px] pointer-events-none"
              style={{ borderRadius: '8px', border: `1px solid ${winner.borderColor}`, opacity: 0.6 }}
            />

            {/* Parchment lines */}
            {[20, 30, 40, 50, 60, 70, 80].map((t) => (
              <div
                key={t}
                className="absolute w-4/5"
                style={{
                  height: '1px',
                  top: `${t}%`,
                  background: `linear-gradient(to right, transparent, ${winner.borderColor}, transparent)`,
                  opacity: 0.3,
                }}
              />
            ))}

            {/* Rune */}
            <div className="relative mb-3 flex flex-col items-center">
              <div
                className="absolute rounded-full blur-2xl"
                style={{ inset: '-40%', background: winner.accent, opacity: 0.15 }}
              />
              <span
                className="relative font-heading block"
                style={{
                  fontSize: 'clamp(52px, 6vw, 72px)',
                  lineHeight: 1,
                    color: winner.accentLight,
                    filter: `drop-shadow(0 2px 20px ${winner.accent})`,
                }}
              >
                {winner.rune}
              </span>
            </div>

            <p
              className="font-heading uppercase"
              style={{
                fontSize: 'clamp(0.5rem, 0.7vw, 0.62rem)',
                letterSpacing: '0.42em',
                color: winner.accent,
                opacity: 0.7,
                fontWeight: 700,
              }}
            >
              {winner.track}
            </p>
          </div>

          {/* ══ BACK FACE — Tarot image ══ */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              borderRadius: '16px',
              transform: 'rotateY(180deg)',
              boxShadow: cardShadow,
              transition: 'box-shadow 0.45s ease',
            }}
          >
            <Image
              src={winner.image}
              alt={winner.title}
              fill
              sizes="(max-width: 480px) 90vw, (max-width: 768px) 44vw, (max-width: 1024px) 22vw, 20vw"
              className="object-cover object-top"
              quality={88}
              priority={winner.id <= 2}
            />

            {/* Bottom vignette */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(to bottom, transparent 48%, rgba(10,6,2,0.75) 100%)',
              }}
            />

            {/* Prize label on back */}
            <div
              className="absolute bottom-0 left-0 right-0 text-center px-3 py-4"
              style={{ zIndex: 2 }}
            >
              <p
                className="font-heading uppercase"
                style={{
                  fontSize: 'clamp(0.45rem, 0.65vw, 0.6rem)',
                  letterSpacing: '0.36em',
                  color: 'rgba(255,237,160,0.8)',
                  marginBottom: '3px',
                  fontWeight: 700,
                }}
              >
                {winner.subtitle}
              </p>
              <p
                className="font-heading"
                style={{
                  fontSize: 'clamp(1rem, 1.5vw, 1.3rem)',
                  color: '#FFE066',
                  fontWeight: 800,
                  letterSpacing: '0.05em',
                  textShadow: '0 2px 16px rgba(255,220,50,0.5)',
                }}
              >
                {winner.prize}
              </p>
            </div>

            {/* Corner ornaments on back */}
            {[
              { top: '10px', left: '10px', borderTop: '1.5px solid rgba(255,220,120,0.5)', borderLeft: '1.5px solid rgba(255,220,120,0.5)' },
              { top: '10px', right: '10px', borderTop: '1.5px solid rgba(255,220,120,0.5)', borderRight: '1.5px solid rgba(255,220,120,0.5)' },
              { bottom: '10px', left: '10px', borderBottom: '1.5px solid rgba(255,220,120,0.5)', borderLeft: '1.5px solid rgba(255,220,120,0.5)' },
              { bottom: '10px', right: '10px', borderBottom: '1.5px solid rgba(255,220,120,0.5)', borderRight: '1.5px solid rgba(255,220,120,0.5)' },
            ].map((s, ci) => (
              <div key={ci} className="absolute w-5 h-5" style={s} />
            ))}

            {/* Hover shimmer on back */}
            {hovered && (
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.06) 50%, transparent 65%)',
                  zIndex: 3,
                }}
              />
            )}
          </div>
        </div>

        {/* Hover-only sparkle dots (placed outside flip container) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ opacity: hovered ? 1 : 0, transition: 'opacity 0.3s', zIndex: 2 }}
        >
          {PARTICLE_SIZES.map((sz, pi) => (
            <div
              key={pi}
              className="absolute rounded-full"
              style={{
                width: sz,
                height: sz,
                background: winner.accent,
                left: `${12 + pi * 14}%`,
                top: `${8 + (pi % 3) * 28}%`,
                opacity: 0.7,
                animation: `winners-sparkle ${0.85 + pi * 0.18}s ease-in-out infinite alternate`,
                animationDelay: `${pi * 0.11}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
});
TarotCard.displayName = 'TarotCard';

// ─────────────────────────────────────────────────────────────────────────────
// MAIN SECTION — Sticky‑scroll pin with card flip on midpoint
// ─────────────────────────────────────────────────────────────────────────────
export default function WinnersSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>(WINNERS.map(() => null));

  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Heading reveal ──
      if (headingRef.current) {
        gsap.fromTo(
          Array.from(headingRef.current.children),
          { opacity: 0, y: 24, filter: 'blur(5px)' },
          {
            opacity: 1, y: 0, filter: 'blur(0px)',
            duration: 0.9, stagger: 0.12, ease: 'power3.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 82%',
            },
          }
        );
      }

      // ── Card rise on enter ──
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.85, ease: 'power3.out',
            delay: i * 0.1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
            },
          }
        );
      });

      // ── Flip cards when the grid crosses 50% of the viewport ──
      // No pin, no sticky — just a simple trigger using class selector.
      const grid = sectionRef.current?.querySelector('.winners-grid');
      if (grid) {
        ScrollTrigger.create({
          trigger: grid,
          start: 'top 55%',
          onEnter: () => setFlipped(true),
          onLeaveBack: () => setFlipped(false),
        });
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      id="winners"
    >
      <div
        style={{
          width: '100%',
          overflow: 'hidden',
          background:
            'linear-gradient(180deg, rgba(8,7,6,0.2) 0%, rgba(13,12,11,0.4) 50%, rgba(8,7,6,0.2) 100%)',

          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 'clamp(3rem, 6vw, 5rem)',
          paddingBottom: 'clamp(3rem, 6vw, 5rem)',
        }}
      >
        {/* ── Subtle parchment texture overlay ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 48px, rgba(184,134,11,0.03) 48px, rgba(184,134,11,0.03) 49px)',
            zIndex: 0,
          }}
        />

        {/* ── Radial warm glow ── */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80vw',
            height: '60vh',
            background:
              'radial-gradient(ellipse at center, rgba(212,175,55,0.08) 0%, transparent 70%)',
            zIndex: 0,
          }}
        />

        {/* ── Watermark runes ── */}
        {(['ᚠ', 'ᚹ', 'ᛟ', 'ᚷ', 'ᚱ', 'ᚢ'] as const).map((r, i) => (
          <div
            key={i}
            className="absolute font-heading select-none pointer-events-none"
            style={{
              fontSize: `${2.5 + (i % 3)}rem`,
              left: `${(i * 157.3) % 85}%`,
              top: `${(i * 113.7) % 80}%`,
              color: 'rgba(212,175,55,0.08)',
              transform: `rotate(${(i % 5 - 2) * 9}deg)`,
              zIndex: 0,
            }}
          >
            {r}
          </div>
        ))}

        {/* ══ HEADING BLOCK ══ */}
        <div
          ref={headingRef}
          className="relative z-10 text-center w-full"
          style={{
            maxWidth: '760px',
            margin: '0 auto',
            paddingLeft: 'clamp(1rem, 4vw, 2rem)',
            paddingRight: 'clamp(1rem, 4vw, 2rem)',
            marginBottom: 'clamp(2rem, 4vw, 3.5rem)',
          }}
        >
          {/* Eyebrow */}
          <p
            className="font-heading uppercase"
            style={{
              fontSize: 'clamp(0.6rem, 0.9vw, 0.75rem)',
              letterSpacing: '0.44em',
              color: '#B8860B',
              fontWeight: 700,
              marginBottom: '0.75rem',
            }}
          >
            ✦&nbsp;&nbsp;Sacred Artifacts&nbsp;&nbsp;✦
          </p>

          {/* Main heading */}
          <h2
            className="font-heading uppercase"
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 4rem)',
              letterSpacing: '0.1em',
              fontWeight: 900,
              color: '#fff',
              lineHeight: 1.1,
              marginBottom: '1rem',
            }}
          >
            Divine{' '}
            <span
              style={{
                background:
                  'linear-gradient(135deg, #c9a227 0%, #f5d980 50%, #9a6c10 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Winners
            </span>
          </h2>

          {/* Ornamental divider */}
          <div
            className="flex items-center justify-center gap-3"
            style={{ marginBottom: '1rem' }}
          >
            <div
              style={{
                width: '60px',
                height: '1.5px',
                background:
                  'linear-gradient(to right, transparent, #c9a227)',
              }}
            />
            <div
              style={{
                width: '8px',
                height: '8px',
                background: '#c9a227',
                transform: 'rotate(45deg)',
                flexShrink: 0,
              }}
            />
            <div
              style={{
                width: '60px',
                height: '1.5px',
                background:
                  'linear-gradient(to left, transparent, #c9a227)',
              }}
            />
          </div>

          {/* Subtitle */}
          <p
            className="font-body"
            style={{
              fontSize: 'clamp(0.82rem, 1.15vw, 1rem)',
              color: 'rgba(255,255,255,0.7)',
              fontWeight: 500,
              lineHeight: 1.65,
              letterSpacing: '0.02em',
            }}
          >
            Scroll to reveal the celestial champions of each realm.
            <br />
            <span style={{ color: '#B8860B', fontWeight: 700 }}>
              {flipped ? 'The champions have been revealed.' : 'Keep scrolling — the cards are turning…'}
            </span>
          </p>
        </div>

        {/* ══ CARD ROW ══ */}
        <div
          className="relative z-10 w-full"
          style={{
            maxWidth: '1380px',
            margin: '0 auto',
            padding: '0 clamp(1rem, 4vw, 2.5rem)',
          }}
        >
          <div className="winners-grid">
            {WINNERS.map((winner, i) => (
              <TarotCard
                key={winner.id}
                winner={winner}
                flipped={flipped}
                index={i}
                ref={(el) => { cardRefs.current[i] = el; }}
              />
            ))}
          </div>
        </div>

        {/* ══ BOTTOM ORNAMENT ══ */}
        <div
          className="relative z-10 flex items-center justify-center gap-3"
          style={{
            marginTop: 'clamp(1.5rem, 3vw, 2.5rem)',
            padding: '0 clamp(1rem, 4vw, 2.5rem)',
            width: '100%',
            maxWidth: '680px',
          }}
        >
          <div
            style={{
              flex: 1,
              height: '1px',
              background:
                'linear-gradient(to right, transparent, rgba(184,134,11,0.3))',
            }}
          />
          <span
            className="font-heading uppercase"
            style={{
              fontSize: 'clamp(0.55rem, 0.75vw, 0.68rem)',
              letterSpacing: '0.4em',
              color: 'rgba(184,134,11,0.5)',
              fontWeight: 700,
              whiteSpace: 'nowrap',
            }}
          >
            ✦ Champions of Asgard ✦
          </span>
          <div
            style={{
              flex: 1,
              height: '1px',
              background:
                'linear-gradient(to left, transparent, rgba(184,134,11,0.3))',
            }}
          />
        </div>

        {/* Scroll hint (fades once flipped) */}
        <div
          className="relative z-10 flex flex-col items-center"
          style={{
            marginTop: '1rem',
            opacity: flipped ? 0 : 1,
            transition: 'opacity 0.6s ease',
          }}
        >
          <p
            className="font-body uppercase"
            style={{
              fontSize: '0.6rem',
              letterSpacing: '0.3em',
              color: 'rgba(184,134,11,0.45)',
              marginBottom: '6px',
            }}
          >
            scroll to reveal
          </p>
          <div
            style={{
              width: '1.5px',
              height: '28px',
              background:
                'linear-gradient(to bottom, rgba(184,134,11,0.5), transparent)',
              animation: 'winners-scroll-pulse 1.6s ease-in-out infinite',
            }}
          />
        </div>
      </div>

      {/* ── Global styles for this section ── */}
      <style>{`
        /* Responsive card grid */
        .winners-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(0.75rem, 2vw, 2rem);
          align-items: start;
        }
        @media (max-width: 960px) {
          .winners-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: clamp(0.75rem, 3vw, 1.5rem);
          }
        }
        @media (max-width: 520px) {
          .winners-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 0.75rem;
          }
        }

        /* Card outer always fills grid cell */
        .winners-card-outer {
          width: 100%;
        }

        /* Sparkle float */
        @keyframes winners-sparkle {
          from { opacity: 0.2; transform: scale(0.6) translateY(0); }
          to   { opacity: 0.9; transform: scale(1.3) translateY(-9px); }
        }

        /* Scroll pulse indicator */
        @keyframes winners-scroll-pulse {
          0%, 100% { transform: scaleY(1); opacity: 0.55; }
          50%       { transform: scaleY(1.25); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
