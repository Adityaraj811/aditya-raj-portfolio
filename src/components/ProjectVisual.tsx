import React, { useState } from 'react';
import {
  BookOpen,
  Box,
  Eye,
  Sparkles,
} from 'lucide-react';
import type { ProjectItem } from '../data/portfolioConfig';
import { KhataScreenShowcase } from './KhataScreenShowcase';
import { VelouraInteractiveShowcase } from './VelouraInteractiveShowcase';

interface ProjectVisualProps {
  visualType: ProjectItem['visualType'];
  variant?: 'card' | 'modal';
  onExpandCaseStudy?: () => void;
}

type VisionPreviewThemeId = 'solaris' | 'cupertino' | 'mounthood' | 'nebula';

const VISION_PREVIEW_THEMES: Record<
  VisionPreviewThemeId,
  {
    id: VisionPreviewThemeId;
    name: string;
    accent: string;
    glow: string;
  }
> = {
  solaris: {
    id: 'solaris',
    name: 'Solaris Orange',
    accent: '#ff823d',
    glow: 'rgba(255, 130, 61, 0.22)',
  },
  cupertino: {
    id: 'cupertino',
    name: 'Cupertino Cobalt',
    accent: '#0071e3',
    glow: 'rgba(0, 113, 227, 0.24)',
  },
  mounthood: {
    id: 'mounthood',
    name: 'Mount Hood Emerald',
    accent: '#10b981',
    glow: 'rgba(16, 185, 129, 0.22)',
  },
  nebula: {
    id: 'nebula',
    name: 'Deep Space Indigo',
    accent: '#6366f1',
    glow: 'rgba(99, 102, 241, 0.24)',
  },
};

