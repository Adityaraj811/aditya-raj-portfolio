import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowUpRight,
  MessageSquare,
  Mail,
  CheckCircle2,
  Globe,
  Sparkles,
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
  const { personal, studioBrand, freelanceSection } = portfolioConfig;
  const [filterType, setFilterType] = useState<'all' | 'web' | 'apps' | 'growth'>('all');

  const filteredServices =
    filterType === 'all'
      ? freelanceSection.services
      : freelanceSection.services.filter((s) => s.category === filterType);

  return (
    <div className="py-12 sm:py-20 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-14 relative z-10">
        {/* Top Back Navigation Strip */}
        <ScrollReveal direction="down">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-[#F2F0EB]/12">
            <button
              type="button"
              onClick={onBackToPortfolio}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-[#0B0B0B] border border-zinc-300 dark:border-[#F2F0EB]/15 hover:border-[#E10600] text-xs sm:text-sm font-medium text-zinc-800 dark:text-[#F2F0EB] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-[#E10600]" />
              <span>Back to Portfolio</span>
            </button>

            <div className="flex items-center gap-2 font-mono text-xs text-zinc-500 dark:text-[#A8A8A8]">
              <span>{personal.name.toUpperCase()}</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#E10600] font-semibold">
                {freelanceSection.services.length} DIGITAL &amp; IT SOLUTIONS
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* Luxury Editorial Hero Header (No Poster/Pamphlet Image) */}
        <ScrollReveal direction="up">
          <div className="space-y-10">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              <div className="space-y-5 max-w-3xl">
                <p className="font-mono text-xs font-semibold text-[#E10600] tracking-wider uppercase">
                  {studioBrand.parentCompany}
                </p>
                <h1
                  className="font-display font-normal uppercase tracking-tight text-zinc-900 dark:text-[#F2F0EB] leading-[0.94]"
                  style={{
                    fontSize: 'clamp(2.6rem, 5.5vw, 4.8rem)',
                    textWrap: 'balance',
                  }}
                >
                  FROM IDEAS TO{' '}
                  <span className="font-editorial italic lowercase font-normal text-[#E10600]">
                    innovation
                  </span>{' '}
                  — COMPLETE DIGITAL SOLUTIONS
                </h1>
                <p className="text-base sm:text-lg text-zinc-600 dark:text-[#A8A8A8] leading-relaxed max-w-2xl">
                  {freelanceSection.pageSubheading}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => onDiscussProject('Custom Digital or IT Solutions Inquiry')}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#E10600] hover:bg-[#ff1e17] text-white text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap"
                >
                  <span>{freelanceSection.ctaButtonLabel}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <a
                  href={buildWhatsappLink('Complete Services Inquiry')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-zinc-300 dark:border-[#F2F0EB]/20 bg-white dark:bg-[#0B0B0B] hover:border-[#E10600] text-zinc-900 dark:text-[#F2F0EB] text-sm font-medium transition-colors whitespace-nowrap"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-500" />
                  <span>WhatsApp ({personal.mobileNumber})</span>
                </a>
              </div>
            </div>

            {/* 4-Column Architectural Metrics Strip */}
            <div className="grid grid-cols-2 lg:grid-cols-4 border-y border-zinc-300/70 dark:border-[#F2F0EB]/12 divide-y sm:divide-y-0 sm:divide-x divide-zinc-300/70 dark:divide-[#F2F0EB]/12">
              {studioBrand.metrics.map((metric) => (
                <div key={metric.label} className="py-5 px-4 sm:px-6 first:pl-0">
                  <p className="font-display text-3xl sm:text-4xl text-[#E10600] tabular-nums leading-none">
                    {metric.value}
                  </p>
                  <p className="font-mono text-xs text-zinc-500 dark:text-[#A8A8A8] uppercase tracking-wider mt-2">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Filter Bar for All 12 Services */}
        <ScrollReveal direction="up">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-zinc-200 dark:border-[#F2F0EB]/10">
            <p className="font-mono text-xs text-zinc-500 dark:text-[#A8A8A8]">
              SHOWING {filteredServices.length} OF {freelanceSection.services.length} SERVICES
            </p>

            <div
              role="tablist"
              aria-label="Filter development services"
              className="flex flex-wrap items-center gap-1 p-1 rounded-lg bg-zinc-200/70 dark:bg-[#0E0E0E] border border-zinc-300/60 dark:border-[#F2F0EB]/15 w-fit"
            >
              {[
                { id: 'all', label: `All Services (${freelanceSection.services.length})` },
                { id: 'web', label: 'Websites & E-commerce' },
                { id: 'apps', label: 'Apps, CRM & Software' },
                { id: 'growth', label: 'Branding, Ads, SMS & IT' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={filterType === tab.id}
                  onClick={() => setFilterType(tab.id as typeof filterType)}
                  className={`px-3.5 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    filterType === tab.id
                      ? 'bg-[#E10600] text-white'
                      : 'text-zinc-600 dark:text-[#A8A8A8] hover:text-zinc-900 dark:hover:text-[#F2F0EB]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* 12 Complete Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service: FreelanceServiceItem, idx: number) => (
            <ScrollReveal key={service.id} delayMs={(idx % 3) * 60} direction="up">
              <Tilt3DCard className="h-full p-5 sm:p-6 rounded-xl bg-white dark:bg-[#0E0E0E] border border-zinc-200 dark:border-[#F2F0EB]/12 hover:border-[#E10600]/60 transition-colors flex flex-col justify-between">
                <div className="space-y-4">
                  <ServiceMockupVisual mockupType={service.mockupType} />

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-[#E10600] font-semibold">{service.index}</span>
                      <span className="text-zinc-500 dark:text-[#A8A8A8] truncate ml-2">
                        {service.idealFor}
                      </span>
                    </div>

                    <h2 className="font-display text-2xl tracking-wide uppercase text-zinc-900 dark:text-[#F2F0EB]">
                      {service.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-zinc-600 dark:text-[#A8A8A8] leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <ul className="space-y-1.5 pt-1 text-xs text-zinc-700 dark:text-[#F2F0EB]/85">
                    {service.deliverables.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#E10600] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 mt-5 border-t border-zinc-200 dark:border-[#F2F0EB]/10 flex flex-wrap items-center gap-2">
                  {service.featuredDemoUrl && (
                    <a
                      href={service.featuredDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-[#E10600] hover:bg-[#ff1e17] text-white text-xs font-semibold transition-colors whitespace-nowrap"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span>Live Demo</span>
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={() => onDiscussProject(service.inquiryTopic)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-900 text-white dark:bg-[#F2F0EB] dark:text-[#050505] hover:opacity-90 text-xs font-semibold transition-opacity cursor-pointer whitespace-nowrap"
                  >
                    <span>Get Quote</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={buildWhatsappLink(service.inquiryTopic)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-lg border border-zinc-300 dark:border-[#F2F0EB]/20 text-xs font-medium text-zinc-700 dark:text-[#F2F0EB] hover:border-emerald-500 transition-colors whitespace-nowrap"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-500" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </Tilt3DCard>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <ScrollReveal direction="up">
          <div className="relative rounded-2xl bg-[#0E0E0E] text-[#F2F0EB] p-8 sm:p-12 border border-[#F2F0EB]/15 overflow-hidden">
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 font-mono text-xs text-[#E10600]">
                  <Sparkles className="w-4 h-4" />
                  <span>{personal.name} · {personal.availabilityNotice}</span>
                </div>
                <h2 className="font-display text-3xl sm:text-5xl uppercase tracking-tight text-[#F2F0EB]">
                  {freelanceSection.ctaHeadline}
                </h2>
                <p className="text-sm sm:text-base text-[#A8A8A8] leading-relaxed">
                  {freelanceSection.personalCommitmentNote}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => onDiscussProject('Complete Digital & IT Solutions Project')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#E10600] hover:bg-[#ff1e17] text-white text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap"
                >
                  <span>{freelanceSection.ctaButtonLabel}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <a
                  href={buildWhatsappLink('Project Enquiry')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/15 text-white text-sm font-medium transition-colors whitespace-nowrap"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp Direct</span>
                </a>

                <a
                  href={buildMailtoLink('Project Enquiry')}
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/15 text-white text-sm font-medium transition-colors whitespace-nowrap"
                >
                  <Mail className="w-4 h-4 text-[#E10600]" />
                  <span>Email</span>
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};
