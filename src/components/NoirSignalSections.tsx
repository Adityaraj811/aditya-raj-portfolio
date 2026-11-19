import React, { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUp, ArrowUpRight, X } from 'lucide-react';
import { portfolioConfig } from '../data/portfolioConfig';
import { ScrollReveal } from './ScrollReveal';
import { NoirScrambleText } from './NoirScrollFx';
import { NoirTypeHeading, NoirWords } from './NoirFx2';
import { NoirHoverScramble } from './NoirChrome';
import { prefersReducedMotion } from '../utils/motion';

/**
 * Faithful ports of the Framer "Noir Signal" template sections that the
 * portfolio was missing: 04.5 Gallery, 06 Clients, 08 Experience,
 * 09 Recognition, 10 Words and the oversized studio footer.
 * Palette, type scale and hairlines mirror the template exactly:
 *   #050505 / #0E0E0E surfaces · #F2F0EB ink · #A8A8A8 muted · #E10600 signal
 *   Anton display · Instrument Serif italic accents · JetBrains Mono 11px labels
 */

const { signalSections, personal } = portfolioConfig;
const EASE = [0.16, 1, 0.3, 1] as const;

/* ------------------------------------------------------------------------- */
/* Shared chapter header — "08 — EXPERIENCE ........ (08/13)"                 */
/* ------------------------------------------------------------------------- */
const ChapterHead: React.FC<{ index: string; label: string; code: string; inverted?: boolean }> = ({
  index,
  label,
  code,
  inverted,
}) => (
  <div
    className={`flex items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.16em] ${
      inverted ? 'text-[#050505]' : 'text-zinc-500 dark:text-[#A8A8A8]'
    }`}
  >
    <span className="inline-flex items-center gap-3">
      <span className="w-1.5 h-1.5 bg-[#E10600]" aria-hidden="true" />
      <NoirScrambleText text={`${index} — ${label}`} />
    </span>
    <NoirScrambleText text={`(${code})`} />
  </div>
);

const Title: React.FC<{ lead: string; accent: string; inverted?: boolean; className?: string }> = ({
  lead,
  accent,
  inverted,
  className = '',
}) => (
  <h2
    className={`font-display uppercase tracking-tight leading-[0.92] text-4xl sm:text-6xl lg:text-7xl ${
      inverted ? 'text-[#050505]' : 'text-[#111111] dark:text-[#F2F0EB]'
    } ${className}`}
  >
    {lead}{' '}
    <span className="font-editorial italic lowercase font-normal text-[#E10600]">{accent}</span>
  </h2>
);

