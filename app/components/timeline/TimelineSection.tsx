"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TimelineSpine from "./TimelineSpine";
import TimelineCard from "./TimelineCard";

// Normally gsap.registerPlugin(ScrollTrigger) is safe at top level, but it is
// safest inside the component when dealing with Next.js router.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const timelineData = [
  {
    id: 1,
    title: "Registration Opens",
    date: "6 April",
    description:
      "Online via Devfolio. Provide team details. The Bifröst bridge summons the worthy. Submit your entry to the Allfather's council and begin your journey to Valhalla's halls of innovation.",
    rune: "ᚱ",
    side: "right" as const,
  },
  {
    id: 2,
    title: "Problem Statement Release",
    date: "6 April",
    description:
      "IDs shared on Devfolio. The ancient scrolls unfold. Decode the divine challenges passed down by Odin himself. Prepare your strategy for the impending battles of intellect.",
    rune: "ᚹ",
    side: "left" as const,
  },
  {
    id: 3,
    title: "Online Submission & Evaluation",
    date: "06–18 April",
    description:
      "Submit PPT + video explanation for online round judging. The forge of Nidavellir burns hot. Gather your party and craft your magnum opus. Let your code thunder across the nine realms.",
    rune: "ᚺ",
    side: "right" as const,
  },
  {
    id: 4,
    title: "Online Round Results",
    date: "21 April",
    description:
      "Top 25–30 teams selected for the final siege. The runes have spoken. The Allfather reveals the chosen warriors who shall advance to the halls of Asgard.",
    rune: "ᛗ",
    side: "left" as const,
  },
  {
    id: 5,
    title: "Offline Hackathon Begins",
    date: "24 April, 9 AM",
    description:
      "Check-in, badge & kit distribution followed by mentoring rounds. Enter the great golden halls. The final battle of wits begins alongside the bravest warriors.",
    rune: "ᛃ",
    side: "right" as const,
  },
  {
    id: 6,
    title: "Final Presentations",
    date: "25 April",
    description:
      "Presentation-based evaluation. Stand before the high council of Asgard. Demonstrate your creation's power, let your voice echo through the great golden halls.",
    rune: "ᚷ",
    side: "left" as const,
  },
  {
    id: 7,
    title: "Grand Finale & Results",
    date: "25 April",
    description:
      "Top 3 winners announced. Prize distribution ceremony. The feast of victory awaits. Reclaim your rightful place among the elite and be immortalized in the stars.",
    rune: "ᛟ",
    side: "right" as const,
  },
] as const;

