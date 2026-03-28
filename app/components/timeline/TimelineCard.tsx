'use client';

import React, { useRef, useState } from 'react';

type TimelineCardProps = {
  title: string;
  date: string;
  description: string;
  side: 'left' | 'right';
  className?: string;
};

export default function TimelineCard({ title, date, description, side, className = '' }: TimelineCardProps) {
  const isLeft = side === 'left';
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -8; // max 8 deg tilt
    const rotateY = ((x - centerX) / centerX) * 8;
    
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <article 
      className={`relative w-full perspective-[1200px] ${className}`}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`relative flex flex-col justify-center overflow-hidden rounded-[2rem] border-[2px] border-[#d4af37]/50 bg-white/40 p-8 backdrop-blur-[24px] transition-[transform,border-color,box-shadow,background-color] duration-300 ease-out hover:border-[#d4af37]/80 hover:bg-white/50 md:p-12 md:px-14 ${
          isLeft ? 'items-start text-left md:items-end md:text-right' : 'items-start text-left md:items-start md:text-left'
        }`}
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          boxShadow: '0 16px 40px -10px rgba(218,165,32,0.15), inset 0 2px 0 rgba(255,255,255,0.7)',
        }}
      >
        {/* Soft Background Radial Glow inside the card */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.8),transparent_60%)] opacity-70" />

        {/* Inner Gold Accent Shine */}
        <div className="pointer-events-none absolute inset-0 rounded-[inherit] border border-[#f8e6bd]/40" />

        {/* Dynamic Highlight tied to mouse tilt! */}
        <div 
          className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/0 via-white/40 to-white/0 transition-opacity duration-300"
          style={{ opacity: (Math.abs(rotation.x) + Math.abs(rotation.y)) > 2 ? 1 : 0 }}
        />

        {/* Text Container: Full width respecting padding natively. Removes hardcoded widths that risked shifting. */}
        <div className="relative z-10 flex min-w-0 w-full flex-col gap-3 break-words">
          <p className="font-serif text-[0.7rem] font-bold uppercase tracking-[0.2em] text-[#b38224] md:text-xs">
            {date}
          </p>
          <h3 
            className="text-3xl leading-none text-[#2f2616] md:text-[2.75rem]" 
            style={{ fontFamily: 'var(--font-skranji), system-ui, sans-serif' }}
          >
            {title}
          </h3>
          <p 
            className="mt-1 text-sm font-light leading-relaxed tracking-wide text-[#5a4a36] text-balance md:text-base" 
            style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
          >
            {description}
          </p>
        </div>
      </div>
    </article>
  );
}

