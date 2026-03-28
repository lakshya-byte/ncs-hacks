'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const timelineData = [
  {
    id: 1,
    title: 'Registration Opens',
    date: '1 April',
    description: 'The Bifröst bridge summons the worthy. Submit your entry to the Allfather\'s council and begin your journey to Valhalla\'s halls of innovation.',
    rune: 'ᚱ',
    side: 'right',
  },
  {
    id: 2,
    title: 'Problem Statement Release',
    date: '14 April',
    description: 'The ancient scrolls unfold. Decode the divine challenges passed down by Odin himself. Prepare your strategy for the impending battles of intellect.',
    rune: 'ᚹ',
    side: 'left',
  },
  {
    id: 3,
    title: 'Submission Phase',
    date: '14–20 April',
    description: 'The forge of Nidavellir burns hot. Gather your party and craft your magnum opus. Let your code thunder across the nine realms.',
    rune: 'ᚺ',
    side: 'right',
  },
  {
    id: 4,
    title: 'Online Evaluation',
    date: '21 April',
    description: 'Seek the counsel of the Valkyries and wise seers. Present your creations for guidance and tempering into divine artifacts.',
    rune: 'ᛗ',
    side: 'left',
  },
  {
    id: 5,
    title: 'Offline Hackathon',
    date: '24 April',
    description: 'Gather in the great golden halls. The final battle of wits begins. Code alongside the bravest warriors in the realm of Asgard.',
    rune: 'ᛃ',
    side: 'right',
  },
  {
    id: 6,
    title: 'Final Presentations',
    date: '25 April',
    description: 'Stand before the high council of Asgard. Demonstrate your creation\'s power, let your voice echo through the great golden halls.',
    rune: 'ᚷ',
    side: 'left',
  },
  {
    id: 7,
    title: 'Winner Announcement',
    date: '25 April',
    description: 'The feast of victory awaits. Reclaim your rightful place among the elite. The champions shall be immortalized in the stars.',
    rune: 'ᛟ',
    side: 'right',
  },
];

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=600%',
        pin: true,
        scrub: true,
        onUpdate: (self) => {
          const index = Math.min(6, Math.floor(self.progress * 7));
          setActiveIndex((prev) => (prev !== index ? index : prev));
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-[#FAFAF8]">

      {/* Keyframe for energy flow */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes energyFlow {
          0%   { transform: translateY(-300px); opacity: 0; }
          20%  { opacity: 1; }
          80%  { opacity: 1; }
          100% { transform: translateY(120vh);  opacity: 0; }
        }
      `}} />

      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,215,0,0.07)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-white/80 to-transparent pointer-events-none" />

      {/* ── Bifröst Spine (Left on mobile, Centre on desktop) ── */}
      <div className="absolute left-8 md:left-1/2 -translate-x-1/2 top-0 h-full w-[2px] overflow-hidden z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FFD700]/50 to-transparent" />
        <div
          className="absolute w-full h-48 bg-gradient-to-b from-transparent via-[#FFD700] to-transparent opacity-80"
          style={{ animation: 'energyFlow 3.5s ease-in-out infinite' }}
        />
      </div>
      <div className="absolute left-8 md:left-1/2 -translate-x-1/2 top-0 h-full w-px bg-white/50 pointer-events-none" />

      {/* ── Radial glow that tracks active node ── */}
      <div
        className="absolute left-8 md:left-1/2 -translate-x-1/2 w-[300px] md:w-[700px] h-[300px] md:h-[700px] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.07),transparent_60%)] pointer-events-none transition-all duration-[1000ms] ease-out"
        style={{ top: `calc(${9 + activeIndex * 13}% - 150px)` }} // roughly centered on the node
      />

      {/* ── Timeline Nodes ── */}
      <div className="relative w-full h-full pointer-events-none">
        {timelineData.map((stage, idx) => {
          const isActive = idx === activeIndex;
          const isComplete = idx < activeIndex;
          const topPct = 9 + idx * 13;

          return (
            <div
              key={stage.id}
              className="absolute left-0 w-full"
              style={{ top: `${topPct}%`, transform: 'translateY(-50%)' }}
            >
              <div className="site-container relative flex items-center justify-start md:justify-center pl-16 md:pl-0">
                
                {/* ── MOBILE DATE (Visible only on mobile) ── */}
                <div className={`md:hidden absolute top-[-25px] left-16 font-sans text-sm font-bold tracking-[0.1em] uppercase text-[#B8860B] transition-all duration-700 ${isActive ? 'opacity-100' : 'opacity-50'}`}>
                  {stage.date}
                </div>

                {/* ── DESKTOP LEFT HALF ── */}
                <div className="hidden md:flex w-1/2 justify-end pr-8 lg:pr-10">
                  {stage.side === 'left' ? (
                    <div className={`relative max-w-[380px] w-full p-7 rounded-3xl border border-[#FFD700]/40 bg-white/65 backdrop-blur-2xl shadow-[0_20px_50px_rgba(212,175,55,0.15)] text-right transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] pointer-events-auto ${
                      isActive ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4 pointer-events-none'
                    }`}>
                      <span className="absolute -right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 bg-white/70 border-r border-t border-[#FFD700]/40 rotate-45 rounded-sm" />
                      <h3 className="font-serif text-[22px] uppercase tracking-widest text-slate-800 mb-3 leading-snug">{stage.title}</h3>
                      <p className="font-sans text-[14px] text-slate-500 leading-relaxed font-light mb-0">{stage.description}</p>
                    </div>
                  ) : (
                    <span className={`font-sans text-lg font-bold tracking-[0.18em] uppercase text-[#B8860B] transition-all duration-700 ${isActive ? 'opacity-100 scale-105' : isComplete ? 'opacity-70' : 'opacity-40'}`}>
                      {stage.date}
                    </span>
                  )}
                </div>

                {/* ── THE NODE (Positioned on the spine) ── */}
                <div className="absolute left-8 md:static -translate-x-1/2 md:translate-x-0 z-30 flex-shrink-0 pointer-events-auto">
                  <div className={`rounded-full border bg-gradient-to-br from-[#FFFAEB] to-[#FAFAF8] flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                    isActive
                      ? 'w-[60px] h-[60px] md:w-[80px] md:h-[80px] border-[#FFD700] shadow-[0_0_45px_rgba(212,175,55,0.65)]'
                      : isComplete
                        ? 'w-10 h-10 md:w-12 md:h-12 border-[#FFD700]/70 shadow-[0_0_18px_rgba(212,175,55,0.35)] opacity-90'
                        : 'w-8 h-8 md:w-10 md:h-10 border-[#FFD700]/25 opacity-40'
                  }`}>
                    {isActive && <div className="absolute inset-0 rounded-full border border-[#FFD700] animate-ping opacity-30" />}
                    {isActive && <div className="absolute inset-[4px] rounded-full border border-[#B8860B]/30 border-dashed animate-spin" style={{ animationDuration: '10s' }} />}
                    <span className={`relative z-10 font-serif text-[#B8860B] transition-all duration-700 ${isActive ? 'text-[24px] md:text-[30px] drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]' : 'text-base md:text-lg'}`}>
                      {stage.rune}
                    </span>
                  </div>
                </div>

                {/* ── DESKTOP RIGHT HALF & MOBILE CARD ── */}
                <div className="w-full md:w-1/2 flex justify-start md:pl-8 lg:pl-10">
                  {stage.side === 'right' || true ? ( // On mobile, ALWAYS show a card on the right side of the spine
                    <div className={`relative max-w-full md:max-w-[380px] w-full p-5 md:p-7 rounded-2xl md:rounded-3xl border border-[#FFD700]/40 bg-white/65 backdrop-blur-2xl shadow-[0_20px_50px_rgba(212,175,55,0.15)] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] pointer-events-auto ${
                      isActive ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4 pointer-events-none'
                    } ${stage.side === 'left' ? 'md:hidden' : ''}`}> 
                      {/* Arrow tip → left (Only needed if it's an actual desktop right card or any mobile card) */}
                      <span className="absolute -left-2 top-10 md:top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 bg-white/70 border-l border-b border-[#FFD700]/40 rotate-45 rounded-sm" />
                      <h3 className="font-serif text-[18px] md:text-[22px] uppercase tracking-widest text-slate-800 mb-2 md:mb-3 leading-snug">{stage.title}</h3>
                      <p className="font-sans text-[13px] md:text-[14px] text-slate-500 leading-relaxed font-light mb-0">{stage.description}</p>
                    </div>
                  ) : null}
                  
                  {/* Desktop Right Date (hidden on mobile) */}
                  {stage.side === 'left' && (
                    <span className={`hidden md:block font-sans text-lg font-bold tracking-[0.18em] uppercase text-[#B8860B] transition-all duration-700 ${isActive ? 'opacity-100 scale-105' : isComplete ? 'opacity-70' : 'opacity-40'}`}>
                      {stage.date}
                    </span>
                  )}
                </div>

              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}
