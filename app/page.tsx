'use client';

import dynamic from 'next/dynamic';
import LoadingScreen from './components/ui/LoadingScreen';

// Dynamic import with no SSR — canvas + GSAP are client-only
const AsgardCanvas = dynamic(() => import('./components/Hero/AsgardCanvas'), {
  ssr: false,
  loading: () => <LoadingScreen />,
});
const CinematicOverlay = dynamic(() => import('./components/Hero/CinematicOverlay'), {
  ssr: false,
  loading: () => <LoadingScreen />,
});
const ParticleOverlay = dynamic(() => import('./components/Hero/ParticleOverlay'), {
  ssr: false,
  loading: () => <LoadingScreen />,
});
const AboutNibble = dynamic(() => import('./components/aboutNibble/AboutNibble'), {
  ssr: false,
  loading: () => <LoadingScreen />,
});
const HackathonTracks = dynamic(() => import('./components/tracks/Tracks'), {
  ssr: false,
});
const Timeline = dynamic(() => import('./components/timeline/Timeline'), {
  ssr: false,
});
const PhotoStream = dynamic(() => import('./components/previous/PhotoStream'), {
  ssr: false,
});
const Sponsors = dynamic(() => import('./components/sponsors/Sponsors'), {
  ssr: false,
});
const CallToAction = dynamic(() => import('./components/CTA/CallToAction'), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      {/* Scroll container — creates scroll height for GSAP ScrollTrigger */}
      <div id="home">
        <div
          id="scroll-container"
          className="relative h-[900vh] w-full z-[1]"
        >
          <div className="sticky top-0 left-0 w-full h-[100dvh] overflow-hidden bg-black">
            {/* Cinematic canvas + overlay */}
            <AsgardCanvas />
            <CinematicOverlay />
            <ParticleOverlay />
          </div>
        </div>
      </div>

      {/* Content below hero */}
      <div className="relative z-20">
        <section id="about">
          <AboutNibble />
        </section>
        <section id="tracks">
          <HackathonTracks />
        </section>
        <section id="timeline">
          <Timeline />
        </section>
        <section id="sponsors">
          <PhotoStream />
          <Sponsors />
        </section>
        <CallToAction />
      </div>
    </>
  );
}
