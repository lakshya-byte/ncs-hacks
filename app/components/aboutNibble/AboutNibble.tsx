'use client';

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import RoyalFeatureCard from "./FeatureCard";
import RoyalAscendButton from "./Button";

gsap.registerPlugin(ScrollTrigger);

/* ── SVG Icons ── */
function IconInnovation() {
  return (
    <svg width="44" height="44" viewBox="0 0 52 52" fill="none">
      <circle cx="26" cy="26" r="24.5" stroke="url(#i1a)" strokeWidth="1.2"/>
      <circle cx="26" cy="26" r="8" stroke="url(#i1a)" strokeWidth="1.5" fill="none"/>
      <path d="M26 13v4M26 35v4M13 26h4M35 26h4" stroke="url(#i1a)" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M17.1 17.1l2.8 2.8M32.1 32.1l2.8 2.8M17.1 34.9l2.8-2.8M32.1 19.9l2.8-2.8" stroke="url(#i1a)" strokeWidth="1.2" strokeLinecap="round"/>
      <circle cx="26" cy="26" r="3.5" fill="url(#i1b)"/>
      <defs>
        <linearGradient id="i1a" x1="4" y1="4" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFD700"/><stop offset="1" stopColor="#B8860B"/>
        </linearGradient>
        <linearGradient id="i1b" x1="22" y1="22" x2="30" y2="30" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFD700"/><stop offset="1" stopColor="#B8860B"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

function IconCommunity() {
  return (
    <svg width="44" height="44" viewBox="0 0 52 52" fill="none">
      <circle cx="26" cy="26" r="24.5" stroke="url(#i2a)" strokeWidth="1.2"/>
      <circle cx="26" cy="26" r="4" stroke="url(#i2a)" strokeWidth="1.5" fill="none"/>
      <circle cx="14" cy="20" r="3" stroke="url(#i2a)" strokeWidth="1.2" fill="none"/>
      <circle cx="38" cy="20" r="3" stroke="url(#i2a)" strokeWidth="1.2" fill="none"/>
      <circle cx="14" cy="32" r="3" stroke="url(#i2a)" strokeWidth="1.2" fill="none"/>
      <circle cx="38" cy="32" r="3" stroke="url(#i2a)" strokeWidth="1.2" fill="none"/>
      <line x1="26" y1="22.2" x2="14" y2="22.8" stroke="url(#i2a)" strokeWidth="1.1" strokeLinecap="round"/>
      <line x1="26" y1="22.2" x2="38" y2="22.8" stroke="url(#i2a)" strokeWidth="1.1" strokeLinecap="round"/>
      <line x1="26" y1="29.8" x2="14" y2="29.2" stroke="url(#i2a)" strokeWidth="1.1" strokeLinecap="round"/>
      <line x1="26" y1="29.8" x2="38" y2="29.2" stroke="url(#i2a)" strokeWidth="1.1" strokeLinecap="round"/>
      <line x1="14" y1="23" x2="14" y2="29" stroke="url(#i2a)" strokeWidth="1.1" strokeLinecap="round"/>
      <line x1="38" y1="23" x2="38" y2="29" stroke="url(#i2a)" strokeWidth="1.1" strokeLinecap="round"/>
      <defs>
        <linearGradient id="i2a" x1="4" y1="4" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFD700"/><stop offset="1" stopColor="#B8860B"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

function IconEngineering() {
  return (
    <svg width="44" height="44" viewBox="0 0 52 52" fill="none">
      <circle cx="26" cy="26" r="24.5" stroke="url(#i3a)" strokeWidth="1.2"/>
      <path d="M26 12L31 34L26 30L21 34L26 12Z" stroke="url(#i3a)" strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
      <path d="M14 36h24" stroke="url(#i3a)" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 18l10 7" stroke="url(#i3a)" strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M40 18l-10 7" stroke="url(#i3a)" strokeWidth="1.3" strokeLinecap="round"/>
      <circle cx="26" cy="24" r="2.5" fill="url(#i3b)"/>
      <defs>
        <linearGradient id="i3a" x1="4" y1="4" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFD700"/><stop offset="1" stopColor="#B8860B"/>
        </linearGradient>
        <linearGradient id="i3b" x1="22" y1="20" x2="30" y2="30" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFD700"/><stop offset="1" stopColor="#B8860B"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

function IconLeadership() {
  return (
    <svg width="44" height="44" viewBox="0 0 52 52" fill="none">
      <circle cx="26" cy="26" r="24.5" stroke="url(#i4a)" strokeWidth="1.2"/>
      <path d="M13 22l5 7 8-12 8 12 5-7" stroke="url(#i4a)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path d="M14 30h24" stroke="url(#i4a)" strokeWidth="1.2" strokeLinecap="round"/>
      <rect x="18" y="32" width="16" height="3" rx="1" stroke="url(#i4a)" strokeWidth="1.2" fill="none"/>
      <path d="M22 35v3M30 35v3" stroke="url(#i4a)" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M19 38h14" stroke="url(#i4a)" strokeWidth="1.2" strokeLinecap="round"/>
      <circle cx="26" cy="20" r="2" fill="url(#i4a)"/>
      <circle cx="13" cy="22" r="1.8" fill="url(#i4a)"/>
      <circle cx="39" cy="22" r="1.8" fill="url(#i4a)"/>
      <defs>
        <linearGradient id="i4a" x1="4" y1="4" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFD700"/><stop offset="1" stopColor="#B8860B"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ── Feature data ── */
const features = [
  {
    id: "innovation",
    icon: <IconInnovation />,
    title: "INNOVATION",
    subtitle: "Forging New Frontiers\nin Tech & Beyond",
  },
  {
    id: "community",
    icon: <IconCommunity />,
    title: "COMMUNITY",
    subtitle: "A Fellowship of\nVisionaries and\nCreators",
  },
  {
    id: "engineering",
    icon: <IconEngineering />,
    title: "ENGINEERING\nEXCELLENCE",
    subtitle: "Mastering the Craft,\nBuilding Legacies",
  },
  {
    id: "leadership",
    icon: <IconLeadership />,
    title: "LEADERSHIP",
    subtitle: "Guiding the Path,\nInspiring the Future",
  },
];

const SUMMARY_TEXT = "From the divine forge of imagination, we sculpt digital realms and empower visionary builders. Join our celestial order, where the boundless curiosity of the Nibble Computer Society shapes the future, turning innovation into enduring legend.";

export default function AboutNibble() {
  const containerRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const summaryContainerRef = useRef<HTMLDivElement>(null);
  const summaryTextRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Divider & Header Sequence
      const tl = gsap.timeline({ 
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        }
      });

      tl.fromTo(dividerRef.current, 
          { scaleX: 0, opacity: 0 }, 
          { scaleX: 1, opacity: 1, duration: 1.5, ease: "power4.inOut" }
        )
        .fromTo(
          headerRef.current?.children || [],
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out" },
          "-=1.0"
        );

      // 2. Parallax background
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      }

      // 3. Scroll-locked Summary Word Reveal
      if (summaryTextRef.current && summaryContainerRef.current) {
        const words = summaryTextRef.current.querySelectorAll('.word-reveal');
        
        gsap.fromTo(words,
          { opacity: 0, y: 15, filter: 'blur(8px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            stagger: 0.1,
            ease: "sine.out",
            scrollTrigger: {
              trigger: summaryContainerRef.current,
              start: "top 60%",     // Pin when summary reaches upper center
              end: "+=500",         // Scrub length
              scrub: 1.5,
              pin: true,            // Lock section
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full min-h-screen bg-[#FAFAF8] text-[#111] overflow-hidden">
      
      {/* ── Background Parallax Image ── */}
      <div className="absolute inset-0 w-full h-[120%] -top-[10%] pointer-events-none z-0">
        <Image
          ref={bgRef}
          src="/aboutNibbleBackground.png"
          alt="Kingdom of Nibble Background"
          fill
          className="object-cover object-top opacity-80"
          priority
        />
        {/* Soft edge blending gradients to fade the image cleanly into standard white borders */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAFAF8] via-transparent to-[#FAFAF8] opacity-90" />
      </div>

      <div className="container-main relative z-10 flex flex-col items-center">
        
        {/* 1. DIVIDER TRANSITION (TOP) */}
        <div className="w-full flex justify-center pt-24 pb-8">
          <div 
            ref={dividerRef} 
            className="h-px w-3/4 max-w-2xl bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent shadow-[0_0_15px_rgba(212,175,55,0.8)] opacity-0 origin-center"
          />
        </div>

        {/* 2. HEADING BLOCK (CENTERED) */}
        <div ref={headerRef} className="flex flex-col items-center text-center px-4">
          <span className="inline-block mb-4 px-4 py-1 rounded-full text-[10px] md:text-xs tracking-[0.2em] uppercase font-sans text-[#B8860B] border border-[#D4AF37]/30 bg-white/40 backdrop-blur-sm shadow-sm">
            Official Technical Society · JSSATEN
          </span>

          <h1 className="m-0 font-serif text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.1] text-[#B8860B] drop-shadow-sm">
            The Kingdom of Nibble
          </h1>

          <p className="mt-4 font-serif text-[clamp(1rem,2vw,1.3rem)] font-medium text-black/70 tracking-[0.02em]">
            Where Builders Rise. Where Innovation Becomes Legacy.
          </p>
        </div>

        {/* 3. VISUAL CENTERPIECE SPACER */}
        {/* Forces vertical gap allowing the golden background temple to breathe, adding depth. */}
        <div className="w-full min-h-[max(25vh,200px)] pointer-events-none" />

        {/* 4. PORTRAITS ROW (HORIZONTAL SNAP SCROLL ON MOBILE) */}
        <div className="w-full py-4 flex flex-row overflow-x-auto snap-x snap-mandatory md:overflow-visible md:snap-none md:justify-center items-center gap-6 lg:gap-8 mb-20 z-20 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {features.map((feature, i) => (
            <div key={feature.id} className="snap-center shrink-0 w-[80vw] sm:w-[60vw] md:w-auto flex justify-center">
              <RoyalFeatureCard 
                icon={feature.icon} 
                title={feature.title} 
                subtitle={feature.subtitle} 
                index={i}
                ref={(el) => { cardsRef.current[i] = el; }}
              />
            </div>
          ))}
        </div>

        {/* 5. SCROLL-LOCKED SUMMARY */}
        <div ref={summaryContainerRef} className="w-full flex-col flex items-center justify-center min-h-[40vh] pb-32 px-4 z-20">
          <div className="max-w-4xl text-center">
            <p 
              ref={summaryTextRef}
              className="font-serif text-[clamp(1.2rem,2.8vw,2.2rem)] font-medium text-black/85 leading-relaxed tracking-wide drop-shadow-sm"
            >
              {SUMMARY_TEXT.split(' ').map((word, index) => (
                <span key={index} className="inline-block mr-[0.25em] word-reveal opacity-0 translate-y-4">
                  {word}
                </span>
              ))}
            </p>
          </div>
          
          {/* Action button beneath summary */}
          <div className="mt-16 opacity-0 word-reveal translate-y-4 transition-transform hover:scale-105 cursor-pointer">
            <RoyalAscendButton />
          </div>
        </div>

      </div>
    </section>
  );
}
