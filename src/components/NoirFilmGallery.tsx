import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ArrowUpRight, ExternalLink, X, Sparkles, MessageSquare, Layers } from 'lucide-react';
import { type ProjectItem } from '../data/portfolioConfig';
import { ProjectVisual } from './ProjectVisual';

interface NoirFilmGalleryProps {
  projects: ProjectItem[];
  onInspectCaseStudy: (project: ProjectItem) => void;
  onRequestCustom: (topic: string) => void;
  buildWhatsappLink?: (topic?: string) => string;
}

/**
 * Interactive Expanding Filmstrip Showcase & Lightbox Viewer
 * Faithful port of the Framer Noir Signal `FilmGallery` expanding flex-accordion strip
 * rendering Aditya's real interactive project UI viewports instead of static placeholders.
 */
export const NoirFilmGallery: React.FC<NoirFilmGalleryProps> = ({
  projects,
  onInspectCaseStudy,
  onRequestCustom,
  buildWhatsappLink,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    if (activeIndex >= projects.length) {
      setActiveIndex(0);
    }
  }, [projects.length, activeIndex]);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const touchStartXRef = useRef<number | null>(null);
  const intervalSeconds = 4.5;

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 860);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Autoplay when user is not actively hovering or inspecting lightbox
  useEffect(() => {
    if (isHovering || lightboxIndex !== null || projects.length === 0) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % projects.length);
    }, intervalSeconds * 1000);
    return () => window.clearInterval(timer);
  }, [isHovering, lightboxIndex, projects.length]);

  const stepLightbox = useCallback(
    (delta: number) => {
      setLightboxIndex((prev) =>
        prev === null ? prev : (prev + delta + projects.length) % projects.length
      );
    },
    [projects.length]
  );

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') stepLightbox(1);
      if (e.key === 'ArrowLeft') stepLightbox(-1);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex, stepLightbox]);

  if (!projects.length) return null;

  const activeLightboxProject = lightboxIndex !== null ? projects[lightboxIndex] : null;

  return (
    <div className="space-y-4">
      {/* Header hint */}
      <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-500 dark:text-[#A8A8A8]">
        <span>INTERACTIVE SHOWREEL STRIP · HOVER OR TAP TO EXPAND</span>
        <span className="text-[#E10600]">
          {String(activeIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')} ACTIVE
        </span>
      </div>

      {/* Horizontal Flex-Accordion Filmstrip */}
      <div
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="w-full"
        style={{
          display: 'flex',
          gap: '10px',
          height: isMobile ? '360px' : '440px',
          overflowX: isMobile ? 'auto' : 'hidden',
          scrollSnapType: isMobile ? 'x mandatory' : undefined,
        }}
      >
        {projects.map((proj, idx) => {
          const isActive = idx === activeIndex;
          return (
            <div
              key={proj.id}
              data-noir-cursor="VIEW"
              onMouseEnter={() => setActiveIndex(idx)}
              onPointerEnter={() => setActiveIndex(idx)}
              onClick={() => setLightboxIndex(idx)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setLightboxIndex(idx);
                }
              }}
              aria-label={`Expand ${proj.title} preview`}
              className="relative overflow-hidden rounded-xl border border-zinc-300/80 dark:border-[#F2F0EB]/12 bg-[#0E0E0E] cursor-pointer group"
              style={{
                flex: isMobile ? '0 0 82%' : isActive ? '6 1 0' : '1 1 0',
                minWidth: isMobile ? undefined : '56px',
                height: '100%',
                scrollSnapAlign: 'center',
                transition: 'flex 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              {/* Real Rendered Live UI Scene inside the filmstrip slice */}
              <div
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{
                  transform: isActive || isMobile ? 'scale(1.02)' : 'scale(1.16)',
                  filter:
                    isActive || isMobile
                      ? 'grayscale(0) brightness(0.98)'
                      : 'grayscale(1) brightness(0.45)',
                  transition:
                    'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), filter 0.75s ease',
                }}
              >
                <ProjectVisual visualType={proj.visualType} />
              </div>

              {/* Cinema Bottom Gradient Shade */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(5,5,5,0.08) 0%, rgba(5,5,5,0.18) 42%, rgba(5,5,5,0.92) 100%)',
                }}
              />

              {/* Vertical Mono Strip Label on Collapsed Slices (Desktop) */}
              {!isMobile && (
                <div
                  className="pointer-events-none font-mono uppercase whitespace-nowrap"
                  style={{
                    position: 'absolute',
                    left: '50%',
                    bottom: '22px',
                    transform: 'translateX(-50%) rotate(180deg)',
                    writingMode: 'vertical-rl',
                    fontSize: '10px',
                    letterSpacing: '0.24em',
                    color: '#F2F0EB',
                    opacity: isActive ? 0 : 0.85,
                    transition: 'opacity 0.35s ease',
                  }}
                >
                  {String(idx + 1).padStart(2, '0')} — {proj.title}
                </div>
              )}

              {/* Active Slice Bottom Overlay Title & Action Circle */}
              <div
                className="pointer-events-none"
                style={{
                  position: 'absolute',
                  left: '22px',
                  right: '22px',
                  bottom: '20px',
                  opacity: isActive || isMobile ? 1 : 0,
                  transform: isActive || isMobile ? 'none' : 'translateY(18px)',
                  transition:
                    'opacity 0.5s ease, transform 0.75s cubic-bezier(0.16, 1, 0.3, 1)',
                  transitionDelay: isActive ? '0.18s' : '0s',
                }}
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#E10600] mb-1.5 font-semibold">
                  {String(idx + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')} ·{' '}
                  {proj.status}
                </div>
                <div className="flex items-end justify-between gap-4">
                  <div className="font-display text-2xl sm:text-4xl uppercase leading-[0.94] text-[#F2F0EB]">
                    {proj.title}
                  </div>
                  <div className="w-10 h-10 rounded-full border border-[#F2F0EB]/35 backdrop-blur-md grid place-items-center text-[#F2F0EB] shrink-0 group-hover:bg-[#E10600] group-hover:border-[#E10600] transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Animated Top Crimson Autoplay Progress Line (`noirBar`) */}
              {isActive && !isMobile && (
                <div
                  key={`bar-${idx}-${isHovering ? 'paused' : 'play'}`}
                  className="absolute top-0 left-0 h-[2px] bg-[#E10600] pointer-events-none"
                  style={{
                    animation: isHovering ? 'none' : `noirBar ${intervalSeconds}s linear`,
                    width: isHovering ? '100%' : undefined,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Active Filmstrip Project Action Bar */}
      {projects[activeIndex] && (
        <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-[#0B0B0B] border border-zinc-300/80 dark:border-[#F2F0EB]/12 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[#E10600] font-semibold">
              <span>{projects[activeIndex].index}</span>
              <span aria-hidden="true">·</span>
              <span className="text-zinc-500 dark:text-[#A8A8A8]">
                {projects[activeIndex].domain}
              </span>
            </div>
            <h3 className="font-display text-xl sm:text-2xl uppercase tracking-tight text-[#111111] dark:text-[#F2F0EB] truncate">
              {projects[activeIndex].title}
            </h3>
            <p className="text-xs text-zinc-600 dark:text-[#A8A8A8] line-clamp-1">
              {projects[activeIndex].overview}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {projects[activeIndex].liveDemoUrl ? (
              <a
                href={projects[activeIndex].liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-md bg-[#E10600] hover:bg-[#ff1e17] text-white font-mono text-xs uppercase tracking-wider font-semibold transition-colors whitespace-nowrap"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Live Demo</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            ) : (
              <button
                type="button"
                onClick={() => onInspectCaseStudy(projects[activeIndex])}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-md bg-[#E10600] hover:bg-[#ff1e17] text-white font-mono text-xs uppercase tracking-wider font-semibold transition-colors whitespace-nowrap cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open App</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => onInspectCaseStudy(projects[activeIndex])}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-md border border-zinc-300 dark:border-[#F2F0EB]/20 hover:border-[#E10600] text-zinc-800 dark:text-[#F2F0EB] font-mono text-xs uppercase tracking-wider transition-colors whitespace-nowrap cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5 text-[#E10600]" />
              <span>Case Study</span>
            </button>

            {buildWhatsappLink && (
              <a
                href={buildWhatsappLink(`Customize Project Like: ${projects[activeIndex].title}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-md border border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-mono text-xs uppercase tracking-wider font-semibold transition-colors whitespace-nowrap"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            )}

            <button
              type="button"
              onClick={() =>
                onRequestCustom(`Customize Project Like: ${projects[activeIndex].title}`)
              }
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-md border border-zinc-300 dark:border-[#F2F0EB]/20 hover:border-[#E10600] text-zinc-800 dark:text-[#F2F0EB] font-mono text-xs uppercase tracking-wider font-semibold transition-colors whitespace-nowrap cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#E10600]" />
              <span>Customize</span>
            </button>
          </div>
        </div>
      )}

      {/* =====================================================================
          CINEMA LIGHTBOX MODAL (`noirZoom`)
      ===================================================================== */}
      {activeLightboxProject && lightboxIndex !== null && (
        <div
          onClick={() => setLightboxIndex(null)}
          onTouchStart={(e) => {
            touchStartXRef.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (touchStartXRef.current === null) return;
            const delta = e.changedTouches[0].clientX - touchStartXRef.current;
            if (Math.abs(delta) > 40) stepLightbox(delta < 0 ? 1 : -1);
            touchStartXRef.current = null;
          }}
          className="fixed inset-0 z-[92] bg-[#050505]/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8"
          style={{ animation: 'noirZoom 0.55s cubic-bezier(0.16, 1, 0.3, 1)' }}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-[#F2F0EB]">
            <span>
              <span className="text-[#E10600]">●</span>{' '}
              {String(lightboxIndex + 1).padStart(2, '0')} /{' '}
              {String(projects.length).padStart(2, '0')} — {activeLightboxProject.title}
            </span>
            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[#F2F0EB]/20 hover:border-[#E10600] text-[#F2F0EB] cursor-pointer"
            >
              <span>Close</span>
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Center Viewport */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 rounded-xl overflow-hidden border border-[#F2F0EB]/15 bg-[#0B0B0B] shadow-[0_40px_120px_rgba(0,0,0,0.8)]"
          >
            <div className="lg:col-span-7 min-h-[260px] sm:min-h-[380px] border-b lg:border-b-0 lg:border-r border-[#F2F0EB]/10">
              <ProjectVisual visualType={activeLightboxProject.visualType} />
            </div>

            <div className="lg:col-span-5 p-6 sm:p-7 flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#E10600] font-semibold">
                  {activeLightboxProject.domain}
                </p>
                <h3 className="font-display text-3xl sm:text-4xl uppercase text-[#F2F0EB] leading-none">
                  {activeLightboxProject.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#A8A8A8] leading-relaxed">
                  {activeLightboxProject.overview}
                </p>
              </div>

              <div className="space-y-2.5 pt-3 border-t border-[#F2F0EB]/10">
                {activeLightboxProject.liveDemoUrl && (
                  <a
                    href={activeLightboxProject.liveDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-md bg-[#E10600] hover:bg-[#ff1e17] text-white font-mono text-xs uppercase tracking-wider font-semibold transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open Live Website</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const target = activeLightboxProject;
                      setLightboxIndex(null);
                      onInspectCaseStudy(target);
                    }}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-md border border-[#F2F0EB]/20 hover:border-[#E10600] text-[#F2F0EB] font-mono text-[11px] uppercase tracking-wider cursor-pointer"
                  >
                    <span>Case Study</span>
                  </button>
                  {buildWhatsappLink ? (
                    <a
                      href={buildWhatsappLink(
                        `Customize Project Like: ${activeLightboxProject.title}`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-md border border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 font-mono text-[11px] uppercase tracking-wider"
                    >
                      <MessageSquare className="w-3 h-3" />
                      <span>WhatsApp</span>
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        const title = activeLightboxProject.title;
                        setLightboxIndex(null);
                        onRequestCustom(`Customize Project Like: ${title}`);
                      }}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-md border border-[#F2F0EB]/20 hover:border-[#E10600] text-[#F2F0EB] font-mono text-[11px] uppercase tracking-wider cursor-pointer"
                    >
                      <Sparkles className="w-3 h-3 text-[#E10600]" />
                      <span>Customize</span>
                    </button>
                  )}
                </div>

                {buildWhatsappLink && (
                  <button
                    type="button"
                    onClick={() => {
                      const title = activeLightboxProject.title;
                      setLightboxIndex(null);
                      onRequestCustom(`Customize Project Like: ${title}`);
                    }}
                    className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-md border border-[#F2F0EB]/20 hover:border-[#E10600] text-[#F2F0EB] font-mono text-[11px] uppercase tracking-wider cursor-pointer"
                  >
                    <Sparkles className="w-3 h-3 text-[#E10600]" />
                    <span>Customize This Design</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Controls: Prev / Thumbnail Selector / Next */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-3"
          >
            <button
              type="button"
              onClick={() => stepLightbox(-1)}
              aria-label="Previous project"
              className="w-10 h-10 rounded-full border border-[#F2F0EB]/25 hover:border-[#E10600] text-[#F2F0EB] text-lg cursor-pointer"
            >
              ‹
            </button>

            <div className="flex flex-wrap items-center justify-center gap-2">
              {projects.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setLightboxIndex(i)}
                  className={`px-3 py-1.5 rounded-md font-mono text-[10px] uppercase tracking-wider cursor-pointer transition-all ${
                    i === lightboxIndex
                      ? 'bg-[#E10600] text-white outline outline-2 outline-[#E10600] outline-offset-2'
                      : 'bg-[#141414] text-[#A8A8A8] hover:text-[#F2F0EB]'
                  }`}
                >
                  {String(i + 1).padStart(2, '0')} · {p.title.split(' ')[0]}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => stepLightbox(1)}
              aria-label="Next project"
              className="w-10 h-10 rounded-full border border-[#F2F0EB]/25 hover:border-[#E10600] text-[#F2F0EB] text-lg cursor-pointer"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
