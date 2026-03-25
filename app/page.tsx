'use client';

import dynamic from 'next/dynamic';

// Dynamic import with no SSR — canvas + GSAP are client-only
const AsgardCanvas = dynamic(() => import('./components/AsgardCanvas'), {
  ssr: false,
});
const CinematicOverlay = dynamic(() => import('./components/CinematicOverlay'), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      {/* Fixed cinematic canvas + overlay */}
      <AsgardCanvas />
      <CinematicOverlay />

      {/* Scroll container — creates scroll height for GSAP ScrollTrigger */}
      <div
        id="scroll-container"
        style={{
          position: 'relative',
          height: '600vh', // 6× viewport = long scrollable distance
          width: '100%',
        }}
      />
    </>
  );
}
