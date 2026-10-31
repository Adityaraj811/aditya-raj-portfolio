import React from 'react';
import {
  Globe,
  ShieldCheck,
  CheckCircle2,
  Layers,
  BookOpen,
} from 'lucide-react';
import type { ProjectItem } from '../data/portfolioConfig';
import { KhataScreenShowcase } from './KhataScreenShowcase';
import { VelouraInteractiveShowcase } from './VelouraInteractiveShowcase';

interface ProjectVisualProps {
  visualType: ProjectItem['visualType'];
  variant?: 'card' | 'modal';
  onExpandCaseStudy?: () => void;
}

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
    <div className="relative w-full h-full min-h-[290px] bg-zinc-950 text-zinc-100 p-6 flex flex-col justify-between overflow-hidden select-none group-hover:bg-[#0B0D16] transition-colors duration-300">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full pointer-events-none transition-transform duration-500 group-hover:scale-110"
        style={{
          background:
            'radial-gradient(circle, rgba(59,130,246,0.24) 0%, rgba(139,92,246,0.10) 60%, transparent 100%)',
        }}
      />
      <div className="relative z-10 flex items-center justify-between border-b border-zinc-800/90 pb-3.5">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Globe className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-mono font-semibold text-zinc-100 tracking-tight">
              Apple Vision UI · Spatial Web App
            </p>
            <p className="text-[11px] text-zinc-400">
              GSAP · ScrollTrigger · HTML5 2D Canvas Engine
            </p>
          </div>
        </div>
        <span className="text-[11px] font-mono text-emerald-400">Public Repo</span>
      </div>

      {/* Spatial Web UI Preview */}
      <div className="relative z-10 my-4 grid grid-cols-1 sm:grid-cols-3 gap-2.5 font-mono text-xs">
        <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800/90 group-hover:border-blue-500/30 transition-colors">
          <div className="flex items-center gap-1.5 text-blue-400 mb-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span className="text-[11px]">GSAP ENGINE</span>
          </div>
          <p className="text-zinc-100 font-sans text-xs font-semibold">ScrollTrigger</p>
          <p className="text-[11px] text-zinc-400 font-sans mt-0.5">
            Scroll-driven spatial motion &amp; pinned viewports
          </p>
        </div>

        <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800/90 group-hover:border-indigo-500/30 transition-colors">
          <div className="flex items-center gap-1.5 text-indigo-400 mb-1">
            <Layers className="w-3.5 h-3.5" />
            <span className="text-[11px]">CANVAS API</span>
          </div>
          <p className="text-zinc-100 font-sans text-xs font-semibold">Interactive Frames</p>
          <p className="text-[11px] text-zinc-400 font-sans mt-0.5">
            High-resolution 2D Canvas sequence playback
          </p>
        </div>

        <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800/90 group-hover:border-emerald-500/30 transition-colors">
          <div className="flex items-center gap-1.5 text-emerald-400 mb-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="text-[11px]">SPATIAL UI</span>
          </div>
          <p className="text-zinc-100 font-sans text-xs font-semibold">Responsive Layout</p>
          <p className="text-[11px] text-zinc-400 font-sans mt-0.5">
            HTML5 · CSS3 · Modular JavaScript
          </p>
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-zinc-400 pt-2.5 border-t border-zinc-800/80">
        <span>HTML5 · CSS3 · JS · GSAP · Canvas</span>
        <span className="text-blue-400 group-hover:translate-x-0.5 transition-transform">
          Inspect Architecture →
        </span>
      </div>
    </div>
  );
};
