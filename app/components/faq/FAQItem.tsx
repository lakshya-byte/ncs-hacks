"use client"

type Props = {
  index: number
  isOpen: boolean
  onToggle: (index: number) => void
  question: string
  answer: string
}

export default function FAQItem({
  index,
  isOpen,
  onToggle,
  question,
  answer,
}: Props) {
  return (
    <div
      className={`relative group rounded-xl border transition-all duration-500 overflow-hidden
      ${
        isOpen
          ? "border-amber-500/40 bg-slate-900/80 shadow-[0_0_30px_rgba(245,158,11,0.1)]"
          : "border-slate-800/60 bg-slate-900/30 hover:bg-slate-900/50 hover:border-slate-700/80"
      } backdrop-blur-md`}
    >
      {/* Decorative Runic Glow on Active (Left Side) */}
      <div
        className={`absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-amber-300 to-amber-600 transition-all duration-500
        ${isOpen ? "opacity-100 shadow-[0_0_15px_rgba(245,158,11,0.6)]" : "opacity-0"}`}
      />

      {/* HEADER */}
      <button
        onClick={() => onToggle(index)}
        className="w-full flex items-center justify-between px-6 py-5 text-left z-10 relative"
      >
        <h3
          className={`text-lg md:text-xl font-serif tracking-wide transition-colors duration-300 ${
            isOpen ? "text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.4)]" : "text-slate-200 group-hover:text-amber-200"
          }`}
        >
          {question}
        </h3>

        {/* Custom Forged Chevron */}
        <div
          className={`flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-500 ${
            isOpen 
              ? "bg-amber-500/10 border-amber-500/50 text-amber-400 rotate-180" 
              : "border-slate-700 text-slate-400 group-hover:border-slate-500"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </div>
      </button>

      {/* CONTENT */}
      <div
        className={`grid transition-all duration-500 ease-in-out ${
          isOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-6 pb-6 pt-2">
            {/* Divider line for visual hierarchy */}
            <div className="w-full h-px bg-gradient-to-r from-amber-500/20 to-transparent mb-4" />
            <p className="text-slate-400 leading-relaxed font-light">
              {answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}