'use client';

import React, { useEffect, useRef, useState } from 'react';
import TimelineSpine from './TimelineSpine';
import TimelineCard from './TimelineCard';

const timelineData = [
  {
    id: 1,
    title: 'Registration Opens',
    date: '1 April',
    description: "The Bifröst bridge summons the worthy. Submit your entry to the Allfather's council and begin your journey to Valhalla's halls of innovation.",
    rune: 'ᚱ',
    side: 'right' as const,
  },
  {
    id: 2,
    title: 'Problem Statement Release',
    date: '14 April',
    description: 'The ancient scrolls unfold. Decode the divine challenges passed down by Odin himself. Prepare your strategy for the impending battles of intellect.',
    rune: 'ᚹ',
    side: 'left' as const,
  },
  {
    id: 3,
    title: 'Submission Phase',
    date: '14–20 April',
    description: 'The forge of Nidavellir burns hot. Gather your party and craft your magnum opus. Let your code thunder across the nine realms.',
    rune: 'ᚺ',
    side: 'right' as const,
  },
  {
    id: 4,
    title: 'Online Evaluation',
    date: '21 April',
    description: 'Seek the counsel of the Valkyries and wise seers. Present your creations for guidance and tempering into divine artifacts.',
    rune: 'ᛗ',
    side: 'left' as const,
  },
  {
    id: 5,
    title: 'Offline Hackathon',
    date: '24 April',
    description: 'Gather in the great golden halls. The final battle of wits begins. Code alongside the bravest warriors in the realm of Asgard.',
    rune: 'ᛃ',
    side: 'right' as const,
  },
  {
    id: 6,
    title: 'Final Presentations',
    date: '25 April',
    description: "Stand before the high council of Asgard. Demonstrate your creation's power, let your voice echo through the great golden halls.",
    rune: 'ᚷ',
    side: 'left' as const,
  },
  {
    id: 7,
    title: 'Winner Announcement',
    date: '25 April',
    description: 'The feast of victory awaits. Reclaim your rightful place among the elite. The champions shall be immortalized in the stars.',
    rune: 'ᛟ',
    side: 'right' as const,
  },
] as const;

const CARD_REVEAL_THRESHOLD = 0.32;
const CARD_REVEAL_ROOT_MARGIN = '0px 0px -10% 0px';
const MAX_SCROLL_SPEED_BOOST = 1.8;
const SCROLL_DELTA_NORMALIZER = 16;
const FLOW_SPEED_LERP_FACTOR = 0.18;
const FLOW_SPEED_SETTLE_DELAY_MS = 130;
const PARTICLE_BASE_LEFT = 42;
const PARTICLE_LEFT_STEP = 11;
const PARTICLE_LEFT_RANGE = 22;
const PARTICLE_COUNT = 14;

