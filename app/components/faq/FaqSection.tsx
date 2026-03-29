'use client';

import { useMemo, useState } from 'react';

type FAQItem = {
  id: string;
  question: string;
  answer: string;
};

const ITEMS: FAQItem[] = [
  {
    id: 'eligibility',
    question: 'Who can participate in the hackathon?',
    answer:
      'Students, fresh graduates, and independent builders who can attend according to the event guidelines are welcome to join.',
  },
  {
    id: 'team-size',
    question: 'What is the ideal team size?',
    answer:
      'Most teams perform best with 2–4 members. Keep your team balanced across design, product thinking, and engineering execution.',
  },
  {
    id: 'tracks',
    question: 'Can we change tracks after starting?',
    answer:
      'Track switches are usually allowed early in the event window. Final confirmation and lock timings are announced by organizers.',
  },
  {
    id: 'submission',
    question: 'What must be included in the final submission?',
    answer:
      'A working demo, source repository, short write-up, and any required track-specific details listed in the official instructions.',
  },
  {
    id: 'judging',
    question: 'How will projects be judged?',
    answer:
      'Judges evaluate problem relevance, technical depth, execution quality, innovation, and presentation clarity.',
  },
];

export default function FaqSection() {
  const [activeId, setActiveId] = useState<string>(ITEMS[0].id);

  const activeIndex = useMemo(
    () => ITEMS.findIndex((item) => item.id === activeId),
    [activeId],
  );

  return (
    <section id="faq" className="section-main relative bg-[#f8f4ea]">
      <div className="container-main">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-heading text-center text-3xl tracking-[0.16em] text-[#5b3a08] uppercase md:text-5xl">
            FAQ Scrolls
          </h2>
          <p className="mt-3 text-center text-sm tracking-wide text-[#6a4a1c] md:text-base">
            Ancient knowledge lies within these scrolls.
          </p>

          <div className="mt-10 space-y-3">
            {ITEMS.map((item, index) => {
              const active = item.id === activeId;
              return (
                <article
                  key={item.id}
                  className={`faq-card rounded-2xl border p-4 transition-all md:p-5 ${
                    active
                      ? 'border-amber-300/90 bg-white/80 shadow-[0_14px_38px_rgba(119,79,14,0.16)]'
                      : 'border-amber-200/60 bg-white/55'
                  }`}
                  data-faq-active={active ? 'true' : 'false'}
                  data-mascot-context="important"
                >
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 text-left"
                    aria-expanded={active}
                    onClick={() => setActiveId(item.id)}
                  >
                    <span className="font-heading text-base tracking-[0.08em] text-[#4a2d09] md:text-lg">
                      {item.question}
                    </span>
                    <span className="text-xl leading-none text-[#8b611f]">{active ? '−' : '+'}</span>
                  </button>

                  <div
                    className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ${
                      active ? 'mt-3 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-70'
                    }`}
                  >
                    <p className="overflow-hidden text-sm leading-relaxed text-[#5a3b12] md:text-base">
                      {item.answer}
                    </p>
                  </div>

                  {active && (
                    <div className="mt-3 h-1 w-full rounded-full bg-gradient-to-r from-amber-300/70 via-yellow-200/80 to-amber-300/40" />
                  )}
                  <span className="sr-only">FAQ item {index + 1}</span>
                </article>
              );
            })}
          </div>

          <p className="mt-6 text-center text-xs uppercase tracking-[0.2em] text-[#7d5820] md:text-sm">
            Your doubts will be answered here.
          </p>
          <p className="mt-1 text-center text-xs uppercase tracking-[0.2em] text-[#7d5820] md:text-sm">
            Active question: {activeIndex + 1}/{ITEMS.length}
          </p>
        </div>
      </div>
    </section>
  );
}
