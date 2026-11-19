import React, { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { NoirScrambleText } from './NoirScrollFx';
import { prefersReducedMotion } from '../utils/motion';

/**
 * ============================================================================
 * FRAMER NOIR SIGNAL — SIGNATURE CINEMA LAYER & INTERACTION PRIMITIVES
 * ============================================================================
 * 1. NoirCursor: Floating 130x130 crimson "VIEW" lens on hover targets
 * 2. NoirMouseGlow: Radial crimson light field following cursor inside Hero
 * 3. NoirFilmGrain: Subtle analog cinema noise grain texture
 * 4. NoirPreloader: Brief cinema slate wipe on initial page load
 * 5. NoirHairlineTrack: Section boundary hairline with animated crimson Streak
 * 6. NoirSectionBar: Rotating [+] crosshair badge + chapter timecode strip
 * 7. NoirOrbitCTA: 10s rotating dashed circular ring + orbiting crimson dot CTA
 * 8. NoirSkillRow: Framer hover-slide (+10px) row with animated strength bar
 */

export const NoirCursor: React.FC = () => {
  const [cursorText, setCursorText] = useState<string | null>(null);
  const [isEnabled, setIsEnabled] = useState(false);

  const mouseX = useMotionValue(-300);
  const mouseY = useMotionValue(-300);
  const smoothX = useSpring(mouseX, { stiffness: 460, damping: 36, mass: 0.8 });
  const smoothY = useSpring(mouseY, { stiffness: 460, damping: 36, mass: 0.8 });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isFinePointer = window.matchMedia?.('(pointer: fine)').matches;
    const reduced = prefersReducedMotion();
    if (!isFinePointer || reduced) return;

    setIsEnabled(true);

    const onMove = (e: PointerEvent) => {
      mouseX.set(e.clientX - 54);
      mouseY.set(e.clientY - 54);

      const el = document.elementFromPoint(e.clientX, e.clientY);
      const target = el?.closest?.('[data-noir-cursor]') as HTMLElement | null;
      if (target) {
        setCursorText(target.getAttribute('data-noir-cursor') || 'VIEW');
      } else {
        setCursorText(null);
      }
    };

    const onLeave = () => setCursorText(null);

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, [mouseX, mouseY]);

  if (!isEnabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[80] flex items-center justify-center rounded-full"
      style={{
        x: smoothX,
        y: smoothY,
        width: 108,
        height: 108,
        backgroundColor: 'rgb(225, 6, 0)',
        boxShadow: '0px 20px 60px 0px rgba(225, 6, 0, 0.38)',
      }}
      initial={false}
      animate={{
        scale: cursorText ? 1 : 0,
        opacity: cursorText ? 1 : 0,
      }}
      transition={{ type: 'spring', stiffness: 420, damping: 28 }}
    >
      <span className="font-display text-xl tracking-[0.06em] uppercase text-[#050505] leading-none">
        {cursorText || 'VIEW'}
      </span>
    </motion.div>
  );
};

export const NoirMouseGlow: React.FC<{ className?: string }> = ({ className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof window === 'undefined') return;
    if (prefersReducedMotion()) return;

    const onMove = (e: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      node.style.background = `radial-gradient(38% 52% at ${x.toFixed(1)}% ${y.toFixed(
        1
      )}%, rgba(225, 6, 0, 0.26) 0%, rgba(225, 6, 0, 0.08) 45%, rgba(225, 6, 0, 0) 100%)`;
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 transition-[background] duration-300 ${className}`}
      style={{
        background:
          'radial-gradient(34% 48% at 50% 45%, rgba(225, 6, 0, 0.24) 0%, rgba(225, 6, 0, 0.07) 45%, rgba(225, 6, 0, 0) 100%)',
      }}
    />
  );
};

const FILM_GRAIN_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`;

export const NoirFilmGrain: React.FC = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none fixed -inset-8 z-[45] opacity-[0.03] dark:opacity-[0.045] animate-noir-grain mix-blend-overlay"
    style={{
      backgroundImage: FILM_GRAIN_SVG,
      backgroundRepeat: 'repeat',
      backgroundSize: '180px 180px',
    }}
  />
);

// Cinematic entry sequence lives in its own module (template-faithful port).
export { NoirPreloader } from './NoirIntro';

export const NoirHairlineTrack: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div
    aria-hidden="true"
    className={`relative w-full h-px bg-zinc-300/70 dark:bg-[#F2F0EB]/10 overflow-hidden pointer-events-none ${className}`}
  >
    <div
      className="absolute top-0 left-0 h-px w-[320px] sm:w-[420px] animate-noir-streak-h"
      style={{
        background:
          'linear-gradient(90deg, rgba(225,6,0,0) 0%, rgba(225,6,0,0.9) 70%, rgba(255,255,255,0.9) 100%)',
      }}
    />
  </div>
);

