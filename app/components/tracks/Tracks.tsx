"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
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
    image: "/tracks/AIML.png",
  },
  {
    id: "02",
    title: "Web / Platforms",
    description:
      "Construct the digital realms of tomorrow. Build robust, scalable, and divine architectures that seamlessly connect the world through glowing networks.",
    bgGradient: "from-[#FDFBF7] to-[#EAE6DB]",
    image: "/tracks/WebDev.png",
  },
  {
    id: "03",
    title: "Blockchain",
    description:
      "Weave trust into the digital fabric. Create immutable decentralized systems and smart contracts that stand the test of time like ancient, unbreakable runes.",
    bgGradient: "from-[#FAFAF8] to-[#F5F5F0]",
    image: "/tracks/Blockchain.png",
  },
  {
    id: "04",
    title: "Open Innovation",
    description:
      "The Infinite Gate. For those whose visions transcend the specified realms. Craft the unforeseen and forge original paths through the uncharted territories of innovation.",
    bgGradient: "from-[#FAFAF8] to-[#F1EDE2]",
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
  { left: "22%", top: "86%", size: 1.5, duration: 27, delay: -5, opacity: 0.24 },
  { left: "29%", top: "72%", size: 2, duration: 33, delay: -22, opacity: 0.32 },
  { left: "36%", top: "88%", size: 1.5, duration: 26, delay: -16, opacity: 0.22 },
  { left: "43%", top: "78%", size: 2, duration: 35, delay: -3, opacity: 0.35 },
  { left: "49%", top: "84%", size: 1.5, duration: 30, delay: -25, opacity: 0.26 },
  { left: "55%", top: "76%", size: 2, duration: 32, delay: -12, opacity: 0.3 },
  { left: "61%", top: "90%", size: 1.5, duration: 28, delay: -18, opacity: 0.24 },
  { left: "67%", top: "80%", size: 2, duration: 34, delay: -10, opacity: 0.33 },
  { left: "72%", top: "86%", size: 1.5, duration: 31, delay: -27, opacity: 0.22 },
  { left: "78%", top: "74%", size: 2, duration: 36, delay: -21, opacity: 0.32 },
  { left: "84%", top: "88%", size: 1.5, duration: 25, delay: -6, opacity: 0.25 },
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
          const index = Math.min(3, Math.floor(self.progress * 4));
          const centeredProgress = self.progress - 0.5;
          if (cloudLayerRef.current) {
            gsap.set(cloudLayerRef.current, { y: centeredProgress * PARALLAX.clouds });
          }
          if (raysLayerRef.current) {
            gsap.set(raysLayerRef.current, { y: centeredProgress * PARALLAX.rays });
          }
          if (particlesLayerRef.current) {
            gsap.set(particlesLayerRef.current, { y: centeredProgress * PARALLAX.particles });
          }
          if (gradientMotionLayerRef.current) {
            gsap.set(gradientMotionLayerRef.current, { y: centeredProgress * PARALLAX.gradient });
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
      className="relative h-[100dvh] w-full overflow-hidden bg-[#FAFAF8]"
    >
      {/* Background Gradients crossfade */}
      <div className="absolute inset-0 w-full h-full">
        {tracks.map((track, idx) => (
          <div
            key={`bg-${idx}`}
            className={`absolute inset-0 w-full h-full bg-gradient-to-br ${track.bgGradient} transition-opacity duration-1000 ease-in-out ${
              idx === activeIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* Atmospheric system: gradient motion, clouds, rays, particles */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_16%,rgba(255,247,220,0.6)_0%,rgba(255,255,255,0)_58%)] pointer-events-none" />

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
            className="absolute -left-[18%] h-[20%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.24)_0%,rgba(255,248,230,0.08)_48%,rgba(255,255,255,0)_100%)]"
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
            className="absolute top-[-42%] h-[180%] rounded-[999px] bg-[linear-gradient(180deg,rgba(255,241,195,0)_0%,rgba(223,187,92,0.16)_40%,rgba(255,241,195,0.02)_72%,rgba(255,241,195,0)_100%)]"
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
          
          <div className="w-full grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-12 items-center justify-center">
            
            {/* TEXT SIDE */}
            <div className="col-span-4 md:col-span-4 lg:col-span-5 flex flex-col items-center md:items-start text-center md:text-left order-first md:order-0">
              <span
                className="font-heading leading-none text-transparent select-none"
                style={{
                  WebkitTextStroke: "1px rgba(212, 175, 55, 0.4)",
                  fontSize: "clamp(3.5rem, 12vw, 7rem)",
                }}
              >
                {active.id}
              </span>

              <h2
                className="mt-1 md:mt-2 font-heading font-medium leading-[1.1] tracking-tight text-[#B8860B] drop-shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all duration-700"
                style={{ fontSize: "clamp(1.75rem, 8vw, 4rem)" }}
              >
                {active.title}
              </h2>

              <p className="mt-4 md:mt-7 mx-auto md:mx-0 font-body text-sm md:text-base leading-relaxed text-slate-500 max-w-sm font-light tracking-wide transition-all duration-700 px-4 md:px-0">
                {active.description}
              </p>
            </div>

            {/* VISUAL SIDE */}
            <div className="col-span-4 md:col-span-4 lg:col-span-7 flex items-center justify-center w-full mt-2 md:mt-0">
              <div className="relative w-[75%] max-w-[300px] md:w-full md:max-w-[420px] aspect-square">
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
                        <div className="absolute inset-5 md:inset-6 rounded-4xl shadow-[0_0_50px_rgba(255,215,0,0.25)] ring-1 ring-[#FFD700]/20">
                          <div className="absolute inset-0 rounded-4xl p-[4px] md:p-[6px] overflow-hidden flex items-center justify-center">
                            
                            {/* Flowing golden energy background */}
                            <div className="absolute -inset-8 bg-gradient-to-tr from-[#E6B800] via-[#FFF5A0] to-[#E6B800] bg-[size:300%_300%] animate-[borderEnergy_6s_ease-in-out_infinite] blur-[8px] opacity-100" />
                            
                            {/* Inner Image Container */}
                            <div className="relative z-10 h-full w-full overflow-hidden rounded-[calc(2rem-4px)] bg-[#0A0F1C] md:rounded-[calc(2rem-6px)]">
                              <Image 
                                src={track.image}
                                alt={track.title}
                                fill
                                sizes="(max-width: 768px) 300px, 420px"
                                className="object-cover brightness-105"
                              unoptimized={true}
                              />
                              <div className="pointer-events-none absolute inset-0 z-20 mix-blend-screen shadow-[inset_0_0_30px_rgba(255,215,0,0.3)]" />
                            </div>
                            
                          </div>
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
      <div className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 md:gap-3 z-50">
        {tracks.map((_, idx) => (
          <div
            key={`dot-${idx}`}
            className={`w-[2px] transition-all duration-500 ease-out rounded-full ${
              idx === activeIndex
                ? "h-10 md:h-12 bg-gradient-to-b from-[#D4AF37] to-[#B8860B] shadow-[0_0_10px_rgba(212,175,55,0.5)]"
                : "h-3 md:h-4 bg-slate-300/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
