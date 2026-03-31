'use client';

import Image from 'next/image';
import { useMascotSimple, entryOffset, type MascotState } from './useMascotSimple';

// ── Position helpers re-exported for render use ───────────────────────────────
type Corner = MascotState['corner'];

function cornerStyle(corner: Corner): React.CSSProperties {
  const margin = 24;
  switch (corner) {
    case 'bottom-left':  return { bottom: margin, left:  margin };
    case 'bottom-right': return { bottom: margin, right: margin };
    case 'top-left':     return { top: margin + 64, left:  margin };
    case 'top-right':    return { top: margin + 64, right: margin };
  }
}

function bubbleStyle(): React.CSSProperties {
  return {
    position: 'absolute',
    bottom: '92%',
    left: '50%',
    pointerEvents: 'none',
    width: 'max-content',
    maxWidth: 'min(300px, 80vw)',
    display: 'flex',
    justifyContent: 'center',
    zIndex: 20,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
export default function Mascot() {
  const { state } = useMascotSimple();
  const { corner, visible, entryDone, bubbleVisible, message } = state;

  // Entry offset → slide from edge
  const off = entryOffset(corner);

  // Mascot translate: hidden = offset, visible+done = 0,0
  const translateStyle: React.CSSProperties = {
    transform: visible && entryDone
      ? 'translate(0, 0)'
      : `translate(${off.x}px, ${off.y}px)`,
    opacity: visible ? 1 : 0,
    transition: 'transform 0.5s cubic-bezier(0.22,1,0.36,1), opacity 0.45s ease',
    willChange: 'transform, opacity',
  };

  if (!visible && !entryDone) return null;

  return (
    <>
      {/* ── Keyframes for idle float ── */}
      <style>{`
        @keyframes mascot-float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-3px); }
        }
        .mascot-float-idle {
          animation: mascot-float 3s ease-in-out infinite;
        }
      `}</style>

      {/* ── Fixed overlay ── */}
      <div
        className="pointer-events-none fixed inset-0 z-9999"
        aria-hidden="true"
        data-mascot-ignore="true"
      >
        {/* ── Mascot container ── */}
        <div
          className="absolute"
          style={{
            ...cornerStyle(corner),
            ...translateStyle,
          }}
        >
          {/* Float wrapper — only animates when fully entered */}
          <div className={entryDone ? 'mascot-float-idle' : ''}>

            {/* ── Image ── */}
            <div
              style={{
                position: 'relative',
                width: 'clamp(180px, 24vw, 260px)',
                height: 'clamp(180px, 24vw, 260px)',
                filter: `
                  drop-shadow(0 8px 20px rgba(0,0,0,0.22))
                  drop-shadow(0 2px 8px rgba(184,134,11,0.3))
                `,
              }}
            >
              <Image
                src="/mascot/mascot.png"
                alt="Asgard guide"
                fill
                sizes="260px"
                style={{ objectFit: 'contain' }}
                priority={false}
                unoptimized={false}
                draggable={false}
              />
            </div>

            {/* ── Speech bubble ── */}
            <div
              style={{
                ...bubbleStyle(),
                opacity: bubbleVisible ? 1 : 0,
                transform: `translateX(-50%) translateY(${bubbleVisible ? 0 : 12}px)`,
                transition: 'opacity 0.4s ease, transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
            >
              <div
                style={{
                  background: 'rgba(255,252,240,0.97)',
                  border: '1.5px solid rgba(201,162,39,0.5)',
                  borderRadius: '12px',
                  padding: '8px 14px',
                  boxShadow: '0 6px 24px rgba(0,0,0,0.12), 0 0 0 1px rgba(255,255,255,0.6) inset',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  display: 'inline-block',
                  maxWidth: 'min(240px, 60vw)',
                  position: 'relative',
                }}
              >
                {/* Tail */}
                <span
                  style={{
                    position: 'absolute',
                    bottom: '-7px',
                    left: '50%',
                    transform: 'translateX(-50%) rotate(45deg)',
                    width: '14px',
                    height: '14px',
                    background: 'rgba(255,252,240,0.98)',
                    border: '1.5px solid rgba(201,162,39,0.5)',
                    borderTop: 'none',
                    borderLeft: 'none',
                    borderRadius: '0 0 4px 0',
                    zIndex: -1,
                  }}
                />

                <p
                  style={{
                    margin: 0,
                    fontSize: 'clamp(12px, 1.5vw, 14px)',
                    fontWeight: 600,
                    color: '#3d2800',
                    lineHeight: 1.4,
                    letterSpacing: '0.01em',
                  }}
                >
                  {message}
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
