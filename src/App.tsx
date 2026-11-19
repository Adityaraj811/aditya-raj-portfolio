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
  Github,
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
  type PublicGithubRepo,
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
  NoirStillsGallery,
  NoirClientsWall,
  NoirExperience,
  NoirRecognition,
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

interface GithubApiRepo {
  name: string;
  html_url: string;
  homepage: string | null;
  language: string | null;
  description: string | null;
}

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
    verifiedGithubRepos,
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

  // Live GitHub Repository Sync (@Adityaraj811 public repos + verified deployments)
  const [githubRepos, setGithubRepos] = useState<PublicGithubRepo[]>(verifiedGithubRepos);
  useEffect(() => {
    let active = true;
    fetch(`https://api.github.com/users/${personal.githubUsername}/repos?per_page=100&sort=updated`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data: GithubApiRepo[] | null) => {
        if (!active || !Array.isArray(data) || data.length === 0) return;
        const apiMapped: PublicGithubRepo[] = data.map((repo) => ({
          name: repo.name,
          url: repo.html_url,
          homepage: repo.homepage || undefined,
          language: repo.language || 'TypeScript',
          description:
            repo.description || `Source repository for ${repo.name} by ${personal.name}.`,
          category: `${repo.language || 'Web'} · Public GitHub Repository`,
          visibilityLabel: 'Public GitHub Repo',
        }));

        const apiNames = new Set(apiMapped.map((r) => r.name.toLowerCase()));
        const remainingVerified = verifiedGithubRepos.filter(
          (v) => !apiNames.has(v.name.toLowerCase().split(' ')[0])
        );
        setGithubRepos([...apiMapped, ...remainingVerified]);
      })
      .catch(() => {
        // Silent fallback to verified repositories
      });
    return () => {
      active = false;
    };
  }, [personal.githubUsername, personal.name, verifiedGithubRepos]);

  // Page Routing State ('home' | 'services' | 'about')
  const [currentPage, setCurrentPage] = useState<PageRoute>(() => detectInitialRoute());
  const [activeSection, setActiveSection] = useState<string>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

      {/* Top Crimson Scroll Signal Line */}
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 h-[2px] z-50 pointer-events-none origin-left bg-[#E10600]"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />

      {/* =====================================================================
          A. STICKY 3-ZONE EDITORIAL TOP BAR (Framer Noir Signal Contract)
      ===================================================================== */}
      <header className="sticky top-0 z-40 w-full bg-[#F5F4F0]/90 dark:bg-[#050505]/90 backdrop-blur-xl border-b border-zinc-300/70 dark:border-[#F2F0EB]/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single Text Wordmark */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              navigateToPortfolio();
            }}
            className="font-display text-xl sm:text-2xl tracking-wide uppercase text-[#111111] dark:text-[#F2F0EB] whitespace-nowrap shrink-0 cursor-pointer"
          >
            ADITYA RAJ
          </a>

          {/* Zone 2: Clean Single-Line Typographic Nav Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-7 text-[11px] font-mono uppercase tracking-[0.12em] text-zinc-600 dark:text-[#A8A8A8]"
          >
            <a
              href="#freelance"
              onClick={(e) => {
                e.preventDefault();
                navigateToPortfolio('freelance');
              }}
              className={`transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4 ${
                currentPage === 'home' && activeSection === 'freelance'
                  ? 'text-[#E10600] font-semibold'
                  : 'hover:text-[#111111] dark:hover:text-[#F2F0EB]'
              }`}
            >
              01 Services
            </a>

            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                navigateToPortfolio('projects');
              }}
              className={`transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4 ${
                currentPage === 'home' && activeSection === 'projects'
                  ? 'text-[#E10600] font-semibold'
                  : 'hover:text-[#111111] dark:hover:text-[#F2F0EB]'
              }`}
            >
              02 Work
            </a>

            <a
              href="#process"
              onClick={(e) => {
                e.preventDefault();
                navigateToPortfolio('process');
              }}
              className={`transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4 ${
                currentPage === 'home' && activeSection === 'process'
                  ? 'text-[#E10600] font-semibold'
                  : 'hover:text-[#111111] dark:hover:text-[#F2F0EB]'
              }`}
            >
              03 Process
            </a>

            <a
              href={`${getNormalizedBase()}about`}
              onClick={(e) => {
                e.preventDefault();
                navigateToAbout();
              }}
              className={`transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4 ${
                currentPage === 'about' ||
                (currentPage === 'home' && activeSection === 'about-gateway')
                  ? 'text-[#E10600] font-semibold'
                  : 'hover:text-[#111111] dark:hover:text-[#F2F0EB]'
              }`}
            >
              04 About
            </a>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                navigateToPortfolio('contact');
              }}
              className={`transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4 ${
                currentPage === 'home' && activeSection === 'contact'
                  ? 'text-[#E10600] font-semibold'
                  : 'hover:text-[#111111] dark:hover:text-[#F2F0EB]'
              }`}
            >
              05 Contact
            </a>
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
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-[#E10600] hover:bg-[#ff1e17] text-white font-mono text-[11px] uppercase tracking-wider font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Start Project</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-zinc-700 dark:text-[#F2F0EB] hover:bg-zinc-200/70 dark:hover:bg-[#141414] transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-zinc-200 dark:border-[#F2F0EB]/10 bg-[#F5F4F0] dark:bg-[#050505] px-6 py-5 space-y-4">
            <div className="grid grid-cols-2 gap-3 text-xs font-mono uppercase tracking-wider">
              <a
                href="#freelance"
                onClick={(e) => {
                  e.preventDefault();
                  navigateToPortfolio('freelance');
                }}
                className="py-2 text-[#E10600] font-semibold"
              >
                01 Services (12)
              </a>
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  navigateToPortfolio('projects');
                }}
                className="py-2 text-zinc-800 dark:text-[#F2F0EB]"
              >
                02 Selected Work
              </a>
              <a
                href="#process"
                onClick={(e) => {
                  e.preventDefault();
                  navigateToPortfolio('process');
                }}
                className="py-2 text-zinc-800 dark:text-[#F2F0EB]"
              >
                03 Process
              </a>
              <a
                href={`${getNormalizedBase()}services`}
                onClick={(e) => {
                  e.preventDefault();
                  navigateToServices();
                }}
                className="py-2 text-[#E10600] font-semibold"
              >
                Full Catalog →
              </a>
              <a
                href={`${getNormalizedBase()}about`}
                onClick={(e) => {
                  e.preventDefault();
                  navigateToAbout();
                }}
                className="py-2 text-zinc-800 dark:text-[#F2F0EB]"
              >
                04 About &amp; CV →
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  navigateToPortfolio('contact');
                }}
                className="py-2 text-zinc-800 dark:text-[#F2F0EB]"
              >
                05 Contact
              </a>
            </div>
            <div className="pt-3 border-t border-zinc-200 dark:border-[#F2F0EB]/10 flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 dark:text-[#A8A8A8]">
                Canvas Mode
              </span>
              <button
                onClick={toggleTheme}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-zinc-300 dark:border-[#F2F0EB]/15 text-xs font-mono text-zinc-800 dark:text-[#F2F0EB]"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                    <span>Light Paper</span>
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
        )}
      </header>

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

            <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 relative z-10 flex-1 flex flex-col justify-between gap-8">
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
                        CREATIVE{' '}
                      </span>
                      <span
                        className="animate-ts-word font-editorial italic lowercase font-normal text-[#E10600] pr-2"
                        style={{ animationDelay: '0.12s' }}
                      >
                        developer{' '}
                      </span>
                      <span className="animate-ts-word" style={{ animationDelay: '0.20s' }}>
                        &amp; DIGITAL{' '}
                      </span>
                      <span
                        className="animate-ts-word font-editorial italic lowercase font-normal text-[#E10600]"
                        style={{ animationDelay: '0.28s' }}
                      >
                        studio.
                      </span>
                    </h1>

                    <p className="text-base sm:text-lg text-[#A8A8A8] leading-relaxed max-w-xl">
                      {personal.heroDescription}
                    </p>
                  </div>

                  {/* Clean Action Row + Typographic Socials */}
                  <div className="space-y-6">
                    <div className="flex flex-wrap items-center gap-3">
                      <a
                        href="#projects"
                        className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md bg-[#E10600] hover:bg-[#ff1e17] text-white font-mono text-xs uppercase tracking-wider font-semibold transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap shrink-0 shadow-[0_12px_36px_rgba(225,6,0,0.35)]"
                      >
                        <span>Selected Works</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </a>

                      <a
                        href="#freelance"
                        className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md bg-[#F2F0EB] text-[#050505] hover:opacity-90 font-mono text-xs uppercase tracking-wider font-semibold transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap shrink-0"
                      >
                        <span>12 Services</span>
                      </a>

                      <button
                        type="button"
                        onClick={navigateToAbout}
                        className="inline-flex items-center gap-2 px-5 py-3.5 rounded-md border border-[#F2F0EB]/25 hover:border-[#E10600] text-[#F2F0EB] font-mono text-xs uppercase tracking-wider transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <span>About &amp; CV</span>
                      </button>
                    </div>

                    {/* Single-Line Editorial Links */}
                    <div className="pt-4 border-t border-[#F2F0EB]/12 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.12em] text-[#A8A8A8]">
                      <a
                        href={personal.whatsappDirectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 hover:text-[#E10600] transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                        <span>WhatsApp</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                      <a
                        href={personal.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 hover:text-[#E10600] transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>GitHub (@{personal.githubUsername})</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                      <a
                        href={personal.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 hover:text-[#E10600] transition-colors"
                      >
                        <Linkedin className="w-3.5 h-3.5" />
                        <span>LinkedIn</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                      <a
                        href={personal.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 hover:text-[#E10600] transition-colors"
                      >
                        <Instagram className="w-3.5 h-3.5" />
                        <span>Instagram</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    </div>
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
                    githubUrl={personal.githubUrl}
                    githubUsername={personal.githubUsername}
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
            </div>
          </section>

          <NoirHairlineTrack />

          {/* ===================================================================
              SIGNATURE CONTINUOUS KINETIC MARQUEE RIBBON
          =================================================================== */}
          <div className="border-b border-zinc-300/70 dark:border-[#F2F0EB]/10 bg-[#111111] dark:bg-[#080808] text-[#F2F0EB] py-3.5 overflow-hidden select-none">
            <div className="animate-noir-marquee font-display text-lg sm:text-xl tracking-wider uppercase">
              {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
                <span key={idx} className="inline-flex items-center mx-4 whitespace-nowrap">
                  <span>{item}</span>
                  <span className="ml-8 text-[#E10600]" aria-hidden="true">
                    ✦
                  </span>
                </span>
              ))}
            </div>
          </div>

          {/* ===================================================================
              C. 01 — MANIFESTO (Signature Framer Editorial Statement)
          =================================================================== */}
          <section className="py-20 sm:py-28">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
              <NoirSectionBar
                indexLabel="01 — MANIFESTO"
                sectionCode="(01/06)"
                rightLabel="CREATIVE DIRECTION"
              />

              <ScrollReveal direction="up">
                <blockquote
                  className="font-display uppercase text-[#111111] dark:text-[#F2F0EB] leading-[1.02] tracking-tight"
                  style={{
                    fontSize: 'clamp(2rem, 4.6vw, 4rem)',
                    textWrap: 'balance',
                  }}
                >
                  WE DON’T JUST BUILD WEBSITES. WE DIRECT{' '}
                  <span className="font-editorial italic lowercase font-normal text-[#E10600]">
                    digital experiences.
                  </span>{' '}
                  EVERY PIXEL IS PURPOSEFUL, EVERY SYSTEM SCALES — BUILT WHERE DESIGN, CODE &amp; GROWTH{' '}
                  <span className="font-editorial italic lowercase font-normal text-[#E10600]">
                    collide.
                  </span>
                </blockquote>
              </ScrollReveal>

              <p className="font-mono text-xs uppercase tracking-[0.14em] text-zinc-500 dark:text-[#A8A8A8] pt-2">
                — {personal.name.toUpperCase()} · {studioBrand.parentCompany.toUpperCase()}
              </p>
            </div>
          </section>

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
                      <h2
                        className="font-display text-4xl sm:text-6xl font-normal uppercase tracking-tight text-[#111111] dark:text-[#F2F0EB] leading-[0.94]"
                        style={{ textWrap: 'balance' }}
                      >
                        SELECTED{' '}
                        <span className="font-editorial italic lowercase font-normal text-[#E10600]">
                          works
                        </span>{' '}
                        (0{projects.length})
                      </h2>
                      <p className="text-sm sm:text-base text-zinc-600 dark:text-[#A8A8A8]">
                        Glide through the interactive filmstrip or inspect live client viewports below — open any live site or request a customized version for your business.
                      </p>
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

              {/* Clean Hairline GitHub & Edge Synced Index Table (Like Framer Recognition Rows) */}
              <ScrollReveal direction="up">
                <div className="pt-10 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-zinc-300/70 dark:border-[#F2F0EB]/12">
                    <div className="space-y-1">
                      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#E10600] font-semibold">
                        GITHUB &amp; EDGE REPOSITORY INDEX · @{personal.githubUsername}
                      </p>
                      <h3 className="font-display text-2xl sm:text-4xl uppercase tracking-tight text-[#111111] dark:text-[#F2F0EB]">
                        SYNCED CODE &amp; LIVE DEPLOYMENTS
                      </h3>
                    </div>

                    <a
                      href={personal.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-zinc-800 dark:text-[#F2F0EB] hover:text-[#E10600] transition-colors whitespace-nowrap shrink-0"
                    >
                      <Github className="w-4 h-4" />
                      <span>github.com/{personal.githubUsername}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#E10600]" />
                    </a>
                  </div>

                  <div className="divide-y divide-zinc-300/70 dark:divide-[#F2F0EB]/10 border-b border-zinc-300/70 dark:border-[#F2F0EB]/10">
                    {githubRepos.map((repo, i) => (
                      <div
                        key={repo.name}
                        className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-zinc-200/40 dark:hover:bg-[#0E0E0E] px-2 sm:px-3 -mx-2 sm:-mx-3 rounded-md transition-colors"
                      >
                        <div className="flex items-start md:items-center gap-4 min-w-0">
                          <span className="font-mono text-xs text-[#E10600] font-semibold shrink-0 tabular-nums">
                            0{i + 1}
                          </span>
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2.5">
                              <h4 className="font-display text-xl tracking-wide uppercase text-[#111111] dark:text-[#F2F0EB]">
                                {repo.name}
                              </h4>
                              <span className="font-mono text-[11px] uppercase text-zinc-500 dark:text-[#A8A8A8]">
                                · {repo.language} · {repo.visibilityLabel}
                              </span>
                            </div>
                            <p className="text-xs text-zinc-600 dark:text-[#A8A8A8] mt-0.5 line-clamp-1">
                              {repo.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 font-mono text-xs uppercase tracking-wider shrink-0 pl-8 md:pl-0">
                          <a
                            href={repo.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-zinc-700 dark:text-[#F2F0EB]/80 hover:text-[#E10600] transition-colors"
                          >
                            <span>GitHub</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>

                          {repo.homepage && (
                            <a
                              href={repo.homepage}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[#E10600] font-semibold hover:underline"
                            >
                              <span>Live Site</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
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
                    <h2
                      className="font-display text-4xl sm:text-6xl font-normal uppercase tracking-tight text-[#111111] dark:text-[#F2F0EB] leading-[0.94]"
                      style={{ textWrap: 'balance' }}
                    >
                      WHAT WE{' '}
                      <span className="font-editorial italic lowercase font-normal text-[#E10600]">
                        build.
                      </span>
                    </h2>
                    <p className="text-sm sm:text-base text-zinc-600 dark:text-[#A8A8A8] leading-relaxed">
                      {studioBrand.description} Select any of our 12 core services below to inspect deliverables and live previews.
                    </p>
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
                  {filteredServices.map((service) => {
                    const isActive = activeService.id === service.id;

                    return (
                      <motion.div
                        key={service.id}
                        whileHover={{ x: 8 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="transition-colors"
                      >
                        <button
                          type="button"
                          onClick={() => setActiveServiceId(service.id)}
                          onMouseEnter={() => setActiveServiceId(service.id)}
                          aria-expanded={isActive}
                          className="w-full py-5 flex items-center justify-between gap-4 text-left cursor-pointer group"
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
                          <div className="pb-6 pl-9 sm:pl-12 space-y-4">
                            <p className="text-xs sm:text-sm text-zinc-700 dark:text-[#F2F0EB]/85 leading-relaxed">
                              {service.description}
                            </p>

                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-zinc-600 dark:text-[#A8A8A8]">
                              {service.deliverables.map((item, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="text-[#E10600] font-mono">·</span>
                                  <span>{item}</span>
                                </li>
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
                          </div>
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

                    <ServiceMockupVisual mockupType={activeService.mockupType} />

                    <div className="space-y-3">
                      <h3 className="font-display text-3xl uppercase tracking-tight text-[#111111] dark:text-[#F2F0EB]">
                        {activeService.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-zinc-600 dark:text-[#A8A8A8] leading-relaxed">
                        {activeService.description}
                      </p>
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

          <section id="process" className="relative py-20 sm:py-28 overflow-hidden">
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
                      <h2 className="font-display text-4xl sm:text-6xl uppercase tracking-tight text-[#111111] dark:text-[#F2F0EB] leading-[0.94]">
                        HOW IT{' '}
                        <span className="font-editorial italic lowercase font-normal text-[#E10600]">
                          happens.
                        </span>
                      </h2>
                      <p className="text-sm sm:text-base text-zinc-600 dark:text-[#A8A8A8]">
                        Structured sprint execution paired with full-stack &amp; mobile engineering precision.
                      </p>
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

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-zinc-300/80 dark:border-[#F2F0EB]/12 divide-y md:divide-y-0 md:divide-x divide-zinc-300/80 dark:divide-[#F2F0EB]/12 rounded-xl overflow-hidden bg-white dark:bg-[#0B0B0B]">
                {STUDIO_PROCESS_STEPS.map((item) => (
                  <motion.div
                    key={item.index}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="p-6 sm:p-7 flex flex-col justify-between space-y-8 hover:bg-zinc-50 dark:hover:bg-[#111111] transition-colors"
                  >
                    <div className="space-y-3">
                      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#E10600] font-semibold">
                        {item.step}
                      </p>
                      <h3 className="font-display text-3xl uppercase tracking-tight text-[#111111] dark:text-[#F2F0EB]">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-zinc-600 dark:text-[#A8A8A8] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    <span className="font-display text-4xl text-zinc-300 dark:text-[#F2F0EB]/15 leading-none">
                      {item.index}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Framer Animated Skill Strength Bars (`Skill Row`) */}
              <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-2 border-t border-zinc-300/70 dark:border-[#F2F0EB]/12">
                {NOIR_CAPABILITY_ROWS.map((row) => (
                  <NoirSkillRow
                    key={row.title}
                    title={row.title}
                    metric={row.metric}
                    percentage={row.percentage}
                    detail={row.detail}
                  />
                ))}
              </div>
            </div>
          </section>

          <NoirHairlineTrack />

          {/* ===================================================================
              G. 05 — BEHIND THE FRAME · ABOUT, ACADEMICS & CV ((05/06))
          =================================================================== */}
          {/* 08 — Experience · 09 — Recognition · 10 — Words (Framer Noir Signal) */}
          <NoirExperience />
          <NoirRecognition />
          <NoirTestimonials />

          <section id="about-gateway" className="py-20 sm:py-24">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <ScrollReveal direction="up">
                <div className="p-7 sm:p-12 rounded-xl bg-white dark:bg-[#0B0B0B] border border-zinc-300/80 dark:border-[#F2F0EB]/12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-8 space-y-4">
                    <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em] font-semibold text-[#E10600]">
                      <GraduationCap className="w-4 h-4" />
                      <span>05 — BEHIND THE FRAME · ACADEMICS &amp; CV</span>
                      <span className="text-zinc-500 dark:text-[#A8A8A8]">(05/06)</span>
                    </div>

                    <h2 className="font-display text-3xl sm:text-5xl uppercase tracking-tight text-[#111111] dark:text-[#F2F0EB] leading-[0.95]">
                      BEHIND THE{' '}
                      <span className="font-editorial italic lowercase font-normal text-[#E10600]">
                        frame
                      </span>{' '}
                      — STACK &amp; CV
                    </h2>

                    <p className="text-sm sm:text-base text-zinc-600 dark:text-[#A8A8A8] leading-relaxed max-w-2xl">
                      {education.degree} at {education.institution} ({education.duration}) ·{' '}
                      {education.internship.role} at {education.internship.company} · 400+ coding problems solved across LeetCode, CodeChef, HackerRank &amp; GeeksforGeeks.
                    </p>
                  </div>

                  <div className="lg:col-span-4 flex flex-col gap-3">
                    <button
                      type="button"
                      onClick={navigateToAbout}
                      className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-md bg-[#E10600] hover:bg-[#ff1e17] text-white font-mono text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer"
                    >
                      <User className="w-4 h-4" />
                      <span>About, Skills &amp; Academics</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsResumeModalOpen(true)}
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md border border-zinc-300 dark:border-[#F2F0EB]/20 hover:border-[#E10600] font-mono text-xs uppercase tracking-wider text-zinc-800 dark:text-[#F2F0EB] transition-colors cursor-pointer"
                    >
                      <FileText className="w-4 h-4 text-[#E10600]" />
                      <span>View Official CV</span>
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </section>

          <NoirHairlineTrack />

          {/* ===================================================================
              H. BEFORE YOU ASK · FAQ ACCORDION (Matching Framer Section 12)
          =================================================================== */}
          <section id="faq" className="py-20 sm:py-24">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
              <ScrollReveal direction="up">
                <div className="space-y-4">
                  <NoirSectionBar
                    indexLabel="QUESTIONS · BEFORE WE START"
                    sectionCode="FAQ"
                    rightLabel="TIMELINE & DELIVERY"
                  />
                  <h2 className="font-display text-4xl sm:text-6xl uppercase tracking-tight text-[#111111] dark:text-[#F2F0EB] leading-[0.94]">
                    BEFORE YOU{' '}
                    <span className="font-editorial italic lowercase font-normal text-[#E10600]">
                      ask.
                    </span>
                  </h2>
                  <p className="text-sm sm:text-base text-zinc-600 dark:text-[#A8A8A8] max-w-2xl">
                    The questions clients and brands ask most before starting a custom build.
                  </p>
                </div>
              </ScrollReveal>

              <div className="divide-y divide-zinc-300/70 dark:divide-[#F2F0EB]/10 border-t border-b border-zinc-300/70 dark:border-[#F2F0EB]/10">
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
                          <span className="font-mono text-xs text-[#E10600] font-semibold shrink-0">
                            {faq.index}
                          </span>
                          <span className="font-sans text-base sm:text-lg font-medium text-[#111111] dark:text-[#F2F0EB] group-hover:text-[#E10600] transition-colors">
                            {faq.question}
                          </span>
                        </div>
                        <span className="w-8 h-8 rounded-md border border-zinc-300 dark:border-[#F2F0EB]/15 flex items-center justify-center text-zinc-600 dark:text-[#A8A8A8] group-hover:border-[#E10600] group-hover:text-[#E10600] transition-colors shrink-0">
                          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        </span>
                      </button>

                      {isOpen && (
                        <div className="pt-3 pl-8 sm:pl-11 pr-10 text-sm text-zinc-600 dark:text-[#A8A8A8] leading-relaxed max-w-3xl">
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
                  <h2
                    className="font-display text-4xl sm:text-7xl uppercase tracking-tight text-[#111111] dark:text-[#F2F0EB] leading-[0.90] max-w-4xl"
                    style={{ textWrap: 'balance' }}
                  >
                    LET&apos;S CREATE SOMETHING{' '}
                    <span className="font-editorial italic lowercase font-normal text-[#E10600]">
                      unreal.
                    </span>
                  </h2>
                  <p className="text-sm sm:text-base text-zinc-600 dark:text-[#A8A8A8] max-w-2xl leading-relaxed">
                    Open for freelance websites, custom apps, CRM systems &amp; Meta Ads campaigns. Select your requirement below and message directly on WhatsApp or Email.
                  </p>
                </div>
              </ScrollReveal>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Direct Channels */}
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                  <div className="p-6 rounded-xl bg-white dark:bg-[#0B0B0B] border border-zinc-300/80 dark:border-[#F2F0EB]/12 flex flex-col justify-between">
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

                  <div className="p-6 rounded-xl bg-white dark:bg-[#0B0B0B] border border-zinc-300/80 dark:border-[#F2F0EB]/12 flex flex-col justify-between">
                    <div className="space-y-1.5">
                      <Github className="w-5 h-5 text-zinc-700 dark:text-[#F2F0EB]" />
                      <h3 className="font-display text-2xl uppercase text-[#111111] dark:text-[#F2F0EB]">
                        GitHub
                      </h3>
                      <p className="text-xs font-mono text-zinc-500 dark:text-[#A8A8A8]">
                        github.com/{personal.githubUsername}
                      </p>
                    </div>

                    <a
                      href={personal.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md border border-zinc-300 dark:border-[#F2F0EB]/20 hover:border-[#E10600] font-mono text-xs uppercase tracking-wider font-semibold text-zinc-800 dark:text-[#F2F0EB] transition-colors"
                    >
                      <span>View Repositories</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Right Column: Requirement Selector & Launcher */}
                <div className="lg:col-span-5">
                  <div className="h-full p-6 sm:p-8 rounded-xl bg-white dark:bg-[#0B0B0B] border border-zinc-300/80 dark:border-[#F2F0EB]/12 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <p className="font-mono text-[11px] uppercase tracking-[0.14em] font-semibold text-[#E10600]">
                        QUICK PROJECT LAUNCHER
                      </p>
                      <h3 className="font-display text-3xl uppercase text-[#111111] dark:text-[#F2F0EB]">
                        Select Requirement
                      </h3>

                      <div className="space-y-2 pt-1">
                        {[
                          'Website Development (Business / Portfolio / Landing Page)',
                          'Mobile App Development (Android / iOS / E-commerce App)',
                          'Web Application, SaaS Dashboard or Custom CRM',
                          'Logo & Graphic Design / UI/UX Design',
                          'Digital Marketing, Meta Ads & Launch Videos',
                          'Bulk SMS, WhatsApp Messaging, E-commerce or IT Hosting',
                        ].map((topic) => (
                          <button
                            key={topic}
                            type="button"
                            onClick={() => setSelectedInquiryTopic(topic)}
                            className={`w-full text-left px-3.5 py-2.5 rounded-md border text-xs font-medium transition-colors cursor-pointer flex items-center justify-between gap-2 ${
                              selectedInquiryTopic === topic
                                ? 'border-[#E10600] bg-[#E10600]/10 text-[#E10600]'
                                : 'border-zinc-200 dark:border-[#F2F0EB]/12 bg-zinc-50 dark:bg-[#121212] text-zinc-700 dark:text-[#A8A8A8] hover:border-[#E10600]/50'
                            }`}
                          >
                            <span className="truncate">{topic}</span>
                            {selectedInquiryTopic === topic && (
                              <Check className="w-3.5 h-3.5 shrink-0 text-[#E10600]" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-zinc-200 dark:border-[#F2F0EB]/10 space-y-2.5">
                      <a
                        href={buildWhatsappLink(selectedInquiryTopic)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-md bg-[#E10600] hover:bg-[#ff1e17] text-white font-mono text-xs uppercase tracking-wider font-semibold transition-colors"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Send via WhatsApp</span>
                      </a>

                      <a
                        href={buildMailtoLink(selectedInquiryTopic)}
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-md bg-[#111111] text-white dark:bg-[#F2F0EB] dark:text-[#050505] hover:opacity-90 font-mono text-xs uppercase tracking-wider font-semibold transition-opacity"
                      >
                        <Mail className="w-4 h-4" />
                        <span>Send via Email</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Framer 4-Column Studio Information Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-zinc-300/80 dark:border-[#F2F0EB]/12 divide-y sm:divide-y-0 sm:divide-x divide-zinc-300/80 dark:divide-[#F2F0EB]/12 rounded-xl overflow-hidden bg-white dark:bg-[#0B0B0B]">
                <div className="p-5 space-y-1">
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#E10600]">
                    01 — DEVELOPER
                  </p>
                  <p className="font-display text-lg uppercase text-[#111111] dark:text-[#F2F0EB]">
                    {personal.name}
                  </p>
                  <p className="text-xs text-zinc-600 dark:text-[#A8A8A8]">
                    Independent · Web, App &amp; Java Developer
                  </p>
                </div>

                <div className="p-5 space-y-1">
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#E10600]">
                    02 — LOCATION
                  </p>
                  <p className="font-display text-lg uppercase text-[#111111] dark:text-[#F2F0EB]">
                    DELHI, INDIA
                  </p>
                  <p className="text-xs text-zinc-600 dark:text-[#A8A8A8]">
                    Worldwide Remote Delivery
                  </p>
                </div>

                <div className="p-5 space-y-1">
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#E10600]">
                    03 — EMAIL
                  </p>
                  <p className="font-display text-lg uppercase text-[#111111] dark:text-[#F2F0EB]">
                    WRITE DIRECTLY
                  </p>
                  <p className="text-xs font-mono text-zinc-600 dark:text-[#A8A8A8] break-all">
                    {personal.emailAddress}
                  </p>
                </div>

                <div className="p-5 space-y-1">
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#E10600]">
                    04 — RESPONSE
                  </p>
                  <p className="font-display text-lg uppercase text-[#111111] dark:text-[#F2F0EB]">
                    WITHIN 24 HOURS
                  </p>
                  <p className="text-xs font-mono text-zinc-600 dark:text-[#A8A8A8]">
                    {personal.mobileNumber}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* =====================================================================
          J. FRAMER NOIR SIGNAL STUDIO FOOTER
      ===================================================================== */}
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
