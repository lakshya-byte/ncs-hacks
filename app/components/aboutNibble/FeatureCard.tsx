import React, { useRef, useEffect } from "react";
import gsap from "gsap";

/* ── Ornate Corner SVG ── */
// We use this to stamp the 4 corners of the frame
const RoyalCorner = ({ className }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    className={`absolute ${className}`}
  >
    <path
      d="M0 0H4V1H1V4H0V0Z"
      fill="url(#gold-gradient)"
    />
    <rect x="2" y="2" width="2" height="2" fill="#FFD700" fillOpacity="0.8" />
    <circle cx="8" cy="8" r="1" fill="#FFF5A0" />
    <defs>
      <linearGradient id="gold-gradient" x1="0" y1="0" x2="16" y2="16" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFD700" />
        <stop offset="1" stopColor="#B8860B" />
      </linearGradient>
    </defs>
  </svg>
);

export default function RoyalFeatureCard({ icon, title, subtitle, index = 0 }) {
  const cardRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    // 1. Initial Staggered Entrance
    gsap.fromTo(
      cardRef.current,
      { y: 50, opacity: 0, scale: 0.9, rotateX: 15 },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1, 
        rotateX: 0,
        duration: 1.2, 
        delay: index * 0.15, 
        ease: "power4.out" 
      }
    );

    // 2. God-Level Continuous Float
    // We offset the time based on the index so they don't all bob up and down at the exact same time
    gsap.to(cardRef.current, {
      y: "-=12",
      duration: 3 + (index * 0.2),
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
      delay: index * 0.1,
    });
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="group relative flex flex-col items-center justify-center w-full max-w-[260px] aspect-[4/5] perspective-[1200px] cursor-pointer"
    >
      {/* ── Outer Royal Frame (The Glow & Border Layer) ── */}
      <div className="absolute inset-0 rounded-[4px] p-[1px] bg-[linear-gradient(160deg,rgba(255,215,0,0.6)_0%,rgba(184,134,11,0.1)_50%,rgba(255,245,160,0.5)_100%)] transition-all duration-700 ease-out group-hover:p-[2px] group-hover:scale-105 group-hover:shadow-[0_0_40px_10px_rgba(255,215,0,0.2)]">
        
        {/* ── Inner Glass Core ── */}
        <div className="relative flex flex-col items-center justify-center w-full h-full p-6 overflow-hidden bg-black/40 backdrop-blur-2xl rounded-[3px] shadow-[inset_0_0_30px_rgba(184,134,11,0.15)] transition-all duration-700 group-hover:bg-black/20 group-hover:shadow-[inset_0_0_50px_rgba(255,215,0,0.3)]">
          
          {/* ── Ornate Corners ── */}
          <RoyalCorner className="top-2 left-2" />
          <RoyalCorner className="top-2 right-2 rotate-90" />
          <RoyalCorner className="bottom-2 right-2 rotate-180" />
          <RoyalCorner className="bottom-2 left-2 -rotate-90" />

          {/* ── Delicate Inner Wireframe ── */}
          <div className="absolute inset-3 border border-yellow-500/20 rounded-[2px] pointer-events-none transition-colors duration-500 group-hover:border-yellow-400/50" />

          {/* ── Hover Sweep Light ── */}
          <div className="absolute inset-0 -translate-x-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent)] skew-x-12 transition-transform duration-1000 ease-in-out group-hover:translate-x-full pointer-events-none" />

          {/* ── Radial Core Glow (Follows hover state) ── */}
          <div 
            ref={glowRef}
            className="absolute inset-0 opacity-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.2)_0%,transparent_70%)] transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"
          />

          {/* ════ CONTENT ════ */}
          <div className="relative z-10 flex flex-col items-center text-center transform transition-transform duration-500 group-hover:-translate-y-2">
            
            {/* Icon Container */}
            <div className="mb-5 transition-all duration-500 filter drop-shadow-[0_0_8px_rgba(255,215,0,0.4)] group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] group-hover:scale-110">
              {icon}
            </div>

            {/* Title */}
            <h3 className="m-0 font-['Cinzel',serif] text-[clamp(0.7rem,1vw,0.85rem)] font-bold tracking-[0.18em] text-[#E8C84E] uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] transition-colors duration-300 group-hover:text-[#FFF5A0] group-hover:drop-shadow-[0_0_10px_rgba(255,215,0,0.6)]">
              {title}
            </h3>

            {/* Royal Separator */}
            <div className="relative flex items-center justify-center w-16 h-4 my-2 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-full h-[1px] bg-[linear-gradient(90deg,transparent,rgba(255,215,0,0.8),transparent)]" />
              <div className="absolute w-1.5 h-1.5 rotate-45 bg-[#FFD700] shadow-[0_0_5px_#FFD700]" />
            </div>

            {/* Subtitle */}
            <p className="m-0 font-['Inter',sans-serif] text-[clamp(0.65rem,0.9vw,0.8rem)] font-light text-white/70 leading-[1.6] tracking-[0.02em] whitespace-pre-line transition-colors duration-300 group-hover:text-white">
              {subtitle}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}