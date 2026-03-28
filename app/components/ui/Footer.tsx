'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  FaInstagram as Instagram, 
  FaFacebook as Facebook, 
  FaXTwitter as Twitter, 
  FaLinkedin as Linkedin, 
  FaMapPin as MapPin, 
  FaXmark as X, 
  FaArrowUpRightFromSquare as ArrowUpRight, 
  FaEnvelope as Mail, 
  FaRadio as Radio 
} from 'react-icons/fa6';

gsap.registerPlugin(ScrollTrigger);

export default function GodLevelFooter() {
  const footerRef = useRef<HTMLElement>(null);
  const [isMapOpen, setIsMapOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 85%',
          end: 'bottom bottom',
          toggleActions: 'play none none reverse',
        },
      });

      tl.fromTo('.ambient-bg', { opacity: 0 }, { opacity: 1, duration: 2, ease: 'power2.inOut' })
        .fromTo('.reveal-text', { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.15, duration: 1, ease: 'power3.out' }, '-=1.5')
        .fromTo('.reveal-col', { y: 40, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.15, duration: 1.2, ease: 'power3.out' }, '-=1')
        .fromTo('.giant-text', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1.5, ease: 'power4.out' }, '-=1');
    }, footerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (isMapOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [isMapOpen]);

  return (
    <>
      <footer
        ref={footerRef}
        className="relative w-full overflow-hidden bg-[#FAFAF8] text-slate-800 section-main pb-8 selection:bg-[#FFD700]/30 selection:text-slate-900 z-10 border-t border-[#FFD700]/20"
      >
        {/* ════ DIVINE BACKGROUND AMBIENCE ════ */}
        <div className="ambient-bg absolute top-0 left-1/2 -translate-x-1/2 w-[120vw] max-w-[1400px] h-[800px] bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.08)_0%,rgba(250,250,248,0)_70%)] pointer-events-none -z-10" />

        {/* ── Site-standard centred container ── */}
        <div className="container-main relative z-10 flex flex-col items-center">
          
          {/* ════ FINAL CTA ECHO ════ */}
          <div className="flex flex-col items-center text-center mb-24 w-full">
            <h2 className="reveal-text font-serif text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-tight tracking-tight text-slate-900 drop-shadow-[0_0_25px_rgba(212,175,55,0.25)]">
              Enter the Realm
            </h2>
            <p className="reveal-text mt-3 font-sans text-[clamp(0.85rem,1.2vw,1rem)] text-slate-500 font-light tracking-[0.2em] uppercase">
              The journey begins where others stop
            </p>
          </div>

          {/* ════ MAIN GRID (3 columns) ════ */}
          <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-12 w-full mb-24 items-start">
            
            {/* ── COLUMN 1: IDENTITY & SOCIALS ── */}
            <div className="reveal-col col-span-4 md:col-span-4 lg:col-span-4 flex flex-col gap-8 md:justify-self-start">
              <div className="flex flex-col gap-3">
                <h3 className="font-serif text-[11px] font-bold tracking-[0.25em] text-[#B8860B] uppercase">
                  Nibble Contacts
                </h3>
                <p className="font-sans text-[13px] text-slate-500 font-light leading-relaxed max-w-[280px]">
                  Establish a link with our divine communication networks.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                {[
                  { icon: <Instagram size={18} />, title: "Visual Archives", href: "#" },
                  { icon: <Facebook size={18} />, title: "The Assembly", href: "#" },
                  { icon: <Twitter size={18} />, title: "Rapid Comms", href: "#" },
                  { icon: <Linkedin size={18} />, title: "Official Records", href: "#" },
                ].map((social, idx) => (
                  <a key={idx} href={social.href} className="flex items-center gap-4 group w-fit cursor-pointer">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full border border-[#FFD700]/20 text-[#B8860B] group-hover:bg-[#FFD700]/10 group-hover:border-[#FFD700]/50 transition-all duration-300">
                      {social.icon}
                    </span>
                    <span className="font-sans text-[10px] font-semibold tracking-[0.2em] text-slate-600 uppercase group-hover:text-slate-900 transition-colors">
                      {social.title}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* ── COLUMN 2: THE GATEWAY MAP (CENTERPIECE) ── */}
            <div className="reveal-col col-span-4 md:col-span-4 lg:col-span-4 flex flex-col gap-8 items-center text-center md:justify-self-center">
              <div className="flex flex-col gap-3 items-center">
                <h3 className="font-serif text-[11px] font-bold tracking-[0.25em] text-[#B8860B] uppercase">
                  Gateway Coordinates
                </h3>
                <p className="font-sans text-[13px] text-slate-500 font-light leading-relaxed">
                  The portal to the realm
                </p>
              </div>
              
              <div className="relative w-full aspect-[4/3] max-w-[260px] rounded-2xl overflow-hidden group shadow-[0_10px_40px_rgba(212,175,55,0.08)] border border-[#FFD700]/30 transition-all duration-500 hover:shadow-[0_15px_50px_rgba(212,175,55,0.15)] hover:border-[#FFD700]/50 bg-slate-100">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.061217036986!2d77.35921007624128!3d28.6279268756671!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce541bc323221%3A0x7d01eb0f93a1158a!2sJSS%20Academy%20of%20Technical%20Education!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(100%) contrast(1.1) opacity(0.6)' }}
                  loading="lazy"
                  className="relative pointer-events-none transition-transform duration-1000 group-hover:scale-110 object-cover"
                />
                
                {/* Sleek Action Overlay */}
                <div className="absolute inset-0 z-20 bg-gradient-to-t from-white/95 via-white/20 to-transparent flex items-end justify-center pb-6 opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                  <button 
                    onClick={() => setIsMapOpen(true)}
                    className="flex items-center gap-2 px-6 py-2.5 bg-white/90 shadow-[0_5px_15px_rgba(212,175,55,0.1)] border border-[#FFD700]/30 rounded-full text-[#B8860B] font-sans text-[10px] font-bold tracking-widest uppercase hover:bg-[#D4AF37] hover:text-white hover:border-[#D4AF37] transition-all duration-300"
                  >
                    <MapPin size={12} />
                    Activate Map
                  </button>
                </div>
              </div>

              <div className="text-center font-sans text-[11px] text-slate-500 tracking-[0.15em] uppercase leading-relaxed mt-2">
                JSS Academy of Tech<br />
                Sector 62, Noida
              </div>
            </div>

            {/* ── COLUMN 3: TRANSMISSIONS & NOTICES ── */}
            <div className="reveal-col col-span-4 md:col-span-8 lg:col-span-4 flex flex-col gap-8 md:justify-self-end w-full max-w-[280px]">
              <div className="flex flex-col gap-3">
                <h3 className="font-serif text-[11px] font-bold tracking-[0.25em] text-[#B8860B] uppercase">
                  Comm Transmissions
                </h3>
                <p className="font-sans text-[13px] text-slate-500 font-light leading-relaxed">
                  Establish a direct link
                </p>
              </div>
              
              <div className="flex flex-col gap-6">
                {/* Mail */}
                <div className="flex items-start gap-4 group">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full border border-[#FFD700]/20 text-[#B8860B] group-hover:bg-[#FFD700]/10 transition-colors">
                    <Mail size={14} />
                  </span>
                  <div className="pt-1.5">
                    <span className="block font-sans text-[9px] font-bold tracking-[0.2em] text-slate-400 uppercase mb-1">
                      Divine Mailbox
                    </span>
                    <a href="mailto:contact@jssaten.ac.in" className="font-sans text-[13px] font-medium text-slate-700 hover:text-[#D4AF37] transition-colors tracking-wide">
                      contact@jssaten.ac.in
                    </a>
                  </div>
                </div>

                {/* Frequencies */}
                <div className="flex items-start gap-4">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full border border-[#FFD700]/20 text-[#B8860B]">
                    <Radio size={14} />
                  </span>
                  <div className="pt-1.5 w-full">
                    <span className="block font-sans text-[9px] font-bold tracking-[0.2em] text-slate-400 uppercase mb-3">
                      Walkie-Talkie Frequencies
                    </span>
                    <ul className="font-sans text-[13px] text-slate-600 space-y-3 w-full border-t border-[#FFD700]/10 pt-3">
                      <li className="flex justify-between items-center group cursor-default">
                        <span className="font-medium text-slate-700 group-hover:text-[#D4AF37] transition-colors tracking-wide">+91 70615 57021</span>
                        <span className="text-slate-400 text-[9px] uppercase tracking-[0.2em]">Gunabh</span>
                      </li>
                      <li className="flex justify-between items-center group cursor-default">
                        <span className="font-medium text-slate-700 group-hover:text-[#D4AF37] transition-colors tracking-wide">+91 99713 37999</span>
                        <span className="text-slate-400 text-[9px] uppercase tracking-[0.2em]">Akshat</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Notice Card */}
              <div className="mt-2 p-5 rounded-2xl border border-[#FFD700]/20 bg-gradient-to-br from-[#FFD700]/5 to-transparent relative overflow-hidden group hover:border-[#FFD700]/40 transition-colors duration-500">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#FFD700]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <h4 className="font-serif text-[10px] font-bold tracking-[0.2em] text-[#B8860B] uppercase mb-3 flex items-center justify-between">
                  Realm Gazette
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFD700] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4AF37]"></span>
                  </span>
                </h4>
                <p className="font-sans text-[12px] text-slate-600/90 leading-relaxed font-light italic">
                  &quot;The event commences when the portal opens. Bring your systems. Innovation awaits beyond the rift!&quot;
                </p>
              </div>
            </div>
          </div>

          {/* ════ BOTTOM GIANT TEXT ════ */}
          <div className="giant-text flex flex-col items-center text-center mt-6 relative w-full pt-12">
            
            {/* Elegant Divider & Badge */}
            <div className="absolute top-0 w-full flex items-center justify-center z-10">
              <div className="h-[1px] w-[30%] max-w-[200px] bg-gradient-to-r from-transparent to-[#D4AF37]/40" />
              <div className="w-1.5 h-1.5 rotate-45 border border-[#D4AF37]/50 mx-4" />
              <p className="font-serif text-[10px] tracking-[0.5em] text-[#B8860B] uppercase whitespace-nowrap pt-0.5">
                An Asgardian Legacy
              </p>
              <div className="w-1.5 h-1.5 rotate-45 border border-[#D4AF37]/50 mx-4" />
              <div className="h-[1px] w-[30%] max-w-[200px] bg-gradient-to-l from-transparent to-[#D4AF37]/40" />
            </div>

            {/* Subtle giant text */}
            <h1 className="m-0 font-serif text-[clamp(6rem,22vw,18rem)] font-black leading-[0.75] tracking-tighter select-none text-[#F3F3EF] drop-shadow-[0_20px_40px_rgba(212,175,55,0.05)]">
              NIOH
            </h1>
          </div>

          {/* ════ COPYRIGHT ════ */}
          <div className="mt-12 text-center reveal-col w-full border-t border-slate-200/60 pt-6">
              <p className="font-sans text-[10px] tracking-[0.2em] text-slate-400 uppercase">
                © {new Date().getFullYear()} The NIOH Post | All Rights Reserved | &quot;Stay Curious&quot;
              <br />
              <span className="text-[#B8860B] mt-2 block font-medium">Transmitted by JSS Academy Creative Labs</span>
            </p>
          </div>

        </div>
      </footer>

      {/* ════ MAP POPUP MODAL ════ */}
      {isMapOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12">
          <div 
            className="absolute inset-0 bg-white/60 backdrop-blur-md transition-opacity animate-in fade-in duration-300"
            onClick={() => setIsMapOpen(false)}
          />
          
          <div className="relative w-full max-w-5xl h-[80vh] bg-[#FAFAF8] rounded-2xl shadow-[0_20px_60px_rgba(212,175,55,0.2)] border border-[#FFD700]/40 overflow-hidden flex flex-col animate-in zoom-in-95 duration-500">
            <div className="flex items-center justify-between p-5 border-b border-[#FFD700]/20 bg-white/80 backdrop-blur-md absolute top-0 w-full z-10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#FFD700]/10 rounded-full text-[#B8860B]">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="font-serif text-base font-bold tracking-widest text-slate-900 uppercase">
                    The Gateway Coordinates
                  </h3>
                  <p className="font-sans text-[10px] text-slate-500 uppercase tracking-widest">
                    Real-Time Map Data
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsMapOpen(false)}
                className="p-2 rounded-full hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="w-full h-full pt-[80px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.061217036986!2d77.35921007624128!3d28.6279268756671!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce541bc323221%3A0x7d01eb0f93a1158a!2sJSS%20Academy%20of%20Technical%20Education!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>

            <a 
              href="https://goo.gl/maps/YOUR_LINK_HERE" 
              target="_blank" 
              rel="noopener noreferrer"
              className="absolute bottom-6 right-6 flex items-center gap-2 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-white px-5 py-3 rounded-full font-sans text-[11px] font-bold tracking-widest uppercase shadow-[0_10px_20px_rgba(212,175,55,0.3)] hover:scale-105 transition-transform duration-300"
            >
              Open in App <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      )}
    </>
  );
}
