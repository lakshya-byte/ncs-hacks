"use client";

import { useState } from "react";

const archives = [
  {
    id: "eligibility",
    question: "Who may enter the gates of Asgard?",
    answer:
      "Any student builder with a brave idea may step forward. You can join solo or as a team and forge your project for the realm.",
  },
  {
    id: "registration",
    question: "How do chosen warriors register?",
    answer:
      "Complete the official registration ritual through the event form. Once approved, your team receives the summons with timelines and battle briefings.",
  },
  {
    id: "starting-point",
    question: "Must we arrive with a project already built?",
    answer:
      "No. Teams may begin from a spark of an idea. What matters is progress, execution, and clarity of vision during the hackathon saga.",
  },
  {
    id: "judging",
    question: "What powers are judged by the council?",
    answer:
      "The council evaluates innovation, technical depth, design craft, usability, impact, and the strength of your final presentation.",
  },
  {
    id: "mentorship",
    question: "Will there be mentors and divine guidance?",
    answer:
      "Yes. Mentors and domain experts will roam the halls to guide architecture, product direction, and implementation decisions.",
  },
];

export default function ArchivesFAQ() {
  const [activeArchiveIndex, setActiveArchiveIndex] = useState(0);
  const revealedCount = activeArchiveIndex + 1;
  const progress = `${((revealedCount / archives.length) * 100).toFixed(0)}%`;

  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-gradient-to-b from-[#ffffff] via-[#fdfcf7] to-[#f6f2e4]"
      aria-labelledby="archives-heading"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-36 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,215,0,0.22)_0%,rgba(255,255,255,0)_70%)] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.75)_0%,rgba(255,255,255,0)_62%)]" />
        <div className="absolute left-[18%] top-[-22%] h-[160%] w-[24%] -rotate-[22deg] bg-[linear-gradient(180deg,rgba(255,215,0,0)_0%,rgba(255,215,0,0.18)_40%,rgba(255,215,0,0)_100%)] blur-sm" />
        <div className="absolute left-[56%] top-[-30%] h-[180%] w-[22%] -rotate-[14deg] bg-[linear-gradient(180deg,rgba(255,215,0,0)_0%,rgba(255,215,0,0.14)_46%,rgba(255,215,0,0)_100%)] blur-sm" />
      </div>

      <div className="section-main">
        <div className="site-container relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <p className="accent-text tracking-[0.26em] text-[#9f7f2a]">The Archives of Asgard</p>
            <h2 id="archives-heading" className="mt-4 text-[#2d2307] drop-shadow-[0_2px_8px_rgba(255,215,0,0.22)]">
              Divine Knowledge System
            </h2>
            <p className="mx-auto mt-4 max-w-2xl body-text text-slate-700/90">
              Ancient scrolls respond to your presence. Each revelation is a rite of passage for chosen warriors.
            </p>
          </div>

          <div className="relative mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-[1.05fr_1.15fr]">
            <div className="relative rounded-3xl border border-[#d7b34f]/45 bg-white/45 p-6 backdrop-blur-xl shadow-[0_26px_60px_rgba(155,125,25,0.14),inset_0_0_0_1px_rgba(255,255,255,0.7)]">
              <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_10%_8%,rgba(255,215,0,0.15),transparent_45%)]" />
              <p className="relative font-heading text-sm uppercase tracking-[0.22em] text-[#9f7f2a]">Knowledge resonance</p>
              <p className="relative mt-4 body-text text-[#5a4b20]">Current scroll revealed</p>
              <p className="relative mt-2 font-heading text-4xl text-[#372707]">{revealedCount}</p>
              <div className="relative mt-7 h-2 overflow-hidden rounded-full bg-[#e9e0c4]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#b88b14] via-[#ffd700] to-[#d9a620] transition-all duration-700"
                  style={{ width: progress }}
                />
              </div>
              <p className="relative mt-3 text-xs tracking-[0.16em] text-[#886f31] uppercase">{progress} of archive awakened</p>
            </div>

            <div className="space-y-3">
              {archives.map((entry, idx) => {
                const isRevealed = idx === activeArchiveIndex;
                const contentId = `archive-answer-${entry.id}`;

                return (
                  <article
                    key={entry.id}
                    className={`group relative overflow-hidden rounded-2xl border transition-all duration-500 ${
                      isRevealed
                        ? "border-[#d7ae3a]/70 bg-white/65 shadow-[0_16px_45px_rgba(209,171,63,0.2),inset_0_0_20px_rgba(255,215,0,0.12)]"
                        : "border-[#d8caa2]/60 bg-white/45 hover:border-[#d7ae3a]/55"
                    }`}
                  >
                    <button
                      type="button"
                      className="relative flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                      onClick={() => setActiveArchiveIndex(idx)}
                      aria-expanded={isRevealed}
                      aria-controls={contentId}
                    >
                      <span className="font-heading text-base tracking-[0.08em] text-[#2f250d] md:text-lg">{entry.question}</span>
                      <span
                        className={`shrink-0 rounded-full border px-2 py-1 text-[0.62rem] tracking-[0.16em] uppercase transition-colors ${
                          isRevealed
                            ? "border-[#d7ae3a]/90 bg-[#fff5cf] text-[#8a6713]"
                            : "border-[#d7be80]/70 bg-white/60 text-[#967328]"
                        }`}
                      >
                        {isRevealed ? "Revealed" : "Unseal"}
                      </span>
                    </button>

                    <div
                      id={contentId}
                      className={`grid transition-all duration-500 ${isRevealed ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                    >
                      <div className="overflow-hidden">
                        <p className="px-5 pb-5 body-text text-slate-700/95">{entry.answer}</p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
