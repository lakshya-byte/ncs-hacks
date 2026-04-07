'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const AUDIO_SRC = '/music/nickpanekaiassets-viking-chant-ancient-norse-style-401648 (1).mp3';
const START_TIME = 0; // Start at 0s
const LOOP_END = 27;  // Loop exactly when hitting 27s

export default function AudioSystem() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [canAutoplay, setCanAutoplay] = useState(false);
  
  // ── INITIAL AUTOPLAY & INTERACTION FALLBACK ──
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set initial start time
    audio.currentTime = START_TIME;
    audio.volume = 0; // start muted for safe ramping

    const attemptPlay = async () => {
      try {
        await audio.play();
        setCanAutoplay(true);
        setIsPlaying(true);
        // Smoothly fade in to full volume
        gsap.to(audio, { volume: 0.6, duration: 3, ease: 'power2.out' });
      } catch {
        // Autoplay blocked by browser. Wait for first interaction.
        console.log('Autoplay blocked. Waiting for user interaction.');
      }
    };

    attemptPlay();

    const handleFirstInteraction = async () => {
      if (!isPlaying && audioRef.current) {
        try {
          audioRef.current.volume = 0;
          await audioRef.current.play();
          setIsPlaying(true);
          gsap.to(audioRef.current, { volume: 0.6, duration: 2, ease: 'power2.out' });
          // Remove listeners once successfully activated
          window.removeEventListener('click', handleFirstInteraction);
          window.removeEventListener('scroll', handleFirstInteraction);
          window.removeEventListener('touchstart', handleFirstInteraction);
        } catch {
          // keep waiting
        }
      }
    };

    if (!canAutoplay) {
      window.addEventListener('click', handleFirstInteraction, { passive: true });
      window.addEventListener('scroll', handleFirstInteraction, { passive: true });
      window.addEventListener('touchstart', handleFirstInteraction, { passive: true });
    }

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('scroll', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canAutoplay]);

  // ── LOOP LOGIC (0s -> 27s) ──
  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio) return;

    // Loop rigidly from 27 seconds back to 0
    if (audio.currentTime >= LOOP_END) {
      audio.currentTime = START_TIME;
      // Guarantee it keeps playing after jumping backward
      audio.play().catch(() => {});
    }
  };

  // ── PLAY/PAUSE CONTROLS ──
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      // Smooth fade out before pausing
      setIsPlaying(false);
      gsap.to(audio, {
        volume: 0,
        duration: 0.8,
        ease: 'power2.inOut',
        onComplete: () => {
          audio.pause();
        }
      });
    } else {
      // Start playing and smooth fade in
      if (audio.currentTime >= LOOP_END) audio.currentTime = START_TIME;
      audio.play().then(() => {
        setIsPlaying(true);
        gsap.to(audio, { volume: 0.6, duration: 1.2, ease: 'power2.out' });
      }).catch(err => console.log('Playback failed:', err));
    }
  };

  return (
    <>
      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={AUDIO_SRC}
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
      />

      {/* CSS Animations for the Waveform */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes waveform {
          0%, 100% { transform: scaleY(0.3); opacity: 0.5; }
          50% { transform: scaleY(1); opacity: 1; }
        }
        .anim-wave {
          transform-origin: bottom;
          will-change: transform, opacity;
        }
      `}} />

      {/* ── STICKY UI ── */}
      <div 
        className="fixed left-6 bottom-8 z-200 group cursor-pointer"
        onClick={togglePlay}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Divine Glow Sphere */}
        <div 
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-[#C9A84C] rounded-full blur-xl pointer-events-none transition-all duration-1000 ${
            isPlaying ? 'opacity-20 scale-100' : 'opacity-0 scale-50'
          }`} 
        />
        
        {/* Main Glassmorphic Container/Artifact */}
        <div 
          className={`relative flex items-center justify-center w-14 h-14 rounded-full border border-[#C9A84C]/30 backdrop-blur-xl transition-all duration-500 overflow-hidden ${
            isPlaying 
              ? 'bg-white/10 shadow-[0_0_20px_rgba(201,168,76,0.8),inset_0_0_12px_rgba(201,168,76,0.1)]' 
              : 'bg-black/20 shadow-[0_0_10px_rgba(0,0,0,0.5)]'
          } ${isHovered ? 'scale-110 border-[#C9A84C]/60' : 'scale-100'}`}
        >
          {/* Waveform Equalizer */}
          <div className="flex items-end gap-[3px] h-[22px] justify-center mt-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className={`w-[2.5px] rounded-t-sm bg-linear-to-t from-[#C9A84C] to-[#F5E0A3] anim-wave transition-all duration-500 ${
                  isPlaying ? 'opacity-100' : 'opacity-40 scale-y-[0.2]!'
                }`}
                style={{
                  height: '100%',
                  // Staggered animation timings for organic equalizer look
                  animation: isPlaying ? `waveform ${0.8 + (i % 3) * 0.2}s ease-in-out infinite ${i * 0.15}s` : 'none',
                  boxShadow: isPlaying ? '0 0 6px rgba(201,168,76,0.6)' : 'none'
                }}
              />
            ))}
          </div>

          {/* Hover Play/Pause Icon Overlay */}
          <div 
            className={`absolute inset-0 bg-[#FAFAF8] flex items-center justify-center transition-all duration-300 ${
              isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
            }`}
          >
            {isPlaying ? (
              // Pause Icon
              <div className="flex gap-1">
                <div className="w-1.5 h-4 bg-[#C9A84C] rounded-sm" />
                <div className="w-1.5 h-4 bg-[#C9A84C] rounded-sm" />
              </div>
            ) : (
              // Play Triangle
              <div className="w-0 h-0 border-t-[7px] border-t-transparent border-l-11 border-l-[#C9A84C] border-b-[7px] border-b-transparent ml-1" />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
