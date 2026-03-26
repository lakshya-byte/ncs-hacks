import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RoyalFeatureCard from "./FeatureCard";
import RoyalAscendButton from "./Button";

gsap.registerPlugin(ScrollTrigger);

// import bgImage from "figma:asset/f30b2a212197842fda59b7702800fb53d7c174eb.png"; // Keep your existing import path

import Image from "next/image";

/* ── SVG Icons ── */
function IconInnovation() {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      <circle cx="26" cy="26" r="24.5" stroke="url(#i1a)" strokeWidth="1.2"/>
      <circle cx="26" cy="26" r="8" stroke="url(#i1a)" strokeWidth="1.5" fill="none"/>
      <path d="M26 13v4M26 35v4M13 26h4M35 26h4" stroke="url(#i1a)" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M17.1 17.1l2.8 2.8M32.1 32.1l2.8 2.8M17.1 34.9l2.8-2.8M32.1 19.9l2.8-2.8" stroke="url(#i1a)" strokeWidth="1.2" strokeLinecap="round"/>
      <circle cx="26" cy="26" r="3.5" fill="url(#i1b)"/>
      <defs>
        <linearGradient id="i1a" x1="4" y1="4" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFD700"/><stop offset="1" stopColor="#FFF5A0"/>
        </linearGradient>
        <linearGradient id="i1b" x1="22" y1="22" x2="30" y2="30" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFD700"/><stop offset="1" stopColor="#FFFBE0"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

function IconCommunity() {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
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
          <stop stopColor="#FFD700"/><stop offset="1" stopColor="#FFF5A0"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

function IconEngineering() {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      <circle cx="26" cy="26" r="24.5" stroke="url(#i3a)" strokeWidth="1.2"/>
      <path d="M26 12L31 34L26 30L21 34L26 12Z" stroke="url(#i3a)" strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
      <path d="M14 36h24" stroke="url(#i3a)" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 18l10 7" stroke="url(#i3a)" strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M40 18l-10 7" stroke="url(#i3a)" strokeWidth="1.3" strokeLinecap="round"/>
      <circle cx="26" cy="24" r="2.5" fill="url(#i3b)"/>
      <defs>
        <linearGradient id="i3a" x1="4" y1="4" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFD700"/><stop offset="1" stopColor="#FFF5A0"/>
        </linearGradient>
        <linearGradient id="i3b" x1="22" y1="20" x2="30" y2="30" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFD700"/><stop offset="1" stopColor="#FFFBE0"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

function IconLeadership() {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
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
          <stop stopColor="#FFD700"/><stop offset="1" stopColor="#FFF5A0"/>
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

export default function AboutNibble() {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const btnRef = useRef<HTMLDivElement>(null);
  const rayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !headerRef.current || !btnRef.current || !rayRef.current) return;

    // Reveal Timeline
    const tl = gsap.timeline({ 
      defaults: { ease: "power3.out" },
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      }
    });

    // Fade in text elements
    tl.fromTo(
      headerRef.current.children,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.15 }
    )
    // Spring up cards
    .fromTo(
      cardsRef.current.filter(Boolean),
      { y: 40, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.1, ease: "back.out(1.4)" },
      "-=0.5"
    )
    // Fade in CTA
    .fromTo(
      btnRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      "-=0.4"
    );

    // Continuous floating animation for cards
    cardsRef.current.filter(Boolean).forEach((card, i) => {
      if (!card) return;
      // Alternate rotation for organic feel
      const rot = i % 2 === 0 ? -1.5 : 1.5; 
      gsap.to(card, {
        y: -14,
        rotation: rot,
        duration: 3 + i * 0.3,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        delay: i * 0.15,
      });
    });

    // Pulsing background ray
    gsap.to(rayRef.current, {
      opacity: 0.85,
      duration: 3,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });
  }, []);

  return (
    <section ref={containerRef} className="relative w-full min-h-screen overflow-hidden bg-black selection:bg-yellow-500/30 selection:text-yellow-100">
      
      {/* ── Background Elements ── */}
      <Image
        src="/aboutNibbleBackground.png"
        alt="Kingdom of Nibble"
        fill
        className="object-cover object-top opacity-90"
        loading="lazy"
      />

      {/* Top radial glow */}
      <div
        ref={rayRef}
        className="absolute top-0 left-1/2 z-10 w-4/5 h-3/5 -translate-x-1/2 pointer-events-none opacity-50 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,240,160,0.35)_0%,rgba(255,220,80,0.10)_50%,transparent_72%)]"
      />

      {/* Bottom mist */}
      <div className="absolute bottom-0 left-0 right-0 z-10 h-1/3 pointer-events-none bg-[linear-gradient(to_top,rgba(240,230,195,0.50)_0%,transparent_100%)]" />

      {/* Edge vignette */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_42%,rgba(160,140,90,0.22)_100%)]" />

      {/* ════ CONTENT ════ */}
      <div className="relative z-20 flex flex-col items-center min-h-screen px-6 pb-14">
        
        {/* ── Heading block ── */}
        <div ref={headerRef} className="flex flex-col items-center max-w-3xl pt-10 text-center md:pt-16">
          
          {/* Badge */}
          <span className="inline-block mb-4 px-5 py-1.5 rounded-full text-[10px] md:text-xs tracking-[0.18em] uppercase font-['Cinzel',serif] text-[#c8a84b] bg-yellow-400/10 border border-[#c8a84b]/40 backdrop-blur-md shadow-[0_0_15px_rgba(255,215,0,0.1)]">
            Official Technical Society · JSSATEN
          </span>

          {/* Main title */}
          <h1 className="m-0 font-['Cinzel',serif] text-[clamp(2.4rem,6vw,5rem)] font-semibold leading-[1.1] tracking-[0.02em] bg-[linear-gradient(160deg,#fffde0_0%,#FFD700_38%,#ffe88a_62%,#fdfcf7_100%)] bg-clip-text text-transparent drop-shadow-[0_2px_24px_rgba(180,140,30,0.50)]">
            The Kingdom of Nibble
          </h1>

          {/* Divider */}
          <div className="my-5 w-48 h-px bg-[linear-gradient(90deg,transparent,rgba(255,215,0,0.65),transparent)]" />

          {/* Subheading */}
          <p className="m-0 font-['Cinzel',serif] text-[clamp(0.85rem,1.8vw,1.25rem)] font-medium text-[#f0e4b8] tracking-[0.06em] leading-relaxed drop-shadow-[0_2px_14px_rgba(140,100,10,0.45)]">
            Where Builders Rise. Where Innovation Becomes Legacy.
          </p>

          {/* Description */}
          <p className="mt-5 max-w-xl font-['Inter',sans-serif] text-[clamp(0.75rem,1.2vw,0.92rem)] font-light text-[#fdfcf7]/80 leading-[1.8] tracking-[0.015em] drop-shadow-[0_1px_8px_rgba(60,40,0,0.28)]">
            From the divine forge of imagination, the Nibble Computer Society sculpts
            digital realms and empowers visionary builders. We are the celestial order
            of JSSATEN — turning curiosity into craft, and innovation into enduring legend.
          </p>
        </div>

        {/* Spacer to show floating temple background */}
        <div className="flex-1 min-h-[clamp(160px,20vh,280px)] w-full" />

        {/* ── Feature Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <RoyalFeatureCard 
              key={feature.id} 
              icon={feature.icon} 
              title={feature.title} 
              subtitle={feature.subtitle} 
              index={i}
              ref={(el) => { cardsRef.current[i] = el; }}
            />
          ))}
        </div>

        {/* ── CTA Button ── */}
        <div ref={btnRef} className="mt-12">
          <RoyalAscendButton />
        </div>

      </div>
    </section>
  );
}