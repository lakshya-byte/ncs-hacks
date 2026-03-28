'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CallToAction() {
  const containerRef = useRef<HTMLElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const runeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Setup initial states
      gsap.set([lightRef.current, headlineRef.current, subtextRef.current, buttonRef.current, runeRef.current], { 
        opacity: 0 
      });
      gsap.set(headlineRef.current, { scale: 0.9, y: 30 });
      gsap.set(subtextRef.current, { y: 20 });
      gsap.set(buttonRef.current, { y: 20, scale: 0.95 });
      gsap.set(runeRef.current, { y: -20, scale: 0.8 });

      // Create sequence
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%', // Trigger when the CTA is in view
          end: 'bottom bottom',
          toggleActions: 'play none none reverse',
        }
      });

      tl.to(lightRef.current, {
        opacity: 1,
        duration: 2,
        ease: 'power2.inOut'
      })
      .to(runeRef.current, {
        opacity: 0.8,
        y: 0,
        scale: 1,
        duration: 1.5,
        ease: 'back.out(1.5)'
      }, '-=1.5')
      .to(headlineRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out'
      }, '-=1.2')
      .to(subtextRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out'
      }, '-=0.8')
      .to(buttonRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'back.out(1.7)'
      }, '-=0.6');

      // Continuous slow rotation and pulse for the rune
      gsap.to(runeRef.current, {
        rotation: 360,
        duration: 40,
        repeat: -1,
        ease: 'linear'
      });
      
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-[#05080f] text-white"
    >
      {/* ── BACKGROUND LAYER ── */}
      {/* Ambient background glow (radial light) */}
      <div 
        ref={lightRef}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] max-w-[1200px] max-h-[1200px] bg-[radial-gradient(circle,rgba(212,175,55,0.15)_0%,rgba(212,175,55,0.05)_30%,transparent_70%)] mix-blend-screen" />
        
        {/* Soft clouds */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 mix-blend-screen" />
        
        {/* Divine Light Rays */}
        <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05)_0%,transparent_50%)] animate-[spin_60s_linear_infinite]" />
      </div>

      {/* ── CONTENT CONTAINER ── */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 site-container pointer-events-auto">
        
        {/* Optional Floating Rune / Symbol */}
        <div 
          ref={runeRef}
          className="mb-8 w-16 h-16 rounded-full border border-[#D4AF37]/30 flex items-center justify-center bg-[#D4AF37]/5 backdrop-blur-sm shadow-[0_0_30px_rgba(212,175,55,0.2)]"
        >
          {/* Elder Futhark Algiz (Protection/Ascension) */}
          <span className="font-serif text-2xl text-[#f5d980] drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]">ᛉ</span>
        </div>

        {/* Main Headline */}
        <h2 
          ref={headlineRef}
          className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-[0.15em] uppercase mb-6"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-[#f5d980] to-[#c9a227] drop-shadow-[0_2px_20px_rgba(212,175,55,0.3)]">
            The Realm Awaits
          </span>
        </h2>

        {/* Subtext */}
        <p 
          ref={subtextRef}
          className="font-sans text-lg md:text-xl text-[#F0E6D2] font-light tracking-[0.2em] uppercase max-w-2xl mb-12 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
        >
          Only those who dare to build will ascend.
        </p>

        {/* CTA Button */}
        <a 
          ref={buttonRef}
          href="#register"
          className="group relative inline-flex items-center justify-center px-10 py-5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#f5d980] to-[#D4AF37] text-[#0A0F1C] font-serif font-bold text-sm md:text-base tracking-[0.3em] uppercase overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(212,175,55,0.6)] cursor-pointer"
        >
          {/* Light sweep effect on hover */}
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-[150%] skew-x-[-15deg] group-hover:animate-[ctaSweep_1.5s_ease-in-out_infinite]" />
          
          <span className="relative z-10 font-bold">
            Enter the Hackathon
          </span>
        </a>

      </div>

      {/* Subtle bottom gradient to blend seamlessly if another section is below or it's the end */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#05080f] to-transparent pointer-events-none" />
    </section>
  );
}
