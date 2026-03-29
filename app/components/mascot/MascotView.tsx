'use client';

import Image from 'next/image';
import type { MascotControllerBindings } from './useMascot';

function toneStyle(tone: 'playful' | 'epic' | 'hint' | 'celebration'): string {
  if (tone === 'epic') {
    return 'text-amber-100 border-amber-300/80 from-[#2d1e08]/90 to-[#4a2f07]/85';
  }

  if (tone === 'celebration') {
    return 'text-amber-50 border-yellow-300/80 from-[#5f3a0e]/88 to-[#7d4b06]/82';
  }

  if (tone === 'playful') {
    return 'text-[#4f2f06] border-amber-200/80 from-[#fff2da]/90 to-[#ffe6ba]/85';
  }

  return 'text-[#3f2a08] border-amber-300/70 from-[#fff8e9]/92 to-[#f5e5c0]/88';
}

export default function MascotView({
  model,
  mascotRef,
  bubbleRef,
  onHoverChange,
  onClickMascot,
}: MascotControllerBindings) {
  return (
    <div className="pointer-events-none fixed inset-0 z-[90]" data-mascot-ignore="true" aria-hidden={!model.visible}>
      <div
        ref={mascotRef}
        className={`pointer-events-auto absolute ${model.sizeClass} aspect-square cursor-pointer select-none`}
        style={{ willChange: 'transform' }}
        onMouseEnter={() => onHoverChange(true)}
        onMouseLeave={() => onHoverChange(false)}
        onClick={onClickMascot}
      >
        <div className="relative h-full w-full">
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,241,191,0.65),rgba(255,200,110,0.2)_60%,rgba(255,200,110,0)_75%)] blur-[2px]" />
          <Image
            src="/mascot/mascot.png"
            alt="Norse mascot guide"
            width={model.sizePx}
            height={model.sizePx}
            sizes="(max-width: 768px) 80px, 160px"
            draggable={false}
            priority={false}
            unoptimized={true}
            className="h-full w-full rounded-full border border-amber-200/75 object-cover shadow-[0_12px_34px_rgba(104,67,14,0.42),0_0_22px_rgba(245,197,103,0.35)]"
          />

          <div
            ref={bubbleRef}
            className={`absolute left-full top-1/2 ml-3 w-[min(68vw,280px)] -translate-y-1/2 rounded-2xl border bg-gradient-to-br px-3 py-2 text-[12px] leading-relaxed shadow-[0_12px_38px_rgba(56,34,6,0.35)] backdrop-blur-md transition-all duration-300 ${toneStyle(model.message.tone)} ${model.bubbleVisible ? 'opacity-100' : 'pointer-events-none opacity-0'} `}
          >
            <span className="block">{model.message.text}</span>
            <span className="absolute left-[-8px] top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 border-l border-b border-inherit bg-inherit" />
          </div>
        </div>
      </div>
    </div>
  );
}
