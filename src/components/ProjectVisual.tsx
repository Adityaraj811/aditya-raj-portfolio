import React from 'react';
import { Smartphone, Globe, Server, Database, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import type { ProjectItem } from '../data/portfolioConfig';

interface ProjectVisualProps {
  visualType: ProjectItem['visualType'];
}

export const ProjectVisual: React.FC<ProjectVisualProps> = ({ visualType }) => {
  if (visualType === 'khata-android') {
    return (
      <div className="relative w-full h-full min-h-[260px] bg-zinc-950 text-zinc-100 p-6 flex flex-col justify-between overflow-hidden select-none">
        {/* Ambient radial lighting */}
        <div
          className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(59,130,246,0.22) 0%, rgba(139,92,246,0.05) 60%, transparent 100%)',
          }}
        />
        <div className="relative z-10 flex items-center justify-between border-b border-zinc-800/90 pb-3.5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Smartphone className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-mono font-medium text-zinc-200 tracking-tight">KHATA · Android Client</p>
              <p className="text-[11px] text-zinc-400">Flat 402 Shared Expenses · 4 Members</p>
            </div>
          </div>
          <span className="text-[11px] font-mono text-amber-400">MVVM + Room + Spring Boot</span>
        </div>

        {/* Simulated Expense Split Preview */}
        <div className="relative z-10 my-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800/90">
            <p className="text-[11px] font-mono text-zinc-400">MONTHLY HOUSEHOLD POOL</p>
            <p className="text-lg font-display font-semibold text-zinc-100 mt-0.5 tabular-nums">
              Rent · Groceries · Utilities
            </p>
            <div className="mt-2.5 space-y-1.5 text-xs text-zinc-300 font-mono">
              <div className="flex items-center justify-between">
                <span className="text-zinc-400"> Split Engine</span>
                <span className="text-blue-400">Equal &amp; Custom Shares</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-400"> Local Sync</span>
                <span className="text-emerald-400">Room DAO + LiveData</span>
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800/90 flex flex-col justify-between">
            <p className="text-[11px] font-mono text-zinc-400">BACKEND API SYNC</p>
            <div className="my-2 space-y-1.5 text-xs font-mono">
              <div className="flex items-center gap-1.5 text-zinc-200">
                <ArrowRight className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span className="truncate">POST /api/groups/expenses</span>
              </div>
              <div className="flex items-center gap-1.5 text-zinc-200">
                <ArrowRight className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                <span className="truncate">GET /api/settlements/balance</span>
              </div>
            </div>
            <p className="text-[11px] text-zinc-400">Retrofit · Spring Security · MySQL</p>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-zinc-400 pt-2 border-t border-zinc-800/80">
          <span>Java · XML Layouts · ViewBinding</span>
          <span className="text-amber-300">Status: Active Development</span>
        </div>
      </div>
    );
  }

  if (visualType === 'library-mitra-web') {
    return (
      <div className="relative w-full h-full min-h-[260px] bg-zinc-950 text-zinc-100 p-6 flex flex-col justify-between overflow-hidden select-none">
        <div
          className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.20) 0%, rgba(59,130,246,0.05) 60%, transparent 100%)',
          }}
        />
        {/* Browser Top Bar */}
        <div className="relative z-10 flex items-center justify-between border-b border-zinc-800/90 pb-3.5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-violet-500/15 border border-violet-500/30 flex items-center justify-center text-violet-400">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-mono font-medium text-zinc-200 tracking-tight">Library Mitra · Web Platform</p>
              <p className="text-[11px] text-zinc-400">Online Library Management &amp; Catalog Access</p>
            </div>
          </div>
          <span className="text-[11px] font-mono text-violet-300">Responsive Web UI</span>
        </div>

        {/* Simulated Catalog Interface */}
        <div className="relative z-10 my-4 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800/90">
            <p className="text-[11px] font-mono text-violet-400">01. DIGITAL CATALOG</p>
            <p className="text-xs font-medium text-zinc-100 mt-1">Search &amp; Browse Books</p>
            <p className="text-[11px] text-zinc-400 mt-1">Structured indexing by subject, author, and availability.</p>
          </div>
          <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800/90">
            <p className="text-[11px] font-mono text-blue-400">02. MEMBER ACCESS</p>
            <p className="text-xs font-medium text-zinc-100 mt-1">Online Library Services</p>
            <p className="text-[11px] text-zinc-400 mt-1">Streamlined issue/return workflows and digital accessibility.</p>
          </div>
          <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800/90">
            <p className="text-[11px] font-mono text-emerald-400">03. MULTI-DEVICE</p>
            <p className="text-xs font-medium text-zinc-100 mt-1">Responsive Layout</p>
            <p className="text-[11px] text-zinc-400 mt-1">Accessible across desktop, laptop, tablet, and mobile screens.</p>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-zinc-400 pt-2 border-t border-zinc-800/80">
          <span>HTML5 · CSS3 · JavaScript</span>
          <span className="text-zinc-300">Online Library Platform</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full min-h-[260px] bg-zinc-950 text-zinc-100 p-6 flex flex-col justify-between overflow-hidden select-none">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.18) 0%, rgba(139,92,246,0.08) 60%, transparent 100%)',
        }}
      />
      <div className="relative z-10 flex items-center justify-between border-b border-zinc-800/90 pb-3.5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Globe className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-mono font-medium text-zinc-200 tracking-tight">Apple Vision UI · Web App</p>
            <p className="text-[11px] text-zinc-400">Spatial Animations · GSAP · ScrollTrigger · Canvas</p>
          </div>
        </div>
        <span className="text-[11px] font-mono text-emerald-400">Public Repo</span>
      </div>

      {/* Spatial Web UI Preview */}
      <div className="relative z-10 my-4 grid grid-cols-1 sm:grid-cols-3 gap-2.5 font-mono text-xs">
        <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800/90">
          <div className="flex items-center gap-1.5 text-blue-400 mb-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span className="text-[11px]">GSAP ENGINE</span>
          </div>
          <p className="text-zinc-200 font-sans text-xs font-medium">ScrollTrigger</p>
          <p className="text-[11px] text-zinc-400 font-sans mt-0.5">Scroll-driven spatial motion &amp; pinned scenes</p>
        </div>

        <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800/90">
          <div className="flex items-center gap-1.5 text-violet-400 mb-1">
            <Server className="w-3.5 h-3.5" />
            <span className="text-[11px]">CANVAS API</span>
          </div>
          <p className="text-zinc-200 font-sans text-xs font-medium">Interactive Frames</p>
          <p className="text-[11px] text-zinc-400 font-sans mt-0.5">High-resolution 2D Canvas visual rendering</p>
        </div>

        <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800/90">
          <div className="flex items-center gap-1.5 text-emerald-400 mb-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="text-[11px]">RESPONSIVE UI</span>
          </div>
          <p className="text-zinc-200 font-sans text-xs font-medium">High-Fidelity Web</p>
          <p className="text-[11px] text-zinc-400 font-sans mt-0.5">HTML5 · CSS3 · Modular JavaScript</p>
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-zinc-400 pt-2 border-t border-zinc-800/80">
        <span>HTML5 · CSS3 · JS · GSAP · Canvas</span>
        <span className="text-zinc-300">@Adityaraj811</span>
      </div>
    </div>
  );
};
