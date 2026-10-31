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
                <p className="text-xs sm:text-sm font-semibold tracking-wider text-zinc-600 mt-1">
                  APP &amp; WEB DEVELOPER | JAVA BACKEND DEVELOPER
                </p>
                <div className="mt-2 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs text-zinc-600">
                  <span>{personal.mobileNumber}</span>
                  <span>|</span>
                  <a
                    href={`mailto:${personal.emailAddress}`}
                    className="text-blue-700 hover:underline"
                  >
                    {personal.emailAddress}
                  </a>
                  <span>|</span>
                  <a
                    href={personal.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:underline"
                  >
                    LinkedIn
                  </a>
                  <span>|</span>
                  <a
                    href={personal.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:underline"
                  >
                    GitHub
                  </a>
                  <span>|</span>
                  <a
                    href={personal.portfolioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:underline"
                  >
                    Portfolio
                  </a>
                </div>
              </div>

              {/* Professional Summary */}
              <div className="mb-5">
                <h2 className="text-xs font-bold tracking-wider text-[#0f2942] uppercase mb-1.5">
                  PROFESSIONAL SUMMARY
                </h2>
                <p className="text-xs sm:text-[13px] text-zinc-800 leading-relaxed">
                  App &amp; Web Developer with a strong foundation in Java, object-oriented programming, Spring Boot, REST APIs and SQL. Experienced in building Android applications and responsive web interfaces. Focused on writing maintainable code and solving problems through hands-on practice.
                </p>
              </div>

              {/* Technical Skills */}
              <div className="mb-5">
                <h2 className="text-xs font-bold tracking-wider text-[#0f2942] uppercase mb-1.5">
                  TECHNICAL SKILLS
                </h2>
                <div className="text-xs sm:text-[13px] text-zinc-800 space-y-1 leading-relaxed">
                  <p>
                    <strong>Languages:</strong> Java, JavaScript, SQL &nbsp;&nbsp;
                    <strong>Backend:</strong> Spring Boot, Spring Security, REST APIs, JDBC, Hibernate, JPA
                  </p>
                  <p>
                    <strong>App Development:</strong> Android (Java), XML, MVVM, Room, Retrofit &nbsp;&nbsp;
                    <strong>Web:</strong> HTML, CSS, React, TypeScript
                  </p>
                  <p>
                    <strong>Database &amp; Tools:</strong> MySQL, PostgreSQL, Git, GitHub, Postman, VS Code, Linux/Ubuntu
                  </p>
                </div>
              </div>

              {/* Projects */}
              <div className="mb-5">
                <h2 className="text-xs font-bold tracking-wider text-[#0f2942] uppercase mb-2">
                  PROJECTS
                </h2>
                <div className="space-y-2.5 text-xs sm:text-[13px] text-zinc-800">
                  <div>
                    <p className="font-bold text-zinc-900">
                      KHATA – Shared Expense Management App
                    </p>
                    <p className="leading-relaxed">
                      Android application for shared household expenses, group management, expense splitting and settlement tracking.{' '}
                      <em className="text-zinc-600">
                        Tech: Java, Android XML, MVVM, Room, Retrofit, Spring Boot, REST APIs, SQL.
                      </em>
                    </p>
                  </div>

                  <div>
                    <p className="font-bold text-zinc-900">
                      Apple Vision UI – Web Application
                    </p>
                    <p className="leading-relaxed">
                      Responsive Apple Vision Pro-inspired interface with scroll-based animations and interactive visual effects.{' '}
                      <em className="text-zinc-600">
                        Tech: HTML, CSS, JavaScript, GSAP, ScrollTrigger, Canvas API.
                      </em>
                    </p>
                  </div>

                  <div>
                    <p className="font-bold text-zinc-900">
                      KrishiMitra – AI-Based Crop Recommendation System
                    </p>
                    <p className="leading-relaxed">
                      Team project exploring crop recommendations using machine-learning models and a multilingual web interface.{' '}
                      <em className="text-zinc-600">
                        Tech: Java, Python, Scikit-learn, React, TypeScript.
                      </em>
                    </p>
                  </div>

                  <div>
                    <p className="font-bold text-zinc-900">
                      SortifyMaster – Sorting Algorithm Visualizer
                    </p>
                    <p className="leading-relaxed">
                      Interactive visualizer demonstrating Bubble, Selection, Insertion, Merge, Quick and Heap sort.{' '}
                      <em className="text-zinc-600">Tech: HTML, CSS, JavaScript.</em>
                    </p>
                  </div>
                </div>
              </div>

              {/* Experience */}
              <div className="mb-5">
                <h2 className="text-xs font-bold tracking-wider text-[#0f2942] uppercase mb-1.5">
                  EXPERIENCE
                </h2>
                <div className="text-xs sm:text-[13px] text-zinc-800">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="font-bold text-zinc-900">
                      {education.internship.role} | {education.internship.company}
                    </p>
                    <span className="text-zinc-600 text-xs">{education.internship.duration}</span>
                  </div>
                  <p className="mt-0.5 leading-relaxed">{education.internship.description}</p>
                </div>
              </div>

              {/* Education */}
              <div className="mb-5">
                <h2 className="text-xs font-bold tracking-wider text-[#0f2942] uppercase mb-2">
                  EDUCATION
                </h2>
                <div className="space-y-2 text-xs sm:text-[13px] text-zinc-800">
                  {education.academicTimeline.map((item) => (
                    <div
                      key={item.degreeOrClass}
                      className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1"
                    >
                      <p>
                        <strong>{item.degreeOrClass}</strong> – {item.institution} ({item.boardOrUniversity})
                      </p>
                      <div className="sm:text-right shrink-0 font-mono text-xs">
                        <span className="font-bold text-zinc-900">{item.score}</span>
                        <span className="text-zinc-500 ml-2">({item.duration})</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications & Achievements */}
              <div>
                <h2 className="text-xs font-bold tracking-wider text-[#0f2942] uppercase mb-2">
                  CERTIFICATIONS &amp; ACHIEVEMENTS
                </h2>
                <div className="space-y-1.5 text-xs sm:text-[13px] text-zinc-800 leading-relaxed">
                  <p>
                    <strong>
                      Oracle Cloud Infrastructure 2025 Certified Generative AI Professional
                    </strong>{' '}
                    – Oracle | Oct 2025 (valid till Oct 2027) |{' '}
                    <a
                      href="https://catalog-education.oracle.com/ords/certview/sharebadge?id=82A0B86C62BB5D96E0616E29D374D61BCAE946DBD0848398B7405F9A0C811B33"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-0.5 text-blue-700 font-medium hover:underline"
                    >
                      <span>Verify Credential</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </p>
                  <p>
                    <strong>Web Development Course</strong> – Rinex (in association with E-Cell, IIT Bhubaneswar), Dec 2025–Jan 2026 |{' '}
                    <strong>Solved 400+ coding problems</strong> across practice platforms.
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
