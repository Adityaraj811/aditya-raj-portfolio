import React, { useRef } from 'react';
import { Mail, Github, ArrowUpRight } from 'lucide-react';

interface HeroProfile3DProps {
  name: string;
  headline: string;
  profileImgSrc: string;
  usingFallbackAvatar: boolean;
  onImageError: () => void;
  emailAddress: string;
  githubUrl: string;
  githubUsername: string;
}

export const HeroProfile3D: React.FC<HeroProfile3DProps> = ({
  name,
  headline,
  profileImgSrc,
  usingFallbackAvatar,
  onImageError,
  emailAddress,
  githubUrl,
  githubUsername,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const applyTiltFromPoint = (clientX: number, clientY: number) => {
    if (rafRef.current !== null) {
      window.cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = window.requestAnimationFrame(() => {
      const container = containerRef.current;
      const card = cardRef.current;
      if (!container || !card) return;
      const rect = container.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
      const y = Math.max(0, Math.min(rect.height, clientY - rect.top));
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;

      if (glareRef.current) {
        const gx = ((x / rect.width) * 100).toFixed(1);
        const gy = ((y / rect.height) * 100).toFixed(1);
        glareRef.current.style.opacity = '1';
        glareRef.current.style.background = `radial-gradient(380px circle at ${gx}% ${gy}%, rgba(225, 6, 0, 0.14), transparent 65%)`;
      }
    });
  };

  const resetTilt = () => {
    if (rafRef.current !== null) {
      window.cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    touchStartRef.current = null;
    if (cardRef.current) {
      cardRef.current.style.transform = 'rotateX(0deg) rotateY(0deg)';
    }
    if (glareRef.current) {
      glareRef.current.style.opacity = '0';
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    applyTiltFromPoint(e.clientX, e.clientY);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 1) {
      const t = e.touches[0];
      touchStartRef.current = { x: t.clientX, y: t.clientY };
      applyTiltFromPoint(t.clientX, t.clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length !== 1 || !touchStartRef.current) return;
    const t = e.touches[0];
    const dy = Math.abs(t.clientY - touchStartRef.current.y);
    const dx = Math.abs(t.clientX - touchStartRef.current.x);

    if (dy > 10 && dy > dx) {
      resetTilt();
      return;
    }
    applyTiltFromPoint(t.clientX, t.clientY);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={resetTilt}
      onTouchCancel={resetTilt}
      className="relative h-full flex flex-col justify-center select-none"
      style={{ perspective: '1200px', touchAction: 'pan-y' }}
    >
      {/* Editorial 3D Portrait Plate */}
      <div
        ref={cardRef}
        className="relative h-full rounded-xl bg-white dark:bg-[#0B0B0B] border border-zinc-300/80 dark:border-[#F2F0EB]/12 p-5 sm:p-6 flex flex-col justify-between transition-transform duration-200 ease-out"
        style={{
          transform: 'rotateX(0deg) rotateY(0deg)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Dynamic Cursor / Touch Light Reflection */}
        <div
          ref={glareRef}
          className="pointer-events-none absolute inset-0 rounded-xl transition-opacity duration-300"
          style={{ opacity: 0 }}
        />

        {/* Editorial Plate Index Strip */}
        <div
          className="relative z-10 flex items-center justify-between font-mono text-[11px] tracking-wider text-zinc-500 dark:text-[#A8A8A8] border-b border-zinc-200 dark:border-[#F2F0EB]/10 pb-3"
          style={{ transform: 'translateZ(16px)' }}
        >
          <span>FIG. 01 — {name.toUpperCase()}</span>
          <span className="text-[#E10600] font-semibold">SAHAYAK.STUDIO</span>
        </div>

        {/* High-Craft Editorial Portrait Image */}
        <div
          className="relative z-10 my-5 flex-1 flex flex-col justify-center"
          style={{ transform: 'translateZ(26px)' }}
        >
          <div className="relative aspect-[4/4.2] w-full max-w-[320px] mx-auto rounded-lg overflow-hidden bg-zinc-100 dark:bg-[#141414] border border-zinc-200 dark:border-[#F2F0EB]/12">
            <img
              src={profileImgSrc}
              alt={`${name} — ${headline}`}
              referrerPolicy="no-referrer"
              onError={onImageError}
              className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-[1.03]"
            />
            {!usingFallbackAvatar && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent pointer-events-none" />
            )}

            <div className="absolute bottom-3.5 left-4 right-4 flex items-end justify-between gap-2 text-left pointer-events-none">
              <div>
                <p className="font-display text-2xl tracking-wide uppercase text-[#F2F0EB] leading-none">
                  {name}
                </p>
                <p className="font-editorial italic text-base text-[#E10600] mt-0.5">
                  {headline}
                </p>
              </div>
              <span className="font-mono text-[10px] tracking-widest text-[#F2F0EB]/75 uppercase">
                EST. 2022
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Direct Hairline Metadata */}
        <div
          className="relative z-10 pt-3.5 border-t border-zinc-200 dark:border-[#F2F0EB]/10 flex items-center justify-between gap-2 text-xs font-mono"
          style={{ transform: 'translateZ(18px)' }}
        >
          <a
            href={`mailto:${emailAddress}`}
            className="inline-flex items-center gap-1.5 text-zinc-600 dark:text-[#A8A8A8] hover:text-[#E10600] truncate transition-colors"
            title={emailAddress}
          >
            <Mail className="w-3.5 h-3.5 shrink-0 text-[#E10600]" />
            <span className="truncate">{emailAddress}</span>
          </a>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-zinc-900 dark:text-[#F2F0EB] hover:text-[#E10600] shrink-0 transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
            <span>@{githubUsername}</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
