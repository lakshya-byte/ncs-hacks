'use client';

import React from 'react';

type TimelineSpineProps = {
  progress: number;
  activeIndex: number;
  nodePositions: number[];
  runes: readonly string[];
  isMobile?: boolean;
};

export default function TimelineSpine({ progress, activeIndex, nodePositions, runes, isMobile = false }: TimelineSpineProps) {
  if (isMobile) {
    return (
      <div className="pointer-events-none absolute left-6 top-4 bottom-4 w-[2px] bg-gradient-to-b from-[#f5e2b8] via-[#d0a95f] to-[#f5e2b8]">
        <div className="absolute inset-x-0 top-0 origin-top bg-[linear-gradient(to_bottom,#fff8e7_0%,#ffe0a2_45%,#f1b64f_100%)] shadow-[0_0_14px_rgba(232,182,87,0.65)]" style={{ height: `${Math.max(4, progress * 100)}%` }} />
      </div>
    );
  }

  return (
    <>
      <div className="pointer-events-none absolute left-1/2 top-[10%] h-[80%] w-[28px] -translate-x-1/2 rounded-full bg-[linear-gradient(to_bottom,rgba(255,245,216,0.88),rgba(225,188,111,0.72),rgba(255,245,216,0.84))] blur-[7px]" />
      <div className="pointer-events-none absolute left-1/2 top-[10%] h-[80%] w-[12px] -translate-x-1/2 rounded-full border border-[#d1ad63]/55 bg-[repeating-linear-gradient(to_bottom,rgba(122,84,16,0.25)_0px,rgba(122,84,16,0.25)_2px,rgba(255,255,255,0)_2px,rgba(255,255,255,0)_12px)]" />
      <div className="pointer-events-none absolute left-1/2 top-[10%] h-[80%] w-[4px] -translate-x-1/2 rounded-full bg-[#fff9ec]/90" />
      <div
        className="pointer-events-none absolute left-1/2 top-[10%] w-[8px] -translate-x-1/2 rounded-full bg-[linear-gradient(to_top,#ec9e2f_0%,#ffd68e_45%,#fff9e8_100%)] shadow-[0_0_22px_rgba(236,167,62,0.82),0_0_48px_rgba(235,188,98,0.6)]"
        style={{ height: `${Math.max(4, progress * 80)}%` }}
      />
      {nodePositions.map((top, idx) => {
        const isActive = idx === activeIndex;
        return (
          <div key={`${runes[idx]}-${idx}`} className="pointer-events-none absolute left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ top: `${top}%` }}>
            <div
              className={`relative grid place-items-center rounded-full border text-[#7f5a1c] transition-all duration-500 ${
                isActive
                  ? 'h-[78px] w-[78px] scale-110 border-[#f3cf89] bg-[radial-gradient(circle_at_28%_20%,#fffef8_0%,#f6dfac_55%,#d9b86a_100%)] shadow-[0_0_30px_rgba(236,180,76,0.75),0_0_58px_rgba(234,193,112,0.5)]'
                  : 'h-[54px] w-[54px] scale-95 border-[#cfab64]/70 bg-[radial-gradient(circle_at_30%_25%,#fff9ec_0%,#e9c783_72%,#c9974f_100%)] opacity-65'
              }`}
            >
              {isActive && (
                <>
                  <span
                    className="absolute inset-0 rounded-full border border-[#f8dfa6]/75"
                    style={{ animation: 'runePulse 1.6s ease-out infinite' }}
                  />
                  <span className="absolute inset-[-8px] rounded-full bg-[radial-gradient(circle,rgba(255,233,170,0.55),transparent_72%)] blur-md" />
                </>
              )}
              <span className={`${isActive ? 'text-[2rem]' : 'text-[1.35rem]'} font-serif leading-none drop-shadow-[0_0_8px_rgba(255,241,203,0.95)]`}>
                {runes[idx]}
              </span>
            </div>
          </div>
        );
      })}
    </>
  );
}
