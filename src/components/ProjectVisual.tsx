import React, { useState } from 'react';
import {
  Layers,
  BookOpen,
  Box,
  Eye,
  Cpu,
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
type VisionPreviewTab = '3d-studio' | '360-canvas' | 'optical-stack' | 'tech-xray';

const VISION_PREVIEW_THEMES: Record<
  VisionPreviewThemeId,
  {
    id: VisionPreviewThemeId;
    name: string;
    env: string;
    accent: string;
    glow: string;
    tempK: string;
  }
> = {
  solaris: {
    id: 'solaris',
    name: 'Solaris Orange',
    env: 'Joshua Tree Sunset',
    accent: '#ff823d',
    glow: 'rgba(255, 130, 61, 0.24)',
    tempK: '3800K',
  },
  cupertino: {
    id: 'cupertino',
    name: 'Cupertino Cobalt',
    env: 'Apple Park Daylight',
    accent: '#0071e3',
    glow: 'rgba(0, 113, 227, 0.26)',
    tempK: '5600K',
  },
  mounthood: {
    id: 'mounthood',
    name: 'Mount Hood Emerald',
    env: 'Mount Hood Mirror Lake',
    accent: '#10b981',
    glow: 'rgba(16, 185, 129, 0.24)',
    tempK: '5200K',
  },
  nebula: {
    id: 'nebula',
    name: 'Deep Space Indigo',
    env: 'Lunar Surface Night',
    accent: '#6366f1',
    glow: 'rgba(99, 102, 241, 0.26)',
    tempK: '6500K',
  },
};

const AppleVisionSpatialPreview: React.FC<{
  variant?: 'card' | 'modal';
  onExpandCaseStudy?: () => void;
}> = ({ variant = 'card', onExpandCaseStudy }) => {
  const [themeId, setThemeId] = useState<VisionPreviewThemeId>('solaris');
  const [activeTab, setActiveTab] = useState<VisionPreviewTab>('3d-studio');
  const [activeCallout, setActiveCallout] = useState<'enclosure' | 'light-seal' | 'eyesight' | 'exploded'>('enclosure');
  const [frameIndex, setFrameIndex] = useState<number>(18);

  const theme = VISION_PREVIEW_THEMES[themeId];
  const isModal = variant === 'modal';

  const calloutSpecs: Record<
    'enclosure' | 'light-seal' | 'eyesight' | 'exploded',
    { label: string; frame: string; detail: string; explodePct: number }
  > = {
    enclosure: {
      label: '01. Enclosure',
      frame: 'Frame 0018',
      detail: '3D-formed laminated glass & custom 7000-series aluminum frame',
      explodePct: 12,
    },
    'light-seal': {
      label: '02. Light Seal',
      frame: 'Frame 0052',
      detail: 'Magnetic modular cushion blocking stray ambient light',
      explodePct: 35,
    },
    eyesight: {
      label: '06. EyeSight OLED',
      frame: 'Frame 0188',
      detail: 'Lenticular outward OLED front panel with dynamic immersion cue',
      explodePct: 0,
    },
    exploded: {
      label: 'Exploded 3D View',
      frame: 'Orbit 0.88x',
      detail: 'Full Three.js multi-mesh optical & silicon separation',
      explodePct: 88,
    },
  };

  return (
    <div
      className={`relative w-full h-full ${
        isModal ? 'min-h-[310px] p-5 sm:p-6' : 'min-h-[320px] p-4 sm:p-5'
      } bg-[#070709] text-zinc-100 flex flex-col justify-between overflow-hidden select-none group-hover:bg-[#090B12] transition-colors duration-300`}
    >
      {/* Dynamic visionOS Ambient Theme Glow */}
      <div
        className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-64 rounded-full pointer-events-none transition-all duration-500"
        style={{
          background: `radial-gradient(circle, ${theme.glow} 0%, rgba(9,9,11,0) 72%)`,
        }}
      />

      {/* Top Header: Title + Customizable visionOS Theme Dots */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800/90 pb-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className="w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 transition-colors"
            style={{
              backgroundColor: `${theme.accent}1f`,
              borderColor: `${theme.accent}55`,
              color: theme.accent,
            }}
          >
            <Box className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-mono font-semibold text-zinc-100 tracking-tight truncate">
              Apple Vision UI · Spatial Web App
            </p>
            <p className="text-[11px] text-zinc-400 truncate">
              React 19 · Three.js · GSAP · HTML5 Canvas
            </p>
          </div>
        </div>

        {/* Interactive visionOS Theme Selector */}
        <div
          className="flex items-center gap-1.5 bg-zinc-900/90 border border-zinc-800 rounded-lg px-2 py-1"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="text-[10px] font-mono text-zinc-400 mr-0.5 hidden sm:inline">
            Theme:
          </span>
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
                className={`w-4 h-4 rounded-full transition-transform cursor-pointer flex items-center justify-center ${
                  isSelected ? 'scale-115 ring-2 ring-white/80' : 'opacity-70 hover:opacity-100'
                }`}
                style={{ backgroundColor: item.accent }}
                title={`${item.name} (${item.env})`}
              />
            );
          })}
        </div>
      </div>

      {/* Interactive Module Switcher Tabs */}
      <div
        className={`relative z-10 mt-3 grid ${
          isModal ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-2'
        } gap-1.5 p-1.5 rounded-xl bg-zinc-900/90 border border-zinc-800/90`}
        onClick={(e) => e.stopPropagation()}
      >
        {[
          { id: '3d-studio' as const, label: '3D Studio', icon: Box },
          { id: '360-canvas' as const, label: '360° Scrub', icon: Sparkles },
          { id: 'optical-stack' as const, label: 'Optical Stack', icon: Layers },
          { id: 'tech-xray' as const, label: 'Tech X-Ray', icon: Eye },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActiveTab(tab.id);
              }}
              className={`flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-lg text-[11px] font-mono font-medium transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-zinc-800 text-white shadow-xs'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
              style={isActive ? { borderBottom: `2px solid ${theme.accent}` } : undefined}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" style={isActive ? { color: theme.accent } : undefined} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Spatial Stage Viewport */}
      <div className="relative z-10 my-3 p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800/90 flex-1 flex flex-col justify-between gap-3.5">
        {activeTab === '3d-studio' && (
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
              <div>
                <p className="text-[11px] font-mono" style={{ color: theme.accent }}>
                  THREE.JS WEBGL · ORBITCONTROLS · {theme.name.toUpperCase()}
                </p>
                <p className="text-xs font-semibold text-zinc-100 mt-0.5">
                  {calloutSpecs[activeCallout].label} — {calloutSpecs[activeCallout].frame}
                </p>
              </div>
              <span className="text-[10px] font-mono text-zinc-400 shrink-0">
                Explode: {calloutSpecs[activeCallout].explodePct}% · {theme.tempK}
              </span>
            </div>

            {/* Procedural Spatial Headset Vector & Micro-OLED Lens Stage */}
            <div className="relative h-28 rounded-lg bg-[#050507] border border-zinc-800/80 flex items-center justify-center overflow-hidden px-3">
              <svg
                viewBox="0 0 320 96"
                className="w-full max-w-[280px] h-22"
                aria-label="Apple Vision Pro 3D spatial headset diagram"
              >
                <defs>
                  <radialGradient id="visionLensGlow" cx="50%" cy="50%" r="55%">
                    <stop offset="0%" stopColor={theme.accent} stopOpacity="0.65" />
                    <stop offset="60%" stopColor="#3b82f6" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#09090b" stopOpacity="0" />
                  </radialGradient>
                </defs>
                {/* Head Band / Audio Pods */}
                <path
                  d="M22 48 C22 28, 52 22, 74 26 L246 26 C268 22, 298 28, 298 48 C298 68, 268 74, 246 70 L74 70 C52 74, 22 68, 22 48 Z"
                  fill="none"
                  stroke="rgba(161,161,170,0.35)"
                  strokeWidth="2"
                  strokeDasharray={activeCallout === 'exploded' ? '4 3' : undefined}
                />
                {/* Laminated Glass Visor */}
                <rect
                  x="56"
                  y="16"
                  width="208"
                  height="64"
                  rx="32"
                  fill="url(#visionLensGlow)"
                  stroke={theme.accent}
                  strokeWidth="1.75"
                />
                {/* Dual 23M-Pixel Micro-OLED Optical Modules */}
                <ellipse
                  cx={activeCallout === 'exploded' ? '106' : '116'}
                  cy="48"
                  rx="32"
                  ry="20"
                  fill="rgba(9,9,11,0.75)"
                  stroke="rgba(255,255,255,0.45)"
                  strokeWidth="1.2"
                />
                <ellipse
                  cx={activeCallout === 'exploded' ? '214' : '204'}
                  cy="48"
                  rx="32"
                  ry="20"
                  fill="rgba(9,9,11,0.75)"
                  stroke="rgba(255,255,255,0.45)"
                  strokeWidth="1.2"
                />
                {/* Nasal Bridge Contour */}
                <path
                  d="M148 68 Q160 54 172 68"
                  fill="none"
                  stroke={theme.accent}
                  strokeWidth="1.5"
                />
              </svg>
            </div>

            <p className="text-[11px] text-zinc-300 leading-snug">
              {calloutSpecs[activeCallout].detail}
            </p>

            {/* Camera Callout Preset Buttons */}
            <div
              className="flex flex-wrap items-center gap-1.5"
              onClick={(e) => e.stopPropagation()}
            >
              {(
                [
                  { id: 'enclosure', text: '01 Enclosure' },
                  { id: 'light-seal', text: '02 Light Seal' },
                  { id: 'eyesight', text: '06 EyeSight' },
                  { id: 'exploded', text: 'Exploded 3D' },
                ] as const
              ).map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveCallout(preset.id);
                  }}
                  className={`px-2 py-1 rounded-md text-[10px] font-mono transition-colors cursor-pointer ${
                    activeCallout === preset.id
                      ? 'bg-zinc-100 text-zinc-900 font-semibold'
                      : 'bg-zinc-800/90 text-zinc-300 hover:bg-zinc-700/80'
                  }`}
                >
                  {preset.text}
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === '360-canvas' && (
          <div className="space-y-3" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono" style={{ color: theme.accent }}>
                GSAP SCROLLTRIGGER · 198-FRAME 2D CANVAS
              </span>
              <span className="text-[11px] font-mono text-zinc-300">
                Frame {String(frameIndex).padStart(4, '0')} / 0198
              </span>
            </div>

            <div className="p-3 rounded-lg bg-[#050507] border border-zinc-800/80 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-zinc-100">
                  {frameIndex < 50
                    ? '01. Laminated Glass Enclosure'
                    : frameIndex < 110
                    ? '03. 3D-Knitted Head Band & Fit Dial'
                    : frameIndex < 170
                    ? '05. Dual-Driver Spatial Audio Pods'
                    : '06. Lenticular OLED EyeSight Display'}
                </span>
                <span className="font-mono text-[11px]" style={{ color: theme.accent }}>
                  {Math.round((frameIndex / 198) * 360)}° Yaw
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-200"
                  style={{
                    width: `${Math.max(8, Math.round((frameIndex / 198) * 100))}%`,
                    backgroundColor: theme.accent,
                  }}
                />
              </div>
              <p className="text-[11px] text-zinc-400">
                Interactive drag &amp; GSAP scroll-scrubbed HTML5 Canvas hardware rotation.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { frame: 18, label: '0018 · Front' },
                { frame: 88, label: '0088 · Profile' },
                { frame: 156, label: '0156 · Spatial Audio' },
                { frame: 188, label: '0188 · EyeSight' },
              ].map((item) => (
                <button
                  key={item.frame}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFrameIndex(item.frame);
                  }}
                  className={`px-2 py-1 rounded-md text-[10px] font-mono transition-colors cursor-pointer ${
                    frameIndex === item.frame
                      ? 'bg-zinc-100 text-zinc-900 font-semibold'
                      : 'bg-zinc-800/90 text-zinc-300 hover:bg-zinc-700/80'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'optical-stack' && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono" style={{ color: theme.accent }}>
                5-LAYER EXPLODED OPTICAL STACK CANVAS
              </span>
              <span className="text-[10px] font-mono text-zinc-400">23M Pixels · 7.5μm</span>
            </div>
            <div className="space-y-1.5">
              {[
                { idx: '01', name: 'Laminated Optical Glass', spec: '12-camera optical surface' },
                { idx: '02', name: 'TrueDepth & IR Tracking Array', spec: 'High-speed IR eye rings' },
                { idx: '03', name: '3-Element Catadioptric Lens', spec: 'Wide FOV focal geometry' },
                { idx: '04', name: '23M-Pixel Micro-OLED Display', spec: '64x pixels per iPhone pixel' },
                { idx: '05', name: 'Dual-Chip M2 + R1 Engine', spec: '12ms photon-to-photon latency' },
              ].map((layer) => (
                <div
                  key={layer.idx}
                  className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-[#050507] border border-zinc-800/80 text-[11px]"
                >
                  <span className="font-medium text-zinc-200">
                    <span className="font-mono mr-1.5" style={{ color: theme.accent }}>
                      {layer.idx}.
                    </span>
                    {layer.name}
                  </span>
                  <span className="font-mono text-[10px] text-zinc-400 hidden sm:inline">
                    {layer.spec}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'tech-xray' && (
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono" style={{ color: theme.accent }}>
                INTERACTIVE TECHNOLOGY VISUALIZERS
              </span>
              <span className="text-[10px] font-mono text-zinc-400">HTML5 2D Canvas</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="p-2.5 rounded-lg bg-[#050507] border border-zinc-800/80">
                <div className="flex items-center gap-1.5 text-[11px] font-mono" style={{ color: theme.accent }}>
                  <Eye className="w-3.5 h-3.5" />
                  <span>EYE TRACKING</span>
                </div>
                <p className="text-xs font-semibold text-zinc-100 mt-1">IR Gaze X-Ray</p>
                <p className="text-[10px] text-zinc-400 mt-0.5">
                  Interactive pupil convergence &amp; LED ring canvas
                </p>
              </div>
              <div className="p-2.5 rounded-lg bg-[#050507] border border-zinc-800/80">
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-blue-400">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>SENSOR ARRAY</span>
                </div>
                <p className="text-xs font-semibold text-zinc-100 mt-1">LiDAR · Hand · SLAM</p>
                <p className="text-[10px] text-zinc-400 mt-0.5">
                  12 cameras, 5 sensors &amp; 6 directional mics
                </p>
              </div>
              <div className="p-2.5 rounded-lg bg-[#050507] border border-zinc-800/80">
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>M2 + R1 SILICON</span>
                </div>
                <p className="text-xs font-semibold text-zinc-100 mt-1">12ms Latency</p>
                <p className="text-[10px] text-zinc-400 mt-0.5">
                  Dual-chip real-time sensor &amp; graphics pipeline
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Spatial Architecture Spec Grid (anchors bottom of stage viewport) */}
        <div className="pt-2.5 border-t border-zinc-800/80 grid grid-cols-2 gap-2 text-[11px]">
          <div className="p-2 rounded-lg bg-[#050507]/90 border border-zinc-800/70">
            <p className="font-mono text-[10px] text-zinc-400">3D &amp; MOTION ENGINE</p>
            <p className="font-semibold text-zinc-200 mt-0.5 truncate">
              Three.js · GSAP · ScrollTrigger
            </p>
          </div>
          <div className="p-2 rounded-lg bg-[#050507]/90 border border-zinc-800/70">
            <p className="font-mono text-[10px] text-zinc-400">ENVIRONMENT THEME</p>
            <p className="font-semibold mt-0.5 truncate" style={{ color: theme.accent }}>
              {theme.name} ({theme.env})
            </p>
          </div>
        </div>
      </div>

      {/* Footer Stack & Action */}
      <div className="relative z-10 flex items-center justify-between gap-2 text-[11px] font-mono text-zinc-400 pt-2.5 border-t border-zinc-800/80">
        <span className="truncate">
          React 19 · TypeScript · Three.js · GSAP · Tailwind v4 · Canvas
        </span>
        {onExpandCaseStudy ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onExpandCaseStudy();
            }}
            className="shrink-0 font-semibold hover:underline cursor-pointer"
            style={{ color: theme.accent }}
          >
            Inspect Architecture →
          </button>
        ) : (
          <span className="shrink-0" style={{ color: theme.accent }}>
            Public Repository
          </span>
        )}
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

