import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, FileText } from 'lucide-react';
import { portfolioConfig } from '../data/portfolioConfig';
import { prefersReducedMotion } from '../utils/motion';

/**
 * ============================================================================
 * NOIR SIGNAL — SCROLL CINEMA (ports of the Framer template scroll effects)
 * ============================================================================
 * NoirScrambleText  · labels decode from random glyphs when they enter view
 * NoirScrollBlur    · hero content blurs, fades & lifts as it scrolls away
 * NoirDualMarquee   · tilted black ribbon, two Anton rows running opposite ways
 *                     (outlined + crimson words / solid bone words, ✦ separators)
 * NoirTypeManifesto · bone section; statement types itself out with a crimson
 *                     glitch tail + caret when it scrolls into view
 * NoirAboutSection  · "BEHIND THE frame": slice-glitch portrait reveal, sweep
 *                     line, vertical side caption, skill rows, count-up stats
 */

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&*!?/<>=_^[]{}';
const EASE = [0.16, 1, 0.3, 1] as const;
const randGlyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
const reducedMotion = () =>
  prefersReducedMotion();

/* ========================================================================= */
/* Scramble-decode text                                                      */
/* ========================================================================= */
export const NoirScrambleText: React.FC<{ text: string; className?: string; duration?: number }> = ({
  text,
  className = '',
  duration = 700,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [out, setOut] = useState(text);

  useEffect(() => {
    if (!inView || reducedMotion()) {
      setOut(text);
      return;
    }
    const start = performance.now();
    const id = window.setInterval(() => {
      const p = Math.min(1, (performance.now() - start) / duration);
      const settled = Math.floor(p * text.length);
      setOut(
        text
          .split('')
          .map((ch, i) => (i < settled || ch === ' ' ? ch : randGlyph()))
          .join('')
      );
      if (p >= 1) window.clearInterval(id);
    }, 40);
    return () => window.clearInterval(id);
  }, [inView, text, duration]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      <span aria-hidden="true">{out}</span>
    </span>
  );
};

/* ========================================================================= */
/* Hero scroll-away blur                                                     */
/* ========================================================================= */
export const NoirScrollBlur: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  // Progress starts only when the hero's BOTTOM reaches the bottom of the
  // screen. On phones/tablets the hero is taller than the viewport (photo
  // card sits below the fold) — it must stay sharp while being read and only
  // blur away once the visitor has scrolled past all of it.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['end end', 'end start'] });
  const blur = useTransform(scrollYProgress, [0.15, 0.85], [0, 14]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);
  const opacity = useTransform(scrollYProgress, [0.15, 0.9], [1, 0.25]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.97]);
  return (
    <motion.div ref={ref} className={className} style={reducedMotion() ? undefined : { filter, opacity, y, scale }}>
      {children}
    </motion.div>
  );
};

/* ========================================================================= */
/* Dual kinetic marquee ribbon                                               */
/* ========================================================================= */
type MarqueeWord = { text: string; style: 'outline' | 'red' | 'solid' };

const ROW_A: MarqueeWord[] = [
  { text: 'DESIGN', style: 'outline' },
  { text: 'CODE', style: 'outline' },
  { text: 'WEBSITES', style: 'red' },
  { text: 'ANDROID', style: 'outline' },
  { text: 'BACKEND', style: 'outline' },
  { text: 'STRATEGY', style: 'outline' },
];
const ROW_B: MarqueeWord[] = [
  { text: 'RESPONSIVE', style: 'solid' },
  { text: 'SCALABLE', style: 'solid' },
  { text: 'CINEMATIC', style: 'solid' },
  { text: 'PRECISE', style: 'solid' },
  { text: 'RELIABLE', style: 'solid' },
  { text: 'FULL-STACK', style: 'solid' },
];

