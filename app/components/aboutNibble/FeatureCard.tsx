import React, { useRef, useEffect } from "react";
import gsap from "gsap";

interface RoyalFeatureCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  index?: number;
}

const RoyalFeatureCard = React.forwardRef<HTMLDivElement, RoyalFeatureCardProps>(
  ({ icon, title, subtitle, index = 0 }, ref) => {
    const cardRef = useRef<HTMLDivElement | null>(null);

    // Sync external ref if provided
    useEffect(() => {
      if (typeof ref === "function") {
        ref(cardRef.current);
      } else if (ref) {
        ref.current = cardRef.current;
      }
    }, [ref]);

    useEffect(() => {
      if (!cardRef.current) return;

      // 1. Initial Staggered Entrance
      gsap.fromTo(
        cardRef.current,
        { y: 50, opacity: 0, scale: 0.95 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1, 
          duration: 1.2, 
          delay: index * 0.1, 
          ease: "power3.out" 
        }
      );

      // 2. God-Level Continuous Float (Very subtle)
      gsap.to(cardRef.current, {
        y: "-=8",
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
        className="group relative flex flex-col items-center justify-center w-full min-w-[240px] aspect-square sm:aspect-4/5 cursor-pointer opacity-0"
      >
        {/* ── Outer Golden Frame ── */}
        <div className="absolute inset-0 rounded-[12px] p-[1.5px] bg-linear-to-b from-[#FFD700]/60 via-[#D4AF37]/20 to-[#FFFAF0]/40 transition-all duration-700 ease-out group-hover:p-[2px] group-hover:scale-[1.03] group-hover:shadow-[0_15px_40px_rgba(212,175,55,0.2)]">
          
          {/* ── Inner Glass Core (White/Gold Theme) ── */}
          <div className="relative flex flex-col items-center justify-center w-full h-full p-4 sm:p-6 overflow-hidden bg-white/40 backdrop-blur-xl rounded-[10px] shadow-[inset_0_0_20px_rgba(255,255,255,0.5)] transition-all duration-700 group-hover:bg-white/60">
            
            {/* ── Delicate Inner pseudo-border ── */}
            <div className="absolute inset-2 border border-white/50 rounded-[4px] pointer-events-none transition-colors duration-500 group-hover:border-[#FFD700]/30" />

            {/* ── Hover Sweep Light ── */}
            <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/70 to-transparent skew-x-12 transition-transform duration-1000 ease-in-out group-hover:translate-x-full pointer-events-none" />

            {/* ════ CONTENT ════ */}
            <div className="relative z-10 flex flex-col items-center text-center transform transition-transform duration-500 group-hover:-translate-y-1">
              
              {/* Icon Container */}
              <div className="mb-4 transition-all duration-500 drop-shadow-[0_2px_8px_rgba(212,175,55,0.3)] group-hover:scale-110">
                {icon}
              </div>

              {/* Title */}
              <h3 className="m-0 font-serif text-[clamp(0.7rem,1vw,0.85rem)] font-bold tracking-[0.15em] text-[#B8860B] uppercase drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)] transition-colors duration-300 group-hover:text-[#8B6508]">
                {title}
              </h3>

              {/* Subtitle */}
              <p className="mt-3 font-sans text-[clamp(0.65rem,0.9vw,0.8rem)] font-medium text-black/60 leading-[1.6] tracking-[0.02em] whitespace-pre-line transition-colors duration-300 group-hover:text-black/80">
                {subtitle}
              </p>
            </div>

          </div>
        </div>
      </div>
    );
  }
);

RoyalFeatureCard.displayName = "RoyalFeatureCard";

export default RoyalFeatureCard;