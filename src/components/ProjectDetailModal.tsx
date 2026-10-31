import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import {
  X,
  Github,
  ExternalLink,
  CheckCircle2,
  Layers,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import type { ProjectItem } from '../data/portfolioConfig';
import { ProjectVisual } from './ProjectVisual';
import { velouraSoundEngine } from '../utils/velouraSoundEngine';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onDiscussSimilar: (topic: string) => void;
}

const modalBackdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.22, ease: 'easeInOut' },
  },
};

const modalDialogExpansionVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.84,
    y: 40,
    rotateX: 7,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: 'spring',
      stiffness: 290,
      damping: 26,
      mass: 0.88,
      staggerChildren: 0.065,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 24,
    rotateX: -4,
    transition: {
      duration: 0.22,
      ease: [0.4, 0, 1, 1],
    },
  },
};

const sectionPopVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 320,
      damping: 26,
    },
  },
};

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onDiscussSimilar,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const isVeloura = project?.id === 'veloura-specialty-coffee';

  const handleCloseWithSound = () => {
    if (isVeloura) {
      velouraSoundEngine.playToggleSound();
    }
    onClose();
  };

  useEffect(() => {
    if (!project) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';

    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        if (project.id === 'veloura-specialty-coffee') {
          velouraSoundEngine.playToggleSound();
        }
        onClose();
        return;
      }
      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
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
  }, [project, onClose]);

  return (
    <AnimatePresence mode="wait">
      {project && (
        <motion.div
          key={`modal-backdrop-${project.id}`}
          variants={modalBackdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{ perspective: '1200px' }}
          className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-5 md:p-6 bg-black/80 backdrop-blur-md"
          onClick={handleCloseWithSound}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
        >
          {/* Ambient Expansion Aura (Warm Roasted Bronze for Veloura, Architectural Blue for others) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1.05 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: isVeloura
                ? 'radial-gradient(circle at 50% 35%, rgba(180, 123, 68, 0.28) 0%, rgba(212, 163, 115, 0.10) 40%, transparent 70%)'
                : 'radial-gradient(circle at 50% 35%, rgba(59, 130, 246, 0.20) 0%, transparent 65%)',
            }}
          />

          <motion.div
            ref={dialogRef}
            variants={modalDialogExpansionVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`relative w-full max-w-4xl max-h-[92dvh] sm:max-h-[90vh] overflow-y-auto overscroll-contain rounded-2xl bg-white dark:bg-zinc-900 shadow-2xl text-zinc-900 dark:text-zinc-100 border ${
              isVeloura
                ? 'border-[#B47B44]/55 dark:border-[#B47B44]/50 shadow-[0_25px_80px_-15px_rgba(180,123,68,0.35)]'
                : 'border-zinc-200 dark:border-zinc-800'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Shimmer Accent Line for Veloura */}
            {isVeloura && (
              <div
                className="h-1 w-full"
                style={{
                  background:
                    'linear-gradient(90deg, rgba(180,123,68,0.2) 0%, rgba(212,163,115,0.95) 50%, rgba(180,123,68,0.2) 100%)',
                }}
              />
            )}

            {/* Sticky Modal Header */}
            <div
              className={`sticky top-0 z-20 flex items-center justify-between gap-3 px-4 sm:px-6 py-3.5 sm:py-4 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border-b ${
                isVeloura
                  ? 'border-[#B47B44]/30 dark:border-[#B47B44]/30'
                  : 'border-zinc-200 dark:border-zinc-800'
              }`}
            >
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 min-w-0">
                <span
                  className={`font-mono text-xs font-semibold shrink-0 ${
                    isVeloura
                      ? 'text-[#B47B44] dark:text-[#D4A373]'
                      : 'text-blue-600 dark:text-blue-400'
                  }`}
                >
                  {project.index}
                </span>
                <h3
                  id="modal-project-title"
                  className="font-display text-base sm:text-xl font-semibold tracking-tight truncate"
                >
                  {project.title}
                </h3>
                {isVeloura && (
                  <span className="hidden md:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#B47B44]/15 border border-[#B47B44]/40 text-[10px] font-mono text-[#B47B44] dark:text-[#D4A373]">
                    <Sparkles className="w-2.5 h-2.5" />
                    <span>Interactive Case Study</span>
                  </span>
                )}
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={handleCloseWithSound}
                className="p-2 rounded-lg text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8">
              {/* Visual Showcase Frame with Pop-In Elevation */}
              <motion.div
                variants={sectionPopVariants}
                className={`rounded-xl overflow-hidden border ${
                  isVeloura
                    ? 'border-[#B47B44]/40 shadow-[0_12px_36px_-10px_rgba(180,123,68,0.28)]'
                    : 'border-zinc-200 dark:border-zinc-800'
                }`}
              >
                <ProjectVisual visualType={project.visualType} variant="modal" />
              </motion.div>

              {/* Project Summary Callout */}
              <motion.div
                variants={sectionPopVariants}
                className={`p-3.5 sm:p-4 rounded-xl border flex items-start gap-3 sm:gap-3.5 ${
                  isVeloura
                    ? 'bg-[#B47B44]/5 dark:bg-[#191411]/70 border-[#B47B44]/30'
                    : 'bg-zinc-50 dark:bg-zinc-950/80 border-zinc-200 dark:border-zinc-800/90'
                }`}
              >
                <CheckCircle2
                  className={`w-5 h-5 shrink-0 mt-0.5 ${
                    isVeloura ? 'text-[#B47B44] dark:text-[#D4A373]' : 'text-emerald-500'
                  }`}
                />
                <div className="space-y-1 text-xs sm:text-sm">
                  <div className="font-medium text-zinc-900 dark:text-zinc-100">
                    Project Category: <span className="font-mono">{project.domain}</span> ·{' '}
                    <span
                      className={`font-mono ${
                        isVeloura
                          ? 'text-[#B47B44] dark:text-[#D4A373]'
                          : 'text-blue-600 dark:text-blue-400'
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {project.statusNote}
                  </p>
                </div>
              </motion.div>

              {/* Overview & Objectives */}
              <motion.div
                variants={sectionPopVariants}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <div className="space-y-3">
                  <h4 className="font-display text-base font-semibold text-zinc-900 dark:text-zinc-100">
                    Project Overview
                  </h4>
                  <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                    {project.overview}
                  </p>
                  <div className="pt-2">
                    <h5 className="text-xs font-mono text-zinc-500 dark:text-zinc-400 mb-2">
                      ENGINEERING IMPLEMENTATION
                    </h5>
                    <ul className="space-y-2">
                      {project.contribution.map((item, idx) => (
                        <li
                          key={idx}
                          className="text-sm text-zinc-600 dark:text-zinc-300 flex items-start gap-2.5"
                        >
                          <span
                            className={`font-mono text-xs mt-1 ${
                              isVeloura
                                ? 'text-[#B47B44] dark:text-[#D4A373]'
                                : 'text-blue-600 dark:text-blue-400'
                            }`}
                          >
                            •
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-display text-base font-semibold text-zinc-900 dark:text-zinc-100">
                    Key Objectives
                  </h4>
                  <ul className="space-y-2.5">
                    {project.objectives.map((obj, idx) => (
                      <li
                        key={idx}
                        className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200/80 dark:border-zinc-800/80 text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed"
                      >
                        <span
                          className={`font-mono text-xs mr-2 ${
                            isVeloura
                              ? 'text-[#B47B44] dark:text-[#D4A373]'
                              : 'text-blue-600 dark:text-blue-400'
                          }`}
                        >
                          0{idx + 1}.
                        </span>
                        {obj}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* Features & Architectural Layers Breakdown */}
              <motion.div
                variants={sectionPopVariants}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-zinc-200 dark:border-zinc-800"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <h4 className="font-display text-base font-semibold text-zinc-900 dark:text-zinc-100">
                      Core Features &amp; Capabilities
                    </h4>
                  </div>
                  <ul className="space-y-2">
                    {project.implementedFeatures.map((feat, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-zinc-600 dark:text-zinc-300 flex items-start gap-2.5"
                      >
                        <span className="font-mono text-xs text-emerald-600 dark:text-emerald-400 mt-1">
                          ✓
                        </span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Layers
                      className={`w-4 h-4 ${
                        isVeloura ? 'text-[#B47B44] dark:text-[#D4A373]' : 'text-blue-500'
                      }`}
                    />
                    <h4 className="font-display text-base font-semibold text-zinc-900 dark:text-zinc-100">
                      Architectural Layers
                    </h4>
                  </div>
                  <div className="space-y-2.5">
                    {project.architectureHighlights.map((arch, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200/80 dark:border-zinc-800/80"
                      >
                        <p
                          className={`text-xs font-mono font-medium ${
                            isVeloura
                              ? 'text-[#B47B44] dark:text-[#D4A373]'
                              : 'text-blue-600 dark:text-blue-400'
                          }`}
                        >
                          {arch.layer}
                        </p>
                        <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-1">
                          {arch.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Technology Stack */}
              <motion.div
                variants={sectionPopVariants}
                className="pt-4 border-t border-zinc-200 dark:border-zinc-800"
              >
                <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400 mb-2">
                  TECHNOLOGY STACK
                </p>
                <p className="text-sm font-mono text-zinc-800 dark:text-zinc-200 leading-relaxed">
                  {project.technologies.join(' · ')}
                </p>
              </motion.div>

              {/* Modal Footer Actions (Responsive on Mobile, Tablet & Laptop) */}
              <motion.div
                variants={sectionPopVariants}
                className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4"
              >
                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 text-xs font-medium hover:opacity-90 transition-opacity whitespace-nowrap"
                  >
                    <Github className="w-4 h-4" />
                    <span>{project.githubButtonLabel || 'View Source Code'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                  {project.liveDemoUrl && (
                    <a
                      href={project.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border text-xs font-medium transition-colors whitespace-nowrap ${
                        isVeloura
                          ? 'border-[#B47B44]/50 bg-[#B47B44]/15 text-[#B47B44] dark:text-[#D4A373] hover:bg-[#B47B44]/25'
                          : 'border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                      }`}
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Live Demo</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    handleCloseWithSound();
                    onDiscussSimilar(project.title);
                  }}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium transition-colors whitespace-nowrap cursor-pointer"
                >
                  <span>Let&apos;s Connect About This Project</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

