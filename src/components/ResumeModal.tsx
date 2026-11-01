import React, { useEffect, useRef, useState } from 'react';
import {
  X,
  Download,
  ExternalLink,
  FileText,
  ZoomIn,
  ZoomOut,
  Printer,
  ArrowUpRight,
} from 'lucide-react';
import { portfolioConfig } from '../data/portfolioConfig';
import {
  getVerifiedResumeBlobUrl,
  handleDownloadResumePdf,
} from '../utils/resumePdf';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const { personal, education } = portfolioConfig;
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [viewMode, setViewMode] = useState<'page' | 'pdf'>('page');
  const [zoomed, setZoomed] = useState<boolean>(false);
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string>(personal.resumePdfPath);

  useEffect(() => {
    if (!isOpen) return;
    try {
      setPdfBlobUrl(getVerifiedResumeBlobUrl());
    } catch {
      setPdfBlobUrl(personal.resumePdfPath);
    }
  }, [isOpen, personal.resumePdfPath]);

  // Keyboard accessibility: ESC to close, Tab focus trap, and focus restoration
  useEffect(() => {
    if (!isOpen) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';

    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 20);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      previousFocus?.focus?.();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrintCv = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
    >
      <div
        ref={dialogRef}
        className="relative w-full max-w-5xl h-[92vh] flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl text-zinc-900 dark:text-zinc-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3.5 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
            <div>
              <h3 id="resume-modal-title" className="font-display text-base font-semibold">
                {personal.name} — Official One-Page CV (PDF)
              </h3>
              <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                {personal.resumeDownloadFilename} · Updated One-Page Resume
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center p-0.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs">
              <button
                type="button"
                onClick={() => setViewMode('page')}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                  viewMode === 'page'
                    ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-xs'
                    : 'text-zinc-600 dark:text-zinc-400'
                }`}
              >
                CV Page View
              </button>
              <button
                type="button"
                onClick={() => setViewMode('pdf')}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                  viewMode === 'pdf'
                    ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-xs'
                    : 'text-zinc-600 dark:text-zinc-400'
                }`}
              >
                Native PDF Reader
              </button>
            </div>

            {viewMode === 'page' && (
              <button
                type="button"
                onClick={() => setZoomed((z) => !z)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 text-xs font-medium text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                title={zoomed ? 'Fit to width' : 'Zoom in'}
              >
                {zoomed ? <ZoomOut className="w-3.5 h-3.5" /> : <ZoomIn className="w-3.5 h-3.5" />}
                <span className="hidden md:inline">{zoomed ? 'Fit Page' : 'Zoom In'}</span>
              </button>
            )}

            <button
              type="button"
              onClick={handlePrintCv}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 text-xs font-medium text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
              title="Print CV"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print</span>
            </button>

            <a
              href={personal.resumePdfPath}
              download={personal.resumeDownloadFilename}
              onClick={(e) =>
                handleDownloadResumePdf(e, personal.resumePdfPath, personal.resumeDownloadFilename)
              }
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Resume</span>
            </a>

            <a
              href={pdfBlobUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 text-xs font-medium text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Open PDF</span>
            </a>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
              aria-label="Close resume preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Official One-Page CV Viewer */}
        <div
          id="printable-resume-area"
          className="flex-1 w-full bg-zinc-200/80 dark:bg-zinc-950 overflow-auto flex justify-center p-3 sm:p-6"
        >
          {viewMode === 'page' ? (
            <div
              className={`bg-white text-zinc-900 shadow-xl rounded-lg overflow-hidden border border-zinc-300 transition-all duration-200 h-fit p-6 sm:p-10 font-sans ${
                zoomed ? 'w-[1000px] max-w-none' : 'w-full max-w-3xl'
              }`}
            >
              {/* Header */}
              <div className="text-center border-b border-zinc-300 pb-4 mb-5">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-wide text-[#0f2942]">
                  ADITYA RAJ
                </h1>
                <p className="text-xs sm:text-sm font-bold tracking-wider text-zinc-800 mt-1">
                  JAVA BACKEND DEVELOPER | WEB &amp; ANDROID DEVELOPER
                </p>
                <div className="mt-2.5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-zinc-700">
                  <a
                    href={personal.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-0.5 text-blue-700 font-medium hover:underline"
                  >
                    <span>LinkedIn</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                  <span>|</span>
                  <a
                    href={`mailto:${personal.emailAddress}`}
                    className="text-blue-700 font-medium hover:underline"
                  >
                    {personal.emailAddress}
                  </a>
                  <span>|</span>
                  <span>{personal.mobileNumber}</span>
                  <span>|</span>
                  <a
                    href={personal.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-0.5 text-blue-700 font-medium hover:underline"
                  >
                    <span>GitHub</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Professional Summary */}
              <div className="mb-5">
                <h2 className="text-xs font-bold tracking-wider text-[#0f2942] uppercase border-b border-zinc-300 pb-1 mb-2">
                  PROFESSIONAL SUMMARY
                </h2>
                <p className="text-xs sm:text-[13px] text-zinc-800 leading-relaxed">
                  Developer focused on Java backend engineering, with hands-on project experience building Android applications using Java/XML and backend services using Spring Boot, REST APIs, JPA/Hibernate, and SQL. Also experienced in responsive web interfaces, object-oriented programming, and data structures and algorithms; solved 400+ coding problems across online platforms.
                </p>
              </div>

              {/* Technical Skills */}
              <div className="mb-5">
                <h2 className="text-xs font-bold tracking-wider text-[#0f2942] uppercase border-b border-zinc-300 pb-1 mb-2">
                  TECHNICAL SKILLS
                </h2>
                <div className="text-xs sm:text-[13px] text-zinc-800 space-y-1 leading-relaxed">
                  <p>
                    <strong>Programming:</strong> Java, JavaScript, SQL
                  </p>
                  <p>
                    <strong>Backend:</strong> Spring Boot, Spring Security, REST APIs, JDBC, Hibernate, JPA
                  </p>
                  <p>
                    <strong>Core Concepts:</strong> Core Java, OOP, Data Structures and Algorithms
                  </p>
                  <p>
                    <strong>Android:</strong> Android (Java), XML Layouts, MVVM, ViewModel, LiveData, Room, Retrofit
                  </p>
                  <p>
                    <strong>Web:</strong> HTML5, CSS3, React, TypeScript, GSAP, ScrollTrigger, Canvas API
                  </p>
                  <p>
                    <strong>Databases &amp; Tools:</strong> MySQL, PostgreSQL, Git, GitHub, Postman, Android Studio, VS Code, Linux/Ubuntu, Maven, Gradle
                  </p>
                </div>
              </div>

              {/* Experience */}
              <div className="mb-5">
                <h2 className="text-xs font-bold tracking-wider text-[#0f2942] uppercase border-b border-zinc-300 pb-1 mb-2">
                  EXPERIENCE
                </h2>
                <div className="text-xs sm:text-[13px] text-zinc-800">
                  <p className="font-bold text-zinc-900">
                    {education.internship.role}{' '}
                    <span className="font-normal text-zinc-600">
                      | {education.internship.company} | {education.internship.duration}
                    </span>
                  </p>
                  <ul className="list-disc list-inside mt-1 space-y-0.5 leading-relaxed">
                    <li>{education.internship.description}</li>
                  </ul>
                </div>
              </div>

              {/* Selected Projects */}
              <div className="mb-5">
                <h2 className="text-xs font-bold tracking-wider text-[#0f2942] uppercase border-b border-zinc-300 pb-1 mb-2.5">
                  SELECTED PROJECTS
                </h2>
                <div className="space-y-3 text-xs sm:text-[13px] text-zinc-800">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-bold text-zinc-900">
                        KHATA – Shared Expense Management App{' '}
                        <span className="font-semibold text-[#1e4b7a]">| In Development</span>
                      </p>
                      <a
                        href="https://github.com/Adityaraj811/khata-expence-manager"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-0.5 text-[11px] text-blue-700 font-medium hover:underline"
                      >
                        <span>GitHub</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    </div>
                    <p className="text-zinc-600 text-xs mt-0.5">
                      Java, Android XML, MVVM, Room, Retrofit, Spring Boot, REST APIs, Spring Security, JPA/Hibernate, MySQL
                    </p>
                    <ul className="list-disc list-inside mt-1 space-y-0.5 leading-relaxed">
                      <li>
                        Developing an Android application for household groups to record shared expenses, split costs, track member balances, and manage settlements.
                      </li>
                      <li>
                        Building the Spring Boot backend with REST endpoints and JPA repositories, alongside Android data integration using Room and Retrofit.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-bold text-zinc-900">Valoura - Live Website</p>
                      <a
                        href="https://valoura-one.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-0.5 text-[11px] text-blue-700 font-medium hover:underline"
                      >
                        <span>Live Website</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    </div>
                    <ul className="list-disc list-inside mt-1 space-y-0.5 leading-relaxed">
                      <li>
                        Deployed a web project to production on Vercel and managed its source-code versioning and deployment workflow using Git and GitHub.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-bold text-zinc-900">Apple Vision UI – Web Application</p>
                      <a
                        href="https://github.com/Adityaraj811/Apple-Vision-ui-Web-application"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-0.5 text-[11px] text-blue-700 font-medium hover:underline"
                      >
                        <span>GitHub</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    </div>
                    <p className="text-zinc-600 text-xs mt-0.5">
                      HTML5, CSS3, JavaScript, GSAP, ScrollTrigger, Canvas API
                    </p>
                    <ul className="list-disc list-inside mt-1 space-y-0.5 leading-relaxed">
                      <li>
                        Built a responsive Apple Vision Pro-inspired web interface with scroll-driven animations and interactive Canvas visuals.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-bold text-zinc-900">
                        KrishiMitra – AI-Based Crop Recommendation System{' '}
                        <span className="font-normal text-zinc-600">| Team Project</span>
                      </p>
                      <a
                        href={personal.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-0.5 text-[11px] text-blue-700 font-medium hover:underline"
                      >
                        <span>GitHub</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    </div>
                    <p className="text-zinc-600 text-xs mt-0.5">
                      Java, Python, Scikit-learn, React, TypeScript, PWA
                    </p>
                    <ul className="list-disc list-inside mt-1 space-y-0.5 leading-relaxed">
                      <li>
                        Collaborated in a four-member team to build a crop recommendation platform; evaluated 22 machine-learning algorithms and selected Extra Trees based on accuracy and inference latency.
                      </li>
                      <li>
                        Developed a multilingual PWA interface with offline fallback content and an agriculture economics dashboard.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Education */}
              <div className="mb-5">
                <h2 className="text-xs font-bold tracking-wider text-[#0f2942] uppercase border-b border-zinc-300 pb-1 mb-2">
                  EDUCATION
                </h2>
                <div className="space-y-1 text-xs sm:text-[13px] text-zinc-800 leading-relaxed">
                  <p>
                    <strong>B.Tech, Computer Science and Engineering</strong>{' '}
                    <span className="text-zinc-600">
                      | Technocrats Institute of Technology, Bhopal (RGPV) | 2022–2026 | CGPA: 7.0
                    </span>
                  </p>
                  <p className="text-zinc-700">
                    Class XII: S.B.S +2 H/S, Lakhisarai, Bihar (BSEB) | 71% | 2021–2022
                  </p>
                  <p className="text-zinc-700">
                    Class X: Gauri Shankar H/S, Katehar, Lakhisarai, Bihar (BSEB) | 71% | 2019–2020
                  </p>
                </div>
              </div>

              {/* Certifications & Achievements */}
              <div>
                <h2 className="text-xs font-bold tracking-wider text-[#0f2942] uppercase border-b border-zinc-300 pb-1 mb-2">
                  CERTIFICATIONS &amp; ACHIEVEMENTS
                </h2>
                <div className="space-y-1.5 text-xs sm:text-[13px] text-zinc-800 leading-relaxed">
                  <ul className="list-disc list-inside space-y-1">
                    <li>
                      Web Development Course – Rinex, in association with E-Cell, IIT Bhubaneswar (Dec 2025 – Jan 2026).
                    </li>
                    <li>
                      Solved 400+ coding problems across CodeChef, HackerRank, GeeksforGeeks, and LeetCode, including 100+ on LeetCode.
                    </li>
                  </ul>
                  <p className="text-zinc-600 pt-1">
                    Languages: English (Fluent), Hindi (Native) &nbsp;|&nbsp; Strengths: Problem-Solving, Communication, Time Management
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <iframe
              src={pdfBlobUrl}
              title={`${personal.name} — Curriculum Vitae PDF`}
              className="w-full h-full rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white"
            />
          )}
        </div>
      </div>
    </div>
  );
};
