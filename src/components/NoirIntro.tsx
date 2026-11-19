import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * ============================================================================
 * NOIR SIGNAL — CINEMATIC ENTRY SEQUENCE (port of the Framer template intro)
 * ============================================================================
 * Phase 1 · GLITCH  — name decodes from scrambled glyphs; RGB-split layers
 *                     (cyan −x / crimson +x, screen blend) + jittering black
 *                     slice bars over a bone-washed, scan-lined slate.
 * Phase 2 · WORDS   — slate drops to black, crimson band settles centre,
 *                     headline words blur in one by one; counter climbs.
 * Phase 3 · TITLE   — full headline on one line + tracked sub-line, 100%.
 * Phase 4 · EXIT    — curtain lifts; the hero's own word animations are
 *                     released at that moment (html.noir-intro is removed).
 *
 * Plays on every load (like the template). Skipped for reduced-motion users;
 * a click or any key skips straight to the hero.
 */

const NAME = 'ADITYA RAJ';
const LABEL = 'ADITYA RAJ — DEVELOPER';
const SUBLINE = 'I build websites, apps & digital systems';
const WORDS: { text: string; accent?: boolean }[] = [
  { text: 'CREATIVE' },
  { text: 'developer', accent: true },
  { text: '&' },
  { text: 'DIGITAL' },
  { text: 'studio.', accent: true },
];

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ*#>/<%&$@!?';

// Timeline (ms)
const T_DECODE_START = 350;
const T_DECODE_STEP = 120;
const T_WORDS = 2500;
const T_WORD_STEP = 230;
const T_TITLE = T_WORDS + WORDS.length * T_WORD_STEP + 350; // ≈ 4000
const T_EXIT = T_TITLE + 1000; // ≈ 5000
const T_DONE = T_EXIT + 750;

type Phase = 'glitch' | 'words' | 'title';

const EASE = [0.16, 1, 0.3, 1] as const;

const releaseHero = () => document.documentElement.classList.remove('noir-intro');

const shouldPlay = () => {
  if (typeof window === 'undefined') return false;
  return !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
};

interface SliceBar {
  top: number;
  height: number;
  x: number;
  on: boolean;
}

const makeBars = (): SliceBar[] =>
  Array.from({ length: 6 }, (_, i) => ({
    top: 4 + i * 15 + Math.random() * 8,
    height: 3 + Math.round(Math.random() * 4),
    x: (Math.random() - 0.5) * 60,
    on: Math.random() > 0.45,
  }));

