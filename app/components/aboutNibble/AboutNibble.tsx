'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────
   CARD DATA — four pillars of Nibble
───────────────────────────────────────────── */
const CARDS = [
  {
    rune: 'ᚠ',
    title: 'Origin',
    description: 'From the divine forge of imagination, we shape bold digital realms that redefine boundaries.',
    icon: '',
  },
  {
    rune: 'ᚢ',
    title: 'Craft',
    description: 'Every idea forged through precision, craft, and fearless experimentation with cutting-edge tech.',
    icon: '',
  },
  {
    rune: 'ᚦ',
    title: 'Rise',
    description: 'Builders rise. Engineers ascend. Legends are built one commit at a time in our realm.',
    icon: '',
  },
  {
    rune: 'ᚨ',
    title: 'Legacy',
    description: 'Welcome to the Kingdom of Nibble — where innovation becomes legacy that echoes through time.',
    icon: '',
  },
];

/* ─────────────────────────────────────────────
   GLASS CARD with micro-interactions
───────────────────────────────────────────── */
function GlassCard({
  rune, title, description, icon,
}: {
  rune: string; title: string; description: string; icon: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotation({
      x: ((y - centerY) / centerY) * -6,
      y: ((x - centerX) / centerX) * 6,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setRotation({ x: 0, y: 0 });
    setHovered(false);
  }, []);

  return (
    <div
      ref={cardRef}
      className="about-glass-card"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '1000px',
        opacity: 0,
        transform: 'translateY(60px) scale(0.92)',
      }}
    >
      <div
        style={{
          position: 'relative',
          height: '100%',
          padding: 'clamp(1.5rem, 3vw, 2.5rem)',
          borderRadius: '1.5rem',
          border: `1.5px solid ${hovered ? 'rgba(212,175,55,0.7)' : 'rgba(212,175,55,0.35)'}`,
          background: hovered
            ? 'linear-gradient(145deg, rgba(20,20,20,0.8), rgba(10,10,10,0.65))'
            : 'linear-gradient(145deg, rgba(15,15,15,0.65), rgba(5,5,5,0.45))',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${hovered ? 1.03 : 1})`,
          transition: 'transform 250ms ease-out, border-color 300ms ease, background 300ms ease, box-shadow 300ms ease',
          boxShadow: hovered
            ? '0 24px 60px rgba(0,0,0,0.4), 0 0 40px rgba(212,175,55,0.15), inset 0 1px 0 rgba(255,255,255,0.15)'
            : '0 8px 32px rgba(0,0,0,0.3), 0 0 0 rgba(212,175,55,0), inset 0 1px 0 rgba(255,255,255,0.08)',
          willChange: 'transform',
        }}
      >
        {/* Shimmer on hover */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.25) 50%, transparent 70%)',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 400ms ease',
            pointerEvents: 'none',
          }}
        />

        {/* Corner ornaments */}
        <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-[#C9A84C]/50 rounded-tl-sm pointer-events-none" />
        <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-[#C9A84C]/50 rounded-tr-sm pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-[#C9A84C]/50 rounded-bl-sm pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-[#C9A84C]/50 rounded-br-sm pointer-events-none" />

        {/* Rune + Icon header */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem', position: 'relative', zIndex: 1,
        }}>
          <div style={{
            width: '44px', height: '44px', borderRadius: '50%',
            border: '1.5px solid rgba(201,162,39,0.5)',
            background: 'radial-gradient(circle at 35% 30%, #fff9e6, #F5E0A3 40%, #C9A84C 70%, #8F722E)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: '#fff',
            boxShadow: hovered
              ? '0 0 24px rgba(201,162,39,0.6), inset 0 1px 0 rgba(255,255,255,0.6)'
              : '0 0 10px rgba(201,162,39,0.3), inset 0 1px 0 rgba(255,255,255,0.5)',
            transition: 'box-shadow 300ms ease',
            flexShrink: 0,
          }}>
            {rune}
          </div>
          <span style={{ fontSize: '1.4rem' }}>{icon}</span>
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.2rem, 2.2vw, 1.5rem)',
          fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase',
          color: '#F5E0A3', margin: '0 0 0.6rem', position: 'relative', zIndex: 1,
          lineHeight: 1.2,
        }}>
          {title}
        </h3>

        {/* Description */}
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: 'clamp(0.85rem, 1.4vw, 1rem)',
          color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, margin: 0, position: 'relative', zIndex: 1,
          letterSpacing: '0.01em',
        }}>
          {description}
        </p>

        {/* Bottom gold accent line */}
        <div style={{
          position: 'absolute', bottom: 0, left: '15%', right: '15%', height: '2px',
          background: `linear-gradient(90deg, transparent, rgba(212,175,55,${hovered ? 0.7 : 0.2}), transparent)`,
          transition: 'background 300ms ease',
        }} />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function KingdomOfNibble() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── HEADING REVEAL ──
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current.children,
          { opacity: 0, y: 30, filter: 'blur(6px)' },
          {
            opacity: 1, y: 0, filter: 'blur(0px)',
            duration: 1, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 75%',
            },
          }
        );
      }

      // ── CARDS STAGGERED ENTRY ──
      const mm = gsap.matchMedia();

      // Desktop: Arc layout
      mm.add("(min-width: 1025px)", () => {
        const cards = gsap.utils.toArray<HTMLElement>('.about-glass-card');
        const arcY = [-20, 20, 20, -20]; // Outer cards higher, inner cards lower
        const arcRot = [8, 2, -2, -8]; // Inward-facing rotation

        cards.forEach((card, i) => {
          gsap.to(card, {
            opacity: 1,
            y: arcY[i] || 0,
            rotation: arcRot[i] || 0,
            scale: 1,
            duration: 0.9,
            ease: 'power3.out',
            delay: i * 0.12,
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
            },
          });
        });
      });

      // Tablet / Mobile: Flat layout
      mm.add("(max-width: 1024px)", () => {
        const cards = gsap.utils.toArray<HTMLElement>('.about-glass-card');
        cards.forEach((card, i) => {
          gsap.to(card, {
            opacity: 1,
            y: 0,
            rotation: 0,
            scale: 1,
            duration: 0.9,
            ease: 'power3.out',
            delay: i * 0.12,
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
            },
          });
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* ══ FULL-SCREEN BACKGROUND IMAGE ══ */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Image
          src="/newaboutNibblebackground.png"
          alt="Kingdom of Nibble background"
          fill
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          quality={90}
          priority
        />
        {/* Dark overlay for readability */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(8,7,6,0.3) 0%, rgba(8,7,6,0.15) 40%, rgba(8,7,6,0.3) 100%)',
        }} />

        {/* Gold ambient gradient */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 50% 30%, rgba(201,162,39,0.12) 0%, transparent 60%)',
        }} />
      </div>

      {/* ══ MAIN CONTENT ══ */}
      <div
        ref={contentRef}
        style={{
          position: 'relative',
          zIndex: 5,
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: 'clamp(4rem, 10vw, 8rem) 2rem clamp(4rem, 8vw, 6rem)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        {/* ── HEADING BLOCK (top center) ── */}
        <div
          ref={headingRef}
          style={{
            textAlign: 'center',
            marginBottom: 'clamp(3rem, 8vw, 5rem)',
          }}
        >
          {/* Eyebrow */}
          <span
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '6px 20px', borderRadius: '40px',
              border: '1px solid rgba(245,217,128,0.4)',
              background: 'rgba(255,255,255,0.12)',
              backdropFilter: 'blur(10px)',
              fontSize: '0.7rem', fontFamily: 'var(--font-body)',
              fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase',
              color: '#F5E0A3', marginBottom: '1.5rem',
            }}
          >
            <span style={{
              width: '6px', height: '6px', borderRadius: '50%',
              background: '#F5E0A3', boxShadow: '0 0 10px rgba(245,217,128,0.8)',
              animation: 'goldFlicker 3s infinite',
            }} />
            {/* Eyebrow text removed */}
          </span>

          {/* Main title */}
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(3rem, 7vw, 5.5rem)',
              fontWeight: 900, letterSpacing: '0.08em', textTransform: 'uppercase',
              lineHeight: 1.05, margin: '1rem 0 1.2rem',
            }}
          >
            <span style={{ color: 'rgba(255,255,255,0.95)', display: 'block' }}>
              The Kingdom
            </span>
            <span
              style={{
                background: 'linear-gradient(135deg, #6b4a0a 0%, #C9A84C 30%, #F5E0A3 55%, #C9A84C 75%, #6b4a0a 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                filter: 'drop-shadow(0 2px 20px rgba(201,162,39,0.5))',
              }}
            >
              Of JSS
            </span>
          </h2>

          {/* Subtitle */}
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 'clamp(0.9rem, 1.8vw, 1.15rem)',
            color: 'rgba(255,248,220,0.75)', lineHeight: 1.65, maxWidth: '560px',
            margin: '0 auto', letterSpacing: '0.03em',
          }}>
            Where builders rise, engineers ascend, and innovation becomes legacy
            that echoes through the nine realms.
          </p>

          {/* Ornamental divider */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
            marginTop: '1.5rem',
          }}>
            <div style={{ width: '60px', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(245,217,128,0.5))' }} />
            <div style={{
              width: '8px', height: '8px', background: '#C9A84C',
              transform: 'rotate(45deg)', boxShadow: '0 0 12px rgba(201,162,39,0.6)', flexShrink: 0,
            }} />
            <div style={{ width: '60px', height: '1px', background: 'linear-gradient(90deg, rgba(245,217,128,0.5), transparent)' }} />
          </div>
        </div>

        {/* ── FOUR GLASS CARDS (bottom half) ── */}
        <div
          className="about-cards-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 'clamp(1rem, 2vw, 1.5rem)',
            width: '100%',
            marginTop: 'auto',
          }}
        >
          {CARDS.map((card) => (
            <GlassCard key={card.title} {...card} />
          ))}
        </div>
      </div>

      {/* ── Floating particles ── */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 4 }}>
        {Array.from({ length: 16 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${8 + (i * 37.3) % 84}%`,
              top: `${12 + (i * 53.7) % 76}%`,
              width: `${2 + (i % 3)}px`,
              height: `${2 + (i % 3)}px`,
              borderRadius: '50%',
              background: 'radial-gradient(circle, #F5E0A3, #C9A84C)',
              boxShadow: `0 0 ${4 + (i % 3) * 3}px rgba(201,162,39,0.5)`,
              opacity: 0.5 + (i % 4) * 0.1,
              animation: `nibble-particle ${5 + (i % 4) * 1.5}s ease-in-out ${(i % 5) * 0.8}s infinite`,
            }}
          />
        ))}
      </div>

      {/* ── RESPONSIVE STYLES ── */}
      <style>{`
        @media (max-width: 1024px) {
          .about-cards-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          .about-cards-grid {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }
        }
      `}</style>
    </section>
  );
}