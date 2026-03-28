'use client';

import React, { forwardRef } from 'react';

type TimelineSpineProps = React.HTMLAttributes<HTMLDivElement>;

const TimelineSpine = forwardRef<HTMLDivElement, TimelineSpineProps>((props, ref) => {
  return (
    <div
      className="pointer-events-none absolute -bottom-[120px] -top-[120px] left-[40px] z-[0] w-[24px] -translate-x-1/2 md:left-1/2"
      style={{
        maskImage: 'linear-gradient(to bottom, transparent 0%, black 120px, black calc(100% - 120px), transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 120px, black calc(100% - 120px), transparent 100%)',
      }}
    >
      {/* 1. Underlying dim track */}
      <div className="absolute inset-y-0 left-1/2 w-[6px] -translate-x-1/2 rounded-full bg-[#fae5b6]/20" />

      {/* 2. The Lava Fill (Will be animated by GSAP via ref) */}
      <div
        ref={ref}
        className="absolute bottom-0 left-1/2 top-0 w-[14px] -translate-x-1/2 origin-top rounded-full bg-[linear-gradient(to_bottom,rgba(255,249,234,0.95),rgba(229,181,94,0.9),rgba(255,246,220,1))]"
        style={{ transform: 'scaleY(0)' }} // Start empty
      >
        {/* Glow behind the lava */}
        <div className="absolute inset-y-0 left-1/2 w-[28px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,224,157,0.6),rgba(255,224,157,0)_70%)] blur-[8px]" />
        
        {/* Pulsing streaks inside the lava */}
        <div
          className="absolute inset-y-0 left-1/2 w-[8px] -translate-x-1/2 rounded-full bg-[repeating-linear-gradient(to_bottom,transparent_0px,transparent_40px,rgba(255,255,255,0.8)_80px,transparent_120px)] opacity-90"
          style={{ animation: 'lavaPulse 3s linear infinite' }}
        />
        
        {/* Bright "Head" of the lava flow at the very bottom edge */}
        <div className="absolute bottom-0 left-1/2 h-[40px] w-[20px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,1),transparent_70%)] blur-[3px]" />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes lavaPulse {
          0% { background-position: 0 0px; }
          100% { background-position: 0 200px; }
        }
      `}} />
    </div>
  );
});

TimelineSpine.displayName = 'TimelineSpine';
export default TimelineSpine;

