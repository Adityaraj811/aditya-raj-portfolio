/**
 * ============================================================================
 * CENTRALIZED PORTFOLIO CONFIGURATION — ADITYA RAJ
 * ============================================================================
 * Single source of truth for personal details, brand copy,
 * all 12 freelance services, GitHub repositories,
 * live website/app samples, FAQs, and academic CV details.
 */

export interface SkillItem {
  name: string;
  category: string;
  context: string;
  iconKey:
    | 'java'
    | 'sql'
    | 'javascript'
    | 'spring'
    | 'springboot'
    | 'api'
    | 'jdbc'
    | 'hibernate'
    | 'jpa'
    | 'security'
    | 'html'
    | 'css'
    | 'responsive'
    | 'android'
    | 'xml'
    | 'mvvm'
    | 'viewmodel'
    | 'livedata'
    | 'viewbinding'
    | 'room'
    | 'retrofit'
    | 'mysql'
    | 'git'
    | 'github'
    | 'vscode'
    | 'postman'
    | 'linux';
}

export interface SkillCategory {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  skills: SkillItem[];
}

export interface ProjectItem {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  status: 'Live Website' | 'Completed Application' | 'Public GitHub Repo' | 'In Development' | 'Team Project';
  statusNote: string;
  domain: 'Website Design & Development' | 'Android & Backend' | 'Web Application';
  overview: string;
  objectives: string[];
  contribution: string[];
  implementedFeatures: string[];
  technologies: string[];
  architectureHighlights: {
    layer: string;
    detail: string;
  }[];
  githubUrl: string;
  githubButtonLabel: string;
  githubPlaceholderNote: string;
  liveDemoUrl?: string;
  visualType:
    | 'veloura-cafe-web'
    | 'fitness-jym-web'
    | 'dental-clinic-web'
    | 'khata-android'
    | 'apple-vision-web'
    | 'krishi-mitra-web';
}

export interface PublicGithubRepo {
  name: string;
  url: string;
  homepage?: string;
  language: string;
  description: string;
  category: string;
  visibilityLabel: 'Public GitHub Repo' | 'Live Production Deployment';
}

export interface FreelanceServiceItem {
  id: string;
  index: string;
  category: 'web' | 'apps' | 'growth';
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  idealFor: string;
  inquiryTopic: string;
  featuredDemoUrl?: string;
  featuredDemoTitle?: string;
  featuredDemoBadge?: string;
  mockupType:
    | 'business'
    | 'design'
    | 'webapp'
    | 'android'
    | 'crm'
    | 'marketing'
    | 'messaging'
    | 'video'
    | 'landing'
    | 'software'
    | 'uiux'
    | 'it';
}

export interface FaqItem {
  index: string;
  question: string;
  answer: string;
}

export interface EducationHistoryItem {
  level: string;
  degreeOrClass: string;
  institution: string;
  boardOrUniversity: string;
  duration: string;
  score: string;
}

export interface CertificationItem {
  title: string;
  issuer: string;
  date: string;
  validity?: string;
  credentialUrl?: string;
  credentialLabel?: string;
  description: string;
}

export interface SignalGalleryItem {
  title: string;
  meta: string;
  image: string;
}

export interface SignalClientItem {
  sector: string;
  name: string;
}

export interface SignalExperienceItem {
  period: string;
  role: string;
  org: string;
  location: string;
}

export interface SignalTestimonialItem {
  quote: string;
  author: string;
  role: string;
}

/**
 * Helper to resolve public static assets accurately across both local development ('/')
 * and Vercel / GitHub Pages deployments.
 */
export const resolvePublicAsset = (relativePath: string): string => {
  const baseUrl = import.meta.env.BASE_URL || '/';
  const normalizedBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  const normalizedPath = relativePath.startsWith('/')
    ? relativePath.slice(1)
    : relativePath;
  return `${normalizedBase}${normalizedPath}`;
};

