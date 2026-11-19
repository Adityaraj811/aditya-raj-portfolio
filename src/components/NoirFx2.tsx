import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { NoirScrambleText } from './NoirScrollFx';

/**
 * ============================================================================
 * NOIR SIGNAL — SECOND EFFECTS PASS (ports of the Framer template)
 * ============================================================================
 * useNoirHeadingReveal · every big section <h2.font-display> blur-wipes in,
 *                        left → right, as it enters the viewport
 * NoirTypeHeading      · heading types itself out with a crimson caret
 * NoirBlurWords        · paragraph resolves word by word out of a blur
 * NoirStackCards       · process steps as sticky cards that stack on scroll,
 *                        giant outlined step numbers on the right
 * NoirContactBanner    · crimson "GET IN TOUCH" disc + decoding giant email
 * NoirTalkRibbon       · "LET'S TALK ✦ great ideas ✦ OPEN FOR …" ribbon
 */

const EASE = [0.16, 1, 0.3, 1] as const;
const reducedMotion = () =>
  typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/* ========================================================================= */
/* Global heading blur-wipe                                                  */
/* ========================================================================= */
export const useNoirHeadingReveal = (deps: unknown[] = []) => {
  useEffect(() => {
    if (reducedMotion() || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).dataset.noirReveal = 'in';
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.35, rootMargin: '0px 0px -8% 0px' }
    );
    // let the new page render first
    const id = window.setTimeout(() => {
      document
        // include headings left "pending" by a previous run (page switch / hot reload)
        .querySelectorAll<HTMLElement>('main h2.font-display:not([data-noir-reveal="in"]), section h2.font-display:not([data-noir-reveal="in"])')
        .forEach((h) => {
          if (h.closest('[data-noir-no-reveal]')) return;
          const r = h.getBoundingClientRect();
          // headings already on screen at load simply stay visible
          if (r.top < window.innerHeight * 0.9 && r.bottom > 0) {
            h.dataset.noirReveal = 'in';
            return;
          }
          h.dataset.noirReveal = 'pending';
          io.observe(h);
        });
    }, 120);
    return () => {
      window.clearTimeout(id);
      io.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

/* ========================================================================= */
/* Typewriter heading                                                        */
/* ========================================================================= */
export const NoirTypeHeading: React.FC<{
  lead: string;
  accent: string;
  className?: string;
  style?: React.CSSProperties;
  breakBeforeAccent?: boolean;
}> = ({ lead, accent, className = '', style, breakBeforeAccent }) => {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const full = `${lead} ${accent}`;
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reducedMotion()) return setN(full.length);
    const id = window.setInterval(() => {
      setN((v) => {
        if (v >= full.length) {
          window.clearInterval(id);
          return v;
        }
        return v + 1;
      });
    }, 55);
    return () => window.clearInterval(id);
  }, [inView, full.length]);

  const leadShown = lead.slice(0, Math.min(n, lead.length));
  const accentShown = n > lead.length + 1 ? accent.slice(0, n - lead.length - 1) : '';

  return (
    <h2 ref={ref} data-noir-no-reveal="" className={`font-display uppercase ${className}`} style={style} aria-label={full}>
      <span aria-hidden="true">
        {leadShown}
        {accentShown && (
          <>
            {breakBeforeAccent ? <br /> : ' '}
            <span className="font-editorial italic lowercase font-normal text-[#E10600] text-[1.08em]">
              {accentShown}
            </span>
          </>
        )}
        <span className="inline-block w-[0.06em] h-[0.8em] ml-1 align-[-0.04em] bg-[#E10600] animate-noir-blink" />
      </span>
    </h2>
  );
};

/* ========================================================================= */
/* Word-by-word blur reveal                                                  */
/* ========================================================================= */
export const NoirBlurWords: React.FC<{ text: string; className?: string }> = ({ text, className = '' }) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const words = text.split(' ');
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={reducedMotion() ? false : { opacity: 0, filter: 'blur(8px)' }}
          animate={inView ? { opacity: 1, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.5, delay: i * 0.025, ease: EASE }}
        >
          {w}
          {i < words.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
    </p>
  );
};

