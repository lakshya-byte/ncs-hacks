'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

const TAGS = ['INNOVATION', 'COMMUNITY', 'ENGINEERING', 'LEADERSHIP'];

const REVEAL_LINES = [
  'From the divine forge of imagination, we shape bold digital realms with calm precision.',
  'Every idea is refined through craft, collaboration, and fearless experimentation.',
  'Welcome to the Kingdom of Nibble — where builders rise and innovation becomes legacy.',
];

export default function AboutNibble() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const revealElements = sectionRef.current.querySelectorAll<HTMLElement>('[data-reveal]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -10% 0px',
      }
    );

    revealElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#f8f6ef] text-[#151515]"
      aria-labelledby="nibble-heading"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(223,185,91,0.18),transparent_58%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.58)_0%,rgba(248,246,239,0.9)_42%,rgba(248,246,239,0.98)_100%)]" />
        <div className="absolute -top-28 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#dfb95b]/8 blur-3xl" />
      </div>

      <div className="pointer-events-none absolute inset-0 hidden md:block">
        {Array.from({ length: 8 }).map((_, index) => (
          <span
            key={index}
            className="absolute h-1.5 w-1.5 rounded-full bg-[#d0aa4c]/45"
            style={{
              left: `${10 + index * 11}%`,
              top: `${60 + (index % 3) * 8}%`,
              animation: `nibble-particle ${10 + (index % 4) * 2}s ease-in-out ${index * 0.7}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="container-main relative z-10 py-[120px]">
        <div className="mx-auto flex max-w-[760px] flex-col items-center text-center">
          <span className="nibble-reveal rounded-full border border-[#d4b15b]/45 bg-white/75 px-4 py-1 text-[11px] font-semibold tracking-[0.24em] text-[#9a7420] uppercase" data-reveal>
            Official Technical Society
          </span>

          <h2
            id="nibble-heading"
            className="nibble-gradient-heading nibble-reveal mt-5 text-[clamp(2rem,6vw,4.4rem)] leading-[1.06] font-semibold tracking-[0.08em] uppercase"
            data-reveal
            style={{ transitionDelay: '120ms' }}
          >
            The Kingdom of Nibble
          </h2>

          <p
            className="nibble-reveal mt-4 max-w-[620px] text-[clamp(1rem,2.2vw,1.28rem)] leading-relaxed tracking-[0.04em] text-[#3b3528]"
            data-reveal
            style={{ transitionDelay: '220ms' }}
          >
            A divine ground for dreamers, makers, and engineers to craft what comes next.
          </p>
        </div>

        <div
          className="nibble-reveal mt-14 flex justify-center"
          data-reveal
          style={{ transitionDelay: '320ms' }}
        >
          <div className="relative h-[240px] w-full max-w-[560px] overflow-hidden rounded-[28px] border border-[#d7b668]/45 bg-white/72 shadow-[0_20px_55px_rgba(126,97,30,0.16)] md:h-[300px]">
            <Image
              src="/aboutNibbleBackground.png"
              alt="Divine structure of the Kingdom of Nibble"
              fill
              sizes="(max-width: 768px) 100vw, 560px"
              className="object-cover object-top opacity-48"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.14)_0%,rgba(248,246,239,0.55)_70%,rgba(248,246,239,0.7)_100%)]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="nibble-structure flex h-28 w-28 items-center justify-center rounded-full border border-[#d4af58]/60 bg-[#f6edd8]/88 text-3xl text-[#9a7420] shadow-[0_0_38px_rgba(212,175,88,0.24)] md:h-36 md:w-36 md:text-4xl">
                ✦
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 md:gap-4">
          {TAGS.map((tag, index) => (
            <span
              key={tag}
              className="nibble-reveal inline-flex min-w-[140px] justify-center rounded-full border border-[#d2ae58]/45 bg-white/78 px-5 py-2 text-xs font-semibold tracking-[0.17em] text-[#73581e] uppercase"
              data-reveal
              style={{ transitionDelay: `${430 + index * 80}ms` }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mx-auto mt-14 max-w-[600px] space-y-4 text-center">
          {REVEAL_LINES.map((line, index) => (
            <p
              key={line}
              className="nibble-reveal text-[clamp(1rem,2vw,1.12rem)] leading-relaxed text-[#252018]"
              data-reveal
              style={{ transitionDelay: `${760 + index * 130}ms` }}
            >
              {line}
            </p>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <a
            href="#tracks"
            className="nibble-reveal rounded-full border border-[#cda94d] bg-[#20170a] px-8 py-3 text-sm font-semibold tracking-[0.18em] text-[#f6df9e] uppercase shadow-[0_10px_24px_rgba(32,23,10,0.24)] transition hover:-translate-y-0.5 hover:bg-[#2b1f0b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af58] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f8f6ef]"
            data-reveal
            style={{ transitionDelay: '1080ms' }}
          >
            Ascend to the Kingdom
          </a>
        </div>
      </div>
    </section>
  );
}
