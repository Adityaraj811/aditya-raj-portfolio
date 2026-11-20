import React, { useState, useEffect, useCallback } from 'react';
import {
  Sun,
  Moon,
  Menu,
  X,
  ArrowUpRight,
  ArrowRight,
  ArrowUp,
  Linkedin,
  Instagram,
  Mail,
  MessageSquare,
  Phone,
  Copy,
  Check,
  GraduationCap,
  ExternalLink,
  FileText,
  User,
  Plus,
  Minus,
} from 'lucide-react';
import {
  portfolioConfig,
  type ProjectItem,
} from './data/portfolioConfig';
import { ServiceMockupVisual } from './components/ServiceMockupVisual';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { ResumeModal } from './components/ResumeModal';
import { ScrollReveal } from './components/ScrollReveal';
import { HeroProfile3D } from './components/HeroProfile3D';
import { FreelanceServicesPage } from './components/FreelanceServicesPage';
import { AboutPage } from './components/AboutPage';
import { NoirLiquidCanvas } from './components/NoirLiquidCanvas';
import { NoirFilmGallery } from './components/NoirFilmGallery';
import {
  NoirLogo,
  NoirNavLink,
  NoirRingCursor,
  NoirMenuButton,
  NoirMobileMenu,
} from './components/NoirChrome';
import {
  NoirScrollBlur,
  NoirDualMarquee,
  NoirTypeManifesto,
  NoirAboutSection,
} from './components/NoirScrollFx';
import {
  useNoirHeadingReveal,
  NoirStackCards,
  NoirContactBanner,
  NoirTalkRibbon,
  NoirWords,
  NoirBlurWords,
} from './components/NoirFx2';
import {
  NoirStillsGallery,
  NoirClientsWall,
  NoirTestimonials,
  NoirStudioFooter,
} from './components/NoirSignalSections';
import {
  NoirCursor,
  NoirMouseGlow,
  NoirFilmGrain,
  NoirPreloader,
  NoirHairlineTrack,
  NoirSectionBar,
  NoirOrbitCTA,
  NoirSkillRow,
} from './components/NoirEffects';
import { motion } from 'framer-motion';
import { velouraSoundEngine } from './utils/velouraSoundEngine';

type PageRoute = 'home' | 'services' | 'about';

function detectInitialRoute(): PageRoute {
  if (typeof window === 'undefined') return 'home';
  const pathname = window.location.pathname.replace(/\/+$/, '');
  const hash = window.location.hash;
  const searchParams = new URLSearchParams(window.location.search);

  if (
    pathname.endsWith('/services') ||
    hash === '#/services' ||
    hash === '#services-page' ||
    searchParams.get('page') === 'services'
  ) {
    return 'services';
  }

  if (
    pathname.endsWith('/about') ||
    hash === '#/about' ||
    hash === '#about-page' ||
    searchParams.get('page') === 'about'
  ) {
    return 'about';
  }

  return 'home';
}

const MARQUEE_ITEMS = [
  'WEBSITE DEVELOPMENT',
  'MOBILE APPS',
  'CRM SOLUTIONS',
  'META ADS',
  'E-COMMERCE',
  'BULK SMS & OTP API',
  'LOGO & GRAPHIC DESIGN',
  'UI/UX DESIGN',
  'LAUNCH VIDEOS',
  'CUSTOM SOFTWARE',
  'IT & CLOUD HOSTING',
  'ANDROID APPS',
];

const STUDIO_PROCESS_STEPS = [
  {
    step: 'STEP 01 / 04',
    index: '01',
    title: 'DISCOVER',
    description:
      'Understanding your brand, audience, and business goals — picking the right live layout, mobile app architecture, or growth funnel.',
  },
  {
    step: 'STEP 02 / 04',
    index: '02',
    title: 'CONCEPT',
    description:
      'Crafting bespoke UI/UX directions, typography systems, wireframes, and interactive motion tests tailored to your identity.',
  },
  {
    step: 'STEP 03 / 04',
    index: '03',
    title: 'CRAFT',
    description:
      'Engineering clean React, TypeScript, Android (Java/MVVM), and Spring Boot systems with mobile-first speed across every device.',
  },
  {
    step: 'STEP 04 / 04',
    index: '04',
    title: 'LAUNCH',
    description:
      'Edge deployment on Cloudflare & Vercel, domain SSL hardening, Meta Ads or WhatsApp automation setup, and dedicated tech care.',
  },
];

const NOIR_CAPABILITY_ROWS = [
  {
    title: 'React, TypeScript & Motion Web Systems',
    metric: '96% · 03+ YRS',
    percentage: 96,
    detail: 'High-conversion client websites, WebGL shaders, 3D showcases & SaaS dashboards.',
  },
  {
    title: 'Java, Spring Boot & REST Architectures',
    metric: '92% · 03+ YRS',
    percentage: 92,
    detail: 'Spring Security, JPA/Hibernate, SQL schemas & resilient production backend APIs.',
  },
  {
    title: 'Native Android (Java, XML & MVVM)',
    metric: '90% · 02+ YRS',
    percentage: 90,
    detail: 'Room offline persistence, Retrofit networking, ViewModel & fluid Material UI.',
  },
  {
    title: 'Edge Cloud, CRM & Meta Ads Growth',
    metric: '94% · 100+ LAUNCHED',
    percentage: 94,
    detail: 'Cloudflare Workers, Vercel, WhatsApp automation, OTP/SMS APIs & Meta Ads.',
  },
];

