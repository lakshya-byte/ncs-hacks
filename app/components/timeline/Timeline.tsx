'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const timelineData = [
  {
    id: 1,
    title: 'Registration Opens',
    date: '1 April',
    description: "The Bifröst bridge summons the worthy. Submit your entry to the Allfather's council and begin your journey to Valhalla's halls of innovation.",
    rune: 'ᚱ',
    side: 'right',
  },
  {
    id: 2,
    title: 'Problem Statement Release',
    date: '14 April',
    description: 'The ancient scrolls unfold. Decode the divine challenges passed down by Odin himself. Prepare your strategy for the impending battles of intellect.',
    rune: 'ᚹ',
    side: 'left',
  },
  {
    id: 3,
    title: 'Submission Phase',
    date: '14–20 April',
    description: 'The forge of Nidavellir burns hot. Gather your party and craft your magnum opus. Let your code thunder across the nine realms.',
    rune: 'ᚺ',
    side: 'right',
  },
  {
    id: 4,
    title: 'Online Evaluation',
    date: '21 April',
    description: 'Seek the counsel of the Valkyries and wise seers. Present your creations for guidance and tempering into divine artifacts.',
    rune: 'ᛗ',
    side: 'left',
  },
  {
    id: 5,
    title: 'Offline Hackathon',
    date: '24 April',
    description: 'Gather in the great golden halls. The final battle of wits begins. Code alongside the bravest warriors in the realm of Asgard.',
    rune: 'ᛃ',
    side: 'right',
  },
  {
    id: 6,
    title: 'Final Presentations',
    date: '25 April',
    description: "Stand before the high council of Asgard. Demonstrate your creation's power, let your voice echo through the great golden halls.",
    rune: 'ᚷ',
    side: 'left',
  },
  {
    id: 7,
    title: 'Winner Announcement',
    date: '25 April',
    description: 'The feast of victory awaits. Reclaim your rightful place among the elite. The champions shall be immortalized in the stars.',
    rune: 'ᛟ',
    side: 'right',
  },
] as const;

