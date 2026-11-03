import React, { useState } from 'react';
import {
  Activity,
  Box,
  Cpu,
  Dumbbell,
  ExternalLink,
  Eye,
  Flame,
  Globe,
  Leaf,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import type { ProjectItem } from '../data/portfolioConfig';
import { KhataScreenShowcase } from './KhataScreenShowcase';
import { VelouraInteractiveShowcase } from './VelouraInteractiveShowcase';

interface ProjectVisualProps {
  visualType: ProjectItem['visualType'];
  variant?: 'card' | 'modal';
  onExpandCaseStudy?: () => void;
}

const FITNESS_JYM_TABS = [
  {
    id: 'sanctuary',
    label: 'Iron Sanctuary',
    badge: 'STRENGTH & CONDITIONING',
    headline: 'Build Strength. Unleash Your Potential.',
    metric: 'Pro Equipment · Elite Coaching · 24/7 Access',
    subtext: 'Designed for athletes & beginners seeking real physical transformation',
  },
  {
    id: 'programs',
    label: 'Programs & Plans',
    badge: 'TRAINING & MEMBERSHIP TIERS',
    headline: 'Hypertrophy, Cross-Training & Personal Coaching',
    metric: 'Flexible Monthly, Quarterly & Annual Memberships',
    subtext: 'Structured strength splits with guided progression & WhatsApp support',
  },
  {
    id: 'bmi',
    label: 'BMI Diagnostic',
    badge: 'INTERACTIVE FITNESS CALCULATOR',
    headline: 'Real-Time BMI Metric Diagnostic & Goal Planner',
    metric: '178 cm · 74 kg → BMI 23.4 (Optimal Athletic Range)',
    subtext: 'Instant body-mass index analysis paired with tailored program guidance',
  },
] as const;

const FitnessJymPreview: React.FC<{
  variant?: 'card' | 'modal';
  onExpandCaseStudy?: () => void;
}> = ({ variant = 'card', onExpandCaseStudy }) => {
  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const currentTab = FITNESS_JYM_TABS[activeTabIdx];
  const isModal = variant === 'modal';

  return (
    <div
      className={`relative w-full h-full ${
        isModal ? 'min-h-[220px] p-4 sm:p-5' : 'min-h-[260px] p-5'
      } bg-[#08090B] text-zinc-100 flex flex-col justify-between overflow-hidden select-none group-hover:bg-[#0C0E12] transition-colors duration-300`}
    >
      {/* Ambient High-Voltage Orange Glow (#FF5E00) */}
      <div
        className="absolute -top-20 -right-12 w-72 h-72 rounded-full pointer-events-none transition-transform duration-500 group-hover:scale-110"
        style={{
          background:
            'radial-gradient(circle, rgba(255,94,0,0.24) 0%, rgba(255,94,0,0.06) 55%, transparent 75%)',
        }}
      />

      {/* Top Browser/Brand Bar + Interactive Module Switcher */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800/90 pb-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-[#FF5E00]/15 border border-[#FF5E00]/45 flex items-center justify-center text-[#FF5E00] shrink-0">
            <Dumbbell className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <p className="text-xs font-mono font-bold text-white tracking-tight truncate">
                FITNESS JYM · LIVE WEBSITE
              </p>
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#FF5E00]/20 border border-[#FF5E00]/40 text-[9px] font-mono text-[#FF5E00] font-semibold shrink-0">
                Cloudflare
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 font-mono truncate">
              fitness-jym.adityaraj81156.workers.dev
            </p>
          </div>
        </div>

        {/* Interactive Tab Switcher */}
        <div
          className="flex items-center gap-1 bg-zinc-900/95 border border-zinc-800 rounded-lg p-0.5 shrink-0"
          onClick={(e) => e.stopPropagation()}
        >
          {FITNESS_JYM_TABS.map((tab, idx) => (
            <button
              key={tab.id}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActiveTabIdx(idx);
              }}
              className={`px-2 py-1 rounded-md text-[10px] font-mono transition-colors cursor-pointer ${
                idx === activeTabIdx
                  ? 'bg-[#FF5E00] text-black font-bold'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Centerpiece: Active Fitness JYM Section Showcase + 3 Core Website Pillars */}
      <div className="relative z-10 my-3.5 space-y-3">
        <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-[#FF5E00]/35 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1 min-w-0">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-[#FF5E00] font-bold tracking-wider">
              <Flame className="w-3 h-3 shrink-0" />
              <span>{currentTab.badge}</span>
            </span>
            <p className="text-xs sm:text-sm font-bold text-white truncate">
              {currentTab.headline}
            </p>
            <p className="text-[11px] text-zinc-400 leading-snug">
              {currentTab.subtext}
            </p>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0">
            <span className="inline-block px-2.5 py-1 rounded-lg bg-[#FF5E00]/15 border border-[#FF5E00]/35 text-[10px] font-mono text-[#FF5E00] font-semibold">
              {currentTab.metric}
            </span>
            <a
              href="https://fitness-jym.adityaraj81156.workers.dev/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#FF5E00] hover:bg-[#ff7424] text-black font-mono text-[10px] font-bold transition-colors"
            >
              <span>Visit Live Site</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        </div>

        {/* 3 Core Highlights of Fitness JYM */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <div className="p-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800/90">
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#FF5E00]">
              <Dumbbell className="w-3 h-3 shrink-0" />
              <span>IRON SANCTUARY</span>
            </div>
            <p className="text-xs font-semibold text-zinc-100 mt-1">Training &amp; Plans</p>
            <p className="text-[11px] text-zinc-400 mt-0.5 leading-snug">
              Programs, coaching &amp; membership tiers
            </p>
          </div>

          <div className="p-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800/90">
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-amber-400">
              <Activity className="w-3 h-3 shrink-0" />
              <span>BMI DIAGNOSTIC</span>
            </div>
            <p className="text-xs font-semibold text-zinc-100 mt-1">Metric Calculator</p>
            <p className="text-[11px] text-zinc-400 mt-0.5 leading-snug">
              Interactive body-mass index diagnostics
            </p>
          </div>

          <div className="p-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800/90">
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
              <Globe className="w-3 h-3 shrink-0" />
              <span>CLOUDFLARE EDGE</span>
            </div>
            <p className="text-xs font-semibold text-zinc-100 mt-1">Responsive + WhatsApp</p>
            <p className="text-[11px] text-zinc-400 mt-0.5 leading-snug">
              Fast edge hosting &amp; quick chat CTA
            </p>
          </div>
        </div>
      </div>

      {/* Footer Stack & Action */}
      <div className="relative z-10 flex items-center justify-between gap-2 text-[11px] font-mono text-zinc-400 pt-2.5 border-t border-zinc-800/80">
        <span className="truncate">
          React · TypeScript · Vite · Tailwind CSS · Three.js · Cloudflare
        </span>
        <span className="shrink-0 text-[#FF5E00] font-semibold">
          {onExpandCaseStudy ? 'Inspect →' : 'Live on Cloudflare'}
        </span>
      </div>
    </div>
  );
};

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
              HTML5 · CSS3 · JS · GSAP · Canvas
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
          HTML5 · CSS3 · JS · GSAP · ScrollTrigger · Canvas API
        </span>
        <span className="shrink-0 font-semibold" style={{ color: theme.accent }}>
          {onExpandCaseStudy ? 'Inspect →' : 'Public Repo'}
        </span>
      </div>
    </div>
  );
};

const KRISHI_SOIL_PRESETS = [
  {
    id: 'alluvial',
    label: 'Alluvial',
    npk: 'N:90 · P:42 · K:43 · pH 6.5',
    crop: 'Basmati Rice / Wheat',
    confidence: '99.2%',
    roi: '₹68,400 / Acre Est.',
  },
  {
    id: 'black',
    label: 'Black Soil',
    npk: 'N:115 · P:58 · K:50 · pH 7.2',
    crop: 'Cotton / Soybean',
    confidence: '98.7%',
    roi: '₹74,200 / Acre Est.',
  },
  {
    id: 'loamy',
    label: 'Loamy',
    npk: 'N:65 · P:55 · K:48 · pH 6.8',
    crop: 'Chickpea / Mustard',
    confidence: '98.9%',
    roi: '₹59,800 / Acre Est.',
  },
] as const;

const KrishiMitraPreview: React.FC<{
  variant?: 'card' | 'modal';
  onExpandCaseStudy?: () => void;
}> = ({ variant = 'card', onExpandCaseStudy }) => {
  const [selectedPresetIdx, setSelectedPresetIdx] = useState(0);
  const preset = KRISHI_SOIL_PRESETS[selectedPresetIdx];
  const isModal = variant === 'modal';

  return (
    <div
      className={`relative w-full h-full ${
        isModal ? 'min-h-[220px] p-4 sm:p-5' : 'min-h-[260px] p-5'
      } bg-[#070D0A] text-zinc-100 flex flex-col justify-between overflow-hidden select-none group-hover:bg-[#0A130E] transition-colors duration-300`}
    >
      {/* Ambient Emerald Glow */}
      <div
        className="absolute -bottom-20 -left-16 w-72 h-72 rounded-full pointer-events-none transition-transform duration-500 group-hover:scale-110"
        style={{
          background:
            'radial-gradient(circle, rgba(16,185,129,0.22) 0%, rgba(59,130,246,0.08) 60%, transparent 100%)',
        }}
      />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between gap-2 border-b border-emerald-950/90 pb-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/35 flex items-center justify-center text-emerald-400 shrink-0">
            <Leaf className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-mono font-semibold text-zinc-100 tracking-tight truncate">
              KrishiMitra · AI Crop System
            </p>
            <p className="text-[11px] text-zinc-400 truncate">
              Extra Trees ML (22 Models) · Multilingual PWA
            </p>
          </div>
        </div>

        {/* Interactive Soil Preset Switcher */}
        <div
          className="flex items-center gap-1 bg-zinc-900/90 border border-zinc-800 rounded-lg p-0.5 shrink-0"
          onClick={(e) => e.stopPropagation()}
        >
          {KRISHI_SOIL_PRESETS.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPresetIdx(idx);
              }}
              className={`px-2 py-1 rounded-md text-[10px] font-mono transition-colors cursor-pointer ${
                idx === selectedPresetIdx
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Live Extra Trees Prediction Banner + 3 Core Modules */}
      <div className="relative z-10 my-3.5 space-y-3">
        <div className="p-3 rounded-xl bg-zinc-900/90 border border-emerald-500/30 flex flex-wrap items-center justify-between gap-2">
          <div className="space-y-0.5">
            <span className="text-[10px] font-mono text-emerald-400 font-semibold">
              EXTRA TREES CLASSIFIER · {preset.npk}
            </span>
            <p className="text-xs sm:text-sm font-bold text-zinc-100">
              Recommended: <span className="text-emerald-300">{preset.crop}</span>
            </p>
          </div>
          <div className="text-right font-mono">
            <span className="inline-block px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-[10px] text-emerald-300 font-semibold">
              {preset.confidence} Match
            </span>
            <p className="text-[10px] text-zinc-400 mt-0.5">{preset.roi}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <div className="p-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800/90">
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
              <Cpu className="w-3 h-3 shrink-0" />
              <span>22 ML MODELS</span>
            </div>
            <p className="text-xs font-semibold text-zinc-100 mt-1">Extra Trees Selected</p>
            <p className="text-[11px] text-zinc-400 mt-0.5 leading-snug">
              Top accuracy &amp; low inference latency
            </p>
          </div>

          <div className="p-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800/90">
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-blue-400">
              <Globe className="w-3 h-3 shrink-0" />
              <span>OFFLINE PWA</span>
            </div>
            <p className="text-xs font-semibold text-zinc-100 mt-1">Multilingual UI</p>
            <p className="text-[11px] text-zinc-400 mt-0.5 leading-snug">
              Offline fallback content support
            </p>
          </div>

          <div className="p-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800/90">
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-amber-400">
              <TrendingUp className="w-3 h-3 shrink-0" />
              <span>AGRI ECONOMICS</span>
            </div>
            <p className="text-xs font-semibold text-zinc-100 mt-1">Economics Dashboard</p>
            <p className="text-[11px] text-zinc-400 mt-0.5 leading-snug">
              Yield &amp; market return analytics
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 flex items-center justify-between gap-2 text-[11px] font-mono text-zinc-400 pt-2.5 border-t border-zinc-800/80">
        <span className="truncate">
          Java · Python · Scikit-learn · React · TypeScript · PWA
        </span>
        <span className="shrink-0 text-emerald-400 font-semibold">
          {onExpandCaseStudy ? 'Inspect →' : 'Team Project'}
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

  if (visualType === 'fitness-jym-web') {
    return (
      <FitnessJymPreview
        variant={variant}
        onExpandCaseStudy={onExpandCaseStudy}
      />
    );
  }

  if (visualType === 'khata-android') {
    return <KhataScreenShowcase variant={variant} />;
  }

  if (visualType === 'krishi-mitra-web') {
    return (
      <KrishiMitraPreview
        variant={variant}
        onExpandCaseStudy={onExpandCaseStudy}
      />
    );
  }

  return (
    <AppleVisionSpatialPreview
      variant={variant}
      onExpandCaseStudy={onExpandCaseStudy}
    />
  );
};


