import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { prefersReducedMotion, RESPECT_REDUCED_MOTION } from './utils/motion';

// CSS reduced-motion fallbacks only apply when the site opts in (see utils/motion.ts)
if (RESPECT_REDUCED_MOTION) document.documentElement.classList.add('honor-reduced-motion');

// Hold the hero's entry animations until the cinematic intro lifts (see NoirIntro).
if (!prefersReducedMotion()) {
  document.documentElement.classList.add('noir-intro');
}

createRoot(document.getElementById('root')!).render(<App />);
