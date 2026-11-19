import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { prefersReducedMotion } from '../utils/motion';

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
    const reduced = prefersReducedMotion();
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
    if (prefersReducedMotion()) return;
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

/* ------------------------------------------------------------------------- */
/* Mobile / tablet menu (template): "MENU (+)" pill → full-screen panel that */
/* opens with a crimson circle wipe from the button, big numbered Anton      */
/* links with ↗ discs, italic ribbon, email, social discs and live clock.   */
/* ------------------------------------------------------------------------- */
export const NoirMenuButton: React.FC<{ open: boolean; onClick: () => void; className?: string }> = ({
  open,
  onClick,
  className = '',
}) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={open ? 'Close menu' : 'Open menu'}
    aria-expanded={open}
    aria-controls="noir-mobile-menu"
    className={`relative z-[60] inline-flex items-center gap-3 h-10 pl-4 pr-1.5 rounded-full border border-[#F2F0EB]/[0.18] bg-[#0E0E0E]/65 backdrop-blur-md text-[#F2F0EB] font-mono text-[10px] uppercase tracking-[0.22em] cursor-pointer ${className}`}
  >
    {/* MENU ⇄ CLOSE label roll */}
    <span className="relative block h-[13px] overflow-hidden leading-[13px]">
      <span
        className="block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
        style={{ transform: open ? 'translateY(-13px)' : 'translateY(0)' }}
      >
        <span className="block">Menu</span>
        <span className="block">Close</span>
      </span>
    </span>
    {/* crimson disc: + rotates into × */}
    <span className="relative w-7 h-7 rounded-full bg-[#E10600] flex items-center justify-center">
      <span
        aria-hidden="true"
        className="relative w-3 h-3 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
        style={{ transform: open ? 'rotate(135deg)' : 'rotate(0deg)' }}
      >
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-[2px] bg-[#F2F0EB]" />
        <span className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-3 bg-[#F2F0EB]" />
      </span>
    </span>
  </button>
);

export interface NoirMenuItem {
  label: string;
  onSelect: () => void;
  active?: boolean;
}

export const NoirMobileMenu: React.FC<{
  open: boolean;
  onClose: () => void;
  items: NoirMenuItem[];
  email: string;
  socials: { short: string; label: string; href: string }[];
  location: string;
  liveTime: string;
  year: number;
}> = ({ open, onClose, items, email, socials, location, liveTime, year }) => {
  // lock page scroll + Esc to close while open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  const ORIGIN = 'calc(100% - 38px) 32px';
  const ribbon = ["let's create", 'something unreal', `open for ${year + 1}`];

  return (
    <div
      id="noir-mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      aria-hidden={!open}
      className={`lg:hidden fixed inset-0 z-[35] ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}
    >
      {/* crimson wipe (leads) */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 bg-[#E10600]"
        initial={false}
        animate={{ clipPath: open ? `circle(150% at ${ORIGIN})` : `circle(0% at ${ORIGIN})` }}
        transition={{ duration: open ? 0.7 : 0.55, ease: [0.76, 0, 0.24, 1], delay: open ? 0 : 0.12 }}
      />
      {/* noir panel (follows) */}
      <motion.div
        className="absolute inset-0 bg-[#050505] text-[#F2F0EB] overflow-y-auto overscroll-contain"
        initial={false}
        animate={{ clipPath: open ? `circle(150% at ${ORIGIN})` : `circle(0% at ${ORIGIN})` }}
        transition={{ duration: open ? 0.75 : 0.5, ease: [0.76, 0, 0.24, 1], delay: open ? 0.1 : 0 }}
      >
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(120% 70% at 100% 0%, rgba(225,6,0,0.35) 0%, rgba(5,5,5,0) 60%)' }} />
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(0deg, rgba(242,240,235,0.04) 0px, rgba(242,240,235,0.04) 1px, transparent 1px, transparent 3px)' }} />

        <div className="relative min-h-full flex flex-col justify-between px-5 sm:px-8 pt-24 pb-6 gap-8">
          <div className="space-y-8">
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-[#A8A8A8]">
              <span className="inline-flex items-center gap-2">
                <span className="text-[#E10600] animate-noir-blink">●</span> Rec — Scene 01
              </span>
              <span>Take {String(items.length).padStart(2, '0')}</span>
            </div>

            <nav aria-label="Mobile navigation">
              <ul>
                {items.map((item, i) => (
                  <motion.li
                    key={item.label}
                    initial={false}
                    animate={open ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 36, filter: 'blur(8px)' }}
                    transition={{ duration: 0.6, delay: open ? 0.3 + i * 0.055 : 0, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <button
                      type="button"
                      tabIndex={open ? 0 : -1}
                      onClick={() => {
                        item.onSelect();
                        onClose();
                      }}
                      className="group relative w-full flex items-center gap-4 py-1.5 border-b border-[#F2F0EB]/[0.08] text-left cursor-pointer"
                    >
                      <span className="w-7 shrink-0 font-mono text-[10px] text-[#E10600]">{String(i + 1).padStart(2, '0')}</span>
                      <span
                        className={`flex-1 font-display uppercase leading-[1.08] tracking-tight transition-colors ${
                          item.active ? 'noir-outline-word' : 'text-[#F2F0EB] group-active:text-[#E10600] group-hover:text-[#E10600]'
                        }`}
                        style={{ fontSize: 'clamp(2.3rem, 11.5vw, 3.6rem)' }}
                      >
                        {item.label}
                      </span>
                      <span className="shrink-0 w-[34px] h-[34px] rounded-full border border-[#F2F0EB]/20 flex items-center justify-center text-sm group-hover:bg-[#E10600] group-hover:border-[#E10600] transition-colors">
                        ↗
                      </span>
                      <span aria-hidden="true" className="absolute left-0 -bottom-px h-px w-0 bg-[#E10600] transition-[width] duration-500 group-hover:w-full group-active:w-full" />
                    </button>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </div>

          <motion.div
            initial={false}
            animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: open ? 0.55 : 0, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-5"
          >
            <div className="overflow-hidden whitespace-nowrap border-y border-[#F2F0EB]/[0.12] py-2" aria-hidden="true">
              <div className="animate-noir-marquee" style={{ animationDuration: '18s' }}>
                {[...ribbon, ...ribbon, ...ribbon, ...ribbon].map((t, i) => (
                  <span key={i} className="inline-flex items-center font-editorial italic text-[26px] leading-none">
                    <span className="text-[#E10600] lowercase">{t}</span>
                    <span className="mx-5 text-[#F2F0EB] not-italic text-base">✦</span>
                  </span>
                ))}
              </div>
            </div>

            <a
              href={`mailto:${email}`}
              tabIndex={open ? 0 : -1}
              className="block font-display text-2xl tracking-tight text-[#F2F0EB] break-all"
            >
              <NoirHoverScramble text={email} />
            </a>

            <div className="flex flex-wrap gap-2">
              {socials.map((s) => (
                <a
                  key={s.short}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  tabIndex={open ? 0 : -1}
                  className="w-[38px] h-[38px] rounded-full border border-[#F2F0EB]/[0.22] flex items-center justify-center font-mono text-[10px] tracking-[0.1em] text-[#F2F0EB] hover:bg-[#E10600] hover:border-[#E10600] transition-colors"
                >
                  {s.short}
                </a>
              ))}
            </div>

            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-[#A8A8A8]">
              <span className="inline-flex items-center gap-2">
                <span className="text-[#E10600]">●</span> {location} — {liveTime}
              </span>
              <span>©{year}</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