/* ========================================================================= */
/* Sticky stacking process cards                                             */
/* ========================================================================= */
export const NoirStackCards: React.FC<{
  steps: { step: string; index: string; title: string; description: string }[];
}> = ({ steps }) => (
  <div className="relative">
    {steps.map((s, i) => (
      <div
        key={s.index}
        className="sticky pb-6"
        style={{ top: `calc(5.5rem + ${i * 22}px)`, zIndex: i + 1 }}
      >
        <motion.article
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative overflow-hidden rounded-xl border border-[#F2F0EB]/10 min-h-[300px] sm:min-h-[340px] p-7 sm:p-12 flex flex-col justify-end text-[#F2F0EB] shadow-[0_-24px_60px_rgba(0,0,0,0.55)]"
          style={{
            background:
              'radial-gradient(60% 90% at 85% 40%, rgba(225,6,0,0.16), transparent 70%), linear-gradient(160deg, #1A1A1A 0%, #0E0E0E 60%, #0A0A0A 100%)',
          }}
        >
          {/* giant outlined step number */}
          <span
            aria-hidden="true"
            className="absolute right-6 sm:right-12 top-1/2 -translate-y-1/2 font-display leading-none text-transparent select-none"
            style={{ fontSize: 'clamp(8rem, 20vw, 15rem)', WebkitTextStroke: '1px rgba(242,240,235,0.16)' }}
          >
            {s.index}
          </span>
          <div className="relative space-y-4 max-w-xl">
            <span className="block w-10 h-[2px] bg-[#E10600]" aria-hidden="true" />
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#A8A8A8]">{s.step}</p>
            <h3 className="font-display uppercase leading-none" style={{ fontSize: 'clamp(2.6rem, 6vw, 4.6rem)' }}>
              {s.title}
            </h3>
            <p className="text-sm sm:text-base text-[#A8A8A8] leading-relaxed">{s.description}</p>
          </div>
        </motion.article>
      </div>
    ))}
  </div>
);

/* ========================================================================= */
/* Contact banner                                                            */
/* ========================================================================= */
export const NoirContactBanner: React.FC<{
  email: string;
  phone: string;
  socials: { label: string; href: string }[];
  onGetInTouch: () => void;
}> = ({ email, phone, socials, onGetInTouch }) => (
  <div className="flex flex-col md:flex-row md:items-center justify-between gap-10 py-6">
    <motion.button
      type="button"
      onClick={onGetInTouch}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="relative shrink-0 w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-[#E10600] text-white flex flex-col items-center justify-center gap-1 shadow-[0_24px_70px_rgba(225,6,0,0.45)] cursor-pointer"
    >
      <span className="absolute inset-[-10px] rounded-full border border-dashed border-[#E10600]/50 animate-noir-orbit" aria-hidden="true" />
      <span className="font-display uppercase text-2xl sm:text-3xl leading-none">Get in touch</span>
      <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/80">Open for projects</span>
    </motion.button>

    <div className="md:text-right space-y-3 min-w-0">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500 dark:text-[#A8A8A8]">Write to me</p>
      <a
        href={`mailto:${email}`}
        className="block font-display tracking-tight text-[#111111] dark:text-[#F2F0EB] hover:text-[#E10600] transition-colors break-all leading-none"
        style={{ fontSize: 'clamp(1.7rem, 4.6vw, 3.6rem)' }}
      >
        <NoirScrambleText text={email} duration={1100} />
      </a>
      <a
        href={`tel:${phone.replace(/\s/g, '')}`}
        className="block font-mono text-xs tracking-[0.16em] text-zinc-600 dark:text-[#A8A8A8] hover:text-[#E10600] transition-colors"
      >
        {phone}
      </a>
      <div className="flex flex-wrap md:justify-end gap-x-5 gap-y-2 pt-1">
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-600 dark:text-[#A8A8A8] hover:text-[#E10600] transition-colors inline-flex items-center gap-1"
          >
            {s.label}
            <ArrowUpRight className="w-3 h-3" />
          </a>
        ))}
      </div>
    </div>
  </div>
);

/* ========================================================================= */
/* "Let's talk" ribbon                                                       */
/* ========================================================================= */
export const NoirTalkRibbon: React.FC<{ year: number }> = ({ year }) => {
  const items: { text: string; style: 'outline' | 'serif' | 'solid' }[] = [
    { text: "LET'S TALK", style: 'outline' },
    { text: 'great ideas', style: 'serif' },
    { text: `OPEN FOR ${year + 1}`, style: 'solid' },
    { text: 'BHOPAL', style: 'outline' },
    { text: 'worldwide', style: 'serif' },
  ];
  return (
    <div className="overflow-hidden whitespace-nowrap py-8 bg-[#050505] border-y border-[#F2F0EB]/10 select-none" aria-hidden="true">
      <div className="animate-noir-marquee items-center" style={{ animationDuration: '30s' }}>
        {[...items, ...items, ...items].map((it, i) => (
          <span key={i} className="inline-flex items-center">
            <span
              className={
                it.style === 'outline'
                  ? 'font-display uppercase noir-outline-word'
                  : it.style === 'serif'
                    ? 'font-editorial italic lowercase text-[#E10600] text-[1.15em]'
                    : 'font-display uppercase text-[#F2F0EB]'
              }
              style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: 1 }}
            >
              {it.text}
            </span>
            <span className="mx-8 text-[#E10600] text-2xl">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
};
