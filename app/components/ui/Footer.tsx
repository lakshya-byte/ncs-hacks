'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  FaInstagram as Instagram,
  FaFacebook as Facebook,
  FaXTwitter as Twitter,
  FaLinkedin as Linkedin,
  FaEnvelope as Mail,
  FaPhone as Phone,
} from 'react-icons/fa6';

const NAV_LINKS = [
  { name: 'Home',      href: '#'         },
  { name: 'About',     href: '#about'    },
  { name: 'Tracks',    href: '#tracks'   },
  { name: 'Timeline',  href: '#timeline' },
  { name: 'Prizes',    href: '#winners'  },
  { name: 'FAQ',       href: '#faq'      },
  { name: 'Sponsors',  href: '#sponsors' },
];

const SOCIALS = [
  { icon: <Instagram size={14} />, href: '#', label: 'Instagram' },
  { icon: <Facebook size={14} />, href: '#', label: 'Facebook' },
  { icon: <Twitter size={14} />, href: '#', label: 'X / Twitter' },
  { icon: <Linkedin size={14} />, href: '#', label: 'LinkedIn' },
];

/* Elder Futhark rune string for background texture */
const RUNE_ROW = 'ᚠ ᚢ ᚦ ᚨ ᚱ ᚲ ᚷ ᚹ ᚺ ᚾ ᛁ ᛃ ᛇ ᛈ ᛉ ᛊ ᛏ ᛒ ᛖ ᛗ ᛚ ᛜ ᛞ ᛟ ';

