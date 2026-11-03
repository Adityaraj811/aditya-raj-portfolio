import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowUpRight,
  ArrowRight,
  Download,
  FileText,
  GraduationCap,
  BookOpen,
  Code2,
  Briefcase,
  Linkedin,
  Github,
  MessageSquare,
  Instagram,
  Mail,
  MapPin,
  CheckCircle2,
  Award,
} from 'lucide-react';
import { portfolioConfig } from '../data/portfolioConfig';
import { TechIcon } from './TechIcon';
import { ScrollReveal } from './ScrollReveal';
import { Tilt3DCard } from './Tilt3DCard';
import { HeroProfile3D } from './HeroProfile3D';
import { handleDownloadResumePdf } from '../utils/resumePdf';

interface AboutPageProps {
  onBackToPortfolio: () => void;
  onNavigateToServices: () => void;
  onNavigateToProjects: () => void;
  onOpenResumeModal: () => void;
  onDiscussProject: (topic: string) => void;
  profileImgSrc: string;
  usingFallbackAvatar: boolean;
  onImageError: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onBackToPortfolio,
  onNavigateToServices,
  onNavigateToProjects,
  onOpenResumeModal,
  onDiscussProject,
  profileImgSrc,
  usingFallbackAvatar,
  onImageError,
}) => {
  const { personal, about, corePillars, skillCategories, education } = portfolioConfig;

  const [selectedSkillCat, setSelectedSkillCat] = useState<string>('all');

  const filteredSkillCategories =
    selectedSkillCat === 'all'
      ? skillCategories
      : skillCategories.filter((cat) => cat.id === selectedSkillCat);

  return (
    <div className="min-h-screen pb-24">
      {/* =====================================================================
          1. ABOUT ME PAGE HERO, DEVELOPER BIO & OFFICIAL CV ACTIONS
      ===================================================================== */}
      <section className="relative pt-10 pb-16 sm:pt-14 sm:pb-20 border-b border-zinc-200/80 dark:border-zinc-800/80 overflow-hidden">
        <div
          className="absolute top-0 left-1/3 -translate-x-1/2 w-[620px] h-[360px] rounded-full pointer-events-none opacity-60 dark:opacity-100"
          style={{
            background:
              'radial-gradient(circle, rgba(59,130,246,0.14) 0%, rgba(99,102,241,0.06) 55%, transparent 75%)',
          }}
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 space-y-10">
          {/* Top Navigation Strip */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <button
              type="button"
              onClick={onBackToPortfolio}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 hover:border-blue-500/50 text-xs font-medium text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Freelance Portfolio &amp; Samples</span>
            </button>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={onOpenResumeModal}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 hover:border-blue-500/50 text-xs font-medium text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Preview Official CV</span>
              </button>

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
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors cursor-pointer shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download CV (PDF)</span>
              </a>
            </div>
          </div>

          {/* 2-Column Split: Complete Bio & 3D Developer Portrait */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            <ScrollReveal
              direction="up"
              className="lg:col-span-7 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-blue-600 dark:text-blue-400">
                  <span>ABOUT ME · ACADEMIC JOURNEY · TECHNICAL SKILLS · OFFICIAL CV</span>
                </div>

                <h1
                  className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 leading-[1.1]"
                  style={{ textWrap: 'balance' }}
                >
                  {about.sectionTitle}
                </h1>

                <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  {about.shortIntro}
                </p>

                <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Along with pursuing my B.Tech in Computer Science &amp; Engineering, I design and develop custom websites, high-converting landing pages, full-stack web applications, and native Android apps (Java &amp; MVVM) with Spring Boot REST APIs.
                </p>

                {/* Location & Availability Metadata */}
                <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-600 dark:text-zinc-300">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                    <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    <span>{personal.location}</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{personal.availabilityNotice}</span>
                  </span>
                </div>
              </div>

              {/* Official CV Highlight Box inside About Hero */}
              <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-emerald-500/5 border border-blue-500/30 dark:border-blue-400/30 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-blue-600 dark:text-blue-400">
                    <FileText className="w-4 h-4" />
                    <span>OFFICIAL CURRICULUM VITAE (CV / RESUME)</span>
                  </div>
                  <span className="font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
                    Updated · B.Tech CSE (2023–2027)
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  View or download my complete official CV including academic qualifications, SmartED internship experience, Infosys Java SE 21 &amp; Oracle GenAI certifications, and project architecture details.
                </p>

                <div className="flex flex-wrap items-center gap-3">
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
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer shadow-sm"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Official CV (PDF)</span>
                  </a>

                  <button
                    type="button"
                    onClick={onOpenResumeModal}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 hover:opacity-90 text-xs sm:text-sm font-semibold transition-opacity cursor-pointer"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Open Full-Screen CV Viewer</span>
                  </button>
                </div>
              </div>
            </ScrollReveal>

            {/* Right Column: 3D Animated Developer Profile Card */}
            <ScrollReveal direction="scale" delayMs={100} className="lg:col-span-5">
              <HeroProfile3D
                name={personal.name}
                headline={personal.professionalHeadline}
                profileImgSrc={profileImgSrc}
                usingFallbackAvatar={usingFallbackAvatar}
                onImageError={onImageError}
                emailAddress={personal.emailAddress}
                githubUrl={personal.githubUrl}
                githubUsername={personal.githubUsername}
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. COMPLETE ACADEMIC JOURNEY, INTERNSHIP & CERTIFICATIONS (Primary Focus)
      ===================================================================== */}
      <section
        id="academics"
        className="py-16 sm:py-20 border-b border-zinc-200/80 dark:border-zinc-800/80"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
          <ScrollReveal direction="up">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <p className="font-mono text-xs font-semibold text-blue-600 dark:text-blue-400">
                  01. ACADEMIC JOURNEY, INTERNSHIP &amp; CERTIFICATIONS
                </p>
                <h2
                  className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100"
                  style={{ textWrap: 'balance' }}
                >
                  Education Timeline, Internship Experience &amp; Verified Credentials
                </h2>
                <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
                  My complete academic progression from secondary schooling to B.Tech in Computer Science &amp; Engineering, industry internship, and technical certifications.
                </p>
              </div>

              <button
                type="button"
                onClick={onOpenResumeModal}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:border-blue-500/50 text-xs font-semibold text-zinc-800 dark:text-zinc-200 transition-colors cursor-pointer shrink-0"
              >
                <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>View Formatted CV Document</span>
              </button>
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

            {/* Right Column: Internship, Certifications & Achievements */}
            <ScrollReveal direction="up" delayMs={130} className="lg:col-span-5">
              <Tilt3DCard className="h-full p-6 sm:p-8 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200/90 dark:border-zinc-800/90">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-blue-600 dark:text-blue-400 font-semibold border-b border-zinc-100 dark:border-zinc-800/80 pb-3.5">
                    <BookOpen className="w-4 h-4" />
                    <span>INTERNSHIP, CERTIFICATIONS &amp; ACHIEVEMENTS</span>
                  </div>

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

                  {/* Certifications */}
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

                  {/* Achievements */}
                  <div className="space-y-2.5">
                    {education.achievements.map((achievement, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-blue-500/5 border border-blue-500/20 text-xs text-zinc-700 dark:text-zinc-300 font-mono leading-relaxed"
                      >
                        ✓ {achievement}
                      </div>
                    ))}
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
                    <span>Download CV (PDF)</span>
                  </a>
                  <button
                    type="button"
                    onClick={onOpenResumeModal}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 text-xs font-medium text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <span>Preview Official CV</span>
                  </button>
                </div>
              </Tilt3DCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. COMPLETE TECHNICAL SKILLS SECTION (Categorized Stack)
      ===================================================================== */}
      <section
        id="skills"
        className="py-16 sm:py-20 border-b border-zinc-200/80 dark:border-zinc-800/80"
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

      {/* =====================================================================
          4. SNAPSHOT HIGHLIGHTS & RECRUITER / FREELANCE CARDS
      ===================================================================== */}
      <section className="py-16 sm:py-20 border-b border-zinc-200/80 dark:border-zinc-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="space-y-2">
            <p className="font-mono text-xs font-semibold text-blue-600 dark:text-blue-400">
              03. KEY HIGHLIGHTS &amp; CORE PILLARS
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Engineering Focus &amp; Career Snapshot
            </h2>
          </div>

          {/* 4 Key Highlight Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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

          {/* 3 Core Engineering Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {corePillars.map((pillar, idx) => (
              <ScrollReveal key={pillar.index} delayMs={idx * 90} direction="up">
                <Tilt3DCard className="h-full p-6 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200/90 dark:border-zinc-800/90 hover:border-blue-500/40 dark:hover:border-blue-500/40">
                  <div className="space-y-2">
                    <span className="font-mono text-xs font-semibold text-blue-600 dark:text-blue-400">
                      {pillar.index}
                    </span>
                    <h3 className="font-display text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                      {pillar.title}
                    </h3>
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

          {/* Dedicated Split: FOR SOFTWARE RECRUITERS vs FOR FREELANCE CLIENTS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
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
                    onClick={onOpenResumeModal}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>View Official CV</span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      onDiscussProject('Software Developer / App & Web Developer Role')
                    }
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <span>Let&apos;s Connect</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </Tilt3DCard>
            </ScrollReveal>

            <ScrollReveal direction="up" delayMs={140}>
              <Tilt3DCard
                onClick={onNavigateToServices}
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
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>

                  <span className="font-mono text-xs text-zinc-400 dark:text-zinc-500 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors">
                    Opens Services Page
                  </span>
                </div>
              </Tilt3DCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* =====================================================================
          5. DIRECT CONNECT & SOCIAL LINKS STRIP
      ===================================================================== */}
      <section className="pt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <ScrollReveal direction="up">
            <div className="p-7 sm:p-10 rounded-2xl bg-white dark:bg-zinc-900/80 border border-zinc-200/90 dark:border-zinc-800/90 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="space-y-2 max-w-xl">
                <p className="font-mono text-xs font-semibold text-blue-600 dark:text-blue-400">
                  LET&apos;S CONNECT
                </p>
                <h2 className="font-display text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                  Interested in hiring me or discussing a custom website/app?
                </h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Reach out directly via WhatsApp, Email, LinkedIn, or return to the main portfolio to browse customizable website &amp; app samples.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={onBackToPortfolio}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Browse Website &amp; App Samples</span>
                </button>

                <a
                  href={personal.whatsappDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp ({personal.mobileNumber})</span>
                </a>

                <a
                  href={`mailto:${personal.emailAddress}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 text-xs font-medium text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>{personal.emailAddress}</span>
                </a>

                <a
                  href={personal.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 text-xs font-medium text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};
