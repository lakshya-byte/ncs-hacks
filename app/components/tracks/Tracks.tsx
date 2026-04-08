"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Track {
  id: string;
  realm: string;
  trackCode: string; // Internal metadata for cinematic depth
  trackName: string;
  title: string;
  tagline: string;
  description: string;
  bgGradient: string;
  image: string;
}

const tracks: Track[] = [
  {
    id: "01",
    realm: "Realm I — The Watch of Heimdall",
    trackCode: "V-SYST-01",
    trackName: "INFILTRATE",
    title: "Cybersecurity",
    tagline: "They built the wall. You find the door.",
    description:
      "This track focuses on staying ahead of threats, finding weaknesses before they become breaches. Like Heimdall — stay alert before things go wrong.",
    bgGradient: "from-[#080808] to-[#111111]",
    image: "/tracks/CyberSecuirty.png",
  },
  {
    id: "02",
    realm: "Realm II — The Sacrifice of Odin",
    trackCode: "V-INTE-02",
    trackName: "COGNIFY",
    title: "AI & Automation",
    tagline: "Stop automating tasks. Start replacing limits.",
    description:
      "This track focuses on building intelligent systems that don't just automate, but evolve. Build systems that think, adapt, and operate with precision beyond limits.",
    bgGradient: "from-[#0A0A0A] to-[#121212]",
    image: "/tracks/AIML.png",
  },
  {
    id: "03",
    realm: "Realm III — The Bonds of Forseti",
    trackCode: "V-DATA-03",
    trackName: "VERITAS",
    title: "Crypto & Blockchain",
    tagline: "Eliminate the noise. What remains is truth.",
    description:
      "This track focuses on trust through technology. If the system is strong, trust follows.",
    bgGradient: "from-[#080808] to-[#111111]",
    image: "/tracks/Blockchain.png",
  },
  {
    id: "04",
    realm: "Realm IV — The Bifrost Network",
    trackCode: "V-PHYS-04",
    trackName: "ACTIVATE",
    title: "IoT & Robotics",
    tagline: "Wire it. Program it. Unleash it.",
    description:
      "This track focuses on building systems that connect the physical world with the digital world — like Bifrost does.",
    bgGradient: "from-[#090909] to-[#141414]",
    image: "/tracks/IOT.png",
  },
  {
    id: "05",
    realm: "Realm V — The Unwritten Rune",
    trackCode: "V-VOID-05",
    trackName: "UNCHARTED",
    title: "Open Innovation",
    tagline: "No brief. No ceiling. No permission needed.",
    description:
      "In Norse myths, runes represent hidden knowledge — not everything is known yet. Some ideas don't follow rules — they create new ones.",
    bgGradient: "from-[#0A0A0A] to-[#131313]",
    image: "/tracks/OpenInnovation.png",
  },
];

const lightRays = [
  { left: "12%", width: "28%", rotate: -20, duration: 42, delay: -8 },
  { left: "38%", width: "24%", rotate: -12, duration: 48, delay: -18 },
  { left: "66%", width: "30%", rotate: -24, duration: 46, delay: -28 },
];

const cloudFields = [
  { top: "10%", width: "62%", duration: 70, delay: -16 },
  { top: "44%", width: "54%", duration: 82, delay: -36 },
  { top: "68%", width: "60%", duration: 76, delay: -52 },
];

const PARALLAX = {
  clouds: -14,
  rays: -26,
  particles: -38,
  gradient: -18,
};

const MOBILE_PARTICLE_OPACITY_FACTOR = 0.85;

const particles = [
  { left: "8%", top: "82%", size: 2, duration: 24, delay: -8, opacity: 0.3 },
  { left: "16%", top: "74%", size: 2, duration: 29, delay: -14, opacity: 0.36 },
  {
    left: "22%",
    top: "86%",
    size: 1.5,
    duration: 27,
    delay: -5,
    opacity: 0.24,
  },
  { left: "29%", top: "72%", size: 2, duration: 33, delay: -22, opacity: 0.32 },
  {
    left: "36%",
    top: "88%",
    size: 1.5,
    duration: 26,
    delay: -16,
    opacity: 0.22,
  },
  { left: "43%", top: "78%", size: 2, duration: 35, delay: -3, opacity: 0.35 },
  {
    left: "49%",
    top: "84%",
    size: 1.5,
    duration: 30,
    delay: -25,
    opacity: 0.26,
  },
  { left: "55%", top: "76%", size: 2, duration: 32, delay: -12, opacity: 0.3 },
  {
    left: "61%",
    top: "90%",
    size: 1.5,
    duration: 28,
    delay: -18,
    opacity: 0.24,
  },
  { left: "67%", top: "80%", size: 2, duration: 34, delay: -10, opacity: 0.33 },
  {
    left: "72%",
    top: "86%",
    size: 1.5,
    duration: 31,
    delay: -27,
    opacity: 0.22,
  },
  { left: "78%", top: "74%", size: 2, duration: 36, delay: -21, opacity: 0.32 },
  {
    left: "84%",
    top: "88%",
    size: 1.5,
    duration: 25,
    delay: -6,
    opacity: 0.25,
  },
  { left: "90%", top: "79%", size: 2, duration: 33, delay: -19, opacity: 0.34 },
];

