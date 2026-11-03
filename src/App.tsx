import React, { useState, useEffect, useCallback } from 'react';
import {
  Sun,
  Moon,
  Menu,
  X,
  ArrowUpRight,
  ArrowRight,
  Linkedin,
  Github,
  Instagram,
  Mail,
  MessageSquare,
  Phone,
  Copy,
  Check,
  GraduationCap,
  Briefcase,
  Layers,
  ExternalLink,
  FileText,
  User,
  Sparkles,
} from 'lucide-react';
import {
  portfolioConfig,
  type ProjectItem,
} from './data/portfolioConfig';
import { ProjectVisual } from './components/ProjectVisual';
import { ServiceMockupVisual } from './components/ServiceMockupVisual';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { ResumeModal } from './components/ResumeModal';
import { ScrollReveal } from './components/ScrollReveal';
import { Tilt3DCard } from './components/Tilt3DCard';
import { HeroProfile3D } from './components/HeroProfile3D';
import { FreelanceServicesPage } from './components/FreelanceServicesPage';
import { AboutPage } from './components/AboutPage';
import { motion, AnimatePresence } from 'framer-motion';
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

export default function App() {
  const {
    personal,
    verifiedGithubRepos,
    projects,
    freelanceSection,
    education,
  } = portfolioConfig;

  // Theme management: Premium dark theme default with light mode toggle
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

  // Page Routing State ('home' | 'services' | 'about')
  const [currentPage, setCurrentPage] = useState<PageRoute>(() =>
    detectInitialRoute()
  );

  // Active Navigation Section Highlight State
  const [activeSection, setActiveSection] = useState<string>('home');

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

  // Track active section while scrolling on the homepage
  useEffect(() => {
    if (currentPage !== 'home') {
      setActiveSection(currentPage);
      return;
    }

    const sectionIds = ['home', 'freelance', 'projects', 'about-gateway', 'contact'];
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

  // Mobile Menu State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Profile Photo Fallback State
  const [profileImgSrc, setProfileImgSrc] = useState<string>(personal.profileImagePath);
  const [usingFallbackAvatar, setUsingFallbackAvatar] = useState(false);

  const handleProfileImageError = () => {
    if (!usingFallbackAvatar) {
      setUsingFallbackAvatar(true);
      setProfileImgSrc(personal.profileFallbackSvg);
    }
  };

  // Project Domain Filter State
  const [selectedProjectDomain, setSelectedProjectDomain] = useState<string>('all');

  // Modals & Card Pop-In Expansion State
  const [activeProjectModal, setActiveProjectModal] = useState<ProjectItem | null>(null);
  const [expandingProjectId, setExpandingProjectId] = useState<string | null>(null);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  const handleOpenProjectCaseStudy = useCallback((project: ProjectItem) => {
    if (project.id === 'veloura-specialty-coffee') {
      velouraSoundEngine.playChimeSound();
    }
    setExpandingProjectId(project.id);
    window.setTimeout(() => {
      setActiveProjectModal(project);
    }, 150);
    window.setTimeout(() => {
      setExpandingProjectId(null);
    }, 520);
  }, []);

  // Inquiry Topic Selection State
  const [selectedInquiryTopic, setSelectedInquiryTopic] = useState<string>(
    'Custom Business Website or Landing Page'
  );

  // Copy Field Feedback State
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
      `Project / Portfolio Inquiry: ${topic || selectedInquiryTopic} — Aditya Raj`
    );
    const body = encodeURIComponent(
      `Hi Aditya,\n\nI visited your portfolio and would like to discuss: ${
        topic || selectedInquiryTopic
      }.\n\nBest regards,`
    );
    return `mailto:${personal.emailAddress}?subject=${subject}&body=${body}`;
  };

  const buildWhatsappLink = (topic?: string) => {
    if (!topic) {
      return personal.whatsappDirectUrl;
    }
    const cleanDigits = personal.whatsappNumber.replace(/[^0-9]/g, '');
    const message = encodeURIComponent(
      `Hi Aditya, I visited your portfolio and would like to discuss: ${topic}.`
    );
    return `https://wa.me/${cleanDigits}?text=${message}`;
  };

  const filteredProjects =
    selectedProjectDomain === 'all'
      ? projects
      : projects.filter((p) => p.domain === selectedProjectDomain);

  // Featured Freelance Services shown right below the Hero Profile
  const homepageServicesShowcase = freelanceSection.services.slice(0, 6);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-[#07080C] dark:text-zinc-100 bg-architectural-grid transition-colors duration-200">
      {/* =====================================================================
          A. STICKY NAVIGATION BAR (3-Zone Top Bar Contract — Client-First!)
      ===================================================================== */}
      <header className="sticky top-0 z-40 w-full bg-zinc-50/85 dark:bg-[#07080C]/85 backdrop-blur-xl border-b border-zinc-200/80 dark:border-zinc-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single Text Wordmark */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              navigateToPortfolio();
            }}
            className="font-display text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100 whitespace-nowrap shrink-0 cursor-pointer"
          >
            ADITYA RAJ
          </a>

          {/* Zone 2: Client-First Navigation Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400"
          >
            <a
              href="#freelance"
              onClick={(e) => {
                e.preventDefault();
                navigateToPortfolio('freelance');
              }}
              className={`transition-colors whitespace-nowrap shrink-0 ${
                currentPage === 'home' && activeSection === 'freelance'
                  ? 'text-blue-600 dark:text-blue-400 font-semibold'
                  : 'hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
            >
              Freelance Services
            </a>

            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                navigateToPortfolio('projects');
              }}
              className={`transition-colors whitespace-nowrap shrink-0 ${
                currentPage === 'home' && activeSection === 'projects'
                  ? 'text-blue-600 dark:text-blue-400 font-semibold'
                  : 'hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
            >
              Projects &amp; Samples
            </a>

            <a
              href={`${getNormalizedBase()}services`}
              onClick={(e) => {
                e.preventDefault();
                navigateToServices();
              }}
              className={`transition-colors whitespace-nowrap shrink-0 ${
                currentPage === 'services'
                  ? 'text-blue-600 dark:text-blue-400 font-semibold'
                  : 'hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
            >
              All 8 Services
            </a>

            <a
              href={`${getNormalizedBase()}about`}
              onClick={(e) => {
                e.preventDefault();
                navigateToAbout();
              }}
              className={`transition-colors whitespace-nowrap shrink-0 ${
                currentPage === 'about' ||
                (currentPage === 'home' && activeSection === 'about-gateway')
                  ? 'text-blue-600 dark:text-blue-400 font-semibold'
                  : 'hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
            >
              About, Academics &amp; CV
            </a>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                navigateToPortfolio('contact');
              }}
              className={`transition-colors whitespace-nowrap shrink-0 ${
                currentPage === 'home' && activeSection === 'contact'
                  ? 'text-blue-600 dark:text-blue-400 font-semibold'
                  : 'hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
            >
              Contact
            </a>
          </nav>

          {/* Zone 3: Primary Client Action + Mobile Menu Trigger */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() =>
                handleSelectInquiryTopicAndScroll('Custom Website, Landing Page or App Project')
              }
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-sm"
            >
              <span>Get Custom Website / App</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200/60 dark:hover:bg-zinc-800/60 transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Responsive Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-6 py-4 space-y-3">
            <div className="grid grid-cols-2 gap-2 text-sm font-medium">
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  navigateToPortfolio();
                }}
                className="py-2 text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Home
              </a>
              <a
                href="#freelance"
                onClick={(e) => {
                  e.preventDefault();
                  navigateToPortfolio('freelance');
                }}
                className="py-2 text-blue-600 dark:text-blue-400 font-semibold"
              >
                Freelance Services
              </a>
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  navigateToPortfolio('projects');
                }}
                className="py-2 text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Projects &amp; Samples
              </a>
              <a
                href={`${getNormalizedBase()}services`}
                onClick={(e) => {
                  e.preventDefault();
                  navigateToServices();
                }}
                className="py-2 text-blue-600 dark:text-blue-400 font-semibold"
              >
                All 8 Services →
              </a>
              <a
                href={`${getNormalizedBase()}about`}
                onClick={(e) => {
                  e.preventDefault();
                  navigateToAbout();
                }}
                className="py-2 text-indigo-600 dark:text-indigo-400 font-semibold"
              >
                About, Academics &amp; CV →
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  navigateToPortfolio('contact');
                }}
                className="py-2 text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Contact Me
              </a>
            </div>
            <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-500">Appearance</span>
              <button
                onClick={toggleTheme}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-200/70 dark:bg-zinc-900 text-xs font-medium text-zinc-800 dark:text-zinc-200"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-blue-600" />
                    <span>Dark Mode</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </header>

      {/* =====================================================================
          MAIN VIEW:
          - `/services`: Full 8 Freelance Services & Workflow Page
          - `/about`: Dedicated About Me, Academic Journey, Technical Skills & Official CV Page
          - `/`: Client-First Homepage (Hero Profile -> 01. Freelance Services -> 02. Live Samples & Projects -> 03. About/CV Gateway -> 04. Contact)
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
              B. HERO SECTION (2-Column Split + 3D Animated Profile)
          =================================================================== */}
          <section
            id="home"
            className="relative pt-10 pb-16 sm:pt-14 sm:pb-20 overflow-hidden border-b border-zinc-200/80 dark:border-zinc-800/80"
          >
            {/* Subtle Ambient Radial Glows */}
            <div
              className="absolute top-0 left-1/4 -translate-x-1/2 w-[620px] h-[420px] rounded-full pointer-events-none opacity-60 dark:opacity-100"
              style={{
                background:
                  'radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(99,102,241,0.06) 50%, transparent 75%)',
              }}
            />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
              {/* Top Utility Bar inside Hero: Theme Switcher */}
              <div className="flex items-center justify-end pb-4 mb-4">
                <button
                  onClick={toggleTheme}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors cursor-pointer whitespace-nowrap"
                  aria-label="Toggle color theme"
                >
                  {theme === 'dark' ? (
                    <>
                      <Sun className="w-3.5 h-3.5 text-amber-400" />
                      <span>Light Theme</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-3.5 h-3.5 text-blue-600" />
                      <span>Dark Theme</span>
                    </>
                  )}
                </button>
              </div>

              {/* 2-Column Split Hero */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
                {/* Left Column: Client-Focused Value Proposition & Direct CTAs */}
                <ScrollReveal
                  direction="up"
                  className="lg:col-span-7 flex flex-col justify-between space-y-8"
                >
                  <div className="space-y-5">
                    <p className="font-mono text-sm sm:text-base font-medium text-blue-600 dark:text-blue-400 tracking-wide">
                      {personal.heroGreeting} · CUSTOM WEBSITES, LANDING PAGES &amp; APPS
                    </p>

                    <h1
                      className="font-display font-bold tracking-tight text-zinc-900 dark:text-zinc-50 leading-[1.06]"
                      style={{
                        fontSize: 'clamp(2.4rem, 4.6vw, 4.1rem)',
                        textWrap: 'balance',
                      }}
                    >
                      Building Custom Websites, Web Apps &amp; Android Applications
                    </h1>

                    <p className="text-base sm:text-xl text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-2xl">
                      Explore the types of websites, landing pages, and mobile apps I build below. Pick any live sample you like—I will build and customize it 100% according to your brand and business needs.
                    </p>
                  </div>

                  {/* Primary Action Buttons & Verified Social Strip */}
                  <div className="pt-2 space-y-7">
                    <div className="flex flex-wrap items-center gap-3.5">
                      <a
                        href="#freelance"
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap shrink-0 shadow-lg shadow-blue-600/20"
                      >
                        <Briefcase className="w-4 h-4" />
                        <span>Explore Services I Provide</span>
                      </a>

                      <a
                        href="#projects"
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:opacity-90 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap shrink-0"
                      >
                        <span>View Live Samples &amp; Projects</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </a>

                      <button
                        type="button"
                        onClick={navigateToAbout}
                        className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 hover:border-blue-500/50 dark:hover:border-blue-500/50 text-zinc-800 dark:text-zinc-200 text-xs sm:text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <span>About Me, Academics &amp; CV</span>
                      </button>
                    </div>

                    {/* 3D Elevated Social Buttons & Highlighted All-Services Button */}
                    <div className="pt-5 border-t border-zinc-200/80 dark:border-zinc-800/80 space-y-3.5">
                      <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                        {/* LinkedIn 3D Button */}
                        <a
                          href={personal.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Aditya Raj on LinkedIn"
                          className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border border-zinc-200/90 dark:border-zinc-700/80 border-t-white/40 dark:border-t-zinc-600/60 hover:border-blue-500/60 dark:hover:border-blue-400/60 text-xs font-semibold text-zinc-800 dark:text-zinc-100 shadow-[0_4px_0_0_rgba(59,130,246,0.28),0_8px_20px_-6px_rgba(59,130,246,0.22)] hover:shadow-[0_6px_0_0_rgba(59,130,246,0.4),0_12px_24px_-4px_rgba(59,130,246,0.35)] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[0_1px_0_0_rgba(59,130,246,0.3)] transition-all duration-150 whitespace-nowrap"
                        >
                          <span className="w-6 h-6 rounded-lg bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                            <Linkedin className="w-3.5 h-3.5" />
                          </span>
                          <span>LinkedIn</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-blue-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </a>

                        {/* GitHub 3D Button */}
                        <a
                          href={personal.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Aditya Raj on GitHub"
                          className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border border-zinc-200/90 dark:border-zinc-700/80 border-t-white/40 dark:border-t-zinc-600/60 hover:border-zinc-400 dark:hover:border-zinc-500 text-xs font-semibold text-zinc-800 dark:text-zinc-100 shadow-[0_4px_0_0_rgba(113,113,122,0.32),0_8px_20px_-6px_rgba(0,0,0,0.28)] hover:shadow-[0_6px_0_0_rgba(161,161,170,0.42),0_12px_24px_-4px_rgba(161,161,170,0.25)] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[0_1px_0_0_rgba(113,113,122,0.3)] transition-all duration-150 whitespace-nowrap"
                        >
                          <span className="w-6 h-6 rounded-lg bg-zinc-500/15 border border-zinc-500/30 flex items-center justify-center text-zinc-800 dark:text-zinc-200 group-hover:scale-110 transition-transform">
                            <Github className="w-3.5 h-3.5" />
                          </span>
                          <span>GitHub (@{personal.githubUsername})</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </a>

                        {/* WhatsApp 3D Button */}
                        <a
                          href={personal.whatsappDirectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Contact Aditya Raj on WhatsApp"
                          className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border border-zinc-200/90 dark:border-zinc-700/80 border-t-white/40 dark:border-t-zinc-600/60 hover:border-emerald-500/60 dark:hover:border-emerald-400/60 text-xs font-semibold text-zinc-800 dark:text-zinc-100 shadow-[0_4px_0_0_rgba(16,185,129,0.28),0_8px_20px_-6px_rgba(16,185,129,0.22)] hover:shadow-[0_6px_0_0_rgba(16,185,129,0.42),0_12px_24px_-4px_rgba(16,185,129,0.35)] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[0_1px_0_0_rgba(16,185,129,0.3)] transition-all duration-150 whitespace-nowrap"
                        >
                          <span className="w-6 h-6 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                            <MessageSquare className="w-3.5 h-3.5" />
                          </span>
                          <span>WhatsApp</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </a>

                        {/* Instagram 3D Button */}
                        <a
                          href={personal.instagramUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Aditya Raj on Instagram"
                          className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border border-zinc-200/90 dark:border-zinc-700/80 border-t-white/40 dark:border-t-zinc-600/60 hover:border-pink-500/60 dark:hover:border-pink-400/60 text-xs font-semibold text-zinc-800 dark:text-zinc-100 shadow-[0_4px_0_0_rgba(236,72,153,0.28),0_8px_20px_-6px_rgba(236,72,153,0.22)] hover:shadow-[0_6px_0_0_rgba(236,72,153,0.42),0_12px_24px_-4px_rgba(236,72,153,0.35)] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[0_1px_0_0_rgba(236,72,153,0.3)] transition-all duration-150 whitespace-nowrap"
                        >
                          <span className="w-6 h-6 rounded-lg bg-pink-500/15 border border-pink-500/30 flex items-center justify-center text-pink-600 dark:text-pink-400 group-hover:scale-110 transition-transform">
                            <Instagram className="w-3.5 h-3.5" />
                          </span>
                          <span>Instagram</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-pink-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </a>
                      </div>

                      {/* Highlighted 3D Freelance Services Button with Available Badge */}
                      <div className="pt-1">
                        <button
                          type="button"
                          onClick={navigateToServices}
                          className="group w-full sm:w-auto inline-flex flex-wrap items-center justify-between sm:justify-start gap-3 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600/15 via-indigo-600/15 to-emerald-500/10 dark:from-blue-500/20 dark:via-indigo-500/15 dark:to-emerald-500/15 backdrop-blur-md border border-blue-500/45 dark:border-blue-400/45 border-t-blue-300/50 hover:border-blue-400 text-left shadow-[0_4px_0_0_rgba(37,99,235,0.45),0_12px_28px_-6px_rgba(59,130,246,0.32)] hover:shadow-[0_6px_0_0_rgba(37,99,235,0.58),0_16px_34px_-4px_rgba(59,130,246,0.45)] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[0_1px_0_0_rgba(37,99,235,0.4)] transition-all duration-150 cursor-pointer"
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform shrink-0">
                              <Briefcase className="w-3.5 h-3.5" />
                            </span>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white">
                                  Freelance Services (View All 8)
                                </span>
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/35 text-[10px] font-mono font-semibold text-emerald-600 dark:text-emerald-300">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                  Available
                                </span>
                              </div>
                              <p className="text-[11px] font-mono text-zinc-600 dark:text-zinc-300">
                                Click to see all Website, Landing Page &amp; App Services
                              </p>
                            </div>
                          </div>

                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-600 group-hover:bg-blue-500 text-white text-xs font-semibold transition-colors shrink-0">
                            <span>Open All Services</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>

                {/* Right Column: Animated 3D Profile Image Showcase */}
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
            </div>
          </section>

          {/* ===================================================================
              C. 01. FREELANCE SERVICES & CUSTOMIZATION SHOWCASE (Directly Below Profile!)
          =================================================================== */}
          <section
            id="freelance"
            className="py-20 sm:py-24 border-b border-zinc-200/80 dark:border-zinc-800/80"
          >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
              <ScrollReveal direction="up">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div className="space-y-2.5 max-w-2xl">
                    <p className="font-mono text-xs font-semibold text-blue-600 dark:text-blue-400">
                      01. FREELANCE SERVICES · WEBSITES, LANDING PAGES &amp; APPS
                    </p>
                    <h2
                      className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100"
                      style={{ textWrap: 'balance' }}
                    >
                      What Type of Website or Application Do You Want Built?
                    </h2>
                    <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      Browse the website and app categories I build below. Choose any style or sample you like—I will build it from scratch and customize every color, layout, and feature according to your requirements.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={navigateToServices}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap shrink-0 cursor-pointer shadow-lg shadow-blue-600/20"
                  >
                    <Briefcase className="w-4 h-4" />
                    <span>See All 8 Services &amp; Process</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </ScrollReveal>

              {/* 6 Interactive Service Showcase Cards with Visual Previews & Customization CTA */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {homepageServicesShowcase.map((service, idx) => (
                  <ScrollReveal key={service.id} delayMs={idx * 70} direction="up">
                    <Tilt3DCard className="h-full rounded-2xl bg-white dark:bg-zinc-900/65 border border-zinc-200/90 dark:border-zinc-800/90 hover:border-blue-500/50 dark:hover:border-blue-500/50 overflow-hidden flex flex-col justify-between">
                      <div>
                        <div
                          onClick={navigateToServices}
                          className="cursor-pointer group relative"
                        >
                          <ServiceMockupVisual
                            serviceId={service.id}
                            index={service.index}
                            categoryTag={service.categoryTag}
                          />
                        </div>

                        <div className="p-5 sm:p-6 space-y-3">
                          <div className="flex items-center justify-between gap-2 text-xs font-mono">
                            <span className="text-blue-600 dark:text-blue-400 font-semibold">
                              {service.index} · {service.categoryTag}
                            </span>
                            <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                              100% Customizable
                            </span>
                          </div>

                          <h3 className="font-display text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100">
                            {service.title}
                          </h3>

                          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                            {service.summary}
                          </p>
                        </div>
                      </div>

                      <div className="px-5 sm:px-6 pb-6 pt-4 border-t border-zinc-100 dark:border-zinc-800/80 space-y-4">
                        <p className="font-mono text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                          {service.deliverables.join(' · ')}
                        </p>

                        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() =>
                              handleSelectInquiryTopicAndScroll(
                                `Build & Customize: ${service.title}`
                              )
                            }
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors cursor-pointer"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Customize for Me</span>
                          </button>

                          {service.liveExampleUrl ? (
                            <a
                              href={service.liveExampleUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-3 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 hover:border-blue-500/50 text-xs font-semibold text-zinc-800 dark:text-zinc-200 transition-colors"
                            >
                              <ExternalLink className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                              <span>Live Sample</span>
                            </a>
                          ) : (
                            <button
                              type="button"
                              onClick={navigateToServices}
                              className="inline-flex items-center gap-1 px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-blue-500/40 text-xs font-medium text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer"
                            >
                              <span>All Details</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    </Tilt3DCard>
                  </ScrollReveal>
                ))}
              </div>

              {/* Full-Width Callout Banner to Open All 8 Services Page */}
              <ScrollReveal direction="up">
                <div
                  onClick={navigateToServices}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      navigateToServices();
                    }
                  }}
                  className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-blue-600/15 via-indigo-600/10 to-emerald-500/10 border border-blue-500/40 hover:border-blue-400 transition-all cursor-pointer flex flex-col md:flex-row items-start md:items-center justify-between gap-6 group"
                >
                  <div className="space-y-1.5">
                    <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-blue-600 dark:text-blue-400">
                      <Briefcase className="w-4 h-4" />
                      <span>COMPLETE FREELANCE SERVICES CATALOG</span>
                    </div>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                      Want to see all 8 Freelance Services, Deliverables &amp; Step-by-Step Workflow?
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300">
                      Click here to open the dedicated Freelance Services page with all website, landing page, web app, and Android app packages.
                    </p>
                  </div>

                  <span className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 group-hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0">
                    <span>Open All 8 Services</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* ===================================================================
              D. 02. LIVE SAMPLES & FEATURED PROJECTS SECTION (Below Freelance Services!)
          =================================================================== */}
          <section
            id="projects"
            className="py-20 sm:py-24 border-b border-zinc-200/80 dark:border-zinc-800/80"
          >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
              <ScrollReveal direction="up">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div className="space-y-2.5 max-w-2xl">
                    <p className="font-mono text-xs font-semibold text-blue-600 dark:text-blue-400">
                      02. LIVE WEBSITE &amp; APP SAMPLES · FEATURED PROJECTS
                    </p>
                    <h2
                      className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100"
                      style={{ textWrap: 'balance' }}
                    >
                      Explore Working Samples &amp; Request Your Custom Version
                    </h2>
                    <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
                      Interact with my live websites, spatial web interfaces, and Android + Spring Boot applications below. Like any sample? Click &ldquo;Customize Similar for Me&rdquo; to get one tailored for your brand.
                    </p>
                  </div>

                  {/* Project Domain Filter Tabs */}
                  <div
                    role="tablist"
                    aria-label="Filter projects by domain"
                    className="flex flex-wrap items-center gap-1 p-1 rounded-xl bg-zinc-200/70 dark:bg-zinc-900 border border-zinc-300/60 dark:border-zinc-800"
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
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          selectedProjectDomain === domain
                            ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-xs'
                            : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                        }`}
                      >
                        {domain === 'all' ? `All Samples (${projects.length})` : domain}
                      </button>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              {/* Project Showcase Cards */}
              <div className="space-y-8">
                {filteredProjects.map((project, idx) => {
                  const isVelouraCard = project.id === 'veloura-specialty-coffee';
                  const isExpanding = expandingProjectId === project.id;

                  return (
                    <ScrollReveal key={project.id} delayMs={idx * 90} direction="up">
                      <motion.div
                        animate={
                          isExpanding
                            ? {
                                scale: [1, 0.985, 1.028, 1],
                                y: [0, 2, -6, 0],
                              }
                            : { scale: 1, y: 0 }
                        }
                        transition={{
                          duration: 0.36,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="relative"
                      >
                        <AnimatePresence>
                          {isExpanding && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.92 }}
                              animate={{ opacity: 1, scale: 1.03 }}
                              exit={{ opacity: 0, scale: 1.06 }}
                              transition={{ duration: 0.38, ease: 'easeOut' }}
                              className="absolute -inset-2 rounded-3xl pointer-events-none z-20"
                              style={{
                                background: isVelouraCard
                                  ? 'radial-gradient(circle at 50% 50%, rgba(180, 123, 68, 0.32), rgba(212, 163, 115, 0.12) 55%, transparent 75%)'
                                  : 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.25), transparent 70%)',
                              }}
                            />
                          )}
                        </AnimatePresence>

                        <Tilt3DCard
                          maxTiltDeg={3}
                          className={`rounded-2xl bg-white dark:bg-zinc-900/65 border overflow-hidden transition-shadow duration-300 ${
                            isVelouraCard
                              ? 'border-zinc-200/90 dark:border-zinc-800/90 hover:border-[#B47B44]/60 dark:hover:border-[#B47B44]/60 hover:shadow-[0_20px_50px_-15px_rgba(180,123,68,0.22)]'
                              : 'border-zinc-200/90 dark:border-zinc-800/90 hover:border-blue-500/40 dark:hover:border-blue-500/40'
                          }`}
                        >
                          <article className="grid grid-cols-1 lg:grid-cols-12">
                            {/* Large Interactive Visual Preview Column */}
                            <div
                              role="button"
                              tabIndex={0}
                              aria-label={`Inspect interactive preview and case study for ${project.title}`}
                              onClick={() => handleOpenProjectCaseStudy(project)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault();
                                  handleOpenProjectCaseStudy(project);
                                }
                              }}
                              className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-zinc-200 dark:border-zinc-800 cursor-pointer group relative overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-blue-500"
                            >
                              <ProjectVisual
                                visualType={project.visualType}
                                onExpandCaseStudy={() => handleOpenProjectCaseStudy(project)}
                              />
                            </div>

                            {/* Content & Customization Action Column */}
                            <div
                              onClick={() => handleOpenProjectCaseStudy(project)}
                              className="lg:col-span-7 p-5 sm:p-8 flex flex-col justify-between space-y-6 cursor-pointer group/cardcontent"
                            >
                              <div className="space-y-4">
                                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                                  <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
                                    <span
                                      className={`font-semibold ${
                                        isVelouraCard
                                          ? 'text-[#B47B44] dark:text-[#D4A373]'
                                          : 'text-blue-600 dark:text-blue-400'
                                      }`}
                                    >
                                      {project.index}
                                    </span>
                                    <span aria-hidden="true">·</span>
                                    <span>{project.domain}</span>
                                  </div>

                                  <span
                                    className={`font-medium ${
                                      isVelouraCard
                                        ? 'text-[#B47B44] dark:text-[#D4A373]'
                                        : 'text-blue-600 dark:text-blue-400'
                                    }`}
                                  >
                                    {project.status}
                                  </span>
                                </div>

                                <div>
                                  <h3
                                    className={`font-display text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 transition-colors ${
                                      isVelouraCard
                                        ? 'group-hover/cardcontent:text-[#B47B44] dark:group-hover/cardcontent:text-[#D4A373]'
                                        : 'group-hover/cardcontent:text-blue-600 dark:group-hover/cardcontent:text-blue-400'
                                    }`}
                                  >
                                    {project.title}
                                  </h3>
                                  <p className="text-xs sm:text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-1">
                                    {project.subtitle}
                                  </p>
                                </div>

                                <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
                                  {project.overview}
                                </p>

                                {/* Key Features & Architecture Highlights */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                                  <div className="space-y-1.5">
                                    <p className="font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
                                      WHAT&apos;S INCLUDED IN THIS SAMPLE
                                    </p>
                                    <ul className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-300">
                                      {project.implementedFeatures.map((feat, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                          <span
                                            className={`font-mono ${
                                              isVelouraCard
                                                ? 'text-[#B47B44] dark:text-[#D4A373]'
                                                : 'text-blue-600 dark:text-blue-400'
                                            }`}
                                          >
                                            •
                                          </span>
                                          <span>{feat}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>

                                  <div className="space-y-1.5">
                                    <p className="font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
                                      TECHNICAL ARCHITECTURE
                                    </p>
                                    <ul className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-300">
                                      {project.architectureHighlights.map((arch, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                          <span
                                            className={`font-mono ${
                                              isVelouraCard
                                                ? 'text-[#B47B44] dark:text-[#D4A373]'
                                                : 'text-blue-600 dark:text-blue-400'
                                            }`}
                                          >
                                            •
                                          </span>
                                          <span>
                                            <strong className="text-zinc-800 dark:text-zinc-200">
                                              {arch.layer}:
                                            </strong>{' '}
                                            {arch.detail}
                                          </span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </div>

                              {/* Tech Stack & Action Buttons (Live Demo / Open App + Direct Contact for Customization) */}
                              <div className="pt-5 border-t border-zinc-200/80 dark:border-zinc-800/80 space-y-4">
                                <p className="font-mono text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                                  <span className="text-zinc-800 dark:text-zinc-200 font-medium">
                                    Built With:{' '}
                                  </span>
                                  {project.technologies.join(' · ')}
                                </p>

                                {/* Primary Action Row: Live Demo OR Open App + Interactive Preview */}
                                <div className="flex flex-wrap items-center justify-between gap-3">
                                  <div className="flex flex-wrap items-center gap-2.5">
                                    {project.liveDemoUrl ? (
                                      <a
                                        href={project.liveDemoUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors whitespace-nowrap shrink-0 shadow-xs"
                                      >
                                        <ExternalLink className="w-3.5 h-3.5" />
                                        <span>Live Demo</span>
                                        <ArrowUpRight className="w-3 h-3" />
                                      </a>
                                    ) : (
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleOpenProjectCaseStudy(project);
                                        }}
                                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-xs"
                                      >
                                        <ExternalLink className="w-3.5 h-3.5" />
                                        <span>Open App</span>
                                        <ArrowUpRight className="w-3 h-3" />
                                      </button>
                                    )}

                                    <motion.button
                                      type="button"
                                      whileHover={{ scale: 1.03, y: -1 }}
                                      whileTap={{ scale: 0.96 }}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleOpenProjectCaseStudy(project);
                                      }}
                                      className={`inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                                        isVelouraCard
                                          ? 'border border-[#B47B44]/50 bg-[#B47B44]/15 text-[#B47B44] dark:text-[#D4A373] hover:bg-[#B47B44]/25 shadow-xs'
                                          : 'border border-blue-500/40 bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20'
                                      }`}
                                    >
                                      <Layers className="w-3.5 h-3.5" />
                                      <span>Interactive Preview</span>
                                    </motion.button>
                                  </div>
                                </div>

                                {/* Dedicated Contact & Customization Strip Below Every Project */}
                                <div className="p-3.5 sm:p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/75 border border-zinc-200/80 dark:border-zinc-800/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                  <div className="space-y-0.5">
                                    <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                                      Liked this {project.domain.toLowerCase()}?
                                    </p>
                                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                                      I can build &amp; customize a similar version tailored to your brand and features.
                                    </p>
                                  </div>

                                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                                    <a
                                      href={buildWhatsappLink(
                                        `Customize Project Like: ${project.title}`
                                      )}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      onClick={(e) => e.stopPropagation()}
                                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors whitespace-nowrap"
                                    >
                                      <MessageSquare className="w-3.5 h-3.5" />
                                      <span>WhatsApp to Customize</span>
                                    </a>

                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleSelectInquiryTopicAndScroll(
                                          `Customize Project Like: ${project.title}`
                                        );
                                      }}
                                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer"
                                    >
                                      <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                                      <span>Contact for Customization</span>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </article>
                        </Tilt3DCard>
                      </motion.div>
                    </ScrollReveal>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ===================================================================
              E. 03. COMPACT GATEWAY TO DEDICATED ABOUT ME, ACADEMIC JOURNEY & CV PAGE
          =================================================================== */}
          <section
            id="about-gateway"
            className="py-16 sm:py-20 border-b border-zinc-200/80 dark:border-zinc-800/80"
          >
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <ScrollReveal direction="up">
                <Tilt3DCard className="p-7 sm:p-10 rounded-2xl bg-white dark:bg-zinc-900/75 border border-zinc-200/90 dark:border-zinc-800/90 hover:border-blue-500/50">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-8 space-y-3">
                      <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-blue-600 dark:text-blue-400">
                        <GraduationCap className="w-4 h-4" />
                        <span>03. ABOUT ME · ACADEMIC JOURNEY · TECHNICAL SKILLS · OFFICIAL CV</span>
                      </div>
                      <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                        Want to View My Academic Journey, Technical Skills &amp; Official CV?
                      </h2>
                      <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
                        {education.degree} at {education.institution} ({education.duration}) ·{' '}
                        {education.internship.role} at {education.internship.company} · Certified in Java SE 21 (Infosys) &amp; GenAI (Oracle). Open my dedicated About page to view my full academic timeline, technical stack, and download my official CV.
                      </p>
                    </div>

                    <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
                      <button
                        type="button"
                        onClick={navigateToAbout}
                        className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 cursor-pointer shadow-lg shadow-blue-600/20"
                      >
                        <User className="w-4 h-4" />
                        <span>Open About, Academics &amp; CV Page</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => setIsResumeModalOpen(true)}
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs sm:text-sm font-medium text-zinc-800 dark:text-zinc-200 transition-colors cursor-pointer"
                      >
                        <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <span>Quick Preview Official CV</span>
                      </button>
                    </div>
                  </div>
                </Tilt3DCard>
              </ScrollReveal>
            </div>
          </section>

          {/* ===================================================================
              F. 04. CONTACT & CUSTOMIZATION INQUIRY SECTION
          =================================================================== */}
          <section id="contact" className="py-20 sm:py-24">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
              <ScrollReveal direction="up">
                <div className="space-y-3 max-w-2xl">
                  <p className="font-mono text-xs font-semibold text-blue-600 dark:text-blue-400">
                    04. START YOUR PROJECT OR CONNECT
                  </p>
                  <h2
                    className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100"
                    style={{ textWrap: 'balance' }}
                  >
                    Tell Me What Website or App You Want to Build &amp; Customize
                  </h2>
                  <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Liked a website or app sample above? Select your requirement below and message me directly on WhatsApp or Email to get started.
                  </p>
                </div>
              </ScrollReveal>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Direct Verified Contact Cards */}
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Mobile & WhatsApp Direct Card */}
                  <ScrollReveal direction="up" delayMs={40}>
                    <Tilt3DCard className="h-full p-6 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200/90 dark:border-zinc-800/90">
                      <div className="space-y-2">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                          <MessageSquare className="w-5 h-5" />
                        </div>
                        <h3 className="font-display text-base font-semibold text-zinc-900 dark:text-zinc-100">
                          WhatsApp &amp; Direct Call
                        </h3>
                        <p className="text-xs font-mono text-zinc-600 dark:text-zinc-300">
                          {personal.mobileNumber}
                        </p>
                      </div>

                      <div className="mt-5 flex items-center gap-2">
                        <a
                          href={personal.whatsappDirectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition-colors whitespace-nowrap"
                        >
                          <span>Chat on WhatsApp</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                        <a
                          href={`tel:${personal.mobileNumber.replace(/\s+/g, '')}`}
                          className="px-3 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                          title="Call mobile number"
                          aria-label="Call mobile number"
                        >
                          <Phone className="w-4 h-4" />
                        </a>
                        <button
                          type="button"
                          onClick={() => handleCopyText(personal.mobileNumber, 'phone')}
                          className="px-3 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                          title="Copy mobile number"
                          aria-label="Copy mobile number"
                        >
                          {copiedField === 'phone' ? (
                            <Check className="w-4 h-4 text-emerald-500" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </Tilt3DCard>
                  </ScrollReveal>

                  {/* Email Card */}
                  <ScrollReveal direction="up" delayMs={80}>
                    <Tilt3DCard className="h-full p-6 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200/90 dark:border-zinc-800/90">
                      <div className="space-y-2">
                        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                          <Mail className="w-5 h-5" />
                        </div>
                        <h3 className="font-display text-base font-semibold text-zinc-900 dark:text-zinc-100">
                          Email Address
                        </h3>
                        <p className="text-xs font-mono text-zinc-600 dark:text-zinc-300 break-all">
                          {personal.emailAddress}
                        </p>
                      </div>

                      <div className="mt-5 flex items-center gap-2">
                        <a
                          href={buildMailtoLink()}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 text-xs font-medium text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors whitespace-nowrap"
                        >
                          <span>Send Email</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                        <button
                          type="button"
                          onClick={() => handleCopyText(personal.emailAddress, 'email')}
                          className="px-3 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                          title="Copy email address"
                          aria-label="Copy email address"
                        >
                          {copiedField === 'email' ? (
                            <Check className="w-4 h-4 text-emerald-500" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </Tilt3DCard>
                  </ScrollReveal>

                  {/* LinkedIn Card */}
                  <ScrollReveal direction="up" delayMs={120}>
                    <Tilt3DCard className="h-full p-6 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200/90 dark:border-zinc-800/90">
                      <div className="space-y-2">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                          <Linkedin className="w-5 h-5" />
                        </div>
                        <h3 className="font-display text-base font-semibold text-zinc-900 dark:text-zinc-100">
                          LinkedIn Profile
                        </h3>
                        <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400 break-all">
                          {personal.linkedinHandle}
                        </p>
                      </div>

                      <a
                        href={personal.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium transition-colors whitespace-nowrap"
                      >
                        <span>Connect on LinkedIn</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </Tilt3DCard>
                  </ScrollReveal>

                  {/* GitHub Profile Card */}
                  <ScrollReveal direction="up" delayMs={160}>
                    <Tilt3DCard className="h-full p-6 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200/90 dark:border-zinc-800/90">
                      <div className="space-y-2">
                        <div className="w-10 h-10 rounded-xl bg-zinc-500/10 border border-zinc-500/20 flex items-center justify-center text-zinc-700 dark:text-zinc-300">
                          <Github className="w-5 h-5" />
                        </div>
                        <h3 className="font-display text-base font-semibold text-zinc-900 dark:text-zinc-100">
                          GitHub Profile
                        </h3>
                        <p className="text-xs font-mono text-zinc-600 dark:text-zinc-300 break-all">
                          github.com/{personal.githubUsername}
                        </p>
                      </div>

                      <a
                        href={personal.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:opacity-90 text-xs font-medium transition-opacity whitespace-nowrap"
                      >
                        <span>View GitHub (@{personal.githubUsername})</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </Tilt3DCard>
                  </ScrollReveal>

                  {/* Instagram Social Card */}
                  <ScrollReveal direction="up" delayMs={200} className="sm:col-span-2">
                    <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200/90 dark:border-zinc-800/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-600 dark:text-pink-400 shrink-0">
                          <Instagram className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-display text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                            Instagram Profile
                          </h3>
                          <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                            {personal.instagramHandle}
                          </p>
                        </div>
                      </div>

                      <a
                        href={personal.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 text-xs font-medium text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors whitespace-nowrap shrink-0"
                      >
                        <span>Follow on Instagram</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </ScrollReveal>
                </div>

                {/* Right Column: Interactive Inquiry Topic Launcher */}
                <ScrollReveal direction="up" delayMs={100} className="lg:col-span-5">
                  <div className="h-full p-6 sm:p-8 rounded-2xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <p className="font-mono text-xs font-semibold text-blue-600 dark:text-blue-400">
                        CUSTOM PROJECT &amp; SAMPLE INQUIRY
                      </p>
                      <h3 className="font-display text-xl font-bold text-zinc-900 dark:text-zinc-100">
                        Select What You Want Built
                      </h3>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        Choose an option below to send a pre-structured message on WhatsApp ({personal.mobileNumber}) or Email.
                      </p>

                      {/* Topic Selector Buttons */}
                      <div className="space-y-2 pt-1">
                        <label className="block font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
                          SELECTED REQUIREMENT:
                        </label>
                        <div className="grid grid-cols-1 gap-2">
                          {[
                            'Custom Business Website or Landing Page',
                            'Customize a Sample Website / App from Portfolio',
                            'Full-Stack Web Application or Dashboard',
                            'Native Android Mobile App (Java / MVVM)',
                            'Personal Portfolio or Website Redesign',
                            'Software Developer / Engineering Role',
                          ].map((topic) => (
                            <button
                              key={topic}
                              type="button"
                              onClick={() => setSelectedInquiryTopic(topic)}
                              className={`text-left px-3.5 py-2.5 rounded-xl border text-xs font-medium transition-colors cursor-pointer flex items-center justify-between gap-2 ${
                                selectedInquiryTopic === topic
                                  ? 'border-blue-600 bg-blue-50/60 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300'
                                  : 'border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-950/40 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700'
                              }`}
                            >
                              <span className="truncate">{topic}</span>
                              {selectedInquiryTopic === topic && (
                                <Check className="w-3.5 h-3.5 shrink-0 text-blue-600 dark:text-blue-400" />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Dispatch Actions */}
                    <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 space-y-2.5">
                      <a
                        href={buildWhatsappLink(selectedInquiryTopic)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Message on WhatsApp ({personal.mobileNumber})</span>
                      </a>

                      <div className="grid grid-cols-2 gap-2.5">
                        <a
                          href={buildMailtoLink(selectedInquiryTopic)}
                          className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 text-xs font-medium text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors whitespace-nowrap"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Send Email</span>
                        </a>

                        <a
                          href={personal.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 text-xs font-medium text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors whitespace-nowrap"
                        >
                          <Linkedin className="w-3.5 h-3.5 text-blue-500" />
                          <span>LinkedIn</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* =====================================================================
          G. FOOTER
      ===================================================================== */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-950/80 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <p className="font-display text-base font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              {personal.name}
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Custom Websites · Landing Pages · Web Apps · Android Applications
            </p>
            <p className="text-xs font-mono text-zinc-400 dark:text-zinc-500 pt-1">
              © {new Date().getFullYear()} {personal.name}. Built with React, TypeScript &amp; Tailwind CSS.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-xs font-medium text-zinc-600 dark:text-zinc-400">
            <button
              type="button"
              onClick={() => navigateToPortfolio()}
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => navigateToPortfolio('freelance')}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
            >
              Freelance Services
            </button>
            <button
              type="button"
              onClick={() => navigateToPortfolio('projects')}
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer"
            >
              Samples &amp; Projects
            </button>
            <button
              type="button"
              onClick={navigateToServices}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
            >
              All 8 Services
            </button>
            <button
              type="button"
              onClick={navigateToAbout}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
            >
              About, Academics &amp; CV
            </button>
            <a
              href={personal.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={personal.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              GitHub
            </a>
            <a
              href={personal.whatsappDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              WhatsApp
            </a>
            <a
              href={personal.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>
      </footer>

      {/* =====================================================================
          INTERACTIVE MODALS (Project Case Study + Official CV Viewer)
      ===================================================================== */}
      <ProjectDetailModal
        project={activeProjectModal}
        onClose={() => setActiveProjectModal(null)}
        onDiscussSimilar={(topic) =>
          handleSelectInquiryTopicAndScroll(`Customize Sample Like: ${topic}`)
        }
      />

      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />
    </div>
  );
}
