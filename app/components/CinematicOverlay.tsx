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
    const ctx = gsap.context(() => {
      // "Enter the Realm" fades out at 20% scroll
      gsap.to(enterTextRef.current, {
        scrollTrigger: {
          trigger: '#scroll-container',
          start: 'top top',
          end: '20% top',
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
          end: '25% top',
          scrub: true,
        },
        opacity: 0,
        y: -20,
      });

      // Start gradient fades out at 40% scroll
      gsap.to(startGradientRef.current, {
        scrollTrigger: {
          trigger: '#scroll-container',
          start: '10% top',
          end: '45% top',
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
            start: '75% top',
            end: '88% top',
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
            start: '80% top',
            end: '92% top',
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
            start: '65% top',
            end: '85% top',
            scrub: true,
          },
          opacity: 1,
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {/* Dark gradient at start */}
      <div
        ref={startGradientRef}
        className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_bottom,rgba(0,0,0,0.75)_0%,rgba(0,0,0,0.35)_50%,transparent_100%)]"
      />

      {/* Light golden gradient at end */}
      <div
        ref={endGradientRef}
        className="absolute inset-0 opacity-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(255,230,120,0.18)_0%,rgba(200,160,60,0.08)_50%,transparent_80%)]"
      />

      {/* Norse rune decorative symbol */}
      <div
        ref={runeRef}
        className="absolute top-[12%] left-1/2 -translate-x-1/2 text-[1.8rem] text-center tracking-[1.5rem] font-[Cinzel,serif] text-[rgba(201,162,39,0.6)]"
      >
        ᚨ ᚱ ᚷ ᚨ ᚱ
      </div>

      {/* "Enter the Realm" — initial text */}
      <div
        ref={enterTextRef}
        className="absolute bottom-[18%] w-full text-center flex flex-col items-center gap-3"
      >
        <h1
          className="font-[Cinzel,serif] text-[clamp(2rem,5vw,3.5rem)] font-bold text-white tracking-[0.25em] uppercase m-0 [text-shadow:0_0_40px_rgba(201,162,39,0.6),0_2px_20px_rgba(0,0,0,0.8)]"
        >
          Enter the Realm
        </h1>
        <div className="flex items-center gap-4 text-[rgba(255,255,255,0.55)] text-[0.85rem] tracking-[0.3em] uppercase font-[Cinzel,serif]">
          <span className="inline-block w-10 h-px bg-current" />
          Scroll to pass through
          <span className="inline-block w-10 h-px bg-current" />
        </div>
      </div>

      {/* "Welcome to Asgard" — end text */}
      <div
        ref={welcomeTextRef}
        className="absolute bottom-[18%] w-full text-center flex flex-col items-center gap-4 opacity-0"
      >
        <div
          className="font-[Cinzel,serif] text-[clamp(0.7rem,1.5vw,1rem)] tracking-[0.5em] uppercase text-[#c9a227] [text-shadow:0_0_20px_rgba(201,162,39,0.8)]"
        >
          ✦ You have arrived ✦
        </div>
        <h2
          className="font-[Cinzel,serif] text-[clamp(2.5rem,6vw,4.5rem)] font-bold text-white tracking-[0.2em] uppercase m-0 [text-shadow:0_0_60px_rgba(255,220,100,0.9),0_0_120px_rgba(201,162,39,0.5),0_4px_30px_rgba(0,0,0,0.9)]"
        >
          Welcome to Asgard
        </h2>
        <div
          ref={subtitleRef}
          className="font-[Cinzel,serif] text-[clamp(0.9rem,2vw,1.3rem)] text-[rgba(255,220,120,0.85)] tracking-[0.3em] uppercase opacity-0 [text-shadow:0_0_20px_rgba(201,162,39,0.6)]"
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
        end: '15% top',
        scrub: true,
      },
      opacity: 0,
      y: 10,
    });
  }, []);

  return (
    <div
      ref={indicatorRef}
      className="absolute bottom-[6%] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[rgba(255,255,255,0.45)] text-[0.7rem] tracking-[0.3em] uppercase font-[Cinzel,serif]"
    >
      <div
        className="w-px h-10 [animation:scrollPulse_2s_ease-in-out_infinite] bg-[linear-gradient(to_bottom,rgba(201,162,39,0.8),transparent)]"
      />
      Scroll
    </div>
  );
}
