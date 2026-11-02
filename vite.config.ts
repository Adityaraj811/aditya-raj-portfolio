import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { defineConfig, type Plugin } from 'vite';

/**
 * Ensures GitHub Pages compatibility for `/services` direct access and page refresh
 * by copying `dist/index.html` to `dist/404.html` and `dist/services/index.html`.
 */
function githubPagesSpaRoutesPlugin(): Plugin {
  return {
    name: 'github-pages-spa-routes',
    closeBundle() {
      const distDir = path.resolve(import.meta.dirname, 'dist');
      const indexHtml = path.join(distDir, 'index.html');
      if (!fs.existsSync(indexHtml)) return;

      // 1. Create dist/404.html fallback for GitHub Pages
      fs.copyFileSync(indexHtml, path.join(distDir, '404.html'));

      // 2. Create dist/services/index.html so `/services` returns HTTP 200 on direct load/refresh
      const servicesDir = path.join(distDir, 'services');
      fs.mkdirSync(servicesDir, { recursive: true });
      fs.copyFileSync(indexHtml, path.join(servicesDir, 'index.html'));
    },
  };
}

export default defineConfig(() => {
  // On Netlify (or standard production builds), deploy at root '/'.
  // On GitHub Actions (GitHub Pages), VITE_BASE_PATH is set to '/aditya-raj-portfolio/'.
  const resolvedBase =
    process.env.VITE_BASE_PATH ||
    (process.env.GITHUB_ACTIONS === 'true' && !process.env.NETLIFY
      ? '/aditya-raj-portfolio/'
      : '/');

  return {
    base: resolvedBase,
    plugins: [react(), tailwindcss(), githubPagesSpaRoutesPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