export default function GodLevelFooter() {
  const footerRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.12 }
    );
    if (footerRef.current) obs.observe(footerRef.current);
    return () => obs.disconnect();
  }, []);

  const appear = (delay: number) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(28px)',
    transition: `opacity 800ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 900ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
  });

  return (
    <footer
      ref={footerRef}
      style={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        borderTop: '1px solid transparent',
        background: 'linear-gradient(180deg, #fffdf8 0%, #faf7eb 40%, #f3efde 100%)',
        paddingTop: '5rem',
        paddingBottom: '2rem',
        color: '#5a4a3a',
      }}
    >
      {/* ══ GOLD TOP DIVIDER ══ */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '1px',
        background: 'linear-gradient(90deg, transparent 0%, rgba(201,162,39,0.3) 15%, rgba(245,217,128,0.8) 50%, rgba(201,162,39,0.3) 85%, transparent 100%)',
        boxShadow: '0 0 20px rgba(201,162,39,0.2)',
      }} />


      {/* ══ AMBIENT LAYERS ══ */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        {/* Top radial glow */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80vw',
          height: '60vh',
          background: 'radial-gradient(ellipse at top, rgba(201,162,39,0.18) 0%, transparent 65%)',
          opacity: inView ? 1 : 0,
          transition: 'opacity 1400ms ease',
        }} />

        {/* Sweeping light ray */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: '-20%',
          width: '140%',
          height: '55vh',
          background: 'linear-gradient(118deg, transparent 0%, rgba(245,217,128,0.22) 30%, rgba(255,255,255,0.14) 50%, transparent 65%)',
          filter: 'blur(18px)',
          animation: 'footerRaySway 12s ease-in-out infinite',
          pointerEvents: 'none',
        }} />

        {/* Rune background watermark */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '0',
            overflow: 'hidden',
            opacity: 0.035,
            pointerEvents: 'none',
          }}
          aria-hidden="true"
        >
          {Array.from({ length: 8 }).map((_, rowIdx) => (
            <div
              key={rowIdx}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.6rem',
                letterSpacing: '0.4em',
                whiteSpace: 'nowrap',
                color: '#c9a227',
                lineHeight: 2.2,
                transform: `translateX(${rowIdx % 2 === 0 ? '-2%' : '-8%'})`,
              }}
            >
              {RUNE_ROW.repeat(5)}
            </div>
          ))}
        </div>

        {/* Subtle dot grid */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(201,162,39,0.18) 0.6px, transparent 0.6px)',
          backgroundSize: '28px 28px',
          opacity: 0.12,
        }} />
      </div>

      {/* ══ MAIN CONTENT ══ */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem',
        }}
      >
        {/* Pre-header label */}
        <div
          style={{
            ...appear(0),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '14px',
            marginBottom: '4rem',
          }}
        >
          <div style={{ height: '1px', width: '60px', background: 'linear-gradient(90deg, transparent, rgba(201,162,39,0.55))' }} />
          <p style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '0.6rem',
            fontWeight: 700,
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            background: 'linear-gradient(90deg, #8f6b14, #f5d980, #8f6b14)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            margin: 0,
          }}>
            End of Journey — The Realm Rests Beyond
          </p>
          <div style={{ height: '1px', width: '60px', background: 'linear-gradient(90deg, rgba(201,162,39,0.55), transparent)' }} />
        </div>

        {/* 3-column grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '3rem',
            alignItems: 'start',
          }}
          className="footer-grid"
        >
          {/* ── COL 1: Brand ── */}
          <div style={{ ...appear(80), display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Logo */}
            <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'radial-gradient(circle at 35% 35%, #f5d980, #c9a227 50%, #7a5210)',
                boxShadow: '0 0 14px rgba(201,162,39,0.45), inset 0 1px 0 rgba(255,255,255,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-heading)',
                fontSize: '1rem',
                color: 'rgba(80,40,0,0.85)',
                flexShrink: 0,
              }}>
                ᚦ
              </div>
              <span style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 900,
                fontSize: '1.3rem',
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                background: 'linear-gradient(135deg, #6b4a0a 0%, #c9a227 35%, #f5d980 58%, #c9a227 78%, #6b4a0a 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                ASGARD
              </span>
            </Link>

            {/* Society name */}
            <p style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.62rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#8f6b14',
              margin: 0,
            }}>
              Official Technical Society of JSSATEN
            </p>

            {/* Tagline */}
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.92rem',
              lineHeight: 1.65,
              color: '#6b5530',
              margin: 0,
              maxWidth: '280px',
            }}>
              Where builders rise. Where innovation becomes legacy.
            </p>

            {/* Social icons */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '0.5rem' }}>
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    border: '1px solid rgba(201,162,39,0.35)',
                    background: 'rgba(255,255,255,0.7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#8f6b14',
                    textDecoration: 'none',
                    backdropFilter: 'blur(6px)',
                    transition: 'transform 250ms ease, box-shadow 250ms ease, border-color 250ms ease, background 250ms ease',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.transform = 'translateY(-3px)';
                    el.style.boxShadow = '0 0 20px rgba(201,162,39,0.4)';
                    el.style.borderColor = 'rgba(201,162,39,0.65)';
                    el.style.background = 'rgba(255,255,255,0.95)';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.transform = 'translateY(0)';
                    el.style.boxShadow = 'none';
                    el.style.borderColor = 'rgba(201,162,39,0.35)';
                    el.style.background = 'rgba(255,255,255,0.7)';
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* ── COL 2: Navigation ── */}
          <div style={{ ...appear(180), display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'center' }}>
            <p style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.58rem',
              fontWeight: 700,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'rgba(201,162,39,0.7)',
              marginBottom: '0.5rem',
            }}>
              Navigate
            </p>
            {NAV_LINKS.map((link) => (
              <FooterNavLink key={link.name} href={link.href} name={link.name} />
            ))}
          </div>

          {/* ── COL 3: Contact ── */}
          <div style={{ ...appear(280), display: 'flex', flexDirection: 'column', gap: '1.25rem', alignItems: 'flex-end' }}>
            <p style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.58rem',
              fontWeight: 700,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'rgba(201,162,39,0.7)',
              margin: 0,
            }}>
              Contact the Realm
            </p>

            {/* Email */}
            <ContactLine href="mailto:contact@jssaten.ac.in" icon={<Mail size={13} />} label="contact@jssaten.ac.in" />
            {/* Phone */}
            <ContactLine href="tel:+917061557021" icon={<Phone size={13} />} label="+91 70615 57021" />

            {/* Address */}
            <div style={{
              padding: '12px 16px',
              borderRadius: '14px',
              border: '1px solid rgba(201,162,39,0.25)',
              background: 'rgba(255,255,255,0.55)',
              backdropFilter: 'blur(8px)',
              textAlign: 'right',
              maxWidth: '260px',
            }}>
              <p style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.6rem',
                letterSpacing: '0.15em',
                color: '#8f6b14',
                margin: '0 0 4px',
                textTransform: 'uppercase',
              }}>
                Gateway Location
              </p>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.8rem',
                color: '#6b5530',
                margin: 0,
                lineHeight: 1.55,
              }}>
                JSS Academy of Technical Education,<br />
                Sector 62, Noida, UP
              </p>
            </div>

            {/* Quote card */}
            <div style={{
              padding: '14px 18px',
              borderRadius: '14px',
              border: '1px solid rgba(201,162,39,0.3)',
              background: 'linear-gradient(135deg, rgba(255,252,234,0.9), rgba(255,246,210,0.8))',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 30px rgba(201,162,39,0.12)',
              maxWidth: '260px',
              textAlign: 'right',
            }}>
              <p style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.85rem',
                fontStyle: 'italic',
                color: '#7a5b10',
                margin: 0,
                lineHeight: 1.55,
              }}>
                &ldquo;The portal shall open soon.<br />Prepare your ascent.&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* ══ BOTTOM BAR ══ */}
        <div
          style={{
            ...appear(400),
            marginTop: '4rem',
            paddingTop: '1.5rem',
            position: 'relative',
          }}
        >
          {/* Divider */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(201,162,39,0.35) 25%, rgba(201,162,39,0.55) 50%, rgba(201,162,39,0.35) 75%, transparent)',
          }} />

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.7rem',
              letterSpacing: '0.14em',
              color: 'rgba(90,74,58,0.7)',
              margin: 0,
            }}>
              © 2026 Nibble Computer Society — All Rights Reserved
            </p>

            {/* "Built in the realm" branding line */}
            <p style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.6rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              background: 'linear-gradient(90deg, #8f6b14, #c9a227, #8f6b14)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              margin: 0,
            }}>
              ᚠ &nbsp; Built in the Realm of Asgard &nbsp; ᚠ
            </p>
          </div>
        </div>
      </div>

      {/* ══ KEYFRAMES ══ */}
      <style>{`
        @keyframes footerRaySway {
          0%, 100% { transform: translateX(0) skewY(-2deg); }
          50% { transform: translateX(6%) skewY(-2deg); }
        }
        @keyframes footerLinkUnderline {
          from { transform: scaleX(0); transform-origin: left; }
          to { transform: scaleX(1); transform-origin: left; }
        }
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr !important; text-align: center; }
          .footer-grid > div { align-items: center !important; }
        }
      `}</style>
    </footer>
  );
}

/* ── Sub-components ── */

function FooterNavLink({ href, name }: { href: string; name: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        display: 'inline-block',
        fontFamily: 'var(--font-heading)',
        fontSize: '0.78rem',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        textDecoration: 'none',
        color: hovered ? '#8f6b14' : '#6b5530',
        transition: 'color 250ms ease',
        padding: '2px 0',
      }}
    >
      {name}
      {/* Animated underline */}
      <span style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: '1px',
        width: '100%',
        background: 'linear-gradient(90deg, #c9a227, #f5d980)',
        boxShadow: '0 0 6px rgba(201,162,39,0.5)',
        transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
        transformOrigin: 'left',
        transition: 'transform 320ms cubic-bezier(0.25,0.46,0.45,0.94)',
      }} />
    </a>
  );
}

function ContactLine({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        justifyContent: 'flex-end',
        textDecoration: 'none',
        transition: 'transform 250ms ease',
        transform: hovered ? 'translateX(-3px)' : 'translateX(0)',
      }}
    >
      <span style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.82rem',
        color: hovered ? '#8f6b14' : '#6b5530',
        transition: 'color 250ms ease',
      }}>
        {label}
      </span>
      <span style={{
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        border: '1px solid rgba(201,162,39,0.35)',
        background: hovered ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.65)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#8f6b14',
        transition: 'background 250ms ease, box-shadow 250ms ease',
        boxShadow: hovered ? '0 0 18px rgba(201,162,39,0.35)' : 'none',
        flexShrink: 0,
      }}>
        {icon}
      </span>
    </a>
  );
}
