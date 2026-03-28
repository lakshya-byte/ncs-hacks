'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

const NAV_LINKS = [
  { name: 'Home', href: '#' },
  { name: 'About', href: '#about' },
  { name: 'Tracks', href: '#tracks' },
  { name: 'Timeline', href: '#timeline' },
  { name: 'Sponsors', href: '#sponsors' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [ctaHovered, setCtaHovered] = useState(false);
  const [ctaPressed, setCtaPressed] = useState(false);
  const [mouseX, setMouseX] = useState(0.5);
  const [floatY, setFloatY] = useState(0);
  const navRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number | null>(null);
  const t = useRef(0);

  // Scroll tracking to delay appearance until after Hero (900vh)
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const heroThreshold = window.innerHeight * 9 - 100; // Just before particle section ends
      
      const isPastHero = y > heroThreshold;
      setIsVisible(isPastHero);
      
      if (isPastHero) {
        setScrolled(y > heroThreshold + 40);
        setScrollProgress(Math.min(1, (y - heroThreshold) / 300));
      } else {
        setScrolled(false);
        setScrollProgress(0);
      }
    };
    
    // Initial check on mount
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mouse parallax
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMouseX(e.clientX / window.innerWidth);
    };
    window.addEventListener('mousemove', handleMouse, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  // Floating animation
  useEffect(() => {
    const tick = (timestamp: number) => {
      t.current = timestamp;
      setFloatY(Math.sin(timestamp / 2800) * 2.5);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  // JS-computed dynamic values (cannot be static Tailwind)
  const glassOpacity = 0.18 + scrollProgress * 0.42;
  const blurAmount = 18 + scrollProgress * 14;
  const marginTop = scrolled ? 10 : 20;
  const sweepX = mouseX * 130 - 15;

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 inset-x-0 z-[100] transition-all duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)] pointer-events-none ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-24'
      }`}
    >
      {/* ── Inner wrapper separating the continuous float from the entry transition ── */}
      <div style={{ transform: `translateY(${floatY}px)` }} className="w-full flex justify-center">
      {/* Width constrainer */}
      <div
        className="w-full max-w-[1160px] px-6 pointer-events-auto transition-[margin] duration-500"
        style={{ marginTop }}
      >
        {/* ── OUTER AURA (Layer 0) ── */}
        <div
          className="absolute -inset-x-3 rounded-[80px] pointer-events-none blur-[12px] [animation:goldPulse_4s_ease-in-out_infinite]"
          style={{
            top: '-8px',
            bottom: '-8px',
            background: 'radial-gradient(ellipse at 50% 50%, rgba(201,162,39,0.08) 0%, transparent 70%)',
          }}
        />

        {/* ── MAIN GLASS PANEL (Layer 1) ── */}
        <div
          className="relative flex items-center justify-between rounded-[72px] border border-[rgba(201,162,39,0.28)] overflow-hidden transition-[padding,background,box-shadow,backdrop-filter] duration-500"
          style={{
            padding: `${scrolled ? 13 : 17}px 40px`,
            background: `rgba(255, 250, 235, ${glassOpacity})`,
            backdropFilter: `blur(${blurAmount}px) saturate(160%)`,
            WebkitBackdropFilter: `blur(${blurAmount}px) saturate(160%)`,
            boxShadow: `
              0 ${8 + scrollProgress * 16}px ${32 + scrollProgress * 32}px rgba(0,0,0,${0.04 + scrollProgress * 0.08}),
              0 2px 8px rgba(201,162,39,${0.06 + scrollProgress * 0.1}),
              inset 0 1px 0 rgba(255,255,255,0.8),
              inset 0 -1px 0 rgba(201,162,39,0.12)
            `,
          }}
        >
          {/* ── INNER HIGHLIGHT (top edge) ── */}
          <div
            className="absolute top-0 left-0 right-0 h-1/2 rounded-t-[72px] pointer-events-none"
            style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 100%)' }}
          />

          {/* ── MOUSE LIGHT SWEEP ── */}
          <div
            className="absolute top-0 bottom-0 w-[35%] pointer-events-none blur-[3px] [transform:skewX(-15deg)] transition-[left] duration-[1200ms] [transition-timing-function:cubic-bezier(0.25,0.46,0.45,0.94)]"
            style={{
              left: `${sweepX}%`,
              background: 'linear-gradient(105deg, transparent 0%, rgba(255,245,200,0.22) 40%, rgba(255,255,255,0.35) 50%, rgba(255,245,200,0.22) 60%, transparent 100%)',
            }}
          />

          {/* ── GRAIN TEXTURE ── */}
          <div
            className="absolute inset-0 rounded-[72px] pointer-events-none opacity-[0.025] mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
              backgroundSize: '180px 180px',
            }}
          />

          {/* ── BOTTOM GOLD GLOW EDGE ── */}
          <div
            className="absolute bottom-0 left-[10%] right-[10%] h-px pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(201,162,39,0.5) 30%, rgba(249,212,76,0.8) 50%, rgba(201,162,39,0.5) 70%, transparent)',
              boxShadow: '0 2px 12px rgba(201,162,39,0.3)',
            }}
          />

          {/* ═══════════════ LOGO ═══════════════ */}
          <div className="flex-1 flex justify-start relative z-[2]">
            <Link href="/" className="flex items-center gap-[10px] no-underline">
            {/* Gold rune orb */}
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-[0.85rem] font-serif shrink-0"
              style={{
                background: 'radial-gradient(circle at 35% 35%, #f5d980, #c9a227 50%, #7a5210)',
                boxShadow: '0 0 12px rgba(201,162,39,0.5), 0 2px 6px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.4)',
                color: 'rgba(80,40,0,0.8)',
              }}
            >
              ᚦ
            </div>
            {/* Wordmark */}
            <span
              className="font-[Cinzel,_'Times_New_Roman',serif] font-black text-[1.1rem] tracking-[0.35em] uppercase"
              style={{
                background: 'linear-gradient(135deg, #6b4a0a 0%, #c9a227 30%, #f5d980 55%, #dfb430 75%, #8a5d0e 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 1px 6px rgba(201,162,39,0.3))',
              }}
            >
              ASGARD
            </span>
            </Link>
          </div>

          {/* ══════════════ NAV LINKS ══════════════ */}
          <ul className="relative z-[2] flex gap-12 list-none m-0 p-0">
            {NAV_LINKS.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="
                    group relative inline-block
                    font-[Cinzel,serif] text-[0.68rem] font-medium tracking-[0.2em] uppercase no-underline
                    text-[#3d2600] transition-[color,transform,text-shadow] duration-300 ease-out
                    hover:text-[#9a6f10] hover:-translate-y-0.5
                    hover:[text-shadow:0_0_16px_rgba(201,162,39,0.55),0_0_32px_rgba(201,162,39,0.2)]
                    py-1
                  "
                >
                  {link.name}
                  {/* Hover glow bg */}
                  <span className="absolute -inset-x-3 -inset-y-1.5 rounded-lg bg-[radial-gradient(ellipse_at_center,rgba(201,162,39,0.12)_0%,transparent_70%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
                  {/* Underline */}
                  <span
                    className="absolute -bottom-px left-1/2 -translate-x-1/2 h-px w-0 transition-[width] duration-[450ms] [transition-timing-function:cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:w-full pointer-events-none"
                    style={{
                      background: 'linear-gradient(90deg, transparent, #c9a227 40%, #f5d980 50%, #c9a227 60%, transparent)',
                      boxShadow: '0 0 8px rgba(249,212,76,0.7)',
                    }}
                  />
                </Link>
              </li>
            ))}
          </ul>

          {/* ═══════════════ CTA ═══════════════ */}
          <div className="flex-1 flex justify-end relative z-[2]">
            <Link
              href="#"
            onMouseEnter={() => setCtaHovered(true)}
            onMouseLeave={() => { setCtaHovered(false); setCtaPressed(false); }}
            onMouseDown={() => setCtaPressed(true)}
            onMouseUp={() => setCtaPressed(false)}
            className="relative z-2 overflow-hidden inline-flex items-center justify-center px-7 py-3 rounded-[50px] border-none cursor-pointer no-underline transition-all duration-[400ms] [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]"
            style={{
              fontFamily: '"Cinzel", serif',
              fontSize: '0.65rem',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: ctaHovered ? 'rgba(60,35,0,0.95)' : '#fff',
              background: ctaHovered
                ? 'linear-gradient(135deg, #f5d980 0%, #e8b820 30%, #f8d44c 55%, #c9a227 80%, #f5d980 100%)'
                : 'linear-gradient(135deg, #8a5e0a 0%, #c9a227 35%, #e8c040 55%, #b38a18 80%, #7a5010 100%)',
              boxShadow: ctaHovered
                ? '0 0 0 1px rgba(201,162,39,0.6), 0 0 20px rgba(249,212,76,0.7), 0 0 40px rgba(201,162,39,0.4), 0 4px 20px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -1px 0 rgba(120,80,0,0.3)'
                : '0 0 0 1px rgba(201,162,39,0.35), 0 0 12px rgba(201,162,39,0.3), 0 4px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.2)',
              transform: ctaPressed
                ? 'scale(0.97) translateY(1px)'
                : ctaHovered
                ? 'scale(1.04) translateY(-2px)'
                : 'scale(1) translateY(0)',
            }}
          >
            {/* Auto light sweep */}
            <span
              className="absolute top-0 bottom-0 w-[60%] pointer-events-none"
              style={{
                background: 'linear-gradient(105deg, transparent, rgba(255,255,255,0.45), transparent)',
                animation: ctaHovered ? 'none' : 'ctaSweep 3s ease-in-out infinite 1s',
              }}
            />

            {/* Hover sweep */}
            {ctaHovered && (
              <span
                className="absolute top-0 bottom-0 w-[60%] pointer-events-none [animation:ctaSweep_0.6s_ease-out_forwards]"
                style={{ background: 'linear-gradient(105deg, transparent, rgba(255,255,255,0.6), transparent)' }}
              />
            )}

            {/* Energy pulse ring */}
            {ctaHovered && (
              <span
                className="absolute inset-0 rounded-[inherit] border border-[rgba(249,212,76,0.8)] pointer-events-none [animation:energyPulse_0.7s_ease-out_forwards]"
              />
            )}

            <span className="relative z-[1]">Join Hackathon</span>
            </Link>
          </div>
        </div>{/* end main panel */}
      </div>

      </div>{/* end inner wrapper */}
    </nav>
  );
}
