'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ───────────────────────────────────────────────
//  REUSABLE DECORATIVE COMPONENTS
// ───────────────────────────────────────────────
const RunicDivider = ({ color = '#D4AF37' }: { color?: string }) => (
  <div className="flex flex-col items-center justify-center mb-4">
    <div
      className="w-8 h-8 rotate-45 border flex items-center justify-center relative"
      style={{ borderColor: `${color}40` }}
    >
      <div className="w-5 h-5 border flex items-center justify-center" style={{ borderColor: color }}>
        <span className="-rotate-45 font-heading text-[10px]" style={{ color }}>
          ᛟ
        </span>
      </div>
    </div>
  </div>
);

const CardCorners = ({ color = '#D4AF37' }: { color?: string }) => (
  <>
    <div className="absolute top-3 left-3 w-4 h-4 border-t border-l rounded-tl-sm pointer-events-none" style={{ borderColor: `${color}60` }} />
    <div className="absolute top-3 right-3 w-4 h-4 border-t border-r rounded-tr-sm pointer-events-none" style={{ borderColor: `${color}60` }} />
    <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l rounded-bl-sm pointer-events-none" style={{ borderColor: `${color}60` }} />
    <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r rounded-br-sm pointer-events-none" style={{ borderColor: `${color}60` }} />
  </>
);

// ───────────────────────────────────────────────
//  SPONSOR DATA
// ───────────────────────────────────────────────
const SILVER_SPONSORS = [
  { name: 'Software Solutions', logo: '/sponsors/softwaresolutions.png', href: '' },
  { name: 'Tekurious Pvt Ltd', logo: '/sponsors/Tekurious.png', href: '' },
];

const IN_KIND_PARTNERS = [
  { name: 'n8n', logo: '/sponsors/n8n.png', href: 'https://n8n.io/' },
  { name: 'CodeCrafters', logo: '/sponsors/codecrafters.svg', href: 'https://codecrafters.io/' },
];

const SPECIAL_PARTNERS = [
  {
    tier: 'Beverages Partner',
    color: '#60a5fa',
    sponsors: [{ name: 'Pepsi × Varun Beverages', logo: '/sponsors/pepsixvarun.png', href: '' }],
  },
  {
    tier: 'Community Partner',
    color: '#a78bfa',
    sponsors: [{ name: 'AI4 Tomorrow', logo: '/sponsors/ai4tomorrow.png', href: '' }],
  },
  {
    tier: 'Platform Partner',
    color: '#34d399',
    sponsors: [{ name: 'Devfolio', logo: '/sponsors/devfolio.png', href: 'https://devfolio.co/' }],
  },
];

// ───────────────────────────────────────────────
//  SPONSOR CARD
// ───────────────────────────────────────────────
interface SponsorCardProps {
  name: string;
  logo: string;
  href: string;
  accent?: string;
  size?: 'lg' | 'md' | 'sm';
}

