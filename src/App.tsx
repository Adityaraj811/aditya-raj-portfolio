import React, { useState, useEffect } from 'react';
import {
  Sun,
  Moon,
  Menu,
  X,
  ArrowUpRight,
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
  Clock,
  ChevronRight,
  ExternalLink,
  BookOpen,
} from 'lucide-react';
import {
  portfolioConfig,
  type ProjectItem,
  type FreelanceServiceItem,
} from './data/portfolioConfig';
import { TechIcon } from './components/TechIcon';
import { ProjectVisual } from './components/ProjectVisual';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { ResumeModal } from './components/ResumeModal';
import { handleDownloadResumePdf } from './utils/resumePdf';

export default function App() {
  const {
    personal,
    verifiedGithubRepos,
    corePillars,
    about,
    skillCategories,
    projects,
    javaBackendFocus,
    freelanceSection,
    education,
  } = portfolioConfig;

  // Theme management: Dark charcoal default with light mode toggle
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

  // Modals State
  const [activeProjectModal, setActiveProjectModal] = useState<ProjectItem | null>(null);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  // Freelance Inquiry Topic Selection State
  const [selectedInquiryTopic, setSelectedInquiryTopic] = useState<string>(
    'General Software Opportunity / Freelance Website Inquiry'
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

  const handleSelectFreelanceInquiry = (topic: string) => {
    setSelectedInquiryTopic(topic);
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const buildMailtoLink = (topic?: string) => {
    const subject = encodeURIComponent(
      `Portfolio Inquiry: ${topic || selectedInquiryTopic} — Aditya Raj`
    );
    const body = encodeURIComponent(
      `Hi Aditya,\n\nI visited your developer portfolio and would like to connect regarding: ${
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
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-[#09090B] dark:text-zinc-100 bg-architectural-grid transition-colors duration-200">
      {/* =====================================================================
          A. STICKY NAVIGATION BAR (Strict 3-Zone Top Bar Contract)
      ===================================================================== */}
      <header className="sticky top-0 z-40 w-full bg-zinc-50/85 dark:bg-[#09090B]/85 backdrop-blur-md border-b border-zinc-200/80 dark:border-zinc-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single Text Wordmark */}
          <a
            href="#home"
            className="font-display text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100 whitespace-nowrap shrink-0"
          >
            ADITYA RAJ
          </a>

          {/* Zone 2: Concise Single-Line Navigation Links (Including GitHub) */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400"
          >
            <a
              href="#about"
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors whitespace-nowrap shrink-0"
            >
              About
            </a>
            <a
              href="#skills"
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors whitespace-nowrap shrink-0"
            >
              Skills
            </a>
            <a
              href="#projects"
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors whitespace-nowrap shrink-0"
            >
              Projects
            </a>
            <a
              href="#services"
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors whitespace-nowrap shrink-0"
            >
              Services
            </a>
            <a
              href="#education"
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors whitespace-nowrap shrink-0"
            >
              Education
            </a>
            <a
              href="#contact"
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors whitespace-nowrap shrink-0"
            >
              Contact
            </a>
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
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-white/90 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer"
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
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Home
              </a>
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                About
              </a>
              <a
                href="#skills"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Skills
              </a>
              <a
                href="#projects"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Projects
              </a>
              <a
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                What I Build
              </a>
              <a
                href="#education"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Education
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
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

      <main>
        {/* =====================================================================
            B. HERO SECTION (2-Column Split + Full-Width 3-Pillar Strip Below)
        ===================================================================== */}
        <section
          id="home"
          className="relative pt-10 pb-16 sm:pt-16 sm:pb-24 overflow-hidden border-b border-zinc-200/80 dark:border-zinc-800/80"
        >
          {/* Subtle Ambient Radial Glow */}
          <div
            className="absolute top-0 left-1/4 -translate-x-1/2 w-[560px] h-[360px] rounded-full pointer-events-none opacity-60 dark:opacity-100"
            style={{
              background:
                'radial-gradient(circle, rgba(59,130,246,0.12) 0%, rgba(139,92,246,0.05) 50%, transparent 75%)',
            }}
          />

          <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
            {/* Top Utility Bar inside Hero: Availability Signal + Theme Switcher */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-8 border-b border-zinc-200/70 dark:border-zinc-800/70">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-600 dark:text-zinc-400">
                <span className="font-medium text-blue-600 dark:text-blue-400">
                  {personal.professionalHeadline}
                </span>
                <span aria-hidden="true">·</span>
                <span>{personal.availabilityBanner}</span>
              </div>

              <div className="flex items-center gap-3">
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
            </div>

            {/* 2-Column Split Hero */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
              {/* Left Column: Typographic Hierarchy & CTAs */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                <div className="space-y-5">
                  <p className="font-mono text-sm font-medium text-blue-600 dark:text-blue-400 tracking-wide">
                    {personal.heroGreeting}
                  </p>

                  <h1
                    className="font-display font-bold tracking-tight text-zinc-900 dark:text-zinc-50 leading-[1.08]"
                    style={{
                      fontSize: 'clamp(2.25rem, 4.2vw, 3.75rem)',
                      textWrap: 'balance',
                    }}
                  >
                    {personal.heroDisplayTitle}
                  </h1>

                  <p className="text-base sm:text-lg font-medium text-zinc-800 dark:text-zinc-200">
                    {personal.professionalHeadline}
                  </p>

                  <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
                    {personal.heroDescription} {personal.professionalIntroduction}
                  </p>
                </div>

                {/* Primary & Secondary Action Cluster */}
                <div className="pt-2 space-y-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href="#projects"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors whitespace-nowrap shrink-0"
                    >
                      <span>View My Projects</span>
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
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:opacity-90 text-sm font-medium transition-opacity whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Resume</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => setIsResumeModalOpen(true)}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 hover:border-zinc-400 dark:hover:border-zinc-700 text-zinc-800 dark:text-zinc-200 text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <span>Preview CV</span>
                    </button>

                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 hover:border-zinc-400 dark:hover:border-zinc-700 text-zinc-800 dark:text-zinc-200 text-sm font-medium transition-colors whitespace-nowrap shrink-0"
                    >
                      <span>Contact Me</span>
                    </a>
                  </div>

                  {/* Verified Social Links (LinkedIn, GitHub, WhatsApp Direct) */}
                  <div className="pt-4 border-t border-zinc-200/80 dark:border-zinc-800/80 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-4">
                      <a
                        href={personal.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap"
                        aria-label="Aditya Raj on LinkedIn"
                      >
                        <Linkedin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <span>LinkedIn</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>

                      <span className="text-zinc-300 dark:text-zinc-700" aria-hidden="true">
                        /
                      </span>

                      <a
                        href={personal.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors whitespace-nowrap"
                        aria-label="Aditya Raj on GitHub"
                      >
                        <Github className="w-4 h-4" />
                        <span>GitHub (@{personal.githubUsername})</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>

                      <span className="text-zinc-300 dark:text-zinc-700" aria-hidden="true">
                        /
                      </span>

                      <a
                        href={personal.whatsappDirectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors whitespace-nowrap"
                        aria-label="Contact Aditya Raj on WhatsApp"
                      >
                        <MessageSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        <span>WhatsApp</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>

                      <span className="text-zinc-300 dark:text-zinc-700" aria-hidden="true">
                        /
                      </span>

                      <a
                        href={personal.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors whitespace-nowrap"
                        aria-label="Aditya Raj on Instagram"
                      >
                        <Instagram className="w-4 h-4 text-pink-600 dark:text-pink-400" />
                        <span>Instagram</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>

                    <a
                      href="#services"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      <span>Need a Website Built? Explore Services</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Column: Studio Portrait & Developer Identity Card */}
              <div className="lg:col-span-5 flex flex-col">
                <div className="relative h-full rounded-2xl bg-white dark:bg-[#111115] border border-zinc-200/90 dark:border-zinc-800/90 p-5 sm:p-6 flex flex-col justify-between shadow-sm">
                  {/* Top Card Header with Subtle Display Toggle */}
                  <div className="flex items-center justify-between gap-2 pb-4 mb-4 border-b border-zinc-100 dark:border-zinc-800/80">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-semibold text-blue-600 dark:text-blue-400">
                        DEVELOPER PROFILE
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        if (usingFallbackAvatar) {
                          setUsingFallbackAvatar(false);
                          setProfileImgSrc(personal.profileImagePath);
                        } else {
                          setUsingFallbackAvatar(true);
                          setProfileImgSrc(personal.profileFallbackSvg);
                        }
                      }}
                      className="font-mono text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                      title="Switch between portrait photo and minimalist monogram view"
                    >
                      {usingFallbackAvatar ? 'Show Portrait Photo' : 'Use Monogram View'}
                    </button>
                  </div>

                  {/* Balanced Portrait Frame — Preserves 1:1 / 4:5 Aspect Ratio Without Cropping */}
                  <div className="my-auto flex flex-col items-center text-center">
                    <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-2xl overflow-hidden bg-gradient-to-b from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 border border-zinc-200/90 dark:border-zinc-700/80 shadow-md p-1.5">
                      <div className="relative w-full h-full rounded-xl overflow-hidden bg-zinc-200 dark:bg-zinc-900">
                        <img
                          src={profileImgSrc}
                          alt={`${personal.name} — ${personal.professionalHeadline}`}
                          referrerPolicy="no-referrer"
                          onError={handleProfileImageError}
                          className="w-full h-full object-cover object-center transition-transform duration-300"
                        />
                        {/* Subtle bottom vignette to blend light studio backdrop into frame */}
                        {!usingFallbackAvatar && (
                          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/5 pointer-events-none" />
                        )}
                      </div>
                    </div>

                    {/* Identity & Role Summary Under Portrait */}
                    <div className="mt-5 space-y-1.5">
                      <h2 className="font-display text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                        {personal.name}
                      </h2>
                      <p className="text-xs font-medium text-blue-600 dark:text-blue-400">
                        {personal.professionalHeadline}
                      </p>
                      <p className="font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
                        B.Tech CSE · Java · Spring Boot · Android · Web
                      </p>
                    </div>
                  </div>

                  {/* Bottom Quick Contact Bar inside Profile Card */}
                  <div className="pt-4 mt-5 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between gap-2 text-xs font-mono">
                    <a
                      href={`mailto:${personal.emailAddress}`}
                      className="text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 truncate transition-colors"
                      title={personal.emailAddress}
                    >
                      {personal.emailAddress}
                    </a>
                    <a
                      href={personal.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline shrink-0"
                    >
                      @{personal.githubUsername}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Full-Width 3-Column Engineering Pillars Strip Below Hero Split */}
            <div className="mt-12 pt-10 border-t border-zinc-200/80 dark:border-zinc-800/80 grid grid-cols-1 md:grid-cols-3 gap-6">
              {corePillars.map((pillar) => (
                <div
                  key={pillar.index}
                  className="p-6 rounded-xl bg-white dark:bg-zinc-900/60 border border-zinc-200/90 dark:border-zinc-800/90 flex flex-col justify-between space-y-4"
                >
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
                  <p className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 font-mono text-xs text-zinc-500 dark:text-zinc-400">
                    {pillar.technologies}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================================
            C. ABOUT ME SECTION
        ===================================================================== */}
        <section
          id="about"
          className="py-20 sm:py-24 border-b border-zinc-200/80 dark:border-zinc-800/80"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left Column: Section Heading & Key Identity Metadata */}
              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-2">
                  <p className="font-mono text-xs text-blue-600 dark:text-blue-400">
                    01. ABOUT ME &amp; ENGINEERING FOCUS
                  </p>
                  <h2
                    className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100"
                    style={{ textWrap: 'balance' }}
                  >
                    {about.sectionTitle}
                  </h2>
                </div>

                <p className="text-base font-medium text-zinc-800 dark:text-zinc-200 leading-relaxed">
                  {about.leadParagraph}
                </p>

                {/* Structured Specification List */}
                <div className="pt-2 space-y-3">
                  {about.focusAreas.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-white dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80"
                    >
                      <p className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                        {item.label}
                      </p>
                      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mt-1">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Narrative Prose & Dual-Purpose Value */}
              <div className="lg:col-span-7 space-y-6">
                <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-zinc-900/50 border border-zinc-200/90 dark:border-zinc-800/90 space-y-5">
                  {about.bodyParagraphs.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-base text-zinc-600 dark:text-zinc-300 leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}

                  {/* Dual Track Summary inside About */}
                  <div className="pt-6 mt-6 border-t border-zinc-200 dark:border-zinc-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/70 border border-zinc-200/70 dark:border-zinc-800/80 space-y-1.5">
                      <div className="flex items-center gap-2 text-xs font-mono text-blue-600 dark:text-blue-400">
                        <Code2 className="w-4 h-4" />
                        <span>FOR SOFTWARE RECRUITERS</span>
                      </div>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        Strong foundation in Core Java, OOP, Spring Boot REST APIs, MySQL, Android MVVM development, and responsive web technologies.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/70 border border-zinc-200/70 dark:border-zinc-800/80 space-y-1.5">
                      <div className="flex items-center gap-2 text-xs font-mono text-violet-600 dark:text-violet-400">
                        <Briefcase className="w-4 h-4" />
                        <span>FOR FREELANCE CLIENTS</span>
                      </div>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        Available part-time to build Business Websites, Portfolios, Landing Pages, Startup Websites, and Website Redesigns.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            D. TECHNICAL SKILLS SECTION (6 Categories, Recognizable Icons, Zero Fake %)
        ===================================================================== */}
        <section
          id="skills"
          className="py-20 sm:py-24 border-b border-zinc-200/80 dark:border-zinc-800/80"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <p className="font-mono text-xs text-blue-600 dark:text-blue-400">
                  02. TECHNICAL CAPABILITIES
                </p>
                <h2
                  className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100"
                  style={{ textWrap: 'balance' }}
                >
                  Core Technologies &amp; Engineering Stack
                </h2>
                <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
                  Organized by engineering domain. Demonstrated through real application architecture and hands-on development rather than arbitrary percentage ratings.
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
                  All Domains (6)
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
                    {cat.title.replace(' Development', '').replace(' Languages', '')}
                  </button>
                ))}
              </div>
            </div>

            {/* Skill Category Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredSkillCategories.map((category) => (
                <div
                  key={category.id}
                  className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200/90 dark:border-zinc-800/90 flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-1.5 border-b border-zinc-100 dark:border-zinc-800/80 pb-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-xs font-semibold text-blue-600 dark:text-blue-400">
                        {category.index}
                      </span>
                      <span className="font-mono text-xs text-zinc-400 dark:text-zinc-500 tabular-nums">
                        {category.skills.length}{' '}
                        {category.skills.length === 1 ? 'Technology' : 'Technologies'}
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
                        key={skill.name}
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
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================================
            E. FEATURED PROJECTS SECTION + VERIFIED PUBLIC GITHUB REPOSITORIES
        ===================================================================== */}
        <section
          id="projects"
          className="py-20 sm:py-24 border-b border-zinc-200/80 dark:border-zinc-800/80"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <p className="font-mono text-xs text-blue-600 dark:text-blue-400">
                  03. FEATURED ENGINEERING WORK
                </p>
                <h2
                  className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100"
                  style={{ textWrap: 'balance' }}
                >
                  Projects &amp; Backend Architecture
                </h2>
                <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
                  Real software projects, Java backend systems, and verified public GitHub repositories with transparent development status.
                </p>
              </div>

              {/* Project Domain Filter Tabs */}
              <div
                role="tablist"
                aria-label="Filter projects by domain"
                className="flex flex-wrap items-center gap-1 p-1 rounded-xl bg-zinc-200/70 dark:bg-zinc-900 border border-zinc-300/60 dark:border-zinc-800"
              >
                {['all', 'Android & Backend', 'Web Platform'].map((domain) => (
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
                    {domain === 'all' ? 'All Projects (3)' : domain}
                  </button>
                ))}
              </div>
            </div>

            {/* Project Showcase Cards */}
            <div className="space-y-8">
              {filteredProjects.map((project) => (
                <article
                  key={project.id}
                  className="rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200/90 dark:border-zinc-800/90 overflow-hidden grid grid-cols-1 lg:grid-cols-12"
                >
                  {/* Visual Column */}
                  <div
                    role="button"
                    tabIndex={0}
                    aria-label={`Inspect architecture and case study for ${project.title}`}
                    onClick={() => setActiveProjectModal(project)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setActiveProjectModal(project);
                      }
                    }}
                    className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-zinc-200 dark:border-zinc-800 cursor-pointer group relative overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-blue-500"
                  >
                    <ProjectVisual visualType={project.visualType} />
                  </div>

                  {/* Content & Architecture Column */}
                  <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      {/* Unboxed Metadata Line (Zero-Pill Discipline) */}
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                        <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
                          <span className="text-blue-600 dark:text-blue-400 font-semibold">
                            {project.index}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>{project.domain}</span>
                        </div>

                        <div className="flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300">
                          {project.status === 'In Development' && (
                            <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                          )}
                          <span
                            className={
                              project.status === 'In Development'
                                ? 'text-amber-600 dark:text-amber-400 font-medium'
                                : 'text-blue-600 dark:text-blue-400 font-medium'
                            }
                          >
                            Status: {project.status}
                          </span>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
                          {project.title}
                        </h3>
                        <p className="text-xs sm:text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-1">
                          {project.subtitle}
                        </p>
                      </div>

                      <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
                        {project.overview}
                      </p>

                      {/* Key Features & Honest Separation for Ongoing Work */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        <div className="space-y-1.5">
                          <p className="font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
                            {project.status === 'In Development'
                              ? 'CORE ARCHITECTURE & FEATURES'
                              : 'KEY HIGHLIGHTS & CONTRIBUTIONS'}
                          </p>
                          <ul className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-300">
                            {project.implementedFeatures.slice(0, 4).map((feat, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="font-mono text-blue-600 dark:text-blue-400">•</span>
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {project.ongoingOrPlannedFeatures &&
                        project.ongoingOrPlannedFeatures.length > 0 ? (
                          <div className="space-y-1.5">
                            <p className="font-mono text-[11px] text-amber-600 dark:text-amber-400">
                              ONGOING / PLANNED MILESTONES
                            </p>
                            <ul className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-300">
                              {project.ongoingOrPlannedFeatures.map((item, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="font-mono text-amber-500">→</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : (
                          <div className="space-y-1.5">
                            <p className="font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
                              ARCHITECTURAL HIGHLIGHTS
                            </p>
                            <ul className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-300">
                              {project.architectureHighlights.map((arch, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="font-mono text-blue-600 dark:text-blue-400">•</span>
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
                        )}
                      </div>
                    </div>

                    {/* Tech Stack & Action Buttons */}
                    <div className="pt-5 border-t border-zinc-200/80 dark:border-zinc-800/80 space-y-4">
                      <p className="font-mono text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                        <span className="text-zinc-800 dark:text-zinc-200 font-medium">Stack: </span>
                        {project.technologies.join(' · ')}
                      </p>

                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <button
                            onClick={() => setActiveProjectModal(project)}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                          >
                            <Layers className="w-3.5 h-3.5" />
                            <span>Inspect Architecture &amp; Case Study</span>
                          </button>

                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 text-xs font-medium text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors whitespace-nowrap shrink-0"
                          >
                            <Github className="w-3.5 h-3.5" />
                            <span>{project.githubButtonLabel}</span>
                            <ArrowUpRight className="w-3 h-3" />
                          </a>

                          {project.liveDemoUrl && (
                            <a
                              href={project.liveDemoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 text-xs font-medium text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors whitespace-nowrap shrink-0"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              <span>Live Demo</span>
                            </a>
                          )}
                        </div>

                        <span className="font-mono text-[11px] text-zinc-400 dark:text-zinc-500">
                          {project.githubPlaceholderNote}
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Dedicated Java Backend Engineering Specialization Subsection (Not a Project Card) */}
            <div className="pt-10 border-t border-zinc-200/80 dark:border-zinc-800/80 space-y-6">
              <div className="space-y-1.5 max-w-2xl">
                <p className="font-mono text-xs text-blue-600 dark:text-blue-400">
                  {javaBackendFocus.sectionKicker}
                </p>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                  {javaBackendFocus.sectionTitle}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {javaBackendFocus.sectionSubtitle}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {javaBackendFocus.corePillars.map((item) => (
                  <div
                    key={item.index}
                    className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-zinc-900/50 border border-zinc-200/90 dark:border-zinc-800/90 flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-2">
                      <span className="font-mono text-xs font-semibold text-blue-600 dark:text-blue-400">
                        {item.index}
                      </span>
                      <h4 className="font-display text-base sm:text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                        {item.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    <p className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 font-mono text-xs text-zinc-500 dark:text-zinc-400">
                      {item.tags}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Verified Public GitHub Repositories Strip (https://github.com/Adityaraj811) */}
            <div className="pt-8 border-t border-zinc-200/80 dark:border-zinc-800/80 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <p className="font-mono text-xs text-blue-600 dark:text-blue-400">
                    VERIFIED PUBLIC GITHUB REPOSITORIES · @{personal.githubUsername}
                  </p>
                  <h3 className="font-display text-xl font-bold text-zinc-900 dark:text-zinc-100">
                    Public Code Repositories on GitHub
                  </h3>
                </div>
                <a
                  href={personal.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 text-xs font-medium hover:opacity-90 transition-opacity whitespace-nowrap shrink-0"
                >
                  <Github className="w-4 h-4" />
                  <span>View All on github.com/{personal.githubUsername}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {verifiedGithubRepos.map((repo) => (
                  <div
                    key={repo.name}
                    className="p-6 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200/90 dark:border-zinc-800/90 flex flex-col justify-between space-y-4 hover:border-blue-500/40 dark:hover:border-blue-500/40 transition-colors"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400">
                        <span>{repo.category}</span>
                        <span>Public Repository</span>
                      </div>
                      <h4 className="font-display text-lg font-semibold text-zinc-900 dark:text-zinc-100 break-all">
                        {repo.name}
                      </h4>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        {repo.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between">
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
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            F. PART-TIME FREELANCE SECTION ("WHAT I CAN BUILD")
        ===================================================================== */}
        <section
          id="services"
          className="py-20 sm:py-24 border-b border-zinc-200/80 dark:border-zinc-800/80"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
            {/* Section Header */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <p className="font-mono text-xs text-blue-600 dark:text-blue-400">
                  04. {freelanceSection.sectionKicker.toUpperCase()}
                </p>
                <h2
                  className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100"
                  style={{ textWrap: 'balance' }}
                >
                  {freelanceSection.sectionTitle}
                </h2>
                <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {freelanceSection.sectionIntro}
                </p>
              </div>

              {/* Tasteful Top CTA Cluster */}
              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <button
                  onClick={() => handleSelectFreelanceInquiry('Freelance Website Project')}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium transition-colors whitespace-nowrap cursor-pointer"
                >
                  <span>Discuss a Project</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
                <a
                  href={personal.whatsappDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 text-xs font-medium text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors whitespace-nowrap"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Hire Me on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* 6 Freelance Web Offerings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {freelanceSection.services.map((service: FreelanceServiceItem) => (
                <div
                  key={service.id}
                  className="p-6 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200/90 dark:border-zinc-800/90 flex flex-col justify-between space-y-6 hover:border-blue-500/40 dark:hover:border-blue-500/40 transition-colors"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-blue-600 dark:text-blue-400 font-semibold">
                        {service.index}
                      </span>
                      <span className="text-zinc-400 dark:text-zinc-500">Web Development</span>
                    </div>

                    <h3 className="font-display text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                      {service.title}
                    </h3>

                    <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                      {service.tagline}
                    </p>

                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {service.description}
                    </p>

                    <ul className="pt-2 space-y-1.5 text-xs text-zinc-600 dark:text-zinc-300">
                      {service.deliverables.map((del, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="font-mono text-blue-600 dark:text-blue-400">•</span>
                          <span>{del}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 space-y-3">
                    <p className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                      Ideal for: {service.idealFor}
                    </p>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleSelectFreelanceInquiry(service.inquiryTopic)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:opacity-90 text-xs font-medium transition-opacity whitespace-nowrap cursor-pointer"
                      >
                        <span>Discuss a Project</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>

                      <a
                        href={buildWhatsappLink(service.inquiryTopic)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors whitespace-nowrap"
                        title="Chat on WhatsApp about this service"
                      >
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Personal Developer Commitment Banner */}
            <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <p className="font-display text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  Direct Collaboration with {personal.name}
                </p>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  {freelanceSection.personalCommitmentNote}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <a
                  href={personal.whatsappDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium transition-colors whitespace-nowrap"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Let&apos;s Connect on WhatsApp</span>
                </a>
                <a
                  href={buildMailtoLink('Freelance Website Inquiry')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 text-xs font-medium text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors whitespace-nowrap"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Hire Me via Email</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            G. EDUCATION & GENUINE LEARNING FOUNDATION
        ===================================================================== */}
        <section
          id="education"
          className="py-20 sm:py-24 border-b border-zinc-200/80 dark:border-zinc-800/80"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
            <div className="space-y-2 max-w-2xl">
              <p className="font-mono text-xs text-blue-600 dark:text-blue-400">
                05. EDUCATION &amp; ENGINEERING FOUNDATION
              </p>
              <h2
                className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100"
                style={{ textWrap: 'balance' }}
              >
                Academic Background &amp; Practical Focus
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Primary Degree Card */}
              <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200/90 dark:border-zinc-800/90 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400">
                    <span className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-medium">
                      <GraduationCap className="w-4 h-4" />
                      <span>UNDERGRADUATE DEGREE</span>
                    </span>
                    <span>{education.durationPlaceholder}</span>
                  </div>

                  <div>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                      {education.degree}
                    </h3>
                    <p className="text-base font-medium text-blue-600 dark:text-blue-400 mt-1">
                      {education.specialization}
                    </p>
                    <div className="mt-3 space-y-1 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                      <p>
                        <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                          Institute:{' '}
                        </span>
                        <span className="font-medium text-zinc-900 dark:text-zinc-100">
                          {education.institution}
                        </span>
                      </p>
                      <p>
                        <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                          University:{' '}
                        </span>
                        <span className="font-medium text-zinc-800 dark:text-zinc-200">
                          {education.university}
                        </span>
                      </p>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
                    {education.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-200/80 dark:border-zinc-800/80 space-y-3">
                  <p className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                    RELEVANT COMPUTER SCIENCE COURSEWORK
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-700 dark:text-zinc-300">
                    {education.coreCoursework.map((course, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="font-mono text-blue-600 dark:text-blue-400">0{idx + 1}.</span>
                        <span>{course}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Practical Engineering & Authenticity Note */}
              <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200/90 dark:border-zinc-800/90 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-blue-600 dark:text-blue-400">
                    <BookOpen className="w-4 h-4" />
                    <span>HANDS-ON DEVELOPMENT &amp; CERTIFICATIONS</span>
                  </div>

                  <h3 className="font-display text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                    Project-Driven Engineering Practice
                  </h3>

                  <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                    {education.academicAndSelfLearningNote}
                  </p>

                  <div className="space-y-2.5 pt-2 text-xs text-zinc-600 dark:text-zinc-400">
                    <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200/70 dark:border-zinc-800/80">
                      <p className="font-medium text-zinc-900 dark:text-zinc-100">
                        Android &amp; Spring Boot Integration
                      </p>
                      <p className="mt-1">
                        Architecting end-to-end mobile + backend data flow in KHATA using Room, Retrofit, Spring Boot REST APIs, and MySQL.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200/70 dark:border-zinc-800/80">
                      <p className="font-medium text-zinc-900 dark:text-zinc-100">
                        Core Java, JDBC, Hibernate &amp; DSA
                      </p>
                      <p className="mt-1">
                        Consistent practice in Object-Oriented Programming, relational database persistence, and algorithmic problem solving.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
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
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium transition-colors whitespace-nowrap cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Resume</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setIsResumeModalOpen(true)}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 text-xs font-medium text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <span>Preview CV (PDF)</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            H. CONTACT SECTION (Recruiters + Freelance Clients, Real Channels Only)
        ===================================================================== */}
        <section id="contact" className="py-20 sm:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
            <div className="space-y-3 max-w-2xl">
              <p className="font-mono text-xs text-blue-600 dark:text-blue-400">
                06. GET IN TOUCH — CAREER &amp; FREELANCE INQUIRIES
              </p>
              <h2
                className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100"
                style={{ textWrap: 'balance' }}
              >
                Let&apos;s Connect on Software Roles or Your Next Website Project
              </h2>
              <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Whether you are a recruiter hiring for Java Backend, Android, or Web engineering roles—or a client looking to build a modern website—you can reach me directly through verified channels below.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Direct Verified Contact Cards */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* LinkedIn Card (Verified URL) */}
                <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200/90 dark:border-zinc-800/90 flex flex-col justify-between space-y-5">
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
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium transition-colors whitespace-nowrap"
                  >
                    <span>Connect on LinkedIn</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* GitHub Profile Card (Verified URL: https://github.com/Adityaraj811) */}
                <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200/90 dark:border-zinc-800/90 flex flex-col justify-between space-y-5">
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
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:opacity-90 text-xs font-medium transition-opacity whitespace-nowrap"
                  >
                    <span>View GitHub (@{personal.githubUsername})</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Mobile & WhatsApp Direct Card (+91 9263605950 / https://wa.me/919263605950) */}
                <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200/90 dark:border-zinc-800/90 flex flex-col justify-between space-y-5">
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

                  <div className="flex items-center gap-2">
                    <a
                      href={personal.whatsappDirectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition-colors whitespace-nowrap"
                    >
                      <span>Chat on WhatsApp</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={`tel:${personal.mobileNumber.replace(/\s+/g, '')}`}
                      className="px-3 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                      title="Call mobile number"
                      aria-label="Call mobile number"
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => handleCopyText(personal.mobileNumber, 'phone')}
                      className="px-3 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
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
                </div>

                {/* Email Card (Editable Placeholder + Copy + Mailto) */}
                <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200/90 dark:border-zinc-800/90 flex flex-col justify-between space-y-5">
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-600 dark:text-violet-400">
                      <Mail className="w-5 h-5" />
                    </div>
                    <h3 className="font-display text-base font-semibold text-zinc-900 dark:text-zinc-100">
                      Email Address
                    </h3>
                    <p className="text-xs font-mono text-zinc-600 dark:text-zinc-300 break-all">
                      {personal.emailAddress}
                    </p>
                    {!personal.isEmailConfigured && (
                      <p className="text-[11px] font-mono text-zinc-400">
                        Editable in src/data/portfolioConfig.ts
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={buildMailtoLink()}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 text-xs font-medium text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors whitespace-nowrap"
                    >
                      <span>Send Email</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                    <button
                      onClick={() => handleCopyText(personal.emailAddress, 'email')}
                      className="px-3 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
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
                </div>

                {/* Instagram Social Card */}
                <div className="sm:col-span-2 p-5 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200/90 dark:border-zinc-800/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 text-xs font-medium text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>Follow on Instagram</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Right Column: Interactive Inquiry Topic Launcher (Real WhatsApp / Mailto / LinkedIn Dispatch) */}
              <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <p className="font-mono text-xs text-blue-600 dark:text-blue-400">
                    DIRECT INQUIRY LAUNCHER
                  </p>
                  <h3 className="font-display text-xl font-bold text-zinc-900 dark:text-zinc-100">
                    Select a Topic to Start a Conversation
                  </h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Choose your inquiry purpose below to open a pre-structured message directly on WhatsApp ({personal.mobileNumber}), Email, or LinkedIn.
                  </p>

                  {/* Topic Selector Buttons */}
                  <div className="space-y-2 pt-1">
                    <label className="block font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
                      SELECT INQUIRY PURPOSE:
                    </label>
                    <div className="grid grid-cols-1 gap-2">
                      {[
                        'Software Engineering / Full-Time Developer Role',
                        'Java Backend / Android Development Role',
                        'Business Website or Startup Website Project',
                        'Personal Portfolio or Landing Page Project',
                        'Website Redesign & Responsive Upgrade',
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
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Message on WhatsApp ({personal.mobileNumber})</span>
                  </a>

                  <div className="grid grid-cols-2 gap-2.5">
                    <a
                      href={buildMailtoLink(selectedInquiryTopic)}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 text-xs font-medium text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors whitespace-nowrap"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Send Email</span>
                    </a>

                    <a
                      href={personal.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 text-xs font-medium text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors whitespace-nowrap"
                    >
                      <Linkedin className="w-3.5 h-3.5 text-blue-500" />
                      <span>Connect on LinkedIn</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* =====================================================================
          I. FOOTER
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
              © {new Date().getFullYear()} {personal.name}. Built with React, Vite &amp; Tailwind CSS.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-xs font-medium text-zinc-600 dark:text-zinc-400">
            <a
              href="#home"
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              Top
            </a>
            <a
              href="#projects"
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              Projects
            </a>
            <a
              href="#services"
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              What I Build
            </a>
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
            <a
              href={personal.sourceZipPath}
              download="aditya-raj-portfolio.zip"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              title="Download complete React + Vite source code ZIP"
            >
              <Download className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Source Code (.ZIP)</span>
            </a>
          </div>
        </div>
      </footer>

      {/* =====================================================================
          INTERACTIVE MODALS (Project Case Study + ATS Resume Viewer)
      ===================================================================== */}
      <ProjectDetailModal
        project={activeProjectModal}
        onClose={() => setActiveProjectModal(null)}
        onDiscussSimilar={(topic) => handleSelectFreelanceInquiry(`Project Inquiry: ${topic}`)}
      />

      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />
    </div>
  );
}
