import React, { useRef, useState } from 'react';
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
  const [tilt, setTilt] = useState<{ rotateX: number; rotateY: number; glareX: number; glareY: number; isHovered: boolean }>({
    rotateX: 0,
    rotateY: 0,
    glareX: 50,
    glareY: 50,
    isHovered: false,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    if (
      typeof window !== 'undefined' &&
      (window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
        window.matchMedia('(hover: none)').matches)
    ) {
      return;
    }

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -9;
    const rotateY = ((x - centerX) / centerX) * 9;

    setTilt({
      rotateX,
      rotateY,
      glareX: (x / rect.width) * 100,
      glareY: (y / rect.height) * 100,
      isHovered: true,
    });
  };

  const handleMouseLeave = () => {
    setTilt({
      rotateX: 0,
      rotateY: 0,
      glareX: 50,
      glareY: 50,
      isHovered: false,
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-full flex flex-col justify-center select-none"
      style={{ perspective: '1200px' }}
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
        className="relative h-full rounded-2xl bg-white/90 dark:bg-[#0D0E14]/90 backdrop-blur-xl border border-zinc-200/90 dark:border-zinc-800/90 p-5 sm:p-6 flex flex-col justify-between shadow-xl transition-transform duration-200 ease-out"
        style={{
          transform: `rotateX(${tilt.rotateX.toFixed(2)}deg) rotateY(${tilt.rotateY.toFixed(2)}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Dynamic Cursor Glare Overlay */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
          style={{
            opacity: tilt.isHovered ? 1 : 0,
            background: `radial-gradient(380px circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(59, 130, 246, 0.12), transparent 65%)`,
          }}
        />

        {/* Center: Continuously Animated 3D Conic Gradient Border + Rotating Light-Ring */}
        <div
          className="relative z-10 my-auto py-3 flex flex-col items-center text-center"
          style={{ transform: 'translateZ(32px)' }}
        >
          {/* Floating 3D Geometric Elements Around Portrait (Never obscuring face) */}
          <div
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/95 dark:bg-zinc-900/95 border border-zinc-200/90 dark:border-zinc-700/80 shadow-lg text-[11px] font-mono text-zinc-700 dark:text-zinc-200 absolute -top-1 left-1 z-20 animate-float-slow"
            style={{ transform: 'translateZ(46px)' }}
          >
            <Code2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
            <span>Web &amp; Full-Stack</span>
          </div>

          <div
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/95 dark:bg-zinc-900/95 border border-zinc-200/90 dark:border-zinc-700/80 shadow-lg text-[11px] font-mono text-zinc-700 dark:text-zinc-200 absolute top-1/2 -right-2 z-20 animate-float-delayed"
            style={{ transform: 'translateZ(50px)' }}
          >
            <Smartphone className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
            <span>Android · MVVM</span>
          </div>

          <div
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/95 dark:bg-zinc-900/95 border border-zinc-200/90 dark:border-zinc-700/80 shadow-lg text-[11px] font-mono text-zinc-700 dark:text-zinc-200 absolute bottom-20 left-0 z-20 animate-float-reverse"
            style={{ transform: 'translateZ(42px)' }}
          >
            <Database className="w-3.5 h-3.5 text-sky-500 shrink-0" />
            <span>Java · Spring Boot</span>
          </div>

          {/* Outer Rotating Light-Ring Container */}
          <div className="relative p-1.5 rounded-3xl profile-3d-ring-wrapper shadow-2xl">
            {/* Continuous Conic Spinning Gradient Ring */}
            <div className="profile-3d-spinning-ring" aria-hidden="true" />

            {/* Secondary Counter-Rotating Outer Orbit Halo */}
            <div className="profile-3d-orbit-halo" aria-hidden="true" />

            {/* Portrait Image Frame — Preserves Natural Aspect Ratio Without Distortion */}
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-[20px] overflow-hidden bg-zinc-100 dark:bg-zinc-900 z-10">
              <img
                src={profileImgSrc}
                alt={`${name} — ${headline}`}
                referrerPolicy="no-referrer"
                onError={onImageError}
                className="w-full h-full object-cover object-center transition-transform duration-500"
              />
              {/* Subtle bottom scrim for depth */}
              {!usingFallbackAvatar && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/5 pointer-events-none" />
              )}
            </div>
          </div>

          {/* Name & Core Identity Below Portrait */}
          <div className="mt-5 space-y-1">
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