export default function TimelineSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const lavaRef = useRef<HTMLDivElement>(null);

  // Use isomorphic effect for GSAP in Next.js to avoid hydration mismatch flashes
  const useSafeLayoutEffect =
    typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

  useSafeLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Lava Flow animation
      if (lavaRef.current) {
        gsap.set(lavaRef.current, { transformOrigin: 'top' });
        gsap.to(lavaRef.current, {
          scaleY: 1,
          transformOrigin: 'top',
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 40%",
            end: "bottom 80%",
            scrub: 1.5, // slightly smoothed scrub looks cinematic
          },
        });
      }

      // 2. Nodes and Cards entries
      const rows = gsap.utils.toArray<HTMLElement>(".timeline-row-trigger");
      const nodes = gsap.utils.toArray<HTMLElement>(".timeline-node-inner");
      const pulses = gsap.utils.toArray<HTMLElement>(".timeline-node-pulse");
      const cards = gsap.utils.toArray<HTMLElement>(".timeline-card");
      const runes = gsap.utils.toArray<HTMLElement>(".timeline-rune-text");

      rows.forEach((row, index) => {
        const node = nodes[index];
        const pulse = pulses[index];
        const card = cards[index];
        const runeText = runes[index];

        ScrollTrigger.create({
          trigger: row,
          start: "top 75%", // trigger when the row hits 75% of screen height
          onEnter: () => {
            // Node activation
            if (node && runeText) {
              gsap.to(node, {
                scale: 1,
                opacity: 1,
                borderColor: "#f7dca6",
                boxShadow:
                  "0 0 30px rgba(243,190,89,0.9), 0 0 62px rgba(236,177,54,0.52)",
                duration: 0.6,
                ease: "back.out(1.5)",
              });
              gsap.to(runeText, {
                scale: 1.2,
                duration: 0.6,
                ease: "back.out(1.5)",
              });
            }
            if (pulse) {
              gsap.to(pulse, { opacity: 1, duration: 0.4 });
              gsap.to(pulse, {
                scale: 1.5,
                opacity: 0,
                duration: 1.2,
                delay: 0.2,
                repeat: -1,
              });
            }

            // Card Entry
            if (card) {
              gsap.to(card, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: "power3.out",
              });
            }
          },
          onLeaveBack: () => {
            if (node && runeText) {
              gsap.to(node, {
                scale: 0.85,
                opacity: 0.5,
                borderColor: "rgba(206, 161, 90, 0.55)",
                boxShadow: "none",
                duration: 0.4,
              });
              gsap.to(runeText, { scale: 1, duration: 0.4 });
            }
            if (pulse) {
              gsap.killTweensOf(pulse);
              gsap.to(pulse, { opacity: 0, scale: 1, duration: 0.2 });
            }
            if (card) {
              gsap.to(card, {
                opacity: 0,
                y: 40,
                scale: 0.96,
                duration: 0.4,
              });
            }
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="timeline"
      className="relative w-full overflow-hidden bg-transparent py-32 md:py-48"
    >
      {/* Soft Particles & Clouds from original background */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(212,175,55,0.06) 0%, transparent 70%)',
        }}
      />
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Deep ambient glow around the spine */}
        <div className="absolute left-1/2 top-0 h-full w-[420px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(255,223,154,0.38),rgba(255,223,154,0)_70%)]" />

        {/* Dynamic Drifting Runes */}
        {[
          {
            char: "ᚨ",
            size: "2rem",
            top: "15%",
            left: "10%",
            anim: "runeDriftUp",
            dur: "45s",
            delay: "0s",
          },
          {
            char: "ᚲ",
            size: "3rem",
            top: "40%",
            left: "85%",
            anim: "runeDriftDown",
            dur: "55s",
            delay: "-10s",
          },
          {
            char: "ᚷ",
            size: "1.5rem",
            top: "65%",
            left: "15%",
            anim: "runeDriftUp",
            dur: "40s",
            delay: "-5s",
          },
          {
            char: "ᚹ",
            size: "2.5rem",
            top: "85%",
            left: "80%",
            anim: "runeDriftDown",
            dur: "60s",
            delay: "-20s",
          },
          {
            char: "ᛟ",
            size: "4rem",
            top: "25%",
            left: "75%",
            anim: "runeDriftUp",
            dur: "70s",
            delay: "-15s",
          },
        ].map((rune, i) => (
          <div
            key={`bg-rune-${i}`}
            className="absolute font-heading text-[6rem] text-[#D4AF37]/5 pointer-events-none select-none md:text-[10rem]"
            style={{
              top: rune.top,
              left: rune.left,
              fontSize: rune.size,
              animation: `${rune.anim} ${rune.dur} linear infinite ${rune.delay}`,
            }}
          >
            {rune.char}
          </div>
        ))}

        {/* Cinematic Film Grain Overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="site-container relative z-10 mx-auto max-w-[1400px]">
        <div className="flex flex-col items-center mb-20">
            <span className="mb-4 font-heading text-xs font-bold uppercase tracking-[0.4em] text-[#D4AF37] md:text-sm">
              The Path of Valor
            </span>
            <h2 className="text-center font-heading text-4xl font-black uppercase tracking-tight text-white md:text-7xl lg:text-8xl">
              Event <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(212,175,55,0.4)' }}>Timeline</span>
            </h2>
        </div>
        {/* The Grid Setup */}
        <div className="relative grid grid-cols-[80px_1fr] gap-y-24 md:grid-cols-[1fr_120px_1fr] md:gap-y-40" style={{ paddingTop: 'clamp(4rem, 8vw, 6rem)', paddingBottom: 'clamp(4rem, 8vw, 6rem)' }}>
          <TimelineSpine ref={lavaRef} />

          {timelineData.map((stage, idx) => {
            const isLeft = stage.side === "left";
            return (
              <React.Fragment key={stage.id}>
                {/* 1. Invisible trigger anchor spanning the full row */}
                <div
                  className="timeline-row-trigger pointer-events-none col-span-full h-0 w-full"
                  style={{ gridRow: idx + 1 }}
                />

                {/* 2. The Node / Rune */}
                <div
                  className="relative z-10 col-start-1 flex items-center justify-center md:col-start-2"
                  style={{ gridRow: idx + 1 }}
                >
                  <div className="timeline-node-inner relative flex h-[56px] w-[56px] scale-[0.85] items-center justify-center rounded-full border border-[#cea15a]/55 bg-[radial-gradient(circle_at_28%_24%,#fff8e9_0%,#ddb36f_62%,#9f6825_100%)] opacity-50 md:h-[72px] md:w-[72px]">
                    <span className="timeline-node-pulse absolute inset-[-4px] rounded-full border border-[#fae4bb]/70 opacity-0" />
                    <span className="timeline-rune-text font-accent text-[1.4rem] leading-none text-[#70480f] drop-shadow-[0_0_10px_rgba(255,242,203,0.92)] md:text-[1.8rem]">
                      {stage.rune}
                    </span>
                  </div>
                </div>

                {/* 3. The Card */}
                <div
                  className={`col-start-2 flex items-center ${isLeft
                      ? "md:col-start-1 md:justify-end"
                      : "md:col-start-3 md:justify-start"
                    }`}
                  style={{ gridRow: idx + 1 }}
                >
                  <div className={`w-full min-w-0 md:max-w-[540px] px-6 md:px-0 ${isLeft ? 'md:pr-10' : 'md:pl-10'}`}>
                    <TimelineCard
                      {...stage}
                      className="timeline-card pointer-events-auto -translate-y-[40px] scale-[0.96] opacity-0"
                    />
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes fogDriftLeft {
          0% { transform: translate3d(0, 0, 0) scale(1); }
          100% { transform: translate3d(-4%, -2%, 0) scale(1.05); }
        }
        @keyframes fogDriftRight {
          0% { transform: translate3d(0, 0, 0) scale(1); }
          100% { transform: translate3d(5%, 3%, 0) scale(1.03); }
        }
        @keyframes runeDriftUp {
          0% { transform: translateY(0) rotate(0deg); opacity: 0.03; }
          50% { opacity: 0.08; }
          100% { transform: translateY(-100px) rotate(15deg); opacity: 0.03; }
        }
        @keyframes runeDriftDown {
          0% { transform: translateY(0) rotate(0deg); opacity: 0.03; }
          50% { opacity: 0.07; }
          100% { transform: translateY(80px) rotate(-10deg); opacity: 0.03; }
        }
      `,
        }}
      />
    </section>
  );
}