export default function App() {
  const {
    personal,
    studioBrand,
    projects,
    freelanceSection,
    faqs,
    education,
  } = portfolioConfig;

  // Theme management: Deep Obsidian Noir (#050505) default with Paper light toggle
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('aditya-portfolio-theme');
      if (saved === 'light' || saved === 'dark') return saved;
    }
    return 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('aditya-portfolio-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Scroll Progress Crimson Bar
  const [scrollProgress, setScrollProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollProgress(Math.min(1, Math.max(0, window.scrollY / docHeight)));
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Live Current Date & Time
  const [liveDateTime, setLiveDateTime] = useState<{ date: string; time: string }>({
    date: '-- --- ----',
    time: '--:--:--',
  });
  useEffect(() => {
    const updateClock = () => {
      try {
        const now = new Date();
        const dateFormatted = new Intl.DateTimeFormat('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        })
          .format(now)
          .toUpperCase();
        const timeFormatted = new Intl.DateTimeFormat('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        }).format(now);
        setLiveDateTime({ date: dateFormatted, time: timeFormatted });
      } catch {
        setLiveDateTime({ date: 'LIVE', time: 'ONLINE' });
      }
    };
    updateClock();
    const id = window.setInterval(updateClock, 1000);
    return () => window.clearInterval(id);
  }, []);

  // Page Routing State ('home' | 'services' | 'about')
  const [currentPage, setCurrentPage] = useState<PageRoute>(() => detectInitialRoute());

  // Framer Noir Signal: section headings blur-wipe in on scroll (re-armed per page)
  useNoirHeadingReveal([currentPage]);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(detectInitialRoute());
    };
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const getNormalizedBase = () => {
    const base = import.meta.env.BASE_URL || '/';
    return base.endsWith('/') ? base : `${base}/`;
  };

  const navigateToServices = useCallback(() => {
    const base = getNormalizedBase();
    const targetUrl = `${base}services`;
    if (window.location.pathname !== targetUrl) {
      window.history.pushState({ page: 'services' }, '', targetUrl);
    }
    setCurrentPage('services');
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const navigateToAbout = useCallback(() => {
    const base = getNormalizedBase();
    const targetUrl = `${base}about`;
    if (window.location.pathname !== targetUrl) {
      window.history.pushState({ page: 'about' }, '', targetUrl);
    }
    setCurrentPage('about');
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const navigateToPortfolio = useCallback((sectionId?: string) => {
    const base = getNormalizedBase();
    const hashSuffix = sectionId ? `#${sectionId}` : '';
    window.history.pushState({ page: 'home' }, '', `${base}${hashSuffix}`);
    setCurrentPage('home');
    setMobileMenuOpen(false);

    if (sectionId) {
      window.setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 60);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    if (currentPage !== 'home') {
      setActiveSection(currentPage);
      return;
    }

    const sectionIds = ['home', 'projects', 'freelance', 'process', 'about-gateway', 'contact'];
    const handleScroll = () => {
      const scrollY = window.scrollY + 180;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  // Profile Photo Fallback
  const [profileImgSrc, setProfileImgSrc] = useState<string>(personal.profileImagePath);
  const [usingFallbackAvatar, setUsingFallbackAvatar] = useState(false);

  const handleProfileImageError = () => {
    if (!usingFallbackAvatar) {
      setUsingFallbackAvatar(true);
      setProfileImgSrc(personal.profileFallbackSvg);
    }
  };

  // Interactive Controls & Selections
  const [selectedServiceCategory, setSelectedServiceCategory] = useState<
    'all' | 'web' | 'apps' | 'growth'
  >('all');
  const [activeServiceId, setActiveServiceId] = useState<string>(
    freelanceSection.services[0]?.id || 'website-development'
  );
  const [selectedProjectDomain, setSelectedProjectDomain] = useState<string>('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<string | null>('01');

  // Modals
  const [activeProjectModal, setActiveProjectModal] = useState<ProjectItem | null>(null);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  const handleOpenProjectCaseStudy = useCallback((project: ProjectItem) => {
    if (project.id === 'veloura-specialty-coffee') {
      velouraSoundEngine.playChimeSound();
    }
    setActiveProjectModal(project);
  }, []);

  // Inquiry Topic State
  const [selectedInquiryTopic, setSelectedInquiryTopic] = useState<string>(
    'Website Development (Business / Portfolio / Landing Page)'
  );
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopyText = (text: string, label: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedField(label);
      setTimeout(() => setCopiedField(null), 2500);
    }
  };

  const handleSelectInquiryTopicAndScroll = (topic: string) => {
    setSelectedInquiryTopic(topic);
    if (currentPage !== 'home') {
      navigateToPortfolio('contact');
    } else {
      const contactEl = document.getElementById('contact');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const buildMailtoLink = (topic?: string) => {
    const subject = encodeURIComponent(
      `Project Inquiry: ${topic || selectedInquiryTopic} — Aditya Raj`
    );
    const body = encodeURIComponent(
      `Hi Aditya,\n\nI visited your portfolio and would like to discuss: ${
        topic || selectedInquiryTopic
      }.\n\nBest regards,`
    );
    return `mailto:${personal.emailAddress}?subject=${subject}&body=${body}`;
  };

  const buildWhatsappLink = (topic?: string) => {
    if (!topic) return personal.whatsappDirectUrl;
    const cleanDigits = personal.whatsappNumber.replace(/[^0-9]/g, '');
    const message = encodeURIComponent(
      `Hi Aditya, I visited your portfolio and would like to discuss: ${topic}.`
    );
    return `https://wa.me/${cleanDigits}?text=${message}`;
  };

  const filteredServices =
    selectedServiceCategory === 'all'
      ? freelanceSection.services
      : freelanceSection.services.filter((s) => s.category === selectedServiceCategory);

  const activeService =
    filteredServices.find((s) => s.id === activeServiceId) ||
    filteredServices[0] ||
    freelanceSection.services[0];

  const filteredProjects =
    selectedProjectDomain === 'all'
      ? projects
      : projects.filter((p) => p.domain === selectedProjectDomain);

  return (
    <div className="min-h-screen bg-[#F5F4F0] text-[#111111] dark:bg-[#050505] dark:text-[#F2F0EB] bg-architectural-grid transition-colors duration-200 relative">
      {/* Framer Cinema Overlays: Opening Slate, Film Grain & Floating VIEW Lens Cursor */}
      <NoirPreloader />
      <NoirFilmGrain />
      <NoirCursor />
      <NoirRingCursor />

      {/* Top Crimson Scroll Signal Line */}
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 h-[2px] z-50 pointer-events-none origin-left bg-[#E10600]"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />

      {/* =====================================================================
          A. STICKY 3-ZONE EDITORIAL TOP BAR (Framer Noir Signal Contract)
      ===================================================================== */}
      <header className="sticky top-0 z-40 w-full bg-[#F5F4F0]/[0.86] dark:bg-[#050505]/[0.86] backdrop-blur-[20px] border-b border-zinc-300/70 dark:border-[#F2F0EB]/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Crimson mark + tracked mono wordmark */}
          <NoirLogo name="ADITYA RAJ" onClick={() => navigateToPortfolio()} />

          {/* Zone 2: Clean Single-Line Typographic Nav Links */}
          <nav aria-label="Primary Navigation" className="hidden lg:flex items-center gap-5 xl:gap-7">
            <NoirNavLink
              index="01"
              label="Services"
              href="#freelance"
              active={currentPage === 'home' && activeSection === 'freelance'}
              onClick={() => navigateToPortfolio('freelance')}
            />
            <NoirNavLink
              index="02"
              label="Work"
              href="#projects"
              active={currentPage === 'home' && activeSection === 'projects'}
              onClick={() => navigateToPortfolio('projects')}
            />
            <NoirNavLink
              index="03"
              label="Process"
              href="#process"
              active={currentPage === 'home' && activeSection === 'process'}
              onClick={() => navigateToPortfolio('process')}
            />
            <NoirNavLink
              index="04"
              label="About"
              href={`${getNormalizedBase()}about`}
              active={currentPage === 'about' || (currentPage === 'home' && activeSection === 'about-gateway')}
              onClick={navigateToAbout}
            />
            <NoirNavLink
              index="05"
              label="Contact"
              href="#contact"
              active={currentPage === 'home' && activeSection === 'contact'}
              onClick={() => navigateToPortfolio('contact')}
            />
          </nav>

          {/* Zone 3: Single Primary Action + Mobile Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() =>
                handleSelectInquiryTopicAndScroll(
                  'Website Development (Business / Portfolio / Landing Page)'
                )
              }
              className="group hidden xl:inline-flex items-center gap-2 whitespace-nowrap shrink-0 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-700 dark:text-[#F2F0EB] hover:text-[#E10600] transition-colors cursor-pointer"
            >
              <span aria-hidden="true" className="w-[7px] h-[7px] rounded-full bg-[#E10600] animate-noir-blink" />
              <span>Available for work</span>
            </button>

            <NoirMenuButton
              open={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="lg:hidden"
            />
          </div>
        </div>

      </header>

      {/* Template full-screen mobile / tablet menu */}
      <NoirMobileMenu
        open={mobileMenuOpen}
        onClose={closeMobileMenu}
        email={personal.emailAddress}
        location="Delhi"
        liveTime={liveDateTime.time}
        year={new Date().getFullYear()}
        socials={[
          { short: 'IG', label: 'Instagram', href: personal.instagramUrl },
          { short: 'IN', label: 'LinkedIn', href: personal.linkedinUrl },
          { short: 'WA', label: 'WhatsApp', href: personal.whatsappDirectUrl },
        ]}
        items={[
          { label: 'Home', onSelect: () => navigateToPortfolio(), active: currentPage === 'home' && activeSection === 'home' },
          { label: 'Services', onSelect: () => navigateToPortfolio('freelance'), active: currentPage === 'home' && activeSection === 'freelance' },
          { label: 'Work', onSelect: () => navigateToPortfolio('projects'), active: currentPage === 'home' && activeSection === 'projects' },
          { label: 'Process', onSelect: () => navigateToPortfolio('process'), active: currentPage === 'home' && activeSection === 'process' },
          { label: 'About', onSelect: navigateToAbout, active: currentPage === 'about' },
          { label: 'Contact', onSelect: () => navigateToPortfolio('contact'), active: currentPage === 'home' && activeSection === 'contact' },
          { label: 'Catalog', onSelect: navigateToServices, active: currentPage === 'services' },
        ]}
      />

      {/* =====================================================================
          ROUTE SWITCH
      ===================================================================== */}
      {currentPage === 'services' ? (
        <main>
          <FreelanceServicesPage
            onBackToPortfolio={() => navigateToPortfolio()}
            onDiscussProject={(topic) => handleSelectInquiryTopicAndScroll(topic)}
            buildWhatsappLink={buildWhatsappLink}
            buildMailtoLink={buildMailtoLink}
          />
        </main>
      ) : currentPage === 'about' ? (
        <main>
          <AboutPage
            onBackToPortfolio={() => navigateToPortfolio()}
            onNavigateToServices={navigateToServices}
            onNavigateToProjects={() => navigateToPortfolio('projects')}
            onOpenResumeModal={() => setIsResumeModalOpen(true)}
            onDiscussProject={(topic) => handleSelectInquiryTopicAndScroll(topic)}
            profileImgSrc={profileImgSrc}
            usingFallbackAvatar={usingFallbackAvatar}
            onImageError={handleProfileImageError}
          />
        </main>
      ) : (
        <main>
          {/* ===================================================================
              B. HERO — NOIR SIGNAL OPENING SHOT (Liquid WebGL + MouseGlow + Runner)
          =================================================================== */}
          <section
            id="home"
            className="relative min-h-[calc(100svh-4rem)] flex flex-col justify-between pt-8 pb-10 sm:pt-10 sm:pb-12 bg-[#050505] text-[#F2F0EB] overflow-hidden"
          >
            {/* Framer `Liquid Signal` Real-Time WebGL Crimson Turbulence Shader */}
            <NoirLiquidCanvas />

            {/* Framer `Hero Shade` + `Vignette` Cinema Depth Overlays */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'linear-gradient(180deg, rgba(5,5,5,0.72) 0%, rgba(5,5,5,0.22) 38%, rgba(5,5,5,0.38) 68%, rgba(5,5,5,0.96) 100%)',
              }}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'radial-gradient(55% 55% at 50% 50%, rgba(5,5,5,0) 35%, rgba(5,5,5,0.85) 100%)',
              }}
            />

            {/* Framer `Mouse Glow` Dynamic Crimson Pointer Spotlight */}
            <NoirMouseGlow />

            <NoirScrollBlur className="max-w-6xl w-full mx-auto px-4 sm:px-6 relative z-10 flex-1 flex flex-col justify-between gap-8">
              {/* Framer Top Timecode & Live REC Metadata Strip */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#F2F0EB]/12 font-mono text-[11px] uppercase tracking-[0.16em] text-[#A8A8A8]">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 text-[#E10600] font-semibold">
                    <span className="w-2 h-2 rounded-full bg-[#E10600] animate-pulse shadow-[0_0_12px_#E10600]" />
                    <span>REC</span>
                  </span>
                  <span aria-hidden="true">—</span>
                  <span className="text-[#F2F0EB]">(01) ADITYA RAJ</span>
                  <span aria-hidden="true" className="hidden sm:inline">—</span>
                  <span className="hidden sm:inline">REMOTE WORLDWIDE</span>
                </div>

                <div className="flex flex-wrap items-center justify-end gap-3 sm:gap-4 ml-auto">
                  <div
                    className="inline-flex items-center gap-2 tabular-nums font-mono text-[10px] sm:text-[11px] tracking-[0.14em] whitespace-nowrap"
                    aria-label="Current local date and time"
                  >
                    <span className="text-[#A8A8A8]">{liveDateTime.date}</span>
                    <span aria-hidden="true" className="text-[#E10600]">
                      ·
                    </span>
                    <span className="text-[#F2F0EB] font-semibold">{liveDateTime.time}</span>
                  </div>

                  <button
                    onClick={toggleTheme}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-md border border-[#F2F0EB]/20 hover:border-[#E10600] text-[11px] font-mono uppercase tracking-wider text-[#F2F0EB] transition-colors cursor-pointer whitespace-nowrap bg-[#0B0B0B]/70 backdrop-blur-md"
                    aria-label="Toggle color theme"
                  >
                    {theme === 'dark' ? (
                      <>
                        <Sun className="w-3.5 h-3.5 text-amber-400" />
                        <span>Paper Light</span>
                      </>
                    ) : (
                      <>
                        <Moon className="w-3.5 h-3.5 text-[#E10600]" />
                        <span>Noir Dark</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* 2-Column Asymmetric Luxury Split */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center my-auto">
                {/* Left Column: Monumental Display Type */}
                <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
                  <div className="space-y-5">
                    <div className="h-[2px] w-20 bg-[#E10600] animate-ts-bar" aria-hidden="true" />
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#E10600] animate-ts-fade font-semibold">
                      DIGITAL · TECHNOLOGY &amp; INNOVATION
                    </p>

                    <h1
                      className="font-display font-normal uppercase text-[#F2F0EB] leading-[0.90] tracking-tight"
                      style={{
                        fontSize: 'clamp(3.1rem, 7vw, 6.2rem)',
                        textWrap: 'balance',
                      }}
                    >
                      <span className="animate-ts-word" style={{ animationDelay: '0.04s' }}>
                        <span className="noir-grad-text pr-[0.22em]">CREATIVE</span>
                      </span>
                      <span
                        className="animate-ts-word font-editorial italic lowercase font-normal text-[#E10600] pr-2"
                        style={{ animationDelay: '0.12s' }}
                      >
                        developer{' '}
                      </span>
                      <span className="animate-ts-word mr-[0.22em]" style={{ animationDelay: '0.20s' }}>
                        &amp; DIGITAL
                      </span>
                      <span
                        className="animate-ts-word font-editorial italic lowercase font-normal text-[#E10600]"
                        style={{ animationDelay: '0.28s' }}
                      >
                        studio.
                      </span>
                    </h1>
                  </div>

                </div>

                {/* Right Column: Framer Grayscale->Color 3D Portrait Plate */}
                <ScrollReveal direction="scale" delayMs={100} className="lg:col-span-5">
                  <HeroProfile3D
                    name={personal.name}
                    headline={personal.professionalHeadline}
                    profileImgSrc={profileImgSrc}
                    usingFallbackAvatar={usingFallbackAvatar}
                    onImageError={handleProfileImageError}
                    emailAddress={personal.emailAddress}
                    linkedinUrl={personal.linkedinUrl}
                  />
                </ScrollReveal>
              </div>

              {/* Bottom Hero Row: Metrics Strip + Framer `Scroll Cue` Animated Runner */}
              <div className="pt-6 border-t border-[#F2F0EB]/12 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10 flex-1">
                  {studioBrand.metrics.map((m) => (
                    <div key={m.label} className="space-y-1">
                      <p className="font-display text-3xl sm:text-4xl text-[#E10600] tabular-nums leading-none">
                        {m.value}
                      </p>
                      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#A8A8A8]">
                        {m.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Framer Exact `Scroll Cue` Vertical Track & Runner */}
                <a
                  href="#projects"
                  className="hidden sm:inline-flex items-end gap-4 group shrink-0"
                  aria-label="Scroll to Selected Works"
                >
                  <div className="text-right font-mono text-[10px] uppercase tracking-[0.2em] text-[#A8A8A8] group-hover:text-[#F2F0EB] transition-colors space-y-0.5">
                    <p className="text-[#E10600]">SCROLL TO EXPLORE</p>
                    <p>EST. 2022 — ©2026</p>
                  </div>
                  <div
                    aria-hidden="true"
                    className="relative w-px h-14 bg-[#F2F0EB]/25 overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-px h-[18px] bg-[#E10600] animate-noir-runner" />
                  </div>
                </a>
              </div>
            </NoirScrollBlur>
          </section>

          <NoirHairlineTrack />

          {/* Signature dual kinetic ribbon (Framer Noir Signal) */}
          <NoirDualMarquee />

          {/* 01 — Manifesto: typewriter statement on bone (Framer Noir Signal) */}
          <NoirTypeManifesto signature={`${personal.name.toUpperCase()}, DELHI, ${new Date().getFullYear()}`} />

          <NoirHairlineTrack />

          {/* ===================================================================
              D. 02 — SELECTED WORKS & EXPANDING FILMSTRIP ((02/06))
          =================================================================== */}
          <section id="projects" className="py-20 sm:py-28">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
              <ScrollReveal direction="up">
                <div className="space-y-6">
                  <NoirSectionBar
                    indexLabel="02 — SELECTED WORKS"
                    sectionCode="(02/06)"
                    rightLabel="LIVE INTERACTIVE PREVIEW"
                  />

                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-3 max-w-2xl">
                      <h2 data-noir-no-reveal=""
                        className="font-display text-4xl sm:text-6xl font-normal uppercase tracking-tight text-[#111111] dark:text-[#F2F0EB] leading-[0.94]"
                        style={{ textWrap: 'balance' }}
                      >
                      <NoirWords>
                        SELECTED{' '}
                        <span className="font-editorial italic lowercase font-normal text-[#E10600]">
                          works
                        </span>{' '}
                        (0{projects.length})
                      </NoirWords>
                    </h2>
                      <NoirBlurWords className="text-sm sm:text-base text-zinc-600 dark:text-[#A8A8A8]" text={`Glide through the interactive filmstrip or inspect live client viewports below — open any live site or request a customized version for your business.`} />
                    </div>

                    {/* Minimal Segmented Project Filter */}
                    <div
                      role="tablist"
                      aria-label="Filter projects by domain"
                      className="flex flex-wrap items-center gap-1 p-1 rounded-md bg-zinc-200/70 dark:bg-[#0E0E0E] border border-zinc-300/70 dark:border-[#F2F0EB]/12 w-fit"
                    >
                      {[
                        'all',
                        'Website Design & Development',
                        'Android & Backend',
                        'Web Application',
                      ].map((domain) => (
                        <button
                          key={domain}
                          role="tab"
                          aria-selected={selectedProjectDomain === domain}
                          onClick={() => setSelectedProjectDomain(domain)}
                          className={`px-3 py-1.5 rounded-sm font-mono text-[11px] uppercase tracking-wider transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                            selectedProjectDomain === domain
                              ? 'bg-[#E10600] text-white'
                              : 'text-zinc-600 dark:text-[#A8A8A8] hover:text-[#111111] dark:hover:text-[#F2F0EB]'
                          }`}
                        >
                          {domain === 'all' ? `All (${projects.length})` : domain}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Framer Expanding Cinema Filmstrip & Lightbox Showreel */}
              <NoirFilmGallery
                projects={filteredProjects}
                onInspectCaseStudy={handleOpenProjectCaseStudy}
                onRequestCustom={(topic) => handleSelectInquiryTopicAndScroll(topic)}
                buildWhatsappLink={buildWhatsappLink}
              />

            </div>
          </section>

          <NoirHairlineTrack />

          {/* ===================================================================
              E. 03 — SERVICES ("WHAT WE DO" — ALL 12 SERVICES ARCHITECTURAL ACCORDION + LIVE STAGE)
              (No Poster/Pamphlet Image — Strictly Services from the Catalog)
          =================================================================== */}
          {/* 04.5 — Gallery stills (Framer Noir Signal) */}
          <NoirStillsGallery />

          <section id="freelance" className="py-20 sm:py-28">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
              <ScrollReveal direction="up">
                <div className="space-y-5">
                  <NoirSectionBar
                    indexLabel="03 — SERVICES"
                    sectionCode="(03/06)"
                    rightLabel="SERVICE CATALOG"
                  />
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-3 max-w-2xl">
                    <h2 data-noir-no-reveal=""
                      className="font-display text-4xl sm:text-6xl font-normal uppercase tracking-tight text-[#111111] dark:text-[#F2F0EB] leading-[0.94]"
                      style={{ textWrap: 'balance' }}
                    >
                      <NoirWords>
                      WHAT WE{' '}
                      <span className="font-editorial italic lowercase font-normal text-[#E10600]">
                        build.
                      </span>
                      </NoirWords>
                    </h2>
                    <NoirBlurWords
                      className="text-sm sm:text-base text-zinc-600 dark:text-[#A8A8A8] leading-relaxed"
                      text={`${studioBrand.description} Select any of our 12 core services below to inspect deliverables and live previews.`}
                    />
                  </div>

                  {/* Minimal Category Tabs */}
                  <div className="flex flex-col sm:items-end gap-3">
                    <div
                      role="tablist"
                      aria-label="Filter studio services"
                      className="flex flex-wrap items-center gap-1 p-1 rounded-md bg-zinc-200/70 dark:bg-[#0E0E0E] border border-zinc-300/70 dark:border-[#F2F0EB]/12 w-fit"
                    >
                      {[
                        { id: 'all', label: 'All 12 Services' },
                        { id: 'web', label: 'Web & Store' },
                        { id: 'apps', label: 'Apps, CRM & SaaS' },
                        { id: 'growth', label: 'Branding, Ads & IT' },
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          type="button"
                          role="tab"
                          aria-selected={selectedServiceCategory === tab.id}
                          onClick={() => {
                            const nextCat = tab.id as typeof selectedServiceCategory;
                            setSelectedServiceCategory(nextCat);
                            const nextList =
                              nextCat === 'all'
                                ? freelanceSection.services
                                : freelanceSection.services.filter((s) => s.category === nextCat);
                            if (nextList[0]) {
                              setActiveServiceId(nextList[0].id);
                            }
                          }}
                          className={`px-3 py-1.5 rounded-sm font-mono text-[11px] uppercase tracking-wider transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                            selectedServiceCategory === tab.id
                              ? 'bg-[#E10600] text-white'
                              : 'text-zinc-600 dark:text-[#A8A8A8] hover:text-[#111111] dark:hover:text-[#F2F0EB]'
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={navigateToServices}
                      className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-[#E10600] hover:underline cursor-pointer"
                    >
                      <span>Open Full 12 Services View</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
              </ScrollReveal>

              {/* Framer Luxury Asymmetric Service Rows (Left) + Sticky Interactive Inspector (Right) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                {/* Left Column: Razor-Sharp Hairline Service Accordion Rows */}
                <div className="lg:col-span-7 divide-y divide-zinc-300/70 dark:divide-[#F2F0EB]/12 border-t border-b border-zinc-300/70 dark:border-[#F2F0EB]/12">
                  {filteredServices.map((service, si) => {
                    const isActive = activeService.id === service.id;
                    return (
                      <motion.div
                        key={service.id}
                        initial={{ opacity: 0, x: -24, filter: 'blur(10px)' }}
                        whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                        viewport={{ once: true, amount: 0.3 }}
                        whileHover={{ x: 8 }}
                        transition={{ duration: 0.7, delay: Math.min(si, 6) * 0.06, ease: [0.16, 1, 0.3, 1] }}
                        className="transition-colors"
                      >
                        <button
                          type="button"
                          onClick={(e) => {
                            setActiveServiceId(service.id);
                            // Phones/tablets: the previously open row collapses above, so bring the
                            // tapped title back under the header instead of landing mid-details.
                            const row = e.currentTarget;
                            if (window.innerWidth < 1024) {
                              requestAnimationFrame(() =>
                                requestAnimationFrame(() => row.scrollIntoView({ behavior: 'smooth', block: 'start' }))
                              );
                            }
                          }}
                          onMouseEnter={() => {
                            if (window.matchMedia?.('(hover: hover) and (pointer: fine)').matches) setActiveServiceId(service.id);
                          }}
                          aria-expanded={isActive}
                          className="scroll-mt-20 w-full py-5 flex items-center justify-between gap-4 text-left cursor-pointer group"
                        >
                          <div className="flex items-baseline gap-4 sm:gap-6 min-w-0">
                            <span
                              className={`font-mono text-xs font-semibold shrink-0 transition-colors ${
                                isActive
                                  ? 'text-[#E10600]'
                                  : 'text-zinc-500 dark:text-[#A8A8A8] group-hover:text-[#E10600]'
                              }`}
                            >
                              {service.index}
                            </span>
                            <div className="min-w-0">
                              <h3
                                className={`font-display text-2xl sm:text-3xl tracking-tight uppercase transition-colors ${
                                  isActive
                                    ? 'text-[#E10600]'
                                    : 'text-[#111111] dark:text-[#F2F0EB] group-hover:text-[#E10600]'
                                }`}
                              >
                                {service.title}
                              </h3>
                              <p className="text-xs sm:text-sm text-zinc-600 dark:text-[#A8A8A8] mt-1">
                                {service.tagline}
                              </p>
                            </div>
                          </div>

                          <span
                            className={`w-8 h-8 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                              isActive
                                ? 'border-[#E10600] text-[#E10600]'
                                : 'border-zinc-300 dark:border-[#F2F0EB]/15 text-zinc-500 dark:text-[#A8A8A8] group-hover:border-[#E10600]'
                            }`}
                          >
                            {isActive ? (
                              <Minus className="w-3.5 h-3.5" />
                            ) : (
                              <Plus className="w-3.5 h-3.5" />
                            )}
                          </span>
                        </button>

                        {/* Expanded Inline Details on Mobile / Active Focus */}
                        {isActive && (
                          <motion.div
                            key={`detail-${service.id}`}
                            initial={{ opacity: 0, y: -8, filter: 'blur(8px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                            className="pb-6 pl-9 sm:pl-12 space-y-4"
                          >
                            <NoirBlurWords
                              key={`desc-${service.id}`}
                              className="text-xs sm:text-sm text-zinc-700 dark:text-[#F2F0EB]/85 leading-relaxed"
                              text={service.description}
                            />

                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-zinc-600 dark:text-[#A8A8A8]">
                              {service.deliverables.map((item, i) => (
                                <motion.li
                                  key={i}
                                  initial={{ opacity: 0, x: -10, filter: 'blur(6px)' }}
                                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                                  transition={{ duration: 0.5, delay: 0.15 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                                  className="flex items-start gap-2"
                                >
                                  <span className="text-[#E10600] font-mono">·</span>
                                  <span>{item}</span>
                                </motion.li>
                              ))}
                            </ul>

                            {/* Mobile preview + action */}
                            <div className="lg:hidden space-y-3 pt-2">
                              <ServiceMockupVisual mockupType={service.mockupType} />
                            </div>

                            <div className="flex flex-wrap items-center gap-2.5 pt-1">
                              <button
                                type="button"
                                onClick={() =>
                                  handleSelectInquiryTopicAndScroll(service.inquiryTopic)
                                }
                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-[#E10600] hover:bg-[#ff1e17] text-white font-mono text-[11px] uppercase tracking-wider font-semibold transition-colors cursor-pointer"
                              >
                                <span>Start {service.title}</span>
                                <ArrowUpRight className="w-3.5 h-3.5" />
                              </button>

                              <a
                                href={buildWhatsappLink(service.inquiryTopic)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md border border-zinc-300 dark:border-[#F2F0EB]/20 hover:border-emerald-500 font-mono text-[11px] uppercase tracking-wider text-zinc-800 dark:text-[#F2F0EB] transition-colors"
                              >
                                <MessageSquare className="w-3.5 h-3.5 text-emerald-500" />
                                <span>WhatsApp</span>
                              </a>

                              {service.featuredDemoUrl && (
                                <a
                                  href={service.featuredDemoUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md border border-zinc-300 dark:border-[#F2F0EB]/20 hover:border-[#E10600] font-mono text-[11px] uppercase tracking-wider text-[#E10600] font-semibold transition-colors"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                  <span>Live Sample</span>
                                </a>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>

                {/* Right Column: Sticky Luxury Service Preview Stage (Desktop) */}
                <div className="hidden lg:block lg:col-span-5 lg:sticky lg:top-24">
                  <div className="rounded-xl bg-white dark:bg-[#0B0B0B] border border-zinc-300/80 dark:border-[#F2F0EB]/12 p-5 space-y-5">
                    <div className="flex items-center justify-between gap-2 pb-3 border-b border-zinc-200 dark:border-[#F2F0EB]/10 font-mono text-[11px] uppercase tracking-wider">
                      <span className="text-[#E10600] font-semibold">
                        {activeService.index} LIVE PREVIEW
                      </span>
                      <span className="text-zinc-500 dark:text-[#A8A8A8] truncate">
                        {activeService.idealFor}
                      </span>
                    </div>

                    <motion.div
                      key={`stage-${activeService.id}`}
                      initial={{ opacity: 0, scale: 0.97, filter: 'blur(10px)' }}
                      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <ServiceMockupVisual mockupType={activeService.mockupType} />
                    </motion.div>

                    <div className="space-y-3" key={`copy-${activeService.id}`}>
                      <h3 className="font-display text-3xl uppercase tracking-tight text-[#111111] dark:text-[#F2F0EB]">
                        <NoirWords stagger={0.05}>{activeService.title}</NoirWords>
                      </h3>
                      <NoirBlurWords
                        className="text-xs sm:text-sm text-zinc-600 dark:text-[#A8A8A8] leading-relaxed"
                        text={activeService.description}
                      />
                    </div>

                    <div className="pt-3 border-t border-zinc-200 dark:border-[#F2F0EB]/10 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          handleSelectInquiryTopicAndScroll(activeService.inquiryTopic)
                        }
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-[#E10600] hover:bg-[#ff1e17] text-white font-mono text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer"
                      >
                        <span>Customize This Service</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>

                      {activeService.featuredDemoUrl && (
                        <a
                          href={activeService.featuredDemoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-md border border-zinc-300 dark:border-[#F2F0EB]/20 hover:border-[#E10600] font-mono text-xs uppercase tracking-wider text-zinc-800 dark:text-[#F2F0EB] transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5 text-[#E10600]" />
                          <span>Live</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <NoirHairlineTrack />

          {/* ===================================================================
              F. 04 — PROCESS, CAPABILITIES & ORBIT LAUNCH CTA ((04/06))
          =================================================================== */}
          {/* 06 — Clients wall (Framer Noir Signal) */}
          <NoirClientsWall />

          <section id="process" className="relative py-20 sm:py-28 overflow-clip">
            {/* Framer Crimson Atmospheric Ambient Red Glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[780px] h-[420px] rounded-full opacity-25 dark:opacity-40 blur-3xl"
              style={{
                background:
                  'radial-gradient(circle, rgba(225,6,0,0.45) 0%, rgba(225,6,0,0.08) 55%, transparent 100%)',
              }}
            />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-14 relative z-10">
              <ScrollReveal direction="up">
                <div className="space-y-5">
                  <NoirSectionBar
                    indexLabel="04 — PROCESS & CAPABILITIES"
                    sectionCode="(04/06)"
                    rightLabel="DISCOVER → LAUNCH"
                  />

                  <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                    <div className="space-y-3 max-w-2xl">
                      <h2 data-noir-no-reveal="" className="font-display text-4xl sm:text-6xl uppercase tracking-tight text-[#111111] dark:text-[#F2F0EB] leading-[0.94]">
                      <NoirWords>
                        HOW IT{' '}
                        <span className="font-editorial italic lowercase font-normal text-[#E10600]">
                          happens.
                        </span>
                      </NoirWords>
                    </h2>
                      <NoirBlurWords className="text-sm sm:text-base text-zinc-600 dark:text-[#A8A8A8]" text={`Structured sprint execution paired with full-stack & mobile engineering precision.`} />
                    </div>

                    {/* Framer Rotating Orbit Ring CTA */}
                    <NoirOrbitCTA
                      sublabel="READY TO LAUNCH?"
                      label="START PROJECT"
                      onClick={() =>
                        handleSelectInquiryTopicAndScroll(
                          'Website Development (Business / Portfolio / Landing Page)'
                        )
                      }
                    />
                  </div>
                </div>
              </ScrollReveal>

              {/* Sticky stacking step cards (Framer Noir Signal "How it happens") */}
              <NoirStackCards steps={STUDIO_PROCESS_STEPS} />
            </div>
          </section>

          <NoirHairlineTrack />

          {/* ===================================================================
              G. 05 — BEHIND THE FRAME · ABOUT, ACADEMICS & CV ((05/06))
          =================================================================== */}
          {/* 10 — Words (Framer Noir Signal) */}
          <NoirTestimonials />

          <NoirAboutSection
            profileSrc={profileImgSrc}
            onProfileError={() => setProfileImgSrc(personal.profileFallbackSvg)}
            onOpenAbout={navigateToAbout}
            onOpenCv={() => setIsResumeModalOpen(true)}
          />

          <NoirHairlineTrack />

          {/* ===================================================================
              H. BEFORE YOU ASK · FAQ ACCORDION (Matching Framer Section 12)
          =================================================================== */}
          <section id="faq" className="py-20 sm:py-28 bg-[#E10600] text-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
              <ScrollReveal direction="up">
                <div className="space-y-4">
                  <NoirSectionBar
                    indexLabel="QUESTIONS · BEFORE WE START"
                    sectionCode="FAQ"
                    rightLabel="TIMELINE & DELIVERY"
                  />
                  <h2 data-noir-no-reveal="" className="font-display text-4xl sm:text-6xl uppercase tracking-tight text-[#050505] leading-[0.94]">
                      <NoirWords>
                    BEFORE YOU{' '}
                    <span className="font-editorial italic lowercase font-normal !text-white">
                      ask.
                    </span>
                      </NoirWords>
                    </h2>
                  <NoirBlurWords className="text-sm sm:text-base text-white/80 max-w-2xl" text={`The questions clients and brands ask most before starting a custom build.`} />
                </div>
              </ScrollReveal>

              <div className="divide-y divide-white/25 border-t border-b border-white/25">
                {faqs.map((faq) => {
                  const isOpen = openFaqIndex === faq.index;
                  return (
                    <div key={faq.index} className="py-5">
                      <button
                        type="button"
                        onClick={() => setOpenFaqIndex(isOpen ? null : faq.index)}
                        aria-expanded={isOpen}
                        className="w-full flex items-center justify-between gap-4 text-left cursor-pointer group"
                      >
                        <div className="flex items-baseline gap-4 sm:gap-6 min-w-0">
                          <span className="font-mono text-xs text-white font-semibold shrink-0">
                            {faq.index}
                          </span>
                          <span className="font-sans text-base sm:text-lg font-medium text-white group-hover:text-[#050505] transition-colors">
                            {faq.question}
                          </span>
                        </div>
                        <span className="w-8 h-8 rounded-md border border-white/40 flex items-center justify-center text-white/80 group-hover:border-[#050505] group-hover:text-white transition-colors shrink-0">
                          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        </span>
                      </button>

                      {isOpen && (
                        <div className="pt-3 pl-8 sm:pl-11 pr-10 text-sm text-white/80 leading-relaxed max-w-3xl">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <NoirHairlineTrack />

          {/* ===================================================================
              I. 06 — LET'S CREATE SOMETHING UNREAL · CONTACT ((06/06))
          =================================================================== */}
          <section id="contact" className="relative py-20 sm:py-28 overflow-hidden">
            {/* Framer Crimson Atmospheric Ambient Red Glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[820px] h-[380px] rounded-full opacity-20 dark:opacity-35 blur-3xl"
              style={{
                background:
                  'radial-gradient(circle, rgba(225,6,0,0.4) 0%, rgba(225,6,0,0.06) 55%, transparent 100%)',
              }}
            />
            <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-14 relative z-10">
              <ScrollReveal direction="up">
                <div className="space-y-4">
                  <NoirSectionBar
                    indexLabel="06 — GET IN TOUCH"
                    sectionCode="(06/06)"
                    rightLabel="WHATSAPP · EMAIL · CALL"
                  />
                  <h2 data-noir-no-reveal=""
                    className="font-display text-4xl sm:text-7xl uppercase tracking-tight text-[#111111] dark:text-[#F2F0EB] leading-[0.90] max-w-4xl"
                    style={{ textWrap: 'balance' }}
                  >
                      <NoirWords>
                    LET&apos;S CREATE SOMETHING{' '}
                    <span className="font-editorial italic lowercase font-normal text-[#E10600]">
                      unreal.
                    </span>
                      </NoirWords>
                    </h2>
                  <NoirBlurWords className="text-sm sm:text-base text-zinc-600 dark:text-[#A8A8A8] max-w-2xl leading-relaxed" text={`Open for freelance websites, custom apps, CRM systems & Meta Ads campaigns. Select your requirement below and message directly on WhatsApp or Email.`} />
                </div>
              </ScrollReveal>

              <NoirContactBanner
                email={personal.emailAddress}
                phone={personal.mobileNumber}
                socials={[
                  { label: 'Instagram', href: personal.instagramUrl },
                  { label: 'LinkedIn', href: personal.linkedinUrl },
                  { label: 'WhatsApp', href: personal.whatsappDirectUrl },
                ]}
                onGetInTouch={() => window.open(personal.whatsappDirectUrl, '_blank', 'noopener,noreferrer')}
              />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Direct Channels */}
                <div className="lg:col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-6 rounded-xl bg-white dark:bg-[#0B0B0B] border border-zinc-300/80 dark:border-[#F2F0EB]/12 flex flex-col justify-between">
                    <div className="space-y-2">
                      <MessageSquare className="w-5 h-5 text-emerald-500" />
                      <h3 className="font-display text-2xl uppercase text-[#111111] dark:text-[#F2F0EB]">
                        WhatsApp Direct
                      </h3>
                      <p className="text-xs font-mono text-zinc-600 dark:text-[#A8A8A8]">
                        {personal.mobileNumber}
                      </p>
                    </div>

                    <div className="mt-6 flex items-center gap-2">
                      <a
                        href={personal.whatsappDirectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs uppercase tracking-wider font-semibold transition-colors whitespace-nowrap"
                      >
                        <span>Chat Now</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href={`tel:${personal.mobileNumber.replace(/\s+/g, '')}`}
                        className="px-3 py-2.5 rounded-md border border-zinc-300 dark:border-[#F2F0EB]/20 text-zinc-700 dark:text-[#F2F0EB] hover:border-[#E10600] transition-colors"
                        aria-label="Call mobile number"
                      >
                        <Phone className="w-4 h-4" />
                      </a>
                      <button
                        type="button"
                        onClick={() => handleCopyText(personal.mobileNumber, 'phone')}
                        className="px-3 py-2.5 rounded-md border border-zinc-300 dark:border-[#F2F0EB]/20 text-zinc-700 dark:text-[#F2F0EB] hover:border-[#E10600] transition-colors cursor-pointer"
                        aria-label="Copy mobile number"
                      >
                        {copiedField === 'phone' ? (
                          <Check className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="p-6 rounded-xl bg-white dark:bg-[#0B0B0B] border border-zinc-300/80 dark:border-[#F2F0EB]/12 flex flex-col justify-between">
                    <div className="space-y-2">
                      <Mail className="w-5 h-5 text-[#E10600]" />
                      <h3 className="font-display text-2xl uppercase text-[#111111] dark:text-[#F2F0EB]">
                        Studio Email
                      </h3>
                      <p className="text-xs font-mono text-zinc-600 dark:text-[#A8A8A8] break-all">
                        {personal.emailAddress}
                      </p>
                    </div>

                    <div className="mt-6 flex items-center gap-2">
                      <a
                        href={buildMailtoLink()}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-md border border-zinc-300 dark:border-[#F2F0EB]/20 font-mono text-xs uppercase tracking-wider font-semibold text-zinc-800 dark:text-[#F2F0EB] hover:border-[#E10600] transition-colors whitespace-nowrap"
                      >
                        <span>Send Email</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                      <button
                        type="button"
                        onClick={() => handleCopyText(personal.emailAddress, 'email')}
                        className="px-3 py-2.5 rounded-md border border-zinc-300 dark:border-[#F2F0EB]/20 text-zinc-700 dark:text-[#F2F0EB] hover:border-[#E10600] transition-colors cursor-pointer"
                        aria-label="Copy email address"
                      >
                        {copiedField === 'email' ? (
                          <Check className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="sm:col-span-2 lg:col-span-1 p-6 rounded-xl bg-white dark:bg-[#0B0B0B] border border-zinc-300/80 dark:border-[#F2F0EB]/12 flex flex-col justify-between">
                    <div className="space-y-1.5">
                      <Linkedin className="w-5 h-5 text-sky-500" />
                      <h3 className="font-display text-2xl uppercase text-[#111111] dark:text-[#F2F0EB]">
                        LinkedIn
                      </h3>
                      <p className="text-xs font-mono text-zinc-500 dark:text-[#A8A8A8] break-all">
                        {personal.linkedinHandle}
                      </p>
                    </div>

                    <a
                      href={personal.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-[#111111] text-white dark:bg-[#F2F0EB] dark:text-[#050505] hover:opacity-90 font-mono text-xs uppercase tracking-wider font-semibold transition-opacity"
                    >
                      <span>Connect</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>

                </div>

              </div>

            </div>
          </section>
        </main>
      )}

      {/* =====================================================================
          J. FRAMER NOIR SIGNAL STUDIO FOOTER
      ===================================================================== */}
      <NoirTalkRibbon year={new Date().getFullYear()} />
      <NoirStudioFooter
        onNavigate={navigateToPortfolio}
        onServices={navigateToServices}
        onAbout={navigateToAbout}
        onOpenCv={() => setIsResumeModalOpen(true)}
        liveTime={liveDateTime.time}
      />

      {/* Interactive Case Study / Live Viewport Modal */}
      <ProjectDetailModal
        project={activeProjectModal}
        onClose={() => setActiveProjectModal(null)}
        onDiscussSimilar={(topic: string) => handleSelectInquiryTopicAndScroll(topic)}
      />

      {/* Official One-Page CV Modal */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />
    </div>
  );
}
