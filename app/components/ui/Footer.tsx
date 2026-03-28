'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  FaInstagram as Instagram, 
  FaFacebook as Facebook, 
  FaXTwitter as Twitter, 
  FaLinkedin as Linkedin, 
  FaEnvelope as Mail, 
  FaPhone as Phone,
  FaDiamond as Rune 
} from 'react-icons/fa6';

gsap.registerPlugin(ScrollTrigger);

export default function GodLevelFooter() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 80%',
          end: 'bottom bottom',
          toggleActions: 'play none none reverse',
        },
      });

      tl.fromTo('.footer-ambient', { opacity: 0 }, { opacity: 1, duration: 1.4, ease: 'power2.out' })
        .fromTo('.footer-reveal', { y: 24, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.12, duration: 0.9, ease: 'power3.out' }, '-=1');

      gsap.to('.footer-ray', {
        xPercent: 8,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const socials = [
    { icon: <Instagram size={15} />, href: '#', label: 'Instagram' },
    { icon: <Facebook size={15} />, href: '#', label: 'Facebook' },
    { icon: <Twitter size={15} />, href: '#', label: 'X' },
    { icon: <Linkedin size={15} />, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer
      ref={footerRef}
      className="relative w-full overflow-hidden border-t border-[#FFD700]/35 bg-gradient-to-b from-[#fffdf8] via-[#faf7eb] to-[#f3efde] pt-20 pb-8 text-slate-700"
    >
      <div className="footer-ambient pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(ellipse_at_top,rgba(255,215,0,0.24)_0%,rgba(255,255,255,0)_70%)]" />
        <div className="footer-ray absolute inset-x-0 top-0 h-60 bg-[linear-gradient(115deg,rgba(255,255,255,0)_0%,rgba(255,215,0,0.3)_30%,rgba(255,255,255,0)_65%)] blur-2xl" />
        <div className="absolute left-[8%] top-16 h-44 w-44 rounded-full bg-white/80 blur-3xl" />
        <div className="absolute right-[10%] top-28 h-52 w-52 rounded-full bg-[#fff8dd]/70 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: 'radial-gradient(rgba(201,162,39,0.25) 0.7px, transparent 0.7px)',
            backgroundSize: '4px 4px',
          }}
        />
      </div>

      <div className="site-container relative z-10">
        <div className="footer-reveal mb-14 flex items-center justify-center gap-3 text-center">
          <Rune className="text-[#D4AF37] drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]" size={12} />
          <p className="bg-gradient-to-r from-[#8f6b14] via-[#FFD700] to-[#8f6b14] bg-clip-text font-serif text-[12px] font-bold tracking-[0.32em] text-transparent [text-shadow:0_0_16px_rgba(212,175,55,0.25)]">
            THE REALM RESTS BEYOND THIS POINT
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 text-center md:grid-cols-3 md:text-left">
          <section className="footer-reveal flex flex-col items-center gap-5 md:items-start">
            <div className="rounded-2xl border border-[#FFD700]/45 bg-white/75 px-5 py-3 backdrop-blur-sm shadow-[0_8px_30px_rgba(212,175,55,0.16)]">
              <p className="font-serif text-2xl font-bold tracking-[0.16em] text-[#76570d]">NIBBLE</p>
            </div>
            <p className="font-sans text-xs uppercase tracking-[0.24em] text-slate-600">
              Official Technical Society of JSSATEN
            </p>
            <p className="max-w-sm font-serif text-base italic leading-relaxed text-slate-700">
              Where Builders Rise. Where Innovation Becomes Legacy.
            </p>
          </section>

          <section className="footer-reveal flex flex-col items-center gap-5 md:items-center">
            <div className="w-full max-w-sm overflow-hidden rounded-3xl border border-[#FFD700]/50 bg-white/80 p-2 shadow-[0_14px_40px_rgba(212,175,55,0.18)]">
              <div className="overflow-hidden rounded-2xl">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.061217036986!2d77.35921007624128!3d28.6279268756671!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce541bc323221%3A0x7d01eb0f93a1158a!2sJSS%20Academy%20of%20Technical%20Education!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  title="JSSATEN Map"
                  width="100%"
                  height="220"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-[220px] w-full"
                />
              </div>
            </div>
            <div className="w-full max-w-sm rounded-2xl border border-[#FFD700]/45 bg-white/70 px-5 py-4 text-center shadow-[0_10px_28px_rgba(212,175,55,0.16)] backdrop-blur-md">
              <p className="font-serif text-sm tracking-[0.08em] text-[#76570d]">Gateway Location</p>
              <p className="mt-1 font-sans text-sm leading-relaxed text-slate-700">
                JSS Academy of Technical Education, Sector 62, Noida, Uttar Pradesh
              </p>
            </div>
          </section>

          <section className="footer-reveal flex flex-col items-center gap-5 md:items-end">
            <div className="flex flex-col gap-4 text-center md:text-right">
              <a href="mailto:contact@jssaten.ac.in" className="group flex items-center justify-center gap-3 md:justify-end">
                <span className="rounded-full border border-[#FFD700]/45 bg-white/65 p-2 text-[#b8860b] shadow-[0_0_0_rgba(212,175,55,0)] transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.35)]">
                  <Mail size={13} />
                </span>
                <span className="font-sans text-sm text-slate-700 transition-colors group-hover:text-[#8f6b14]">contact@jssaten.ac.in</span>
              </a>
              <a href="tel:+917061557021" className="group flex items-center justify-center gap-3 md:justify-end">
                <span className="rounded-full border border-[#FFD700]/45 bg-white/65 p-2 text-[#b8860b] shadow-[0_0_0_rgba(212,175,55,0)] transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.35)]">
                  <Phone size={13} />
                </span>
                <span className="font-sans text-sm text-slate-700 transition-colors group-hover:text-[#8f6b14]">+91 70615 57021</span>
              </a>
            </div>
            <div className="flex items-center justify-center gap-3 md:justify-end">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#FFD700]/45 bg-white/60 text-[#8f6b14] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_22px_rgba(212,175,55,0.35)]"
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <div className="w-full max-w-sm rounded-2xl border border-[#FFD700]/55 bg-gradient-to-br from-[#fff9ea] via-[#fffdf7] to-[#fff1cb] px-5 py-4 text-center shadow-[0_14px_30px_rgba(212,175,55,0.2)] md:text-right">
              <p className="font-serif text-base italic text-[#7a5b10]">
                The portal shall open soon. Prepare your ascent.
              </p>
            </div>
          </section>
        </div>

        <div className="footer-reveal mt-14 border-t border-[#D4AF37]/45 pt-5 text-center">
          <p className="font-sans text-[11px] tracking-[0.16em] text-slate-600/90">
            © 2026 Nibble Computer Society — All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
