'use client';

import React, { useMemo } from 'react';

type TimelineSpineProps = {
  activeIndex: number;
  visibleNodes: boolean[];
  runes: readonly string[];
  flowSpeed: number;
  isMobile?: boolean;
};

const TOP_START_PERCENT = 8;
const TOP_END_PERCENT = 92;

export default function TimelineSpine({ activeIndex, visibleNodes, runes, flowSpeed, isMobile = false }: TimelineSpineProps) {
  const nodePositions = useMemo(() => {
    if (runes.length <= 1) return [50];
    const step = (TOP_END_PERCENT - TOP_START_PERCENT) / (runes.length - 1);
    return runes.map((_, idx) => TOP_START_PERCENT + idx * step);
  }, [runes]);

  const streamDuration = `${Math.max(1.8, 5.2 / flowSpeed).toFixed(2)}s`;
  const streakDuration = `${Math.max(1.1, 3.8 / flowSpeed).toFixed(2)}s`;

  if (isMobile) {
    return (
      <div className="pointer-events-none absolute bottom-8 left-6 top-8 z-[2] w-[2px]">
        <div className="absolute inset-0 rounded-full bg-[linear-gradient(to_bottom,rgba(255,245,218,0.85),rgba(238,190,104,0.95),rgba(255,248,228,0.88))] blur-[1.5px]" />
        <div
          className="absolute inset-[-2px] rounded-full bg-[linear-gradient(180deg,rgba(255,253,245,0),rgba(255,223,158,0.78),rgba(255,253,245,0))]"
          style={{ animation: `spineRiver ${streamDuration} linear infinite` }}
        />
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-y-8 left-1/2 z-[2] w-[20px] -translate-x-1/2">
      <div className="absolute inset-y-0 left-1/2 w-[26px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,224,157,0.44),rgba(255,224,157,0)_72%)] blur-[9px]" />
      <div className="absolute inset-y-0 left-1/2 w-[12px] -translate-x-1/2 rounded-full bg-[linear-gradient(to_bottom,rgba(255,249,234,0.92),rgba(229,181,94,0.85),rgba(255,246,220,0.92))]" />
      <div
        className="absolute inset-y-0 left-1/2 w-[8px] -translate-x-1/2 rounded-full bg-[linear-gradient(180deg,rgba(255,249,235,0),rgba(255,221,154,0.95),rgba(255,249,235,0))] mix-blend-screen"
        style={{ animation: `spineRiver ${streamDuration} linear infinite` }}
      />
      <div
        className="absolute inset-y-0 left-1/2 w-[16px] -translate-x-1/2 rounded-full bg-[repeating-linear-gradient(to_top,rgba(255,255,255,0)_0px,rgba(255,255,255,0)_12px,rgba(255,235,185,0.88)_20px,rgba(255,255,255,0)_36px)] opacity-80"
        style={{ animation: `spineStreak ${streakDuration} linear infinite` }}
      />
      <div className="absolute inset-y-0 left-1/2 w-[20px] -translate-x-1/2 rounded-full bg-[linear-gradient(to_bottom,transparent,rgba(255,227,160,0.65),transparent)]" style={{ animation: 'spinePulse 2.8s ease-in-out infinite' }} />

      {nodePositions.map((top, idx) => {
        const isVisible = Boolean(visibleNodes[idx]);
        const isActive = isVisible && idx === activeIndex;

        return (
          <div key={`${runes[idx]}-${idx}`} className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ top: `${top}%` }}>
            <div
              className={`relative grid place-items-center rounded-full border transition-all duration-700 ${
                isActive
                  ? 'h-[74px] w-[74px] scale-110 border-[#f7dca6] bg-[radial-gradient(circle_at_25%_22%,#fffef9_0%,#f5dcaa_50%,#c7933b_100%)] shadow-[0_0_30px_rgba(243,190,89,0.9),0_0_62px_rgba(236,177,54,0.52)]'
                  : isVisible
                    ? 'h-[60px] w-[60px] scale-100 border-[#e2bc78]/85 bg-[radial-gradient(circle_at_28%_24%,#fffdf7_0%,#efd19a_58%,#bc8230_100%)] shadow-[0_0_20px_rgba(236,179,76,0.45)]'
                    : 'h-[52px] w-[52px] scale-95 border-[#cea15a]/55 bg-[radial-gradient(circle_at_28%_24%,#fff8e9_0%,#ddb36f_62%,#9f6825_100%)] opacity-70'
              }`}
            >
              {isVisible && (
                <>
                  <span className="absolute inset-[-4px] rounded-full border border-[#fae4bb]/70" style={{ animation: 'runePulse 2s ease-out infinite' }} />
                  {isActive && <span className="absolute inset-[-14px] rounded-full bg-[radial-gradient(circle,rgba(255,224,152,0.52),transparent_72%)] blur-md" style={{ animation: 'nodeBurst 2.6s ease-out infinite' }} />}
                </>
              )}
              <span className={`font-serif leading-none text-[#70480f] drop-shadow-[0_0_10px_rgba(255,242,203,0.92)] ${isActive ? 'text-[2rem]' : 'text-[1.4rem]'}`}>
                {runes[idx]}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
