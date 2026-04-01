"use client";

import dynamic from "next/dynamic";
import LoadingScreen from "./components/ui/LoadingScreen";

// HERO SYSTEM
const AsgardCanvas = dynamic(() => import("./components/Hero/AsgardCanvas"), {
  ssr: false,
  loading: () => <LoadingScreen />,
});
const CinematicOverlay = dynamic(
  () => import("./components/Hero/CinematicOverlay"),
  { ssr: false, loading: () => <LoadingScreen /> }
);
const ParticleOverlay = dynamic(
  () => import("./components/Hero/ParticleOverlay"),
  { ssr: false, loading: () => <LoadingScreen /> }
);

// CORE SECTIONS
const AboutNibble = dynamic(() => import("./components/aboutNibble/AboutNibble"), { ssr: false });
const HackathonTracks = dynamic(() => import("./components/tracks/Tracks"), { ssr: false });
const TimelineSection = dynamic(() => import("./components/timeline/TimelineSection"), { ssr: false });
const PhotoStream = dynamic(() => import("./components/memories/PhotoStream"), { ssr: false });
const Sponsors = dynamic(() => import("./components/sponsors/Sponsors"), { ssr: false });
const WinnersSection = dynamic(() => import("./components/prizes/WinnersSection"), { ssr: false });
const FAQSection = dynamic(() => import("./components/faq/FaqSection"), { ssr: false });
const CallToAction = dynamic(() => import("./components/CTA/CallToAction"), { ssr: false });

const Mascot = dynamic(() => import("./components/mascot/Mascot"), { ssr: false });

export default function Home() {
  return (
    <>
      {/* ================= HERO (CINEMATIC ENTRY) ================= */}
      <section id="hero" className="relative">
        <div id="scroll-container" className="relative h-[900vh] w-full">
          <div className="sticky top-0 left-0 w-full h-[100dvh] overflow-hidden bg-black">
            <AsgardCanvas />
            <CinematicOverlay />
            <ParticleOverlay />
          </div>
        </div>
      </section>

      {/* ================= MAIN EXPERIENCE ================= */}
      <main className="relative z-20 bg-[#f5f0e6]">

        {/* 🧭 ANNOUNCEMENT / SOCIAL PROOF */}
        <section id="announcement" className="py-32">
          <PhotoStream />
        </section>

        {/* 🏛️ KINGDOM / ABOUT — sticky scroll story, no outer padding needed */}
        <section id="kingdom">
          <AboutNibble />
        </section>

        {/* 🌍 TRACKS */}
        <section id="tracks" className="py-40">
          <HackathonTracks />
        </section>

        {/* 🧭 TIMELINE */}
        <section id="timeline" className="py-40">
          <TimelineSection />
        </section>

        {/* 🏆 WINNERS (DIVINE TREASURES) */}
        <section id="winners" className="py-48 relative">
          {/* Optional divider glow */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-transparent via-[#e8dcc3]/40 to-transparent pointer-events-none" />
          <WinnersSection />
        </section>

        {/* 📜 FAQ (DIVINE KNOWLEDGE) */}
        <section id="faq" className="py-40 relative">
          {/* separation from winners */}
          <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-transparent via-[#e8dcc3]/30 to-transparent pointer-events-none" />
          <FAQSection />
        </section>

        {/* 🤝 SPONSORS */}
        <section id="sponsors" className="py-40">
          <div id="team" />
          <Sponsors />
        </section>

        {/* 🚀 CTA (ASCENSION MOMENT) */}
        <CallToAction />

      </main>

      {/* 🤖 GLOBAL MASCOT SYSTEM */}
      <Mascot />
    </>
  );
}
