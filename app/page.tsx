'use client';

import dynamic from 'next/dynamic';
import AboutNibble from './components/aboutNibble/AboutNibble';


// Dynamic import with no SSR — canvas + GSAP are client-only
const AsgardCanvas = dynamic(() => import('./components/Hero/AsgardCanvas'), {
  ssr: false,
});
const CinematicOverlay = dynamic(() => import('./components/Hero/CinematicOverlay'), {
  ssr: false,
});
const ParticleOverlay = dynamic(() => import('./components/Hero/ParticleOverlay'), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      {/* Scroll container — creates scroll height for GSAP ScrollTrigger */}
      <div
        id="scroll-container"
        className="relative h-[900vh] w-full z-[1]"
      >
        <div className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-black">
          {/* Cinematic canvas + overlay */}
          <AsgardCanvas />
          <CinematicOverlay />
          <ParticleOverlay />
        </div>
      </div>

      {/* Content below hero */}
      <div className="relative z-20">
        <AboutNibble />
      </div>
    </>
  );
}