const SponsorCard = ({ name, logo, href, accent = '#D4AF37', size = 'md' }: SponsorCardProps) => {
  const heightClass = size === 'lg' ? 'min-h-[200px]' : size === 'md' ? 'min-h-[160px]' : 'min-h-[120px]';
  const imgSize = size === 'lg' ? 200 : size === 'md' ? 160 : 130;
  const isLinked = Boolean(href);

  const sharedStyle = {
    borderColor: `${accent}30`,
    boxShadow: `0 8px 24px rgba(0,0,0,0.3)`,
  };

  const hoverHandlers = isLinked
    ? {
        onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
          e.currentTarget.style.borderColor = `${accent}70`;
          e.currentTarget.style.boxShadow = `0 16px 40px rgba(0,0,0,0.5), 0 0 30px ${accent}15`;
          e.currentTarget.style.transform = 'translateY(-4px)';
        },
        onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
          e.currentTarget.style.borderColor = `${accent}30`;
          e.currentTarget.style.boxShadow = `0 8px 24px rgba(0,0,0,0.3)`;
          e.currentTarget.style.transform = 'translateY(0)';
        },
      }
    : {};

  const baseClass = `relative flex flex-col justify-center items-center ${heightClass} rounded-xl bg-white/5 backdrop-blur-xl border transition-all duration-300 overflow-hidden group`;

  const inner = (
    <>
      {/* Ambient glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle at 50% 50%, ${accent}0a 0%, transparent 70%)` }}
      />
      <CardCorners color={accent} />
      <div className="relative z-10 flex items-center justify-center w-full h-full p-6 md:p-8">
        <Image
          src={logo}
          alt={name}
          width={imgSize}
          height={Math.round(imgSize / 2.5)}
          className="object-contain max-w-full max-h-[90px] brightness-90 group-hover:brightness-110 transition-all duration-300"
          style={{ filter: `drop-shadow(0 0 10px ${accent}30)` }}
        />
      </div>
    </>
  );

  if (isLinked) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClass}
        style={sharedStyle}
        {...hoverHandlers}
      >
        {inner}
      </a>
    );
  }

  return (
    <div className={baseClass} style={sharedStyle}>
      {inner}
    </div>
  );
};

// ───────────────────────────────────────────────
//  MAIN COMPONENT
// ───────────────────────────────────────────────
export default function SponsorsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.sp-reveal').forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 90%' },
            delay: (i % 4) * 0.12,
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full min-h-auto section-main bg-[#080706] relative overflow-hidden font-body text-slate-300"
    >
      {/* Background ambience */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-10 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-[radial-gradient(ellipse,rgba(212,175,55,0.08)_0%,transparent_60%)] pointer-events-none z-0" />

      <div className="container-main relative z-10 flex flex-col gap-16 md:gap-20 lg:gap-24">

        {/* ── Header ─────────────────────────────── */}
        <div className="sp-reveal flex flex-col items-center text-center">
          <h2 className="font-heading text-3xl md:text-5xl text-white tracking-[0.2em] uppercase drop-shadow-[0_2px_15px_rgba(212,175,55,0.2)]">
            Our Sponsors
          </h2>
          <p className="mt-4 text-slate-400 text-sm md:text-base tracking-widest uppercase font-light">
            The sovereigns who forged this quest
          </p>
        </div>

        {/* ══════════════════════════════════════════
            1. SILVER TIER
        ══════════════════════════════════════════ */}
        <div className="w-full flex flex-col gap-8">
          <div className="sp-reveal flex flex-col items-center text-center">
            <RunicDivider color="#C0C0C0" />
            <div className="flex items-center gap-3">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#C0C0C0]/50" />
              <h3 className="font-heading text-2xl text-[#C0C0C0] tracking-[0.25em] uppercase">
                Silver Sponsors
              </h3>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#C0C0C0]/50" />
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-6 md:gap-8 w-full">
            {SILVER_SPONSORS.map((s) => (
              <div key={s.name} className="sp-reveal w-full sm:w-[340px]">
                <SponsorCard {...s} accent="#C0C0C0" size="lg" />
              </div>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════════
            2. IN-KIND PARTNERS
        ══════════════════════════════════════════ */}
        <div className="w-full flex flex-col gap-8">
          <div className="sp-reveal flex flex-col items-center text-center">
            <RunicDivider color="#D4AF37" />
            <div className="flex items-center gap-3">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#D4AF37]/50" />
              <h3 className="font-heading text-xl text-[#D4AF37] tracking-[0.25em] uppercase">
                In-Kind Partners
              </h3>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#D4AF37]/50" />
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-6 w-full">
            {IN_KIND_PARTNERS.map((s) => (
              <div key={s.name} className="sp-reveal w-full sm:w-[300px]">
                <SponsorCard {...s} accent="#D4AF37" size="md" />
              </div>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════════
            3. SPECIAL PARTNERS ROW
        ══════════════════════════════════════════ */}
        <div className="w-full flex flex-col gap-10">
          <div className="sp-reveal flex flex-col items-center text-center">
            <RunicDivider color="#64748b" />
            <div className="flex items-center gap-3">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-slate-500/50" />
              <h3 className="font-heading text-xl text-slate-400 tracking-[0.25em] uppercase">
                Partners
              </h3>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-slate-500/50" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 w-full">
            {SPECIAL_PARTNERS.map((group) => (
              <div key={group.tier} className="sp-reveal flex flex-col gap-3">
                {/* Tier badge */}
                <div className="flex items-center justify-center gap-2 mb-1">
                  <div className="h-px flex-1" style={{ background: `linear-gradient(to right, transparent, ${group.color}50)` }} />
                  <span
                    className="text-base tracking-[0.2em] uppercase font-heading px-4 py-1.5 rounded-full border"
                    style={{ color: group.color, borderColor: `${group.color}40`, background: `${group.color}0d` }}
                  >
                    {group.tier}
                  </span>
                  <div className="h-px flex-1" style={{ background: `linear-gradient(to left, transparent, ${group.color}50)` }} />
                </div>

                {/* Cards */}
                {group.sponsors.map((s) => (
                  <SponsorCard key={s.name} {...s} accent={group.color} size="sm" />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ── Footer shimmer line ─────────────────── */}
        <div className="sp-reveal flex justify-center pb-4">
          <div className="h-px w-48 bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
        </div>

      </div>
    </section>
  );
}
