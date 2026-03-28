'use client';

import React from 'react';

// Sample placeholder data. Use 4-5 images per column so there's enough height to loop.
const IMAGES_COL_1 = [1, 2, 3, 4, 5];
const IMAGES_COL_2 = [6, 7, 8, 9, 10];
const IMAGES_COL_3 = [11, 12, 13, 14, 15];
const IMAGES_COL_4 = [16, 17, 18, 19, 20];
const IMAGES_COL_5 = [21, 22, 23, 24, 25];

export default function PhotoStream() {
  return (
    <section className="relative w-full h-[120vh] bg-[#FAFAF8] overflow-hidden flex items-center justify-center">
      
      {/* Dynamic Inline CSS for Infinite Scroll & Hover Pausing */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scrollUp {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes scrollDown {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
        .anim-scroll-up {
          animation: scrollUp linear infinite;
        }
        .anim-scroll-down {
          animation: scrollDown linear infinite;
        }
        .scroll-group:hover .anim-scroll-up,
        .scroll-group:hover .anim-scroll-down {
          animation-play-state: paused;
        }
      `}} />

      {/* Background Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(212,175,55,0.06)_0%,transparent_70%)] pointer-events-none" />

      {/* Grid Container */}
      <div className="container-main relative h-[150%] w-full grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-6 md:gap-8 py-10 rotate-[-2deg] scale-105">
        
        {/* Column 1 - UP */}
        <div className="relative h-full overflow-hidden scroll-group col-span-2 md:col-span-2 lg:col-span-2">
          <div className="flex flex-col gap-4 sm:gap-6 anim-scroll-up" style={{ animationDuration: '32s' }}>
            {/* Original Set */}
            {IMAGES_COL_1.map((id) => <PhotoCard key={`c1-a-${id}`} id={id} />)}
            {/* Duplicated Set for Loop Seamlessness */}
            {IMAGES_COL_1.map((id) => <PhotoCard key={`c1-b-${id}`} id={id} />)}
          </div>
        </div>

        {/* Column 2 - DOWN */}
        <div className="relative h-full overflow-hidden scroll-group col-span-2 md:col-span-2 lg:col-span-2">
          <div className="flex flex-col gap-4 sm:gap-6 anim-scroll-down" style={{ animationDuration: '45s' }}>
            {IMAGES_COL_2.map((id) => <PhotoCard key={`c2-a-${id}`} id={id} />)}
            {IMAGES_COL_2.map((id) => <PhotoCard key={`c2-b-${id}`} id={id} />)}
          </div>
        </div>

        {/* Column 3 - UP (Hidden on Mobile) */}
        <div className="relative h-full overflow-hidden scroll-group hidden md:block md:col-span-4 lg:col-span-2">
          <div className="flex flex-col gap-4 sm:gap-6 anim-scroll-up" style={{ animationDuration: '38s' }}>
            {IMAGES_COL_3.map((id) => <PhotoCard key={`c3-a-${id}`} id={id} />)}
            {IMAGES_COL_3.map((id) => <PhotoCard key={`c3-b-${id}`} id={id} />)}
          </div>
        </div>

        {/* Column 4 - DOWN (Hidden on Tablet) */}
        <div className="relative h-full overflow-hidden scroll-group hidden lg:block lg:col-span-3">
          <div className="flex flex-col gap-4 sm:gap-6 anim-scroll-down" style={{ animationDuration: '50s' }}>
            {IMAGES_COL_4.map((id) => <PhotoCard key={`c4-a-${id}`} id={id} />)}
            {IMAGES_COL_4.map((id) => <PhotoCard key={`c4-b-${id}`} id={id} />)}
          </div>
        </div>

        {/* Column 5 - UP (Hidden on Tablet) */}
        <div className="relative h-full overflow-hidden scroll-group hidden lg:block lg:col-span-3">
          <div className="flex flex-col gap-4 sm:gap-6 anim-scroll-up" style={{ animationDuration: '28s' }}>
            {IMAGES_COL_5.map((id) => <PhotoCard key={`c5-a-${id}`} id={id} />)}
            {IMAGES_COL_5.map((id) => <PhotoCard key={`c5-b-${id}`} id={id} />)}
          </div>
        </div>

      </div>

      {/* Top & Bottom Fade Masks - Creating the infinite stream illusion over the page edge */}
      <div className="absolute top-0 left-0 w-full h-[25vh] bg-gradient-to-b from-[#FAFAF8] via-[#FAFAF8]/80 to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 w-full h-[25vh] bg-gradient-to-t from-[#FAFAF8] via-[#FAFAF8]/80 to-transparent pointer-events-none z-10" />

      {/* Forefront Text Overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none w-full text-center">
        <h2 
          className="font-heading text-[#B8860B] tracking-wide leading-[1.1] drop-shadow-[0_0_30px_rgba(255,255,255,0.8)]"
          style={{ fontSize: 'clamp(3rem, 6vw, 6rem)' }}
        >
          Memories of Asgard
        </h2>
        <p className="mt-4 font-body text-xs tracking-[0.3em] uppercase text-[#B8860B]/80 font-medium bg-white/40 inline-block px-6 py-2 rounded-full backdrop-blur-md border border-[#D4AF37]/20 shadow-sm">
          A Legacy Forged in Code
        </p>
      </div>

    </section>
  );
}

// Sub-component for individual Image Placeholders
function PhotoCard({ id }: { id: number }) {
  // Vary aspect ratios pseudo-randomly for masonry-like organic flow
  const isTall = id % 3 === 0;

  return (
    <div 
      className={`relative w-full ${isTall ? 'aspect-[3/4]' : 'aspect-square'} rounded-3xl border border-[#D4AF37]/20 bg-gradient-to-br from-white/60 to-white/10 backdrop-blur-md shadow-[0_10px_30px_rgba(212,175,55,0.05)] overflow-hidden transition-all duration-700 ease-out hover:scale-[1.04] hover:shadow-[0_20px_40px_rgba(212,175,55,0.25)] hover:border-[#D4AF37]/50 group mx-auto cursor-pointer`}
    >
      <div className="absolute inset-4 rounded-xl overflow-hidden border border-[#FFD700]/10 flex items-center justify-center bg-white/20">
        <p className="font-body text-[10px] sm:text-xs tracking-[0.2em] uppercase text-[#B8860B]/60 text-center px-4 leading-relaxed group-hover:text-[#B8860B] transition-colors duration-500">
          Photo Slot <br/><span className="text-[8px] opacity-70">Memories</span>
        </p>
        
        {/* Subtle hover overlay shimmer */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      </div>
    </div>
  );
}
