'use client';

import React, { useEffect, useRef } from 'react';
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
        <span className="-rotate-45 font-serif text-[10px]" style={{ color }}>ᛟ</span>
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
            scrollTrigger: { trigger: el, start: 'top 85%' },
            delay: (i % 3) * 0.15 
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full min-h-auto py-24 bg-[#0A0F1C] relative overflow-hidden font-sans text-white">
      
      {/* Global Background Ambience */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-5 pointer-events-none mix-blend-screen" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-[radial-gradient(ellipse,rgba(212,175,55,0.06)_0%,transparent_60%)] pointer-events-none z-0" />

      {/* CONTAINER */}
      <div className="site-container relative z-10 flex flex-col gap-24">

        {/* Header */}
        <div className="sp-reveal flex flex-col items-center text-center">
          <h2 className="font-serif text-3xl md:text-5xl text-[#F0E6D2] tracking-[0.2em] uppercase drop-shadow-[0_2px_15px_rgba(212,175,55,0.2)]">
            Stairway of Sovereigns
          </h2>
        </div>

        {/* ════════════ 1. TOP GRID (TITLE + GOLD TOP) ════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch w-full">
          
          {/* LEFT: TITLE SPONSOR */}
          <div className="sp-reveal lg:col-span-7 flex h-full items-stretch">
            <div className="relative w-full flex flex-col items-center justify-center p-8 md:p-14 rounded-2xl bg-gradient-to-b from-[#131A2B] to-[#0A0F1C] border border-[#D4AF37]/30 shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-hidden group">
              
              {/* Dynamic Arch Background */}
              <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[150%] max-w-[800px] aspect-square rounded-full border-t-2 border-[#D4AF37]/40 opacity-70 pointer-events-none group-hover:border-[#D4AF37]/70 transition-colors duration-700" />
              <div className="absolute -top-[18%] left-1/2 -translate-x-1/2 w-[140%] max-w-[750px] aspect-square rounded-full border-t border-white/20 opacity-50 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-b from-[rgba(212,175,55,0.05)] to-transparent pointer-events-none" />

              {/* Runic Trim */}
              <div className="absolute top-6 w-full flex justify-between px-12 md:px-20 text-[#D4AF37]/15 font-serif text-2xl tracking-[0.4em] pointer-events-none select-none">
                <span>ᚠ ᚢ ᚦ</span>
                <span>ᚱ ᚲ ᚷ</span>
              </div>

              {/* Content */}
              <div className="relative z-10 w-full flex flex-col items-center mt-8">
                {/* IMAGE SAFE CONTAINER */}
                <div className="h-[90px] w-full max-w-[300px] flex items-center justify-center mb-8 shrink-0">
                  <img 
                    src={SPONSORS_DATA.titleSponsor.logoUrl} 
                    alt="Title Sponsor" 
                    className="h-full w-full object-contain filter drop-shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                  />
                </div>
                
                <h3 className="font-serif text-3xl md:text-4xl text-[#D4AF37] tracking-[0.15em] mb-4 text-center uppercase">
                  {SPONSORS_DATA.titleSponsor.name}
                </h3>
                
                <div className="flex items-center gap-4 w-full max-w-md justify-center">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#D4AF37]/60" />
                  <p className="font-sans text-[11px] md:text-xs tracking-[0.3em] text-[#F0E6D2] uppercase whitespace-nowrap">
                    {SPONSORS_DATA.titleSponsor.desc}
                  </p>
                  <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#D4AF37]/60" />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: GOLD TIER TOP */}
          <div className="sp-reveal lg:col-span-5 flex h-full items-stretch">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full h-full">
              {SPONSORS_DATA.goldLight.map((sp, i) => (
                <div key={i} className="flex flex-col justify-between items-center text-center p-6 rounded-xl bg-gradient-to-b from-[#161D2F] to-[#0D1321] border border-[#2A3A5C] hover:border-[#A0AABF]/50 shadow-lg transition-all duration-300 w-full h-full">
                  {/* IMAGE SAFE CONTAINER */}
                  <div className="h-[70px] w-full flex items-center justify-center mb-4 shrink-0">
                    <img src={sp.logoUrl} alt={sp.name} className="h-full w-full object-contain opacity-90 grayscale hover:grayscale-0 transition-all text-transparent" />
                  </div>
                  <div className="flex flex-col items-center justify-end flex-grow w-full">
                    <h4 className="font-serif text-[11px] text-[#E2E8F0] tracking-[0.1em] font-bold mb-2 uppercase">
                      {sp.name}
                    </h4>
                    <p className="font-sans text-[10px] text-[#94A3B8] leading-relaxed">
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
            <h3 className="font-serif text-2xl text-[#D4AF37] tracking-[0.2em] uppercase">
              Gold Tier
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full items-stretch">
            {SPONSORS_DATA.goldDark.map((sp, i) => (
              <div key={i} className="sp-reveal md:col-span-4 relative flex flex-col justify-between items-center text-center p-8 rounded-xl bg-gradient-to-b from-[#161D2F] to-[#0A0F1C] border border-[#D4AF37]/30 shadow-[0_5px_20px_rgba(0,0,0,0.5)] hover:border-[#D4AF37]/60 hover:-translate-y-1 transition-all duration-300 group w-full h-full">
                <GoldCardCorners />
                {/* IMAGE SAFE CONTAINER */}
                <div className="h-[80px] w-full flex items-center justify-center mb-6 shrink-0">
                  <img src={sp.logoUrl} alt={sp.name} className="h-full w-full object-contain filter drop-shadow-[0_0_10px_rgba(212,175,55,0.1)] group-hover:drop-shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all text-transparent" />
                </div>
                <div className="flex flex-col items-center justify-end flex-grow w-full">
                  <h4 className="font-serif text-[13px] md:text-[14px] text-[#F0E6D2] tracking-[0.15em] mb-3 uppercase">
                    {sp.name}
                  </h4>
                  <p className="font-sans text-[11px] md:text-[12px] text-[#A0AABF] leading-relaxed">
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
            <RunicDivider color="#475569" />
            <h3 className="font-serif text-xl text-[#94A3B8] tracking-[0.2em] uppercase">
              Community Partners
            </h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-12 gap-4 w-full items-stretch">
            {SPONSORS_DATA.community.map((name, i) => (
              <div key={i} className="sp-reveal md:col-span-3 flex items-center justify-center p-4 min-h-[80px] rounded-lg bg-[#0F1626] border border-[#1E293B] hover:bg-[#161D2F] hover:border-[#475569] transition-all duration-300 cursor-default text-center group w-full h-full">
                <span className="font-serif text-[10px] md:text-[11px] text-[#94A3B8] group-hover:text-[#E2E8F0] tracking-[0.15em] uppercase transition-colors">
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