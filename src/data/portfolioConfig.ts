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
  status: 'In Development' | 'Featured Platform' | 'Public Repository';
  statusNote: string;
  domain: 'Android & Backend' | 'Web Platform';
  overview: string;
  objectives: string[];
  contribution: string[];
  implementedFeatures: string[];
  ongoingOrPlannedFeatures?: string[];
  technologies: string[];
  architectureHighlights: {
    layer: string;
    detail: string;
  }[];
  githubUrl: string;
  githubButtonLabel: string;
  githubPlaceholderNote: string;
  liveDemoUrl?: string;
  visualType: 'khata-android' | 'library-mitra-web' | 'apple-vision-web';
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
    // Exact professional headline requested
    professionalHeadline: 'Web & App Developer | Java Backend Developer',
    roleTriad: 'Web Developer · Android App Developer · Java Backend Developer',
    heroGreeting: "Hi, I'm Aditya Raj.",
    heroDisplayTitle: 'Building Digital Experiences Through Code.',
    heroDescription:
      'Web & App Developer passionate about Java, backend engineering, and building practical digital solutions.',
    professionalIntroduction:
      'I am a developer passionate about building modern web applications, Android applications, and scalable backend systems. I enjoy solving problems through programming and transforming ideas into practical digital products. My primary focus is Java, backend development, and application development.',
    availabilityBanner:
      'Open to Software Engineering Roles & Selected Freelance Web Projects',
    careerAvailabilityText: 'Open to Work · Software Developer & Backend / Android Engineering Roles',
    freelanceAvailabilityText: 'Available for Part-Time Freelance Web Development Projects',

    // Profile image: Uses optimized 35KB WebP portrait resolved via import.meta.env.BASE_URL
    profileImagePath: resolvePublicAsset('images/profile.webp'),
    profileFallbackSvg: resolvePublicAsset('images/profile-placeholder.svg'),

    // Resume file configuration:
    // Uses actual uploaded CV at /public/resume.pdf resolved via import.meta.env.BASE_URL
    // for seamless local development and GitHub Pages compatibility.
    resumePdfPath: `${import.meta.env.BASE_URL}resume.pdf`,
    resumePreviewImagePath: resolvePublicAsset('images/resume-preview.webp'),
    resumeDownloadFilename: 'Aditya_Raj_CV.pdf',
    hasResumePdf: true,

    // Downloadable Source Code Archive path (resolved with import.meta.env.BASE_URL)
    sourceZipPath: resolvePublicAsset('aditya-raj-portfolio.zip'),

    // Verified LinkedIn Profile
    linkedinUrl: 'https://www.linkedin.com/in/aditya-raj-523b15265/',
    linkedinHandle: 'linkedin.com/in/aditya-raj-523b15265',

    // Verified GitHub Profile (https://github.com/Adityaraj811)
    githubUsername: 'Adityaraj811',
    githubUrl: 'https://github.com/Adityaraj811',
    isGithubConfigured: true,

    // Verified Instagram Profile
    instagramUrl: 'https://www.instagram.com/_.adityarajsingh?cplk=aDZhd2hzc3RjZG4w',
    instagramHandle: '@_.adityarajsingh',

    // Verified Mobile & WhatsApp Contact (Editable anytime in this file)
    mobileNumber: '+91 9263605950',
    whatsappNumber: '919263605950',
    whatsappDisplay: '+91 9263605950',
    whatsappDirectUrl: 'https://wa.me/919263605950',
    isWhatsappConfigured: true,

    // Verified Email Address (Editable anytime in this file)
    emailAddress: 'adityaraj81156@gmail.com',
    isEmailConfigured: true,

    location: 'India · Open to Remote & On-Site Opportunities',
  },

  // --------------------------------------------------------------------------
  // 2. VERIFIED PUBLIC GITHUB REPOSITORIES (https://github.com/Adityaraj811)
  // --------------------------------------------------------------------------
  verifiedGithubRepos: [
    {
      name: 'khata-expence-manager',
      url: 'https://github.com/Adityaraj811/khata-expence-manager',
      description:
        'KHATA — Shared Expense Management application designed to help roommates and flatmates manage shared household expenses, split bills, and track member settlements (In Active Development).',
      category: 'Java · Android MVVM · Room · Retrofit · Spring Boot',
    },
    {
      name: 'Apple-Vision-ui-Web-application',
      url: 'https://github.com/Adityaraj811/Apple-Vision-ui-Web-application',
      description:
        'Designed and developed a responsive, high-fidelity recreation of the Apple Vision Pro website. Implemented advanced spatial animations using GSAP and ScrollTrigger, and created interactive visual elements with the Canvas API.',
      category: 'Interactive Web UI · GSAP · ScrollTrigger · HTML5 Canvas',
    },
    {
      name: 'Aditya-demo',
      url: 'https://github.com/Adityaraj811/Aditya-demo',
      description:
        'Initial Git and GitHub version-control workflow repository setup and repository management practice.',
      category: 'Git & GitHub Version Control',
    },
  ] as PublicGithubRepo[],

  // --------------------------------------------------------------------------
  // 3. THREE CORE ENGINEERING PILLARS
  // --------------------------------------------------------------------------
  corePillars: [
    {
      index: '01.',
      title: 'Web Development',
      summary:
        'Designing and building responsive, semantic, and fast web interfaces with modern HTML5, CSS3, and JavaScript.',
      technologies: 'HTML5 · CSS3 · JavaScript · Responsive Web Design',
    },
    {
      index: '02.',
      title: 'Android Application Development',
      summary:
        'Developing structured native Android applications in Java using MVVM architecture, Room persistence, and Retrofit networking.',
      technologies: 'Java · XML Layouts · MVVM · Room · Retrofit · LiveData',
    },
    {
      index: '03.',
      title: 'Java Backend Development',
      summary:
        'Engineering clean relational databases, RESTful APIs, and secure server-side architectures with Java and Spring Boot.',
      technologies: 'Core Java · Spring Boot · REST APIs · JPA / Hibernate · MySQL',
    },
  ],

  // --------------------------------------------------------------------------
  // 4. ABOUT ME NARRATIVE
  // --------------------------------------------------------------------------
  about: {
    sectionTitle: 'Engineering Practical Software with Clean Architecture',
    leadParagraph:
      'I am a Computer Science and Engineering undergraduate focused on turning real-world requirements into dependable web applications, native Android apps, and Java backend services.',
    bodyParagraphs: [
      'My technical journey began with Core Java and Object-Oriented Programming, where I developed an appreciation for structured code, strong typing, and clear separation of concerns. From writing foundational algorithms and JDBC database queries, I expanded into building full RESTful backend systems using Spring Boot, Hibernate/JPA, Spring Security, and MySQL.',
      'To bring backend systems to life for end users, I build across both web and mobile platforms. On Android, I use Java, XML layouts, and the MVVM pattern (ViewModel, LiveData, ViewBinding, Room Database, and Retrofit) to craft responsive apps like KHATA. On the web, I build clean, accessible, and responsive websites that work smoothly across desktop and mobile devices.',
      'Whether collaborating with a software engineering team on backend and application architecture or helping a client launch a modern website part-time, I prioritize code readability, honest engineering, and practical user value.',
    ],
    focusAreas: [
      {
        label: 'Primary Language & Ecosystem',
        value: 'Java, Spring Boot & SQL',
      },
      {
        label: 'Application Layers',
        value: 'Responsive Web UI · Android (Java/MVVM) · RESTful Backend',
      },
      {
        label: 'Engineering Principles',
        value: 'OOP Fundamentals · Clean Code · Relational Data Modeling',
      },
      {
        label: 'Current Pursuits',
        value: 'Software Engineering Opportunities & Part-Time Freelance Web Projects',
      },
    ],
  },

  // --------------------------------------------------------------------------
  // 5. TECHNICAL SKILLS (6 CATEGORIES — NO FAKE PERCENTAGES)
  // --------------------------------------------------------------------------
  skillCategories: [
    {
      id: 'programming',
      index: '01.',
      title: 'Programming Languages',
      subtitle: 'Core languages used for problem-solving, backend logic, and client interactivity',
      skills: [
        {
          name: 'Java',
          category: 'Programming',
          context: 'Primary language for backend systems, OOP, and Android development',
          iconKey: 'java',
        },
        {
          name: 'SQL',
          category: 'Programming',
          context: 'Relational queries, schema design, joins, and data manipulation',
          iconKey: 'sql',
        },
        {
          name: 'JavaScript',
          category: 'Programming',
          context: 'DOM manipulation, asynchronous logic, and interactive web applications',
          iconKey: 'javascript',
        },
      ],
    },
    {
      id: 'backend',
      index: '02.',
      title: 'Backend Development',
      subtitle: 'Java server-side frameworks, ORM persistence, and secure API design',
      skills: [
        {
          name: 'Core Java',
          category: 'Backend',
          context: 'OOP principles, collections framework, exception handling, and streams',
          iconKey: 'java',
        },
        {
          name: 'Spring',
          category: 'Backend',
          context: 'Dependency injection, Inversion of Control (IoC), and modular configuration',
          iconKey: 'spring',
        },
        {
          name: 'Spring Boot',
          category: 'Backend',
          context: 'Rapid production-ready backend services and layered REST controllers',
          iconKey: 'springboot',
        },
        {
          name: 'REST APIs',
          category: 'Backend',
          context: 'Resource-oriented HTTP endpoints, JSON serialization, and status handling',
          iconKey: 'api',
        },
        {
          name: 'JDBC',
          category: 'Backend',
          context: 'Direct relational database connectivity and prepared statements',
          iconKey: 'jdbc',
        },
        {
          name: 'Hibernate',
          category: 'Backend',
          context: 'Object-Relational Mapping (ORM) and entity lifecycle management',
          iconKey: 'hibernate',
        },
        {
          name: 'JPA',
          category: 'Backend',
          context: 'Jakarta Persistence API specification and repository abstractions',
          iconKey: 'jpa',
        },
        {
          name: 'Spring Security',
          category: 'Backend',
          context: 'Authentication flows, authorization rules, and endpoint protection',
          iconKey: 'security',
        },
      ],
    },
    {
      id: 'web',
      index: '03.',
      title: 'Web Development',
      subtitle: 'Frontend standards for modern, accessible, and mobile-first websites',
      skills: [
        {
          name: 'HTML5',
          category: 'Web Development',
          context: 'Semantic document structure, accessibility attributes, and SEO markup',
          iconKey: 'html',
        },
        {
          name: 'CSS3',
          category: 'Web Development',
          context: 'Flexbox, CSS Grid, custom properties, transitions, and modular styling',
          iconKey: 'css',
        },
        {
          name: 'JavaScript',
          category: 'Web Development',
          context: 'Interactive UI components, dynamic state updates, and API integration',
          iconKey: 'javascript',
        },
        {
          name: 'Responsive Web Design',
          category: 'Web Development',
          context: 'Fluid layouts adapting cleanly across desktop, tablet, and mobile viewports',
          iconKey: 'responsive',
        },
      ],
    },
    {
      id: 'android',
      index: '04.',
      title: 'Android Development',
      subtitle: 'Native Android engineering with Java and Jetpack architectural components',
      skills: [
        {
          name: 'Android Development using Java',
          category: 'Android',
          context: 'Activities, Fragments, intents, lifecycle management, and native UI',
          iconKey: 'android',
        },
        {
          name: 'XML Layouts',
          category: 'Android',
          context: 'ConstraintLayout, RecyclerView item templates, and Material UI components',
          iconKey: 'xml',
        },
        {
          name: 'MVVM Architecture',
          category: 'Android',
          context: 'Clean separation between UI controllers, ViewModels, and data repositories',
          iconKey: 'mvvm',
        },
        {
          name: 'ViewModel',
          category: 'Android',
          context: 'Lifecycle-aware state holders surviving configuration changes',
          iconKey: 'viewmodel',
        },
        {
          name: 'LiveData',
          category: 'Android',
          context: 'Observable data holders for reactive UI updates',
          iconKey: 'livedata',
        },
        {
          name: 'ViewBinding',
          category: 'Android',
          context: 'Type-safe, null-safe view references replacing findViewById',
          iconKey: 'viewbinding',
        },
        {
          name: 'Room Database',
          category: 'Android',
          context: 'Local SQLite abstraction with DAOs and offline data persistence',
          iconKey: 'room',
        },
        {
          name: 'Retrofit',
          category: 'Android',
          context: 'Type-safe HTTP client for connecting Android apps to Spring Boot REST APIs',
          iconKey: 'retrofit',
        },
      ],
    },
    {
      id: 'database',
      index: '05.',
      title: 'Databases',
      subtitle: 'Server-side relational storage and local on-device persistence',
      skills: [
        {
          name: 'MySQL',
          category: 'Database',
          context: 'Relational database design, indexing, foreign keys, and Spring Boot integration',
          iconKey: 'mysql',
        },
        {
          name: 'Room Database',
          category: 'Database',
          context: 'Structured local SQLite persistence for offline-capable Android applications',
          iconKey: 'room',
        },
      ],
    },
    {
      id: 'tools',
      index: '06.',
      title: 'Developer Tools',
      subtitle: 'Version control, API inspection, development environments, and OS workflow',
      skills: [
        {
          name: 'Git',
          category: 'Tools',
          context: 'Distributed version control, branching workflows, and commit hygiene',
          iconKey: 'git',
        },
        {
          name: 'GitHub',
          category: 'Tools',
          context: 'Source code hosting, repository documentation, and static deployment',
          iconKey: 'github',
        },
        {
          name: 'Visual Studio Code',
          category: 'Tools',
          context: 'Primary code editor for web development, configuration, and scripting',
          iconKey: 'vscode',
        },
        {
          name: 'Postman',
          category: 'Tools',
          context: 'REST API endpoint testing, request collections, and payload inspection',
          iconKey: 'postman',
        },
        {
          name: 'Linux / Ubuntu',
          category: 'Tools',
          context: 'Command-line workflow, package management, and development environment',
          iconKey: 'linux',
        },
      ],
    },
  ] as SkillCategory[],

  // --------------------------------------------------------------------------
  // 6. FEATURED PROJECTS (ONLY ACTUAL PROJECTS — NO GENERIC TOPIC CARDS)
  // --------------------------------------------------------------------------
  projects: [
    {
      id: 'khata-expense-app',
      index: '01.',
      title: 'KHATA — Shared Expense Management App',
      subtitle: 'Android Application & Spring Boot Backend for Roommates and Flatmates',
      status: 'In Development',
      statusNote:
        'Active Ongoing Project — Core Android MVVM architecture, Room persistence, and backend REST API integration are currently in active development. Planned reporting and reminder modules are clearly separated below.',
      domain: 'Android & Backend',
      overview:
        'KHATA is an Android application designed to help roommates and flatmates transparently manage their shared living expenses—eliminating manual spreadsheet tracking and confusion over split bills.',
      objectives: [
        'Simplify shared living finances by allowing roommates to form dedicated household groups.',
        'Provide accurate expense splitting and individual contribution calculations across recurring household categories.',
        'Maintain reliable synchronization between local Android storage (Room) and a secure Spring Boot + MySQL backend.',
      ],
      contribution: [
        'Designing and developing the native Android client in Java using XML layouts, ViewBinding, and MVVM architecture.',
        'Structuring local persistence with Room Database (Entities, DAOs, ViewModels, and LiveData) alongside Retrofit API service interfaces.',
        'Building the companion RESTful backend using Spring Boot, Spring Security, JPA/Hibernate, and MySQL.',
      ],
      implementedFeatures: [
        'Group creation and joining workflow for flatmates and roommates.',
        'Add and manage shared household expenses across categories (rent, groceries, electricity, gas, petrol, and entertainment).',
        'Split expenses between group members and calculate individual contributions.',
        'Track member payments and balance settlements.',
      ],
      ongoingOrPlannedFeatures: [
        'Monthly expense summary reports (In Progress / Planned).',
        'PDF report export for household records (Planned).',
        'Optional bill payment reminders and notifications (Planned).',
      ],
      technologies: [
        'Java',
        'Android Development',
        'XML',
        'MVVM Architecture',
        'Room Database',
        'Retrofit',
        'Spring Boot',
        'REST APIs',
        'MySQL',
        'Spring Security',
      ],
      architectureHighlights: [
        {
          layer: 'Android Presentation Layer',
          detail: 'XML Layouts + ViewBinding + ViewModel + LiveData following clean MVVM separation.',
        },
        {
          layer: 'Local & Network Data Layer',
          detail: 'Room Database for local caching paired with Retrofit HTTP client for REST communication.',
        },
        {
          layer: 'Backend API & Security',
          detail: 'Spring Boot REST controllers secured with Spring Security and persisted in MySQL.',
        },
      ],
      githubUrl: 'https://github.com/Adityaraj811/khata-expence-manager',
      githubButtonLabel: 'View Repository on GitHub',
      githubPlaceholderNote: 'github.com/Adityaraj811/khata-expence-manager · In Development',
      visualType: 'khata-android',
    },
    {
      id: 'library-mitra',
      index: '02.',
      title: 'Library Mitra — Online Library Management Platform',
      subtitle: 'Digital Platform for Streamlined Library Operations & Online Access',
      status: 'Featured Platform',
      statusNote: 'Online Library Management Platform',
      domain: 'Web Platform',
      overview:
        'A platform designed to improve library management and make library services accessible online—bridging traditional book cataloging with a clean digital interface for students and administrators.',
      objectives: [
        'Digitize core library workflows so catalog information and library resources are accessible online.',
        'Provide a clean, responsive user interface that works reliably across desktop and mobile browsers.',
        'Organize book records, availability status, and member interactions through structured web interfaces.',
      ],
      contribution: [
        'Designed and implemented the responsive web frontend using semantic HTML5, modular CSS3, and interactive JavaScript.',
        'Structured the user workflows for browsing library resources, viewing book details, and managing catalog entries.',
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
        'Java / Backend Integration',
        'SQL / MySQL',
      ],
      architectureHighlights: [
        {
          layer: 'Responsive Web Interface',
          detail: 'Semantic HTML5 markup styled with modern CSS Grid/Flexbox for desktop and mobile clarity.',
        },
        {
          layer: 'Interactive Client Logic',
          detail: 'Modular JavaScript handling catalog search filtering, UI state transitions, and form validation.',
        },
        {
          layer: 'Structured Data Organization',
          detail: 'Relational data modeling principles applied to book inventory and member records.',
        },
      ],
      githubUrl: 'https://github.com/Adityaraj811',
      githubButtonLabel: 'GitHub Profile (@Adityaraj811)',
      githubPlaceholderNote: 'Verified GitHub account: github.com/Adityaraj811',
      liveDemoUrl: '',
      visualType: 'library-mitra-web',
    },
    {
      id: 'apple-vision-ui-web',
      index: '03.',
      title: 'Apple Vision UI — Interactive Spatial Web Application',
      subtitle: 'High-Fidelity Web Experience with GSAP, ScrollTrigger & HTML5 Canvas',
      status: 'Public Repository',
      statusNote: 'Verified Public Repository on github.com/Adityaraj811/Apple-Vision-ui-Web-application',
      domain: 'Web Platform',
      overview:
        'Designed and developed a responsive, high-fidelity recreation of the Apple Vision Pro web experience. Implemented advanced scroll-driven spatial animations using GSAP and ScrollTrigger alongside interactive HTML5 Canvas rendering.',
      objectives: [
        'Build an engaging, performance-driven interactive web application demonstrating modern frontend animation engineering.',
        'Synchronize multi-layered visual elements and HTML5 Canvas frame sequences smoothly with user scroll position.',
        'Ensure responsive layout integrity and smooth rendering across desktop and laptop viewports.',
      ],
      contribution: [
        'Engineered the complete frontend structure using semantic HTML5, modern CSS3 layouts, and modular JavaScript.',
        'Configured GSAP and ScrollTrigger timelines to orchestrate pinned section transitions and spatial UI reveals.',
        'Implemented interactive visual elements using the HTML5 Canvas API for fluid graphical playback.',
      ],
      implementedFeatures: [
        'Scroll-synchronized spatial animations powered by GSAP and ScrollTrigger.',
        'Interactive visual rendering and frame control built with the HTML5 Canvas API.',
        'Responsive, high-contrast UI layout recreating the Apple Vision Pro showcase experience.',
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
      githubButtonLabel: 'View Repository on GitHub',
      githubPlaceholderNote: 'github.com/Adityaraj811/Apple-Vision-ui-Web-application',
      visualType: 'apple-vision-web',
    },
  ] as ProjectItem[],

  // --------------------------------------------------------------------------
  // 6B. JAVA & BACKEND ENGINEERING FOCUS (DEDICATED ARCHITECTURE SECTION)
  // --------------------------------------------------------------------------
  javaBackendFocus: {
    sectionKicker: 'CORE ENGINEERING SPECIALIZATION',
    sectionTitle: 'Java Programming & Backend Architecture Focus',
    sectionSubtitle:
      'Alongside my featured applications, my primary engineering focus is mastering Java backend development, relational database systems, and algorithmic problem-solving.',
    corePillars: [
      {
        index: '01.',
        title: 'Object-Oriented Programming & Core Java',
        description:
          'Strong command of encapsulation, inheritance, polymorphism, abstraction, Java Collections Framework, exception handling, and clean modular code structure.',
        tags: 'Core Java · OOP · Collections · Exception Handling',
      },
      {
        index: '02.',
        title: 'Spring Boot & REST API Development',
        description:
          'Designing layered backend architectures (Controller → Service → Repository), building RESTful JSON endpoints, and securing APIs with Spring Security.',
        tags: 'Spring · Spring Boot · REST APIs · Spring Security',
      },
      {
        index: '03.',
        title: 'Database Connectivity & ORM Persistence',
        description:
          'Relational schema design in MySQL, writing SQL queries, low-level database connectivity via JDBC, and Object-Relational Mapping with Hibernate and JPA.',
        tags: 'SQL · MySQL · JDBC · Hibernate · JPA',
      },
      {
        index: '04.',
        title: 'Problem-Solving & Data Structures (DSA)',
        description:
          'Consistent algorithmic practice and data structures implementation in Java to write efficient, maintainable, and well-reasoned backend logic.',
        tags: 'Data Structures · Algorithms · Java Problem Solving',
      },
    ],
  },

  // --------------------------------------------------------------------------
  // 7. PART-TIME FREELANCE WEB DEVELOPMENT ("WHAT I CAN BUILD")
  // --------------------------------------------------------------------------
  freelanceSection: {
    sectionKicker: 'Part-Time Freelance Web Development',
    sectionTitle: 'What I Can Build for Clients & Businesses',
    sectionIntro:
      'Alongside my focus on software engineering roles, I take on selected part-time freelance projects to design and build fast, modern, and responsive websites for individuals, startups, and businesses.',
    personalCommitmentNote:
      'You work directly with me as an independent developer—ensuring clean code, clear communication, mobile-first responsiveness, and practical delivery without agency overhead.',
    services: [
      {
        id: 'business-websites',
        index: '01.',
        title: 'Business Websites',
        tagline: 'Credible, high-trust web presence for companies and local businesses',
        description:
          'Clean, professional multi-section websites that clearly communicate your services, build customer trust, and make it effortless for leads to contact you.',
        deliverables: [
          'Custom responsive layout tailored to your brand',
          'Services, About, and Contact sections',
          'Fast page loading & SEO-friendly HTML structure',
        ],
        idealFor: 'Local businesses, consultants, clinics & professional firms',
        inquiryTopic: 'Business Website Development',
      },
      {
        id: 'portfolio-websites',
        index: '02.',
        title: 'Personal Portfolio Websites',
        tagline: 'Standout portfolios for developers, designers, and professionals',
        description:
          'Custom-crafted personal websites designed to showcase your work, resume, skills, and achievements to recruiters and clients with modern polish.',
        deliverables: [
          'Project showcase & case study layouts',
          'Resume download & social profile integration',
          'Easy-to-update content configuration',
        ],
        idealFor: 'Engineers, creators, students, researchers & executives',
        inquiryTopic: 'Personal Portfolio Website',
      },
      {
        id: 'landing-pages',
        index: '03.',
        title: 'Landing Pages',
        tagline: 'Focused, high-clarity pages for products, apps, and campaigns',
        description:
          'Single-page websites engineered with strong visual hierarchy, clear value propositions, and strategic call-to-action sections.',
        deliverables: [
          'High-impact hero section & feature highlights',
          'Direct WhatsApp, Email, or lead CTA integration',
          'Optimized mobile & desktop performance',
        ],
        idealFor: 'App launches, digital products, events & marketing campaigns',
        inquiryTopic: 'Custom Landing Page',
      },
      {
        id: 'startup-websites',
        index: '04.',
        title: 'Startup Websites',
        tagline: 'Modern, scalable web frontends for early-stage products and founders',
        description:
          'Developer-grade websites inspired by modern tech companies—helping startups present their product vision, architecture, and roadmap with authority.',
        deliverables: [
          'Modern dark/light UI system with clean typography',
          'Component-based React + Vite architecture',
          'Ready for fast static or cloud deployment',
        ],
        idealFor: 'Early-stage startups, SaaS founders & technical products',
        inquiryTopic: 'Startup Website Development',
      },
      {
        id: 'responsive-websites',
        index: '05.',
        title: 'Responsive Websites',
        tagline: 'Mobile-first websites that look and work great on every screen',
        description:
          'Websites engineered from the ground up to adapt seamlessly across desktop monitors, laptops, tablets, Android phones, and iPhones.',
        deliverables: [
          'Fluid CSS Grid & Flexbox layouts',
          'Touch-friendly mobile navigation & controls',
          'Cross-browser compatibility verification',
        ],
        idealFor: 'Any organization needing dependable multi-device reach',
        inquiryTopic: 'Responsive Website Project',
      },
      {
        id: 'website-redesign',
        index: '06.',
        title: 'Website Redesign',
        tagline: 'Transform outdated websites into modern, fast digital experiences',
        description:
          'Upgrade an existing slow, cluttered, or non-responsive website with refined typography, cleaner navigation, better contrast, and modern code.',
        deliverables: [
          'Complete UI/UX refresh & layout modernization',
          'Mobile responsiveness overhaul',
          'Improved code maintainability & SEO metadata',
        ],
        idealFor: 'Businesses with legacy websites needing a modern upgrade',
        inquiryTopic: 'Website Redesign Inquiry',
      },
    ] as FreelanceServiceItem[],
  },

  // --------------------------------------------------------------------------
  // 8. EDUCATION & ACADEMIC FOUNDATION
  // --------------------------------------------------------------------------
  education: {
    degree: 'Bachelor of Technology (B.Tech)',
    specialization: 'Computer Science and Engineering',
    institution: 'Technocrats Institute of Technology, Bhopal',
    university: 'Rajiv Gandhi Proudyogiki Vishwavidyalaya (RGPV), Bhopal',
    institutionPlaceholder: 'Technocrats Institute of Technology, Bhopal (RGPV)',
    durationPlaceholder: 'B.Tech Undergraduate · Bhopal, MP',
    scorePlaceholder: '',
    summary:
      'Focused on software engineering fundamentals, Object-Oriented Programming in Java, Database Management Systems (DBMS), Operating Systems, Computer Networks, and application development.',
    coreCoursework: [
      'Object-Oriented Programming (Java)',
      'Data Structures & Algorithms',
      'Database Management Systems (SQL / MySQL)',
      'Operating Systems & Linux Environment',
      'Computer Networks & HTTP Protocols',
      'Software Engineering & System Design Basics',
    ],
    academicAndSelfLearningNote:
      'All experience shown on this portfolio reflects genuine hands-on project development, self-directed engineering practice, and B.Tech Computer Science coursework at Technocrats Institute of Technology, Bhopal (affiliated to RGPV, Bhopal).',
  },
};
