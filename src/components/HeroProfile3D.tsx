import React, { useRef, useState, useEffect } from 'react';
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
  const [isScrollColor, setIsScrollColor] = useState(false);

  useEffect(() => {
    const checkScrollColor = () => {
      const isCompactOrTouch =
        window.innerWidth < 1024 ||
        window.matchMedia('(hover: none), (pointer: coarse)').matches;

      if (!isCompactOrTouch) {
        setIsScrollColor(false);
        return;
      }

      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
      const hasScrolled = scrollY > 12;
      const isInActiveBand = rect.top < vh * 0.85 && rect.bottom > vh * 0.12;

      setIsScrollColor(hasScrolled && isInActiveBand);
    };

    let frameId: number | null = null;
    const onScrollOrResize = () => {
      if (frameId !== null) return;
      frameId = window.requestAnimationFrame(() => {
        frameId = null;
        checkScrollColor();
      });
    };

    checkScrollColor();
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, []);

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

      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      card.style.transform = `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;

      if (glareRef.current) {
        const gx = ((x / rect.width) * 100).toFixed(1);
        const gy = ((y / rect.height) * 100).toFixed(1);
        glareRef.current.style.opacity = '1';
        glareRef.current.style.background = `radial-gradient(400px circle at ${gx}% ${gy}%, rgba(225, 6, 0, 0.24), transparent 65%)`;
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
      className="relative h-full flex flex-col justify-center select-none group/portrait"
      style={{ perspective: '1200px', touchAction: 'pan-y' }}
    >
      {/* Editorial 3D Cinema Portrait Plate */}
      <div
        ref={cardRef}
        className="relative h-full rounded-xl bg-[#0B0B0B]/90 backdrop-blur-xl border border-[#F2F0EB]/15 p-5 sm:p-6 flex flex-col justify-between transition-transform duration-200 ease-out shadow-[0_32px_90px_rgba(0,0,0,0.65)]"
        style={{
          transform: 'rotateX(0deg) rotateY(0deg)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Dynamic Cursor / Touch Crimson Reflection */}
        <div
          ref={glareRef}
          className="pointer-events-none absolute inset-0 rounded-xl transition-opacity duration-300"
          style={{ opacity: 0 }}
        />

        {/* Editorial Plate Index Strip */}
        <div
          className="relative z-10 flex items-center justify-between font-mono text-[11px] tracking-wider text-[#A8A8A8] border-b border-[#F2F0EB]/10 pb-3"
          style={{ transform: 'translateZ(20px)' }}
        >
          <span className="inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#E10600] animate-pulse" />
            <span>FIG. 01 — {name.toUpperCase()}</span>
          </span>
          <span className="text-[#E10600] font-semibold">PORTFOLIO</span>
        </div>

        {/* Framer Portrait Frame: Rotating Conic Halo + Grayscale-to-Color Crossfade */}
        <div
          className="relative z-10 my-5 flex-1 flex flex-col justify-center"
          style={{ transform: 'translateZ(36px)' }}
        >
          <div className="relative aspect-[4/4.2] w-full max-w-[320px] mx-auto rounded-lg p-[2px] profile-3d-ring-wrapper">
            {/* Rotating Crimson/Cream Conic Light Ring */}
            <div className="profile-3d-spinning-ring" aria-hidden="true" />
            <div className="profile-3d-orbit-halo" aria-hidden="true" />

            <div className="relative z-10 w-full h-full rounded-[6px] overflow-hidden bg-[#141414]">
              {/* Layer 1: High-Contrast Noir Monochrome Base */}
              <img
                src={profileImgSrc}
                alt={`${name} — ${headline}`}
                referrerPolicy="no-referrer"
                onError={onImageError}
                className={`w-full h-full object-cover object-center grayscale contrast-125 brightness-95 transition-all duration-700 ease-out group-hover/portrait:scale-[1.06] group-hover/portrait:opacity-0 ${
                  isScrollColor ? 'scale-[1.06] opacity-0' : ''
                }`}
              />

              {/* Layer 2: Framer `Image Color` Vivid Color Crossfade on Hover / Mobile Scroll */}
              <img
                src={profileImgSrc}
                alt=""
                aria-hidden="true"
                referrerPolicy="no-referrer"
                className={`absolute inset-0 w-full h-full object-cover object-center contrast-110 transition-all duration-700 ease-out group-hover/portrait:opacity-100 group-hover/portrait:scale-[1.06] ${
                  isScrollColor ? 'opacity-100 scale-[1.06]' : 'opacity-0 scale-100'
                }`}
              />

              {/* Radial Cinema Vignette + Bottom Shade */}
              {!usingFallbackAvatar && (
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(60% 60% at 50% 45%, transparent 35%, rgba(5,5,5,0.68) 100%), linear-gradient(180deg, transparent 48%, rgba(5,5,5,0.88) 100%)',
                  }}
                />
              )}

              {/* Corner Crosshairs */}
              <span className="absolute top-2.5 left-2.5 font-mono text-[10px] text-[#F2F0EB]/60 pointer-events-none">
                +
              </span>
              <span className="absolute top-2.5 right-2.5 font-mono text-[10px] text-[#F2F0EB]/60 pointer-events-none">
                +
              </span>

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
        </div>

        {/* Bottom Direct Hairline Metadata */}
        <div
          className="relative z-10 pt-3.5 border-t border-[#F2F0EB]/10 flex items-center justify-between gap-2 text-xs font-mono"
          style={{ transform: 'translateZ(22px)' }}
        >
          <a
            href={`mailto:${emailAddress}`}
            className="inline-flex items-center gap-1.5 text-[#A8A8A8] hover:text-[#E10600] truncate transition-colors"
            title={emailAddress}
          >
            <Mail className="w-3.5 h-3.5 shrink-0 text-[#E10600]" />
            <span className="truncate">{emailAddress}</span>
          </a>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[#F2F0EB] hover:text-[#E10600] shrink-0 transition-colors"
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