/* ========================================================================= */
/* 04.5 — GALLERY · "Frames from the cutting room" expanding stills strip    */
/* ========================================================================= */
export const NoirStillsGallery: React.FC = () => {
  const stills = signalSections.gallery;
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const total = String(stills.length).padStart(2, '0');

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowRight') setLightbox((i) => (i === null ? i : (i + 1) % stills.length));
      if (e.key === 'ArrowLeft') setLightbox((i) => (i === null ? i : (i - 1 + stills.length) % stills.length));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox, stills.length]);

  return (
    <section id="gallery" className="py-20 sm:py-28 bg-[#050505] text-[#F2F0EB] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        <ScrollReveal direction="up">
          <div className="space-y-6">
            <div className="flex items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.16em] text-[#A8A8A8]">
              <span className="inline-flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-[#E10600]" aria-hidden="true" />
                04.5 — Gallery
              </span>
              <span>(Stills)</span>
            </div>
            <h2 className="font-display uppercase tracking-tight leading-[0.92] text-4xl sm:text-6xl lg:text-7xl text-[#F2F0EB]">
              Frames from the{' '}
              <span className="font-editorial italic lowercase font-normal text-[#E10600]">cutting room</span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Desktop: expanding flex accordion · Mobile: snap-scroll cards */}
        <div className="flex gap-2 sm:gap-3 h-[460px] sm:h-[560px] lg:h-[620px] overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none -mx-4 px-4 md:mx-0 md:px-0">
          {stills.map((still, i) => {
            const isActive = i === active;
            const num = String(i + 1).padStart(2, '0');
            return (
              <motion.div
                key={still.title}
                layout
                transition={{ duration: 0.7, ease: EASE }}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => (isActive ? setLightbox(i) : setActive(i))}
                tabIndex={0}
                role="button"
                data-noir-cursor="VIEW"
                aria-label={`${still.title} — ${still.meta}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setLightbox(i);
                  }
                }}
                className={`group relative shrink-0 snap-center overflow-hidden rounded-[14px] border border-[#F2F0EB]/10 bg-[#0E0E0E] cursor-pointer outline-none focus-visible:border-[#E10600] w-[78vw] sm:w-[60vw] ${
                  isActive ? 'md:flex-[6] md:w-auto' : 'md:flex-[1] md:w-auto md:min-w-[56px]'
                }`}
              >
                <img
                  src={still.image}
                  alt={`${still.title} — ${still.meta}`}
                  loading="lazy"
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                    isActive ? 'grayscale-0 scale-100 opacity-100' : 'md:grayscale md:scale-110 md:opacity-55'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/90 via-[#050505]/10 to-transparent" />

                {/* Collapsed vertical label */}
                <div
                  className={`hidden md:flex absolute inset-0 items-end justify-center pb-6 transition-opacity duration-300 ${
                    isActive ? 'opacity-0' : 'opacity-100'
                  }`}
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#F2F0EB] [writing-mode:vertical-rl] rotate-180 whitespace-nowrap">
                    {num} — {still.title}
                  </span>
                </div>

                {/* Expanded caption */}
                <div
                  className={`absolute left-0 right-0 bottom-0 p-5 sm:p-7 flex items-end justify-between gap-4 transition-all duration-500 ${
                    isActive ? 'opacity-100 translate-y-0' : 'md:opacity-0 md:translate-y-4'
                  }`}
                >
                  <div className="min-w-0">
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#E10600] mb-2 truncate">
                      {num} / {total} · {still.meta}
                    </p>
                    <p className="font-display uppercase text-4xl sm:text-5xl leading-none text-[#F2F0EB] truncate">
                      {still.title}
                    </p>
                  </div>
                  <span className="shrink-0 w-11 h-11 rounded-full border border-[#F2F0EB]/30 group-hover:bg-[#E10600] group-hover:border-[#E10600] flex items-center justify-center transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Cinema lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-[#050505]/95 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-10"
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-modal="true"
            aria-label={stills[lightbox].title}
          >
            <div className="absolute top-4 left-4 right-4 sm:top-6 sm:left-8 sm:right-8 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.16em] text-[#A8A8A8]">
              <span>
                <span className="text-[#E10600]">{String(lightbox + 1).padStart(2, '0')}</span> / {total} ·{' '}
                {stills[lightbox].meta}
              </span>
              <button
                type="button"
                onClick={() => setLightbox(null)}
                className="w-10 h-10 rounded-full border border-[#F2F0EB]/25 hover:border-[#E10600] flex items-center justify-center text-[#F2F0EB] cursor-pointer"
                aria-label="Close gallery"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <motion.img
              key={lightbox}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: EASE }}
              src={stills[lightbox].image}
              alt={stills[lightbox].title}
              className="max-h-[78vh] max-w-full rounded-[14px] border border-[#F2F0EB]/10 object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <p className="mt-6 font-display uppercase text-3xl sm:text-5xl text-[#F2F0EB]">{stills[lightbox].title}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

/* ========================================================================= */
/* 06 — CLIENTS · "the brave few" hairline name wall                         */
/* ========================================================================= */
// Client name that glitch-scrambles while its row is hovered (template behaviour)
const ClientName: React.FC<{ name: string }> = ({ name }) => {
  const ref = React.useRef<HTMLSpanElement>(null);
  const [out, setOut] = useState(name);
  useEffect(() => {
    const host = ref.current?.closest('li') as HTMLElement | null;
    if (!host || prefersReducedMotion()) return;
    let id = 0;
    const glyphs = '!<>-_/[]{}=+*^?#%&';
    const run = () => {
      window.clearInterval(id);
      const start = performance.now();
      id = window.setInterval(() => {
        const p = Math.min(1, (performance.now() - start) / 450);
        const settled = Math.floor(p * name.length);
        setOut(name.split('').map((c, i) => (i < settled || c === ' ' ? c : glyphs[Math.floor(Math.random() * glyphs.length)])).join(''));
        if (p >= 1) window.clearInterval(id);
      }, 30);
    };
    host.addEventListener('pointerenter', run);
    host.addEventListener('focusin', run);
    return () => {
      window.clearInterval(id);
      host.removeEventListener('pointerenter', run);
      host.removeEventListener('focusin', run);
    };
  }, [name]);
  return (
    <span ref={ref} aria-label={name}>
      <span aria-hidden="true">{out}</span>
    </span>
  );
};

export const NoirClientsWall: React.FC = () => (
  <section id="clients" className="relative py-20 sm:py-28 bg-[#050505] text-[#F2F0EB] overflow-hidden">
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none"
      style={{ background: 'radial-gradient(40% 55% at 50% 60%, rgba(225,6,0,0.14), transparent 70%)' }}
    />
    <div className="relative max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
      <div className="flex items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.16em] text-[#A8A8A8]">
        <span className="inline-flex items-center gap-3">
          <span className="w-1.5 h-1.5 bg-[#E10600]" aria-hidden="true" />
          <NoirScrambleText text="06 — Clients" />
        </span>
        <NoirScrambleText text="(In association)" />
      </div>

      <div className="text-center space-y-2">
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#A8A8A8]">
          <NoirScrambleText text="— In association with —" duration={900} />
        </p>
        <p className="font-editorial italic lowercase text-[#E10600] text-6xl sm:text-8xl leading-none pr-[0.08em]">
          <NoirWords by="char" stagger={0.045}>the brave few</NoirWords>
        </p>
      </div>

      <ul className="flex flex-col items-center gap-1.5 sm:gap-2">
        {signalSections.clients.map((client, i) => (
          <motion.li
            key={client.name}
            initial={{ opacity: 0, filter: 'blur(12px)', x: 24 }}
            whileInView={{ opacity: 1, filter: 'blur(0px)', x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: 0.35 + i * 0.12, ease: EASE }}
            className="group grid grid-cols-[1fr_auto_1fr] items-center gap-4 sm:gap-6 w-full cursor-default"
          >
            <span className="text-right font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#6B6B6B] group-hover:text-[#A8A8A8] transition-colors">
              {client.sector}
            </span>
            <span
              aria-hidden="true"
              className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-[#E10600]' : 'bg-[#F2F0EB]/30 group-hover:bg-[#E10600]'} transition-colors`}
            />
            <span
              tabIndex={0}
              role="button"
              className="font-display uppercase leading-none tracking-tight text-[#F2F0EB] group-hover:text-[#E10600] group-hover:translate-x-1.5 focus-visible:text-[#E10600] outline-none transition-all duration-300 text-3xl sm:text-5xl"
            >
              <ClientName name={client.name} />
            </span>
          </motion.li>
        ))}
      </ul>

      <p className="text-center font-mono text-[11px] uppercase tracking-[0.2em] text-[#6B6B6B]">
        And every brand ready to grow digitally
      </p>
    </div>
  </section>
);

