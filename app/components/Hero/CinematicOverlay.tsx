'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CinematicOverlay() {
  const enterTextRef = useRef<HTMLDivElement>(null);
  const welcomeTextRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const startGradientRef = useRef<HTMLDivElement>(null);
  const endGradientRef = useRef<HTMLDivElement>(null);
  const runeRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const mm = gsap.matchMedia();

    // ── DESKTOP: FULL PREMIUM ANIMATIONS ──
    mm.add("(min-width: 768px)", () => {
      // "Enter the Realm" fades out at 20% scroll
      gsap.to(enterTextRef.current, {
        scrollTrigger: {
          trigger: '#scroll-container',
          start: 'top top',
          end: () => "+=" + (window.innerHeight * 1.2),
          scrub: true,
        },
        opacity: 0,
        y: -40,
        scale: 0.9,
      });

      // Rune symbol fades out with enter text
      gsap.to(runeRef.current, {
        scrollTrigger: {
          trigger: '#scroll-container',
          start: 'top top',
          end: () => "+=" + (window.innerHeight * 1.5),
          scrub: true,
        },
        opacity: 0,
        y: -20,
      });

      // Start gradient fades out at 40% scroll
      gsap.to(startGradientRef.current, {
        scrollTrigger: {
          trigger: '#scroll-container',
          start: () => "top+=" + (window.innerHeight * 0.6) + " top",
          end: () => "+=" + (window.innerHeight * 2.1),
          scrub: true,
        },
        opacity: 0,
      });

      // "Welcome to Asgard" fades in at 75% scroll
      gsap.fromTo(
        welcomeTextRef.current,
        { opacity: 0, y: 30, scale: 0.95 },
        {
          scrollTrigger: {
            trigger: '#scroll-container',
            start: () => "top+=" + (window.innerHeight * 4.5) + " top",
            end: () => "+=" + (window.innerHeight * 0.78),
            scrub: true,
          },
          opacity: 1,
          y: 0,
          scale: 1,
        }
      );

      // Subtitle fades in slightly later
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        {
          scrollTrigger: {
            trigger: '#scroll-container',
            start: () => "top+=" + (window.innerHeight * 4.8) + " top",
            end: () => "+=" + (window.innerHeight * 0.72),
            scrub: true,
          },
          opacity: 1,
          y: 0,
        }
      );

      // End gradient fades in at 65% scroll
      gsap.fromTo(
        endGradientRef.current,
        { opacity: 0 },
        {
          scrollTrigger: {
            trigger: '#scroll-container',
            start: () => "top+=" + (window.innerHeight * 3.9) + " top",
            end: () => "+=" + (window.innerHeight * 1.2),
            scrub: true,
          },
          opacity: 1,
        }
      );
    });

    // ── MOBILE: SIMPLIFIED HARDWARE-ACCELERATED ANIMATIONS ──
    mm.add("(max-width: 767px)", () => {
      // Grouping intro fades into a single scroll trigger for minimal layout recalculations
      gsap.to([enterTextRef.current, runeRef.current, startGradientRef.current], {
        scrollTrigger: {
          trigger: '#scroll-container',
          start: 'top top',
          end: () => "+=" + (window.innerHeight * 1.0),
          scrub: true,
        },
        opacity: 0,
        y: -15, // simplified y movement
      });

      // Grouping outro fades into a single scroll trigger block
      gsap.fromTo(
        [welcomeTextRef.current, subtitleRef.current, endGradientRef.current],
        { opacity: 0, y: 15 },
        {
          scrollTrigger: {
            trigger: '#scroll-container',
            start: () => "top+=" + (window.innerHeight * 4.5) + " top",
            end: () => "+=" + (window.innerHeight * 1.0),
            scrub: true,
          },
          opacity: 1,
          y: 0,
        }
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      {/* Dark gradient at start */}
      <div
        ref={startGradientRef}
        className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_bottom,rgba(0,0,0,0.75)_0%,rgba(0,0,0,0.35)_50%,transparent_100%)]"
      />

      {/* Light golden gradient at end */}
      <div
        ref={endGradientRef}
        className="absolute inset-0 opacity-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(201, 168, 76, 0.18)_0%,rgba(201, 168, 76, 0.08)_50%,transparent_80%)]"
      />

      {/* Norse rune decorative symbol */}
      <div
        ref={runeRef}
        className="absolute top-[12%] left-1/2 -translate-x-1/2 text-[1.8rem] text-center tracking-[1.5rem] font-heading text-[rgba(201, 168, 76, 0.6)]"
      >
        ᚨ ᚱ ᚷ ᚨ ᚱ
      </div>

      {/* "Enter the Realm" — initial text */}
      <div
        ref={enterTextRef}
        className="absolute bottom-[18%] w-full text-center flex flex-col items-center gap-3"
      >
        <h1
          className="font-heading text-[clamp(2rem,5vw,3.5rem)] font-bold text-white tracking-[0.25em] uppercase m-0 [text-shadow:0_0_40px_rgba(201, 168, 76, 0.6),0_2px_20px_rgba(0,0,0,0.8)]"
        >
          Enter the Realm
        </h1>
        <div className="flex items-center gap-5 text-[rgba(255,255,255,0.85)] text-[1.1rem] tracking-[0.2em] uppercase font-body font-bold">
          <span className="inline-block w-12 h-[2.5px] bg-[#C9A84C] shadow-[0_0_10px_rgba(201, 168, 76, 0.6)]" />
          Scroll to pass through
          <span className="inline-block w-12 h-[2.5px] bg-[#C9A84C] shadow-[0_0_10px_rgba(201, 168, 76, 0.6)]" />
        </div>
      </div>

      {/* "Welcome to Asgard" — end text */}
      <div
        ref={welcomeTextRef}
        className="absolute bottom-[18%] w-full text-center flex flex-col items-center gap-4 opacity-0"
      >
        <div
          className="font-body text-[clamp(0.8rem,1.8vw,1.1rem)] tracking-[0.3em] font-bold uppercase text-[#D4AF37] [text-shadow:0_0_20px_rgba(212,175,55,0.8)]"
        >
          ✦ You have arrived ✦
        </div>
        <h2
          className="font-heading text-[clamp(2.5rem,6vw,4.5rem)] font-bold text-white tracking-[0.2em] uppercase m-0 [text-shadow:0_0_60px_rgba(255,215,0,0.9),0_0_120px_rgba(212,175,55,0.5),0_4px_30px_rgba(0,0,0,0.9)]"
        >
          Welcome to Asgard
        </h2>
        <div
          ref={subtitleRef}
          className="font-body text-[clamp(0.9rem,2vw,1.3rem)] font-medium text-[rgba(255,215,0,0.35)] tracking-[0.2em] uppercase opacity-0 [text-shadow:0_0_20px_rgba(212,175,55,0.6)]"
        >
          Where Gods Build Legends
        </div>
      </div>

      {/* Scroll progress indicator */}
      <ScrollIndicator />
    </div>
  );
}

function ScrollIndicator() {
  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.to(indicatorRef.current, {
      scrollTrigger: {
        trigger: '#scroll-container',
        start: 'top top',
        end: () => "+=" + (window.innerHeight * 0.9),
        scrub: true,
      },
      opacity: 0,
      y: 10,
    });
  }, []);

  return (
    <div
      ref={indicatorRef}
      className="absolute bottom-[6%] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[rgba(255,255,255,0.45)] text-[0.7rem] tracking-[0.3em] uppercase font-heading"
    >
      <div
        className="w-[2.5px] h-12 [animation:scrollPulse_2s_ease-in-out_infinite] bg-[linear-gradient(to_bottom,rgba(201, 168, 76,1),transparent)] shadow-[0_0_12px_rgba(201, 168, 76,0.8)]"
      />
      <span className="font-body font-bold">Scroll</span>
    </div>
  );
}
