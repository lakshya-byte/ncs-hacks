'use client';

import React from 'react';

type TimelineCardProps = {
  title: string;
  date: string;
  description: string;
  side: 'left' | 'right';
  isActive: boolean;
  isMobile?: boolean;
};

export default function TimelineCard({ title, date, description, side, isActive, isMobile = false }: TimelineCardProps) {
  const alignClass = side === 'left' ? 'text-right' : 'text-left';

  if (isMobile) {
    return (
      <article className="relative rounded-[1.5rem] border border-[#d4af66]/55 bg-[linear-gradient(145deg,rgba(255,255,255,0.88),rgba(254,247,229,0.7))] p-5 shadow-[0_18px_45px_rgba(155,117,39,0.18)] backdrop-blur-xl">
        <p className="font-serif text-xs uppercase tracking-[0.24em] text-[#b38224]">{date}</p>
        <h3 className="mt-2 font-serif text-xl text-[#2f2618]">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-[#5a4b37]">{description}</p>
      </article>
    );
  }

  return (
    <article
      className={`relative w-[min(430px,90%)] rounded-[1.8rem] border p-8 backdrop-blur-2xl transition-all duration-500 ${alignClass} ${
        isActive
          ? 'translate-y-0 scale-100 opacity-100 border-[#dab66d]/80 bg-[linear-gradient(145deg,rgba(255,255,255,0.9),rgba(254,245,220,0.72))] shadow-[0_26px_70px_rgba(168,125,42,0.24)]'
          : 'translate-y-10 scale-95 opacity-25 border-[#d7bc85]/35 bg-[linear-gradient(145deg,rgba(255,255,255,0.7),rgba(255,250,238,0.45))]'
      }`}
    >
      <span
        className={`absolute top-1/2 h-[18px] w-[18px] -translate-y-1/2 rotate-45 border-[#d7bc85]/70 bg-white/80 ${
          side === 'left' ? '-right-[10px] border-r border-t' : '-left-[10px] border-b border-l'
        }`}
      />
      <p className="font-serif text-sm uppercase tracking-[0.25em] text-[#b38224]">{date}</p>
      <h3 className="mt-3 font-serif text-[1.85rem] leading-tight text-[#302716]">{title}</h3>
      <p className="mt-3 text-[0.98rem] leading-relaxed text-[#5c4d38]">{description}</p>
    </article>
  );
}
