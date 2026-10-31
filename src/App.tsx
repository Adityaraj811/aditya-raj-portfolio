import React, { useState, useEffect, useCallback } from 'react';
import {
  Sun,
  Moon,
  Menu,
  X,
  ArrowUpRight,
  ArrowRight,
  Download,
  Linkedin,
  Github,
  Instagram,
  Mail,
  MessageSquare,
  Phone,
  Copy,
  Check,
  GraduationCap,
  Code2,
  Briefcase,
  Layers,
  ExternalLink,
  BookOpen,
  FileText,
} from 'lucide-react';
import {
  portfolioConfig,
  type ProjectItem,
} from './data/portfolioConfig';
import { TechIcon } from './components/TechIcon';
import { ProjectVisual } from './components/ProjectVisual';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { ResumeModal } from './components/ResumeModal';
import { ScrollReveal } from './components/ScrollReveal';
import { Tilt3DCard } from './components/Tilt3DCard';
import { HeroProfile3D } from './components/HeroProfile3D';
import { FreelanceServicesPage } from './components/FreelanceServicesPage';
import { handleDownloadResumePdf } from './utils/resumePdf';
import { motion, AnimatePresence } from 'framer-motion';
import { velouraSoundEngine } from './utils/velouraSoundEngine';

function detectServicesRoute(): boolean {
  if (typeof window === 'undefined') return false;
  const pathname = window.location.pathname.replace(/\/+$/, '');
  const hash = window.location.hash;
  const searchParams = new URLSearchParams(window.location.search);
  return (
    pathname.endsWith('/services') ||
    hash === '#/services' ||
    hash === '#services-page' ||
    searchParams.get('page') === 'services'
  );
}

