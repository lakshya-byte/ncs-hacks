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
  FaLocationDot as MapPin,
} from 'react-icons/fa6';

/* ── Data ── */
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
  { icon: <Instagram size={15} />, href: '#', label: 'Instagram' },
  { icon: <Facebook size={15} />, href: '#', label: 'Facebook' },
  { icon: <Twitter size={15} />, href: '#', label: 'X / Twitter' },
  { icon: <Linkedin size={15} />, href: '#', label: 'LinkedIn' },
];

const RUNE_ROW = 'ᚠ ᚢ ᚦ ᚨ ᚱ ᚲ ᚷ ᚹ ᚺ ᚾ ᛁ ᛃ ᛇ ᛈ ᛉ ᛊ ᛏ ᛒ ᛖ ᛗ ᛚ ᛜ ᛞ ᛟ ';

const MAP_SRC = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28026.018786814126!2d77.31860563053421!3d28.5922055260388!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5992452d761%3A0xaaa44725147c1507!2sJSS%20Academy%20of%20Technical%20Education!5e0!3m2!1sen!2sin!4v1775057989070!5m2!1sen!2sin';

/* ── Shared Style Tokens ── */
const GOLD       = '#C9A84C';
const GOLD_LIGHT = '#F5E0A3';
const GOLD_DARK  = '#8F722E';
const TEXT_SECONDARY = 'rgba(255,255,255,0.7)';

const sectionLabel = {
  fontFamily: 'var(--font-heading)',
  fontSize: '0.56rem' as const,
  fontWeight: 700 as const,
  letterSpacing: '0.3em',
  textTransform: 'uppercase' as const,
  color: `rgba(201,162,39,0.65)`,
  margin: 0,
};

const glassCard = {
  borderRadius: '16px',
  border: '1px solid rgba(201,162,39,0.22)',
  background: 'rgba(15,15,15,0.65)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
};

