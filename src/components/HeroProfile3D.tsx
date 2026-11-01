import React, { useRef } from 'react';
import { Code2, Smartphone, Database, Mail, Github } from 'lucide-react';

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

      const rotateX = ((y - centerY) / centerY) * -9;
      const rotateY = ((x - centerX) / centerX) * 9;

      card.style.transform = `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;

      if (glareRef.current) {
        const gx = ((x / rect.width) * 100).toFixed(1);
        const gy = ((y / rect.height) * 100).toFixed(1);
        glareRef.current.style.opacity = '1';
        glareRef.current.style.background = `radial-gradient(380px circle at ${gx}% ${gy}%, rgba(59, 130, 246, 0.14), transparent 65%)`;
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

    // Yield immediately to native vertical page scroll
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
      {/* Ambient Background Glow Behind 3D Portrait Card */}
      <div
        className="pointer-events-none absolute -inset-3 rounded-3xl opacity-65 dark:opacity-90 blur-2xl transition-opacity duration-500"
        style={{
          background:
            'radial-gradient(circle at 50% 45%, rgba(59, 130, 246, 0.25) 0%, rgba(99, 102, 241, 0.16) 45%, transparent 75%)',
        }}
      />

      {/* 3D Tilting Showcase Card */}
      <div
        ref={cardRef}
        className="relative h-full rounded-2xl bg-white/90 dark:bg-[#0D0E14]/90 backdrop-blur-xl border border-zinc-200/90 dark:border-zinc-800/90 p-5 sm:p-6 flex flex-col justify-between shadow-xl transition-transform duration-200 ease-out"
        style={{
          transform: 'rotateX(0deg) rotateY(0deg)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Dynamic Cursor / Touch Glare Overlay */}
        <div
          ref={glareRef}
          className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
          style={{ opacity: 0 }}
        />

        {/* Center: Continuously Animated 3D Conic Gradient Border + Rotating Light-Ring */}
        <div
          className="relative z-10 my-auto py-1.5 flex flex-col items-center text-center"
          style={{ transform: 'translateZ(32px)' }}
        >
          {/* Portrait Wrapper — Unobstructed Face & 3D Rotating Light-Ring */}
          <div className="relative inline-flex items-center justify-center">
            {/* Outer Rotating Light-Ring Container */}
            <div className="relative p-1.5 rounded-3xl profile-3d-ring-wrapper shadow-2xl">
              {/* Continuous Conic Spinning Gradient Ring */}
              <div className="profile-3d-spinning-ring" aria-hidden="true" />

              {/* Secondary Counter-Rotating Outer Orbit Halo */}
              <div className="profile-3d-orbit-halo" aria-hidden="true" />

              {/* Portrait Image Frame — Preserves Natural Aspect Ratio Without Distortion */}
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-[20px] overflow-hidden bg-zinc-100 dark:bg-zinc-900 z-10">
                <img
                  src={profileImgSrc}
                  alt={`${name} — ${headline}`}
                  referrerPolicy="no-referrer"
                  onError={onImageError}
                  className="w-full h-full object-cover object-center transition-transform duration-500"
                />
                {/* Subtle bottom scrim for depth */}
                {!usingFallbackAvatar && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/5 pointer-events-none" />
                )}
              </div>
            </div>

            {/* 3D Floating Badge 1 (Top-Left Corner) — Java · Spring Boot */}
            <div
              className="absolute -top-3 -left-4 sm:-top-3.5 sm:-left-8 z-20 flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl bg-white/95 dark:bg-zinc-900/95 border border-zinc-200/90 dark:border-zinc-700/80 shadow-lg text-[10px] sm:text-xs font-mono text-zinc-700 dark:text-zinc-200 whitespace-nowrap animate-float-reverse"
              style={{ transform: 'translateZ(72px)' }}
            >
              <Database className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-sky-500 shrink-0" />
              <span>Java · Spring Boot</span>
            </div>

            {/* 3D Floating Badge 2 (Left Side) — Android · MVVM */}
            <div
              className="absolute -bottom-3 -left-6 sm:-bottom-3.5 sm:-left-10 z-20 flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl bg-white/95 dark:bg-zinc-900/95 border border-zinc-200/90 dark:border-zinc-700/80 shadow-lg text-[10px] sm:text-xs font-mono text-zinc-700 dark:text-zinc-200 whitespace-nowrap animate-float-delayed"
              style={{ transform: 'translateZ(58px)' }}
            >
              <Smartphone className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-indigo-500 shrink-0" />
              <span>Android · MVVM</span>
            </div>

            {/* 3D Floating Badge 3 (Right Side) — Web & Full-Stack */}
            <div
              className="absolute -bottom-3 -right-6 sm:-bottom-3.5 sm:-right-10 z-20 flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl bg-white/95 dark:bg-zinc-900/95 border border-zinc-200/90 dark:border-zinc-700/80 shadow-lg text-[10px] sm:text-xs font-mono text-zinc-700 dark:text-zinc-200 whitespace-nowrap animate-float-slow"
              style={{ transform: 'translateZ(65px)' }}
            >
              <Code2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-500 shrink-0" />
              <span>Web &amp; Full-Stack</span>
            </div>
          </div>

          {/* Name & Core Identity Below Portrait */}
          <div className="mt-8 sm:mt-9 space-y-1">
            <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              {name}
            </h2>
            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
              {headline}
            </p>
            <p className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
              Websites · Web Apps · Android Apps · Java Backend
            </p>
          </div>
        </div>

        {/* Bottom Direct Contact Strip Inside Card */}
        <div
          className="relative z-10 pt-3.5 mt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between gap-2 text-xs font-mono"
          style={{ transform: 'translateZ(20px)' }}
        >
          <a
            href={`mailto:${emailAddress}`}
            className="inline-flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 truncate transition-colors"
            title={emailAddress}
          >
            <Mail className="w-3.5 h-3.5 shrink-0 text-blue-500" />
            <span className="truncate">{emailAddress}</span>
          </a>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline shrink-0"
          >
            <Github className="w-3.5 h-3.5" />
            <span>@{githubUsername}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