const MarqueeRow: React.FC<{ words: MarqueeWord[]; reverse?: boolean; skew?: boolean }> = ({
  words,
  reverse,
  skew,
}) => (
  <div className="overflow-hidden whitespace-nowrap" style={skew ? { transform: 'skewX(-8deg)' } : undefined}>
    <div
      className="animate-noir-marquee font-display uppercase leading-none py-1"
      style={{
        fontSize: 'clamp(3rem, 8vw, 5.6rem)',
        animationDirection: reverse ? 'reverse' : 'normal',
        animationDuration: '38s',
      }}
    >
      {[...words, ...words, ...words, ...words].map((w, i) => (
        <span key={i} className="inline-flex items-center">
          <span
            className={
              w.style === 'outline'
                ? 'noir-outline-word'
                : w.style === 'red'
                  ? 'text-[#E10600]'
                  : 'text-[#F2F0EB]'
            }
          >
            {w.text}
          </span>
          <span aria-hidden="true" className="mx-6 sm:mx-9 text-[#E10600] text-[0.4em]">
            ✦
          </span>
        </span>
      ))}
    </div>
  </div>
);

export const NoirDualMarquee: React.FC = () => (
  <div className="relative overflow-hidden select-none" aria-hidden="true">
    <div className="bg-[#050505] py-3 sm:py-4 shadow-[0_30px_80px_rgba(0,0,0,0.45)] border-y border-[#F2F0EB]/10">
      <MarqueeRow words={ROW_A} skew />
      <MarqueeRow words={ROW_B} reverse skew />
    </div>
  </div>
);

/* ========================================================================= */
/* Typewriter manifesto                                                      */
/* ========================================================================= */
type Seg = { text: string; accent?: boolean };

const MANIFESTO: Seg[] = [
  { text: "I DON'T JUST BUILD WEBSITES. I DIRECT " },
  { text: 'digital experiences', accent: true },
  { text: '. EVERY SCROLL IS A CUT, EVERY HOVER A CLOSE-UP, EVERY PIXEL A DECISION. I WORK WHERE DESIGN, CODE AND GROWTH ' },
  { text: 'collide', accent: true },
  { text: ' — BUILDING PRODUCTS PEOPLE ' },
  { text: 'feel', accent: true },
  { text: ' BEFORE THEY UNDERSTAND.' },
];
const FULL = MANIFESTO.map((s) => s.text).join('');
const TAIL = 3; // glitching characters at the typing head

export const NoirTypeManifesto: React.FC<{ signature: string; tagline?: string }> = ({
  signature,
  tagline = 'DESIGN × CODE × GROWTH',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const [typed, setTyped] = useState(0);
  const [, setTick] = useState(0); // re-render tail glyphs

  useEffect(() => {
    if (!inView) return;
    if (reducedMotion()) {
      setTyped(FULL.length);
      return;
    }
    const id = window.setInterval(() => {
      setTyped((n) => {
        if (n >= FULL.length) {
          window.clearInterval(id);
          return n;
        }
        return Math.min(FULL.length, n + 2);
      });
      setTick((t) => t + 1);
    }, 34);
    return () => window.clearInterval(id);
  }, [inView]);

  const done = typed >= FULL.length;
  let cursor = 0;

  return (
    <section className="relative bg-[#F2F0EB] text-[#050505] py-24 sm:py-32 overflow-hidden">
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.16em] text-[#050505]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E10600]" aria-hidden="true" />
          <NoirScrambleText text="01 — MANIFESTO" />
          <span className="flex-1 h-px bg-[#050505]/15" aria-hidden="true" />
          <NoirScrambleText text="(01/06)" />
        </div>

        <p className="sr-only">{FULL}</p>
        <p
          aria-hidden="true"
          className="font-display uppercase leading-[1.02] tracking-tight min-h-[4em]"
          style={{ fontSize: 'clamp(2.1rem, 5.6vw, 4.4rem)' }}
        >
          {MANIFESTO.map((seg, si) => {
            const segStart = cursor;
            cursor += seg.text.length;
            const visible = Math.max(0, Math.min(seg.text.length, typed - segStart));
            if (!visible) return null;
            const chars = seg.text.slice(0, visible).split('');
            return (
              <span
                key={si}
                className={seg.accent ? 'font-editorial italic lowercase font-normal text-[#E10600] text-[1.08em]' : ''}
              >
                {chars.map((ch, ci) => {
                  const abs = segStart + ci;
                  const isTail = !done && abs >= typed - TAIL;
                  return isTail && ch !== ' ' ? (
                    <span key={ci} className="text-[#E10600]">
                      {randGlyph()}
                    </span>
                  ) : (
                    <React.Fragment key={ci}>{ch}</React.Fragment>
                  );
                })}
              </span>
            );
          })}
          <span
            className={`inline-block w-[0.08em] h-[0.82em] ml-1 align-[-0.04em] bg-[#E10600] ${done ? 'animate-noir-blink' : ''}`}
          />
        </p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={done ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE }}
          className="flex flex-wrap items-center justify-between gap-4 pt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-[#050505]/70"
        >
          <span>— {signature}</span>
          <span>{tagline}</span>
        </motion.div>
      </div>
    </section>
  );
};