export default function TimelineSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [visibleCards, setVisibleCards] = useState<boolean[]>(() => timelineData.map(() => false));
  const [activeIndex, setActiveIndex] = useState(0);
  const [flowSpeed, setFlowSpeed] = useState(1);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const updateMobileState = () => setIsMobile(mediaQuery.matches);
    updateMobileState();
    mediaQuery.addEventListener('change', updateMobileState);

    return () => mediaQuery.removeEventListener('change', updateMobileState);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleCards((previous) => {
          const next = [...previous];
          let didChange = false;

          for (const entry of entries) {
            const idx = Number((entry.target as HTMLElement).dataset.timelineIndex);
            if (Number.isNaN(idx)) {
              if (process.env.NODE_ENV === 'development') {
                console.warn('Timeline card missing valid data-timeline-index');
              }
              continue;
            }

            if (entry.isIntersecting && !next[idx]) {
              next[idx] = true;
              didChange = true;
            }
          }

          if (!didChange) return previous;

          const lastVisible = next.reduce((acc, seen, idx) => (seen ? idx : acc), 0);
          setActiveIndex(lastVisible);

          return next;
        });
      },
      {
        root: null,
        threshold: CARD_REVEAL_THRESHOLD,
        rootMargin: CARD_REVEAL_ROOT_MARGIN,
      },
    );

    for (const card of cardRefs.current) {
      if (card) observer.observe(card);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let lastY = window.scrollY;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const onScroll = () => {
      const currentY = window.scrollY;
      const delta = Math.abs(currentY - lastY);
      lastY = currentY;

      const speedBoost = Math.min(MAX_SCROLL_SPEED_BOOST, delta / SCROLL_DELTA_NORMALIZER);
      setFlowSpeed((prev) => prev + (1 + speedBoost - prev) * FLOW_SPEED_LERP_FACTOR);

      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        setFlowSpeed((prev) => prev + (1 - prev) * FLOW_SPEED_LERP_FACTOR);
      }, FLOW_SPEED_SETTLE_DELAY_MS);
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top,rgba(255,236,187,0.48)_0%,rgba(252,250,244,0.98)_42%,#f5f1e7_100%)] py-28 md:py-36"
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes runePulse {
              0% { transform: scale(0.95); opacity: 0.5; }
              70% { transform: scale(1.35); opacity: 0; }
              100% { transform: scale(1.35); opacity: 0; }
            }
            @keyframes spineRiver {
              0% { transform: translateY(100%); }
              100% { transform: translateY(-100%); }
            }
            @keyframes spineStreak {
              0% { transform: translateY(100%); }
              100% { transform: translateY(-100%); }
            }
            @keyframes spinePulse {
              0%, 100% { opacity: 0.42; }
              50% { opacity: 0.86; }
            }
            @keyframes cardFloat {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-8px); }
            }
            @keyframes borderShine {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            @keyframes cloudDriftLeft {
              0% { transform: translate3d(0, 0, 0); }
              100% { transform: translate3d(-6%, -4%, 0); }
            }
            @keyframes cloudDriftRight {
              0% { transform: translate3d(0, 0, 0); }
              100% { transform: translate3d(8%, 5%, 0); }
            }
            @keyframes nodeBurst {
              0% { transform: scale(0.6); opacity: 0; }
              25% { opacity: 0.7; }
              100% { transform: scale(1.45); opacity: 0; }
            }
            @keyframes particleRise {
              0% { transform: translateY(36px) scale(0.95); opacity: 0; }
              10% { opacity: 0.55; }
              100% { transform: translateY(-52px) scale(1.15); opacity: 0; }
            }
          `,
        }}
      />

      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -left-[16%] top-[10%] h-[45vh] w-[52vw] rounded-full bg-white/35 blur-3xl" style={{ animation: 'cloudDriftLeft 20s ease-in-out infinite alternate' }} />
        <div className="absolute -right-[14%] top-[35%] h-[48vh] w-[50vw] rounded-full bg-[#fff5db]/65 blur-3xl" style={{ animation: 'cloudDriftRight 24s ease-in-out infinite alternate' }} />
        <div className="absolute left-1/2 top-0 h-full w-[420px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(255,223,154,0.38),rgba(255,223,154,0)_70%)]" />

        {[...Array(PARTICLE_COUNT)].map((_, idx) => {
          const left = PARTICLE_BASE_LEFT + ((idx * PARTICLE_LEFT_STEP) % PARTICLE_LEFT_RANGE);
          const delay = (idx * 0.55).toFixed(2);
          const duration = (4.8 + (idx % 4) * 0.7).toFixed(2);
          return (
            <span
              key={idx}
              className="absolute top-[calc(90%-20px)] h-[3px] w-[3px] rounded-full bg-[#f6ce7a]/70 blur-[0.4px]"
              style={{
                left: `${left}%`,
                animation: `particleRise ${duration}s linear ${delay}s infinite`,
              }}
            />
          );
        })}
      </div>

      <div className="site-container relative z-[1]">
        <TimelineSpine
          activeIndex={activeIndex}
          visibleNodes={visibleCards}
          runes={timelineData.map((item) => item.rune)}
          flowSpeed={flowSpeed}
          isMobile={isMobile}
        />

        <div className="relative">
          {timelineData.map((stage, idx) => {
            const isVisible = visibleCards[idx];
            const isActive = idx === activeIndex;

            return (
              <div
                key={stage.id}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                data-timeline-index={idx}
                className={`relative ${idx === 0 ? 'mt-6' : 'mt-28 md:mt-32'}`}
              >
                <div className={`flex ${isMobile ? 'justify-start pl-16 pr-2' : stage.side === 'left' ? 'justify-start pr-[calc(50%+100px)]' : 'justify-end pl-[calc(50%+100px)]'}`}>
                  <TimelineCard
                    title={stage.title}
                    date={stage.date}
                    description={stage.description}
                    side={stage.side}
                    isVisible={isVisible}
                    isActive={isActive}
                    isMobile={isMobile}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
