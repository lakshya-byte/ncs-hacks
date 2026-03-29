'use client';

import React, { forwardRef } from 'react';
import { LavaSpine } from './spine/LavaSpine';

type TimelineSpineProps = React.HTMLAttributes<HTMLDivElement>;

const TimelineSpine = forwardRef<HTMLDivElement, TimelineSpineProps>(({}, ref) => {
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

      {/* 2. The Lava Fill (animated by GSAP + canvas flow) */}
      <div
        ref={ref}
        className="absolute bottom-0 left-1/2 top-0 w-[14px] -translate-x-1/2 origin-top overflow-hidden rounded-full"
        style={{ transform: 'scaleY(0)' }}
      >
        <LavaSpine />
      </div>
    </div>
  );
});

TimelineSpine.displayName = 'TimelineSpine';
export default TimelineSpine;
