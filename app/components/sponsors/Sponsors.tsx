'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ───────────────────────────────────────────────
//  MOCK JSON DATA
// ───────────────────────────────────────────────
const SPONSORS_DATA = {
  titleSponsor: {
    name: 'AEGIR TECHNOLOGIES',
    desc: 'TITLE SPONSOR',
    logoUrl: 'https://placehold.co/400x200/transparent/D4AF37?font=playfair-display&text=AEGIR+LOGO'
  },
  goldDark: [
    { name: 'VALHALLA VENTURES', desc: 'Valhalla is a sanctuary of illustrious technology and prosperous ventures.', logoUrl: 'https://placehold.co/200x100/transparent/D4AF37?font=playfair-display&text=V' },
    { name: "ODIN'S FORGE SOLUTIONS", desc: 'Crafting enterprise-grade commerce solutions and resources.', logoUrl: 'https://placehold.co/200x100/transparent/D4AF37?font=playfair-display&text=O' },
    { name: 'FREYA GLOBAL', desc: 'A universe of autonomous collaboration and open-source ethos.', logoUrl: 'https://placehold.co/200x100/transparent/D4AF37?font=playfair-display&text=F' },
  ],
  goldLight: [
    { name: 'MJÖLNIR SYSTEMS', desc: 'Precision engineering meets thunderous performance.', logoUrl: 'https://placehold.co/200x100/transparent/A0AABF?font=playfair-display&text=M' },
    { name: 'BIFRÖST CONNECT', desc: 'Bridging realms through next-gen connectivity.', logoUrl: 'https://placehold.co/200x100/transparent/A0AABF?font=playfair-display&text=B' },
    { name: 'LOKI INNOVATIONS', desc: 'Unconventional solutions for complex problems.', logoUrl: 'https://placehold.co/200x100/transparent/A0AABF?font=playfair-display&text=L' },
    { name: 'HEIMDALL SECURITY', desc: 'Vigilant guardianship for digital assets.', logoUrl: 'https://placehold.co/200x100/transparent/A0AABF?font=playfair-display&text=H' },
  ],
  community: [
    'YGGDRASIL CODERS', 'RAGNARÖK DEV GUILD', 'ASGARD ACADEMY', 'NORSE NETWORKS',
    'MIDGARD MAKERS', 'VALKYRIE CODE', "THOR'S HAMMER HACKS", 'FENRIR FOUNDATION',
    'RUNIC REALMS', 'SAGAS & SCRIPTS', 'VIKING VISION', 'NORTHERN LIGHTS LABS',
  ]
};

