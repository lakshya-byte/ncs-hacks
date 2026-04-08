'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ───────────────────────────────────────────────
//  REUSABLE DECORATIVE COMPONENTS
// ───────────────────────────────────────────────
const GoldenLock = () => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 pointer-events-none">
    <div className="relative flex items-center justify-center">
      {/* Golden Glow Background */}
      <div className="absolute w-12 h-12 bg-[#D4AF37]/20 rounded-full blur-xl animate-pulse" />
      <div className="absolute w-8 h-8 bg-[#D4AF37]/10 rounded-full blur-md" />
      
      {/* Lock Icon */}
      <svg 
        width="24" height="24" viewBox="0 0 24 24" fill="none" 
        stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        className="drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]"
      >
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    </div>
  </div>
);

const RunicDivider = ({ color = "#D4AF37" }: { color?: string }) => (
  <div className="flex flex-col items-center justify-center mb-6">
    <div className="w-8 h-8 rotate-45 border flex items-center justify-center relative" style={{ borderColor: `${color}40` }}>
      <div className="w-5 h-5 border flex items-center justify-center" style={{ borderColor: color }}>
        <span className="-rotate-45 font-heading text-[10px]" style={{ color }}>ᛟ</span>
      </div>
    </div>
  </div>
);

const GoldCardCorners = () => (
  <>
    <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-[#D4AF37]/60 rounded-tl-sm pointer-events-none" />
    <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-[#D4AF37]/60 rounded-tr-sm pointer-events-none" />
    <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-[#D4AF37]/60 rounded-bl-sm pointer-events-none" />
    <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-[#D4AF37]/60 rounded-br-sm pointer-events-none" />
  </>
);

// ───────────────────────────────────────────────
//  MAIN COMPONENT
// ───────────────────────────────────────────────
export default function GodLevelSponsors() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.sp-reveal').forEach((el, i) => {
        gsap.fromTo(el,
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 150%' },
            delay: (i % 3) * 0.15 
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full min-h-auto section-main bg-[#080706] relative overflow-hidden font-body text-slate-300">
      
      {/* Global Background Ambience */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-10 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-[radial-gradient(ellipse,rgba(212,175,55,0.08)_0%,transparent_60%)] pointer-events-none z-0" />

      {/* CONTAINER */}
      <div className="container-main relative z-10 flex flex-col gap-12 md:gap-16 lg:gap-24">

        {/* Header */}
        <div className="sp-reveal flex flex-col items-center text-center">
          <h2 className="font-heading text-3xl md:text-5xl text-white tracking-[0.2em] uppercase drop-shadow-[0_2px_15px_rgba(212,175,55,0.2)]">
            Stairway of Sovereigns
          </h2>
        </div>

        {/* ════════════ 1. TOP GRID (TITLE + GOLD TOP) ════════════ */}
        <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-12 items-stretch w-full">
          
          {/* LEFT: TITLE SPONSOR */}
          <div className="sp-reveal col-span-4 md:col-span-8 lg:col-span-7 flex h-[320px] items-stretch">
            <div className="relative flex w-full overflow-hidden rounded-3xl border border-[#d4af37]/30 bg-black/40 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] bg-linear-to-b from-black/80 to-black/20 backdrop-blur-xl transition-[transform,box-shadow,border-color] duration-500 ease-out hover:scale-[1.02] hover:border-[#d4af37]/75 hover:shadow-[0_45px_75px_-20px_rgba(0,0,0,0.7)] group">
              
              <GoldenLock />

              {/* Dynamic Arch Background */}
              <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[150%] max-w-[800px] aspect-square rounded-full border-t-2 border-[#D4AF37]/30 opacity-70 pointer-events-none group-hover:border-[#D4AF37]/50 transition-colors duration-700" />
              <div className="absolute inset-0 bg-gradient-to-b from-[rgba(212,175,55,0.02)] to-transparent pointer-events-none" />

              {/* Runic Trim */}
              <div className="absolute top-6 w-full flex justify-between px-12 md:px-20 text-[#D4AF37]/30 font-heading text-2xl tracking-[0.4em] pointer-events-none select-none">
                <span>ᚠ ᚢ ᚦ</span>
                <span>ᚱ ᚲ ᚷ</span>
              </div>
            </div>
          </div>

          {/* RIGHT: GOLD TIER TOP */}
          <div className="sp-reveal col-span-4 md:col-span-8 lg:col-span-5 flex h-full items-stretch">
            <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-6 md:gap-8 w-full h-full">
              {[1, 2].map((_, i) => (
                <div key={i} className="relative col-span-4 md:col-span-4 lg:col-span-6 flex flex-col justify-center items-center rounded-xl bg-white/5 backdrop-blur-md border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 shadow-sm transition-all duration-300 w-full min-h-[150px] group overflow-hidden">
                  <GoldenLock />
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ════════════ 2. SECOND ROW (GOLD TIER MAIN) ════════════ */}
        <div className="w-full flex flex-col gap-8">
          <div className="sp-reveal flex flex-col items-center text-center">
            <RunicDivider color="#D4AF37" />
            <h3 className="font-heading text-2xl text-[#B8860B] tracking-[0.2em] uppercase">
              Gold Tier
            </h3>
          </div>
          
          <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-6 md:gap-8 w-full items-stretch">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="sp-reveal col-span-4 md:col-span-4 lg:col-span-4 relative flex flex-col justify-center items-center min-h-[220px] rounded-xl bg-white/10 backdrop-blur-xl border border-[#D4AF37]/30 shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:border-[#D4AF37]/60 hover:-translate-y-1 transition-all duration-300 group overflow-hidden">
                <GoldenLock />
                <GoldCardCorners />
              </div>
            ))}
          </div>
        </div>

        {/* ════════════ 3. COMMUNITY PARTNERS ════════════ */}
        <div className="w-full flex flex-col gap-8">
          <div className="sp-reveal flex flex-col items-center text-center">
            <RunicDivider color="#b38224" />
            <h3 className="font-heading text-xl text-slate-500 tracking-[0.2em] uppercase">
              Community Partners
            </h3>
          </div>
          
          <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4 md:gap-6 w-full items-stretch">
            {[1, 2, 3, 4].map((_, i) => (
              <div key={i} className="sp-reveal relative col-span-2 md:col-span-2 lg:col-span-3 flex items-center justify-center min-h-[100px] rounded-lg bg-white/5 border-2 border-[#D4AF37]/25 hover:bg-white/10 hover:border-[#D4AF37]/50 shadow-[0_2px_12px_rgba(0,0,0,0.2)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.4)] transition-all duration-300 cursor-default text-center group overflow-hidden">
                <GoldenLock />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