/* ========================================================================= */
/* 08 — EXPERIENCE · inverted bone panel with year / role / org / location   */
/* ========================================================================= */
export const NoirExperience: React.FC = () => (
  <section id="experience" className="py-20 sm:py-28 bg-[#F2F0EB] text-[#050505]">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-14">
      <ScrollReveal direction="up">
        <div className="space-y-8">
          <ChapterHead index="08" label="Experience" code="Timeline" inverted />
          <NoirTypeHeading
            lead="Built in"
            accent="motion"
            className="tracking-tight leading-[0.92] text-[#050505]"
            style={{ fontSize: 'clamp(2.6rem, 6.4vw, 5rem)' }}
          />
        </div>
      </ScrollReveal>

      <div className="border-t border-[#050505]/15">
        {signalSections.experience.map((row, i) => (
          <ScrollReveal key={row.role} direction="up" delayMs={i * 70}>
            <motion.div
              whileHover={{ x: 10 }}
              transition={{ duration: 0.32, ease: EASE }}
              className="group grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-8 items-baseline py-6 sm:py-7 px-3 -mx-3 border-b border-[#050505]/15 hover:bg-[#E10600]/[0.07] transition-colors"
            >
              <p
                className={`md:col-span-3 font-display uppercase text-xl sm:text-[21px] tracking-wide ${
                  i === 0 ? 'text-[#E10600]' : 'text-[#050505]/35 group-hover:text-[#E10600] transition-colors'
                }`}
              >
                {row.period}
              </p>
              <h3 className="md:col-span-4 font-display uppercase text-2xl sm:text-[30px] leading-[1.02] tracking-tight">
                {row.role}
              </h3>
              <p className="md:col-span-3 text-base sm:text-[17px]">{row.org}</p>
              <p className="md:col-span-2 md:text-right font-mono text-[11px] uppercase tracking-[0.16em] text-[#050505]/55">
                {row.location}
              </p>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

/* ========================================================================= */
/* 09 — RECOGNITION · giant outlined numeral + award rows                    */
/* ========================================================================= */
export const NoirRecognition: React.FC = () => {
  const { headline, caption, items } = signalSections.recognition;
  return (
    <section id="recognition" className="relative py-20 sm:py-28 bg-[#050505] text-[#F2F0EB] overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(45% 60% at 80% 40%, rgba(225,6,0,0.12), transparent 70%)' }}
      />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="flex items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.16em] text-[#A8A8A8]">
          <span className="inline-flex items-center gap-3">
            <span className="w-1.5 h-1.5 bg-[#E10600]" aria-hidden="true" />
            <NoirScrambleText text="09 — Recognition" />
          </span>
          <NoirScrambleText text="(Milestones)" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          <div className="lg:col-span-4 relative min-h-[300px] lg:min-h-[380px]">
            {/* faint outlined numeral sitting low behind the heading */}
            <p
              aria-hidden="true"
              className="absolute left-0 bottom-0 font-display uppercase leading-[0.8] text-transparent select-none noir-outline-numeral opacity-25"
              style={{ fontSize: 'clamp(7rem, 16vw, 12rem)' }}
            >
              {headline}
            </p>
            <NoirTypeHeading
              lead="Quiet"
              accent="recognition"
              breakBeforeAccent
              className="relative tracking-tight leading-[0.92] text-[#F2F0EB]"
              style={{ fontSize: 'clamp(2.8rem, 5.6vw, 4.6rem)' }}
            />
            <p className="relative mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-[#A8A8A8] max-w-xs">
              {headline} — {caption}
            </p>
          </div>

          <div className="lg:col-span-8 border-t border-[#F2F0EB]/10">
            {items.map((item, i) => (
              <ScrollReveal key={item.title} direction="up" delayMs={i * 50}>
                <motion.div
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.32, ease: EASE }}
                  className="group grid grid-cols-12 gap-4 items-baseline py-4 sm:py-5 border-b border-[#F2F0EB]/10"
                >
                  <p className="col-span-12 sm:col-span-8 text-base sm:text-lg leading-snug text-[#F2F0EB] group-hover:text-[#E10600] transition-colors">
                    {item.title}
                  </p>
                  <p className="col-span-6 sm:col-span-2 font-mono text-[11px] uppercase tracking-[0.16em] text-[#E10600]">
                    {item.tag}
                  </p>
                  <p className="col-span-6 sm:col-span-2 text-right font-mono text-[11px] uppercase tracking-[0.16em] text-[#A8A8A8]">
                    {item.year}
                  </p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ========================================================================= */
/* 10 — WORDS · inverted testimonial slider with progress segments           */
/* ========================================================================= */
export const NoirTestimonials: React.FC = () => {
  const isDev = import.meta.env.DEV;
  const quotes = signalSections.testimonials.filter((t) => t.quote.trim() || isDev);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = quotes.length;

  const go = useCallback((dir: number) => setIndex((i) => (i + dir + count) % count), [count]);

  useEffect(() => {
    if (paused || count < 2) return;
    const id = window.setTimeout(() => go(1), 7000);
    return () => window.clearTimeout(id);
  }, [index, paused, count, go]);

  if (count === 0) return null;
  const current = quotes[index];
  const isPlaceholder = !current.quote.trim();
  const text = isPlaceholder
    ? `[Placeholder — add a real quote from ${current.role} in portfolioConfig.ts › signalSections.testimonials. Hidden on the live site until filled.]`
    : current.quote;

  return (
    <section
      id="words"
      className="py-20 sm:py-28 bg-[#F2F0EB] text-[#050505]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
        <ChapterHead index="10" label="Words" code="Clients" inverted />

        <div className="flex flex-col items-center text-center gap-6">
          <span aria-hidden="true" className="font-display text-7xl sm:text-8xl leading-[0.6] text-[#E10600] pt-6">
            “
          </span>
          <div className="space-y-8 min-h-[220px] max-w-4xl w-full flex flex-col items-center">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={index}
                initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
                transition={{ duration: 0.6, ease: EASE }}
                className="space-y-6"
              >
                <p
                  className={`font-editorial italic text-3xl sm:text-[42px] leading-[1.12] ${
                    isPlaceholder ? 'text-[#050505]/40' : 'text-[#050505]'
                  }`}
                >
                  {text}
                </p>
                <footer className="font-mono text-xs uppercase tracking-[0.16em] text-[#5A5A5A]">
                  {current.author} — {current.role}
                </footer>
              </motion.blockquote>
            </AnimatePresence>

            <div className="flex items-center justify-center gap-4 w-full">
              <button
                type="button"
                onClick={() => go(-1)}
                className="w-10 h-10 rounded-full border border-[#050505]/20 hover:border-[#E10600] hover:text-[#E10600] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Previous testimonial"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
              <div className="flex items-center gap-2" aria-hidden="true">
                {quotes.map((_, i) => (
                  <div key={i} className="w-11 h-[2px] bg-[#050505]/15 overflow-hidden">
                    {i === index && (
                      <motion.div
                        key={`${index}-${paused}`}
                        className="h-full bg-[#E10600] origin-left"
                        initial={{ scaleX: paused ? 1 : 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: paused ? 0 : 7, ease: 'linear' }}
                      />
                    )}
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => go(1)}
                className="w-10 h-10 rounded-full border border-[#050505]/20 hover:border-[#E10600] hover:text-[#E10600] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Next testimonial"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <span className="ml-4 font-mono text-[10px] uppercase tracking-[0.16em] text-[#6B6B6B] tabular-nums">
                {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ========================================================================= */
/* STUDIO FOOTER · newsletter, three link columns, info cards, wordmark      */
/* ========================================================================= */
// Footer link inner: crimson lead dot + hover scramble + hairline underline
const LinkFx: React.FC<{ label: string }> = ({ label }) => (
  <>
    <span
      aria-hidden="true"
      className="w-1 h-1 rounded-full bg-[#E10600] opacity-0 scale-0 -ml-2.5 group-hover:ml-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300"
    />
    <NoirHoverScramble text={label} />
    <span
      aria-hidden="true"
      className="absolute left-0 right-0 -bottom-0.5 h-px bg-[#E10600] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
    />
  </>
);

interface NoirStudioFooterProps {
  onNavigate: (sectionId?: string) => void;
  onServices: () => void;
  onAbout: () => void;
  onOpenCv: () => void;
  liveTime: string;
}

export const NoirStudioFooter: React.FC<NoirStudioFooterProps> = ({
  onNavigate,
  onServices,
  onAbout,
  onOpenCv,
  liveTime,
}) => {
  const [email, setEmail] = useState('');

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent('Aditya Raj — Keep me posted');
    const body = encodeURIComponent(`Please add ${email || 'me'} to your project updates.`);
    window.location.href = `mailto:${personal.emailAddress}?subject=${subject}&body=${body}`;
  };

  // template footer link: crimson lead dot + hairline underline + hover scramble
  const linkCls =
    'group relative inline-flex items-center gap-1.5 text-[15px] text-[#F2F0EB] hover:text-[#E10600] focus-visible:text-[#E10600] transition-colors cursor-pointer text-left';


  const navigate: [string, () => void][] = [
    ['About', onAbout],
    ['Selected Work', () => onNavigate('projects')],
    ['Gallery', () => onNavigate('gallery')],
    ['Services', () => onNavigate('freelance')],
    ['Contact', () => onNavigate('contact')],
  ];
  const studio: [string, () => void][] = [
    ['Service Catalog', onServices],
    ['Process', () => onNavigate('process')],
    ['Recognition', () => onNavigate('recognition')],
    ['FAQ', () => onNavigate('faq')],
    ['Official CV', onOpenCv],
  ];
  const elsewhere: [string, string][] = [
    ['Instagram ↗', personal.instagramUrl],
    ['LinkedIn ↗', personal.linkedinUrl],
    ['WhatsApp ↗', personal.whatsappDirectUrl],
  ];

  const cards = [
    { k: '01 — Based in', v: 'Delhi, India', d: 'Working worldwide, remote' },
    { k: '02 — Availability', v: 'Booking now', d: personal.availabilityNotice, live: true },
    { k: '03 — Response', v: 'Replies within 24h', d: personal.emailAddress },
    { k: '04 — Connect', v: 'LinkedIn', d: personal.linkedinHandle },
  ];

  return (
    <footer className="bg-[#050505] text-[#F2F0EB] border-t border-[#F2F0EB]/10 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 space-y-16">
        {/* Newsletter — THE CUT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
          <div className="space-y-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#E10600]">Updates — The Cut</p>
            <h3 className="font-display uppercase text-4xl sm:text-5xl leading-[0.95] tracking-tight">
              New work, now and then.{' '}
              <span className="font-editorial italic lowercase font-normal text-[#E10600]">no noise.</span>
            </h3>
            <p className="text-[15px] text-[#A8A8A8] max-w-md">
              Launch notes, new client builds and the tools I'm working with. Write in and I'll keep you posted.
            </p>
          </div>
          <form
            onSubmit={subscribe}
            className="flex items-center gap-2 p-1.5 rounded-full bg-[#0E0E0E]/60 border border-[#F2F0EB]/10 focus-within:border-[#E10600] transition-colors"
          >
            <label htmlFor="footer-email" className="sr-only">
              Your email
            </label>
            <input
              id="footer-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 min-w-0 bg-transparent px-4 py-2.5 text-sm text-[#F2F0EB] placeholder:text-[#5A5A5A] outline-none"
            />
            <button
              type="submit"
              className="shrink-0 px-5 py-2.5 rounded-full bg-[#E10600] hover:bg-[#ff1e17] text-white font-mono text-[11px] uppercase tracking-wider font-semibold transition-colors cursor-pointer"
            >
              Subscribe →
            </button>
          </form>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 pt-12 border-t border-[#F2F0EB]/10">
          <div className="space-y-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#E10600]">Navigate</p>
            <ul className="space-y-2.5">
              {navigate.map(([label, fn]) => (
                <li key={label}>
                  <button type="button" onClick={fn} className={linkCls}>
                    <LinkFx label={label} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#E10600]">Studio</p>
            <ul className="space-y-2.5">
              {studio.map(([label, fn]) => (
                <li key={label}>
                  <button type="button" onClick={fn} className={linkCls}>
                    <LinkFx label={label} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4 col-span-2 md:col-span-2">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#E10600]">Elsewhere</p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5">
              {elsewhere.map(([label, href]) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer" className={linkCls}>
                    <LinkFx label={label} />
                  </a>
                </li>
              ))}
              <li className="col-span-2 pt-2">
                <a href={`mailto:${personal.emailAddress}`} className={linkCls}>
                  <LinkFx label={personal.emailAddress} />
                </a>
              </li>
              <li className="col-span-2">
                <a href={`tel:${personal.mobileNumber.replace(/\s/g, '')}`} className={linkCls}>
                  <LinkFx label={personal.mobileNumber} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {cards.map((c) => (
            <div key={c.k} className="rounded bg-[#0E0E0E]/60 border border-[#F2F0EB]/[0.06] p-5 flex flex-col gap-2.5">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#E10600]">{c.k}</p>
              <p className="font-display uppercase text-xl tracking-wide inline-flex items-center gap-2">
                {c.live && <span className="w-1.5 h-1.5 rounded-full bg-[#2BD46B] animate-pulse" aria-hidden="true" />}
                {c.v}
              </p>
              <p className="text-sm text-[#A8A8A8] break-words">{c.d}</p>
            </div>
          ))}
        </div>

        {/* Monumental wordmark */}
        <div className="border-y border-[#F2F0EB]/10 py-6 text-center select-none">
          <p
            className="font-display uppercase tracking-tight leading-[0.85] text-[#F2F0EB]"
            style={{ fontSize: 'clamp(3.2rem, 14.5vw, 12rem)' }}
          >
            <span className="noir-outline-word">{personal.name.split(' ')[0]}</span>{' '}
            <span className="text-[#E10600]">{personal.name.split(' ').slice(1).join(' ')}</span>
          </p>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.14em] text-[#A8A8A8]">
          <p>
            ©{new Date().getFullYear()} {personal.name} · All rights reserved
          </p>
          <div className="flex items-center gap-6">
            <span className="tabular-nums">Delhi — {liveTime}</span>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-1 text-[#E10600] hover:underline font-semibold cursor-pointer"
            >
              Back to top <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
