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
      className={`relative w-full perspective-distant ${className}`}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full overflow-hidden rounded-4xl border-2 border-[#d4af37]/30 bg-[#121110]/60 p-6 md:px-12 md:py-10 backdrop-blur-md transition-[transform,border-color,box-shadow,background-color] duration-300 ease-out hover:border-[#d4af37]/80 hover:bg-[#1a1918]/80 shadow-2xl gpu-accelerate"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          boxShadow: '0 16px 60px -15px rgba(0,0,0,0.8), inset 0 2px 0 rgba(255,255,255,0.05)',
        }}
      >
        {/* Soft Background Radial Glow inside the card */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.05),transparent_60%)] opacity-30" />

        {/* Inner Gold Accent Shine */}
        <div className="pointer-events-none absolute inset-0 rounded-[inherit] border border-[#f8e6bd]/10" />

        {/* Dynamic Highlight tied to mouse tilt! */}
        <div
          className="pointer-events-none absolute inset-0 bg-linear-to-tr from-white/0 via-white/10 to-white/0 transition-opacity duration-300"
          style={{ opacity: (Math.abs(rotation.x) + Math.abs(rotation.y)) > 2 ? 1 : 0 }}
        />

        {/* Text Container */}
        <div
          className={`relative z-10 w-full wrap-break-word ${isLeft ? 'text-left md:text-right' : 'text-left md:text-left'}`}
          style={{ padding: 'clamp(1rem, 2vw, 2rem)' }}
        >
          <p className="font-body text-[0.8rem] font-bold uppercase tracking-[0.15em] text-[#b8860b] md:text-sm mb-3">
            {date}
          </p>
          <h3
            className="text-2xl font-bold leading-[1.15] text-white md:text-[2.2rem] lg:text-[2.6rem] mb-4 drop-shadow-md"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {title}
          </h3>
          <p
            className="text-sm font-medium leading-relaxed tracking-wide text-slate-300 md:text-[1.05rem] text-balance"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {description}
          </p>
        </div>
      </div>
    </article>
  );
}

