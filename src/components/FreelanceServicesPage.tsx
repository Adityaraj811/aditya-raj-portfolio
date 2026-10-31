import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowUpRight,
  MessageSquare,
  Mail,
  CheckCircle2,
  Sparkles,
  Globe,
  Smartphone,
} from 'lucide-react';
import { portfolioConfig, type FreelanceServiceItem } from '../data/portfolioConfig';
import { ScrollReveal } from './ScrollReveal';
import { Tilt3DCard } from './Tilt3DCard';
import { ServiceMockupVisual } from './ServiceMockupVisual';

interface FreelanceServicesPageProps {
  onBackToPortfolio: () => void;
  onDiscussProject: (topic: string) => void;
  buildWhatsappLink: (topic?: string) => string;
  buildMailtoLink: (topic?: string) => string;
}

export const FreelanceServicesPage: React.FC<FreelanceServicesPageProps> = ({
  onBackToPortfolio,
  onDiscussProject,
  buildWhatsappLink,
  buildMailtoLink,
}) => {
  const { personal, freelanceSection } = portfolioConfig;
  const [filterType, setFilterType] = useState<'all' | 'websites' | 'apps'>('all');

  const filteredServices = freelanceSection.services.filter((s) => {
    if (filterType === 'all') return true;
    if (filterType === 'apps') {
      return s.id === 'web-applications' || s.id === 'android-applications';
    }
    return s.id !== 'web-applications' && s.id !== 'android-applications';
  });

  return (
    <div className="py-12 sm:py-20 relative overflow-hidden">
      {/* Ambient Background Lighting */}
      <div
        className="pointer-events-none absolute top-0 left-1/3 -translate-x-1/2 w-[640px] h-[420px] rounded-full opacity-60 dark:opacity-100"
        style={{
          background:
            'radial-gradient(circle, rgba(59,130,246,0.14) 0%, rgba(99,102,241,0.06) 50%, transparent 75%)',
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-16 relative z-10">
        {/* Top Back Navigation Bar */}
        <ScrollReveal direction="down">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-zinc-200/80 dark:border-zinc-800/80">
            <button
              type="button"
              onClick={onBackToPortfolio}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 text-xs sm:text-sm font-medium text-zinc-800 dark:text-zinc-200 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Back to Portfolio</span>
            </button>

            <div className="flex items-center gap-2 font-mono text-xs text-zinc-500 dark:text-zinc-400">
              <span>{personal.name}</span>
              <span aria-hidden="true">·</span>
              <span className="text-blue-600 dark:text-blue-400 font-medium">
                Freelance Development Services
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* Hero Header for Dedicated Services Page */}
        <ScrollReveal direction="up">
          <div className="max-w-3xl space-y-5">
            <p className="font-mono text-xs font-semibold text-blue-600 dark:text-blue-400 tracking-wide">
              FREELANCE WEB &amp; APPLICATION DEVELOPMENT SERVICES
            </p>
            <h1
              className="font-display font-bold tracking-tight text-zinc-900 dark:text-zinc-50 leading-[1.1]"
              style={{
                fontSize: 'clamp(2.1rem, 4vw, 3.5rem)',
                textWrap: 'balance',
              }}
            >
              {freelanceSection.pageHeadline}
            </h1>
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed">
              {freelanceSection.pageSubheading}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onDiscussProject('Custom Website or Application Project')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors cursor-pointer"
              >
                <span>{freelanceSection.ctaButtonLabel}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <a
                href={buildWhatsappLink('Freelance Website or Application Project')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 hover:border-zinc-400 dark:hover:border-zinc-700 text-zinc-800 dark:text-zinc-200 text-sm font-medium transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-emerald-500" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </ScrollReveal>

        {/* Filter Bar for Services */}
        <ScrollReveal direction="up">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
            <p className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
              SHOWING {filteredServices.length} OF {freelanceSection.services.length} DEVELOPMENT SERVICES
            </p>

            <div
              role="tablist"
              aria-label="Filter development services"
              className="flex flex-wrap items-center gap-1 p-1 rounded-xl bg-zinc-200/70 dark:bg-zinc-900 border border-zinc-300/60 dark:border-zinc-800 w-fit"
            >
              <button
                type="button"
                role="tab"
                aria-selected={filterType === 'all'}
                onClick={() => setFilterType('all')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  filterType === 'all'
                    ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-xs'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                }`}
              >
                All Services (8)
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={filterType === 'websites'}
                onClick={() => setFilterType('websites')}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  filterType === 'websites'
                    ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-xs'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                }`}
              >
                <Globe className="w-3.5 h-3.5 text-blue-500" />
                <span>Websites &amp; Landing Pages (6)</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={filterType === 'apps'}
                onClick={() => setFilterType('apps')}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  filterType === 'apps'
                    ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-xs'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5 text-indigo-500" />
                <span>Web &amp; Android Apps (2)</span>
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* 8 Premium Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredServices.map((service: FreelanceServiceItem, idx: number) => (
            <ScrollReveal key={service.id} delayMs={(idx % 2) * 80} direction="up">
              <Tilt3DCard className="h-full p-6 rounded-2xl bg-white dark:bg-zinc-900/70 border border-zinc-200/90 dark:border-zinc-800/90 hover:border-blue-500/40 dark:hover:border-blue-500/40 shadow-sm">
                <div className="space-y-5">
                  {/* Interactive Visual Mockup Preview */}
                  <ServiceMockupVisual mockupType={service.mockupType} />

                  {/* Title & Tagline */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-blue-600 dark:text-blue-400 font-semibold">
                        {service.index}
                      </span>
                      <span className="text-zinc-500 dark:text-zinc-400">{service.idealFor}</span>
                    </div>

                    <h2 className="font-display text-xl font-bold text-zinc-900 dark:text-zinc-100">
                      {service.title}
                    </h2>

                    <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Key Deliverables */}
                  <ul className="space-y-2 pt-1 text-xs text-zinc-600 dark:text-zinc-300">
                    {service.deliverables.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Actions */}
                <div className="pt-5 mt-6 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => onDiscussProject(service.inquiryTopic)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:opacity-90 text-xs font-medium transition-opacity cursor-pointer whitespace-nowrap"
                  >
                    <span>Discuss This Service</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={buildWhatsappLink(service.inquiryTopic)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 text-xs font-medium text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors whitespace-nowrap"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-500" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </Tilt3DCard>
            </ScrollReveal>
          ))}
        </div>

        {/* Strong Bottom CTA Section: "Have a Project in Mind? Let's Build It." */}
        <ScrollReveal direction="up">
          <div className="relative rounded-3xl bg-gradient-to-br from-zinc-900 via-[#0E1324] to-zinc-950 text-white p-8 sm:p-12 border border-zinc-800 overflow-hidden shadow-2xl">
            <div
              className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full"
              style={{
                background:
                  'radial-gradient(circle, rgba(59,130,246,0.28) 0%, rgba(99,102,241,0.1) 50%, transparent 75%)',
              }}
            />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 font-mono text-xs text-blue-400">
                  <Sparkles className="w-4 h-4" />
                  <span>DIRECT COLLABORATION WITH ADITYA RAJ</span>
                </div>
                <h2
                  className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-white"
                  style={{ textWrap: 'balance' }}
                >
                  {freelanceSection.ctaHeadline}
                </h2>
                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                  {freelanceSection.personalCommitmentNote}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => onDiscussProject('Freelance Website or App Project')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap shadow-lg shadow-blue-600/25"
                >
                  <span>{freelanceSection.ctaButtonLabel}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <a
                  href={buildWhatsappLink('Freelance Website / Application Inquiry')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white text-sm font-medium transition-colors whitespace-nowrap"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp Direct</span>
                </a>

                <a
                  href={buildMailtoLink('Freelance Website / Application Inquiry')}
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white text-sm font-medium transition-colors whitespace-nowrap"
                >
                  <Mail className="w-4 h-4 text-blue-300" />
                  <span>Email Me</span>
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Bottom Back to Portfolio Link */}
        <div className="pt-4 flex justify-center">
          <button
            type="button"
            onClick={onBackToPortfolio}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-800 text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Main Portfolio</span>
          </button>
        </div>
      </div>
    </div>
  );
};