export default function App() {
  const {
    personal,
    verifiedGithubRepos,
    corePillars,
    about,
    skillCategories,
    projects,
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

  // Page Routing State ('home' | 'services') — Supports clean `/services` route + GitHub Pages
  const [currentPage, setCurrentPage] = useState<'home' | 'services'>(() =>
    detectServicesRoute() ? 'services' : 'home'
  );

  // Active Navigation Section Highlight State
  const [activeSection, setActiveSection] = useState<string>('home');

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(detectServicesRoute() ? 'services' : 'home');
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
      setActiveSection('services');
      return;
    }

    const sectionIds = ['home', 'about', 'skills', 'projects', 'education', 'contact'];
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

  // Skills Category Filter State
  const [selectedSkillCat, setSelectedSkillCat] = useState<string>('all');

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
    'Software Developer / App & Web Developer Role'
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
      `Portfolio Inquiry: ${topic || selectedInquiryTopic} — Aditya Raj`
    );
    const body = encodeURIComponent(
      `Hi Aditya,\n\nI visited your portfolio and would like to connect regarding: ${
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

  const filteredSkillCategories =
    selectedSkillCat === 'all'
      ? skillCategories
      : skillCategories.filter((cat) => cat.id === selectedSkillCat);

  const filteredProjects =
    selectedProjectDomain === 'all'
      ? projects
      : projects.filter((p) => p.domain === selectedProjectDomain);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-[#07080C] dark:text-zinc-100 bg-architectural-grid transition-colors duration-200">
      {/* =====================================================================
          A. STICKY NAVIGATION BAR (Strict 3-Zone Top Bar Contract)
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

          {/* Zone 2: Concise Single-Line Navigation Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400"
          >
            {[
              { id: 'about', label: 'About' },
              { id: 'skills', label: 'Skills' },
              { id: 'projects', label: 'Projects' },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  navigateToPortfolio(item.id);
                }}
                className={`transition-colors whitespace-nowrap shrink-0 ${
                  currentPage === 'home' && activeSection === item.id
                    ? 'text-blue-600 dark:text-blue-400 font-semibold'
                    : 'hover:text-zinc-900 dark:hover:text-zinc-100'
                }`}
              >
                {item.label}
              </a>
            ))}

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
              Services
            </a>

            {[
              { id: 'education', label: 'Education' },
              { id: 'contact', label: 'Contact' },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  navigateToPortfolio(item.id);
                }}
                className={`transition-colors whitespace-nowrap shrink-0 ${
                  currentPage === 'home' && activeSection === item.id
                    ? 'text-blue-600 dark:text-blue-400 font-semibold'
                    : 'hover:text-zinc-900 dark:hover:text-zinc-100'
                }`}
              >
                {item.label}
              </a>
            ))}

            <a
              href={personal.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors whitespace-nowrap shrink-0"
            >
              GitHub
            </a>
          </nav>

          {/* Zone 3: Primary Action (Download Resume) + Mobile Menu Trigger */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={personal.resumePdfPath}
              download={personal.resumeDownloadFilename}
              onClick={(e) =>
                handleDownloadResumePdf(e, personal.resumePdfPath, personal.resumeDownloadFilename)
              }
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Resume</span>
            </a>

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
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  navigateToPortfolio('about');
                }}
                className="py-2 text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                About
              </a>
              <a
                href="#skills"
                onClick={(e) => {
                  e.preventDefault();
                  navigateToPortfolio('skills');
                }}
                className="py-2 text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Skills
              </a>
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  navigateToPortfolio('projects');
                }}
                className="py-2 text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Projects
              </a>
              <a
                href={`${getNormalizedBase()}services`}
                onClick={(e) => {
                  e.preventDefault();
                  navigateToServices();
                }}
                className="py-2 text-blue-600 dark:text-blue-400 font-semibold"
              >
                Freelance Services →
              </a>
              <a
                href="#education"
                onClick={(e) => {
                  e.preventDefault();
                  navigateToPortfolio('education');
                }}
                className="py-2 text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Education
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  navigateToPortfolio('contact');
                }}
                className="py-2 text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Contact
              </a>
              <a
                href={personal.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 inline-flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
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
          MAIN VIEW: EITHER DEDICATED FREELANCE SERVICES PAGE (`/services`)
          OR MAIN DEVELOPER PORTFOLIO HOMEPAGE (`/`)
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
      ) : (
        <main>
          {/* ===================================================================
              B. HERO SECTION (2-Column Split + 3D Animated Profile + Core Pillars)
          =================================================================== */}
          <section
            id="home"
            className="relative pt-10 pb-16 sm:pt-16 sm:pb-24 overflow-hidden border-b border-zinc-200/80 dark:border-zinc-800/80"
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
                {/* Left Column: Concise Developer Identity & Primary CTAs */}
                <ScrollReveal
                  direction="up"
                  className="lg:col-span-7 flex flex-col justify-between space-y-8"
                >
                  <div className="space-y-5">
                    <p className="font-mono text-sm sm:text-base font-medium text-blue-600 dark:text-blue-400 tracking-wide">
                      {personal.heroGreeting}
                    </p>

                    <h1
                      className="font-display font-bold tracking-tight text-zinc-900 dark:text-zinc-50 leading-[1.06]"
                      style={{
                        fontSize: 'clamp(2.5rem, 4.8vw, 4.25rem)',
                        textWrap: 'balance',
                      }}
                    >
                      {personal.heroDisplayTitle}
                    </h1>

                    <p className="text-base sm:text-xl text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-2xl">
                      {personal.heroDescription}
                    </p>
                  </div>

                  {/* Primary Action Buttons & Verified Social Strip */}
                  <div className="pt-2 space-y-7">
                    <div className="flex flex-wrap items-center gap-3.5">
                      <a
                        href="#projects"
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap shrink-0 shadow-lg shadow-blue-600/20"
                      >
                        <span>View Projects</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </a>

                      <a
                        href={personal.resumePdfPath}
                        download={personal.resumeDownloadFilename}
                        onClick={(e) =>
                          handleDownloadResumePdf(
                            e,
                            personal.resumePdfPath,
                            personal.resumeDownloadFilename
                          )
                        }
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:opacity-90 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download Resume</span>
                      </a>

                      <a
                        href="#contact"
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 hover:border-blue-500/50 dark:hover:border-blue-500/50 text-zinc-800 dark:text-zinc-200 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap shrink-0"
                      >
                        <span>Contact Me</span>
                      </a>

                      <button
                        type="button"
                        onClick={() => setIsResumeModalOpen(true)}
                        className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800/90 bg-zinc-100/70 dark:bg-zinc-900/50 hover:border-zinc-400 dark:hover:border-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <span>Preview CV</span>
                      </button>
                    </div>

                    {/* 3D Elevated Social Buttons & Highlighted Freelance Services CTA */}
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
                                  Freelance Services
                                </span>
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/35 text-[10px] font-mono font-semibold text-emerald-600 dark:text-emerald-300">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                  Available
                                </span>
                              </div>
                              <p className="text-[11px] font-mono text-zinc-600 dark:text-zinc-300">
                                Websites · Landing Pages · Custom Apps
                              </p>
                            </div>
                          </div>

                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-600 group-hover:bg-blue-500 text-white text-xs font-semibold transition-colors shrink-0">
                            <span>Explore</span>
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

              {/* Full-Width 3-Column Core Capabilities Strip Below Hero Split */}
              <div className="mt-12 pt-10 border-t border-zinc-200/80 dark:border-zinc-800/80 grid grid-cols-1 md:grid-cols-3 gap-6">
                {corePillars.map((pillar, idx) => (
                  <ScrollReveal key={pillar.index} delayMs={idx * 90} direction="up">
                    <Tilt3DCard className="h-full p-6 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200/90 dark:border-zinc-800/90 hover:border-blue-500/40 dark:hover:border-blue-500/40">
                      <div className="space-y-2">
                        <span className="font-mono text-xs font-semibold text-blue-600 dark:text-blue-400">
                          {pillar.index}
                        </span>
                        <h2 className="font-display text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                          {pillar.title}
                        </h2>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                          {pillar.summary}
                        </p>
                      </div>
                      <p className="pt-4 mt-4 border-t border-zinc-100 dark:border-zinc-800/80 font-mono text-xs text-zinc-500 dark:text-zinc-400">
                        {pillar.technologies}
                      </p>
                    </Tilt3DCard>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>

          {/* ===================================================================
              C. COMPACT ABOUT SECTION + SEPARATE RECRUITER & FREELANCE CARDS
          =================================================================== */}
          <section
            id="about"
            className="py-20 sm:py-24 border-b border-zinc-200/80 dark:border-zinc-800/80"
          >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
              {/* Compact About Overview & 4 Highlight Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
                <ScrollReveal direction="up" className="lg:col-span-5 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <p className="font-mono text-xs font-semibold text-blue-600 dark:text-blue-400">
                      01. ABOUT ME
                    </p>
                    <h2
                      className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100"
                      style={{ textWrap: 'balance' }}
                    >
                      {about.sectionTitle}
                    </h2>
                    <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
                      {about.shortIntro}
                    </p>
                  </div>

                  {/* Clean Technology Stack Line */}
                  <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200/90 dark:border-zinc-800/90 space-y-2.5">
                    <p className="font-mono text-xs text-blue-600 dark:text-blue-400 font-semibold">
                      CORE TECHNOLOGIES
                    </p>
                    <p className="font-mono text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
                      {about.techBadges.join(' · ')}
                    </p>
                  </div>
                </ScrollReveal>

                {/* 4 Compact Info Cards Grid */}
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {about.highlights.map((item, idx) => (
                    <ScrollReveal key={item.label} delayMs={idx * 70} direction="up">
                      <Tilt3DCard className="h-full p-5 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200/90 dark:border-zinc-800/90 hover:border-blue-500/40 dark:hover:border-blue-500/40">
                        <div className="space-y-1.5">
                          <p className="font-mono text-xs text-blue-600 dark:text-blue-400">
                            {item.label}
                          </p>
                          <h3 className="font-display text-lg font-bold text-zinc-900 dark:text-zinc-100">
                            {item.value}
                          </h3>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                            {item.detail}
                          </p>
                        </div>
                      </Tilt3DCard>
                    </ScrollReveal>
                  ))}
                </div>
              </div>

              {/* Dedicated Split: FOR SOFTWARE RECRUITERS vs FOR FREELANCE CLIENTS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {/* Card 1: FOR SOFTWARE RECRUITERS (Employment Opportunities Only) */}
                <ScrollReveal direction="up" delayMs={50}>
                  <Tilt3DCard className="h-full p-6 sm:p-7 rounded-2xl bg-white dark:bg-zinc-900/75 border border-zinc-200/90 dark:border-zinc-800/90 hover:border-blue-500/50 dark:hover:border-blue-500/50">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between gap-2">
                        <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-blue-600 dark:text-blue-400">
                          <Code2 className="w-4 h-4" />
                          <span>{about.recruiterCard.title}</span>
                        </div>
                        <span className="font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
                          Software Engineering Roles
                        </span>
                      </div>

                      <p className="text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
                        {about.recruiterCard.description}
                      </p>
                    </div>

                    <div className="pt-6 mt-6 border-t border-zinc-100 dark:border-zinc-800/80 flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setIsResumeModalOpen(true)}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>View Resume</span>
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleSelectInquiryTopicAndScroll(
                            'Software Developer / App & Web Developer Role'
                          )
                        }
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap"
                      >
                        <span>Let&apos;s Connect</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </Tilt3DCard>
                </ScrollReveal>

                {/* Card 2: FOR FREELANCE CLIENTS (Entire Card + Button Opens Dedicated `/services` Page) */}
                <ScrollReveal direction="up" delayMs={140}>
                  <Tilt3DCard
                    onClick={navigateToServices}
                    role="button"
                    tabIndex={0}
                    ariaLabel="Explore Freelance Development Services"
                    spotlightColor="rgba(99, 102, 241, 0.16)"
                    className="h-full p-6 sm:p-7 rounded-2xl bg-white dark:bg-zinc-900/75 border border-zinc-200/90 dark:border-zinc-800/90 hover:border-indigo-500/60 dark:hover:border-indigo-500/60 cursor-pointer group"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between gap-2">
                        <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                          <Briefcase className="w-4 h-4" />
                          <span>{about.freelanceCard.title}</span>
                        </div>
                        <span className="font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
                          Websites &amp; Applications
                        </span>
                      </div>

                      <p className="text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
                        {about.freelanceCard.description}
                      </p>
                    </div>

                    <div className="pt-6 mt-6 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between gap-3">
                      <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 group-hover:bg-blue-600 dark:group-hover:bg-blue-500 dark:group-hover:text-white text-xs font-semibold transition-colors whitespace-nowrap">
                        <span>{about.freelanceCard.buttonText}</span>
                      </span>

                      <span className="font-mono text-xs text-zinc-400 dark:text-zinc-500 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors">
                        Opens Dedicated Services Page
                      </span>
                    </div>
                  </Tilt3DCard>
                </ScrollReveal>
              </div>
            </div>
          </section>

          {/* ===================================================================
              D. TECHNICAL SKILLS SECTION (4 Categorized Groups, Zero Fake %)
          =================================================================== */}
          <section
            id="skills"
            className="py-20 sm:py-24 border-b border-zinc-200/80 dark:border-zinc-800/80"
          >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
              <ScrollReveal direction="up">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div className="space-y-2 max-w-2xl">
                    <p className="font-mono text-xs font-semibold text-blue-600 dark:text-blue-400">
                      02. TECHNICAL SKILLS
                    </p>
                    <h2
                      className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100"
                      style={{ textWrap: 'balance' }}
                    >
                      Programming, Backend, Mobile &amp; Web Stack
                    </h2>
                    <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
                      Core technologies applied across real web applications, Android MVVM projects, and Spring Boot backend systems.
                    </p>
                  </div>

                  {/* Interactive Domain Filter Control */}
                  <div
                    role="tablist"
                    aria-label="Filter skills by category"
                    className="flex flex-wrap items-center gap-1 p-1 rounded-xl bg-zinc-200/70 dark:bg-zinc-900 border border-zinc-300/60 dark:border-zinc-800"
                  >
                    <button
                      role="tab"
                      aria-selected={selectedSkillCat === 'all'}
                      onClick={() => setSelectedSkillCat('all')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        selectedSkillCat === 'all'
                          ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-xs'
                          : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                      }`}
                    >
                      All Skills
                    </button>
                    {skillCategories.map((cat) => (
                      <button
                        key={cat.id}
                        role="tab"
                        aria-selected={selectedSkillCat === cat.id}
                        onClick={() => setSelectedSkillCat(cat.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          selectedSkillCat === cat.id
                            ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-xs'
                            : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                        }`}
                      >
                        {cat.title}
                      </button>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              {/* Skill Category Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredSkillCategories.map((category, idx) => (
                  <ScrollReveal key={category.id} delayMs={idx * 80} direction="up">
                    <Tilt3DCard className="h-full p-6 sm:p-7 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200/90 dark:border-zinc-800/90">
                      <div className="space-y-1.5 border-b border-zinc-100 dark:border-zinc-800/80 pb-4 mb-5">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono text-xs font-semibold text-blue-600 dark:text-blue-400">
                            {category.index}
                          </span>
                          <span className="font-mono text-xs text-zinc-400 dark:text-zinc-500 tabular-nums">
                            {category.skills.length} Technologies
                          </span>
                        </div>
                        <h3 className="font-display text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                          {category.title}
                        </h3>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                          {category.subtitle}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {category.skills.map((skill) => (
                          <div
                            key={`${category.id}-${skill.name}`}
                            className="p-3.5 rounded-xl bg-zinc-50/90 dark:bg-zinc-950/60 border border-zinc-200/70 dark:border-zinc-800/80 hover:border-blue-500/40 dark:hover:border-blue-500/40 transition-colors flex items-start gap-3"
                          >
                            <div className="p-2 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5">
                              <TechIcon iconKey={skill.iconKey} className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                              <h4 className="font-display text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                                {skill.name}
                              </h4>
                              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 leading-snug">
                                {skill.context}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Tilt3DCard>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>

          {/* ===================================================================
              E. FEATURED PROJECTS SECTION (Completed KHATA, Apple Vision UI, Library Mitra)
          =================================================================== */}
          <section
            id="projects"
            className="py-20 sm:py-24 border-b border-zinc-200/80 dark:border-zinc-800/80"
          >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
              <ScrollReveal direction="up">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div className="space-y-2 max-w-2xl">
                    <p className="font-mono text-xs font-semibold text-blue-600 dark:text-blue-400">
                      03. FEATURED PROJECTS
                    </p>
                    <h2
                      className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100"
                      style={{ textWrap: 'balance' }}
                    >
                      Applications &amp; Web Engineering Work
                    </h2>
                    <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
                      Hands-on mobile and web applications built with Java, Spring Boot, Android MVVM, and interactive frontend technologies.
                    </p>
                  </div>

                  {/* Project Domain Filter Tabs */}
                  <div
                    role="tablist"
                    aria-label="Filter projects by domain"
                    className="flex flex-wrap items-center gap-1 p-1 rounded-xl bg-zinc-200/70 dark:bg-zinc-900 border border-zinc-300/60 dark:border-zinc-800"
                  >
                    {['all', 'Website Design & Development', 'Android & Backend', 'Web Application'].map((domain) => (
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
                        {domain === 'all' ? `All Projects (${projects.length})` : domain}
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
                        {/* Expanding Radial Bronze Bloom on Click */}
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
                              aria-label={`Inspect architecture and case study for ${project.title}`}
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

                            {/* Content & Architecture Column (Click to Pop-In Case Study) */}
                            <div
                              onClick={() => handleOpenProjectCaseStudy(project)}
                              className="lg:col-span-7 p-5 sm:p-8 flex flex-col justify-between space-y-6 cursor-pointer group/cardcontent"
                            >
                              <div className="space-y-4">
                                {/* Unboxed Metadata Line */}
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
                                      KEY FEATURES
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
                                      ARCHITECTURAL HIGHLIGHTS
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

                              {/* Tech Stack & Action Buttons */}
                              <div className="pt-5 border-t border-zinc-200/80 dark:border-zinc-800/80 space-y-4">
                                <p className="font-mono text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                                  <span className="text-zinc-800 dark:text-zinc-200 font-medium">
                                    Stack:{' '}
                                  </span>
                                  {project.technologies.join(' · ')}
                                </p>

                                <div className="flex flex-wrap items-center justify-between gap-3">
                                  <div className="flex flex-wrap items-center gap-2.5">
                                    {project.liveDemoUrl && (
                                      <a
                                        href={project.liveDemoUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium transition-colors whitespace-nowrap shrink-0 shadow-xs"
                                      >
                                        <ExternalLink className="w-3.5 h-3.5" />
                                        <span>Live Demo</span>
                                        <ArrowUpRight className="w-3 h-3" />
                                      </a>
                                    )}

                                    <a
                                      href={project.githubUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      onClick={(e) => e.stopPropagation()}
                                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 text-xs font-medium text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors whitespace-nowrap shrink-0"
                                    >
                                      <Github className="w-3.5 h-3.5" />
                                      <span>{project.githubButtonLabel}</span>
                                      <ArrowUpRight className="w-3 h-3" />
                                    </a>

                                    <motion.button
                                      type="button"
                                      whileHover={{ scale: 1.03, y: -1 }}
                                      whileTap={{ scale: 0.96 }}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleOpenProjectCaseStudy(project);
                                      }}
                                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                                        isVelouraCard
                                          ? 'border border-[#B47B44]/50 bg-[#B47B44]/15 text-[#B47B44] dark:text-[#D4A373] hover:bg-[#B47B44]/25 shadow-xs'
                                          : project.liveDemoUrl
                                          ? 'border border-blue-500/40 bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20'
                                          : 'bg-blue-600 hover:bg-blue-500 text-white'
                                      }`}
                                    >
                                      <Layers className="w-3.5 h-3.5" />
                                      <span>Project Case Study</span>
                                    </motion.button>
                                  </div>

                                  <span className="font-mono text-[11px] text-zinc-400 dark:text-zinc-500">
                                    {project.githubPlaceholderNote}
                                  </span>
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

              {/* Verified Public GitHub Repositories Strip */}
              <ScrollReveal direction="up">
                <div className="pt-8 border-t border-zinc-200/80 dark:border-zinc-800/80 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <p className="font-mono text-xs text-blue-600 dark:text-blue-400">
                        PUBLIC REPOSITORIES · @{personal.githubUsername}
                      </p>
                      <h3 className="font-display text-xl font-bold text-zinc-900 dark:text-zinc-100">
                        Featured GitHub Repositories
                      </h3>
                    </div>
                    <a
                      href={personal.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 text-xs font-medium hover:opacity-90 transition-opacity whitespace-nowrap shrink-0"
                    >
                      <Github className="w-4 h-4" />
                      <span>View GitHub Profile (@{personal.githubUsername})</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {verifiedGithubRepos.map((repo) => (
                      <Tilt3DCard
                        key={repo.name}
                        className="p-6 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200/90 dark:border-zinc-800/90 hover:border-blue-500/40 dark:hover:border-blue-500/40"
                      >
                        <div className="space-y-2.5">
                          <div className="flex items-center justify-between gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400">
                            <span>{repo.category}</span>
                            <span>Public Repo</span>
                          </div>
                          <h4 className="font-display text-lg font-semibold text-zinc-900 dark:text-zinc-100 break-all">
                            {repo.name}
                          </h4>
                          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            {repo.description}
                          </p>
                        </div>

                        <div className="pt-4 mt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between">
                          <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400 truncate max-w-[65%]">
                            github.com/{personal.githubUsername}/{repo.name}
                          </span>
                          <a
                            href={repo.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline whitespace-nowrap shrink-0"
                          >
                            <span>Open Repository</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </Tilt3DCard>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* ===================================================================
              F. EDUCATION, CERTIFICATIONS & EXPERIENCE SECTION
          =================================================================== */}
          <section
            id="education"
            className="py-20 sm:py-24 border-b border-zinc-200/80 dark:border-zinc-800/80"
          >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
              <ScrollReveal direction="up">
                <div className="space-y-2 max-w-2xl">
                  <p className="font-mono text-xs font-semibold text-blue-600 dark:text-blue-400">
                    04. EDUCATION, CERTIFICATIONS &amp; EXPERIENCE
                  </p>
                  <h2
                    className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100"
                    style={{ textWrap: 'balance' }}
                  >
                    Academic Qualification, Oracle Certification &amp; Internship
                  </h2>
                </div>
              </ScrollReveal>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Complete Academic Timeline (B.Tech, Class XII, Class X) */}
                <ScrollReveal direction="up" delayMs={50} className="lg:col-span-7">
                  <Tilt3DCard className="h-full p-6 sm:p-8 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200/90 dark:border-zinc-800/90">
                    <div className="space-y-5">
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400 border-b border-zinc-100 dark:border-zinc-800/80 pb-3.5">
                        <span className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-semibold">
                          <GraduationCap className="w-4 h-4" />
                          <span>ACADEMIC QUALIFICATIONS (B.TECH · CLASS XII · CLASS X)</span>
                        </span>
                        <span>RGPV &amp; BSEB</span>
                      </div>

                      {/* Academic Timeline Items */}
                      <div className="space-y-4">
                        {education.academicTimeline.map((item) => (
                          <div
                            key={item.degreeOrClass}
                            className="p-4 rounded-xl bg-zinc-50/90 dark:bg-zinc-950/60 border border-zinc-200/80 dark:border-zinc-800/80 space-y-1.5"
                          >
                            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                              <span className="text-blue-600 dark:text-blue-400 font-semibold">
                                {item.level}
                              </span>
                              <div className="flex items-center gap-2 tabular-nums">
                                <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                                  {item.score}
                                </span>
                                <span aria-hidden="true" className="text-zinc-400">
                                  ·
                                </span>
                                <span className="text-zinc-500 dark:text-zinc-400">
                                  {item.duration}
                                </span>
                              </div>
                            </div>

                            <h3 className="font-display text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100">
                              {item.degreeOrClass}
                            </h3>

                            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300">
                              {item.institution}{' '}
                              <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                                ({item.boardOrUniversity})
                              </span>
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-5 mt-6 border-t border-zinc-200/80 dark:border-zinc-800/80 space-y-3">
                      <p className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                        CORE COMPUTER SCIENCE COURSEWORK
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-700 dark:text-zinc-300">
                        {education.coreCoursework.map((course, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <span className="font-mono text-blue-600 dark:text-blue-400">
                              0{idx + 1}.
                            </span>
                            <span>{course}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Tilt3DCard>
                </ScrollReveal>

                {/* Right Column: OCI Certification, Internship & Achievements */}
                <ScrollReveal direction="up" delayMs={130} className="lg:col-span-5">
                  <Tilt3DCard className="h-full p-6 sm:p-8 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200/90 dark:border-zinc-800/90">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-xs font-mono text-blue-600 dark:text-blue-400 font-semibold border-b border-zinc-100 dark:border-zinc-800/80 pb-3.5">
                        <BookOpen className="w-4 h-4" />
                        <span>CERTIFICATIONS, INTERNSHIP &amp; ACHIEVEMENTS</span>
                      </div>

                      {/* Oracle OCI Certification Highlight */}
                      {education.certifications.map((cert) => (
                        <div
                          key={cert.title}
                          className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/70 border border-zinc-200/80 dark:border-zinc-800/90 space-y-2"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                            <span className="text-blue-600 dark:text-blue-400 font-semibold">
                              {cert.issuer.toUpperCase()}
                            </span>
                            <span>
                              {cert.date}
                              {cert.validity ? ` · ${cert.validity}` : ''}
                            </span>
                          </div>

                          <h3 className="font-display text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100 leading-snug">
                            {cert.title}
                          </h3>

                          <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            {cert.description}
                          </p>

                          {cert.credentialUrl && (
                            <div className="pt-1">
                              <a
                                href={cert.credentialUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                              >
                                <span>{cert.credentialLabel || 'Verify Credential'}</span>
                                <ArrowUpRight className="w-3.5 h-3.5" />
                              </a>
                            </div>
                          )}
                        </div>
                      ))}

                      {/* Internship Experience Highlight */}
                      <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/70 border border-zinc-200/80 dark:border-zinc-800/90 space-y-1.5">
                        <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                            INTERNSHIP EXPERIENCE · {education.internship.company.toUpperCase()}
                          </span>
                          <span>{education.internship.duration}</span>
                        </div>
                        <h3 className="font-display text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100">
                          {education.internship.role}
                        </h3>
                        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                          {education.internship.description}
                        </p>
                      </div>

                      {/* Coding Achievement */}
                      <div className="p-3.5 rounded-xl bg-blue-500/5 border border-blue-500/20 text-xs text-zinc-700 dark:text-zinc-300 font-mono">
                        ✓ {education.achievements[0]}
                      </div>
                    </div>

                    <div className="pt-6 mt-6 border-t border-zinc-100 dark:border-zinc-800/80 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <a
                        href={personal.resumePdfPath}
                        download={personal.resumeDownloadFilename}
                        onClick={(e) =>
                          handleDownloadResumePdf(
                            e,
                            personal.resumePdfPath,
                            personal.resumeDownloadFilename
                          )
                        }
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium transition-colors whitespace-nowrap cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download Resume</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => setIsResumeModalOpen(true)}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 text-xs font-medium text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer whitespace-nowrap"
                      >
                        <span>Preview CV (PDF)</span>
                      </button>
                    </div>
                  </Tilt3DCard>
                </ScrollReveal>
              </div>
            </div>
          </section>

          {/* ===================================================================
              G. CONTACT SECTION (Verified Channels + Topic Launcher)
          =================================================================== */}
          <section id="contact" className="py-20 sm:py-24">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
              <ScrollReveal direction="up">
                <div className="space-y-3 max-w-2xl">
                  <p className="font-mono text-xs font-semibold text-blue-600 dark:text-blue-400">
                    05. CONTACT ME
                  </p>
                  <h2
                    className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100"
                    style={{ textWrap: 'balance' }}
                  >
                    Let&apos;s Connect on Software Roles or Development Projects
                  </h2>
                  <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Reach out directly for Software Developer / App &amp; Web Developer opportunities or to discuss a website or application project.
                  </p>
                </div>
              </ScrollReveal>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Direct Verified Contact Cards */}
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* LinkedIn Card */}
                  <ScrollReveal direction="up" delayMs={40}>
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
                  <ScrollReveal direction="up" delayMs={80}>
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

                  {/* Mobile & WhatsApp Direct Card */}
                  <ScrollReveal direction="up" delayMs={120}>
                    <Tilt3DCard className="h-full p-6 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200/90 dark:border-zinc-800/90">
                      <div className="space-y-2">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                          <MessageSquare className="w-5 h-5" />
                        </div>
                        <h3 className="font-display text-base font-semibold text-zinc-900 dark:text-zinc-100">
                          Mobile &amp; WhatsApp
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
                  <ScrollReveal direction="up" delayMs={160}>
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
                        DIRECT INQUIRY LAUNCHER
                      </p>
                      <h3 className="font-display text-xl font-bold text-zinc-900 dark:text-zinc-100">
                        Start a Conversation
                      </h3>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        Select a topic below to open a pre-structured message on WhatsApp ({personal.mobileNumber}), Email, or LinkedIn.
                      </p>

                      {/* Topic Selector Buttons */}
                      <div className="space-y-2 pt-1">
                        <label className="block font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
                          SELECT INQUIRY PURPOSE:
                        </label>
                        <div className="grid grid-cols-1 gap-2">
                          {[
                            'Software Developer / App & Web Developer Role',
                            'Java Backend / Android Application Role',
                            'Business Website or Landing Page Project',
                            'Web Application or Android App Project',
                            'Personal Portfolio or Website Redesign',
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
          H. FOOTER (No Source Code ZIP Download — Clean Links Only)
      ===================================================================== */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-950/80 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <p className="font-display text-base font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              {personal.name}
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {personal.professionalHeadline}
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
              onClick={() => navigateToPortfolio('projects')}
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer"
            >
              Projects
            </button>
            <button
              type="button"
              onClick={navigateToServices}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
            >
              Freelance Services
            </button>
            <button
              type="button"
              onClick={() => setIsResumeModalOpen(true)}
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer"
            >
              Preview CV
            </button>
            <a
              href={personal.resumePdfPath}
              download={personal.resumeDownloadFilename}
              onClick={(e) =>
                handleDownloadResumePdf(e, personal.resumePdfPath, personal.resumeDownloadFilename)
              }
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
            >
              Download Resume
            </a>
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
        onDiscussSimilar={(topic) => handleSelectInquiryTopicAndScroll(`Project Inquiry: ${topic}`)}
      />

      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />
    </div>
  );
}
