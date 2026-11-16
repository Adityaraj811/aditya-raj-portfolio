import React, { useEffect, useRef, useState } from 'react';
import {
  Coffee,
  Dumbbell,
  Stethoscope,
  ExternalLink,
  Smartphone,
  Palette,
  Users,
  Megaphone,
  MessageSquareCode,
  Clapperboard,
  Code2,
  Figma,
  Server,
  CheckCircle2,
} from 'lucide-react';
import { resolvePublicAsset, type FreelanceServiceItem } from '../data/portfolioConfig';

interface ServiceMockupVisualProps {
  mockupType: FreelanceServiceItem['mockupType'];
}

/**
 * Compact Scaled Live Website Window for Freelance Service Cards
 */
const CompactLiveSiteWindow: React.FC<{
  url: string;
  domain: string;
  badgeText: string;
  accentColor: string;
  headerBgClass: string;
  fallbackContent: React.ReactNode;
}> = ({ url, domain, badgeText, accentColor, headerBgClass, fallbackContent }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(320);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0) setWidth(rect.width);
    };
    update();
    const obs = new ResizeObserver(update);
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const scale = Math.max(0.18, width / 1280);
  const iframeHeight = Math.ceil(190 / scale);

  return (
    <div className="relative h-48 sm:h-52 rounded-xl border border-zinc-800 flex flex-col justify-between overflow-hidden select-none bg-[#0A0A0A]">
      {/* Top Browser Chrome */}
      <div
        className={`relative z-20 px-3 py-1.5 border-b flex items-center justify-between gap-2 ${headerBgClass}`}
      >
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="w-2 h-2 rounded-full bg-[#FF5F56] shrink-0" />
          <span className="w-2 h-2 rounded-full bg-[#FFBD2E] shrink-0" />
          <span className="w-2 h-2 rounded-full bg-[#27C93F] shrink-0" />
          <span className="ml-1 font-mono text-[10px] text-zinc-200 truncate">{domain}</span>
        </div>
        <span
          className="px-2 py-0.5 rounded text-[9px] font-mono font-semibold shrink-0"
          style={{
            backgroundColor: `${accentColor}22`,
            color: accentColor,
            border: `1px solid ${accentColor}50`,
          }}
        >
          {badgeText}
        </span>
      </div>

      {/* Scaled Live Website Viewport */}
      <div ref={containerRef} className="relative flex-1 w-full overflow-hidden bg-white">
        {/* Instant Authentic Website Fallback UI */}
        <div
          className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
            loaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          {fallbackContent}
        </div>

        <div
          style={{
            width: '1280px',
            height: `${iframeHeight}px`,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
          }}
          className="absolute top-0 left-0 pointer-events-none overflow-hidden"
        >
          <iframe
            src={url}
            title={`${domain} Live Preview`}
            loading="lazy"
            onLoad={() => setLoaded(true)}
            className={`w-full h-full border-0 bg-white transition-opacity duration-500 ${
              loaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>

        {/* Bottom Open Live Link Overlay */}
        <div className="absolute bottom-2 right-2.5 z-20">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg font-mono text-[10px] font-bold shadow-md transition-transform hover:scale-105"
            style={{
              backgroundColor: accentColor,
              color: '#08131F',
            }}
          >
            <span>Live Website</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </a>
        </div>
      </div>
    </div>
  );
};

export const ServiceMockupVisual: React.FC<ServiceMockupVisualProps> = ({ mockupType }) => {
  const [previewImgSrc, setPreviewImgSrc] = useState<string>(() =>
    resolvePublicAsset('images/veloura-website-preview.png')
  );

  switch (mockupType) {
    case 'business':
      return (
        <CompactLiveSiteWindow
          url="https://valoura-one.vercel.app/"
          domain="valoura-one.vercel.app"
          badgeText="Live Café Site"
          accentColor="#D4A373"
          headerBgClass="bg-[#191411] border-[#B47B44]/35"
          fallbackContent={
            <div className="relative w-full h-full bg-[#191411]">
              <img
                src={previewImgSrc}
                onError={() => setPreviewImgSrc(resolvePublicAsset('images/veloura-hero.jpg'))}
                alt="Veloura Café Live Website"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#110E0C]/80 via-transparent to-transparent" />
              <div className="absolute bottom-2 left-2.5 flex items-center gap-1.5 text-[#F5EFE6]">
                <Coffee className="w-3.5 h-3.5 text-[#D4A373]" />
                <span className="text-[11px] font-semibold">Veloura Specialty Coffee</span>
              </div>
            </div>
          }
        />
      );

    case 'landing':
      return (
        <CompactLiveSiteWindow
          url="https://fitness-jym.adityaraj81156.workers.dev/"
          domain="fitness-jym.adityaraj81156.workers.dev"
          badgeText="Cloudflare Live"
          accentColor="#FF5E00"
          headerBgClass="bg-[#0C0E12] border-[#FF5E00]/35"
          fallbackContent={
            <div className="w-full h-full bg-[#08090B] text-white flex flex-col justify-between p-3">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-1.5">
                <span className="text-[11px] font-black uppercase tracking-wider">
                  FITNESS <span className="text-[#FF5E00]">JYM</span>
                </span>
                <span className="px-2 py-0.5 rounded bg-[#FF5E00] text-black text-[8px] font-extrabold uppercase">
                  Join Now
                </span>
              </div>
              <div className="my-auto space-y-1">
                <span className="text-[8px] font-mono text-[#FF5E00] uppercase font-bold">
                  IRON SANCTUARY · 24/7 GYM
                </span>
                <p className="text-xs font-black uppercase leading-tight">
                  BUILD STRENGTH. <span className="text-[#FF5E00]">UNLEASH POTENTIAL.</span>
                </p>
                <p className="text-[9px] text-zinc-400">
                  Programs · Membership Plans · BMI Calculator
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-[9px] text-zinc-400">
                <Dumbbell className="w-3 h-3 text-[#FF5E00]" />
                <span>Live Gym &amp; Fitness Website</span>
              </div>
            </div>
          }
        />
      );

    case 'webapp':
      return (
        <CompactLiveSiteWindow
          url="https://dental-clinic.adityaraj81156.workers.dev/"
          domain="dental-clinic.adityaraj81156.workers.dev"
          badgeText="Cloudflare Live"
          accentColor="#80BCB8"
          headerBgClass="bg-[#153656] border-[#80BCB8]/40"
          fallbackContent={
            <div className="w-full h-full bg-[#F6FAFA] text-[#18334F] flex flex-col justify-between p-3">
              <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                <div className="flex items-center gap-1.5">
                  <Stethoscope className="w-3.5 h-3.5 text-[#153656]" />
                  <span className="text-[10px] font-bold text-[#153656]">
                    Dr. Shantanu Dental Clinic
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded bg-[#153656] text-white text-[8px] font-semibold">
                  Book Slot
                </span>
              </div>
              <div className="my-auto space-y-1">
                <span className="inline-block px-1.5 py-0.5 rounded bg-[#80BCB8]/25 text-[#153656] text-[8px] font-bold">
                  PERSONALIZED DENTAL CARE
                </span>
                <p className="font-editorial italic text-xs font-bold text-[#153656] leading-tight">
                  Your Smile Deserves <span className="text-[#3A7D79]">Exceptional Care.</span>
                </p>
                <p className="text-[9px] text-[#5A6B7C]">
                  Root Canal · Dental Implants · 3D Visual · WhatsApp Booking
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-[9px] text-[#153656] font-medium">
                <span>✓ Mon–Sat 10 AM – 8 PM</span>
              </div>
            </div>
          }
        />
      );

    case 'design':
      return (
        <div className="relative h-48 sm:h-52 rounded-xl bg-[#0B0B0B] border border-zinc-800 flex flex-col justify-between overflow-hidden select-none">
          <div className="px-3 py-1.5 bg-[#121212] border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-[#E10600]" />
              <span className="font-mono text-[10px] text-[#F2F0EB]">Brand Identity Kit</span>
            </div>
            <span className="font-mono text-[9px] text-[#A8A8A8]">Logo · Print · Social</span>
          </div>

          <div className="flex-1 p-3.5 grid grid-cols-12 gap-2.5 items-center">
            <div className="col-span-5 h-full rounded-lg bg-gradient-to-br from-[#191919] to-[#0D0D0D] border border-zinc-800 flex flex-col items-center justify-center p-2">
              <div className="w-10 h-10 rounded-lg bg-[#E10600] text-white font-display text-lg flex items-center justify-center tracking-tight">
                S.
              </div>
              <span className="mt-1.5 font-mono text-[9px] text-[#F2F0EB]">Logo Mark</span>
            </div>

            <div className="col-span-7 space-y-2">
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded bg-[#050505] border border-zinc-700" />
                <span className="w-4 h-4 rounded bg-[#E10600]" />
                <span className="w-4 h-4 rounded bg-[#F2F0EB]" />
                <span className="font-mono text-[9px] text-[#A8A8A8] ml-1">Palette</span>
              </div>
              <div className="p-2 rounded bg-[#141414] border border-zinc-800 space-y-1">
                <p className="text-[10px] font-semibold text-[#F2F0EB]">
                  Business Cards · Brochures
                </p>
                <p className="text-[9px] text-[#A8A8A8]">
                  Social Media Creatives &amp; Banners
                </p>
              </div>
            </div>
          </div>
        </div>
      );

    case 'crm':
      return (
        <div className="relative h-48 sm:h-52 rounded-xl bg-[#0B0B0B] border border-zinc-800 flex flex-col justify-between overflow-hidden select-none">
          <div className="px-3 py-1.5 bg-[#121212] border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#E10600]" />
              <span className="font-mono text-[10px] text-[#F2F0EB]">CRM Pipeline Console</span>
            </div>
            <span className="font-mono text-[9px] text-emerald-400">Lead Tracking</span>
          </div>

          <div className="flex-1 p-3 grid grid-cols-3 gap-2">
            {[
              { stage: 'New Leads', count: '24', item: 'Clinic Inquiry', color: 'border-zinc-700' },
              { stage: 'Follow-Up', count: '11', item: 'Proposal Sent', color: 'border-amber-500/40' },
              { stage: 'Closed Won', count: '08', item: 'Active Client', color: 'border-emerald-500/40' },
            ].map((col) => (
              <div
                key={col.stage}
                className={`p-2 rounded-lg bg-[#141414] border ${col.color} flex flex-col justify-between`}
              >
                <div className="flex items-center justify-between text-[9px] font-mono">
                  <span className="text-[#A8A8A8] truncate">{col.stage}</span>
                  <span className="text-[#F2F0EB] font-bold">{col.count}</span>
                </div>
                <div className="p-1.5 rounded bg-[#0A0A0A] border border-zinc-800 text-[9px] text-[#F2F0EB] truncate">
                  {col.item}
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case 'marketing':
      return (
        <div className="relative h-48 sm:h-52 rounded-xl bg-[#0B0B0B] border border-zinc-800 flex flex-col justify-between overflow-hidden select-none">
          <div className="px-3 py-1.5 bg-[#121212] border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Megaphone className="w-3.5 h-3.5 text-[#E10600]" />
              <span className="font-mono text-[10px] text-[#F2F0EB]">Meta Ads Manager</span>
            </div>
            <span className="font-mono text-[9px] text-sky-400">FB · Instagram</span>
          </div>

          <div className="flex-1 p-3.5 flex flex-col justify-between">
            <div className="grid grid-cols-3 gap-2 font-mono">
              <div className="p-2 rounded-lg bg-[#141414] border border-zinc-800">
                <span className="text-[8px] text-[#A8A8A8] block">REACH</span>
                <span className="text-xs font-bold text-[#F2F0EB]">48.5K</span>
              </div>
              <div className="p-2 rounded-lg bg-[#141414] border border-zinc-800">
                <span className="text-[8px] text-[#A8A8A8] block">LEADS</span>
                <span className="text-xs font-bold text-emerald-400">320+</span>
              </div>
              <div className="p-2 rounded-lg bg-[#141414] border border-zinc-800">
                <span className="text-[8px] text-[#A8A8A8] block">ROAS</span>
                <span className="text-xs font-bold text-[#E10600]">4.2x</span>
              </div>
            </div>

            <div className="p-2 rounded-lg bg-[#141414] border border-zinc-800 flex items-center justify-between text-[10px]">
              <span className="text-[#F2F0EB] font-medium">Direct WhatsApp Lead Funnel</span>
              <span className="font-mono text-[9px] text-emerald-400">Optimized</span>
            </div>
          </div>
        </div>
      );

    case 'messaging':
      return (
        <div className="relative h-48 sm:h-52 rounded-xl bg-[#0B0B0B] border border-zinc-800 flex flex-col justify-between overflow-hidden select-none">
          <div className="px-3 py-1.5 bg-[#121212] border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <MessageSquareCode className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-mono text-[10px] text-[#F2F0EB]">Bulk SMS &amp; OTP API</span>
            </div>
            <span className="font-mono text-[9px] text-emerald-400">WhatsApp · SMS</span>
          </div>

          <div className="flex-1 p-3.5 flex flex-col justify-between font-mono text-[10px]">
            <div className="p-2.5 rounded-lg bg-[#141414] border border-zinc-800 space-y-1">
              <span className="text-[9px] text-[#E10600]">POST /api/sms/send-otp</span>
              <p className="text-[#F2F0EB]">
                &ldquo;Your verification OTP is 482910. Valid for 5 mins.&rdquo;
              </p>
            </div>
            <div className="flex items-center justify-between text-[9px] text-[#A8A8A8]">
              <span className="inline-flex items-center gap-1 text-emerald-400">
                <CheckCircle2 className="w-3 h-3" /> Promotional &amp; Transactional
              </span>
              <span>99.8% Delivery</span>
            </div>
          </div>
        </div>
      );

    case 'video':
      return (
        <div className="relative h-48 sm:h-52 rounded-xl bg-[#0B0B0B] border border-zinc-800 flex flex-col justify-between overflow-hidden select-none">
          <div className="px-3 py-1.5 bg-[#121212] border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Clapperboard className="w-3.5 h-3.5 text-[#E10600]" />
              <span className="font-mono text-[10px] text-[#F2F0EB]">Launch &amp; Promo Reels</span>
            </div>
            <span className="font-mono text-[9px] text-[#A8A8A8]">Motion Graphics</span>
          </div>

          <div className="flex-1 p-3.5 flex flex-col justify-between">
            <div className="p-3 rounded-lg bg-gradient-to-r from-[#1A0908] via-[#141414] to-[#0E0E0E] border border-[#E10600]/35 flex items-center justify-between">
              <div>
                <p className="font-display text-base tracking-wide text-[#F2F0EB]">
                  BRAND LAUNCH FILM
                </p>
                <p className="text-[10px] text-[#A8A8A8]">Product Promo · Kinetic Titles</p>
              </div>
              <span className="px-2 py-1 rounded bg-[#E10600] text-white font-mono text-[9px] font-bold">
                60 FPS
              </span>
            </div>

            <div className="space-y-1">
              <div className="h-2 w-full rounded bg-[#141414] overflow-hidden flex gap-1 p-0.5">
                <div className="h-full w-1/3 bg-[#E10600] rounded-xs" />
                <div className="h-full w-1/4 bg-zinc-500 rounded-xs" />
                <div className="h-full w-1/3 bg-zinc-700 rounded-xs" />
              </div>
              <div className="flex justify-between font-mono text-[9px] text-[#A8A8A8]">
                <span>00:00</span>
                <span>Timeline Cut &amp; Motion</span>
                <span>00:45</span>
              </div>
            </div>
          </div>
        </div>
      );

    case 'software':
      return (
        <div className="relative h-48 sm:h-52 rounded-xl bg-[#0B0B0B] border border-zinc-800 flex flex-col justify-between overflow-hidden select-none">
          <div className="px-3 py-1.5 bg-[#121212] border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5 text-[#E10600]" />
              <span className="font-mono text-[10px] text-[#F2F0EB]">Custom Business Software</span>
            </div>
            <span className="font-mono text-[9px] text-emerald-400">Spring Boot · APIs</span>
          </div>

          <div className="flex-1 p-3.5 grid grid-cols-2 gap-2.5 items-stretch font-mono">
            <div className="p-2.5 rounded-lg bg-[#141414] border border-zinc-800 flex flex-col justify-between">
              <span className="text-[9px] text-[#E10600]">BACKEND CORE</span>
              <p className="text-[10px] text-[#F2F0EB] font-sans font-semibold">
                Java · Spring Boot · SQL
              </p>
              <span className="text-[8px] text-[#A8A8A8]">Secure REST APIs</span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#141414] border border-zinc-800 flex flex-col justify-between">
              <span className="text-[9px] text-sky-400">CLOUD ENGINE</span>
              <p className="text-[10px] text-[#F2F0EB] font-sans font-semibold">
                Billing, Inventory &amp; Portals
              </p>
              <span className="text-[8px] text-[#A8A8A8]">Role-Based Access</span>
            </div>
          </div>
        </div>
      );

    case 'uiux':
      return (
        <div className="relative h-48 sm:h-52 rounded-xl bg-[#0B0B0B] border border-zinc-800 flex flex-col justify-between overflow-hidden select-none">
          <div className="px-3 py-1.5 bg-[#121212] border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Figma className="w-3.5 h-3.5 text-[#E10600]" />
              <span className="font-mono text-[10px] text-[#F2F0EB]">UI/UX &amp; Prototyping</span>
            </div>
            <span className="font-mono text-[9px] text-[#A8A8A8]">Wireframe → Design</span>
          </div>

          <div className="flex-1 p-3.5 grid grid-cols-2 gap-2.5 items-stretch">
            <div className="p-2.5 rounded-lg bg-[#121212] border border-dashed border-zinc-700 flex flex-col justify-between">
              <span className="text-[8px] font-mono text-[#A8A8A8]">01. WIREFRAME</span>
              <div className="space-y-1.5 my-auto">
                <div className="h-2 w-16 rounded bg-zinc-700" />
                <div className="h-1.5 w-full rounded bg-zinc-800" />
                <div className="h-1.5 w-3/4 rounded bg-zinc-800" />
              </div>
              <span className="text-[8px] text-zinc-500">User Flow</span>
            </div>

            <div className="p-2.5 rounded-lg bg-[#161616] border border-[#E10600]/45 flex flex-col justify-between">
              <span className="text-[8px] font-mono text-[#E10600] font-bold">02. FINAL UI</span>
              <p className="text-[10px] font-bold text-[#F2F0EB] leading-tight my-auto">
                Responsive Design System
              </p>
              <span className="text-[8px] text-emerald-400">✓ Mobile &amp; Desktop</span>
            </div>
          </div>
        </div>
      );

    case 'it':
      return (
        <div className="relative h-48 sm:h-52 rounded-xl bg-[#0B0B0B] border border-zinc-800 flex flex-col justify-between overflow-hidden select-none">
          <div className="px-3 py-1.5 bg-[#121212] border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-mono text-[10px] text-[#F2F0EB]">Domain, Cloud &amp; Security</span>
            </div>
            <span className="font-mono text-[9px] text-emerald-400">SSL · Edge CDN</span>
          </div>

          <div className="flex-1 p-3.5 flex flex-col justify-between font-mono">
            <div className="grid grid-cols-2 gap-2 text-[9px]">
              <div className="p-2 rounded bg-[#141414] border border-zinc-800 text-[#F2F0EB]">
                <span className="text-[#A8A8A8] block">HOSTING</span>
                Vercel / Cloudflare
              </div>
              <div className="p-2 rounded bg-[#141414] border border-zinc-800 text-[#F2F0EB]">
                <span className="text-[#A8A8A8] block">SECURITY</span>
                HTTPS + DDoS Guard
              </div>
            </div>
            <div className="p-2 rounded bg-[#141414] border border-zinc-800 flex items-center justify-between text-[9px]">
              <span className="text-[#F2F0EB]">Domain DNS + Technical Support</span>
              <span className="text-emerald-400">99.9% Uptime</span>
            </div>
          </div>
        </div>
      );

    case 'android':
    default:
      return (
        <div className="relative h-48 sm:h-52 rounded-xl bg-zinc-950 border border-zinc-800 flex flex-col justify-between overflow-hidden select-none">
          <div className="px-3 py-1.5 bg-[#0F5132] text-white flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Smartphone className="w-3.5 h-3.5 text-emerald-300" />
              <span className="font-mono text-[10px] font-bold">
                KHATA · Mobile App UI
              </span>
            </div>
            <span className="font-mono text-[9px] text-emerald-200">Android &amp; iOS</span>
          </div>

          <div className="flex-1 p-3 bg-[#F8FAFC] text-[#0F172A] flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
              <div>
                <p className="text-[10px] font-bold text-[#0F5132]">Flat 204 Group</p>
                <p className="text-[8px] text-slate-500">4 Members · Shared Expenses</p>
              </div>
              <span className="px-2 py-0.5 rounded bg-[#0F5132] text-white text-[9px] font-bold">
                + Add Split
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 my-auto">
              <div className="p-2 rounded-lg bg-[#0F5132] text-white">
                <span className="text-[8px] text-emerald-200 block">Total Group Spend</span>
                <p className="text-xs font-bold">₹35,840</p>
              </div>
              <div className="p-2 rounded-lg bg-white border border-slate-200">
                <span className="text-[8px] text-slate-500 block">You Receive</span>
                <p className="text-xs font-bold text-emerald-700">+₹2,450</p>
              </div>
            </div>
          </div>
        </div>
      );
  }
};
