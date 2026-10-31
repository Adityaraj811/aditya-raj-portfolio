/**
 * ============================================================================
 * CENTRALIZED PORTFOLIO CONFIGURATION — ADITYA RAJ
 * ============================================================================
 * Edit this file to update your personal details, GitHub username, email,
 * mobile / WhatsApp number, college information, resume link, and project URLs.
 * Changes made here automatically reflect across the entire portfolio website.
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
  status: 'Completed Application' | 'Featured Platform' | 'Public Repository';
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
  visualType: 'veloura-cafe-web' | 'khata-android' | 'library-mitra-web' | 'apple-vision-web';
}

export interface PublicGithubRepo {
  name: string;
  url: string;
  description: string;
  category: string;
}

export interface FreelanceServiceItem {
  id: string;
  index: string;
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
    | 'landing'
    | 'portfolio'
    | 'startup'
    | 'professional'
    | 'webapp'
    | 'redesign'
    | 'android';
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

/**
 * Helper to resolve public static assets accurately across both local development ('/')
 * and GitHub Pages ('https://Adityaraj811.github.io/aditya-raj-portfolio/').
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
  // 1. PERSONAL IDENTITY & CONTACT CONFIGURATION
  // --------------------------------------------------------------------------
  personal: {
    name: 'Aditya Raj',
    monogram: 'AR',
    professionalHeadline: 'App & Web Developer',
    roleTriad: 'Web Applications · Mobile Applications · Java Backend Systems',
    heroGreeting: "Hi, I'm Aditya Raj.",
    heroDisplayTitle: 'App & Web Developer',
    heroDescription:
      'I build modern websites and applications with clean design, practical functionality and reliable technology.',
    availabilityBanner:
      'Open to Software Developer Opportunities & Selected Freelance Projects',

    // Profile image: Uses actual portrait resolved via import.meta.env.BASE_URL
    profileImagePath: resolvePublicAsset('images/profile.webp'),
    profileFallbackSvg: resolvePublicAsset('images/profile-placeholder.svg'),

    // Resume file configuration:
    // Uses actual uploaded CV at /public/resume.pdf resolved via import.meta.env.BASE_URL
    resumePdfPath: `${import.meta.env.BASE_URL}resume.pdf`,
    resumePreviewImagePath: resolvePublicAsset('images/resume-preview.webp'),
    resumeDownloadFilename: 'Aditya_Raj_CV.pdf',
    hasResumePdf: true,

    // Verified LinkedIn Profile
    linkedinUrl: 'https://www.linkedin.com/in/aditya-raj-523b15265/',
    linkedinHandle: 'linkedin.com/in/aditya-raj-523b15265',

    // Verified GitHub Profile (https://github.com/Adityaraj811)
    githubUsername: 'Adityaraj811',
    githubUrl: 'https://github.com/Adityaraj811',
    isGithubConfigured: true,

    // Live Portfolio Website Link
    portfolioUrl: 'https://adityaraj811.github.io/aditya-raj-portfolio/',

    // Verified Instagram Profile
    instagramUrl: 'https://www.instagram.com/_.adityarajsingh?cplk=aDZhd2hzc3RjZG4w',
    instagramHandle: '@_.adityarajsingh',

    // Verified Mobile & WhatsApp Contact
    mobileNumber: '+91 9263605950',
    whatsappNumber: '919263605950',
    whatsappDisplay: '+91 9263605950',
    whatsappDirectUrl: 'https://wa.me/919263605950',
    isWhatsappConfigured: true,

    // Verified Email Address
    emailAddress: 'adityaraj81156@gmail.com',
    isEmailConfigured: true,

    location: 'Bhopal, India · Open to Remote & On-Site Opportunities',
  },

  // --------------------------------------------------------------------------
  // 2. VERIFIED PUBLIC GITHUB REPOSITORIES (https://github.com/Adityaraj811)
  // --------------------------------------------------------------------------
  verifiedGithubRepos: [
    {
      name: 'caffetaria',
      url: 'https://github.com/Adityaraj811/caffetaria',
      description:
        'Veloura – Specialty Coffee & Creative Sanctuary: A premium, responsive café website with elegant visual design, specialty coffee photography, interactive UI elements and smooth animations.',
      category: 'React · TypeScript · Vite · Motion',
    },
    {
      name: 'khata-expence-manager',
      url: 'https://github.com/Adityaraj811/khata-expence-manager',
      description:
        'KHATA — Expense Management Application built for roommates and households to split shared bills, track group expenses, and settle balances seamlessly.',
      category: 'Java · Android MVVM · Room · Retrofit · Spring Boot',
    },
    {
      name: 'Apple-Vision-ui-Web-application',
      url: 'https://github.com/Adityaraj811/Apple-Vision-ui-Web-application',
      description:
        'Responsive, high-fidelity spatial web application inspired by Apple Vision Pro featuring scroll-driven GSAP, ScrollTrigger, and interactive HTML5 Canvas animations.',
      category: 'Interactive Web UI · GSAP · ScrollTrigger · HTML5 Canvas',
    },
  ] as PublicGithubRepo[],

  // --------------------------------------------------------------------------
  // 3. THREE CORE ENGINEERING PILLARS
  // --------------------------------------------------------------------------
  corePillars: [
    {
      index: '01.',
      title: 'Modern Web Development',
      summary:
        'Designing and building responsive websites, interactive landing pages, and web applications with clean UI/UX.',
      technologies: 'HTML5 · CSS3 · JavaScript · React · TypeScript',
    },
    {
      index: '02.',
      title: 'Mobile Application Development',
      summary:
        'Building structured native Android applications in Java using MVVM architecture, Room persistence, and Retrofit.',
      technologies: 'Android · Java · XML · MVVM · LiveData · Room · Retrofit',
    },
    {
      index: '03.',
      title: 'Java & Backend Systems',
      summary:
        'Engineering clean relational databases, RESTful APIs, and dependable server-side architectures with Spring Boot.',
      technologies: 'Java · Spring Boot · REST APIs · Hibernate · JPA · SQL',
    },
  ],

  // --------------------------------------------------------------------------
  // 4. COMPACT ABOUT SECTION & DUAL AUDIENCE CARDS
  // --------------------------------------------------------------------------
  about: {
    sectionTitle: 'Building Clean, Practical Websites & Applications',
    shortIntro:
      'App & Web Developer with a strong foundation in Java, Object-Oriented Programming, Spring Boot, REST APIs, and SQL. Experienced in building Android applications and responsive web interfaces with a focus on maintainable code and hands-on problem solving.',
    highlights: [
      {
        label: 'Core Focus',
        value: 'App & Web Development',
        detail: 'Modern Websites, Web Apps & Android Apps',
      },
      {
        label: 'Internship Experience',
        value: 'Android Intern · Inspireleap',
        detail: 'Oct 2025 – Dec 2025 · Java & Android Development',
      },
      {
        label: 'Oracle Certified',
        value: 'OCI 2025 Gen AI Professional',
        detail: 'Oracle Certified Professional · Valid Oct 2025 – Oct 2027',
      },
      {
        label: 'Education & DSA',
        value: 'B.Tech CSE (2022–2026)',
        detail: 'CGPA: 7.0 · Solved 400+ Coding Problems',
      },
    ],
    techBadges: [
      'Java',
      'Spring Boot',
      'Spring Security',
      'REST APIs',
      'Android (Java)',
      'MVVM',
      'Room & Retrofit',
      'Hibernate & JPA',
      'JDBC',
      'MySQL & PostgreSQL',
      'React & TypeScript',
      'HTML5 & CSS3',
      'JavaScript',
      'Git & GitHub',
      'Linux / Ubuntu',
    ],
    recruiterCard: {
      title: 'FOR SOFTWARE RECRUITERS',
      description:
        'Open to Software Developer opportunities. I have hands-on project experience with Java, application development, SQL and modern development technologies, and I am continuously improving my software engineering skills.',
    },
    freelanceCard: {
      title: 'FOR FREELANCE CLIENTS',
      description:
        'Need a modern website or application for your business or idea? Explore my development services.',
      buttonText: 'Explore Services →',
    },
  },

  // --------------------------------------------------------------------------
  // 5. TECHNICAL SKILLS (NO FAKE PROFICIENCY PERCENTAGES)
  // --------------------------------------------------------------------------
  skillCategories: [
    {
      id: 'programming-db',
      index: '01.',
      title: 'Programming & Database',
      subtitle: 'Core programming languages and relational database management',
      skills: [
        {
          name: 'Java',
          category: 'Programming & Database',
          context: 'Object-Oriented Programming, data structures, backend & Android logic',
          iconKey: 'java',
        },
        {
          name: 'SQL',
          category: 'Programming & Database',
          context: 'Relational queries, joins, schema design, and data modeling',
          iconKey: 'sql',
        },
        {
          name: 'MySQL & PostgreSQL',
          category: 'Programming & Database',
          context: 'Relational database engines, indexing, foreign keys, and persistence',
          iconKey: 'mysql',
        },
        {
          name: 'JavaScript',
          category: 'Programming & Database',
          context: 'Interactive frontend logic, DOM manipulation, and web applications',
          iconKey: 'javascript',
        },
      ],
    },
    {
      id: 'backend',
      index: '02.',
      title: 'Backend & Development',
      subtitle: 'Java server-side frameworks, REST APIs, ORM persistence, and security',
      skills: [
        {
          name: 'Spring',
          category: 'Backend & Development',
          context: 'Dependency injection, Inversion of Control (IoC), and modular wiring',
          iconKey: 'spring',
        },
        {
          name: 'Spring Boot',
          category: 'Backend & Development',
          context: 'Production-ready backend services and layered REST architecture',
          iconKey: 'springboot',
        },
        {
          name: 'REST APIs',
          category: 'Backend & Development',
          context: 'Resource-oriented HTTP endpoints, JSON payloads, and status handling',
          iconKey: 'api',
        },
        {
          name: 'Hibernate',
          category: 'Backend & Development',
          context: 'Object-Relational Mapping (ORM) and entity lifecycle management',
          iconKey: 'hibernate',
        },
        {
          name: 'JPA',
          category: 'Backend & Development',
          context: 'Jakarta Persistence API specification and repository abstractions',
          iconKey: 'jpa',
        },
        {
          name: 'JDBC',
          category: 'Backend & Development',
          context: 'Direct relational database connectivity and prepared statements',
          iconKey: 'jdbc',
        },
        {
          name: 'Spring Security',
          category: 'Backend & Development',
          context: 'Authentication flows, authorization rules, and API endpoint security',
          iconKey: 'security',
        },
      ],
    },
    {
      id: 'application',
      index: '03.',
      title: 'Application Development',
      subtitle: 'Native Android application architecture, reactive state, and local/remote data',
      skills: [
        {
          name: 'Android Development',
          category: 'Application Development',
          context: 'Native mobile applications, activities, fragments, and lifecycle management',
          iconKey: 'android',
        },
        {
          name: 'Java',
          category: 'Application Development',
          context: 'Core language for Android business logic and event handling',
          iconKey: 'java',
        },
        {
          name: 'XML',
          category: 'Application Development',
          context: 'Responsive mobile UI layouts, ConstraintLayout, and Material components',
          iconKey: 'xml',
        },
        {
          name: 'MVVM',
          category: 'Application Development',
          context: 'Clean separation between UI views, ViewModels, and data repositories',
          iconKey: 'mvvm',
        },
        {
          name: 'LiveData',
          category: 'Application Development',
          context: 'Lifecycle-aware observable data holders for reactive UI updates',
          iconKey: 'livedata',
        },
        {
          name: 'Room Database',
          category: 'Application Development',
          context: 'Local SQLite abstraction with DAOs for fast offline persistence',
          iconKey: 'room',
        },
        {
          name: 'Retrofit',
          category: 'Application Development',
          context: 'Type-safe HTTP client connecting Android apps to Spring Boot APIs',
          iconKey: 'retrofit',
        },
      ],
    },
    {
      id: 'web-tools',
      index: '04.',
      title: 'Web & Developer Tools',
      subtitle: 'Modern frontend technologies, version control, and Linux workflow',
      skills: [
        {
          name: 'HTML, CSS, React & TypeScript',
          category: 'Web & Tools',
          context: 'Semantic markup, responsive layouts, component-based UI, and type safety',
          iconKey: 'html',
        },
        {
          name: 'Responsive Web Design',
          category: 'Web & Tools',
          context: 'Mobile-first interfaces adapting across desktop, tablet, and phone screens',
          iconKey: 'responsive',
        },
        {
          name: 'Git',
          category: 'Web & Tools',
          context: 'Distributed version control, branching workflows, and commit management',
          iconKey: 'git',
        },
        {
          name: 'GitHub',
          category: 'Web & Tools',
          context: 'Source code hosting, collaboration, and automated web deployments',
          iconKey: 'github',
        },
        {
          name: 'Linux / Ubuntu',
          category: 'Web & Tools',
          context: 'Command-line workflow, environment configuration, and package management',
          iconKey: 'linux',
        },
        {
          name: 'Postman & VS Code',
          category: 'Web & Tools',
          context: 'REST API endpoint testing, debugging, and modern code workflow',
          iconKey: 'postman',
        },
      ],
    },
  ] as SkillCategory[],

  // --------------------------------------------------------------------------
  // 6. FEATURED PROJECTS (ONLY ACTUAL PROJECTS — KHATA PRESENTED AS COMPLETED)
  // --------------------------------------------------------------------------
  projects: [
    {
      id: 'veloura-specialty-coffee',
      index: '01.',
      title: 'Veloura – Specialty Coffee & Creative Sanctuary',
      subtitle: 'Website Design & Development · Interactive Café Showcase',
      status: 'Completed Application',
      statusNote:
        'Interactive frontend café website built with React, TypeScript, Vite, and Motion — live on Vercel with public source code on GitHub.',
      domain: 'Website Design & Development',
      overview:
        'A premium, responsive café website with elegant visual design, specialty coffee photography, interactive UI elements and smooth animations.',
      objectives: [
        'Craft an atmospheric, editorial-grade digital presence for a specialty coffee and creative sanctuary brand.',
        'Deliver fluid, scroll-responsive animations and interactive menu browsing using React, TypeScript, Vite, and Motion.',
        'Ensure responsive layout precision, fast asset loading, and seamless visual hierarchy across mobile, tablet, and desktop devices.',
      ],
      contribution: [
        'Designed and developed the frontend interface using React, TypeScript, and Vite with modular, reusable UI components.',
        'Implemented smooth entrance transitions, interactive menu filtering, and atmospheric visual storytelling using Motion.',
        'Curated specialty coffee photography, warm editorial typography, and responsive multi-device layouts as a frontend showcase.',
      ],
      implementedFeatures: [
        'Immersive hero showcase and brand storytelling with specialty coffee photography.',
        'Interactive artisanal menu and pour-over showcase with smooth Motion animations.',
        'Fully responsive frontend design tailored for mobile phones, tablets, and desktop screens.',
      ],
      technologies: ['React', 'TypeScript', 'Vite', 'Motion'],
      architectureHighlights: [
        {
          layer: 'Component Architecture',
          detail: 'Modular React + TypeScript components structured for clean maintainability and responsive layout scaling.',
        },
        {
          layer: 'Motion & Interaction Layer',
          detail: 'Smooth entrance transitions, hover micro-interactions, and fluid browsing animations powered by Motion.',
        },
        {
          layer: 'Frontend Build & Delivery',
          detail: 'Fast Vite production bundle deployed on Vercel as an interactive frontend showcase.',
        },
      ],
      githubUrl: 'https://github.com/Adityaraj811/caffetaria',
      githubButtonLabel: 'View Source Code',
      githubPlaceholderNote: 'github.com/Adityaraj811/caffetaria',
      liveDemoUrl: 'https://valoura-one.vercel.app/',
      visualType: 'veloura-cafe-web',
    },
    {
      id: 'khata-expense-app',
      index: '02.',
      title: 'KHATA — Expense Management Application',
      subtitle: 'Android Application & Spring Boot Backend for Shared Household Expenses',
      status: 'Completed Application',
      statusNote:
        'Full-stack Android & Spring Boot expense management application built with Java, MVVM architecture, Room Database, Retrofit, and SQL.',
      domain: 'Android & Backend',
      overview:
        'KHATA is a comprehensive expense management application designed to help roommates, flatmates, and groups transparently track shared household bills, split expenses accurately, and manage member balance settlements without manual spreadsheets.',
      objectives: [
        'Simplify shared living finances by allowing roommates to create dedicated household expense groups.',
        'Provide accurate expense splitting and individual contribution tracking across recurring categories.',
        'Synchronize local Android persistence (Room Database) seamlessly with a Spring Boot and SQL backend.',
      ],
      contribution: [
        'Architected and built the native Android application in Java using XML layouts, ViewBinding, and clean MVVM architecture.',
        'Implemented local offline-first persistence with Room Database (Entities, DAOs, ViewModels, and LiveData) paired with Retrofit REST API networking.',
        'Developed the RESTful backend using Spring Boot, Spring Security, Hibernate/JPA, and SQL.',
      ],
      implementedFeatures: [
        'Group creation and member onboarding workflow for roommates and shared households.',
        'Expense logging across household categories including rent, groceries, electricity, gas, and utilities.',
        'Automated bill splitting engine calculating individual shares and net member balances.',
        'Real-time balance settlement tracking with Room local storage and Spring Boot API sync.',
      ],
      technologies: [
        'Java',
        'Android Development',
        'XML',
        'MVVM',
        'LiveData',
        'Room Database',
        'Retrofit',
        'Spring Boot',
        'REST APIs',
        'SQL / MySQL',
        'Spring Security',
      ],
      architectureHighlights: [
        {
          layer: 'Android Presentation Layer',
          detail: 'XML Layouts + ViewBinding + ViewModel + LiveData following clean MVVM separation.',
        },
        {
          layer: 'Local & Network Data Layer',
          detail: 'Room Database for fast local caching paired with Retrofit HTTP client for REST sync.',
        },
        {
          layer: 'Backend API & Security',
          detail: 'Spring Boot REST controllers secured with Spring Security and persisted in SQL.',
        },
      ],
      githubUrl: 'https://github.com/Adityaraj811/khata-expence-manager',
      githubButtonLabel: 'View on GitHub',
      githubPlaceholderNote: 'github.com/Adityaraj811/khata-expence-manager',
      visualType: 'khata-android',
    },
    {
      id: 'apple-vision-ui-web',
      index: '03.',
      title: 'Apple Vision UI — Web Application',
      subtitle: 'Interactive Spatial Web Experience with GSAP, ScrollTrigger & HTML5 Canvas',
      status: 'Public Repository',
      statusNote: 'Verified Public Repository on github.com/Adityaraj811/Apple-Vision-ui-Web-application',
      domain: 'Web Application',
      overview:
        'Designed and developed a responsive, high-fidelity recreation of the Apple Vision Pro web application. Implemented smooth scroll-driven spatial animations using GSAP and ScrollTrigger alongside interactive HTML5 Canvas rendering.',
      objectives: [
        'Build an immersive, performance-optimized interactive web application showcasing modern frontend motion engineering.',
        'Synchronize multi-layered UI transitions and HTML5 Canvas sequences smoothly with user scroll position.',
        'Maintain crisp typography, high-contrast visual hierarchy, and responsive layout behavior.',
      ],
      contribution: [
        'Engineered the frontend architecture using semantic HTML5, modern CSS3 layouts, and modular JavaScript.',
        'Configured GSAP and ScrollTrigger timelines to orchestrate pinned section transitions and spatial reveals.',
        'Implemented interactive visual elements using the HTML5 Canvas API for fluid graphical playback.',
      ],
      implementedFeatures: [
        'Scroll-synchronized spatial animations powered by GSAP and ScrollTrigger.',
        'Interactive visual rendering and frame control built with the HTML5 Canvas API.',
        'Responsive high-contrast layout recreating the spatial computing showcase experience.',
      ],
      technologies: [
        'HTML5',
        'CSS3',
        'JavaScript',
        'GSAP',
        'ScrollTrigger',
        'HTML5 Canvas API',
        'Responsive Web Design',
      ],
      architectureHighlights: [
        {
          layer: 'Animation & Scroll Engine',
          detail: 'GSAP + ScrollTrigger timelines controlling pinned sections and scroll-linked transitions.',
        },
        {
          layer: 'Graphics & Canvas Layer',
          detail: 'HTML5 2D Canvas API rendering interactive high-resolution visual sequences.',
        },
        {
          layer: 'Responsive Layout Layer',
          detail: 'Semantic HTML5 and modern CSS3 architecture built for visual precision.',
        },
      ],
      githubUrl: 'https://github.com/Adityaraj811/Apple-Vision-ui-Web-application',
      githubButtonLabel: 'View on GitHub',
      githubPlaceholderNote: 'github.com/Adityaraj811/Apple-Vision-ui-Web-application',
      visualType: 'apple-vision-web',
    },
    {
      id: 'library-mitra',
      index: '04.',
      title: 'Library Mitra — Online Library Management Platform',
      subtitle: 'Digital Web Platform for Streamlined Library Cataloging & Member Access',
      status: 'Featured Platform',
      statusNote: 'Responsive Web Platform for Online Library Operations',
      domain: 'Web Application',
      overview:
        'A web platform designed to modernize library management and make book cataloging, availability lookup, and member workflows accessible online through a clean, responsive interface.',
      objectives: [
        'Digitize core library workflows so catalog information and library resources are accessible online.',
        'Provide a clean, responsive user interface that works reliably across desktop and mobile browsers.',
        'Organize book records, availability status, and member interactions through structured web interfaces.',
      ],
      contribution: [
        'Designed and implemented the responsive web frontend using semantic HTML5, modular CSS3, and interactive JavaScript.',
        'Structured user workflows for browsing library resources, viewing book details, and managing catalog entries.',
        'Focused on clean typography, intuitive navigation, and responsive layout behavior across screen sizes.',
      ],
      implementedFeatures: [
        'Structured online book catalog and category browsing interface.',
        'Clear presentation of library services, resource availability, and borrowing workflows.',
        'Responsive multi-device layout built with clean HTML5, CSS3, and JavaScript.',
      ],
      technologies: [
        'HTML5',
        'CSS3',
        'JavaScript',
        'Responsive Web Design',
        'Java',
        'SQL / MySQL',
      ],
      architectureHighlights: [
        {
          layer: 'Responsive Web Interface',
          detail: 'Semantic HTML5 markup styled with modern CSS Grid and Flexbox for desktop and mobile clarity.',
        },
        {
          layer: 'Interactive Client Logic',
          detail: 'Modular JavaScript handling catalog search filtering, UI state transitions, and validation.',
        },
        {
          layer: 'Structured Data Organization',
          detail: 'Relational data modeling principles applied to book inventory and member records.',
        },
      ],
      githubUrl: 'https://github.com/Adityaraj811',
      githubButtonLabel: 'GitHub Profile',
      githubPlaceholderNote: 'github.com/Adityaraj811',
      visualType: 'library-mitra-web',
    },
  ] as ProjectItem[],

  // --------------------------------------------------------------------------
  // 7. DEDICATED FREELANCE SERVICES PAGE DATA (8 SERVICES)
  // --------------------------------------------------------------------------
  freelanceSection: {
    pageHeadline: 'Websites & Applications Built for Your Ideas.',
    pageSubheading:
      'From business websites to modern landing pages and applications, I help turn ideas into practical digital experiences.',
    ctaHeadline: "Have a Project in Mind? Let's Build It.",
    ctaButtonLabel: 'Discuss Your Project',
    personalCommitmentNote:
      'You work directly with me—ensuring clean design, responsive layouts, reliable code, and clear communication from start to launch.',
    services: [
      {
        id: 'business-websites',
        index: '01.',
        title: 'Business Websites',
        tagline: 'Professional websites for shops, businesses and companies.',
        description:
          'Professional websites for shops, businesses and companies designed to showcase your offerings, establish credibility, and help customers reach you effortlessly.',
        deliverables: [
          'Modern multi-section layout tailored to your business',
          'Services showcase, location details & fast contact actions',
          'Mobile-friendly responsive design & SEO-ready structure',
        ],
        idealFor: 'Shops, cafés, local businesses, agencies & growing companies',
        inquiryTopic: 'Business Website Development',
        featuredDemoUrl: 'https://valoura-one.vercel.app/',
        featuredDemoTitle: 'Featured Demo — Veloura Café Website',
        featuredDemoBadge: 'Personal Showcase',
        mockupType: 'business',
      },
      {
        id: 'landing-pages',
        index: '02.',
        title: 'Landing Pages',
        tagline: 'Attractive landing pages for products, services, campaigns and startups.',
        description:
          'Attractive landing pages for products, services, campaigns and startups with clear visual hierarchy, smooth animations, and focused call-to-action sections.',
        deliverables: [
          'High-impact hero section & clear value proposition',
          'Interactive feature cards & conversion-focused CTAs',
          'Fast loading performance across mobile and desktop',
        ],
        idealFor: 'Product launches, marketing campaigns & service promotions',
        inquiryTopic: 'Landing Page Development',
        mockupType: 'landing',
      },
      {
        id: 'portfolio-websites',
        index: '03.',
        title: 'Personal Portfolio Websites',
        tagline: 'Professional portfolios for developers, students, freelancers and professionals.',
        description:
          'Professional portfolios for developers, students, freelancers and professionals to present projects, skills, resume, and contact links with a standout look.',
        deliverables: [
          'Custom project gallery & interactive skill showcase',
          'Resume download & social profile integration',
          'Clean, modern dark/light visual styling',
        ],
        idealFor: 'Developers, students, designers, freelancers & creators',
        inquiryTopic: 'Personal Portfolio Website',
        mockupType: 'portfolio',
      },
      {
        id: 'startup-websites',
        index: '04.',
        title: 'Startup Websites',
        tagline: 'Modern websites for new businesses and startup ideas.',
        description:
          'Modern websites for new businesses and startup ideas built with scalable component architecture, sleek visual polish, and clear product storytelling.',
        deliverables: [
          'Contemporary tech-inspired UI/UX & interactive previews',
          'Modular React / modern web frontend architecture',
          'Ready for fast cloud or static hosting deployment',
        ],
        idealFor: 'Early-stage founders, SaaS products & new ventures',
        inquiryTopic: 'Startup Website Development',
        mockupType: 'startup',
      },
      {
        id: 'professional-websites',
        index: '05.',
        title: 'Professional Websites',
        tagline: 'Custom websites designed around individual and business requirements.',
        description:
          'Custom websites designed around individual and business requirements—built from scratch with clean typography, structured content, and dependable performance.',
        deliverables: [
          'Tailored page structure built around your exact goals',
          'Accessible navigation & cross-browser compatibility',
          'Direct WhatsApp, email, and inquiry integration',
        ],
        idealFor: 'Consultants, doctors, educators, professionals & organizations',
        inquiryTopic: 'Custom Professional Website',
        mockupType: 'professional',
      },
      {
        id: 'web-applications',
        index: '06.',
        title: 'Web Applications',
        tagline: 'Interactive web applications with useful frontend and backend functionality.',
        description:
          'Interactive web applications with useful frontend and backend functionality—combining responsive interfaces with Java, Spring Boot REST APIs, and SQL databases.',
        deliverables: [
          'Dynamic frontend views & interactive user workflows',
          'REST API integration & structured database persistence',
          'Clean, maintainable full-stack code architecture',
        ],
        idealFor: 'Custom portals, management tools & interactive platforms',
        inquiryTopic: 'Web Application Development',
        mockupType: 'webapp',
      },
      {
        id: 'website-redesign',
        index: '07.',
        title: 'Website Redesign',
        tagline: 'Modernize outdated websites with improved UI/UX and responsive layouts.',
        description:
          'Modernize outdated websites with improved UI/UX and responsive layouts—transforming slow or cluttered pages into a fresh, mobile-first digital presence.',
        deliverables: [
          'Complete visual UI/UX overhaul & modern typography',
          'Mobile & tablet responsiveness upgrade',
          'Cleaner navigation flow & faster page performance',
        ],
        idealFor: 'Existing websites needing a modern visual & mobile upgrade',
        inquiryTopic: 'Website Redesign Project',
        mockupType: 'redesign',
      },
      {
        id: 'android-applications',
        index: '08.',
        title: 'Android Applications',
        tagline: 'Functional Android applications with clean interfaces and practical features.',
        description:
          'Functional Android applications with clean interfaces and practical features—built in Java using XML layouts, MVVM architecture, Room Database, and REST API connectivity.',
        deliverables: [
          'Native Android UI with XML layouts & Material components',
          'Structured MVVM architecture with Room local storage',
          'Backend API connectivity via Retrofit & Spring Boot',
        ],
        idealFor: 'Mobile app ideas, utility apps & business companion apps',
        inquiryTopic: 'Android Application Development',
        mockupType: 'android',
      },
    ] as FreelanceServiceItem[],
  },

  // --------------------------------------------------------------------------
  // 8. EDUCATION, INTERNSHIP & CERTIFICATIONS (FROM OFFICIAL UPDATED CV)
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
      'Focused on software engineering fundamentals, Object-Oriented Programming in Java, Database Management Systems (DBMS), Operating Systems, Computer Networks, and modern web & mobile application development.',
    academicTimeline: [
      {
        level: 'UNDERGRADUATE DEGREE',
        degreeOrClass: 'B.Tech, Computer Science & Engineering',
        institution: 'Technocrats Institute of Technology, Bhopal',
        boardOrUniversity: 'RGPV, Bhopal',
        duration: '2022 – 2026',
        score: 'CGPA: 7.0',
      },
      {
        level: 'HIGHER SECONDARY (CLASS XII)',
        degreeOrClass: 'Class XII (Senior Secondary)',
        institution: 'S.B.S +2 H/S, Purani Bazar, Lakhisarai, Bihar',
        boardOrUniversity: 'BSEB',
        duration: '2021 – 2022',
        score: '71%',
      },
      {
        level: 'SECONDARY SCHOOL (CLASS X)',
        degreeOrClass: 'Class X (Secondary)',
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
        'Worked on Android application development and strengthened practical skills in Java and Android development.',
    },
    certifications: [
      {
        title: 'Oracle Cloud Infrastructure 2025 Certified Generative AI Professional',
        issuer: 'Oracle',
        date: 'Oct 2025',
        validity: 'Valid till Oct 2027',
        credentialUrl:
          'https://catalog-education.oracle.com/ords/certview/sharebadge?id=82A0B86C62BB5D96E0616E29D374D61BCAE946DBD0848398B7405F9A0C811B33',
        credentialLabel: 'Verify Credential',
        description:
          'Official Oracle Cloud Infrastructure (OCI) certification demonstrating expertise in Generative AI models, OCI AI services, and cloud AI architecture.',
      },
      {
        title: 'Web Development Course',
        issuer: 'Rinex (in association with E-Cell, IIT Bhubaneswar)',
        date: 'Dec 2025 – Jan 2026',
        description:
          'Completed structured training in modern web development, responsive frontend architecture, and practical web engineering.',
      },
    ] as CertificationItem[],
    achievements: [
      'Solved 400+ coding problems across competitive and algorithmic practice platforms.',
    ],
    coreCoursework: [
      'Object-Oriented Programming (Java)',
      'Data Structures & Algorithms',
      'Database Management Systems (SQL / MySQL)',
      'Operating Systems & Linux Environment',
      'Computer Networks & HTTP Protocols',
      'Software Engineering & Application Architecture',
    ],
  },
};