/* ========================================================================= */
/* Word-by-word blur paragraph                                               */
/* ========================================================================= */
const BlurWords: React.FC<{ text: string; className?: string }> = ({ text, className = '' }) => {
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
          {i < words.length - 1 ? '\u00A0' : ''}
        </motion.span>
      ))}
    </p>
  );
};

/* ========================================================================= */
/* Count-up stat                                                             */
/* ========================================================================= */
const CountUp: React.FC<{ value: string; label: string }> = ({ value, label }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : null;
  const suffix = match ? match[2] : '';
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView || target === null) return;
    if (reducedMotion()) return setN(target);
    const start = performance.now();
    let raf = 0;
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / 1600);
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  return (
    <div ref={ref} className="space-y-2">
      <p className="font-display leading-none text-[#F2F0EB]" style={{ fontSize: 'clamp(2.4rem, 4.4vw, 3.4rem)' }}>
        {target === null ? value : String(n).padStart(2, '0')}
        {suffix && <span className="text-[#E10600] text-[0.6em] align-top ml-0.5">{suffix}</span>}
      </p>
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#A8A8A8]">{label}</p>
    </div>
  );
};

/* ========================================================================= */
/* Slice-glitch portrait                                                     */
/* ========================================================================= */
const SLICES = 9;

