'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ── PRIZES DATA ──
const prizesData = [
  {
    id: 1,
    tier: 'Grand Prize',
    title: "Odin's Blessing",
    amount: '₹1,00,000',
    rune: 'ᚷ',
    description: 'The ultimate reward for the most visionary creators in the realm.',
    perks: ['Priority Incubation Support', '$5000 AWS Cloud Credits', 'Exclusive Asgardian Swag Kit', 'Direct Mentorship with Judges'],
  },
  {
    id: 2,
    tier: 'Gold Tier',
    title: "Thor's Hammer",
    amount: '₹50,000',
    rune: 'ᚫ',
    description: 'A powerful arsenal awarded to the masters of execution and design.',
    perks: ['$2000 AWS Cloud Credits', 'Premium Dev Tools License', 'Gold Tier T-Shirts', 'API Access to Partner Networks'],
  },
  {
    id: 3,
    tier: 'Silver Tier',
    title: "Freya's Grace",
    amount: '₹25,000',
    rune: 'ᚢ',
    description: 'Recognizing outstanding innovation and technical elegance.',
    perks: ['$1000 Cloud Credits', 'Official Certificates of Excellence', 'Silver Tier Swag & Stickers', 'Partner Vouchers'],
  },
  {
    id: 4,
    tier: 'Special Tracks',
    title: "Loki's Mischief",
    amount: '₹10,000',
    rune: 'ᛗ',
    description: 'Awarded to teams who break the rules and redefine the impossible.',
    perks: ['Best UI/UX Design Award', 'Best Web3 Implementation', 'Best All-Girls Team', 'Surprise Mystery Loot Box'],
  },
];

