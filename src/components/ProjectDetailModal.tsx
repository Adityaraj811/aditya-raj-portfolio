import React, { useEffect, useRef } from 'react';
import {
  X,
  Github,
  ExternalLink,
  CheckCircle2,
  Layers,
  ArrowUpRight,
} from 'lucide-react';
import type { ProjectItem } from '../data/portfolioConfig';
import { ProjectVisual } from './ProjectVisual';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onDiscussSimilar: (topic: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onDiscussSimilar,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;
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

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      <div
        ref={dialogRef}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl text-zinc-900 dark:text-zinc-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Modal Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between gap-4 px-6 py-4 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-3 min-w-0">
            <span className="font-mono text-xs text-blue-600 dark:text-blue-400 shrink-0">
              {project.index}
            </span>
            <h3
              id="modal-project-title"
              className="font-display text-lg sm:text-xl font-semibold tracking-tight truncate"
            >
              {project.title}
            </h3>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Visual Showcase Frame */}
          <div className="rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
            <ProjectVisual visualType={project.visualType} variant="modal" />
          </div>

          {/* Project Summary Callout */}
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/80 border border-zinc-200 dark:border-zinc-800/90 flex items-start gap-3.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <div className="space-y-1 text-sm">
              <div className="font-medium text-zinc-900 dark:text-zinc-100">
                Project Category: <span className="font-mono">{project.domain}</span> ·{' '}
                <span className="font-mono text-blue-600 dark:text-blue-400">{project.status}</span>
              </div>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {project.statusNote}
              </p>
            </div>
          </div>

          {/* Overview & Objectives */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      <span className="font-mono text-xs text-blue-600 dark:text-blue-400 mt-1">
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
                    <span className="font-mono text-xs text-blue-600 dark:text-blue-400 mr-2">
                      0{idx + 1}.
                    </span>
                    {obj}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Features & Architectural Layers Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-zinc-200 dark:border-zinc-800">
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
                <Layers className="w-4 h-4 text-blue-500" />
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
                    <p className="text-xs font-mono font-medium text-blue-600 dark:text-blue-400">
                      {arch.layer}
                    </p>
                    <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-1">{arch.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Technology Stack */}
          <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400 mb-2">
              TECHNOLOGY STACK
            </p>
            <p className="text-sm font-mono text-zinc-800 dark:text-zinc-200 leading-relaxed">
              {project.technologies.join(' · ')}
            </p>
          </div>

          {/* Modal Footer Actions */}
          <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 text-xs font-medium hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                <Github className="w-4 h-4" />
                <span>{project.githubButtonLabel || 'View on GitHub'}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              {project.liveDemoUrl && (
                <a
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 text-xs font-medium text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors whitespace-nowrap"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Live Demo</span>
                </a>
              )}
            </div>

            <button
              onClick={() => {
                onClose();
                onDiscussSimilar(project.title);
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium transition-colors whitespace-nowrap cursor-pointer"
            >
              <span>Let&apos;s Connect About This Project</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
