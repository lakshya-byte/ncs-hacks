'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ── DUMMY DATA ──
const SPONSORS_DATA = {
  title: { id: 's1', name: 'Aesir Core', tier: 'Supreme Alliance' },
  gold: [
    { id: 'g1', name: 'Valhalla Tech' },
    { id: 'g2', name: 'Bifrost Networks' },
    { id: 'g3', name: 'Odin Dynamics' },
  ],
  silver: [
    { id: 'si1', name: 'Rune Systems' },
    { id: 'si2', name: 'Mjolnir Forge' },
    { id: 'si3', name: 'Yggdrasil Data' },
    { id: 'si4', name: 'Valkyrie Cloud' },
  ],
  community: Array.from({ length: 8 }).map((_, i) => ({ id: `c${i}`, name: `Partner ${i + 1}` }))
};

export default function Sponsors() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal the title elements
      gsap.fromTo('.reveal-title',
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
        }
      );

      // Reveal sponsor cards dynamically via batch
      ScrollTrigger.batch('.sponsor-card', {
        onEnter: batch => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: 'power2.out' }),
        start: 'top 85%'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-32 bg-[#FAFAF8] overflow-hidden">
      {/* Background radial god rays */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[80vh] bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.08)_0%,transparent_70%)] pointer-events-none" />

      {/* Infinite Marquee Keyframes */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .anim-marquee {
          animation: marquee 20s linear infinite;
        }
        .marquee-group:hover .anim-marquee {
          animation-play-state: paused;
        }
        @keyframes levitate {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .anim-levitate {
          animation: levitate 6s ease-in-out infinite;
        }
      `}} />

      <div className="site-container relative z-10 flex flex-col items-center">
        
        {/* Header */}
        <div className="text-center mb-20 reveal-title">
          <p className="font-sans text-sm tracking-[0.3em] uppercase text-[#B8860B]/70 font-semibold mb-4">
            The Divine Alliance
          </p>
          <h2 
            className="font-serif text-[#B8860B] leading-[1.1] drop-shadow-[0_0_20px_rgba(212,175,55,0.2)]"
            style={{ fontSize: 'clamp(3rem, 6vw, 5rem)' }}
          >
            Our Partners
          </h2>
        </div>

        {/* 1. TITLE SPONSOR */}
        <div className="w-full max-w-3xl mb-24 reveal-title">
          <div className="sponsor-card opacity-0 translate-y-10 w-full aspect-2/1 sm:aspect-3/1 rounded-3xl border border-[#FFD700]/40 bg-linear-to-br from-white/80 to-white/30 backdrop-blur-xl shadow-[0_20px_60px_rgba(212,175,55,0.15)] flex flex-col items-center justify-center relative group anim-levitate transition-all duration-700 hover:scale-[1.02] hover:shadow-[0_30px_80px_rgba(212,175,55,0.3)] cursor-pointer overflow-hidden border-b-4 border-b-[#D4AF37]">
            {/* Inner glow pulse */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.15)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <p className="font-sans text-[10px] sm:text-xs tracking-[0.2em] uppercase text-[#B8860B]/70 mb-2 font-bold bg-white/50 px-4 py-1 rounded-full">{SPONSORS_DATA.title.tier}</p>
            <h3 className="font-serif text-3xl sm:text-5xl text-black/80">{SPONSORS_DATA.title.name}</h3>
          </div>
        </div>

        {/* 2. GOLD SPONSORS */}
        <div className="w-full max-w-5xl mb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {SPONSORS_DATA.gold.map(sponsor => (
              <div key={sponsor.id} className="sponsor-card opacity-0 translate-y-10 aspect-video rounded-2xl border border-[#FFD700]/30 bg-white/60 backdrop-blur-lg shadow-[0_10px_30px_rgba(212,175,55,0.08)] flex items-center justify-center relative group transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(212,175,55,0.2)] hover:border-[#FFD700]/60 cursor-pointer overflow-hidden">
                {/* Gold shim */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-linear-to-r from-transparent via-[#D4AF37] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <h4 className="font-serif text-2xl text-black/70 group-hover:text-black/90 transition-colors">{sponsor.name}</h4>
              </div>
            ))}
          </div>
        </div>

        {/* 3. SILVER SPONSORS */}
        <div className="w-full max-w-4xl mb-32">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {SPONSORS_DATA.silver.map(sponsor => (
              <div key={sponsor.id} className="sponsor-card opacity-0 translate-y-10 aspect-3/2 rounded-xl bg-white shadow-[0_4px_15px_rgba(0,0,0,0.03)] flex items-center justify-center group transition-all duration-300 hover:shadow-[inset_0_0_15px_rgba(212,175,55,0.1),0_8px_20px_rgba(0,0,0,0.05)] cursor-pointer">
                <span className="font-sans text-sm font-medium text-black/60 group-hover:text-[#B8860B] transition-colors">{sponsor.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. COMMUNITY PARTNERS (Full width infinite marquee) */}
      <div className="w-full border-t border-b border-[#D4AF37]/10 bg-white/30 py-8 relative overflow-hidden group marquee-group reveal-title pb-10">
        <p className="text-center font-sans text-xs tracking-[0.2em] uppercase text-black/40 mb-6 font-semibold">Community Partners</p>
        
        {/* Left/Right Fade Masks */}
        <div className="absolute top-0 left-0 w-32 h-full bg-linear-to-r from-[#FAFAF8] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-32 h-full bg-linear-to-l from-[#FAFAF8] to-transparent z-10 pointer-events-none" />

        <div className="flex w-[200%] anim-marquee">
          {/* Output list twice for seamless loop */}
          {[...SPONSORS_DATA.community, ...SPONSORS_DATA.community].map((partner, i) => (
            <div key={`${partner.id}-${i}`} className="w-[15%] shrink-0 flex items-center justify-center px-4">
              <span className="font-sans text-sm font-semibold text-black/30 hover:text-black/70 transition-colors cursor-pointer whitespace-nowrap">{partner.name}</span>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