const TOP_START = 14;
const TOP_END = 86;

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const nodePositions = useMemo(() => {
    const step = (TOP_END - TOP_START) / (timelineData.length - 1);
    return timelineData.map((_, idx) => TOP_START + idx * step);
  }, []);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(max-width: 767px)', () => {
      setIsMobile(true);
      setProgress(0);
      setActiveIndex(0);
    });

    mm.add('(min-width: 768px)', () => {
      setIsMobile(false);

      const trigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          const currentProgress = self.progress;
          setProgress((prev) => (Math.abs(prev - currentProgress) > 0.001 ? currentProgress : prev));

          const nextIndex = Math.min(timelineData.length - 1, Math.floor(currentProgress * timelineData.length));
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
      className={`relative w-full bg-[radial-gradient(ellipse_at_top,rgba(255,233,173,0.36)_0%,rgba(250,250,248,0.98)_40%,#f6f4ee_100%)] ${isMobile ? 'py-16' : 'h-[360vh]'}`}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes runePulse {
              0% { transform: scale(1); opacity: 0.4; }
              60% { transform: scale(1.45); opacity: 0; }
              100% { transform: scale(1.45); opacity: 0; }
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
            <div className="absolute left-6 top-4 bottom-4 w-[2px] bg-gradient-to-b from-[#f1ddb5] via-[#d9b96e] to-[#f1ddb5]" />
            <div className="space-y-8 pl-16 pr-2">
              {timelineData.map((stage, idx) => (
                <div key={stage.id} className="relative rounded-2xl border border-[#d6b26a]/45 bg-white/75 p-5 shadow-[0_16px_40px_rgba(159,123,49,0.16)] backdrop-blur-xl">
                  <span className="absolute -left-[2.8rem] top-6 grid h-9 w-9 place-items-center rounded-full border border-[#d6b26a]/80 bg-[#fff6df] text-[#906718] shadow-[0_0_16px_rgba(212,175,55,0.45)]">
                    {stage.rune}
                  </span>
                  <p className="mb-2 font-serif text-sm uppercase tracking-[0.22em] text-[#aa7b1f]">{stage.date}</p>
                  <h3 className="font-serif text-xl tracking-wide text-[#2f2a1f]">{stage.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#554c3f]">{stage.description}</p>
                  {idx !== timelineData.length - 1 && <div className="pointer-events-none absolute -bottom-4 left-6 h-4 w-px bg-[#d6b26a]/55" />}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="site-container relative h-full">
            <div className="pointer-events-none absolute inset-0">
              <div
                className="absolute left-1/2 w-[420px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,224,151,0.32),transparent_67%)] transition-all duration-500"
                style={{
                  top: `calc(${activeGlowTop}% - 210px)`,
                  height: '420px',
                }}
              />
            </div>

            <div className="pointer-events-none absolute left-1/2 top-[10%] h-[80%] w-[30px] -translate-x-1/2 rounded-full bg-gradient-to-b from-[#fff8d8]/80 via-[#e4c47d]/70 to-[#fff8d8]/80 blur-[7px]" />
            <div className="pointer-events-none absolute left-1/2 top-[10%] h-[80%] w-[12px] -translate-x-1/2 rounded-full border border-[#cfaa54]/50 bg-[repeating-linear-gradient(to_bottom,rgba(123,86,23,0.2)_0px,rgba(123,86,23,0.2)_2px,rgba(255,255,255,0)_2px,rgba(255,255,255,0)_10px)]" />
            <div className="pointer-events-none absolute left-1/2 top-[10%] h-[80%] w-[4px] -translate-x-1/2 rounded-full bg-[#fffdf7]/80" />
            <div
              className="pointer-events-none absolute left-1/2 top-[10%] w-[8px] -translate-x-1/2 rounded-full bg-[linear-gradient(to_top,#ffe39d_0%,#fffbec_60%,#fff_100%)] shadow-[0_0_20px_rgba(238,192,95,0.7),0_0_45px_rgba(241,201,120,0.5)]"
              style={{ height: `${Math.max(4, progress * 80)}%` }}
            />

            {timelineData.map((stage, idx) => {
              const nodeTop = nodePositions[idx];
              const isActive = idx === activeIndex;

              return (
                <div key={stage.id} className="absolute left-0 top-0 h-full w-full">
                  <div className="absolute left-1/2 w-full -translate-x-1/2" style={{ top: `${nodeTop}%`, transform: 'translateY(-50%)' }}>
                    <div className="relative flex items-center justify-center">
                      <div className={`flex w-1/2 ${stage.side === 'left' ? 'justify-end pr-14' : 'justify-end pr-24'}`}>
                        {stage.side === 'left' ? (
                          <article
                            className={`relative max-w-[430px] rounded-3xl border bg-white/72 p-8 text-right backdrop-blur-2xl transition-all duration-500 ${
                              isActive
                                ? 'translate-y-0 scale-100 opacity-100 border-[#d7b36a]/70 shadow-[0_20px_60px_rgba(170,130,40,0.24)]'
                                : 'translate-y-4 scale-[0.97] opacity-0 border-[#d7b36a]/35 pointer-events-none'
                            }`}
                          >
                            <span className="absolute -right-[9px] top-1/2 h-[18px] w-[18px] -translate-y-1/2 rotate-45 border-r border-t border-[#d7b36a]/60 bg-white/80" />
                            <p className="font-serif text-sm uppercase tracking-[0.22em] text-[#ad7e20]">{stage.date}</p>
                            <h3 className="mt-3 font-serif text-[1.8rem] leading-tight text-[#2e281d]">{stage.title}</h3>
                            <p className="mt-3 text-[0.97rem] leading-relaxed text-[#595041]">{stage.description}</p>
                          </article>
                        ) : (
                          <span className={`font-serif text-sm uppercase tracking-[0.24em] text-[#ad7e20] transition-opacity duration-400 ${isActive ? 'opacity-100' : 'opacity-35'}`}>
                            {stage.date}
                          </span>
                        )}
                      </div>

                      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div
                          className={`relative grid place-items-center rounded-full border bg-[radial-gradient(circle_at_30%_25%,#fffdf5_0%,#f4deaa_55%,#d8b565_100%)] text-[#7d5514] transition-all duration-500 ${
                            isActive
                              ? 'h-[78px] w-[78px] scale-100 border-[#f1cd80] shadow-[0_0_25px_rgba(224,173,72,0.7),0_0_55px_rgba(231,194,118,0.45)]'
                              : 'h-[52px] w-[52px] scale-95 border-[#d2ac5f]/70 opacity-50'
                          }`}
                        >
                          {isActive && (
                            <span
                              className="absolute inset-0 rounded-full border border-[#f8dc9d]/70"
                              style={{ animation: 'runePulse 1.5s ease-out infinite' }}
                            />
                          )}
                          <span className={`${isActive ? 'text-[2rem]' : 'text-[1.35rem]'} font-serif leading-none drop-shadow-[0_0_8px_rgba(255,241,203,0.9)]`}>
                            {stage.rune}
                          </span>
                        </div>
                      </div>

                      <div className={`flex w-1/2 ${stage.side === 'right' ? 'justify-start pl-14' : 'justify-start pl-24'}`}>
                        {stage.side === 'right' ? (
                          <article
                            className={`relative max-w-[430px] rounded-3xl border bg-white/72 p-8 backdrop-blur-2xl transition-all duration-500 ${
                              isActive
                                ? 'translate-y-0 scale-100 opacity-100 border-[#d7b36a]/70 shadow-[0_20px_60px_rgba(170,130,40,0.24)]'
                                : 'translate-y-4 scale-[0.97] opacity-0 border-[#d7b36a]/35 pointer-events-none'
                            }`}
                          >
                            <span className="absolute -left-[9px] top-1/2 h-[18px] w-[18px] -translate-y-1/2 rotate-45 border-b border-l border-[#d7b36a]/60 bg-white/80" />
                            <p className="font-serif text-sm uppercase tracking-[0.22em] text-[#ad7e20]">{stage.date}</p>
                            <h3 className="mt-3 font-serif text-[1.8rem] leading-tight text-[#2e281d]">{stage.title}</h3>
                            <p className="mt-3 text-[0.97rem] leading-relaxed text-[#595041]">{stage.description}</p>
                          </article>
                        ) : (
                          <span className={`font-serif text-sm uppercase tracking-[0.24em] text-[#ad7e20] transition-opacity duration-400 ${isActive ? 'opacity-100' : 'opacity-35'}`}>
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