const SlicePortrait: React.FC<{ src: string; alt: string; onError?: () => void }> = ({ src, alt, onError }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const offsets = useRef(
    Array.from({ length: SLICES }, () => ({ x: (Math.random() - 0.5) * 80, d: Math.random() * 0.5 }))
  ).current;

  return (
    <div ref={ref} className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-[#0E0E0E]">
      {Array.from({ length: SLICES }).map((_, i) => {
        const top = (i / SLICES) * 100;
        const bottom = 100 - ((i + 1) / SLICES) * 100;
        return (
          <motion.img
            key={i}
            src={src}
            alt={i === 0 ? alt : ''}
            aria-hidden={i === 0 ? undefined : true}
            onError={i === 0 ? onError : undefined}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover grayscale contrast-[1.08]"
            style={{ clipPath: `inset(${top}% 0 ${bottom}% 0)` }}
            initial={{ opacity: 0, x: offsets[i].x }}
            animate={inView ? { opacity: [0, 1, 0.4, 1], x: [offsets[i].x, -offsets[i].x / 3, 0] } : {}}
            transition={{ duration: 0.9, delay: 0.15 + offsets[i].d, ease: EASE }}
          />
        );
      })}
      {/* crimson scan sweep */}
      <motion.span
        aria-hidden="true"
        className="absolute left-0 right-0 h-px bg-[#E10600] shadow-[0_0_14px_#E10600]"
        initial={{ top: '0%', opacity: 0 }}
        animate={inView ? { top: ['0%', '100%'], opacity: [0, 1, 1, 0] } : {}}
        transition={{ duration: 1.4, delay: 0.1, ease: 'easeInOut' }}
      />
      <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#050505]/50 to-transparent" />
    </div>
  );
};

/* ========================================================================= */
/* 02 — ABOUT · Behind the frame                                             */
/* ========================================================================= */
interface NoirAboutSectionProps {
  profileSrc: string;
  onProfileError: () => void;
  onOpenAbout: () => void;
  onOpenCv: () => void;
}

export const NoirAboutSection: React.FC<NoirAboutSectionProps> = ({
  profileSrc,
  onProfileError,
  onOpenAbout,
  onOpenCv,
}) => {
  const { personal, about, freelanceSection, studioBrand } = portfolioConfig;
  // Service groups (same split as the Services section tabs)
  const serviceGroups = [
    { id: 'web', title: 'Websites & E-commerce' },
    { id: 'apps', title: 'Apps, CRM & Software' },
    { id: 'growth', title: 'Branding, Marketing & IT' },
  ].map((g) => ({
    ...g,
    count: freelanceSection.services.filter((s) => s.category === g.id).length,
    names: freelanceSection.services
      .filter((s) => s.category === g.id)
      .map((s) => s.title)
      .join(' · '),
  }));

  return (
    <section id="about-gateway" className="relative bg-[#050505] text-[#F2F0EB] py-24 sm:py-32 overflow-hidden">
      {/* ambient crimson glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(40% 50% at 30% 60%, rgba(225,6,0,0.14), transparent 70%)' }}
      />
      {/* vertical side caption */}
      <p
        aria-hidden="true"
        className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-[#6B6B6B] [writing-mode:vertical-rl] rotate-180"
      >
        About — Web, App &amp; Java Developer — Est. 2022
      </p>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 space-y-14">
        <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.16em] text-[#A8A8A8]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E10600]" aria-hidden="true" />
          <NoirScrambleText text="05 — ABOUT" />
          <span className="relative flex-1 h-px bg-[#F2F0EB]/10 overflow-hidden" aria-hidden="true">
            <span className="absolute inset-y-0 w-40 bg-gradient-to-r from-transparent via-[#E10600] to-transparent animate-noir-streak-h" />
          </span>
          <NoirScrambleText text="(05/06)" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Portrait */}
          <div className="lg:col-span-5 space-y-4 w-full max-w-sm sm:max-w-md mx-auto lg:max-w-none">
            <SlicePortrait src={profileSrc} alt={`${personal.name} portrait`} onError={onProfileError} />
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#6B6B6B]">
              Fig. 01 — {personal.name}, Delhi, {new Date().getFullYear()}
            </p>
          </div>

          {/* Copy, skills, stats */}
          <div className="lg:col-span-7 space-y-10">
            <motion.h2
              data-noir-no-reveal=""
              initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.9, ease: EASE }}
              className="font-display uppercase leading-[0.9] tracking-tight"
              style={{ fontSize: 'clamp(3rem, 7vw, 5.6rem)' }}
            >
              Behind the
              <br />
              <span className="font-editorial italic lowercase font-normal text-[#E10600] text-[1.1em]">frame</span>
            </motion.h2>

            <div className="space-y-5 max-w-xl">
              <BlurWords
                className="text-base sm:text-lg leading-relaxed text-[#F2F0EB]"
                text={about.servicesIntro}
              />
              <BlurWords
                className="text-sm sm:text-base leading-relaxed text-[#A8A8A8]"
                text={about.servicesSummary}
              />
            </div>

            <div className="border-t border-[#F2F0EB]/10">
              {serviceGroups.map((group) => (
                <motion.div
                  key={group.id}
                  whileHover={{ x: 8 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="group py-3.5 border-b border-[#F2F0EB]/10"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-[15px] text-[#F2F0EB] group-hover:text-[#E10600] transition-colors">
                      {group.title}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#E10600] shrink-0">
                      {String(group.count).padStart(2, '0')} services
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-[#A8A8A8] leading-relaxed">{group.names}</p>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {studioBrand.metrics.map((m) => (
                <CountUp key={m.label} value={m.value} label={m.label} />
              ))}
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="button"
                onClick={onOpenAbout}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-md bg-[#E10600] hover:bg-[#ff1e17] text-white font-mono text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer"
              >
                <span>About, Skills &amp; Academics</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={onOpenCv}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-md border border-[#F2F0EB]/20 hover:border-[#E10600] font-mono text-xs uppercase tracking-wider text-[#F2F0EB] transition-colors cursor-pointer"
              >
                <FileText className="w-4 h-4 text-[#E10600]" />
                <span>View Official CV</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
