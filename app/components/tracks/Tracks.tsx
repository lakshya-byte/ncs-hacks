"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const tracks = [
  {
    id: "01",
    title: "AI / Machine Learning",
    description:
      "The All-Seeing Mind. Harness the omniscient power of artificial intelligence, akin to the watchful gaze of the divine. Forge algorithms that perceive the unseen and predict the future.",
    bgGradient: "from-[#FAFAF8] to-[#F3F0E6]",
  },
  {
    id: "02",
    title: "Web / Platforms",
    description:
      "Construct the digital realms of tomorrow. Build robust, scalable, and divine architectures that seamlessly connect the world through glowing networks.",
    bgGradient: "from-[#FDFBF7] to-[#EAE6DB]",
  },
  {
    id: "03",
    title: "Blockchain",
    description:
      "Weave trust into the digital fabric. Create immutable decentralized systems and smart contracts that stand the test of time like ancient, unbreakable runes.",
    bgGradient: "from-[#FAFAF8] to-[#F5F5F0]",
  },
  {
    id: "04",
    title: "IoT / Robotics",
    description:
      "Breathe life into the inanimate. Bridge the celestial gap between hardware and software to animate a seamlessly connected, brilliant physical world.",
    bgGradient: "from-[#F9F8F5] to-[#EBE8E0]",
  },
  {
    id: "05",
    title: "Cybersecurity",
    description:
      "Become the guardians of the vault. Design impenetrable digital shields and defensive algorithms to protect sacred realms against chaotic forces.",
    bgGradient: "from-[#FAFAF8] to-[#EAEAEA]",
  },
  {
    id: "06",
    title: "Sustainability",
    description:
      "Architect a greener eternity. Develop innovative technology honoring the balance of nature to sustain our beautiful world for eras to come.",
    bgGradient: "from-[#F8F9F5] to-[#E6EBE0]",
  },
];

export default function HackathonTracks() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=500%",
        pin: true,
        scrub: true,
        onUpdate: (self) => {
          const index = Math.min(5, Math.floor(self.progress * 6));
          setActiveIndex((prev) => (prev !== index ? index : prev));
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const active = tracks[activeIndex];

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-[#FAFAF8]"
    >
      {/* Background Gradients crossfade */}
      {tracks.map((track, idx) => (
        <div
          key={`bg-${idx}`}
          className={`absolute inset-0 w-full h-full bg-gradient-to-br ${track.bgGradient} transition-opacity duration-1000 ease-in-out ${
            idx === activeIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Volumetric glow overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(212,175,55,0.08)_0%,transparent_60%)] pointer-events-none" />

      {/* ══ MAIN LAYOUT — Standard centred container with two columns ══ */}
      <div className="relative z-10 w-full h-full flex items-center">
        <div className="site-container relative h-full flex items-center">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* LEFT: Text — normal document flow, no absolute */}
            <div className="flex flex-col">
            <span
              className="font-serif leading-none text-transparent select-none"
              style={{
                WebkitTextStroke: "1px rgba(212, 175, 55, 0.3)",
                fontSize: "clamp(4rem, 8vw, 7rem)",
              }}
            >
              {active.id}
            </span>

            <h2
              className="mt-2 font-serif font-medium leading-[1.1] tracking-tight text-[#B8860B] drop-shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all duration-700"
              style={{ fontSize: "clamp(2rem, 4vw, 4rem)" }}
            >
              {active.title}
            </h2>

            <p className="mt-7 font-sans text-base leading-relaxed text-slate-500 max-w-md font-light tracking-wide transition-all duration-700">
              {active.description}
            </p>
          </div>

          {/* RIGHT: Visual */}
          <div className="flex items-center justify-center h-full">
            <div className="relative w-full max-w-[420px] aspect-square">
              {tracks.map((track, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <div
                    key={`visual-${idx}`}
                    className={`absolute inset-0 transition-all duration-[900ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
                      isActive
                        ? "opacity-100 scale-100 blur-none rotate-0"
                        : idx < activeIndex
                          ? "opacity-0 scale-105 blur-xl rotate-2"
                          : "opacity-0 scale-95 blur-xl -rotate-2"
                    }`}
                  >
                    <div className="w-full h-full rounded-[2.5rem] border border-[#FFD700]/30 bg-gradient-to-br from-white/60 to-white/10 backdrop-blur-xl shadow-[0_20px_70px_rgba(212,175,55,0.15)] flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,215,0,0.2),transparent_60%)] pointer-events-none" />
                      <div className="absolute inset-6 rounded-3xl overflow-hidden border border-[#FFD700]/20 flex items-center justify-center bg-white/30 backdrop-blur-md">
                        <p className="font-sans text-xs tracking-[0.3em] uppercase text-[#B8860B]/70 text-center px-6 leading-loose">
                          [ Image Slot ]<br />
                          <span className="text-[9px] mt-3 block opacity-60">
                            Insert {track.title} image here
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 z-50">
        {tracks.map((_, idx) => (
          <div
            key={`dot-${idx}`}
            className={`w-[2px] transition-all duration-500 ease-out rounded-full ${
              idx === activeIndex
                ? "h-12 bg-gradient-to-b from-[#D4AF37] to-[#B8860B] shadow-[0_0_10px_rgba(212,175,55,0.5)]"
                : "h-4 bg-slate-300/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
