'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ── FAQ DATA ──────────────────────────────────────────────────────────────────


const FAQ_DATA = [
  {
    id: 1,
    question: 'What is the JSS Annual Hackathon 2026?',
    answer:
      'A premier inter-college hackathon hosted by JSS Institute that challenges students to build real, technology-driven solutions across five key domains: AI and Automation, IoT, Blockchain, Cybersecurity, and Open Innovation. The event runs from April 1 to April 25, 2026.',
  },
  {
    id: 2,
    question: 'Where is the offline event held?',
    answer:
      'Multi Purpose Hall, JSS Institutions.',
  },
  {
    id: 3,
    question: 'How long does the offline event last?',
    answer:
      'The offline segment is a 36-hour hackathon across April 24–25, 2026. Check-in begins at 9 AM on April 24 and final results are declared by 12 PM on April 25.',
  },
  {
    id: 4,
    question: 'Where do I register?',
    answer:
      'Registration is done online via the Devfolio app starting April 1, 2026 at 10 AM.',
  },
  {
    id: 5,
    question: 'Is there a registration fee?',
    answer:
      'No, there is no registration fee.',
  },
];

// ── ACCORDION ITEM ────────────────────────────────────────────────────────────
interface AccordionItemProps {
  item: (typeof FAQ_DATA)[0];
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

function AccordionItem({ item, isOpen, onToggle, index }: AccordionItemProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);
  const [hovered, setHovered] = useState(false);

  // Height animation on open/close
  useEffect(() => {
    const content = contentRef.current;
    const inner = innerRef.current;
    if (!content || !inner) return;

    if (isFirstRender.current) {
      gsap.set(content, { height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 });
      isFirstRender.current = false;
      return;
    }

    if (isOpen) {
      const h = inner.scrollHeight;
      gsap.fromTo(
        content,
        { height: 0, opacity: 0 },
        {
          height: h,
          opacity: 1,
          duration: 0.5,
          ease: 'power3.out',
          onComplete: () => { gsap.set(content, { height: 'auto' }); },
        }
      );
    } else {
      gsap.fromTo(
        content,
        { height: content.scrollHeight, opacity: 1 },
        { height: 0, opacity: 0, duration: 0.38, ease: 'power3.inOut' }
      );
    }
  }, [isOpen]);

  const cardBg = isOpen
    ? 'rgba(25,25,25,0.95)'
    : hovered
    ? 'rgba(30,30,30,0.85)'
    : 'rgba(20,20,20,0.65)';

  const cardShadow = isOpen
    ? '0 8px 40px rgba(0,0,0,0.4), 0 0 0 1.5px rgba(201,162,39,0.55)'
    : hovered
    ? '0 6px 28px rgba(0,0,0,0.3), 0 0 0 1px rgba(201,162,39,0.38)'
    : '0 2px 12px rgba(0,0,0,0.2), 0 0 0 1px rgba(212,175,55,0.25)';

  const cardTranslate = hovered && !isOpen ? 'translateY(-2px)' : 'translateY(0)';