interface NoirSectionBarProps {
  indexLabel: string;
  sectionCode: string;
  rightLabel?: string;
}

export const NoirSectionBar: React.FC<NoirSectionBarProps> = ({
  indexLabel,
  sectionCode,
  rightLabel,
}) => (
  <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-[0.16em]">
    <div className="inline-flex items-center gap-3 text-[#E10600] font-semibold">
      <span
        aria-hidden="true"
        className="w-5 h-5 rounded-sm border border-[#E10600]/40 flex items-center justify-center text-[11px] leading-none animate-noir-crosshair"
      >
        +
      </span>
      <NoirScrambleText text={indexLabel} />
    </div>
    <div className="flex items-center gap-3 text-zinc-500 dark:text-[#A8A8A8]">
      {rightLabel && <span className="hidden sm:inline">{rightLabel}</span>}
      <NoirScrambleText text={sectionCode} />
    </div>
  </div>
);

interface NoirOrbitCTAProps {
  label?: string;
  sublabel?: string;
  onClick: () => void;
}

export const NoirOrbitCTA: React.FC<NoirOrbitCTAProps> = ({
  label = 'YOUR LAUNCH NEXT',
  sublabel = 'START PROJECT',
  onClick,
}) => (
  <motion.button
    type="button"
    onClick={onClick}
    whileHover={{ scale: 1.06 }}
    whileTap={{ scale: 0.96 }}
    transition={{ type: 'spring', stiffness: 320, damping: 22 }}
    className="relative w-44 h-44 sm:w-48 sm:h-48 flex items-center justify-center cursor-pointer group shrink-0"
    aria-label={`${sublabel} — ${label}`}
  >
    {/* Rotating Dashed Outer Orbit Ring + Orbiting Crimson/White Dot */}
    <div
      aria-hidden="true"
      className="absolute inset-0 rounded-full border border-dashed border-zinc-400/70 dark:border-[#F2F0EB]/45 animate-noir-orbit"
    >
      <span
        className="absolute -top-[5px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#E10600] shadow-[0_0_16px_#E10600]"
      />
    </div>

    {/* Inner Solid Obsidian / Accent Circle */}
    <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full bg-[#111111] dark:bg-[#050505] border border-zinc-300/20 dark:border-[#F2F0EB]/18 group-hover:border-[#E10600] flex flex-col items-center justify-center p-4 text-center transition-colors shadow-2xl">
      <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#E10600] mb-1">
        {sublabel}
      </span>
      <span className="font-display text-lg sm:text-xl uppercase tracking-wide text-[#F2F0EB] leading-tight">
        {label}
      </span>
      <span className="mt-2 w-7 h-7 rounded-full border border-[#F2F0EB]/25 group-hover:bg-[#E10600] group-hover:border-[#E10600] flex items-center justify-center text-[#F2F0EB] transition-colors">
        <ArrowUpRight className="w-3.5 h-3.5" />
      </span>
    </div>
  </motion.button>
);

interface NoirSkillRowProps {
  title: string;
  metric: string;
  percentage: number;
  detail: string;
}

export const NoirSkillRow: React.FC<NoirSkillRowProps> = ({
  title,
  metric,
  percentage,
  detail,
}) => (
  <motion.div
    whileHover={{ x: 10 }}
    transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
    className="py-4 border-b border-zinc-300/70 dark:border-[#F2F0EB]/12 group"
  >
    <div className="flex items-baseline justify-between gap-4">
      <h4 className="font-sans text-base sm:text-lg font-medium text-[#111111] dark:text-[#F2F0EB] group-hover:text-[#E10600] transition-colors">
        {title}
      </h4>
      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#E10600] font-semibold shrink-0">
        {metric}
      </span>
    </div>
    <p className="text-xs text-zinc-600 dark:text-[#A8A8A8] mt-1">{detail}</p>
    {/* Scroll-triggered crimson strength meter bar */}
    <div className="mt-3 h-[2px] w-full bg-zinc-200 dark:bg-[#F2F0EB]/10 overflow-hidden rounded-full">
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: false, amount: 0.25 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="h-full origin-left bg-[#E10600]"
        style={{ width: `${Math.min(100, Math.max(20, percentage))}%` }}
      />
    </div>
  </motion.div>
);