const AppleVisionSpatialPreview: React.FC<{
  variant?: 'card' | 'modal';
  onExpandCaseStudy?: () => void;
}> = ({ variant = 'card', onExpandCaseStudy }) => {
  const [themeId, setThemeId] = useState<VisionPreviewThemeId>('solaris');
  const theme = VISION_PREVIEW_THEMES[themeId];
  const isModal = variant === 'modal';

  return (
    <div
      className={`relative w-full h-full ${
        isModal ? 'min-h-[220px] p-4 sm:p-5' : 'min-h-[260px] p-5'
      } bg-[#08090E] text-zinc-100 flex flex-col justify-between overflow-hidden select-none group-hover:bg-[#0B0D15] transition-colors duration-300`}
    >
      {/* Ambient visionOS Theme Glow */}
      <div
        className="absolute -top-16 left-1/2 -translate-x-1/2 w-80 h-52 rounded-full pointer-events-none transition-all duration-500"
        style={{
          background: `radial-gradient(circle, ${theme.glow} 0%, rgba(9,9,11,0) 70%)`,
        }}
      />

      {/* Compact Header + Theme Dots */}
      <div className="relative z-10 flex items-center justify-between gap-2 border-b border-zinc-800/90 pb-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className="w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 transition-colors"
            style={{
              backgroundColor: `${theme.accent}1a`,
              borderColor: `${theme.accent}50`,
              color: theme.accent,
            }}
          >
            <Box className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-mono font-semibold text-zinc-100 tracking-tight truncate">
              Apple Vision UI · Spatial Web
            </p>
            <p className="text-[11px] text-zinc-400 truncate">
              React 19 · Three.js · GSAP · Canvas
            </p>
          </div>
        </div>

        {/* Clean 4-Dot Theme Switcher */}
        <div
          className="flex items-center gap-1.5 bg-zinc-900/90 border border-zinc-800 rounded-lg px-2 py-1 shrink-0"
          onClick={(e) => e.stopPropagation()}
        >
          {(Object.keys(VISION_PREVIEW_THEMES) as VisionPreviewThemeId[]).map((id) => {
            const item = VISION_PREVIEW_THEMES[id];
            const isSelected = id === themeId;
            return (
              <button
                key={id}
                type="button"
                aria-label={`Select ${item.name} spatial theme`}
                onClick={(e) => {
                  e.stopPropagation();
                  setThemeId(id);
                }}
                className={`w-3.5 h-3.5 rounded-full transition-transform cursor-pointer ${
                  isSelected ? 'scale-115 ring-2 ring-white/85' : 'opacity-65 hover:opacity-100'
                }`}
                style={{ backgroundColor: item.accent }}
                title={item.name}
              />
            );
          })}
        </div>
      </div>

      {/* Sleek Centerpiece: Vision Pro Glass Visor + 3 Core Spatial Pillars */}
      <div className="relative z-10 my-3.5 space-y-3">
        <div className="relative h-20 rounded-xl bg-[#05060A] border border-zinc-800/80 flex items-center justify-between px-4 overflow-hidden">
          <svg
            viewBox="0 0 260 76"
            className="w-40 sm:w-44 h-16 shrink-0"
            aria-label="Apple Vision Pro spatial visor"
          >
            <defs>
              <radialGradient id="visionVisorGrad" cx="50%" cy="50%" r="55%">
                <stop offset="0%" stopColor={theme.accent} stopOpacity="0.6" />
                <stop offset="65%" stopColor="#3b82f6" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#09090b" stopOpacity="0" />
              </radialGradient>
            </defs>
            <path
              d="M14 38 C14 22, 40 18, 58 21 L202 21 C220 18, 246 22, 246 38 C246 54, 220 58, 202 55 L58 55 C40 58, 14 54, 14 38 Z"
              fill="none"
              stroke="rgba(161,161,170,0.3)"
              strokeWidth="1.5"
            />
            <rect
              x="42"
              y="12"
              width="176"
              height="52"
              rx="26"
              fill="url(#visionVisorGrad)"
              stroke={theme.accent}
              strokeWidth="1.6"
            />
            <ellipse
              cx="94"
              cy="38"
              rx="26"
              ry="16"
              fill="rgba(9,9,11,0.75)"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="1.1"
            />
            <ellipse
              cx="166"
              cy="38"
              rx="26"
              ry="16"
              fill="rgba(9,9,11,0.75)"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="1.1"
            />
            <path
              d="M120 54 Q130 43 140 54"
              fill="none"
              stroke={theme.accent}
              strokeWidth="1.4"
            />
          </svg>

          <div className="text-right space-y-0.5 min-w-0">
            <span
              className="inline-block text-[10px] font-mono font-semibold"
              style={{ color: theme.accent }}
            >
              {theme.name}
            </span>
            <p className="text-xs font-semibold text-zinc-100 truncate">
              3D Spatial Studio
            </p>
            <p className="text-[10px] font-mono text-zinc-400 truncate">
              OrbitControls · 360° Scrub
            </p>
          </div>
        </div>

        {/* 3 Clean Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <div className="p-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800/90">
            <div className="flex items-center gap-1.5 text-[10px] font-mono" style={{ color: theme.accent }}>
              <Box className="w-3 h-3 shrink-0" />
              <span>THREE.JS 3D</span>
            </div>
            <p className="text-xs font-semibold text-zinc-100 mt-1">Interactive 3D</p>
            <p className="text-[11px] text-zinc-400 mt-0.5 leading-snug">
              Exploded view &amp; 6 camera presets
            </p>
          </div>

          <div className="p-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800/90">
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-blue-400">
              <Sparkles className="w-3 h-3 shrink-0" />
              <span>GSAP MOTION</span>
            </div>
            <p className="text-xs font-semibold text-zinc-100 mt-1">Scroll &amp; 360°</p>
            <p className="text-[11px] text-zinc-400 mt-0.5 leading-snug">
              ScrollTrigger &amp; 2D Canvas scrub
            </p>
          </div>

          <div className="p-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800/90">
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
              <Eye className="w-3 h-3 shrink-0" />
              <span>VISUALIZERS</span>
            </div>
            <p className="text-xs font-semibold text-zinc-100 mt-1">Optical &amp; Chip</p>
            <p className="text-[11px] text-zinc-400 mt-0.5 leading-snug">
              Eye tracking, LiDAR &amp; M2 + R1
            </p>
          </div>
        </div>
      </div>

      {/* Footer Stack & Action */}
      <div className="relative z-10 flex items-center justify-between gap-2 text-[11px] font-mono text-zinc-400 pt-2.5 border-t border-zinc-800/80">
        <span className="truncate">
          React 19 · TypeScript · Three.js · GSAP · Canvas
        </span>
        <span className="shrink-0 font-semibold" style={{ color: theme.accent }}>
          {onExpandCaseStudy ? 'Inspect →' : 'Public Repo'}
        </span>
      </div>
    </div>
  );
};

