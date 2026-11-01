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
  status: 'Completed Application' | 'Featured Platform' | 'Public Repository' | 'In Development' | 'Team Project';
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
  visualType: 'veloura-cafe-web' | 'khata-android' | 'apple-vision-web' | 'krishi-mitra-web';
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
    professionalHeadline: 'Java Backend Developer | Web & Android Developer',
    roleTriad: 'Java Backend Systems · Android Applications · Modern Web Interfaces',
    heroGreeting: "Hi, I'm Aditya Raj.",
    heroDisplayTitle: 'Java Backend, Web & Android Developer',
    heroDescription:
      'Developer focused on Java backend engineering, with hands-on project experience building Android applications using Java/XML, backend services using Spring Boot, REST APIs, JPA/Hibernate, and SQL, and responsive web interfaces.',
    availabilityBanner:
      'Open to Java Backend, Android & Software Developer Opportunities & Selected Freelance Projects',

    // Profile image: Uses actual portrait resolved via import.meta.env.BASE_URL
    profileImagePath: resolvePublicAsset('images/profile.webp'),
    profileFallbackSvg: resolvePublicAsset('images/profile-placeholder.svg'),

    // Resume file configuration:
    // Uses the updated CV PDF at /assets/aistudio/Aditya_Raj_CV__2__345c35da.pdf
    resumePdfPath: resolvePublicAsset('assets/aistudio/Aditya_Raj_CV__2__345c35da.pdf'),
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
      name: 'khata-expence-manager',
      url: 'https://github.com/Adityaraj811/khata-expence-manager',
      description:
        'KHATA – Shared Expense Management App built for household groups to record shared expenses, split costs, track member balances, and manage settlements.',
      category: 'Java · Android XML · MVVM · Room · Retrofit · Spring Boot · MySQL',
    },
    {
      name: 'caffetaria',
      url: 'https://github.com/Adityaraj811/caffetaria',
      description:
        'Valoura (Veloura) – Live Website: Deployed to production on Vercel with source-code versioning and deployment workflow managed using Git and GitHub.',
      category: 'React · TypeScript · Vite · Motion · Vercel',
    },
    {
      name: 'Apple-Vision-ui-Web-application',
      url: 'https://github.com/Adityaraj811/Apple-Vision-ui-Web-application',
      description:
        'Responsive Apple Vision Pro-inspired spatial web interface with scroll-driven GSAP/ScrollTrigger animations, 3D scenes, and interactive Canvas visuals.',
      category: 'HTML5 · CSS3 · JavaScript · React 19 · GSAP · ScrollTrigger · Canvas API',
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
      title: 'Responsive Web Interfaces',
      summary:
        'Crafting modern web interfaces, PWAs, and interactive animations using HTML5, CSS3, React, TypeScript, GSAP, ScrollTrigger, and Canvas API.',
      technologies: 'HTML5 · CSS3 · JavaScript · React · TypeScript · GSAP · Canvas API',
    },
  ],

  // --------------------------------------------------------------------------
  // 4. COMPACT ABOUT SECTION & DUAL AUDIENCE CARDS
  // --------------------------------------------------------------------------
  about: {
    sectionTitle: 'Java Backend Engineering, Android Apps & Responsive Web Interfaces',
    shortIntro:
      'Developer focused on Java backend engineering, with hands-on project experience building Android applications using Java/XML and backend services using Spring Boot, REST APIs, JPA/Hibernate, and SQL. Also experienced in responsive web interfaces, object-oriented programming, and data structures and algorithms; solved 400+ coding problems across online platforms.',
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
      'SQL',
      'Spring Boot',
      'Spring Security',
      'REST APIs',
      'JDBC',
      'Hibernate & JPA',
      'Core Java & OOP',
      'DSA',
      'Android (Java)',
      'XML Layouts',
      'MVVM · ViewModel · LiveData',
      'Room & Retrofit',
      'HTML5 & CSS3',
      'React & TypeScript',
      'GSAP & ScrollTrigger',
      'Canvas API',
      'MySQL & PostgreSQL',
      'Git & GitHub',
      'Postman',
      'Android Studio & VS Code',
      'Linux/Ubuntu',
      'Maven & Gradle',
    ],
    recruiterCard: {
      title: 'FOR SOFTWARE RECRUITERS',
      description:
        'Open to Java Backend Developer, Android Developer, and Software Engineer opportunities. Hands-on experience with Java, Spring Boot, REST APIs, JPA/Hibernate, SQL, Android MVVM, and 400+ solved coding problems.',
    },
    freelanceCard: {
      title: 'FOR FREELANCE CLIENTS',
      description:
        'Need a modern website or application for your business or idea? Explore my development services.',
      buttonText: 'Explore Services →',
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
          name: 'JavaScript',
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
          context: 'Source-code versioning, team collaboration, and production Vercel/GitHub deployments',
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
  // 6. SELECTED PROJECTS (MATCHING UPDATED CV — LIBRARY MITRA REMOVED, KRISHIMITRA ADDED)
  // --------------------------------------------------------------------------
  projects: [
    {
      id: 'veloura-specialty-coffee',
      index: '01.',
      title: 'Veloura – Specialty Coffee & Creative Sanctuary',
      subtitle: 'Valoura Live Website · Deployed on Vercel with Git & GitHub Workflow',
      status: 'Completed Application',
      statusNote:
        'Deployed web project to production on Vercel and managed its source-code versioning and deployment workflow using Git and GitHub.',
      domain: 'Website Design & Development',
      overview:
        'A premium, responsive specialty coffee and creative sanctuary website deployed to production on Vercel, featuring interactive UI screens, specialty coffee photography, smooth animations, and complete Git/GitHub source-code versioning and deployment workflow.',
      objectives: [
        'Deploy a production-ready responsive web project on Vercel with structured Git and GitHub version control.',
        'Deliver fluid, scroll-responsive animations and interactive café experiences using React, TypeScript, Vite, and Motion.',
        'Ensure responsive layout precision, fast asset delivery, and seamless visual hierarchy across mobile, tablet, and desktop devices.',
      ],
      contribution: [
        'Deployed the web project to production on Vercel and managed its source-code versioning and deployment workflow using Git and GitHub.',
        'Designed and developed the frontend interface using React, TypeScript, and Vite with modular, reusable UI components.',
        'Implemented interactive showcase screens, menu filtering, and atmospheric visual storytelling using Motion.',
      ],
      implementedFeatures: [
        'Production Vercel deployment with continuous Git and GitHub source-code versioning workflow.',
        'Interactive Sanctuary espresso simulator, Alchemy Menu tray, Coffee Lab cards, and Courtyard Ritual preview.',
        'Fully responsive frontend design tailored for mobile phones, tablets, and desktop screens.',
      ],
      technologies: ['React', 'TypeScript', 'Vite', 'Motion', 'Git', 'GitHub', 'Vercel'],
      architectureHighlights: [
        {
          layer: 'Production Deployment & Git Workflow',
          detail: 'Deployed to production on Vercel with source-code versioning and release management via Git and GitHub.',
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
      githubUrl: 'https://github.com/Adityaraj811/caffetaria',
      githubButtonLabel: 'View Source Code',
      githubPlaceholderNote: 'github.com/Adityaraj811/caffetaria',
      liveDemoUrl: 'https://valoura-one.vercel.app/',
      visualType: 'veloura-cafe-web',
    },
    {
      id: 'khata-expense-app',
      index: '02.',
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
      githubUrl: 'https://github.com/Adityaraj811/khata-expence-manager',
      githubButtonLabel: 'View on GitHub',
      githubPlaceholderNote: 'github.com/Adityaraj811/khata-expence-manager',
      visualType: 'khata-android',
    },
    {
      id: 'apple-vision-ui-web',
      index: '03.',
      title: 'Apple Vision UI — Interactive Spatial Web Application',
      subtitle:
        'Responsive Apple Vision Pro-Inspired Web Interface · GSAP, ScrollTrigger & Canvas API',
      status: 'Public Repository',
      statusNote:
        'Built a responsive Apple Vision Pro-inspired web interface with scroll-driven animations and interactive Canvas visuals.',
      domain: 'Web Application',
      overview:
        'Built a responsive Apple Vision Pro-inspired spatial web interface featuring scroll-driven animations, interactive HTML5 Canvas visuals, 3D scenes, customizable visual themes, and hardware technology visualizers.',
      objectives: [
        'Build a responsive Apple Vision Pro-inspired web interface with smooth scroll-driven GSAP and ScrollTrigger animations.',
        'Render 360° hardware frame scrubbing, optical stack layers, and real-time sensor visualizers via HTML5 Canvas API and Three.js.',
        'Support customizable visionOS themes, adaptive dark/light mode, and responsive multi-device layouts.',
      ],
      contribution: [
        'Built a responsive Apple Vision Pro-inspired web interface with scroll-driven animations and interactive Canvas visuals.',
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
        'JavaScript',
        'React 19',
        'TypeScript',
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
      githubButtonLabel: 'View Source Code',
      githubPlaceholderNote: 'github.com/Adityaraj811/Apple-Vision-ui-Web-application',
      visualType: 'apple-vision-web',
    },
    {
      id: 'krishi-mitra-ai',
      index: '04.',
      title: 'KrishiMitra – AI-Based Crop Recommendation System',
      subtitle: 'Team Project · ML Crop Recommendation Platform & Multilingual PWA',
      status: 'Team Project',
      statusNote:
        'Four-member team project evaluating 22 machine-learning algorithms (Extra Trees selected) with a multilingual PWA interface and agriculture economics dashboard.',
      domain: 'Web Application',
      overview:
        'Collaborated in a four-member team to build an AI-based crop recommendation platform; evaluated 22 machine-learning algorithms and selected Extra Trees based on accuracy and inference latency, paired with a multilingual PWA interface featuring offline fallback content and an agriculture economics dashboard.',
      objectives: [
        'Benchmark 22 machine-learning classification algorithms on soil and climate features to select the optimal crop recommendation model based on accuracy and inference latency.',
        'Deliver a multilingual Progressive Web App (PWA) with offline fallback content so farmers and users can access recommendations reliably in low-connectivity regions.',
        'Provide an interactive agriculture economics dashboard for analyzing yield potential, input costs, and crop profitability.',
      ],
      contribution: [
        'Collaborated in a four-member team to build a crop recommendation platform; evaluated 22 machine-learning algorithms and selected Extra Trees based on accuracy and inference latency.',
        'Developed a multilingual PWA interface with offline fallback content and an agriculture economics dashboard using React and TypeScript.',
        'Integrated Java and Python (Scikit-learn) model inference pipelines with structured soil (N-P-K, pH) and weather parameter inputs.',
      ],
      implementedFeatures: [
        'Extra Trees ML crop recommendation engine selected after benchmarking 22 algorithms for accuracy and low inference latency.',
        'Multilingual PWA interface with service-worker offline fallback content for rural connectivity.',
        'Interactive agriculture economics dashboard displaying estimated yield, cultivation cost, and market return insights.',
      ],
      technologies: [
        'Java',
        'Python',
        'Scikit-learn',
        'React',
        'TypeScript',
        'PWA',
      ],
      architectureHighlights: [
        {
          layer: 'ML Evaluation & Extra Trees Engine',
          detail: 'Evaluated 22 Scikit-learn machine-learning models and selected Extra Trees for optimal accuracy and fast inference latency.',
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
      githubPlaceholderNote: 'github.com/Adityaraj811 · Team Project',
      visualType: 'krishi-mitra-web',
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
};