// ───────────────────────────────────────────────
//  REUSABLE DECORATIVE COMPONENTS
// ───────────────────────────────────────────────
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
          <div className="sp-reveal col-span-4 md:col-span-8 lg:col-span-7 flex h-full items-stretch">
            <div className="flex w-full flex-col justify-between overflow-hidden rounded-3xl border border-[#d4af37]/30 bg-black/40 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] md:flex-row bg-linear-to-b md:bg-linear-to-r from-black/80 to-black/20 backdrop-blur-xl transition-[transform,box-shadow,border-color] duration-500 ease-out hover:scale-[1.02] hover:border-[#d4af37]/75 hover:shadow-[0_45px_75px_-20px_rgba(0,0,0,0.7)]">
              
              {/* Dynamic Arch Background */}
              <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[150%] max-w-[800px] aspect-square rounded-full border-t-2 border-[#D4AF37]/30 opacity-70 pointer-events-none group-hover:border-[#D4AF37]/50 transition-colors duration-700" />
              <div className="absolute -top-[18%] left-1/2 -translate-x-1/2 w-[140%] max-w-[750px] aspect-square rounded-full border-t border-black/5 opacity-20 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-b from-[rgba(212,175,55,0.02)] to-transparent pointer-events-none" />

              {/* Runic Trim */}
              <div className="absolute top-6 w-full flex justify-between px-12 md:px-20 text-[#D4AF37]/30 font-heading text-2xl tracking-[0.4em] pointer-events-none select-none">
                <span>ᚠ ᚢ ᚦ</span>
                <span>ᚱ ᚲ ᚷ</span>
              </div>

              {/* Content */}
              <div className="relative z-10 w-full flex flex-col items-center mt-8">
                {/* IMAGE SAFE CONTAINER */}
                <div className="relative h-[90px] w-full max-w-[280px] flex items-center justify-center mb-5 shrink-0">
                  <Image 
                    src={SPONSORS_DATA.titleSponsor.logoUrl} 
                    alt={SPONSORS_DATA.titleSponsor.name} 
                    fill
                    sizes="(max-width: 768px) 280px, 400px"
                    className="object-contain brightness-0 invert opacity-90 drop-shadow-sm" 
                  />
                </div>
                
                <h3 className="font-heading text-3xl md:text-4xl text-[#B8860B] tracking-[0.1em] mb-4 text-center uppercase">
                  {SPONSORS_DATA.titleSponsor.name}
                </h3>
                
                <div className="flex items-center gap-4 w-full max-w-md justify-center">
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 block h-16 bg-linear-to-t from-black/80 to-transparent md:hidden" />
                  <p className="font-body text-[11px] md:text-xs tracking-[0.3em] text-[#D4AF37] uppercase whitespace-nowrap">
                    {SPONSORS_DATA.titleSponsor.desc}
                  </p>
                  <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-16 bg-linear-to-l from-black/80 to-transparent md:block" />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: GOLD TIER TOP */}
          <div className="sp-reveal col-span-4 md:col-span-8 lg:col-span-5 flex h-full items-stretch">
            <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-6 md:gap-8 w-full h-full">
              {SPONSORS_DATA.goldLight.map((sp, i) => (
                <div key={i} className="col-span-4 md:col-span-4 lg:col-span-6 flex flex-col justify-between items-center text-center p-6 rounded-xl bg-white/5 backdrop-blur-md border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 shadow-sm transition-all duration-300 w-full h-full group">
                  {/* IMAGE SAFE CONTAINER */}
                  <div className="relative h-[70px] w-full flex items-center justify-center mb-4 shrink-0">
                    <Image src={sp.logoUrl} alt={sp.name} fill sizes="(max-width: 768px) 150px, 200px" className="object-contain invert opacity-70 transition-opacity grayscale group-hover:grayscale-0 group-hover:opacity-100" />
                  </div>
                  <div className="flex grow flex-col justify-center bg-black/20 p-10 md:w-2/3 lg:p-14">
                    <span className="mb-2 font-body text-[0.8rem] font-bold tracking-[0.05em] text-[#d4af37] uppercase">
                      {sp.name}
                    </span>
                    <p className="font-body text-[10px] text-slate-400 leading-relaxed font-light">
                      {sp.desc}
                    </p>
                  </div>
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
            {SPONSORS_DATA.goldDark.map((sp, i) => (
              <div key={i} className="sp-reveal col-span-4 md:col-span-4 lg:col-span-4 relative flex flex-col justify-between items-center text-center p-8 rounded-xl bg-white/10 backdrop-blur-xl border border-[#D4AF37]/30 shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:border-[#D4AF37]/60 hover:-translate-y-1 transition-all duration-300 group w-full h-full">
                <GoldCardCorners />
                {/* IMAGE SAFE CONTAINER */}
                <div className="relative h-[80px] w-full flex items-center justify-center mb-6 shrink-0">
                  <Image src={sp.logoUrl} alt={sp.name} fill sizes="(max-width: 768px) 150px, 200px" className="object-contain brightness-0 invert opacity-80" />
                </div>
                <div className="flex flex-col items-center justify-end flex-grow w-full">
                  <h4 className="font-body text-[0.85rem] md:text-[0.95rem] text-white tracking-[0.08em] mb-3 uppercase font-extrabold">
                    {sp.name}
                  </h4>
                  <p className="font-body text-[11px] md:text-[12px] text-slate-400 leading-relaxed font-light">
                    {sp.desc}
                  </p>
                </div>
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
            {SPONSORS_DATA.community.map((name, i) => (
              <div key={i} className="sp-reveal col-span-2 md:col-span-2 lg:col-span-3 flex items-center justify-center p-4 min-h-[80px] rounded-lg bg-white/5 border-2 border-[#D4AF37]/25 hover:bg-white/10 hover:border-[#D4AF37]/50 shadow-[0_2px_12px_rgba(0,0,0,0.2)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.4)] transition-all duration-300 cursor-default text-center group w-full h-full">
                <span className="font-body text-[0.7rem] md:text-[0.75rem] text-slate-400 group-hover:text-white tracking-[0.05em] uppercase font-bold transition-colors">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
