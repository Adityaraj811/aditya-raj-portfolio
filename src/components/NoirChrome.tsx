import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * ============================================================================
 * NOIR SIGNAL — HEADER CHROME & RING CURSOR (ports of the Framer template)
 * ============================================================================
 * NoirLogo       · 10px crimson square (turns to a diamond on hover) + tracked
 *                  JetBrains Mono wordmark "ADITYA RAJ — DEVELOPER".
 * NoirNavLink    · "01 ABOUT" style link: text rolls up to a crimson copy,
 *                  crimson dot slides in on the left, hairline underline draws.
 * NoirRingCursor · 38px difference-blend ring that trails the pointer + 6px
 *                  crimson dot; ring swells and turns crimson over links.
 */

/* ------------------------------------------------------------------------- */
export const NoirLogo: React.FC<{ name: string; tag?: string; onClick: () => void }> = ({
  name,
  tag = 'DEVELOPER',
  onClick,
}) => (
  <a
    href="#home"
    onClick={(e) => {
      e.preventDefault();
      onClick();
    }}
    className="group inline-flex items-center gap-2.5 shrink-0 whitespace-nowrap cursor-pointer"
    aria-label={`${name} — home`}
  >
    <span
      aria-hidden="true"
      className="w-2.5 h-2.5 bg-[#E10600] animate-noir-logo-spin group-hover:[animation-duration:1.4s]"
    />
    <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#111111] dark:text-[#F2F0EB]">
      {name} <span className="text-zinc-500 dark:text-[#A8A8A8]">—</span> {tag}
    </span>
  </a>
);

/* ------------------------------------------------------------------------- */
interface NoirNavLinkProps {
  index: string;
  label: string;
  href: string;
  active?: boolean;
  onClick: () => void;
}

export const NoirNavLink: React.FC<NoirNavLinkProps> = ({ index, label, href, active, onClick }) => {
  const text = `${index} ${label}`;
  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      aria-current={active ? 'page' : undefined}
      className="group relative inline-flex items-center gap-1.5 py-1 whitespace-nowrap shrink-0 font-mono text-[11px] uppercase tracking-[0.2em]"
    >
      {/* crimson lead dot */}
      <span
        aria-hidden="true"
        className={`w-1 h-1 rounded-full bg-[#E10600] transition-all duration-300 ${
          active ? 'opacity-100 scale-100' : 'opacity-0 scale-0 -ml-2.5 group-hover:ml-0 group-hover:opacity-100 group-hover:scale-100 group-focus-visible:ml-0 group-focus-visible:opacity-100 group-focus-visible:scale-100'
        }`}
      />
      <span
        className={`leading-[1.35] transition-colors duration-300 ${
          active ? 'text-[#E10600]' : 'text-zinc-700 dark:text-[#F2F0EB] group-hover:text-[#E10600] group-focus-visible:text-[#E10600]'
        }`}
      >
        <NoirHoverScramble text={text} />
      </span>
      {/* hairline underline */}
      <span
        aria-hidden="true"
        className={`absolute left-0 right-0 -bottom-0.5 h-px bg-[#E10600] origin-left transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100'
        }`}
      />
    </a>
  );
};

/* ------------------------------------------------------------------------- */
export const NoirRingCursor: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [lens, setLens] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 260, damping: 26, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 260, damping: 26, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia?.('(pointer: fine)').matches;
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return;
    setEnabled(true);
    document.documentElement.classList.add('noir-ring-cursor');

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHidden(false);
      const el = e.target as Element | null;
      // the big crimson "VIEW" lens takes over on its own targets
      setLens(!!el?.closest?.('[data-noir-cursor]'));
      setHovering(!!el?.closest?.('a, button, [role="button"], input, textarea, select, label, summary'));
    };
    const onLeave = () => setHidden(true);

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.documentElement.classList.remove('noir-ring-cursor');
    };
  }, [x, y]);

  if (!enabled) return null;

  const show = !hidden && !lens;

  return (
    <>
      {/* Idle: bone ring in difference blend (reads on black and bone sections).
          Over links: swells and turns into a crimson-tinted lens. */}
      <motion.div
        aria-hidden="true"
        className={`pointer-events-none fixed top-0 left-0 z-[99998] rounded-full border ${
          hovering ? '' : 'mix-blend-difference'
        }`}
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: hovering ? 50 : 38,
          height: hovering ? 50 : 38,
          opacity: show ? 1 : 0,
          backgroundColor: hovering ? 'rgba(225,6,0,0.22)' : 'rgba(225,6,0,0)',
          borderColor: hovering ? 'rgba(225,6,0,0.35)' : 'rgba(242,240,235,1)',
        }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[99999] w-1.5 h-1.5 rounded-full bg-[#E10600]"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: show ? 1 : 0, scale: hovering ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
};

/* ------------------------------------------------------------------------- */
/* Hover scramble: text breaks into glyphs on hover/focus of its link, then  */
/* settles left → right (template footer + nav behaviour). Touch: on tap.    */
/* ------------------------------------------------------------------------- */
const HOVER_GLYPHS = '!<>-_\\/[]{}=+*^?#%&';

export const NoirHoverScramble: React.FC<{ text: string; className?: string }> = ({ text, className = '' }) => {
  const ref = React.useRef<HTMLSpanElement>(null);
  const [out, setOut] = useState(text);

  useEffect(() => setOut(text), [text]);

  useEffect(() => {
    const host = ref.current?.closest('a, button') as HTMLElement | null;
    if (!host) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    let id = 0;
    const run = () => {
      window.clearInterval(id);
      const start = performance.now();
      const dur = 420;
      id = window.setInterval(() => {
        const p = Math.min(1, (performance.now() - start) / dur);
        const settled = Math.floor(p * text.length);
        setOut(
          text
            .split('')
            .map((ch, i) =>
              i < settled || ch === ' ' ? ch : HOVER_GLYPHS[Math.floor(Math.random() * HOVER_GLYPHS.length)]
            )
            .join('')
        );
        if (p >= 1) window.clearInterval(id);
      }, 30);
    };
    host.addEventListener('pointerenter', run);
    host.addEventListener('focus', run);
    return () => {
      window.clearInterval(id);
      host.removeEventListener('pointerenter', run);
      host.removeEventListener('focus', run);
    };
  }, [text]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      <span aria-hidden="true">{out}</span>
    </span>
  );
};
