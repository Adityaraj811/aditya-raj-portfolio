import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Hold the hero's entry animations until the cinematic intro lifts (see NoirIntro).
if (!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.classList.add('noir-intro');
}

createRoot(document.getElementById('root')!).render(<App />);