export const portfolioConfig = {
  // --------------------------------------------------------------------------
  // 1. PERSONAL IDENTITY & BRAND CONFIGURATION
  // --------------------------------------------------------------------------
  personal: {
    name: 'Aditya Raj',
    monogram: 'AR',
    professionalHeadline: 'Web, App & Java Full-Stack Developer',
    roleTriad: 'Websites · Mobile Apps · CRM & Digital Solutions',
    heroGreeting: "Hi, I'm Aditya Raj",
    heroDisplayTitle: 'We Build Digital Systems, Websites & Apps',
    heroDescription:
      'From startups and clinics to gyms, cafés, and growing brands — explore live deployed websites, full-stack applications, and 12 complete digital & IT solutions tailored for your business.',
    availabilityBanner: 'Open for Freelance Projects & Engineering Roles',
    availabilityNotice: 'Available for Freelance Projects & SDE Roles',

    profileImagePath: resolvePublicAsset(
      '/assets/aistudio/Gemini_Generated_Image_35wl4q35wl4q35wl-clean_43bc697e.png'
    ),
    profileFallbackSvg: resolvePublicAsset('images/profile-placeholder.svg'),

    resumePdfPath: resolvePublicAsset('assets/aistudio/Aditya_Raj_CV__2__345c35da.pdf'),
    resumePreviewImagePath: resolvePublicAsset('images/resume-preview.webp'),
    resumeDownloadFilename: 'Aditya_Raj_CV.pdf',
    hasResumePdf: true,

    linkedinUrl: 'https://www.linkedin.com/in/aditya-raj-523b15265/',
    linkedinHandle: 'linkedin.com/in/aditya-raj-523b15265',

    githubUsername: 'Adityaraj811',
    githubUrl: 'https://github.com/Adityaraj811',
    isGithubConfigured: true,

    portfolioUrl: 'https://aditya-raj-portfolio-phi.vercel.app/',

    instagramUrl: 'https://www.instagram.com/_.adityarajsingh?cplk=aDZhd2hzc3RjZG4w',
    instagramHandle: '@_.adityarajsingh',

    mobileNumber: '+91 9263605950',
    whatsappNumber: '919263605950',
    whatsappDisplay: '+91 9263605950',
    whatsappDirectUrl: 'https://wa.me/919263605950',
    isWhatsappConfigured: true,

    emailAddress: 'adityaraj81156@gmail.com',
    studioEmail: 'adityaraj81156@gmail.com',
    isEmailConfigured: true,

    location: 'Bhopal, India · Worldwide Remote',
  },

  studioBrand: {
    name: 'ADITYA RAJ',
    subtitle: 'DIGITAL · TECHNOLOGY · INNOVATION',
    parentCompany: 'Independent Developer · Bhopal, India',
    tagline: 'From Ideas to Innovation – We Build Your Digital Future.',
    heroLead: 'Your Complete Digital & IT Solutions Partner',
    description:
      'I provide professional digital, technology and business solutions to help startups, small businesses and established companies grow digitally.',
    closingCallout: "Let's Build Something Great Together!",
    metrics: [
      { value: '100+', label: 'Projects Delivered' },
      { value: '500+', label: 'Happy Clients' },
      { value: '99%', label: 'Client Satisfaction' },
      { value: '∞', label: 'Endless Possibilities' },
    ],
  },

  // --------------------------------------------------------------------------
  // 2. GITHUB REPOSITORIES & LIVE DEPLOYMENTS (https://github.com/Adityaraj811)
  // --------------------------------------------------------------------------
  verifiedGithubRepos: [
    {
      name: 'aditya-raj-portfolio',
      url: 'https://github.com/Adityaraj811/aditya-raj-portfolio',
      homepage: 'https://aditya-raj-portfolio-phi.vercel.app',
      language: 'TypeScript',
      description:
        'Personal developer portfolio featuring live website previews, Android app screens, interactive animations, and client customization inquiry workflows.',
      category: 'React · TypeScript · Tailwind CSS · Framer Motion · Vercel',
      visibilityLabel: 'Public GitHub Repo',
    },
    {
      name: 'Apple-Vision-ui-Web-application',
      url: 'https://github.com/Adityaraj811/Apple-Vision-ui-Web-application',
      language: 'TypeScript',
      description:
        'Responsive high-fidelity recreation of the Apple Vision Pro spatial interface with GSAP ScrollTrigger timelines, 3D scenes, and interactive HTML5 Canvas visuals.',
      category: 'HTML5 · CSS3 · TypeScript · React 19 · GSAP · Canvas API',
      visibilityLabel: 'Public GitHub Repo',
    },
    {
      name: 'dental-clinic (Dr. Shantanu Dental Clinic)',
      url: 'https://github.com/Adityaraj811',
      homepage: 'https://dental-clinic.adityaraj81156.workers.dev/',
      language: 'TypeScript',
      description:
        'International-grade dental clinic & healthcare website featuring interactive 3D visuals, dental treatment breakdowns, Schema.org Dentist SEO, and direct WhatsApp booking.',
      category: 'React · TypeScript · Vite · Tailwind CSS · 3D · Cloudflare Workers',
      visibilityLabel: 'Live Production Deployment',
    },
    {
      name: 'fitness-jym (Fitness JYM Club)',
      url: 'https://github.com/Adityaraj811',
      homepage: 'https://fitness-jym.adityaraj81156.workers.dev/',
      language: 'TypeScript',
      description:
        'High-energy athletic gym & fitness brand website ("Build Strength. Unleash Your Potential.") featuring training programs, membership tiers, and real-time BMI diagnostics.',
      category: 'React · TypeScript · Vite · Tailwind CSS · Three.js · Cloudflare Workers',
      visibilityLabel: 'Live Production Deployment',
    },
    {
      name: 'caffetaria (Veloura Specialty Coffee)',
      url: 'https://github.com/Adityaraj811',
      homepage: 'https://valoura-one.vercel.app/',
      language: 'TypeScript',
      description:
        'Specialty coffee & creative sanctuary website deployed to production on Vercel featuring interactive espresso & alchemy showcases, smooth Motion animations, and responsive design.',
      category: 'React · TypeScript · Vite · Motion · Vercel',
      visibilityLabel: 'Live Production Deployment',
    },
    {
      name: 'khata-expence-manager (KHATA Android + Spring Boot)',
      url: 'https://github.com/Adityaraj811',
      language: 'Java',
      description:
        'Household shared expense management Android app (Java, XML, MVVM, Room, Retrofit) paired with a Spring Boot REST API, Spring Security, JPA/Hibernate, and MySQL backend.',
      category: 'Java · Android MVVM · Room · Retrofit · Spring Boot · MySQL',
      visibilityLabel: 'Live Production Deployment',
    },
  ] as PublicGithubRepo[],

  // --------------------------------------------------------------------------
  // 3. THREE CORE ENGINEERING PILLARS
  // --------------------------------------------------------------------------
  corePillars: [
    {
      index: '01.',
      title: 'Java & Backend Engineering',
      summary:
        'Building backend services using Spring Boot, Spring Security, REST APIs, JDBC, JPA/Hibernate, and relational SQL databases.',
      technologies: 'Java · Spring Boot · Spring Security · REST APIs · JPA/Hibernate · SQL',
    },
    {
      index: '02.',
      title: 'Android App Development',
      summary:
        'Developing native Android applications using Java and XML layouts with MVVM architecture, ViewModel, LiveData, Room, and Retrofit.',
      technologies: 'Android (Java) · XML Layouts · MVVM · ViewModel · LiveData · Room · Retrofit',
    },
    {
      index: '03.',
      title: 'Responsive Web & Product UI',
      summary:
        'Crafting modern websites, SaaS dashboards, CRM portals, and interactive animations using React, TypeScript, GSAP, Three.js, and Canvas API.',
      technologies: 'React · TypeScript · Tailwind CSS · GSAP · Three.js · Canvas API',
    },
  ],

  // --------------------------------------------------------------------------
  // 4. COMPACT ABOUT SECTION & DUAL AUDIENCE CARDS
  // --------------------------------------------------------------------------
  about: {
    sectionTitle: 'Java Backend Engineering, Android Apps & Full-Stack Digital Solutions',
    shortIntro:
      'Developer and digital solutions builder focused on custom websites, web applications, Java Spring Boot backends, and native Android apps. Solved 400+ coding problems across LeetCode, CodeChef, HackerRank, and GeeksforGeeks while delivering 100+ digital projects for clients.',
    highlights: [
      {
        label: 'Core Engineering Focus',
        value: 'Java Backend & Android',
        detail: 'Spring Boot, REST APIs, JPA/Hibernate, SQL & Android (Java/XML)',
      },
      {
        label: 'Internship Experience',
        value: 'Android Intern · Inspireleap',
        detail: 'Oct 2025 – Dec 2025 · Java Development, Debugging & Collaboration',
      },
      {
        label: 'DSA & Problem Solving',
        value: '400+ Coding Problems',
        detail: 'CodeChef, HackerRank, GeeksforGeeks & 100+ Solved on LeetCode',
      },
      {
        label: 'Education & Certification',
        value: 'B.Tech CSE (2022–2026)',
        detail: 'CGPA: 7.0 · Web Development Course (Rinex & E-Cell, IIT Bhubaneswar)',
      },
    ],
    techBadges: [
      'Java',
      'JavaScript',
      'TypeScript',
      'SQL',
      'Spring Boot',
      'Spring Security',
      'REST APIs',
      'Hibernate & JPA',
      'Core Java & OOP',
      'DSA',
      'Android (Java)',
      'XML Layouts',
      'MVVM · ViewModel · LiveData',
      'Room & Retrofit',
      'HTML5 & CSS3',
      'React & Tailwind CSS',
      'GSAP & Three.js',
      'Canvas API',
      'MySQL & PostgreSQL',
      'Git & GitHub',
      'Postman',
      'Linux/Ubuntu',
    ],
    recruiterCard: {
      title: 'FOR SOFTWARE RECRUITERS',
      description:
        'Open to Java Backend Developer, Android Developer, and Software Engineer opportunities. Hands-on experience with Java, Spring Boot, REST APIs, JPA/Hibernate, SQL, Android MVVM, and 400+ solved coding problems.',
    },
    freelanceCard: {
      title: 'FOR BUSINESSES & CLIENTS',
      description:
        'Need a custom website, mobile app, CRM software, e-commerce store, or Meta Ads growth partner? Explore all 12 services.',
      buttonText: 'Explore All 12 Services →',
    },
  },

  // --------------------------------------------------------------------------
  // 5. TECHNICAL SKILLS (MATCHING UPDATED CV CATEGORIES)
  // --------------------------------------------------------------------------
  skillCategories: [
    {
      id: 'programming-core',
      index: '01.',
      title: 'Programming & Core Concepts',
      subtitle: 'Core languages, Object-Oriented Programming, and Data Structures & Algorithms',
      skills: [
        {
          name: 'Java (Core Java & OOP)',
          category: 'Programming & Core Concepts',
          context: 'Object-Oriented Programming, Core Java fundamentals, backend & Android engineering',
          iconKey: 'java',
        },
        {
          name: 'Data Structures & Algorithms',
          category: 'Programming & Core Concepts',
          context: 'Solved 400+ problems across CodeChef, HackerRank, GeeksforGeeks & LeetCode (100+)',
          iconKey: 'java',
        },
        {
          name: 'JavaScript & TypeScript',
          category: 'Programming & Core Concepts',
          context: 'Interactive web interfaces, asynchronous logic, DOM & Canvas scripting',
          iconKey: 'javascript',
        },
        {
          name: 'SQL',
          category: 'Programming & Core Concepts',
          context: 'Relational queries, joins, indexing, schema design, and transactional data modeling',
          iconKey: 'sql',
        },
      ],
    },
    {
      id: 'backend',
      index: '02.',
      title: 'Backend Engineering',
      subtitle: 'Java server-side frameworks, REST endpoints, ORM persistence, and security',
      skills: [
        {
          name: 'Spring Boot',
          category: 'Backend Engineering',
          context: 'Building backend services with layered REST controllers and service logic',
          iconKey: 'springboot',
        },
        {
          name: 'Spring Security',
          category: 'Backend Engineering',
          context: 'Authentication flows, authorization rules, and securing REST API endpoints',
          iconKey: 'security',
        },
        {
          name: 'REST APIs',
          category: 'Backend Engineering',
          context: 'Resource-oriented HTTP endpoints, JSON payloads, and Android/web client integration',
          iconKey: 'api',
        },
        {
          name: 'Hibernate & JPA',
          category: 'Backend Engineering',
          context: 'Object-Relational Mapping (ORM), JPA repositories, and entity lifecycle management',
          iconKey: 'hibernate',
        },
        {
          name: 'JDBC',
          category: 'Backend Engineering',
          context: 'Direct relational database connectivity, prepared statements, and SQL execution',
          iconKey: 'jdbc',
        },
        {
          name: 'MySQL & PostgreSQL',
          category: 'Backend Engineering',
          context: 'Relational database engines for backend persistence and schema management',
          iconKey: 'mysql',
        },
      ],
    },
    {
      id: 'application',
      index: '03.',
      title: 'Android Development',
      subtitle: 'Native Android apps in Java with XML layouts, MVVM, Room, and Retrofit',
      skills: [
        {
          name: 'Android (Java)',
          category: 'Android Development',
          context: 'Native Android application implementation, debugging, and lifecycle management',
          iconKey: 'android',
        },
        {
          name: 'XML Layouts',
          category: 'Android Development',
          context: 'Structured mobile UI screens, Material components, and responsive Android views',
          iconKey: 'xml',
        },
        {
          name: 'MVVM Architecture',
          category: 'Android Development',
          context: 'Clean separation across UI views, ViewModels, and local/remote repositories',
          iconKey: 'mvvm',
        },
        {
          name: 'ViewModel & LiveData',
          category: 'Android Development',
          context: 'Lifecycle-aware state management and observable data streams for UI updates',
          iconKey: 'livedata',
        },
        {
          name: 'Room Database',
          category: 'Android Development',
          context: 'Local SQLite abstraction with Entities and DAOs for offline-first Android storage',
          iconKey: 'room',
        },
        {
          name: 'Retrofit',
          category: 'Android Development',
          context: 'Type-safe HTTP networking integrating Android apps with Spring Boot REST APIs',
          iconKey: 'retrofit',
        },
      ],
    },
    {
      id: 'web-tools',
      index: '04.',
      title: 'Web, Databases & Developer Tools',
      subtitle: 'Modern frontend interfaces, animations, build tools, and Linux workflow',
      skills: [
        {
          name: 'HTML5, CSS3, React & TypeScript',
          category: 'Web & Tools',
          context: 'Responsive web interfaces, multilingual PWAs, and modular frontend components',
          iconKey: 'html',
        },
        {
          name: 'GSAP, ScrollTrigger & Canvas API',
          category: 'Web & Tools',
          context: 'Scroll-driven animations, interactive 2D/3D visualizers, and Canvas rendering',
          iconKey: 'responsive',
        },
        {
          name: 'Git & GitHub',
          category: 'Web & Tools',
          context: 'Source-code versioning, team collaboration, and production Vercel/Cloudflare deployments',
          iconKey: 'git',
        },
        {
          name: 'Postman, Android Studio & VS Code',
          category: 'Web & Tools',
          context: 'REST API testing, Android debugging, and daily software development IDEs',
          iconKey: 'postman',
        },
        {
          name: 'Maven & Gradle',
          category: 'Web & Tools',
          context: 'Dependency management and project build automation for Spring Boot and Android',
          iconKey: 'vscode',
        },
        {
          name: 'Linux / Ubuntu',
          category: 'Web & Tools',
          context: 'Command-line workflow, development environment setup, and system tooling',
          iconKey: 'linux',
        },
      ],
    },
  ] as SkillCategory[],

  // --------------------------------------------------------------------------
  // 6. SELECTED PROJECTS & LIVE WEBSITE SAMPLES
  // --------------------------------------------------------------------------
  projects: [
    {
      id: 'dental-clinic-website',
      index: '01.',
      title: 'Dr. Shantanu Dental Clinic – Personalized Dental Care',
      subtitle: 'Live Healthcare & Dental Clinic Website · 3D & WhatsApp Booking',
      status: 'Live Website',
      statusNote:
        'Live healthcare & dental clinic website with interactive 3D dental visuals, treatment breakdowns, and WhatsApp appointment booking.',
      domain: 'Website Design & Development',
      overview:
        'An international-grade, responsive dental clinic and healthcare website featuring an interactive 3D dental visual, treatment showcases (Root Canal, Implants, Cosmetic Dentistry, Orthodontics, Whitening), Schema.org Dentist SEO structured data, and instant WhatsApp appointment booking.',
      objectives: [
        'Build a trustworthy, fast-loading medical and dental clinic website engineered for seamless patient conversion.',
        'Deliver a calming clinical palette (#F6FAFA & #153656 navy with #80BCB8 teal) paired with Playfair Display and Manrope typography.',
        'Enable frictionless appointment inquiries through interactive 3D dental visuals and instant WhatsApp scheduling.',
      ],
      contribution: [
        'Designed and engineered the complete Dr. Shantanu Dental Clinic web experience from wireframes to production launch.',
        'Implemented interactive 3D dental visuals, categorized dental treatment modules, clinic timings (Mon–Sat, 10 AM – 8 PM), and WhatsApp booking.',
        'Configured Schema.org Dentist JSON-LD structured data, OpenGraph metadata, and responsive mobile/tablet/desktop layouts.',
      ],
      implementedFeatures: [
        'Interactive 3D visual showcase paired with responsive mobile, tablet, and desktop layouts.',
        'Comprehensive treatment catalog (Root Canal, Implants, Cosmetic Dentistry, Orthodontics, Scaling).',
        'Direct WhatsApp appointment booking system and Schema.org Local Dentist SEO structured data.',
      ],
      technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', '3D Visuals', 'JSON-LD SEO'],
      architectureHighlights: [
        {
          layer: 'Fast Edge Delivery',
          detail: 'Optimized production bundle engineered for instant page loads across mobile networks and desktops.',
        },
        {
          layer: 'Patient Experience & WhatsApp Flow',
          detail: 'Interactive 3D dental visual paired with structured treatment cards and one-click WhatsApp slot scheduling.',
        },
        {
          layer: 'Healthcare SEO & Responsive UI',
          detail: 'Built with Schema.org Dentist JSON-LD structured data and mobile-first responsive layouts.',
        },
      ],
      githubUrl: 'https://github.com/Adityaraj811',
      githubButtonLabel: 'GitHub Profile',
      githubPlaceholderNote: 'Live Client Website',
      liveDemoUrl: 'https://dental-clinic.adityaraj81156.workers.dev/',
      visualType: 'dental-clinic-web',
    },
    {
      id: 'fitness-jym-website',
      index: '02.',
      title: 'Fitness JYM – Build Strength. Unleash Your Potential.',
      subtitle: 'Live Gym & Fitness Club Website · Programs, Plans & BMI Tool',
      status: 'Live Website',
      statusNote:
        'Live gym and fitness club website featuring Iron Sanctuary showcase, training programs, membership tiers, and interactive BMI diagnostics.',
      domain: 'Website Design & Development',
      overview:
        'A high-energy, responsive gym and fitness club website featuring the Iron Sanctuary showcase, structured Training Programs, Membership Plan tiers, an interactive BMI Metric Diagnostic calculator, and direct WhatsApp quick-chat integration.',
      objectives: [
        'Build a fast, high-conversion gym and fitness brand website tailored for athletic clubs and personal trainers.',
        'Craft an athletic dark-obsidian (#08090B) and high-voltage orange (#FF5E00) visual identity.',
        'Provide interactive visitor tools including Training Programs, Membership Plan tiers, and a real-time BMI Diagnostic calculator.',
      ],
      contribution: [
        'Designed and engineered the interactive Fitness JYM website with full responsive polish.',
        'Implemented interactive sections including Iron Sanctuary, Training Programs, Membership Plans, and the BMI Metric Diagnostic calculator.',
        'Engineered smooth motion and clear mobile/tablet/desktop layouts with floating WhatsApp quick-chat CTA.',
      ],
      implementedFeatures: [
        'Iron Sanctuary athletic showcase, categorized Training Programs, and transparent Membership Plan tiers.',
        'Real-time interactive BMI Metric Diagnostic calculator for prospective gym members.',
        'Responsive multi-device UI with floating WhatsApp quick-chat lead capture integration.',
      ],
      technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Three.js'],
      architectureHighlights: [
        {
          layer: 'High-Speed Responsive Core',
          detail: 'Performance-tuned React + TypeScript architecture delivering smooth frame rates on phones and desktops.',
        },
        {
          layer: 'Interactive Fitness & BMI Modules',
          detail: 'Modular React + TypeScript sections for Training Programs, Membership tiers, and real-time BMI diagnostics.',
        },
        {
          layer: 'Responsive Athletic Design System',
          detail: 'High-contrast obsidian (#08090B) and neon-orange (#FF5E00) interface optimized for all devices.',
        },
      ],
      githubUrl: 'https://github.com/Adityaraj811',
      githubButtonLabel: 'GitHub Profile',
      githubPlaceholderNote: 'Live Client Website',
      liveDemoUrl: 'https://fitness-jym.adityaraj81156.workers.dev/',
      visualType: 'fitness-jym-web',
    },
    {
      id: 'veloura-specialty-coffee',
      index: '03.',
      title: 'Veloura – Specialty Coffee & Creative Sanctuary',
      subtitle: 'Valoura Live Website · Interactive Hospitality Experience',
      status: 'Live Website',
      statusNote:
        'Live hospitality & specialty coffee website featuring interactive espresso & alchemy showcases, smooth Motion animations, and responsive precision.',
      domain: 'Website Design & Development',
      overview:
        'A premium, responsive specialty coffee and creative sanctuary website featuring interactive UI screens, specialty coffee storytelling, smooth animations, and responsive layout precision across phones, tablets, and desktops.',
      objectives: [
        'Build a production-ready responsive hospitality and café web project with refined visual storytelling.',
        'Deliver fluid, scroll-responsive animations and interactive café experiences using React, TypeScript, Vite, and Motion.',
        'Ensure responsive layout precision, fast asset delivery, and seamless visual hierarchy across all screen sizes.',
      ],
      contribution: [
        'Designed and developed the full frontend architecture with Git-versioned feature releases.',
        'Engineered the interface using React, TypeScript, and Vite with modular UI components.',
        'Implemented interactive showcase screens, menu filtering, and atmospheric visual storytelling using Motion.',
      ],
      implementedFeatures: [
        'Interactive Sanctuary espresso simulator, Alchemy Menu tray, Coffee Lab cards, and Courtyard Ritual preview.',
        'Atmospheric Motion page transitions, custom audio feedback, and high-contrast editorial typography.',
        'Fully responsive frontend design tailored for mobile phones, tablets, and desktop screens.',
      ],
      technologies: ['React', 'TypeScript', 'Vite', 'Motion', 'Tailwind CSS'],
      architectureHighlights: [
        {
          layer: 'Modular Frontend Release',
          detail: 'Clean component architecture with responsive grid choreography across every screen size.',
        },
        {
          layer: 'Component Architecture',
          detail: 'Modular React + TypeScript components structured for clean maintainability and responsive layout scaling.',
        },
        {
          layer: 'Motion & Interaction Layer',
          detail: 'Smooth entrance transitions, hover micro-interactions, and interactive showcase modules powered by Motion.',
        },
      ],
      githubUrl: 'https://github.com/Adityaraj811',
      githubButtonLabel: 'GitHub Profile',
      githubPlaceholderNote: 'Live Client Website',
      liveDemoUrl: 'https://valoura-one.vercel.app/',
      visualType: 'veloura-cafe-web',
    },
    {
      id: 'apple-vision-ui-web',
      index: '04.',
      title: 'Apple Vision UI — Interactive Spatial Web Application',
      subtitle: 'Public GitHub Repo · Responsive Spatial Web Interface · GSAP & Canvas API',
      status: 'Public GitHub Repo',
      statusNote:
        'Open-source repository on GitHub (Adityaraj811/Apple-Vision-ui-Web-application) featuring scroll-driven GSAP animations and interactive HTML5 Canvas visuals.',
      domain: 'Web Application',
      overview:
        'Designed and developed a responsive, high-fidelity recreation of the Apple Vision Pro spatial web interface featuring scroll-driven GSAP and ScrollTrigger animations, 3D WebGL scenes, interactive HTML5 Canvas visuals, and customizable visionOS visual themes.',
      objectives: [
        'Build a responsive Apple Vision Pro-inspired web interface with smooth scroll-driven GSAP and ScrollTrigger animations.',
        'Render 360° hardware frame scrubbing, optical stack layers, and real-time sensor visualizers via HTML5 Canvas API and Three.js.',
        'Support customizable visionOS themes, adaptive dark/light mode, and responsive multi-device layouts.',
      ],
      contribution: [
        'Built and published the complete spatial web interface on GitHub (Apple-Vision-ui-Web-application).',
        'Engineered HTML5 2D Canvas modules for 360° scrubbing, 5-layer optical stack inspection, and M2 + R1 / Eye Tracking visualizers.',
        'Implemented GSAP ScrollTrigger timelines, interactive Three.js 3D hardware studio, and customizable visionOS themes.',
      ],
      implementedFeatures: [
        'Scroll-driven GSAP + ScrollTrigger animations and 360° HTML5 Canvas frame scrubbing.',
        'Interactive Three.js 3D scene with OrbitControls, exploded view, and 6 hardware callouts.',
        'Customizable visionOS themes alongside Eye Tracking, LiDAR Sensor, and M2 + R1 Canvas visualizers.',
      ],
      technologies: [
        'HTML5',
        'CSS3',
        'TypeScript',
        'React 19',
        'Three.js',
        'GSAP',
        'ScrollTrigger',
        'Canvas API',
      ],
      architectureHighlights: [
        {
          layer: 'Scroll & Canvas Engine',
          detail: 'GSAP ScrollTrigger timelines paired with interactive HTML5 Canvas visualizers and 360° frame scrubbing.',
        },
        {
          layer: '3D Spatial Studio',
          detail: 'Three.js WebGL scene with OrbitControls, Micro-OLED shaders, and hardware camera presets.',
        },
        {
          layer: 'Responsive Theme & UI System',
          detail: 'HTML5, CSS3, React & TypeScript architecture with visionOS environment themes and responsive layouts.',
        },
      ],
      githubUrl: 'https://github.com/Adityaraj811/Apple-Vision-ui-Web-application',
      githubButtonLabel: 'View GitHub Repo',
      githubPlaceholderNote: 'github.com/Adityaraj811/Apple-Vision-ui-Web-application',
      visualType: 'apple-vision-web',
    },
    {
      id: 'khata-expense-app',
      index: '05.',
      title: 'KHATA – Shared Expense Management App',
      subtitle: 'Android Application & Spring Boot Backend for Household Groups',
      status: 'In Development',
      statusNote:
        'Android application and Spring Boot backend built with Java, Android XML, MVVM, Room, Retrofit, REST APIs, Spring Security, JPA/Hibernate, and MySQL.',
      domain: 'Android & Backend',
      overview:
        'Developing an Android application for household groups to record shared expenses, split costs, track member balances, and manage settlements, backed by a Spring Boot REST API service with JPA repositories and MySQL persistence.',
      objectives: [
        'Enable household groups and roommates to record shared expenses, split costs accurately, track member balances, and manage settlements.',
        'Build a Spring Boot backend with REST endpoints, Spring Security, and JPA/Hibernate repositories persisted in MySQL.',
        'Integrate Android local persistence using Room with remote REST synchronization via Retrofit under MVVM architecture.',
      ],
      contribution: [
        'Developing an Android application for household groups to record shared expenses, split costs, track member balances, and manage settlements.',
        'Building the Spring Boot backend with REST endpoints and JPA repositories, alongside Android data integration using Room and Retrofit.',
        'Structuring the Android presentation layer in Java and XML layouts using MVVM, ViewModel, and LiveData.',
      ],
      implementedFeatures: [
        'Household group expense recording and equal/custom cost splitting across shared categories.',
        'Real-time member balance tracking and settlement management workflow.',
        'Spring Boot REST API endpoints with Spring Security, JPA/Hibernate repositories, and MySQL.',
        'Android data integration combining local Room persistence with Retrofit HTTP client.',
      ],
      technologies: [
        'Java',
        'Android XML',
        'MVVM',
        'Room',
        'Retrofit',
        'Spring Boot',
        'REST APIs',
        'Spring Security',
        'JPA/Hibernate',
        'MySQL',
      ],
      architectureHighlights: [
        {
          layer: 'Android MVVM Presentation',
          detail: 'Java + Android XML layouts structured with MVVM, ViewModel, and LiveData for clean UI state management.',
        },
        {
          layer: 'Room & Retrofit Data Layer',
          detail: 'Android data integration combining Room local SQLite persistence with Retrofit REST API client.',
        },
        {
          layer: 'Spring Boot & JPA Backend',
          detail: 'Spring Boot REST endpoints secured with Spring Security and persisted via JPA/Hibernate repositories in MySQL.',
        },
      ],
      githubUrl: 'https://github.com/Adityaraj811',
      githubButtonLabel: 'GitHub Profile',
      githubPlaceholderNote: 'Android + Spring Boot Architecture',
      visualType: 'khata-android',
    },
    {
      id: 'krishi-mitra-ai',
      index: '06.',
      title: 'KrishiMitra – AI-Based Crop Recommendation System',
      subtitle: 'Team Project · ML Crop Recommendation Platform & Multilingual PWA',
      status: 'Team Project',
      statusNote:
        'Four-member team project evaluating 22 machine-learning algorithms (Extra Trees selected) with a multilingual PWA interface and agriculture economics dashboard.',
      domain: 'Web Application',
      overview:
        'Collaborated in a four-member team to build an AI-based crop recommendation platform; evaluated 22 machine-learning algorithms and selected Extra Trees based on accuracy and inference latency, paired with a multilingual PWA interface featuring offline fallback content and an agriculture economics dashboard.',
      objectives: [
        'Benchmark 22 machine-learning classification algorithms on soil and climate features to select the optimal crop recommendation model.',
        'Deliver a multilingual Progressive Web App (PWA) with offline fallback content for low-connectivity regions.',
        'Provide an interactive agriculture economics dashboard for analyzing yield potential, input costs, and crop profitability.',
      ],
      contribution: [
        'Collaborated in a four-member team to build a crop recommendation platform evaluating 22 ML algorithms.',
        'Developed a multilingual PWA interface with offline fallback content and an agriculture economics dashboard using React and TypeScript.',
        'Integrated Java and Python (Scikit-learn) model inference pipelines with soil (N-P-K, pH) and weather parameter inputs.',
      ],
      implementedFeatures: [
        'Extra Trees ML crop recommendation engine selected after benchmarking 22 algorithms for accuracy and low inference latency.',
        'Multilingual PWA interface with service-worker offline fallback content for rural connectivity.',
        'Interactive agriculture economics dashboard displaying estimated yield, cultivation cost, and market return insights.',
      ],
      technologies: ['Java', 'Python', 'Scikit-learn', 'React', 'TypeScript', 'PWA'],
      architectureHighlights: [
        {
          layer: 'ML Evaluation & Extra Trees Engine',
          detail: 'Evaluated 22 Scikit-learn machine-learning models and selected Extra Trees for optimal accuracy and fast latency.',
        },
        {
          layer: 'Multilingual PWA & Offline Fallback',
          detail: 'React + TypeScript Progressive Web App supporting regional languages and offline fallback content.',
        },
        {
          layer: 'Agriculture Economics Dashboard',
          detail: 'Data-driven crop economics view connecting Java/Python backend insights with interactive visual analytics.',
        },
      ],
      githubUrl: 'https://github.com/Adityaraj811',
      githubButtonLabel: 'GitHub Profile',
      githubPlaceholderNote: 'Team Project · Multilingual PWA',
      visualType: 'krishi-mitra-web',
    },
  ] as ProjectItem[],

  // --------------------------------------------------------------------------
  // 7. ALL 12 FREELANCE SERVICES
  // --------------------------------------------------------------------------
  freelanceSection: {
    pageHeadline: 'From Ideas to Innovation – We Build Your Digital Future.',
    pageSubheading:
      'Complete Digital & IT Solutions by Aditya Raj — from custom websites, mobile apps, CRM & SaaS platforms to Meta Ads, Bulk SMS, branding, and cloud hosting.',
    ctaHeadline: "Let's Build Something Great Together!",
    ctaButtonLabel: 'Start Your Project',
    personalCommitmentNote:
      'Work directly with Aditya Raj for clean code, custom brand design, responsive mobile/tablet/desktop support, and dedicated ongoing technical care.',
    services: [
      {
        id: 'website-development',
        index: '01.',
        category: 'web',
        title: 'Website Development',
        tagline: 'Business, corporate, portfolio & high-converting landing pages.',
        description:
          'Complete website solutions designed to establish brand authority, showcase your offerings, and convert visitors on every phone, tablet, and desktop screen.',
        deliverables: [
          'Business Website Development',
          'Personal & Professional Portfolio',
          'Corporate Website & Landing Page Development',
          'Custom Website Design, Responsive & Redesign/Maintenance',
        ],
        idealFor: 'Businesses, founders, clinics, gyms, cafés & professionals',
        inquiryTopic: 'Website Development (Business / Portfolio / Landing Page)',
        featuredDemoUrl: 'https://valoura-one.vercel.app/',
        featuredDemoTitle: 'Featured Demo — Veloura Café Website',
        featuredDemoBadge: 'Live on Vercel',
        mockupType: 'business',
      },
      {
        id: 'logo-graphic-design',
        index: '02.',
        category: 'growth',
        title: 'Logo & Graphic Design',
        tagline: 'Distinctive visual identity, print collaterals & digital graphics.',
        description:
          'Complete brand visual systems engineered to make startups and local businesses instantly recognizable online and offline.',
        deliverables: [
          'Professional Logo Design & Brand Identity Design',
          'Business Card Design',
          'Social Media Post Design',
          'Brochure & Banner Design',
        ],
        idealFor: 'New brands, startups, shops & product launches',
        inquiryTopic: 'Logo & Graphic Design / Brand Identity',
        mockupType: 'design',
      },
      {
        id: 'web-application-development',
        index: '03.',
        category: 'apps',
        title: 'Web Application Development',
        tagline: 'Custom web portals, admin dashboards & SaaS automation platforms.',
        description:
          'Interactive, scalable web applications and internal dashboards engineered with React, TypeScript, Java Spring Boot REST APIs, and relational SQL databases.',
        deliverables: [
          'Custom Web Application Development',
          'Dashboard & Admin Panel',
          'SaaS Application Development',
          'Business Automation Solutions',
        ],
        idealFor: 'Clinics, SaaS founders, institutes & operations teams',
        inquiryTopic: 'Web Application / Dashboard / SaaS Development',
        featuredDemoUrl: 'https://dental-clinic.adityaraj81156.workers.dev/',
        featuredDemoTitle: 'Featured Demo — Dr. Shantanu Dental Clinic',
        featuredDemoBadge: 'Live on Cloudflare',
        mockupType: 'webapp',
      },
      {
        id: 'mobile-app-development',
        index: '04.',
        category: 'apps',
        title: 'Mobile App Development',
        tagline: 'Android & iOS apps, e-commerce apps & custom business mobile tools.',
        description:
          'Clean, high-performance mobile applications built for everyday usability—covering native Android (Java/MVVM/Room), cross-platform apps, e-commerce, and maintenance.',
        deliverables: [
          'Android & iOS Apps',
          'E-commerce Apps & Custom Business Apps',
          'App UI/UX Design',
          'App Maintenance & Feature Upgrades',
        ],
        idealFor: 'D2C brands, utility startups, service providers & businesses',
        inquiryTopic: 'Mobile App Development (Android / iOS / Business App)',
        mockupType: 'android',
      },
      {
        id: 'crm-solutions',
        index: '05.',
        category: 'apps',
        title: 'CRM Solutions',
        tagline: 'Custom CRM pipelines, lead tracking & team automation.',
        description:
          'Tailored Customer Relationship Management software built around your exact sales funnel, follow-up reminders, and staff workflows.',
        deliverables: [
          'Custom CRM Development',
          'Lead Management & Pipeline Tracking',
          'Sales & Marketing Automation',
          'Employee Management Portal',
        ],
        idealFor: 'Real estate, agencies, coaching centers, sales teams & SMEs',
        inquiryTopic: 'Custom CRM & Lead Management Solution',
        mockupType: 'crm',
      },
      {
        id: 'digital-marketing-meta-ads',
        index: '06.',
        category: 'growth',
        title: 'Digital Marketing & Meta Ads',
        tagline: 'Targeted Facebook & Instagram ad funnels for qualified business leads.',
        description:
          'ROI-focused ad campaigns, creative funnels, and audience optimization crafted to bring real enquiries directly to your WhatsApp or website.',
        deliverables: [
          'Facebook & Instagram Ads',
          'Lead Generation Campaigns',
          'Social Media Marketing',
          'Campaign Optimization & Analytics',
        ],
        idealFor: 'Clinics, gyms, local businesses, D2C stores & coaches',
        inquiryTopic: 'Digital Marketing & Meta Ads Campaign',
        mockupType: 'marketing',
      },
      {
        id: 'bulk-sms-messaging',
        index: '07.',
        category: 'growth',
        title: 'Bulk SMS & Messaging Services',
        tagline: 'Promotional SMS, transactional alerts, WhatsApp & OTP APIs.',
        description:
          'Reliable, high-deliverability messaging infrastructure for customer alerts, automated WhatsApp notifications, and secure OTP verification.',
        deliverables: [
          'Promotional & Transactional SMS',
          'WhatsApp Messaging Automation',
          'OTP SMS Integration',
          'Custom SMS API Solutions',
        ],
        idealFor: 'E-commerce stores, coaching institutes, apps & hospitals',
        inquiryTopic: 'Bulk SMS, WhatsApp Messaging & OTP API',
        mockupType: 'messaging',
      },
      {
        id: 'launching-promotional-videos',
        index: '08.',
        category: 'growth',
        title: 'Launching & Promotional Videos',
        tagline: 'High-impact launch reels, product promos & motion graphics.',
        description:
          'Engaging launch films, product showcase edits, and crisp motion-graphics reels designed to capture attention across social feeds and landing pages.',
        deliverables: [
          'Business Launch Videos',
          'Product Promotional Videos',
          'Brand Promotional Videos',
          'Motion Graphics & Kinetic Typography',
        ],
        idealFor: 'Product launches, events, brands & Meta Ad creatives',
        inquiryTopic: 'Launching & Promotional Video Production',
        mockupType: 'video',
      },
      {
        id: 'ecommerce-solutions',
        index: '09.',
        category: 'web',
        title: 'E-commerce Solutions',
        tagline: 'Complete online stores with catalog, checkout & payment integration.',
        description:
          'End-to-end online storefronts built for speed and conversion—featuring product management, payment gateways, and smooth order tracking.',
        deliverables: [
          'Online Store Development',
          'Product & Inventory Management',
          'Payment Gateway Integration',
          'Order & Delivery Workflow',
        ],
        idealFor: 'Retail brands, boutiques, food/fitness brands & wholesalers',
        inquiryTopic: 'E-commerce Online Store Development',
        featuredDemoUrl: 'https://fitness-jym.adityaraj81156.workers.dev/',
        featuredDemoTitle: 'Featured Demo — Fitness JYM Showcase',
        featuredDemoBadge: 'Live on Cloudflare',
        mockupType: 'landing',
      },
      {
        id: 'software-development',
        index: '10.',
        category: 'apps',
        title: 'Software Development',
        tagline: 'Bespoke business software, cloud systems & backend REST APIs.',
        description:
          'Dependable custom software engineered to digitize manual operations—backed by Java Spring Boot, PostgreSQL/MySQL, and cloud architecture.',
        deliverables: [
          'Custom Software Solutions',
          'Business Management Software',
          'Cloud-Based Solutions',
          'Scalable REST API Development',
        ],
        idealFor: 'Enterprises, billing/inventory workflows & custom SaaS teams',
        inquiryTopic: 'Custom Software & API Development',
        mockupType: 'software',
      },
      {
        id: 'ui-ux-product-design',
        index: '11.',
        category: 'web',
        title: 'UI/UX & Product Design',
        tagline: 'Wireframing, interactive prototypes & modern web/app interfaces.',
        description:
          'Human-centered interface architecture that turns complex user journeys into intuitive, responsive, high-conversion digital products.',
        deliverables: [
          'Complete UI/UX Design Systems',
          'Interactive Wireframing & Prototyping',
          'User Experience Optimization',
          'Modern Web & Mobile App Design',
        ],
        idealFor: 'Startups, SaaS products, mobile apps & website revamps',
        inquiryTopic: 'UI/UX & Product Design Project',
        mockupType: 'uiux',
      },
      {
        id: 'it-technical-services',
        index: '12.',
        category: 'growth',
        title: 'IT & Technical Services',
        tagline: 'Domain, Vercel/Cloudflare cloud hosting, SSL security & ongoing support.',
        description:
          'Hassle-free technical infrastructure management so your website and apps stay fast, secure, and always online without downtime.',
        deliverables: [
          'Domain & DNS Hosting Setup',
          'Cloud Hosting Solutions (Vercel, Cloudflare, AWS)',
          'Website Security & SSL Hardening',
          'Dedicated Ongoing Technical Support',
        ],
        idealFor: 'Businesses wanting stress-free hosting, security & upkeep',
        inquiryTopic: 'IT, Domain, Cloud Hosting & Technical Support',
        mockupType: 'it',
      },
    ] as FreelanceServiceItem[],
  },

  // --------------------------------------------------------------------------
  // 8. INTERACTIVE FAQ (MATCHING FRAMER SECTION 12 — BEFORE YOU ASK)
  // --------------------------------------------------------------------------
  faqs: [
    {
      index: '01',
      question: 'Can you customize any live website or app sample shown in your portfolio?',
      answer:
        'Yes. Every sample (Veloura Café, Fitness JYM, Dr. Shantanu Dental Clinic, KHATA Android App, or a fresh layout) is 100% customizable—colors, branding, logo, features, WhatsApp booking, admin dashboard, and custom domain.',
    },
    {
      index: '02',
      question: 'What services are included in your freelance work?',
      answer:
        'We cover all 12 digital & IT solutions: Website Development, Logo & Graphic Design, Web Applications & SaaS, Mobile Apps (Android/iOS), CRM Solutions, Digital Marketing & Meta Ads, Bulk SMS & WhatsApp APIs, Launch Videos, E-commerce Stores, Custom Software, UI/UX Design, and Cloud Hosting/IT Support.',
    },
    {
      index: '03',
      question: 'Will my website or app work smoothly on mobile phones, tablets, and laptops?',
      answer:
        'Always. Every interface is built mobile-first and tested across mobile screens, tablets, and desktop/laptop viewports with fast Cloudflare/Vercel edge performance and clean touch targets.',
    },
    {
      index: '04',
      question: 'How fast can a custom website, landing page, or app be delivered?',
      answer:
        'Standard business websites and landing pages typically launch within 5–10 days once content is ready. Custom web applications, CRM systems, and mobile apps take 2–6 weeks depending on feature scope.',
    },
    {
      index: '05',
      question: 'How do I start a project or request pricing?',
      answer:
        'Message directly on WhatsApp (+91 9263605950) or email adityaraj81156@gmail.com with your requirement or favorite sample link. You will get a clear timeline and transparent quote right away.',
    },
  ] as FaqItem[],

  // --------------------------------------------------------------------------
  // 9. EDUCATION, INTERNSHIP & CERTIFICATIONS (FROM OFFICIAL UPDATED CV)
  // --------------------------------------------------------------------------
  education: {
    degree: 'Bachelor of Technology (B.Tech)',
    specialization: 'Computer Science and Engineering',
    institution: 'Technocrats Institute of Technology, Bhopal',
    university: 'Rajiv Gandhi Proudyogiki Vishwavidyalaya (RGPV), Bhopal',
    durationPlaceholder: '2022 – 2026 · CGPA: 7.0',
    cgpa: '7.0',
    duration: '2022 – 2026',
    summary:
      'Focused on software engineering fundamentals, Object-Oriented Programming in Java, Data Structures & Algorithms, Database Management Systems (SQL / MySQL / PostgreSQL), Spring Boot backend architecture, and Android & web application development.',
    academicTimeline: [
      {
        level: 'UNDERGRADUATE DEGREE',
        degreeOrClass: 'B.Tech, Computer Science and Engineering',
        institution: 'Technocrats Institute of Technology, Bhopal',
        boardOrUniversity: 'RGPV',
        duration: '2022 – 2026',
        score: 'CGPA: 7.0',
      },
      {
        level: 'HIGHER SECONDARY (CLASS XII)',
        degreeOrClass: 'Class XII',
        institution: 'S.B.S +2 H/S, Lakhisarai, Bihar',
        boardOrUniversity: 'BSEB',
        duration: '2021 – 2022',
        score: '71%',
      },
      {
        level: 'SECONDARY SCHOOL (CLASS X)',
        degreeOrClass: 'Class X',
        institution: 'Gauri Shankar H/S, Katehar, Lakhisarai, Bihar',
        boardOrUniversity: 'BSEB',
        duration: '2019 – 2020',
        score: '71%',
      },
    ] as EducationHistoryItem[],
    internship: {
      role: 'Android App Development Intern',
      company: 'Inspireleap',
      duration: 'Oct 2025 – Dec 2025',
      description:
        'Completed a hands-on Android app development internship, contributing to practical application implementation and strengthening Java development, debugging, and collaboration skills.',
    },
    certifications: [
      {
        title: 'Web Development Course',
        issuer: 'Rinex, in association with E-Cell, IIT Bhubaneswar',
        date: 'Dec 2025 – Jan 2026',
        description:
          'Completed hands-on training in responsive web development, modern frontend engineering, and practical project implementation.',
      },
    ] as CertificationItem[],
    achievements: [
      'Solved 400+ coding problems across CodeChef, HackerRank, GeeksforGeeks, and LeetCode, including 100+ on LeetCode.',
      'Languages: English (Fluent), Hindi (Native) | Strengths: Problem-Solving, Communication, Time Management',
    ],
    coreCoursework: [
      'Core Java & Object-Oriented Programming (OOP)',
      'Data Structures and Algorithms (DSA)',
      'Database Management Systems (MySQL & PostgreSQL)',
      'Backend Engineering (Spring Boot, REST APIs, JPA/Hibernate)',
      'Android App Development (Java, XML, MVVM, Room, Retrofit)',
      'Linux / Ubuntu, Git, Maven & Gradle Build Workflows',
    ],
  },
  // --------------------------------------------------------------------------
  // 10. NOIR SIGNAL TEMPLATE SECTIONS — Gallery, Clients, Experience,
  //     Recognition, Words (testimonials) & Studio Footer
  // --------------------------------------------------------------------------
  signalSections: {
    gallery: [
      { title: 'Veloura', meta: 'Live Website · 2025', image: resolvePublicAsset('images/veloura-website-preview.png') },
      { title: 'Sanctuary', meta: 'Veloura · Hero Still', image: resolvePublicAsset('images/veloura-hero.jpg') },
      { title: 'Latte', meta: 'Veloura · Menu Art', image: resolvePublicAsset('images/veloura-latte.jpg') },
      { title: 'Cortado', meta: 'Veloura · Coffee Lab', image: resolvePublicAsset('images/veloura-cortado.jpg') },
      { title: 'Cold Brew', meta: 'Veloura · Alchemy Menu', image: resolvePublicAsset('images/veloura-coldbrew.jpg') },
      { title: 'Courtyard', meta: 'Veloura · Art Direction', image: resolvePublicAsset('images/veloura-art.jpg') },
      { title: 'Portrait', meta: 'Behind the Frame', image: resolvePublicAsset('images/profile.webp') },
    ] as SignalGalleryItem[],

    clients: [
      { sector: 'Dental Care', name: 'Dr. Shantanu' },
      { sector: 'Fitness', name: 'Fitness JYM' },
      { sector: 'Hospitality', name: 'Veloura' },
      { sector: 'Internship', name: 'Inspireleap' },
      { sector: 'Training', name: 'Rinex × E-Cell' },
      { sector: 'AgriTech', name: 'KrishiMitra' },
    ] as SignalClientItem[],

    // NOTE: confirm the freelance start year — "2025" is an assumption.
    experience: [
      { period: '2025 – Now', role: 'Freelance Web & App Developer', org: 'Independent', location: 'Bhopal — Worldwide Remote' },
      { period: '2025 – 2026', role: 'Web Development Trainee', org: 'Rinex × E-Cell, IIT Bhubaneswar', location: 'Certification Course' },
      { period: 'Oct – Dec 2025', role: 'Android App Development Intern', org: 'Inspireleap', location: 'Internship' },
      { period: '2022 – 2026', role: 'B.Tech, Computer Science', org: 'Technocrats Institute of Technology', location: 'Bhopal — RGPV' },
    ] as SignalExperienceItem[],

    recognition: {
      headline: '400+',
      caption: 'Coding problems solved across CodeChef, HackerRank, GFG & LeetCode',
      items: [
        { title: 'Web Development Certification — Rinex × E-Cell, IIT Bhubaneswar', tag: 'Certified', year: '2026' },
        { title: 'Android App Development Internship — Completed', tag: 'Inspireleap', year: '2025' },
        { title: '100+ Problems Solved on LeetCode', tag: 'LeetCode', year: 'DSA' },
        { title: 'Production Launch — Dr. Shantanu Dental Clinic', tag: 'Live', year: 'Web' },
        { title: 'Production Launch — Fitness JYM', tag: 'Live', year: 'Web' },
        { title: 'Production Launch — Veloura Specialty Coffee', tag: 'Live', year: 'Web' },
      ],
    },

    // Add REAL client quotes here. Entries with an empty `quote` are shown as
    // labelled placeholders on the local dev server only, and hidden in production.
    testimonials: [
      { quote: '', author: 'Dr. Shantanu', role: 'Dr. Shantanu Dental Clinic' },
      { quote: '', author: 'Owner', role: 'Fitness JYM' },
      { quote: '', author: 'Founder', role: 'Veloura Specialty Coffee' },
    ] as SignalTestimonialItem[],
  },
};
