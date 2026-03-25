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
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 10,
      }}
    >
      {/* Dark gradient at start */}
      <div
        ref={startGradientRef}
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 50%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Light golden gradient at end */}
      <div
        ref={endGradientRef}
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0,
          background:
            'radial-gradient(ellipse at center, rgba(255,230,120,0.18) 0%, rgba(200,160,60,0.08) 50%, transparent 80%)',
          pointerEvents: 'none',
        }}
      />

      {/* Norse rune decorative symbol */}
      <div
        ref={runeRef}
        style={{
          position: 'absolute',
          top: '12%',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '1.8rem',
          color: 'rgba(201, 162, 39, 0.6)',
          letterSpacing: '1.5rem',
          textAlign: 'center',
          fontFamily: 'Cinzel, serif',
        }}
      >
        ᚨ ᚱ ᚷ ᚨ ᚱ
      </div>

      {/* "Enter the Realm" — initial text */}
      <div
        ref={enterTextRef}
        style={{
          position: 'absolute',
          bottom: '18%',
          width: '100%',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.75rem',
        }}
      >
        <h1
          style={{
            fontFamily: 'Cinzel, serif',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 700,
            color: '#fff',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            textShadow:
              '0 0 40px rgba(201,162,39,0.6), 0 2px 20px rgba(0,0,0,0.8)',
            margin: 0,
          }}
        >
          Enter the Realm
        </h1>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            color: 'rgba(255,255,255,0.55)',
            fontSize: '0.85rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            fontFamily: 'Cinzel, serif',
          }}
        >
          <span style={{ width: 40, height: 1, background: 'currentColor', display: 'inline-block' }} />
          Scroll to pass through
          <span style={{ width: 40, height: 1, background: 'currentColor', display: 'inline-block' }} />
        </div>
      </div>

      {/* "Welcome to Asgard" — end text */}
      <div
        ref={welcomeTextRef}
        style={{
          position: 'absolute',
          bottom: '18%',
          width: '100%',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          opacity: 0,
        }}
      >
        <div
          style={{
            fontFamily: 'Cinzel, serif',
            fontSize: 'clamp(0.7rem, 1.5vw, 1rem)',
            letterSpacing: '0.5em',
            textTransform: 'uppercase',
            color: '#c9a227',
            textShadow: '0 0 20px rgba(201,162,39,0.8)',
          }}
        >
          ✦ You have arrived ✦
        </div>
        <h2
          style={{
            fontFamily: 'Cinzel, serif',
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 700,
            color: '#fff',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            margin: 0,
            textShadow:
              '0 0 60px rgba(255, 220, 100, 0.9), 0 0 120px rgba(201,162,39,0.5), 0 4px 30px rgba(0,0,0,0.9)',
          }}
        >
          Welcome to Asgard
        </h2>
        <div
          ref={subtitleRef}
          style={{
            fontFamily: 'Cinzel, serif',
            fontSize: 'clamp(0.9rem, 2vw, 1.3rem)',
            color: 'rgba(255, 220, 120, 0.85)',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            opacity: 0,
            textShadow: '0 0 20px rgba(201,162,39,0.6)',
          }}
        >
          Where Gods Build Legends
        </div>
      </div>

      {/* Scroll progress indicator at start */}
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
      style={{
        position: 'absolute',
        bottom: '6%',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
        color: 'rgba(255,255,255,0.45)',
        fontSize: '0.7rem',
        letterSpacing: '0.3em',
        textTransform: 'uppercase',
        fontFamily: 'Cinzel, serif',
      }}
    >
      <div
        style={{
          width: 1,
          height: 40,
          background: 'linear-gradient(to bottom, rgba(201,162,39,0.8), transparent)',
          animation: 'scrollPulse 2s ease-in-out infinite',
        }}
      />
      Scroll
    </div>
  );
}
