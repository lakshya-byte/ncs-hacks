'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TAGS = ['INNOVATION', 'COMMUNITY', 'ENGINEERING', 'LEADERSHIP'];

const REVEAL_LINES = [
  'From the divine forge of imagination, we shape bold digital realms with calm precision.',
  'Every idea is refined through craft, collaboration, and fearless experimentation.',
  'Welcome to the Kingdom of Nibble — where builders rise and innovation becomes legacy.',
];

export default function KingdomOfNibble() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const textLinesRef = useRef<(HTMLParagraphElement | null)[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Background Parallax (Subtle upward drift on scroll)
      gsap.to(bgRef.current, {
        y: '-15%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      // 2. Header Reveal
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 80%' }
        }
      );

      // 3. Central Visual (Scrubbed Scale + Brightness)
      // As user scrolls, the artifact scales up and glows brighter
      gsap.fromTo(
        visualRef.current,
        { scale: 0.95, filter: 'brightness(0.8)' },
        {
          scale: 1.05, filter: 'brightness(1.2)', ease: 'none',
          scrollTrigger: {
            trigger: visualRef.current,
            start: 'top 75%',
            end: 'bottom 40%',
            scrub: 1, // Smooth scrub
          }
        }
      );

      // 4. Tags Stagger Reveal
      gsap.fromTo(
        '.nibble-tag',
        { opacity: 0, x: -20 },
        {
          opacity: 1, x: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: tagsRef.current, start: 'top 85%' }
        }
      );

      // 5. Cinematic Text Materialization
      textLinesRef.current.forEach((line, index) => {
        if (!line) return;
        gsap.fromTo(
          line,
          { opacity: 0, y: 40, filter: 'blur(8px)' },
          {
            opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.5, ease: 'power3.out',
            scrollTrigger: {
              trigger: line,
              start: 'top 90%', // Triggers just as it enters
            }
          }
        );
      });

      // 6. CTA Fade + Up
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2,
          scrollTrigger: { trigger: ctaRef.current, start: 'top 95%' }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#FAFAF8] text-slate-900 py-32 md:py-48 font-body"
    >
      {/* ════ CUSTOM CSS FOR CONTINUOUS "ALIVE" MOTION ════ */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes divineFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(0.5deg); }
        }
        @keyframes divinePulse {
          0%, 100% { box-shadow: 0 0 30px rgba(212,175,55,0.2), inset 0 0 20px rgba(212,175,55,0.1); }
          50% { box-shadow: 0 0 60px rgba(212,175,55,0.4), inset 0 0 40px rgba(212,175,55,0.2); }
        }
        .animate-divine-float { animation: divineFloat 6s ease-in-out infinite; }
        .animate-divine-pulse { animation: divinePulse 4s ease-in-out infinite; }
      `}} />

      {/* ════ LAYERED BACKGROUND DEPTH ════ */}
      <div ref={bgRef} className="absolute inset-0 w-full h-[120%] pointer-events-none -z-10">
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-[radial-gradient(circle,rgba(212,175,55,0.08)_0%,transparent_70%)] rounded-full blur-2xl" />
        <div className="absolute bottom-[20%] left-[-10%] w-[50vw] h-[50vw] bg-[radial-gradient(circle,rgba(255,215,0,0.05)_0%,transparent_60%)] rounded-full blur-3xl" />
        <div className="absolute top-[30%] right-[-10%] w-[60vw] h-[60vw] bg-[radial-gradient(circle,rgba(212,175,55,0.04)_0%,transparent_60%)] rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.03] mix-blend-multiply" />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10 flex flex-col items-center">
        
        {/* ════ 1. TOP: HEADER BLOCK ════ */}
        <div ref={headerRef} className="flex flex-col items-center text-center w-full mb-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-white/60 backdrop-blur-md px-5 py-1.5 text-[10px] md:text-xs font-bold tracking-[0.25em] text-[#B8860B] uppercase shadow-[0_4px_15px_rgba(212,175,55,0.1)] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700] animate-pulse" />
            Official Technical Society
          </span>
          <h2 className="font-heading text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.1] font-medium tracking-[0.1em] text-slate-900 uppercase drop-shadow-[0_2px_10px_rgba(212,175,55,0.2)]">
            The Kingdom<br />Of Nibble
          </h2>
          <p className="mt-6 max-w-2xl text-[clamp(1rem,2vw,1.25rem)] leading-relaxed tracking-wide text-slate-600 font-light">
            A divine ground for dreamers, makers, and engineers to craft what comes next.
          </p>
        </div>

        {/* ════ 2. MIDDLE: THE ALIVE CENTRAL VISUAL ════ */}
        {/* The wrapper handles the GSAP scrub (scale), the inner handles the CSS continuous float */}
        <div className="w-full flex justify-center mb-16 perspective-[1000px]">
          <div ref={visualRef} className="relative w-full max-w-[600px] aspect-[16/9] md:aspect-[21/9] will-change-transform">
            <div className="absolute inset-0 rounded-[2rem] border border-[#D4AF37]/50 bg-white/60 backdrop-blur-md animate-divine-pulse animate-divine-float overflow-hidden flex items-center justify-center group gpu-accelerate">
              
              {/* Image / Graphic */}
              <Image
                src="/aboutNibbleBackground.png"
                alt="Divine structure of the Kingdom of Nibble"
                fill
                className="object-cover object-center opacity-60 mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-1000"
              />
              
              {/* Glass Glare Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-white/50 to-transparent opacity-50" />
              
              {/* Central Core Artifact */}
              <div className="absolute w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-[#D4AF37]/60 bg-gradient-to-br from-[#FFFDF5] to-[#FDFBF2] shadow-[0_0_40px_rgba(255,215,0,0.4)] flex items-center justify-center backdrop-blur-md">
                <span className="font-heading text-3xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#FFD700] to-[#B8860B] drop-shadow-[0_2px_4px_rgba(212,175,55,0.6)]">
                  ✦
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ════ 3. TAGS ROW ════ */}
        <div ref={tagsRef} className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-24 w-full max-w-3xl">
          {TAGS.map((tag, index) => (
            <span
              key={tag}
              className="nibble-tag inline-flex items-center justify-center rounded-full border border-[#D4AF37]/30 bg-white/60 backdrop-blur-sm px-6 py-2.5 text-[10px] md:text-xs font-bold tracking-[0.2em] text-[#B8860B] uppercase shadow-sm hover:bg-[#FFD700] hover:text-white hover:border-[#FFD700] hover:shadow-[0_5px_15px_rgba(255,215,0,0.3)] transition-all duration-300 cursor-default"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* ════ 4. BELOW: MATERIALIZING TEXT LORE ════ */}
        <div className="flex flex-col items-center justify-center max-w-2xl w-full text-center space-y-8 mb-20">
          {REVEAL_LINES.map((line, index) => (
            <p
              key={index}
              ref={(el) => { textLinesRef.current[index] = el; }}
              className="font-heading text-[clamp(1.1rem,2.5vw,1.5rem)] leading-relaxed tracking-wide text-slate-800 will-change-[opacity,transform,filter]"
            >
              {line}
            </p>
          ))}
        </div>

        {/* ════ 5. BOTTOM: CALL TO ACTION ════ */}
        <div ref={ctaRef} className="flex justify-center mt-8 pb-10">
          <a
            href="#tracks"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-slate-900 px-10 py-4 font-body text-xs md:text-sm font-bold tracking-[0.2em] text-[#F0E6D2] uppercase transition-transform duration-300 hover:scale-105 hover:shadow-[0_10px_30px_rgba(212,175,55,0.3)]"
          >
            {/* Button Glare Effect */}
            <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-150%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(150%)]">
              <div className="relative h-full w-8 bg-white/20" />
            </div>
            <span className="relative z-10 flex items-center gap-3">
              Ascend to the Kingdom
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </a>
        </div>

      </div>
    </section>
  );
}