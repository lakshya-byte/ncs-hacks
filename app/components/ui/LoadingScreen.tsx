'use client';

import React from 'react';

/**
 * LoadingScreen - A high-end cinematic loader designed to bridge the gap
 * during the heavy initialization of Three.js and video frame buffers.
 */
export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[999] bg-black flex flex-col items-center justify-center">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.05)_0%,transparent_70%)] animate-pulse" />
      
      <div className="relative flex flex-col items-center gap-8">
        {/* Ornate Gold Spinner */}
        <div className="relative w-24 h-24">
          {/* Inner ring */}
          <div className="absolute inset-0 border-2 border-yellow-500/20 rounded-full" />
          {/* Animated Spinner layer */}
          <div className="absolute inset-0 border-t-2 border-[#FFD700] rounded-full animate-spin [animation-duration:1.5s]" />
          {/* Core Diamond */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rotate-45 bg-[#FFD700] shadow-[0_0_15px_#FFD700]" />
        </div>

        {/* Textual feedback */}
        <div className="flex flex-col items-center gap-2">
          <h2 className="font-heading text-[#FFD700] text-xl tracking-[0.4em] uppercase drop-shadow-[0_0_10px_rgba(255,215,0,0.5)] animate-pulse">
            Entering Asgard
          </h2>
          <span className="font-['Inter',sans-serif] text-white/40 text-[10px] uppercase tracking-[0.2em]">
            Forging Divine Realms...
          </span>
        </div>
      </div>
      
      {/* Decorative corner accents for consistency with Royal theme */}
      <div className="absolute top-10 left-10 w-8 h-8 border-t border-l border-yellow-500/30" />
      <div className="absolute top-10 right-10 w-8 h-8 border-t border-r border-yellow-500/30" />
      <div className="absolute bottom-10 left-10 w-8 h-8 border-b border-l border-yellow-500/30" />
      <div className="absolute bottom-10 right-10 w-8 h-8 border-b border-r border-yellow-500/30" />
    </div>
  );
}
