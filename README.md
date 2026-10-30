# Aditya Raj — Personal Developer Portfolio

**Web & App Developer | Java Backend Developer**

A responsive, dual-theme personal developer portfolio built with **React 19**, **Vite 8**, **TypeScript**, and **Tailwind CSS v4**. Engineered to showcase both **Software Engineering Career Qualifications** (Java, Spring Boot, Android MVVM, Web Development) and **Part-Time Freelance Web Development Capabilities**.

- **LinkedIn**: [linkedin.com/in/aditya-raj-523b15265](https://www.linkedin.com/in/aditya-raj-523b15265/)
- **GitHub**: [github.com/Adityaraj811](https://github.com/Adityaraj811)
- **Email**: `adityaraj81156@gmail.com`
- **Mobile / WhatsApp**: `+91 9263605950` ([wa.me/919263605950](https://wa.me/919263605950))
- **Instagram**: [@_.adityarajsingh](https://www.instagram.com/_.adityarajsingh?cplk=aDZhd2hzc3RjZG4w)
- **Education**: B.Tech in Computer Science and Engineering — Technocrats Institute of Technology, Bhopal (RGPV, Bhopal)
- **Intended GitHub Repository & Live URL**: `https://Adityaraj811.github.io/aditya-raj-portfolio/`

---

## 1. Quick Customization Guide (One-File Configuration)

All personal details, social links, projects, freelance offerings, and academic records are centralized in:

```text
src/data/portfolioConfig.ts
```

All runtime static assets (`images/profile.webp`, `images/profile-placeholder.svg`, `resume.pdf`, `aditya-raj-portfolio.zip`) are resolved via `resolvePublicAsset(...)` using `import.meta.env.BASE_URL` so they work seamlessly on both `localhost` (`/`) and GitHub Pages (`/aditya-raj-portfolio/`).

### Updating Your PDF Resume
1. Your official CV is located at:
   ```text
   public/resume.pdf
   ```
2. It is resolved dynamically using `${import.meta.env.BASE_URL}resume.pdf` and downloaded as `Aditya_Raj_CV.pdf` across the Navbar, Hero section, Education section, Footer, and Resume Preview Modal.

---

## 2. Folder Structure

```text
aditya-raj-portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml                  # Automated GitHub Pages workflow (Node 22 + npm ci)
├── public/
│   ├── favicon.svg                     # Custom AR developer monogram icon
│   ├── resume.pdf                      # Official Curriculum Vitae PDF (downloaded as Aditya_Raj_CV.pdf)
│   └── images/
│       ├── profile.webp                # Optimized 35KB WebP studio portrait
│       └── profile-placeholder.svg     # Architectural monogram fallback
├── src/
│   ├── components/
│   │   ├── ProjectDetailModal.tsx      # Accessible project case-study modal with focus trap
│   │   ├── ProjectVisual.tsx           # Custom architectural diagrams for projects
│   │   ├── ResumeModal.tsx             # Embedded PDF viewer & direct Aditya_Raj_CV.pdf download modal
│   │   └── TechIcon.tsx                # Recognizable icons for all 27 technical skills
│   ├── data/
│   │   └── portfolioConfig.ts          # Single-source configuration & BASE_URL asset resolver
│   ├── App.tsx                         # Main single-page portfolio layout & state
│   ├── index.css                       # Tailwind v4 setup & dark/light theme styles
│   └── main.tsx                        # React application entry point
├── index.html                          # SEO metadata, %BASE_URL%favicon.svg & JSON-LD schema
├── package.json                        # Clean frontend dependencies & build scripts
├── package-lock.json                   # Lockfile for deterministic npm ci installs
├── tsconfig.json                       # TypeScript compiler configuration
└── vite.config.ts                      # Vite config with '/aditya-raj-portfolio/' build base
```

---

## 3. Local Development & Verification Commands

### Install Dependencies
```bash
npm install
```

### Run TypeScript Type Check
```bash
npm run lint
```

### Start Development Server
```bash
npm run dev
```

### Build for Production (GitHub Pages Base Path)
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

---

## 4. Publishing to GitHub & Deploying on GitHub Pages

1. Create a public repository on GitHub named `aditya-raj-portfolio` under `https://github.com/Adityaraj811`.
2. Initialize Git and push your code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Aditya Raj personal developer portfolio"
   git branch -M main
   git remote add origin https://github.com/Adityaraj811/aditya-raj-portfolio.git
   git push -u origin main
   ```
3. In your GitHub repository, navigate to **Settings → Pages**.
4. Under **Build and deployment → Source**, select **GitHub Actions**.
5. Every push to `main` automatically runs `.github/workflows/deploy.yml` (using Node.js 22 and `npm ci`) and deploys your portfolio to `https://Adityaraj811.github.io/aditya-raj-portfolio/`.