  return (
    <div
      className="faq-accordion-item"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: cardBg,
        boxShadow: cardShadow,
        transform: cardTranslate,
        borderRadius: '16px',
        overflow: 'hidden',
        transition: 'background 0.35s ease, box-shadow 0.4s ease, transform 0.35s cubic-bezier(0.34,1.56,0.64,1)',
        willChange: 'transform',
        position: 'relative',
      }}
    >
      {/* Active left accent bar */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '3px',
          height: '100%',
          background: 'linear-gradient(to bottom, #f5d980, #c9a227, #8b6914)',
          opacity: isOpen ? 1 : 0,
          transition: 'opacity 0.4s ease',
          borderRadius: '16px 0 0 16px',
        }}
      />

      {/* Glow pulse on open */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '16px',
            background:
              'radial-gradient(ellipse at 20% 50%, rgba(212,175,55,0.07) 0%, transparent 60%)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
      )}

      {/* Question button */}
      <button
        onClick={onToggle}
        className="w-full text-left relative z-10"
        aria-expanded={isOpen}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          padding: 'clamp(1.1rem, 2.5vw, 1.5rem) clamp(1.25rem, 3vw, 2rem)',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          width: '100%',
        }}
      >
        {/* Index + question */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', flex: 1 }}>
          {/* Number badge */}
          <span
            className="font-heading"
            style={{
              flexShrink: 0,
              fontSize: '0.68rem',
              fontWeight: 800,
              letterSpacing: '0.1em',
              color: isOpen ? '#c9a227' : 'rgba(184,134,11,0.45)',
              marginTop: '3px',
              transition: 'color 0.3s ease',
              minWidth: '1.2rem',
            }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>

          {/* Question text */}
          <span
            className="font-heading"
            style={{
            fontSize: 'clamp(0.95rem, 1.3vw, 1.15rem)',
            fontWeight: 700,
            color: isOpen ? '#f5d980' : 'rgba(255,255,255,0.9)',
            lineHeight: 1.35,
            transition: 'color 0.3s ease',
            }}
          >
            {item.question}
          </span>
        </div>

        {/* Chevron */}
        <div
          style={{
            flexShrink: 0,
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            border: isOpen
              ? '1.5px solid rgba(201,162,39,0.6)'
              : '1.5px solid rgba(184,134,11,0.25)',
            background: isOpen ? 'rgba(212,175,55,0.12)' : 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.35s ease',
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke={isOpen ? '#c9a227' : '#9a7420'}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)',
            }}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </button>

      {/* Answer content */}
      <div ref={contentRef} className="overflow-hidden relative z-10">
        <div ref={innerRef} style={{ padding: '0 clamp(1.25rem, 3vw, 2rem) clamp(1.1rem, 2.5vw, 1.5rem) calc(1.25rem + 2.2rem)' }}>
          {/* Gold divider */}
          <div
            style={{
              height: '1px',
              background: 'linear-gradient(to right, rgba(212,175,55,0.4), rgba(212,175,55,0.1), transparent)',
              marginBottom: '1rem',
            }}
          />
          <p
            className="font-body"
            style={{
            fontSize: 'clamp(0.88rem, 1.2vw, 1rem)',
            color: 'rgba(255,255,255,0.7)',
            lineHeight: 1.75,
            fontWeight: 400,
            }}
          >
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

// ── MAIN FAQ SECTION ──────────────────────────────────────────────────────────
export default function FAQSection() {
  const [openId, setOpenId] = useState<number>(1);
  const sectionRef = useRef<HTMLElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Divider line draw
      if (dividerRef.current) {
        gsap.fromTo(
          dividerRef.current,
          { scaleX: 0, opacity: 0 },
          {
            scaleX: 1,
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: { trigger: dividerRef.current, start: 'top 90%' },
          }
        );
      }

      // Heading block reveal
      if (headingRef.current) {
        gsap.fromTo(
          Array.from(headingRef.current.children),
          { opacity: 0, y: 28, filter: 'blur(5px)' },
          {
            opacity: 1, y: 0, filter: 'blur(0px)',
            duration: 0.9, stagger: 0.12, ease: 'power3.out',
            scrollTrigger: { trigger: headingRef.current, start: 'top 82%' },
          }
        );
      }

      // Accordion items stagger
      if (listRef.current) {
        const items = listRef.current.querySelectorAll('.faq-accordion-item');
        gsap.fromTo(
          items,
          { opacity: 0, y: 30, scale: 0.98 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.65, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: listRef.current, start: 'top 80%' },
          }
        );
      }


    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="faq"
      style={{
        background: 'transparent',
        paddingTop: 'clamp(5rem, 10vw, 9rem)',
        paddingBottom: 'clamp(5rem, 10vw, 8rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* ── Parchment texture lines ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 56px, rgba(212,175,55,0.02) 56px, rgba(212,175,55,0.02) 57px)',
          zIndex: 0,
        }}
      />

      {/* ── Top warm radial glow ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: 0,
          left: '50%',
          transform: 'translate(-50%, -30%)',
          width: '70vw',
          height: '40vw',
          background:
            'radial-gradient(ellipse at center, rgba(212,175,55,0.1) 0%, transparent 65%)',
          zIndex: 0,
        }}
      />

      {/* ── Watermark runes ── */}
      {(['ᚠ', 'ᛟ', 'ᚹ'] as const).map((r, i) => (
        <div
          key={i}
          className="absolute font-heading select-none pointer-events-none"
          style={{
            fontSize: `${4 + i * 2}rem`,
            color: 'rgba(184,134,11,0.04)',
            top: `${20 + i * 30}%`,
            left: i % 2 === 0 ? '3%' : '88%',
            transform: `rotate(${(i - 1) * 12}deg)`,
            zIndex: 0,
          }}
        >
          {r}
        </div>
      ))}

      {/* ── Gold gradient top divider (section separator) ── */}
      <div
        ref={dividerRef}
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%) scaleX(0)',
          transformOrigin: 'center',
          width: 'clamp(200px, 50vw, 520px)',
          height: '2px',
          background:
            'linear-gradient(to right, transparent, rgba(212,175,55,0.7) 30%, rgba(255,220,80,0.9) 50%, rgba(212,175,55,0.7) 70%, transparent)',
          opacity: 0,
          zIndex: 1,
        }}
      />

      {/* ══ CONTENT ══ */}
      <div
        className="relative z-10 w-full"
        style={{
          maxWidth: '780px',
          margin: '0 auto',
          padding: '0 clamp(1rem, 4vw, 2rem)',
        }}
      >
        {/* ── HEADING BLOCK ── */}
        <div ref={headingRef} className="text-center" style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          {/* Eyebrow */}
          <p
            className="font-heading uppercase"
            style={{
              fontSize: 'clamp(0.58rem, 0.85vw, 0.72rem)',
              letterSpacing: '0.5em',
              color: '#B8860B',
              fontWeight: 700,
              marginBottom: '1rem',
            }}
          >
            ✦&nbsp;&nbsp;INOUT Archives&nbsp;&nbsp;✦
          </p>

          {/* Main title */}
          <h2
            className="font-heading uppercase"
            style={{
              fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
              fontWeight: 900,
              letterSpacing: '0.1em',
              color: '#fff',
              lineHeight: 1.1,
              marginBottom: '1.1rem',
            }}
          >
            Frequently{' '}
            <span
              style={{
                background:
                  'linear-gradient(135deg, #c9a227 0%, #f5d980 50%, #9a6c10 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Asked
            </span>
            <br />
            <span style={{ fontWeight: 900 }}>Questions</span>
          </h2>

          {/* Ornament divider */}
          <div className="flex items-center justify-center gap-3">
            <div style={{ width: '60px', height: '1.5px', background: 'linear-gradient(to right, transparent, #c9a227)' }} />
            <div style={{ width: '8px', height: '8px', background: '#c9a227', transform: 'rotate(45deg)', flexShrink: 0 }} />
            <div style={{ width: '60px', height: '1.5px', background: 'linear-gradient(to left, transparent, #c9a227)' }} />
          </div>

          {/* Subtitle */}
          <p
            className="font-body"
            style={{
              fontSize: 'clamp(0.85rem, 1.15vw, 1rem)',
              color: 'rgba(255,255,255,0.6)',
              fontWeight: 500,
              lineHeight: 1.65,
              marginTop: '1rem',
            }}
          >
            Sacred knowledge for every warrior seeking to join the ranks of INOUT.
          </p>
        </div>

        {/* ── ACCORDION LIST ── */}
        <div
          ref={listRef}
          style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.75rem, 1.5vw, 1rem)' }}
        >
          {FAQ_DATA.map((item, index) => (
            <AccordionItem
              key={item.id}
              item={item}
              isOpen={openId === item.id}
              onToggle={() => setOpenId(prev => (prev === item.id ? 0 : item.id))}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