export const ProjectVisual: React.FC<ProjectVisualProps> = ({
  visualType,
  variant = 'card',
  onExpandCaseStudy,
}) => {
  if (visualType === 'veloura-cafe-web') {
    return (
      <VelouraInteractiveShowcase
        variant={variant}
        onExpandCaseStudy={onExpandCaseStudy}
      />
    );
  }

  if (visualType === 'khata-android') {
    return <KhataScreenShowcase variant={variant} />;
  }

  if (visualType === 'library-mitra-web') {
    return (
      <div className="relative w-full h-full min-h-[290px] bg-zinc-950 text-zinc-100 p-6 flex flex-col justify-between overflow-hidden select-none group-hover:bg-[#0B0D16] transition-colors duration-300">
        <div
          className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full pointer-events-none transition-transform duration-500 group-hover:scale-110"
          style={{
            background:
              'radial-gradient(circle, rgba(99,102,241,0.24) 0%, rgba(59,130,246,0.08) 60%, transparent 100%)',
          }}
        />
        {/* Browser Header */}
        <div className="relative z-10 flex items-center justify-between border-b border-zinc-800/90 pb-3.5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-mono font-semibold text-zinc-100 tracking-tight">
                Library Mitra · Web Platform
              </p>
              <p className="text-[11px] text-zinc-400">
                Online Book Catalog &amp; Member Management
              </p>
            </div>
          </div>
          <span className="text-[11px] font-mono text-indigo-300">Responsive Web App</span>
        </div>

        {/* Simulated Catalog Interface */}
        <div className="relative z-10 my-4 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800/90 group-hover:border-indigo-500/30 transition-colors">
            <p className="text-[11px] font-mono text-indigo-400">01. DIGITAL CATALOG</p>
            <p className="text-xs font-semibold text-zinc-100 mt-1">Search &amp; Filter Books</p>
            <p className="text-[11px] text-zinc-400 mt-1">
              Instant lookup by subject, author, and real-time availability.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800/90 group-hover:border-blue-500/30 transition-colors">
            <p className="text-[11px] font-mono text-blue-400">02. MEMBER PORTAL</p>
            <p className="text-xs font-semibold text-zinc-100 mt-1">Borrowing Workflows</p>
            <p className="text-[11px] text-zinc-400 mt-1">
              Streamlined issue/return tracking and digital catalog access.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800/90 group-hover:border-emerald-500/30 transition-colors">
            <p className="text-[11px] font-mono text-emerald-400">03. MULTI-DEVICE</p>
            <p className="text-xs font-semibold text-zinc-100 mt-1">Responsive UI</p>
            <p className="text-[11px] text-zinc-400 mt-1">
              Clean layout across desktop monitors, tablets, and mobile browsers.
            </p>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-zinc-400 pt-2.5 border-t border-zinc-800/80">
          <span>HTML5 · CSS3 · JavaScript · SQL</span>
          <span className="text-indigo-400 group-hover:translate-x-0.5 transition-transform">
            Inspect Architecture →
          </span>
        </div>
      </div>
    );
  }

  return (
    <AppleVisionSpatialPreview
      variant={variant}
      onExpandCaseStudy={onExpandCaseStudy}
    />
  );
};

