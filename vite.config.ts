import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(({ command }) => {
  return {
    // Uses '/aditya-raj-portfolio/' for production builds deployed to
    // https://Adityaraj811.github.io/aditya-raj-portfolio/ and '/' in local dev server.
    // Can also be overridden via VITE_BASE_PATH environment variable.
    base:
      process.env.VITE_BASE_PATH ||
      (command === 'build' ? '/aditya-raj-portfolio/' : '/'),
    plugins: [react(), tailwindcss()],
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
