import React, { useEffect, useRef, useState } from 'react';
import {
  CalendarCheck,
  CheckCircle2,
  ExternalLink,
  Globe,
  Hand,
  Laptop,
  Leaf,
  MessageCircle,
  Phone,
  RotateCcw,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Stethoscope,
} from 'lucide-react';
import { resolvePublicAsset, type ProjectItem } from '../data/portfolioConfig';
import { KhataScreenShowcase } from './KhataScreenShowcase';

interface ProjectVisualProps {
  visualType: ProjectItem['visualType'];
  variant?: 'card' | 'modal';
  onExpandCaseStudy?: () => void;
}

/**
 * Reusable Scaled Live Website Browser Frame
 * Renders the ACTUAL live deployed website (iframe scaled via ResizeObserver from 1280px desktop
 * or 390px mobile) on top of an instant, faithful replica of the website's real Hero UI.
 */
interface LiveWebsiteBrowserFrameProps {
  url: string;
  domainLabel: string;
  badgeText: string;
  accentColor: string;
  chromeBgClass?: string;
  variant?: 'card' | 'modal';
  fallbackHero: React.ReactNode;
}

const LiveWebsiteBrowserFrame: React.FC<LiveWebsiteBrowserFrameProps> = ({
  url,
  domainLabel,
  badgeText,
  accentColor,
  chromeBgClass = 'bg-zinc-900 border-zinc-800',
  variant = 'card',
  fallbackHero,
}) => {
  const isModal = variant === 'modal';
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [viewportSize, setViewportSize] = useState({ width: 480, height: 280 });
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'mobile'>('desktop');
  const [interactiveMode, setInteractiveMode] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const updateSize = () => {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        setViewportSize({ width: rect.width, height: rect.height });
      }
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const targetIframeWidth = deviceMode === 'desktop' ? 1280 : 390;
  const scale =
    deviceMode === 'desktop'
      ? Math.max(0.2, viewportSize.width / 1280)
      : Math.max(0.35, Math.min((viewportSize.width - 32) / 390, (viewportSize.height - 12) / 740));

  const scaledHeight = Math.ceil(viewportSize.height / scale);

  return (
    <div
      className={`relative w-full h-full ${
        isModal ? 'min-h-[280px] sm:min-h-[340px]' : 'min-h-[300px] sm:min-h-[340px]'
      } flex flex-col justify-between overflow-hidden select-none bg-zinc-950`}
    >
      {/* Top Browser Chrome Bar */}
      <div
        className={`relative z-20 px-3 py-2 border-b flex items-center justify-between gap-2 ${chromeBgClass}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Window Traffic Lights + Live URL Pill */}
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
          </div>

          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            title={`Open ${url} in new tab`}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/50 hover:bg-black/75 border border-white/10 text-[11px] font-mono text-zinc-200 truncate transition-colors max-w-[230px] sm:max-w-[260px]"
          >
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0 animate-pulse"
              style={{ backgroundColor: accentColor }}
            />
            <span className="truncate">{domainLabel}</span>
            <ExternalLink className="w-2.5 h-2.5 text-zinc-400 shrink-0" />
          </a>
        </div>

        {/* Browser Controls: Desktop/Mobile, Interact Toggle, Open Live */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setDeviceMode((prev) => (prev === 'desktop' ? 'mobile' : 'desktop'));
            }}
            title={deviceMode === 'desktop' ? 'Switch to Mobile Phone View' : 'Switch to Desktop View'}
            className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white/5 hover:bg-white/15 border border-white/10 text-[10px] font-mono text-zinc-200 transition-colors cursor-pointer"
          >
            {deviceMode === 'desktop' ? (
              <>
                <Smartphone className="w-3 h-3" />
                <span className="hidden sm:inline">Mobile</span>
              </>
            ) : (
              <>
                <Laptop className="w-3 h-3" />
                <span className="hidden sm:inline">Desktop</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setInteractiveMode((prev) => !prev);
            }}
            title={
              interactiveMode
                ? 'Lock preview scroll'
                : 'Click to scroll & interact with the live website right here'
            }
            className={`inline-flex items-center gap-1 px-2 py-1 rounded-md border text-[10px] font-mono transition-colors cursor-pointer ${
              interactiveMode
                ? 'bg-emerald-500 text-black border-emerald-400 font-bold'
                : 'bg-white/5 hover:bg-white/15 border-white/10 text-zinc-200'
            }`}
          >
            <Hand className="w-3 h-3" />
            <span>{interactiveMode ? 'Interactive ON' : 'Try Live UI'}</span>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIframeLoaded(false);
              setReloadKey((k) => k + 1);
            }}
            title="Reload live website preview"
            className="p-1 rounded-md bg-white/5 hover:bg-white/15 border border-white/10 text-zinc-300 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Main Website Viewport Area */}
      <div
        ref={viewportRef}
        className="relative flex-1 w-full overflow-hidden bg-zinc-900 flex items-start justify-center"
      >
        {/* Instant Authentic Website UI Layer (Always visible before iframe finishes loading) */}
        <div
          className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
            iframeLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          {fallbackHero}
        </div>

        {/* Real Scaled Live Website Iframe */}
        {deviceMode === 'desktop' ? (
          <div
            style={{
              width: `${targetIframeWidth}px`,
              height: `${scaledHeight}px`,
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
            }}
            className="absolute top-0 left-0 overflow-hidden"
          >
            <iframe
              key={`${url}-desktop-${reloadKey}`}
              src={url}
              title={`${domainLabel} Live Website Preview`}
              loading="lazy"
              onLoad={() => setIframeLoaded(true)}
              className={`w-full h-full border-0 bg-white transition-opacity duration-500 ${
                iframeLoaded ? 'opacity-100' : 'opacity-0'
              } ${interactiveMode ? 'pointer-events-auto' : 'pointer-events-none'}`}
            />
          </div>
        ) : (
          <div className="relative w-full h-full flex items-center justify-center bg-zinc-950/90 py-2">
            <div
              style={{
                width: `${Math.round(390 * scale)}px`,
                height: `${Math.round(720 * scale)}px`,
              }}
              className="relative rounded-2xl border-2 border-zinc-700 shadow-2xl overflow-hidden bg-white"
            >
              <div
                style={{
                  width: '390px',
                  height: '720px',
                  transform: `scale(${scale})`,
                  transformOrigin: 'top left',
                }}
              >
                <iframe
                  key={`${url}-mobile-${reloadKey}`}
                  src={url}
                  title={`${domainLabel} Mobile Live Preview`}
                  loading="lazy"
                  onLoad={() => setIframeLoaded(true)}
                  className={`w-full h-full border-0 bg-white ${
                    interactiveMode ? 'pointer-events-auto' : 'pointer-events-none'
                  }`}
                />
              </div>
            </div>
          </div>
        )}

        {/* Bottom Floating Bar with Live Status & Direct Open Link */}
        <div
          className="absolute bottom-2.5 left-3 right-3 z-20 flex items-center justify-between gap-2 pointer-events-none"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-950/90 backdrop-blur-md border border-white/15 text-[10px] font-mono text-zinc-200 shadow-lg">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: accentColor }}
            />
            <span>{badgeText}</span>
          </span>

          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="pointer-events-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold shadow-lg transition-transform hover:scale-105"
            style={{
              backgroundColor: accentColor,
              color: '#08131F',
            }}
          >
            <span>Visit Full Website</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};

/**
 * 1. DR. SHANTANU DENTAL CLINIC — Authentic Light Clinical Website UI + Live Site Frame
 * Matches https://dental-clinic.adityaraj81156.workers.dev/ (#F6FAFA background, #18334F navy, #80BCB8 teal)
 */
const DentalClinicAuthenticHero: React.FC = () => {
  return (
    <div className="w-full h-full bg-[#F6FAFA] text-[#18334F] flex flex-col justify-between overflow-hidden font-sans">
      {/* Real Website White Sticky Header */}
      <div className="px-3.5 py-2 bg-white/95 border-b border-slate-200/80 flex items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-6 h-6 rounded-lg bg-[#153656] flex items-center justify-center text-[#80BCB8] font-serif font-bold text-xs shrink-0">
            S
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-bold text-[#153656] leading-none truncate">
              Dr. Shantanu Dental Clinic
            </p>
            <p className="text-[9px] text-[#6D7C89] truncate">
              Personalized Dental Care
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2.5 text-[10px] font-medium text-[#18334F]/80">
          <span>About Doctor</span>
          <span>Treatments</span>
          <span>Gallery</span>
        </div>

        <span className="px-2.5 py-1 rounded-full bg-[#153656] text-white text-[9px] font-semibold shrink-0">
          Book Slot
        </span>
      </div>

      {/* Real Website Split Hero Section */}
      <div className="flex-1 p-3.5 sm:p-4 grid grid-cols-12 gap-3 items-center overflow-hidden">
        <div className="col-span-7 space-y-2">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#80BCB8]/20 text-[#153656] text-[9px] font-bold tracking-wide">
            <Sparkles className="w-2.5 h-2.5 text-[#153656]" />
            EXCEPTIONAL DENTAL CARE
          </span>

          <h4 className="font-serif text-sm sm:text-base font-bold text-[#153656] leading-tight">
            Your Smile Deserves{' '}
            <span className="italic text-[#3A7D79]">Exceptional Care.</span>
          </h4>

          <p className="text-[10px] text-[#5A6B7C] leading-snug line-clamp-2">
            Personalized dental care designed to keep your smile healthy, confident and beautiful by Dr. Shantanu.
          </p>

          <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#153656] text-white text-[9px] font-semibold shadow-xs">
              <CalendarCheck className="w-2.5 h-2.5 text-[#80BCB8]" />
              Book Appointment
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-white border border-slate-200 text-[#153656] text-[9px] font-semibold">
              <Phone className="w-2.5 h-2.5 text-[#3A7D79]" />
              Treatments
            </span>
          </div>
        </div>

        {/* Right Interactive 3D Tooth & Clinic Card */}
        <div className="col-span-5 relative flex flex-col items-center justify-center p-2.5 rounded-2xl bg-gradient-to-b from-[#E5F2F2] to-white border border-[#80BCB8]/40 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-white shadow-md border border-[#80BCB8]/30 flex items-center justify-center mb-1.5">
            <svg viewBox="0 0 64 64" className="w-8 h-8" aria-hidden="true">
              <defs>
                <linearGradient id="toothGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="55%" stopColor="#E6F4F3" />
                  <stop offset="100%" stopColor="#80BCB8" />
                </linearGradient>
              </defs>
              <path
                d="M20 12 C12 12, 8 20, 10 29 C12 37, 15 43, 17 51 C18 55, 22 55, 24 50 C26 44, 29 41, 32 41 C35 41, 38 44, 40 50 C42 55, 46 55, 47 51 C49 43, 52 37, 54 29 C56 20, 52 12, 44 12 C38 12, 35 15, 32 15 C29 15, 26 12, 20 12 Z"
                fill="url(#toothGrad)"
                stroke="#153656"
                strokeWidth="2.2"
              />
            </svg>
          </div>
          <span className="text-[9px] font-bold text-[#153656] text-center">
            3D Dental Care
          </span>
          <span className="text-[8px] text-[#5A6B7C] text-center">
            Root Canal · Implants
          </span>

          {/* Floating WhatsApp Bubble */}
          <div className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#25D366] text-white text-[8px] font-bold shadow-xs">
            <MessageCircle className="w-2.5 h-2.5" />
            <span>WhatsApp Desk</span>
          </div>
        </div>
      </div>

      {/* Bottom Treatment Strip */}
      <div className="px-3.5 py-2 bg-white border-t border-slate-200/80 flex items-center justify-between gap-1.5 text-[9px] text-[#153656] font-medium pb-10">
        <span className="px-2 py-0.5 rounded bg-[#F6FAFA] border border-slate-200/90 truncate">
          ✓ Root Canal
        </span>
        <span className="px-2 py-0.5 rounded bg-[#F6FAFA] border border-slate-200/90 truncate">
          ✓ Dental Implants
        </span>
        <span className="px-2 py-0.5 rounded bg-[#F6FAFA] border border-slate-200/90 truncate">
          ✓ Whitening &amp; Braces
        </span>
      </div>
    </div>
  );
};

/**
 * 2. FITNESS JYM — Authentic Obsidian & High-Voltage Orange Website UI + Live Site Frame
 * Matches https://fitness-jym.adityaraj81156.workers.dev/
 */
const FitnessJymAuthenticHero: React.FC = () => {
  return (
    <div className="w-full h-full bg-[#08090B] text-white flex flex-col justify-between overflow-hidden font-sans relative">
      <div
        className="absolute -top-12 -right-12 w-52 h-52 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,94,0,0.28) 0%, transparent 70%)',
        }}
      />

      {/* Real Fitness JYM Top Navbar */}
      <div className="relative z-10 px-3.5 py-2 bg-[#0C0E12]/95 border-b border-zinc-800/90 flex items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-1.5">
          <span className="font-display text-xs font-black uppercase tracking-wider text-white">
            FITNESS <span className="text-[#FF5E00]">JYM</span>
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-2.5 text-[9px] font-mono uppercase text-zinc-400">
          <span>Programs</span>
          <span>Facilities</span>
          <span>Membership</span>
          <span>BMI</span>
        </div>

        <span className="px-2.5 py-0.5 rounded bg-[#FF5E00] text-black text-[9px] font-extrabold uppercase">
          Join Now
        </span>
      </div>

      {/* Real Fitness JYM Hero Content */}
      <div className="relative z-10 flex-1 p-3.5 sm:p-4 grid grid-cols-12 gap-3 items-center">
        <div className="col-span-7 space-y-2">
          <span className="inline-block px-2 py-0.5 rounded bg-[#FF5E00]/15 border border-[#FF5E00]/40 text-[#FF5E00] font-mono text-[8px] font-bold uppercase tracking-widest">
            THE IRON SANCTUARY · 24/7 ACCESS
          </span>

          <h4 className="font-display text-sm sm:text-base font-black uppercase tracking-tight text-white leading-none">
            BUILD STRENGTH.{' '}
            <span className="text-[#FF5E00] block mt-0.5">UNLEASH POTENTIAL.</span>
          </h4>

          <p className="text-[10px] text-zinc-400 leading-snug line-clamp-2">
            Barbell hypertrophy, Olympic lifting, metabolic HIIT, and bespoke coaching.
          </p>

          <div className="flex items-center gap-1.5 pt-0.5">
            <span className="px-2.5 py-1 rounded bg-[#FF5E00] text-black text-[9px] font-extrabold uppercase">
              Start Training
            </span>
            <span className="px-2 py-1 rounded bg-zinc-900 border border-zinc-700 text-zinc-200 text-[9px] font-mono">
              BMI Calculator
            </span>
          </div>
        </div>

        {/* Right Membership & BMI Preview Card */}
        <div className="col-span-5 p-2.5 rounded-xl bg-zinc-900/95 border border-[#FF5E00]/40 space-y-1.5">
          <div className="flex items-center justify-between text-[8px] font-mono text-[#FF5E00]">
            <span>QUARTERLY ELITE</span>
            <span>POPULAR</span>
          </div>
          <p className="text-xs font-black text-white">
            ₹7,499 <span className="text-[9px] font-normal text-zinc-400">/ 3 mo</span>
          </p>
          <div className="space-y-0.5 text-[8px] text-zinc-300">
            <p className="truncate">✓ 24/7 Gym &amp; Weight Floor</p>
            <p className="truncate">✓ HIIT, Sauna &amp; Cold Plunge</p>
          </div>
        </div>
      </div>

      {/* Bottom Strip */}
      <div className="relative z-10 px-3.5 py-2 bg-black/90 border-t border-zinc-800/90 flex items-center justify-between text-[9px] font-mono text-zinc-400 pb-10">
        <span>Strength · Olympic · HIIT</span>
        <span className="text-[#FF5E00]">₹2,999/mo Pass</span>
      </div>
    </div>
  );
};

/**
 * 3. VELOURA CAFÉ — Authentic Screenshot + Live Website Browser Frame
 * Matches https://valoura-one.vercel.app/
 */
const VelouraAuthenticHero: React.FC = () => {
  const [imgSrc, setImgSrc] = useState(() =>
    resolvePublicAsset('images/veloura-website-preview.png')
  );

  return (
    <div className="relative w-full h-full bg-[#110E0C] overflow-hidden">
      <img
        src={imgSrc}
        onError={() => setImgSrc(resolvePublicAsset('images/veloura-hero.jpg'))}
        alt="Veloura Specialty Coffee Live Website Preview"
        className="w-full h-full object-cover object-top"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#110E0C]/90 via-transparent to-transparent" />
    </div>
  );
};

/**
 * 4. APPLE VISION UI — Realistic Spatial Website Browser Preview
 * Shows the actual Apple Vision Pro web interface (Navbar + 3D Headset Viewport + visionOS Glass UI)
 */
const AppleVisionWebsitePreview: React.FC<{
  variant?: 'card' | 'modal';
}> = ({ variant = 'card' }) => {
  const [activeScene, setActiveScene] = useState<'front' | 'exploded' | 'chip'>('front');
  const isModal = variant === 'modal';

  return (
    <div
      className={`relative w-full h-full ${
        isModal ? 'min-h-[260px]' : 'min-h-[300px] sm:min-h-[340px]'
      } bg-[#05060A] text-zinc-100 flex flex-col justify-between overflow-hidden select-none`}
    >
      {/* Top Browser Window Chrome */}
      <div className="relative z-10 px-3 py-2 bg-[#0B0D14] border-b border-zinc-800/90 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
          </div>
          <span className="px-2.5 py-0.5 rounded bg-black/60 border border-white/10 text-[10px] font-mono text-zinc-300 truncate">
            apple-vision-ui · Spatial Web App
          </span>
        </div>

        <div
          className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 rounded-md p-0.5"
          onClick={(e) => e.stopPropagation()}
        >
          {(
            [
              { id: 'front', label: '3D Visor' },
              { id: 'exploded', label: 'Optical Stack' },
              { id: 'chip', label: 'M2 + R1' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActiveScene(tab.id);
              }}
              className={`px-2 py-0.5 rounded text-[9px] font-mono transition-colors cursor-pointer ${
                activeScene === tab.id
                  ? 'bg-[#ff823d] text-black font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Simulated Apple Vision Pro Website Navbar */}
      <div className="relative z-10 px-4 py-2 bg-black/70 backdrop-blur-md border-b border-white/10 flex items-center justify-between text-[11px]">
        <span className="font-semibold tracking-tight text-white"> Vision Pro</span>
        <div className="hidden sm:flex items-center gap-3 text-[10px] text-zinc-400">
          <span className="text-white">Overview</span>
          <span>Guided Tour</span>
          <span>Tech Specs</span>
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-white text-black text-[9px] font-semibold">
          Book Demo
        </span>
      </div>

      {/* Main Website Hero Viewport */}
      <div className="relative flex-1 p-4 flex flex-col items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 50% 45%, rgba(255,130,61,0.22) 0%, rgba(59,130,246,0.12) 45%, transparent 75%)',
          }}
        />

        {/* Floating visionOS Glass Bar */}
        <div className="relative z-10 mb-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center gap-3 text-[9px] text-zinc-200">
          <span className="text-[#ff823d] font-mono font-semibold">visionOS</span>
          <span>Photos</span>
          <span>Mindfulness</span>
          <span>Safari</span>
          <span>Environments</span>
        </div>

        {/* 3D Headset Graphic */}
        <svg
          viewBox="0 0 280 90"
          className="relative z-10 w-52 sm:w-60 h-20 transition-transform duration-500 group-hover:scale-105"
          aria-label="Apple Vision Pro 3D Headset UI"
        >
          <defs>
            <radialGradient id="visorGlass" cx="50%" cy="50%" r="55%">
              <stop offset="0%" stopColor="#ff823d" stopOpacity="0.65" />
              <stop offset="60%" stopColor="#3b82f6" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#09090b" stopOpacity="0.9" />
            </radialGradient>
          </defs>
          <path
            d="M18 45 C18 25, 46 20, 66 24 L214 24 C234 20, 262 25, 262 45 C262 65, 234 70, 214 66 L66 66 C46 70,18 65, 18 45 Z"
            fill="none"
            stroke="rgba(228,228,231,0.35)"
            strokeWidth="2"
          />
          <rect
            x="48"
            y="14"
            width="184"
            height="62"
            rx="31"
            fill="url(#visorGlass)"
            stroke="#ff823d"
            strokeWidth="1.8"
          />
          <ellipse
            cx="102"
            cy="45"
            rx="28"
            ry="18"
            fill="rgba(9,9,11,0.75)"
            stroke="rgba(255,255,255,0.45)"
            strokeWidth="1.2"
          />
          <ellipse
            cx="178"
            cy="45"
            rx="28"
            ry="18"
            fill="rgba(9,9,11,0.75)"
            stroke="rgba(255,255,255,0.45)"
            strokeWidth="1.2"
          />
          <path
            d="M128 65 Q140 52 152 65"
            fill="none"
            stroke="#ff823d"
            strokeWidth="1.6"
          />
        </svg>

        <div className="relative z-10 text-center mt-1">
          <p className="text-xs sm:text-sm font-bold text-white tracking-tight">
            {activeScene === 'front' && 'Welcome to the era of spatial computing.'}
            {activeScene === 'exploded' && '5-Layer Micro-OLED & Custom Catadioptric Lens.'}
            {activeScene === 'chip' && 'Dual-Chip Architecture: M2 + R1 Real-Time Sensor Engine.'}
          </p>
          <p className="text-[10px] font-mono text-zinc-400 mt-0.5">
            GSAP ScrollTrigger · 360° HTML5 Canvas Frame Scrubber · Three.js
          </p>
        </div>
      </div>

      {/* Bottom Interactive Scrubber Bar */}
      <div className="relative z-10 px-4 py-2 bg-[#0B0D14] border-t border-zinc-800/90 flex items-center justify-between text-[10px] font-mono text-zinc-400">
        <span>360° Canvas Scrub · Frame 072 / 180</span>
        <span className="text-[#ff823d] font-semibold">Interactive Web UI →</span>
      </div>
    </div>
  );
};

/**
 * 5. KRISHIMITRA — Realistic Web Application UI Preview
 * Shows the actual Multilingual Crop Recommendation & Economics Dashboard UI
 */
const KRISHI_PRESETS = [
  {
    id: 'alluvial',
    soil: 'Alluvial Soil',
    npk: 'N: 90 · P: 42 · K: 43 · pH 6.5',
    crop: 'Basmati Rice & Wheat',
    accuracy: '99.2% Match',
    profit: '₹68,400 / Acre',
  },
  {
    id: 'black',
    soil: 'Black Cotton Soil',
    npk: 'N: 115 · P: 58 · K: 50 · pH 7.2',
    crop: 'Cotton & Soybean',
    accuracy: '98.7% Match',
    profit: '₹74,200 / Acre',
  },
  {
    id: 'loamy',
    soil: 'Loamy Soil',
    npk: 'N: 65 · P: 55 · K: 48 · pH 6.8',
    crop: 'Mustard & Chickpea',
    accuracy: '98.9% Match',
    profit: '₹59,800 / Acre',
  },
] as const;

const KrishiMitraWebAppPreview: React.FC<{
  variant?: 'card' | 'modal';
}> = ({ variant = 'card' }) => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const current = KRISHI_PRESETS[selectedIdx];
  const isModal = variant === 'modal';

  return (
    <div
      className={`relative w-full h-full ${
        isModal ? 'min-h-[260px]' : 'min-h-[300px] sm:min-h-[340px]'
      } bg-[#F4FBF7] text-[#0F291E] flex flex-col justify-between overflow-hidden select-none font-sans`}
    >
      {/* Top Browser Chrome */}
      <div className="px-3 py-2 bg-[#0B2218] text-white flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
          <span className="ml-1.5 text-[10px] font-mono text-emerald-300 truncate">
            krishimitra-ai · Multilingual PWA
          </span>
        </div>
        <span className="px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-400/40 text-[9px] font-mono text-emerald-300">
          EN / हिन्दी
        </span>
      </div>

      {/* Actual KrishiMitra App Header */}
      <div className="px-4 py-2 bg-white border-b border-emerald-900/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
            <Leaf className="w-3.5 h-3.5" />
          </div>
          <div>
            <p className="text-xs font-bold text-[#0F291E] leading-none">KrishiMitra AI</p>
            <p className="text-[9px] text-emerald-700">Crop &amp; Soil Decision Platform</p>
          </div>
        </div>

        {/* Soil Switcher */}
        <div
          className="flex items-center gap-1 bg-emerald-50 border border-emerald-200 rounded-lg p-0.5"
          onClick={(e) => e.stopPropagation()}
        >
          {KRISHI_PRESETS.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIdx(idx);
              }}
              className={`px-2 py-0.5 rounded text-[9px] font-semibold transition-colors cursor-pointer ${
                idx === selectedIdx
                  ? 'bg-emerald-600 text-white'
                  : 'text-emerald-800 hover:bg-emerald-100'
              }`}
            >
              {item.soil.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* App Dashboard Body */}
      <div className="flex-1 p-3.5 grid grid-cols-12 gap-2.5 items-stretch">
        {/* Left Soil Input Panel */}
        <div className="col-span-5 p-2.5 rounded-xl bg-white border border-emerald-900/10 flex flex-col justify-between shadow-2xs">
          <div>
            <span className="text-[9px] font-mono uppercase text-emerald-700 font-bold">
              Soil Parameters
            </span>
            <p className="text-xs font-bold text-[#0F291E] mt-0.5">{current.soil}</p>
            <p className="text-[10px] font-mono text-slate-600 mt-1">{current.npk}</p>
          </div>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[9px] font-semibold text-emerald-700">
            <span>Extra Trees ML</span>
            <span>✓ Ready</span>
          </div>
        </div>

        {/* Right Recommended Crop & Profit Output Card */}
        <div className="col-span-7 p-3 rounded-xl bg-gradient-to-br from-emerald-700 to-[#0B2218] text-white flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between gap-1">
            <span className="text-[9px] font-mono uppercase tracking-wider text-emerald-300 font-semibold">
              Recommended Crop
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-400/20 border border-emerald-300/40 text-[9px] font-mono text-emerald-200">
              {current.accuracy}
            </span>
          </div>

          <div className="my-1">
            <p className="text-sm sm:text-base font-bold text-white leading-tight">
              {current.crop}
            </p>
            <p className="text-[10px] text-emerald-200 mt-0.5">
              Est. Net Return: <strong className="text-white">{current.profit}</strong>
            </p>
          </div>

          <div className="flex items-center justify-between text-[9px] text-emerald-200/90 pt-1.5 border-t border-white/10">
            <span className="inline-flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              Offline PWA Ready
            </span>
            <span>Economics Report →</span>
          </div>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="px-4 py-1.5 bg-white border-t border-emerald-900/10 flex items-center justify-between text-[10px] font-mono text-emerald-800">
        <span>22 ML Models Evaluated · Extra Trees</span>
        <span className="font-semibold">Inspect Case Study →</span>
      </div>
    </div>
  );
};

export const ProjectVisual: React.FC<ProjectVisualProps> = ({
  visualType,
  variant = 'card',
}) => {
  if (visualType === 'veloura-cafe-web') {
    return (
      <LiveWebsiteBrowserFrame
        url="https://valoura-one.vercel.app/"
        domainLabel="valoura-one.vercel.app"
        badgeText="Live Café Website · Vercel"
        accentColor="#D4A373"
        chromeBgClass="bg-[#191411] border-[#B47B44]/35"
        variant={variant}
        fallbackHero={<VelouraAuthenticHero />}
      />
    );
  }

  if (visualType === 'fitness-jym-web') {
    return (
      <LiveWebsiteBrowserFrame
        url="https://fitness-jym.adityaraj81156.workers.dev/"
        domainLabel="fitness-jym.adityaraj81156.workers.dev"
        badgeText="Live Gym Website · Cloudflare"
        accentColor="#FF5E00"
        chromeBgClass="bg-[#0C0E12] border-[#FF5E00]/35"
        variant={variant}
        fallbackHero={<FitnessJymAuthenticHero />}
      />
    );
  }

  if (visualType === 'dental-clinic-web') {
    return (
      <LiveWebsiteBrowserFrame
        url="https://dental-clinic.adityaraj81156.workers.dev/"
        domainLabel="dental-clinic.adityaraj81156.workers.dev"
        badgeText="Live Dental Clinic · Cloudflare"
        accentColor="#80BCB8"
        chromeBgClass="bg-[#153656] border-[#80BCB8]/40"
        variant={variant}
        fallbackHero={<DentalClinicAuthenticHero />}
      />
    );
  }

  if (visualType === 'khata-android') {
    return <KhataScreenShowcase variant={variant} />;
  }

  if (visualType === 'krishi-mitra-web') {
    return <KrishiMitraWebAppPreview variant={variant} />;
  }

  return <AppleVisionWebsitePreview variant={variant} />;
};
