'use client';

import Image from 'next/image';
import type { MascotController } from './useMascot';

type MascotViewProps = MascotController;

export default function MascotView({ model, mascotRef, onHoverChange, onClickMascot }: MascotViewProps) {
  const isEntering = model.state === 'entering';
  const isExiting = model.state === 'exiting' || model.state === 'hidden';
  const isInteracting = model.state === 'interacting' || model.hovered;

  const baseScale = model.clicked ? 1.08 : isInteracting ? 1.04 : 1;
  const entryScale = isEntering ? 0.92 : 1;
  const opacity = model.visible ? (isExiting ? 0 : 1) : 0;

  const bubbleSide = model.anchor === 'bottom-right' || model.anchor === 'top-right' ? 'right-full mr-3' : 'left-full ml-3';
  const tiltX = isInteracting ? -3 : model.mood === 'energetic' ? -2 : 0;
  const tiltY = isInteracting ? 3 : model.mood === 'curious' ? -2 : 0;

  return (
    <div
      className="fixed inset-0 z-[70] pointer-events-none"
      aria-hidden={!model.visible}
      data-mascot-ignore="true"
    >
      <div
        ref={mascotRef}
        className="absolute pointer-events-auto select-none gpu-accelerate"
        style={{
          width: `${model.mascotSize}px`,
          height: `${model.mascotSize}px`,
          opacity,
          transition: 'opacity 320ms ease, filter 320ms ease',
          filter: isInteracting
            ? 'drop-shadow(0 0 22px rgba(255, 215, 120, 0.7)) drop-shadow(0 0 44px rgba(255, 166, 0, 0.35))'
            : 'drop-shadow(0 0 12px rgba(255, 215, 120, 0.4))',
        }}
        onMouseEnter={() => onHoverChange(true)}
        onMouseLeave={() => onHoverChange(false)}
        onClick={onClickMascot}
      >
        <div
          className="relative h-full w-full"
          style={{
            transform: `translate3d(0, 0, 0) scale(${baseScale * entryScale}) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg)`,
            transformStyle: 'preserve-3d',
            transition: 'transform 220ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{
              boxShadow: isInteracting
                ? '0 0 0 3px rgba(255, 220, 155, 0.42), 0 0 32px rgba(255, 188, 78, 0.5)'
                : '0 0 0 2px rgba(255, 220, 155, 0.3), 0 0 24px rgba(255, 188, 78, 0.25)',
            }}
          />

          <Image
            src="/mascot/mascot.png"
            alt="Norse mascot guide"
            className="h-full w-full rounded-full object-cover"
            draggable={false}
            width={120}
            height={120}
            sizes="(max-width: 768px) 78px, 104px"
            priority={false}
            style={{
              transform: `translate3d(0, ${(model.pulse * -4).toFixed(2)}px, 0)`,
              transition: 'transform 240ms ease',
            }}
          />

          <div
            className="pointer-events-none absolute -bottom-1 left-1/2 h-3 w-14 -translate-x-1/2 rounded-full bg-black/25 blur-md"
            style={{ transform: `scale(${isInteracting ? 1.08 : 1})` }}
          />

          <div className="pointer-events-none absolute inset-0">
            <span className="absolute top-[18%] left-[20%] h-1.5 w-1.5 rounded-full bg-amber-100/70 blur-[0.5px]" />
            <span className="absolute top-[34%] right-[15%] h-1 w-1 rounded-full bg-amber-50/60 blur-[0.5px]" />
            <span className="absolute bottom-[24%] left-[70%] h-1.5 w-1.5 rounded-full bg-yellow-100/60 blur-[0.5px]" />
          </div>

          <div
            className={`absolute top-1/2 -translate-y-1/2 max-w-[min(42vw,240px)] ${bubbleSide} ${model.bubbleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'} transition-all duration-300`}
          >
            <div className="rounded-2xl border border-amber-200/70 bg-[#fff8e7]/92 px-3 py-2 text-[12px] leading-relaxed text-[#4b2f02] shadow-[0_8px_28px_rgba(57,35,5,0.18)] backdrop-blur-sm">
              {model.message.text}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
