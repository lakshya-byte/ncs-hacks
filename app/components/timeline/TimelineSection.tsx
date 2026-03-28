'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TimelineSpine from './TimelineSpine';
import TimelineCard from './TimelineCard';

gsap.registerPlugin(ScrollTrigger);

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

const TOP_START_PERCENT = 14;
const TOP_END_PERCENT = 86;
const DESKTOP_SCROLL_HEIGHT = 'h-[360vh]';
const PROGRESS_EPSILON = 0.001;

export default function TimelineSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const nodePositions = useMemo(() => {
    if (timelineData.length <= 1) return [50];
    const step = (TOP_END_PERCENT - TOP_START_PERCENT) / (timelineData.length - 1);
    return timelineData.map((_, idx) => TOP_START_PERCENT + idx * step);
  }, []);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(max-width: 767px)', () => {
      setIsMobile(true);
      setProgress(1);
      setActiveIndex(0);
    });

    mm.add('(min-width: 768px)', () => {
      setIsMobile(false);
      setProgress(0);
      setActiveIndex(0);

      const trigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          const currentProgress = self.progress;
          setProgress((prev) => (Math.abs(prev - currentProgress) > PROGRESS_EPSILON ? currentProgress : prev));

          const scaled = currentProgress * (timelineData.length - 1);
          const nextIndex = Math.min(timelineData.length - 1, Math.max(0, Math.round(scaled)));
          setActiveIndex((prev) => (prev !== nextIndex ? nextIndex : prev));
        },
      });

      return () => {
        trigger.kill();
      };
    });

    return () => mm.revert();
  }, []);

  const activeGlowTop = nodePositions[activeIndex];

  return (
    <section
      ref={sectionRef}
      className={`relative w-full bg-[radial-gradient(ellipse_at_top,rgba(255,236,187,0.38)_0%,rgba(252,250,244,0.98)_42%,#f5f1e7_100%)] ${isMobile ? 'py-16' : DESKTOP_SCROLL_HEIGHT}`}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes runePulse {
              0% { transform: scale(1); opacity: 0.42; }
              64% { transform: scale(1.4); opacity: 0; }
              100% { transform: scale(1.4); opacity: 0; }
            }
          `,
        }}
      />

      <div className={`${isMobile ? 'relative' : 'sticky top-0 h-screen'} overflow-hidden`}>
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-20 left-[-10%] h-[55vh] w-[55vw] rounded-full bg-white/55 blur-3xl" />
          <div className="absolute top-[26%] right-[-12%] h-[48vh] w-[45vw] rounded-full bg-[#fff8de]/80 blur-3xl" />
          <div className="absolute bottom-[-14%] left-1/3 h-[42vh] w-[34vw] rounded-full bg-white/45 blur-3xl" />
        </div>

        {isMobile ? (
          <div className="site-container relative">
            <TimelineSpine progress={progress} activeIndex={activeIndex} nodePositions={nodePositions} runes={timelineData.map((item) => item.rune)} isMobile />
            <div className="space-y-8 pl-16 pr-2">
              {timelineData.map((stage, idx) => (
                <div key={stage.id} className="relative">
                  <span className="absolute -left-[2.8rem] top-5 grid h-9 w-9 place-items-center rounded-full border border-[#d6b26a]/80 bg-[#fff6df] text-[#906718] shadow-[0_0_16px_rgba(212,175,55,0.45)]">
                    {stage.rune}
                  </span>
                  <TimelineCard
                    title={stage.title}
                    date={stage.date}
                    description={stage.description}
                    side={stage.side}
                    isActive={idx === activeIndex}
                    isMobile
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="site-container relative h-full">
            <div className="pointer-events-none absolute inset-0">
              <div
                className="absolute left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,225,154,0.36),transparent_67%)] transition-all duration-500"
                style={{ top: `calc(${activeGlowTop}% - 210px)` }}
              />
            </div>

            <TimelineSpine progress={progress} activeIndex={activeIndex} nodePositions={nodePositions} runes={timelineData.map((item) => item.rune)} />

            {timelineData.map((stage, idx) => {
              const nodeTop = nodePositions[idx];
              const isActive = idx === activeIndex;

              return (
                <div key={stage.id} className="absolute left-0 top-0 h-full w-full">
                  <div className="absolute left-1/2 w-full" style={{ top: `${nodeTop}%`, transform: 'translate(-50%, -50%)' }}>
                    <div className="relative flex items-center justify-center">
                      <div className={`flex w-1/2 ${stage.side === 'left' ? 'justify-end pr-14' : 'justify-end pr-24'}`}>
                        {stage.side === 'left' ? (
                          <TimelineCard title={stage.title} date={stage.date} description={stage.description} side="left" isActive={isActive} />
                        ) : (
                          <span className={`font-serif text-sm uppercase tracking-[0.24em] text-[#ad7e20] transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-35'}`}>
                            {stage.date}
                          </span>
                        )}
                      </div>

                      <div className={`flex w-1/2 ${stage.side === 'right' ? 'justify-start pl-14' : 'justify-start pl-24'}`}>
                        {stage.side === 'right' ? (
                          <TimelineCard title={stage.title} date={stage.date} description={stage.description} side="right" isActive={isActive} />
                        ) : (
                          <span className={`font-serif text-sm uppercase tracking-[0.24em] text-[#ad7e20] transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-35'}`}>
                            {stage.date}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