export default function PrizesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const desktopCardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ════════════ DESKTOP SCROLL LOGIC (3D STACK & FLIP) ════════════
    const ctx = gsap.context(() => {
      const wrappers = gsap.utils.toArray<HTMLElement>('.card-wrapper');
      const flippers = gsap.utils.toArray<HTMLElement>('.card-flipper');
      const glow = document.querySelector('.ambient-glow');

      // 1. Initial State Setup
      gsap.set(wrappers, {
        y: (i) => i * 45, // Stagger them downwards initially
        scale: (i) => 1 - i * 0.05, // Make cards further back smaller
        opacity: (i) => 1 - i * 0.15, // Make cards further back darker
        zIndex: (i) => prizesData.length - i, // Top card is highest z-index
      });

      // 2. Master Timeline tied to scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1, // Smooth interpolation
        },
      });

      // 3. Animation Sequence
      wrappers.forEach((wrapper, i) => {
        const flipper = flippers[i];

        // Step A: Flip the current card to reveal the back
        tl.to(flipper, { 
          rotateY: 180, 
          duration: 1.5, 
          ease: 'power2.inOut',
          onStart: () => {
            // Intensify background glow when flipping
            gsap.to(glow, { opacity: 0.8, scale: 1.2, duration: 0.5 });
          },
          onComplete: () => {
            gsap.to(glow, { opacity: 0.4, scale: 1, duration: 0.5 });
          }
        });

        // If it's NOT the last card, animate it moving away and bring others forward
        if (i < wrappers.length - 1) {
          // Brief pause so the user can read the flipped card
          tl.to({}, { duration: 0.8 });

          // Step B: Move current card up and fade out
          tl.to(wrapper, { 
            y: -window.innerHeight * 0.8, 
            opacity: 0, 
            scale: 1.1, 
            duration: 1.5, 
            ease: 'power2.in' 
          }, `transition-${i}`);

          // Step C: Simultaneously bring all remaining cards forward
          for (let j = i + 1; j < wrappers.length; j++) {
            tl.to(wrappers[j], {
              y: (j - i - 1) * 45,
              scale: 1 - (j - i - 1) * 0.05,
              opacity: 1 - (j - i - 1) * 0.15,
              duration: 1.5,
              ease: 'power2.out',
            }, `transition-${i}`);
          }
        }
      });

      // ════════════ MOBILE SCROLL LOGIC (FADE UP) ════════════
      const mobileCards = gsap.utils.toArray<HTMLElement>('.mobile-card');
      mobileCards.forEach((card) => {
        gsap.fromTo(card,
          { opacity: 0, y: 50 },
          {
            opacity: 1, y: 0, duration: 1, ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            }
          }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="prizes"
      ref={sectionRef} 
      // Height is 400vh to give the user plenty of scroll distance to read all 4 cards
      className="relative w-full h-[400vh] bg-[#FAF9F6] font-body selection:bg-[#FFD700]/30"
    >
      
      {/* ════════════ DESKTOP: STICKY 3D STACKING ENVIRONMENT ════════════ */}
      <div className="hidden md:flex sticky top-0 w-full h-screen items-center justify-center overflow-hidden perspective-[1500px]">
        
        {/* Cinematic Background Elements */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-5 pointer-events-none mix-blend-multiply" />
        <div className="ambient-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.1)_0%,transparent_60%)] pointer-events-none opacity-60 transition-all duration-500" />
        
        {/* Title */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 text-center z-50">
          <h2 className="font-heading text-[clamp(2rem,4vw,3rem)] text-[#1A1A1A] tracking-[0.2em] uppercase drop-shadow-[0_2px_10px_rgba(212,175,55,0.2)]">
            Divine Treasures
          </h2>
          <div className="w-24 h-[1.5px] bg-linear-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-4" />
        </div>

        {/* 3D Card Stack Container */}
        <div ref={desktopCardsRef} className="relative w-full max-w-[420px] h-[580px] transform-style-3d mt-16">
          {prizesData.map((prize) => (
            <div 
              key={prize.id} 
              // The wrapper handles the X/Y/Scale/Z-index stacking
              className="card-wrapper absolute inset-0 w-full h-full will-change-transform"
            >
              {/* The flipper handles the 3D RotateY Flip. transform-style-3d ensures children exist in 3D space */}
              <div className="card-flipper relative w-full h-full transform-style-3d will-change-transform rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.6),inset_0_0_0_1px_rgba(255,215,0,0.2)]">
                
                {/* ── FRONT OF CARD ── */}
                <div className="absolute inset-0 w-full h-full backface-hidden flex flex-col items-center justify-center p-8 bg-linear-to-b from-[#FFFFFF] to-[#FDFBF7] backdrop-blur-xl rounded-3xl border border-[#D4AF37]/40 shadow-xl">
                  {/* Ornate corner accents */}
                  <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#D4AF37]/50" />
                  <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#D4AF37]/50" />
                  <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#D4AF37]/50" />
                  <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#D4AF37]/50" />

                  <div className="relative mb-8">
                    <div className="absolute inset-0 bg-[#FFD700] blur-2xl opacity-20 rounded-full" />
                    <span className="relative font-heading text-[80px] text-transparent bg-clip-text bg-linear-to-b from-[#FFD700] to-[#B8860B] drop-shadow-[0_2px_10px_rgba(212,175,55,0.8)]">
                      {prize.rune}
                    </span>
                  </div>

                  <span className="font-body text-xs tracking-[0.4em] text-[#B8860B] uppercase mb-4">
                    {prize.tier}
                  </span>
                  <h3 className="font-heading text-3xl uppercase tracking-widest text-[#1A1A1A] text-center leading-snug">
                    {prize.title}
                  </h3>
                </div>

                {/* ── BACK OF CARD (REVEAL) ── */}
                {/* rotate-y-180 puts it on the back. backface-hidden ensures we don't see it until flipped. */}
                <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 flex flex-col p-10 bg-linear-to-br from-[#FFFDF5] to-[#FDFBF2] rounded-3xl border-2 border-[#FFD700] shadow-[inset_0_0_60px_rgba(212,175,55,0.15)]">
                  
                  <div className="flex flex-col items-center text-center border-b border-[#D4AF37]/30 pb-6 mb-6">
                    <span className="font-heading text-sm tracking-[0.2em] text-[#B8860B] uppercase mb-2">
                      {prize.title}
                    </span>
                    <h4 className="font-body text-5xl font-black text-slate-900 tracking-tight drop-shadow-sm">
                      {prize.amount}
                    </h4>
                  </div>

                  <p className="font-body text-sm text-slate-600 leading-relaxed font-medium mb-6 text-center">
                    {prize.description}
                  </p>

                  <div className="flex-1 flex flex-col justify-center">
                    <span className="font-heading text-xs font-bold tracking-widest text-slate-400 uppercase mb-4">
                      Divine Perks Include:
                    </span>
                    <ul className="space-y-4">
                      {prize.perks.map((perk, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="mt-0.5 shrink-0 w-4 h-4 rounded-full bg-[#FFD700]/20 flex items-center justify-center border border-[#FFD700]/50">
                            <div className="w-1.5 h-1.5 bg-[#B8860B] rounded-full rotate-45" />
                          </div>
                          <span className="font-body text-[13px] text-slate-700 font-medium">
                            {perk}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ════════════ MOBILE: VERTICAL LIST FALLBACK ════════════ */}
      {/* 3D stacking is notoriously unreadable and buggy on mobile viewports. We degrade gracefully to a beautiful cinematic list. */}
      <div className="md:hidden flex flex-col items-center py-24 px-6 gap-8 relative z-10 min-h-screen">
        
        <div className="text-center mb-8">
          <h2 className="font-heading text-3xl text-[#1A1A1A] tracking-[0.15em] uppercase">
            Divine Treasures
          </h2>
          <div className="w-16 h-[1.5px] bg-linear-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-4" />
        </div>

        {prizesData.map((prize) => (
          <div 
            key={prize.id} 
            className="mobile-card w-full max-w-sm flex flex-col bg-white rounded-3xl border border-[#D4AF37]/30 shadow-lg overflow-hidden"
          >
            {/* Top Header Section */}
            <div className="relative p-6 border-b border-[#D4AF37]/20 flex flex-col items-center text-center bg-[#FDFBF7]">
              <span className="font-heading text-3xl text-[#B8860B] mb-2">{prize.rune}</span>
              <span className="font-body text-[10px] tracking-[0.3em] text-[#B8860B] uppercase mb-1">{prize.tier}</span>
              <h3 className="font-heading text-xl uppercase tracking-widest text-[#1A1A1A]">{prize.title}</h3>
            </div>

            {/* Bottom Content Section */}
            <div className="p-6 bg-linear-to-b from-transparent to-[#D4AF37]/5">
              <div className="text-center mb-6">
                <h4 className="font-body text-4xl font-black text-[#1A1A1A] tracking-tight">{prize.amount}</h4>
              </div>
              <ul className="space-y-3">
                {prize.perks.map((perk, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="mt-1 shrink-0 w-3 h-3 rounded-full bg-[#D4AF37]/10 flex items-center justify-center border border-[#D4AF37]/30">
                      <div className="w-1 h-1 bg-[#B8860B] rounded-full" />
                    </div>
                    <span className="font-body text-xs text-[#2D2D2D] leading-relaxed">
                      {perk}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
