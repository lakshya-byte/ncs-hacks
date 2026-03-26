'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-20 mt-auto w-full overflow-hidden bg-white px-8 pt-32 pb-12 shadow-[0_-10px_60px_rgba(201,162,39,0.08)]">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -z-10 h-[500px] w-full max-w-4xl -translate-x-1/2 rounded-[100%] bg-[radial-gradient(circle_at_top,rgba(201,162,39,0.1),transparent_70%)] opacity-80" />

      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-4 md:gap-8 lg:gap-16">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2 flex flex-col items-start gap-6">
            <Link
              href="/"
              className="group relative flex items-center font-cinzel text-2xl tracking-[0.25em] font-bold text-zinc-900 transition-colors duration-500 hover:text-[#c9a227]"
            >
              ASGARD
              <span className="absolute inset-0 -z-10 blur-[16px] opacity-0 bg-[#c9a227] transition-opacity duration-700 group-hover:opacity-30" />
            </Link>
            <p className="max-w-xs font-cinzel text-sm leading-relaxed tracking-[0.15em] text-zinc-500 uppercase">
              Where Legends Are Built
            </p>
          </div>

          {/* Links Column */}
          <div className="flex flex-col items-start gap-4">
            <h4 className="mb-2 font-cinzel text-xs font-semibold tracking-[0.2em] text-zinc-900 uppercase">
              Sitemap
            </h4>
            {['Home', 'About', 'Tracks', 'Timeline'].map((link) => (
              <Link
                key={link}
                href="#"
                className="group relative font-sans text-xs tracking-[0.1em] text-zinc-500 uppercase transition-all duration-300 hover:text-[#c9a227]"
              >
                {link}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#c9a227] opacity-0 transition-all duration-300 ease-out group-hover:w-full group-hover:opacity-100" />
              </Link>
            ))}
          </div>

          {/* Contact Column */}
          <div className="flex flex-col items-start gap-4">
            <h4 className="mb-2 font-cinzel text-xs font-semibold tracking-[0.2em] text-zinc-900 uppercase">
              Contact
            </h4>
            <a
              href="mailto:contact@asgard.com"
              className="group relative font-sans text-xs tracking-[0.1em] text-zinc-500 uppercase transition-colors duration-300 hover:text-[#c9a227]"
            >
              hello@asgard.com
            </a>
            <div className="flex items-center gap-4 mt-2">
              {/* Social Icons Placeholder */}
              {['Twitter', 'Instagram', 'Discord'].map((social) => (
                <Link
                  key={social}
                  href="#"
                  className="font-sans text-[10px] tracking-[0.1em] text-zinc-400 uppercase transition-all duration-300 hover:text-[#c9a227] hover:drop-shadow-[0_0_8px_rgba(201,162,39,0.5)]"
                >
                  {social}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="mt-24 border-t border-zinc-200/50 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-[10px] tracking-[0.15em] text-zinc-400 uppercase">
            &copy; {currentYear} Asgard Hackathon
          </p>
          
          <div className="flex items-center gap-2 group cursor-pointer">
            <span className="h-px w-6 bg-zinc-300 transition-colors group-hover:bg-[#c9a227]" />
            <p className="font-cinzel text-[9px] font-semibold tracking-[0.25em] text-zinc-500 uppercase transition-colors duration-500 group-hover:text-[#c9a227] group-hover:drop-shadow-[0_0_12px_rgba(201,162,39,0.8)]">
              Built in Asgard • Nibble Computer Society
            </p>
            <span className="h-px w-6 bg-zinc-300 transition-colors group-hover:bg-[#c9a227]" />
          </div>
        </div>
      </div>
    </footer>
  );
}