/* ═══════════════════════════════════════════════════════════════
   FOOTER COMPONENT
═══════════════════════════════════════════════════════════════ */
export default function GodLevelFooter() {
  const footerRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.08 },
    );
    if (footerRef.current) obs.observe(footerRef.current);
    return () => obs.disconnect();
  }, []);

  const appear = (delay: number): React.CSSProperties => ({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(24px)',
    transition: `opacity 700ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 800ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
  });

  return (
    <footer
      ref={footerRef}
      style={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        background: 'transparent',

        paddingTop: '2rem',
        paddingBottom: '2rem',
        color: TEXT_SECONDARY,
        zIndex: 30,
      }}
    >
      {/* ══ GOLD TOP ACCENT LINE ══ */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
        background: 'linear-gradient(90deg, #080706 0%, transparent 100%)',
        boxShadow: `0 0 24px rgba(201,162,39,0.15)`,
      }} />

      {/* ══ AMBIENT LAYERS ══ */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: '80vw', height: '55vh',
          background: 'radial-gradient(ellipse at top, rgba(201,162,39,0.22) 0%, transparent 60%)',
          opacity: inView ? 1 : 0, transition: 'opacity 1400ms ease',
        }} />
        <div style={{
          position: 'absolute', top: 0, left: '-20%', width: '140%', height: '50vh',
          background: 'linear-gradient(118deg, transparent 0%, rgba(245,217,128,0.18) 30%, rgba(255,255,255,0.1) 50%, transparent 65%)',
          filter: 'blur(18px)', animation: 'footerRaySway 14s ease-in-out infinite',
        }} />
        <div
          style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden', opacity: 0.05, pointerEvents: 'none' }}
          aria-hidden="true"
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} style={{
              fontFamily: 'var(--font-heading)', fontSize: '1.6rem', letterSpacing: '0.4em', whiteSpace: 'nowrap',
              color: GOLD, lineHeight: 2.2, transform: `translateX(${i % 2 === 0 ? '-2%' : '-8%'})`,
            }}>
              {RUNE_ROW.repeat(5)}
            </div>
          ))}
        </div>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(rgba(201,162,39,0.14) 0.5px, transparent 0.5px)',
          backgroundSize: '30px 30px', opacity: 0.05,
        }} />
      </div>

      {/* ══ MAIN CONTENT CONTAINER ══ */}
      <div style={{ position: 'relative', zIndex: 2, maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
           SECTION 1 — BRAND HERO (centered, strong hierarchy)
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div style={{ ...appear(0), textAlign: 'center', marginBottom: '4.5rem' }}>
          {/* Decorative line */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '18px', marginBottom: '1.8rem' }}>
            <div style={{ height: '1px', width: '80px', background: `linear-gradient(90deg, transparent, rgba(201,162,39,0.5))` }} />
            <p style={{
              ...sectionLabel,
              fontSize: '0.55rem',
              background: `linear-gradient(90deg, ${GOLD_DARK}, ${GOLD_LIGHT}, ${GOLD_DARK})`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              End of Journey — The Realm Rests Beyond
            </p>
            <div style={{ height: '1px', width: '80px', background: `linear-gradient(90deg, rgba(201,162,39,0.5), transparent)` }} />
          </div>

          {/* Logo + Name */}
          <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '44px', height: '44px', borderRadius: '50%',
              background: `radial-gradient(circle at 35% 35%, ${GOLD_LIGHT}, ${GOLD} 50%, #8F722E)`,
              boxShadow: `0 0 18px rgba(201,162,39,0.4), inset 0 1px 0 rgba(255,255,255,0.5)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-heading)', fontSize: '1.15rem', color: 'rgba(80,40,0,0.85)', flexShrink: 0,
            }}>
              ᚦ
            </div>
            <span style={{
              fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '1.6rem', letterSpacing: '0.4em', textTransform: 'uppercase',
              background: 'linear-gradient(150deg, #080706 0%, #121110 50%, #080706 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              ASGARD
            </span>
          </Link>

          {/* Sub-labels */}
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase',
            color: GOLD_LIGHT, margin: '0.8rem 0 0',
          }}>
            Official Technical Society of JSSATEN
          </p>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '0.95rem', lineHeight: 1.6, color: TEXT_SECONDARY,
            margin: '0.6rem auto 0', maxWidth: '360px',
          }}>
            Where builders rise. Where innovation becomes legacy.
          </p>
        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
           SECTION 2 — INFO GRID  (Quick Links + Contact + Socials)
           3 balanced columns for supporting navigation content
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div className="footer-info-grid" style={{
          ...appear(100),
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '2.5rem',
          marginBottom: '4rem',
          padding: '2.5rem 2rem',
          ...glassCard,
          boxShadow: '0 8px 40px rgba(201,162,39,0.08)',
        }}>
          {/* ── Quick Links ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <p style={{ ...sectionLabel, marginBottom: '0.6rem' }}>Navigate</p>
            {NAV_LINKS.map((link) => (
              <FooterNavLink key={link.name} href={link.href} name={link.name} />
            ))}
          </div>

          {/* ── Contact ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderLeft: '1px solid rgba(201,162,39,0.15)', paddingLeft: '2.5rem' }}>
            <p style={{ ...sectionLabel, marginBottom: '0.4rem' }}>Get in Touch</p>

            <ContactLine href="mailto:contact@jssaten.ac.in" icon={<Mail size={13} />} label="contact@jssaten.ac.in" />
            <ContactLine href="tel:+917061557021" icon={<Phone size={13} />} label="+91 70615 57021" />

            {/* Address inline */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginTop: '0.25rem' }}>
              <span style={{
                width: '30px', height: '30px', borderRadius: '50%',
                border: '1px solid rgba(201,162,39,0.3)', background: 'rgba(255,255,255,0.05)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: GOLD_LIGHT, flexShrink: 0,
              }}>
                <MapPin size={12} />
              </span>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: TEXT_SECONDARY, margin: 0, lineHeight: 1.5 }}>
                JSS Academy of Technical Education,<br />
                Sector 62, Noida, UP 201301
              </p>
            </div>
          </div>

          {/* ── Connect / Socials ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', borderLeft: '1px solid rgba(201,162,39,0.15)', paddingLeft: '2.5rem' }}>
            <p style={{ ...sectionLabel, marginBottom: '0.4rem' }}>Connect With Us</p>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {SOCIALS.map((s) => (
                <SocialIcon key={s.label} href={s.href} label={s.label} icon={s.icon} />
              ))}
            </div>

            {/* Quote block */}
            <div style={{
              marginTop: 'auto',
              padding: '14px 16px',
              borderRadius: '12px',
              border: '1px solid rgba(201,162,39,0.2)',
              background: 'rgba(201,162,39,0.1)',
            }}>
              <p style={{
                fontFamily: 'var(--font-heading)', fontSize: '0.82rem', fontStyle: 'italic',
                color: GOLD_LIGHT, margin: 0, lineHeight: 1.55,
              }}>
                &ldquo;The portal shall open soon.<br />Prepare your ascent.&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
           SECTION 3 — LOCATION + MAP  (proximity-grouped)
           Map paired with location info — expert Gestalt grouping
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div style={appear(240)}>
          {/* Section divider label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '1.5rem' }}>
            <div style={{ height: '1px', flex: 1, background: 'linear-gradient(90deg, transparent, rgba(201,162,39,0.35))' }} />
            <p style={{ ...sectionLabel, whiteSpace: 'nowrap' }}>
              ᚠ &nbsp; Find the Gateway &nbsp; ᚠ
            </p>
            <div style={{ height: '1px', flex: 1, background: 'linear-gradient(90deg, rgba(201,162,39,0.35), transparent)' }} />
          </div>

          {/* Map + Location card composite */}
          <div className="footer-map-section" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 340px',
            borderRadius: '20px',
            overflow: 'hidden',
            border: '1px solid rgba(201,162,39,0.25)',
            boxShadow: '0 16px 56px rgba(201,162,39,0.1), 0 4px 20px rgba(0,0,0,0.05)',
            background: 'rgba(255,255,255,0.4)',
          }}>
            {/* Map */}
            <div style={{ position: 'relative', minHeight: '340px', filter: 'invert(90%) hue-rotate(180deg) brightness(1.2)' }}>
              <iframe
                src={MAP_SRC}
                width="100%"
                height="100%"
                style={{ border: 0, display: 'block', position: 'absolute', inset: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="JSS Academy of Technical Education Location"
              />
            </div>

            {/* Location info panel (beside map — proximity principle) */}
            <div style={{
              padding: '2.5rem 2rem',
              background: 'linear-gradient(180deg, rgba(15,15,15,0.95), rgba(10,10,10,0.95))',
              backdropFilter: 'blur(14px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '1.5rem',
              borderLeft: '1px solid rgba(201,162,39,0.15)',
            }}>
              <p style={{ ...sectionLabel, marginBottom: '0' }}>Gateway Location</p>

              <div>
                <h3 style={{
                  fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 700,
                  letterSpacing: '0.08em', color: '#fff', margin: '0 0 0.5rem',
                  textTransform: 'uppercase',
                }}>
                  JSS Academy of<br />Technical Education
                </h3>
                <p style={{
                  fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: TEXT_SECONDARY, margin: 0, lineHeight: 1.6,
                }}>
                  Sector 62, Noida<br />
                  Uttar Pradesh 201301<br />
                  India
                </p>
              </div>

              {/* Divider */}
              <div style={{ height: '1px', background: `linear-gradient(90deg, rgba(201,162,39,0.3), transparent)` }} />

              {/* Quick contact in this panel too for proximity */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                <a href="mailto:contact@jssaten.ac.in" style={{
                  display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none',
                  fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: TEXT_SECONDARY, transition: 'color 200ms ease',
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = GOLD_LIGHT; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = TEXT_SECONDARY; }}
                >
                  <Mail size={11} color={GOLD_LIGHT} />
                  contact@jssaten.ac.in
                </a>
                <a href="tel:+917061557021" style={{
                  display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none',
                  fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: TEXT_SECONDARY, transition: 'color 200ms ease',
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = GOLD_LIGHT; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = TEXT_SECONDARY; }}
                >
                  <Phone size={11} color={GOLD_LIGHT} />
                  +91 70615 57021
                </a>
              </div>

              {/* CTA-style link to Google Maps */}
              <a
                href="https://maps.google.com/?q=JSS+Academy+of+Technical+Education+Noida"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '10px 20px', borderRadius: '10px',
                  border: `1px solid rgba(201,162,39,0.4)`,
                  background: `linear-gradient(135deg, rgba(255,252,234,0.9), rgba(245,217,128,0.25))`,
                  fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 800,
                  letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none',
                  color: GOLD_LIGHT, transition: 'all 250ms ease',
                  boxShadow: '0 2px 12px rgba(201,162,39,0.1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 24px rgba(201,162,39,0.25)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 2px 12px rgba(201,162,39,0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <MapPin size={12} />
                Get Directions
              </a>
            </div>
          </div>
        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
           SECTION 4 — BOTTOM BAR  (legal + branding)
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div style={{ ...appear(340), marginTop: '3.5rem', paddingTop: '1.5rem', position: 'relative' }}>
          {/* Divider */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(201,162,39,0.3) 25%, rgba(201,162,39,0.5) 50%, rgba(201,162,39,0.3) 75%, transparent)',
          }} />

          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem',
          }}>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: '0.7rem', letterSpacing: '0.12em', color: 'rgba(90,74,58,0.6)', margin: 0,
            }}>
              © 2026 Nibble Computer Society — All Rights Reserved
            </p>
            <p style={{
              fontFamily: 'var(--font-heading)', fontSize: '0.58rem', letterSpacing: '0.3em', textTransform: 'uppercase',
              background: `linear-gradient(90deg, ${GOLD_DARK}, ${GOLD}, ${GOLD_DARK})`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', margin: 0,
            }}>
              ᚠ &nbsp; Built in the Realm of Asgard &nbsp; ᚠ
            </p>
          </div>
        </div>
      </div>

      {/* ══ KEYFRAMES + RESPONSIVE ══ */}
      <style>{`
        @keyframes footerRaySway {
          0%, 100% { transform: translateX(0) skewY(-2deg); }
          50% { transform: translateX(6%) skewY(-2deg); }
        }

        /* ── Tablet ── */
        @media (max-width: 1024px) {
          .footer-map-section {
            grid-template-columns: 1fr !important;
          }
          .footer-map-section > div:first-child {
            min-height: 280px !important;
          }
        }

        /* ── Mobile ── */
        @media (max-width: 768px) {
          .footer-info-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
            padding: 2rem 1.5rem !important;
            gap: 2rem !important;
          }
          .footer-info-grid > div {
            align-items: center !important;
            border-left: none !important;
            padding-left: 0 !important;
            border-top: 1px solid rgba(201,162,39,0.12);
            padding-top: 1.5rem;
          }
          .footer-info-grid > div:first-child {
            border-top: none;
            padding-top: 0;
          }
          .footer-map-section {
            grid-template-columns: 1fr !important;
          }
          .footer-map-section > div:first-child {
            min-height: 220px !important;
          }
        }
      `}</style>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SUB-COMPONENTS
═══════════════════════════════════════════════════════════════ */

function FooterNavLink({ href, name }: { href: string; name: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative', display: 'inline-block',
        fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.1em',
        textTransform: 'uppercase', textDecoration: 'none',
        color: hovered ? GOLD_LIGHT : TEXT_SECONDARY,
        transition: 'color 250ms ease', padding: '3px 0',
      }}
    >
      {name}
      <span style={{
        position: 'absolute', bottom: 0, left: 0, height: '1px', width: '100%',
        background: `linear-gradient(90deg, ${GOLD}, ${GOLD_LIGHT})`,
        boxShadow: `0 0 6px rgba(201,162,39,0.5)`,
        transform: hovered ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left',
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
        display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none',
        transition: 'transform 200ms ease', transform: hovered ? 'translateX(3px)' : 'translateX(0)',
      }}
    >
      <span style={{
        width: '30px', height: '30px', borderRadius: '50%',
        border: '1px solid rgba(201,162,39,0.3)',
        background: hovered ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.05)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: GOLD_LIGHT, transition: 'background 200ms ease, box-shadow 200ms ease',
        boxShadow: hovered ? '0 0 16px rgba(201,162,39,0.3)' : 'none', flexShrink: 0,
      }}>
        {icon}
      </span>
      <span style={{
        fontFamily: 'var(--font-body)', fontSize: '0.82rem',
        color: hovered ? GOLD_LIGHT : TEXT_SECONDARY, transition: 'color 200ms ease',
      }}>
        {label}
      </span>
    </a>
  );
}

function SocialIcon({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '40px', height: '40px', borderRadius: '50%',
        border: `1px solid ${hovered ? 'rgba(201,162,39,0.6)' : 'rgba(201,162,39,0.3)'}`,
        background: hovered ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.05)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: GOLD_LIGHT, textDecoration: 'none', backdropFilter: 'blur(6px)',
        transition: 'all 250ms ease',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: hovered ? '0 4px 20px rgba(201,162,39,0.35)' : 'none',
      }}
    >
      {icon}
    </a>
  );
}
