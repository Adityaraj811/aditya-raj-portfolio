import React from 'react';
import {
  Building2,
  Rocket,
  UserCheck,
  Sparkles,
  Briefcase,
  Layers,
  RefreshCw,
  Smartphone,
} from 'lucide-react';
import type { FreelanceServiceItem } from '../data/portfolioConfig';

interface ServiceMockupVisualProps {
  mockupType: FreelanceServiceItem['mockupType'];
}

export const ServiceMockupVisual: React.FC<ServiceMockupVisualProps> = ({ mockupType }) => {
  switch (mockupType) {
    case 'business':
      return (
        <div className="relative h-36 rounded-xl bg-zinc-950 border border-zinc-800/90 p-3.5 flex flex-col justify-between overflow-hidden select-none">
          <div
            className="absolute -top-10 -right-10 w-36 h-36 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(59,130,246,0.22) 0%, transparent 70%)',
            }}
          />
          <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2">
            <div className="flex items-center gap-2">
              <Building2 className="w-3.5 h-3.5 text-blue-400" />
              <span className="font-mono text-[10px] text-zinc-300">BUSINESS WEB PRESENCE</span>
            </div>
            <span className="font-mono text-[10px] text-blue-400">SEO + Mobile</span>
          </div>
          <div className="grid grid-cols-3 gap-2 my-auto pt-1">
            <div className="col-span-2 p-2 rounded-lg bg-zinc-900/90 border border-zinc-800/80">
              <div className="h-2 w-20 rounded bg-blue-500/40 mb-1.5" />
              <div className="h-1.5 w-28 rounded bg-zinc-700 mb-1" />
              <div className="h-1.5 w-16 rounded bg-zinc-800" />
            </div>
            <div className="p-2 rounded-lg bg-blue-600/15 border border-blue-500/30 flex flex-col justify-center items-center text-center">
              <span className="font-mono text-[10px] text-blue-300 font-semibold">Services</span>
              <span className="font-mono text-[9px] text-zinc-400 mt-0.5">&amp; Contact</span>
            </div>
          </div>
        </div>
      );

    case 'landing':
      return (
        <div className="relative h-36 rounded-xl bg-zinc-950 border border-zinc-800/90 p-3.5 flex flex-col justify-between overflow-hidden select-none">
          <div
            className="absolute -bottom-10 -right-10 w-36 h-36 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(99,102,241,0.24) 0%, transparent 70%)',
            }}
          />
          <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span className="font-mono text-[10px] text-zinc-300">HIGH-IMPACT LANDING PAGE</span>
            </div>
            <span className="font-mono text-[10px] text-indigo-400">Fast CTA</span>
          </div>
          <div className="my-auto pt-1 flex flex-col items-center text-center p-2 rounded-lg bg-zinc-900/90 border border-zinc-800/80">
            <p className="font-display text-xs font-semibold text-zinc-100">
              Hero Headline &amp; Value Proposition
            </p>
            <div className="mt-2 flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-blue-600 text-[10px] font-medium text-white">
                Get Started
              </span>
              <span className="px-2.5 py-0.5 rounded border border-zinc-700 text-[10px] text-zinc-300">
                Learn More
              </span>
            </div>
          </div>
        </div>
      );

    case 'portfolio':
      return (
        <div className="relative h-36 rounded-xl bg-zinc-950 border border-zinc-800/90 p-3.5 flex flex-col justify-between overflow-hidden select-none">
          <div
            className="absolute -top-10 -left-10 w-36 h-36 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(59,130,246,0.22) 0%, transparent 70%)',
            }}
          />
          <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2">
            <div className="flex items-center gap-2">
              <UserCheck className="w-3.5 h-3.5 text-sky-400" />
              <span className="font-mono text-[10px] text-zinc-300">PERSONAL PORTFOLIO UI</span>
            </div>
            <span className="font-mono text-[10px] text-sky-400">Projects + CV</span>
          </div>
          <div className="grid grid-cols-3 gap-2 my-auto pt-1">
            <div className="p-2 rounded-lg bg-zinc-900/90 border border-zinc-800/80 flex flex-col items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 mb-1" />
              <div className="h-1.5 w-10 rounded bg-zinc-600" />
            </div>
            <div className="col-span-2 p-2 rounded-lg bg-zinc-900/90 border border-zinc-800/80 flex flex-col justify-between">
              <span className="font-mono text-[10px] text-sky-400">Case Studies &amp; Skills</span>
              <div className="h-1.5 w-full rounded bg-zinc-800" />
              <div className="h-1.5 w-2/3 rounded bg-zinc-800" />
            </div>
          </div>
        </div>
      );

    case 'startup':
      return (
        <div className="relative h-36 rounded-xl bg-zinc-950 border border-zinc-800/90 p-3.5 flex flex-col justify-between overflow-hidden select-none">
          <div
            className="absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(16,185,129,0.18) 0%, transparent 70%)',
            }}
          />
          <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2">
            <div className="flex items-center gap-2">
              <Rocket className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-mono text-[10px] text-zinc-300">MODERN STARTUP PLATFORM</span>
            </div>
            <span className="font-mono text-[10px] text-emerald-400">React + Vite</span>
          </div>
          <div className="grid grid-cols-2 gap-2 my-auto pt-1">
            <div className="p-2 rounded-lg bg-zinc-900/90 border border-zinc-800/80">
              <span className="font-mono text-[10px] text-emerald-400">Product Showcase</span>
              <p className="text-[10px] text-zinc-400 mt-0.5">Interactive feature blocks</p>
            </div>
            <div className="p-2 rounded-lg bg-zinc-900/90 border border-zinc-800/80">
              <span className="font-mono text-[10px] text-blue-400">Scalable UI</span>
              <p className="text-[10px] text-zinc-400 mt-0.5">Clean component design</p>
            </div>
          </div>
        </div>
      );

    case 'professional':
      return (
        <div className="relative h-36 rounded-xl bg-zinc-950 border border-zinc-800/90 p-3.5 flex flex-col justify-between overflow-hidden select-none">
          <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2">
            <div className="flex items-center gap-2">
              <Briefcase className="w-3.5 h-3.5 text-blue-400" />
              <span className="font-mono text-[10px] text-zinc-300">CUSTOM PROFESSIONAL WEB</span>
            </div>
            <span className="font-mono text-[10px] text-blue-400">Tailored UX</span>
          </div>
          <div className="my-auto pt-1 p-2.5 rounded-lg bg-zinc-900/90 border border-zinc-800/80 flex items-center justify-between gap-2">
            <div>
              <p className="text-xs font-medium text-zinc-100">Bespoke Architecture</p>
              <p className="text-[10px] text-zinc-400 mt-0.5">
                Designed around your workflow &amp; audience
              </p>
            </div>
            <span className="font-mono text-[10px] text-blue-400 shrink-0">100% Custom</span>
          </div>
        </div>
      );

    case 'webapp':
      return (
        <div className="relative h-36 rounded-xl bg-zinc-950 border border-zinc-800/90 p-3.5 flex flex-col justify-between overflow-hidden select-none">
          <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2">
            <div className="flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-indigo-400" />
              <span className="font-mono text-[10px] text-zinc-300">FULL-STACK WEB APP</span>
            </div>
            <span className="font-mono text-[10px] text-indigo-400">UI + REST API</span>
          </div>
          <div className="grid grid-cols-2 gap-2 my-auto pt-1 font-mono text-[10px]">
            <div className="p-2 rounded-lg bg-zinc-900/90 border border-zinc-800/80 text-zinc-300">
              <span className="text-blue-400 block">Frontend View</span>
              Interactive State
            </div>
            <div className="p-2 rounded-lg bg-zinc-900/90 border border-zinc-800/80 text-zinc-300">
              <span className="text-emerald-400 block">Java Backend</span>
              Spring Boot + SQL
            </div>
          </div>
        </div>
      );

    case 'redesign':
      return (
        <div className="relative h-36 rounded-xl bg-zinc-950 border border-zinc-800/90 p-3.5 flex flex-col justify-between overflow-hidden select-none">
          <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2">
            <div className="flex items-center gap-2">
              <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-mono text-[10px] text-zinc-300">MODERN UI/UX REDESIGN</span>
            </div>
            <span className="font-mono text-[10px] text-emerald-400">Before → After</span>
          </div>
          <div className="grid grid-cols-2 gap-2 my-auto pt-1">
            <div className="p-2 rounded-lg bg-zinc-900/50 border border-zinc-800/60 opacity-60">
              <span className="font-mono text-[10px] text-zinc-500">Legacy Layout</span>
              <div className="h-1.5 w-14 rounded bg-zinc-700 mt-1" />
            </div>
            <div className="p-2 rounded-lg bg-blue-950/40 border border-blue-500/40">
              <span className="font-mono text-[10px] text-blue-300">Modern Responsive</span>
              <div className="h-1.5 w-16 rounded bg-blue-400 mt-1" />
            </div>
          </div>
        </div>
      );

    case 'android':
    default:
      return (
        <div className="relative h-36 rounded-xl bg-zinc-950 border border-zinc-800/90 p-3.5 flex flex-col justify-between overflow-hidden select-none">
          <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2">
            <div className="flex items-center gap-2">
              <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-mono text-[10px] text-zinc-300">ANDROID APPLICATION</span>
            </div>
            <span className="font-mono text-[10px] text-emerald-400">Java · MVVM</span>
          </div>
          <div className="my-auto pt-1 p-2.5 rounded-lg bg-zinc-900/90 border border-zinc-800/80 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-zinc-100">Native Mobile UI &amp; Sync</p>
              <p className="text-[10px] font-mono text-zinc-400 mt-0.5">
                XML · LiveData · Room · Retrofit
              </p>
            </div>
            <Smartphone className="w-5 h-5 text-blue-400 shrink-0" />
          </div>
        </div>
      );
  }
};