export default function HackathonTracks() {
  const sectionRef = useRef<HTMLElement>(null);
  const cloudLayerRef = useRef<HTMLDivElement>(null);
  const raysLayerRef = useRef<HTMLDivElement>(null);
  const particlesLayerRef = useRef<HTMLDivElement>(null);
  const gradientMotionLayerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // We pin on ALL devices to maintain the premium sticky scroll experience
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=500%",
        pin: true,
        scrub: true,
        onUpdate: (self) => {
          const index = Math.min(4, Math.floor(self.progress * 5));
          const centeredProgress = self.progress - 0.5;
          if (cloudLayerRef.current) {
            gsap.set(cloudLayerRef.current, {
              y: centeredProgress * PARALLAX.clouds,
            });
          }
          if (raysLayerRef.current) {
            gsap.set(raysLayerRef.current, {
              y: centeredProgress * PARALLAX.rays,
            });
          }
          if (particlesLayerRef.current) {
            gsap.set(particlesLayerRef.current, {
              y: centeredProgress * PARALLAX.particles,
            });
          }
          if (gradientMotionLayerRef.current) {
            gsap.set(gradientMotionLayerRef.current, {
              y: centeredProgress * PARALLAX.gradient,
            });
          }
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
      className="relative h-[100dvh] w-full overflow-hidden bg-black"
    >
      {/* Background Gradients crossfade */}
      <div className="absolute inset-0 w-full h-full">
        {tracks.map((track, idx) => (
          <div
            key={`bg-${idx}`}
            className={`absolute inset-0 w-full h-full bg-gradient-to-br from-black/20 to-black/40 transition-opacity duration-1000 ease-in-out ${
              idx === activeIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* Atmospheric system: gradient motion, clouds, rays, particles */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_16%,rgba(212,175,55,0.08)_0%,rgba(8,7,6,0)_58%)] pointer-events-none" />

      <div
        ref={gradientMotionLayerRef}
        className="absolute inset-0 pointer-events-none will-change-transform"
      >
        <div className="absolute -inset-[18%] bg-[linear-gradient(112deg,rgba(212,175,55,0.08)_0%,rgba(255,255,255,0)_45%,rgba(255,248,228,0.2)_78%,rgba(255,255,255,0.05)_100%)] animate-[tracksGradientShift_50s_ease-in-out_infinite_alternate]" />
      </div>

      <div
        ref={cloudLayerRef}
        className="absolute inset-0 pointer-events-none hidden md:block will-change-transform"
      >
        {cloudFields.map((cloud, idx) => (
          <div
            key={`cloud-${idx}`}
            className="absolute -left-[18%] h-[20%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08)_0%,rgba(255,248,230,0.03)_48%,rgba(0,0,0,0)_100%)]"
            style={{
              top: cloud.top,
              width: cloud.width,
              animationName: "tracksCloudDrift",
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
              animationDuration: `${cloud.duration}s`,
              animationDelay: `${cloud.delay}s`,
            }}
          />
        ))}
      </div>

      <div
        ref={raysLayerRef}
        className="absolute inset-0 pointer-events-none will-change-transform"
      >
        {lightRays.map((ray, idx) => (
          <div
            key={`ray-${idx}`}
            className="absolute top-[-42%] h-[180%] rounded-[999px] bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(212,175,55,0.12)_40%,rgba(0,0,0,0.01)_72%,rgba(0,0,0,0)_100%)]"
            style={{
              left: ray.left,
              width: ray.width,
              transform: `rotate(${ray.rotate}deg)`,
              animationName: "tracksRayDrift, tracksRayBreath",
              animationTimingFunction: "ease-in-out, ease-in-out",
              animationIterationCount: "infinite, infinite",
              animationDirection: "alternate, normal",
              animationDuration: `${ray.duration}s, 14s`,
              animationDelay: `${ray.delay}s, ${ray.delay / 2}s`,
            }}
          />
        ))}
      </div>

      <div
        ref={particlesLayerRef}
        className="absolute inset-0 pointer-events-none will-change-transform"
      >
        <div className="absolute inset-0 md:hidden">
          {particles.slice(0, 8).map((particle, idx) => (
            <span
              key={`particle-mobile-${idx}`}
              className="absolute rounded-full bg-[#fff5d2] shadow-[0_0_8px_rgba(212,175,55,0.2)]"
              style={{
                left: particle.left,
                top: particle.top,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                opacity: particle.opacity * MOBILE_PARTICLE_OPACITY_FACTOR,
                animationName: "tracksParticleRise",
                animationTimingFunction: "linear",
                animationIterationCount: "infinite",
                animationDuration: `${particle.duration + 6}s`,
                animationDelay: `${particle.delay}s`,
              }}
            />
          ))}
        </div>
        <div className="absolute inset-0 hidden md:block">
          {particles.map((particle, idx) => (
            <span
              key={`particle-${idx}`}
              className="absolute rounded-full bg-[#fff7df] shadow-[0_0_10px_rgba(212,175,55,0.22)]"
              style={{
                left: particle.left,
                top: particle.top,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                opacity: particle.opacity,
                animationName: "tracksParticleRise",
                animationTimingFunction: "linear",
                animationIterationCount: "infinite",
                animationDuration: `${particle.duration}s`,
                animationDelay: `${particle.delay}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Volumetric center glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(212,175,55,0.07)_0%,transparent_62%)] pointer-events-none" />

      {/* ══ RESPONSIVE PINNED LAYOUT ══ */}
      <div className="relative z-10 w-full h-[100dvh] flex items-center justify-center pointer-events-none">
        {/* We use pointer-events-none on wrapper to pass swipe physics down cleanly, re-enable for interactivity inside */}
        <div className="container-main relative flex items-center justify-center w-full h-full max-h-[900px] py-12 md:py-0 pointer-events-auto">
          <div className="w-full flex flex-col md:flex-row items-center gap-8 md:gap-10 lg:gap-14">
            {/* TEXT SIDE — PIXEL-PERFECT TYPOGRAPHY */}
            <div className="w-full md:w-[58%] lg:w-[55%] shrink-0 min-w-0 overflow-hidden flex flex-col items-start justify-center text-left relative md:h-[320px] lg:h-[480px] px-4 md:px-0 gap-3">

              {/* Top Micro-text: Archive Tag (top-right of block) */}
              <div className="absolute -top-7 right-0 pointer-events-none">
                <span className="font-sans text-[10px] uppercase tracking-[0.32em] text-[#7a6230]/70 select-none">
                  JSS // ARCHIVE
                </span>
              </div>

              {/* Primary Title Block */}
              <div className="flex flex-col leading-none w-full">
                {/* HOLLOW — Track Name (Serif, Giant, Outlined) */}
                <span
                  className="font-serif text-transparent uppercase select-none block leading-[0.88] w-full"
                  style={{
                    WebkitTextStroke: "1px #B89947",
                    fontSize: "clamp(2.1rem, 5.8vw, 4rem)",
                    letterSpacing: "-0.015em",
                    filter: "drop-shadow(0 0 16px rgba(184,153,71,0.15))",
                    wordBreak: "keep-all",
                  }}
                >
                  {active.trackName}
                </span>

                {/* SOLID — Category Title (Serif, Metallic Gold Gradient) */}
                <h2
                  className="font-serif font-bold block leading-[0.92] tracking-tight bg-gradient-to-b from-yellow-300 via-yellow-600 to-yellow-700 bg-clip-text text-transparent w-full"
                  style={{
                    fontSize: "clamp(2.1rem, 5.8vw, 4rem)",
                    letterSpacing: "0.01em",
                    wordBreak: "keep-all",
                  }}
                >
                  {active.title}
                </h2>
              </div>

              {/* Quote Section — flanked by thin gold lines */}
              <div className="flex items-center gap-3 w-full">
                <div className="h-px w-7 shrink-0 bg-gradient-to-r from-transparent to-[#8a6e30]/80" />
                <p
                  className="font-sans italic uppercase text-[#c9a84c]/80 tracking-[0.1em] leading-tight"
                  style={{ fontSize: "clamp(0.65rem, 1.3vw, 0.78rem)" }}
                >
                  &ldquo;{active.tagline}&rdquo;
                </p>
                <div className="h-px w-7 shrink-0 bg-gradient-to-l from-transparent to-[#8a6e30]/80" />
              </div>

              {/* Body Text — off-white, modern sans-serif */}
              <div className="font-sans text-neutral-200 leading-relaxed tracking-wide space-y-2"
                   style={{ fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)" }}>
                {active.description
                  .split('.')
                  .filter(s => s.trim())
                  .map((sentence, idx) => (
                    <p key={idx} className="opacity-90">{sentence.trim()}.</p>
                  ))}
              </div>

              {/* Footer Tag — glowing dot + Realm text */}
              <div className="flex items-center gap-3 w-full">
                {/* Faint SEC label far left */}
                <span className="font-sans text-[11px] uppercase tracking-[0.35em] text-[#7a6230]/30 select-none mr-auto hidden md:inline">
                  SEC: {active.id}
                </span>
                {/* Pulsing Dot */}
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.9)] animate-pulse shrink-0" />
                {/* Realm Label */}
                <span className="font-sans text-[13px] font-medium uppercase tracking-[0.2em] text-yellow-500/90 select-none">
                  {active.realm}
                </span>
              </div>

            </div>

            {/* VISUAL SIDE - TRIPLE-LAYER TRINITY FRAME */}
            <div className="w-full md:flex-1 flex items-center justify-center mt-4 md:mt-0 min-w-0">
              <div className="relative w-[85%] max-w-[320px] md:w-full md:max-w-[480px] aspect-square">
                {tracks.map((track, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <div
                      key={`visual-${idx}`}
                      className={`absolute inset-0 transition-all duration-[1100ms] cubic-bezier(0.23, 1, 0.32, 1) ${
                        isActive
                          ? "opacity-100 scale-100 blur-none rotate-0 translate-y-0"
                          : idx < activeIndex
                            ? "opacity-0 scale-110 blur-2xl rotate-3 -translate-y-8"
                            : "opacity-0 scale-90 blur-2xl -rotate-3 translate-y-8"
                      }`}
                    >
                      {/* TRIPLE LAYER FRAME SYSTEM */}
                      <div className="w-full h-full relative p-6 md:p-8">
                        {/* Layer 1: Outer Atmospheric Glow */}
                        <div className={`absolute inset-0 rounded-[3rem] bg-[#D4AF37]/5 blur-3xl transition-opacity duration-1000 ${isActive ? 'opacity-40' : 'opacity-0'}`} />

                        {/* Layer 2: Structural Obsidian Glass Frame */}
                        <div className="absolute inset-0 rounded-[3.5rem] border border-[#D4AF37]/15 bg-black/40 backdrop-blur-2xl shadow-[0_0_40px_rgba(0,0,0,0.5)] flex items-center justify-center overflow-hidden">
                           <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 via-transparent to-black pointer-events-none" />
                        </div>

                        {/* Layer 3: Inner Energy Core Frame */}
                        <div className="absolute inset-4 md:inset-6 rounded-[2.8rem] flex items-center justify-center p-[2px] md:p-[3px] overflow-hidden">
                          {/* Pulsing Energy Border */}
                          <div className={`absolute -inset-10 bg-gradient-to-tr from-[#C9A84C] via-[#FFF8D8] to-[#C9A84C] bg-[size:300%_300%] opacity-100 blur-[4px] ${isActive ? 'animate-[borderEnergy_8s_ease-in-out_infinite]' : ''}`} />

                          {/* Image Container */}
                          <div className="relative z-10 h-full w-full overflow-hidden rounded-[2.6rem] bg-[#080808] border border-black/50">
                            <Image
                              src={track.image}
                              alt={track.title}
                              fill
                              sizes="(max-width: 768px) 320px, 480px"
                              className={`object-cover transition-transform duration-[3000ms] ease-out ${isActive ? 'scale-105 brightness-110' : 'scale-125 brightness-50'}`}
                              unoptimized={true}
                            />
                            {/* Cinematic Overlays */}
                            <div className="pointer-events-none absolute inset-0 z-20 mix-blend-overlay opacity-40 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)]" />
                            <div className="pointer-events-none absolute inset-0 z-20 mix-blend-screen shadow-[inset_0_0_40px_rgba(212,175,55,0.2)]" />
                          </div>
                        </div>

                        {/* Runic Corners */}
                        <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-[#D4AF37]/40 rounded-tl-lg" />
                        <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-[#D4AF37]/40 rounded-tr-lg" />
                        <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-[#D4AF37]/40 rounded-bl-lg" />
                        <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[#D4AF37]/40 rounded-br-lg" />
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
      <div className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 md:gap-3 z-50">
        {tracks.map((_, idx) => (
          <div
            key={`dot-${idx}`}
            className={`w-[4px] transition-all duration-500 ease-out rounded-full ${
              idx === activeIndex
                ? "h-10 md:h-12 bg-gradient-to-b from-[#D4AF37] to-[#B8860B] shadow-[0_0_10px_rgba(212,175,55,0.5)]"
                : "h-4 md:h-5 bg-slate-400/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
