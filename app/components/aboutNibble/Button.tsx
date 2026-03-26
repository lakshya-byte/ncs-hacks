import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface RoyalAscendButtonProps {
  onClick?: () => void;
}

export default function RoyalAscendButton({ onClick }: RoyalAscendButtonProps) {
  const btnContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!btnContainerRef.current) return;
    
    // Majestic entrance animation
    gsap.fromTo(
      btnContainerRef.current,
      { y: 30, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.5,
        delay: 0.8, // Waits for the cards to stagger in
        ease: "elastic.out(1, 0.7)",
      }
    );
  }, []);

  return (
    <div ref={btnContainerRef} className="relative group w-fit mx-auto mt-12 cursor-pointer">
      
      {/* ── Ambient Core Glow (Pulses and expands on hover) ── */}
      <div className="absolute -inset-1 bg-[linear-gradient(90deg,#B8860B,#FFD700,#B8860B)] rounded-sm blur-md opacity-30 group-hover:opacity-70 group-hover:blur-xl transition-all duration-700 animate-pulse" />

      {/* ── The Physical Button ── */}
      <button
        onClick={onClick}
        className="relative flex items-center justify-center gap-4 px-10 py-4 bg-[#0a0a0a]/80 backdrop-blur-xl border border-[#FFD700]/30 overflow-hidden transition-all duration-500 active:scale-95 group-hover:border-[#FFD700]/80 group-hover:bg-[#1a1500]/90 group-hover:shadow-[inset_0_0_30px_rgba(255,215,0,0.2)]"
      >
        
        {/* ── Corner Accents ── */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#FFD700] transition-all duration-300 group-hover:w-4 group-hover:h-4 group-hover:border-[2px]" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#FFD700] transition-all duration-300 group-hover:w-4 group-hover:h-4 group-hover:border-[2px]" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#FFD700] transition-all duration-300 group-hover:w-4 group-hover:h-4 group-hover:border-[2px]" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#FFD700] transition-all duration-300 group-hover:w-4 group-hover:h-4 group-hover:border-[2px]" />

        {/* ── Glass Reflection Sweep ── */}
        <div className="absolute inset-0 -translate-x-[150%] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)] skew-x-[25deg] transition-transform duration-1000 ease-in-out group-hover:translate-x-[150%] pointer-events-none" />

        {/* ── Left Diamond Filigree ── */}
        <div className="w-1.5 h-1.5 rotate-45 bg-[#FFD700]/50 shadow-[0_0_8px_rgba(255,215,0,0.8)] transition-all duration-300 group-hover:bg-[#FFF5A0] group-hover:shadow-[0_0_15px_rgba(255,255,255,0.8)]" />

        {/* ── Text ── */}
        <span className="relative z-10 font-['Cinzel',serif] text-[clamp(0.7rem,1.2vw,0.85rem)] font-bold text-[#E8C84E] uppercase tracking-[0.2em] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] transition-all duration-500 group-hover:text-[#FFF5A0] group-hover:tracking-[0.28em] group-hover:drop-shadow-[0_0_12px_rgba(255,215,0,0.8)]">
          Ascend to the Kingdom
        </span>

        {/* ── Right Diamond Filigree ── */}
        <div className="w-1.5 h-1.5 rotate-45 bg-[#FFD700]/50 shadow-[0_0_8px_rgba(255,215,0,0.8)] transition-all duration-300 group-hover:bg-[#FFF5A0] group-hover:shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
      </button>

      {/* ── Top/Bottom Frame Flares ── */}
      <div className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-1/3 h-[1px] bg-[linear-gradient(90deg,transparent,#FFD700,transparent)] opacity-50 group-hover:opacity-100 group-hover:w-2/3 transition-all duration-500" />
      <div className="absolute -bottom-[1px] left-1/2 -translate-x-1/2 w-1/3 h-[1px] bg-[linear-gradient(90deg,transparent,#FFD700,transparent)] opacity-50 group-hover:opacity-100 group-hover:w-2/3 transition-all duration-500" />
    </div>
  );
}