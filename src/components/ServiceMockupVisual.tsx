import React, { useState } from 'react';
import {
  Rocket,
  UserCheck,
  Sparkles,
  Briefcase,
  Layers,
  RefreshCw,
  Smartphone,
  Coffee,
  ExternalLink,
} from 'lucide-react';
import { resolvePublicAsset, type FreelanceServiceItem } from '../data/portfolioConfig';

interface ServiceMockupVisualProps {
  mockupType: FreelanceServiceItem['mockupType'];
}

export const ServiceMockupVisual: React.FC<ServiceMockupVisualProps> = ({ mockupType }) => {
  const [previewImgSrc, setPreviewImgSrc] = useState<string>(() =>
    resolvePublicAsset('images/veloura-website-preview.png')
  );

  switch (mockupType) {
    case 'business':
      return (
        <div
          data-testid="business-veloura-preview"
          className="group/veloura relative h-48 sm:h-52 rounded-xl bg-[#110E0C] border border-[#B47B44]/40 flex flex-col justify-between overflow-hidden select-none shadow-md"
        >
          {/* Browser Frame Top Chrome */}
          <div className="relative z-10 px-3 py-2 bg-[#191411]/95 border-b border-[#B47B44]/30 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="w-2 h-2 rounded-full bg-[#C97A63]/85 shrink-0" />
              <span className="w-2 h-2 rounded-full bg-[#D4A373]/85 shrink-0" />
              <span className="w-2 h-2 rounded-full bg-[#7A9A82]/85 shrink-0" />
              <span className="ml-1.5 font-mono text-[10px] text-[#D4A373] truncate">
                valoura-one.vercel.app
              </span>
            </div>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#B47B44]/20 border border-[#B47B44]/45 font-mono text-[9px] text-[#F5EFE6] shrink-0">
              <Coffee className="w-2.5 h-2.5 text-[#D4A373]" />
              <span>Personal Showcase</span>
            </span>
          </div>

          {/* Authentic Veloura Website Screenshot with Subtle Hover Zoom */}
          <div className="relative flex-1 overflow-hidden bg-[#191411]">
            <img
              src={previewImgSrc}
              onError={() => setPreviewImgSrc(resolvePublicAsset('images/veloura-hero.jpg'))}
              alt="Featured Demo — Veloura Café Website"
              className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover/veloura:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#110E0C] via-[#110E0C]/45 to-transparent" />

            {/* Bottom Caption Overlay */}
            <div className="absolute bottom-2.5 left-3 right-3 flex items-end justify-between gap-2">
              <div className="min-w-0">
                <p className="font-mono text-[9px] uppercase tracking-wider text-[#D4A373] font-semibold">
                  Featured Demo — Veloura Café Website
                </p>
                <p className="font-display text-xs sm:text-sm font-semibold text-[#F5EFE6] truncate">
                  Veloura — Specialty Coffee &amp; Creative Sanctuary
                </p>
                <p className="font-mono text-[9px] text-[#C8B9A6] truncate">
                  React · TypeScript · Vite · Motion
                </p>
              </div>

              <a
                href="https://valoura-one.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                aria-label="Open Veloura Café Website Live Demo"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#B47B44] hover:bg-[#C68B53] text-[#110E0C] font-mono text-[10px] font-semibold shadow-sm transition-colors shrink-0"
              >
                <span>Live Preview</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
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