export const NoirPreloader: React.FC = () => {
  const [active, setActive] = useState<boolean>(shouldPlay);
  const [exiting, setExiting] = useState(false);
  const [phase, setPhase] = useState<Phase>('glitch');
  const [elapsed, setElapsed] = useState(0);
  const [scrambled, setScrambled] = useState(NAME.replace(/\S/g, '*'));
  const [bars, setBars] = useState<SliceBar[]>(makeBars);
  const [split, setSplit] = useState(10);
  const startRef = useRef<number>(0);
  const timers = useRef<number[]>([]);

  const finish = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    releaseHero();
    setExiting(true);
    timers.current = [window.setTimeout(() => setActive(false), 750)];
  };

  // Phase scheduling + body scroll lock
  useEffect(() => {
    if (!active) {
      releaseHero();
      return;
    }
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    startRef.current = performance.now();

    timers.current = [
      window.setTimeout(() => setPhase('words'), T_WORDS),
      window.setTimeout(() => setPhase('title'), T_TITLE),
      window.setTimeout(() => {
        releaseHero();
        setExiting(true);
      }, T_EXIT),
      window.setTimeout(() => setActive(false), T_DONE),
    ];

    const skip = () => finish();
    window.addEventListener('keydown', skip, { once: true });
    window.addEventListener('pointerdown', skip, { once: true });

    return () => {
      timers.current.forEach((t) => window.clearTimeout(t));
      window.removeEventListener('keydown', skip);
      window.removeEventListener('pointerdown', skip);
      document.body.style.overflow = prevOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  // 50ms "signal" tick: decode scramble, slice bars, RGB jitter, clock
  useEffect(() => {
    if (!active) return;
    const id = window.setInterval(() => {
      const t = performance.now() - startRef.current;
      setElapsed(t);
      if (t < T_WORDS) {
        setScrambled(
          NAME.split('')
            .map((ch, i) => {
              if (ch === ' ') return ' ';
              const resolveAt = T_DECODE_START + i * T_DECODE_STEP;
              // resolved letters still flicker occasionally — signal noise
              if (t > resolveAt && Math.random() > 0.06) return ch;
              return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            })
            .join('')
        );
        setBars(makeBars());
        setSplit(6 + Math.random() * 8);
      }
    }, 50);
    return () => window.clearInterval(id);
  }, [active]);

  if (!active) return null;

  // Counter: holds at 000 through the glitch, then climbs to 100 by the title
  const progress =
    elapsed < T_WORDS ? 0 : Math.min(1, (elapsed - T_WORDS) / (T_TITLE - T_WORDS));
  const eased = 1 - Math.pow(1 - progress, 2);
  const pct = Math.round(eased * 100);
  const reel =
    phase === 'glitch'
      ? elapsed < T_DECODE_START + NAME.length * T_DECODE_STEP
        ? 1
        : 2
      : phase === 'words'
        ? progress < 0.5
          ? 3
          : 4
        : 5;

  return (
        <motion.div
          aria-hidden="true"
          initial={{ clipPath: 'inset(0 0 0% 0)' }}
          animate={{ clipPath: exiting ? 'inset(0 0 100% 0)' : 'inset(0 0 0% 0)' }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[95] bg-[#050505] text-[#F2F0EB] overflow-hidden cursor-pointer select-none"
        >
          {/* Scanlines */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg, rgba(242,240,235,0.035) 0px, rgba(242,240,235,0.035) 1px, transparent 1px, transparent 3px)',
            }}
          />

          {/* Crimson signal band: sweeps during the glitch, settles centre afterwards */}
          <motion.div
            className="absolute left-0 right-0 h-[120px] pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(rgba(0,0,0,0), rgba(225,6,0,0.12), rgba(0,0,0,0))',
            }}
            initial={{ top: '-10%' }}
            animate={
              phase === 'glitch'
                ? { top: ['-10%', '105%'] }
                : { top: 'calc(50% - 110px)', height: 220 }
            }
            transition={
              phase === 'glitch'
                ? { duration: 1.6, repeat: Infinity, ease: 'linear' }
                : { duration: 0.9, ease: EASE }
            }
          />

          {/* Bone wash — the grey "slate" look of the glitch phase */}
          <motion.div
            className="absolute inset-0 bg-[#F2F0EB] pointer-events-none"
            initial={{ opacity: 0.12 }}
            animate={{ opacity: phase === 'glitch' ? [0.12, 0.1, 0.14, 0.12] : 0 }}
            transition={
              phase === 'glitch'
                ? { duration: 0.4, repeat: Infinity }
                : { duration: 0.5, ease: 'easeOut' }
            }
          />

          {/* Top strip */}
          <div className="absolute top-6 left-6 right-6 sm:top-8 sm:left-10 sm:right-10 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-[#6B6B6B]">
            <span>{LABEL}</span>
            <span className="inline-flex items-center gap-2 text-[#E10600]">
              <span
                className="w-2 h-2 bg-[#E10600]"
                style={{ opacity: Math.floor(elapsed / 400) % 2 ? 1 : 0.2 }}
              />
              REC — {String(reel).padStart(2, '0')}/05
            </span>
          </div>

          {/* Centre stage */}
          <div className="absolute inset-0 flex items-center justify-center px-6">
              {phase === 'glitch' && (
                <div
                  className="relative noir-intro-glitch-in"
                  style={{ transform: 'scale(1.12)' }}
                >
                  {(['#00E5FF', '#E10600'] as const).map((color, i) => (
                    <span
                      key={color}
                      className="absolute inset-0 font-display uppercase whitespace-pre mix-blend-screen"
                      style={{
                        color,
                        opacity: i === 0 ? 0.7 : 0.9,
                        transform: `translateX(${i === 0 ? -split : split}px)`,
                        fontSize: 'clamp(3rem, 9.6vw, 7.5rem)',
                        lineHeight: 0.9,
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {scrambled}
                    </span>
                  ))}
                  <span
                    className="relative block font-display uppercase whitespace-pre text-[#F2F0EB]"
                    style={{ fontSize: 'clamp(3rem, 9.6vw, 7.5rem)', lineHeight: 0.9, letterSpacing: '-0.01em' }}
                  >
                    {scrambled}
                  </span>
                  {bars.map((b, i) => (
                    <span
                      key={i}
                      className="absolute -left-[12%] w-[124%] bg-[#050505]"
                      style={{
                        top: `${b.top}%`,
                        height: b.height,
                        transform: `translateX(${b.x}px)`,
                        opacity: b.on ? 1 : 0,
                      }}
                    />
                  ))}
                </div>
              )}

              {phase !== 'glitch' && (
                <div className="flex flex-col items-center gap-6 text-center">
                  <h2
                    className="flex flex-wrap items-baseline justify-center gap-x-[0.28em] font-display uppercase leading-none text-[#F2F0EB]"
                    style={{ fontSize: 'clamp(2.1rem, 5.4vw, 4.4rem)' }}
                  >
                    {WORDS.map((w, i) => (
                      <span
                        key={w.text}
                        className={`noir-intro-word ${
                          w.accent ? 'font-editorial italic lowercase font-normal text-[#E10600] text-[1.12em]' : ''
                        }`}
                        style={{ animationDelay: `${(i * T_WORD_STEP) / 1000}s` }}
                      >
                        {w.text}
                      </span>
                    ))}
                  </h2>
                  <p
                    className={`font-mono text-[10px] sm:text-[11px] uppercase text-[#A8A8A8] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      phase === 'title' ? 'opacity-100 tracking-[0.32em]' : 'opacity-0 tracking-[0.6em]'
                    }`}
                  >
                    {SUBLINE}
                  </p>
                </div>
              )}
          </div>

          {/* Bottom strip: counter · progress · year */}
          <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10 flex items-end justify-between gap-6">
            <p className="font-display leading-[0.85] tabular-nums" style={{ fontSize: 'clamp(3rem, 7vw, 4.5rem)' }}>
              {String(pct).padStart(3, '0')}
              <span className="text-[#E10600]">%</span>
            </p>
            <div className="hidden sm:block relative flex-1 max-w-[520px] h-[2px] mb-4 bg-[#F2F0EB]/[0.12]">
              <div className="absolute inset-y-0 left-0 bg-[#E10600]" style={{ width: `${pct}%` }} />
            </div>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#6B6B6B] mb-2">
              ©{new Date().getFullYear()}
            </span>
          </div>
        </motion.div>
  );
};
