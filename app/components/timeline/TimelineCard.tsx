'use client';

import React from 'react';

const CARD_TILT_Y_DEGREES = 5;
const CARD_TILT_X_DEGREES = 1;

type TimelineCardProps = {
  title: string;
  date: string;
  description: string;
  side: 'left' | 'right';
  isVisible: boolean;
  isActive: boolean;
  isMobile?: boolean;
};

export default function TimelineCard({ title, date, description, side, isVisible, isActive, isMobile = false }: TimelineCardProps) {
  const alignClass = side === 'left' ? 'md:text-right' : 'md:text-left';

  const tiltRotate = !isMobile && side === 'left'
    ? `rotateY(${CARD_TILT_Y_DEGREES}deg) rotateX(${CARD_TILT_X_DEGREES}deg)`
    : !isMobile
      ? `rotateY(-${CARD_TILT_Y_DEGREES}deg) rotateX(${CARD_TILT_X_DEGREES}deg)`
      : 'none';

  return (
    <article
      className={`group relative overflow-hidden rounded-[1.7rem] border border-transparent p-[1px] transition-all duration-700 ${
        isVisible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-10 scale-95 opacity-0'
      } ${isMobile ? 'w-full' : 'w-[min(450px,92%)]'}`}
      style={{
        transformStyle: isMobile ? 'flat' : 'preserve-3d',
        transform: isVisible ? `${tiltRotate} translateY(0px)` : `${tiltRotate} translateY(32px)`,
      }}
    >
      <div className="absolute inset-0 rounded-[inherit] bg-[conic-gradient(from_140deg,rgba(255,227,160,0.98),rgba(240,189,83,0.45),rgba(255,248,225,0.9),rgba(239,178,67,0.52),rgba(255,227,160,0.98))]" style={{ animation: 'borderShine 4.6s linear infinite' }} />

      <div
        className={`relative rounded-[calc(1.7rem-1px)] border border-white/35 bg-[linear-gradient(155deg,rgba(255,255,255,0.62),rgba(255,248,230,0.3))] px-6 py-6 backdrop-blur-[30px] ${alignClass} ${
          isActive ? 'shadow-[0_30px_70px_rgba(177,129,42,0.28),inset_0_1px_0_rgba(255,255,255,0.7)]' : 'shadow-[0_22px_55px_rgba(148,111,35,0.18),inset_0_1px_0_rgba(255,255,255,0.6)]'
        }`}
        style={{ animation: isMobile ? 'none' : 'cardFloat 6.2s ease-in-out infinite' }}
      >
        <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(circle_at_18%_12%,rgba(255,255,255,0.6),rgba(255,255,255,0)_44%)]" />
        <div className="pointer-events-none absolute inset-[1px] rounded-[calc(1.7rem-2px)] border border-[#f8e6bd]/35" />

        <p className="relative font-serif text-xs uppercase tracking-[0.25em] text-[#b38224] md:text-sm">{date}</p>
        <h3 className="relative mt-2 font-serif text-[1.35rem] leading-tight text-[#2f2616] md:text-[1.8rem]">{title}</h3>
        <p className="relative mt-3 text-sm leading-relaxed text-[#5a4a36] md:text-[0.98rem]">{description}</p>
      </div>
    </article>
  );
}
