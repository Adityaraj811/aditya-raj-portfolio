import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale';
  threshold?: number;
  /**
   * When true (default), elements animate smoothly when scrolling both DOWN and UP
   * as they enter/re-enter the viewport.
   */
  repeat?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delayMs = 0,
  direction = 'up',
  threshold = 0.12,
  repeat = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setIsVisible(true);
      return;
    }

    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else if (repeat) {
            setIsVisible(false);
          }
        });
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, repeat, reducedMotion]);

  const getInitialTransform = () => {
    if (reducedMotion || isVisible) return 'translate3d(0, 0, 0) scale(1)';
    switch (direction) {
      case 'up':
        return 'translate3d(0, 28px, 0) scale(0.985)';
      case 'down':
        return 'translate3d(0, -28px, 0) scale(0.985)';
      case 'left':
        return 'translate3d(28px, 0, 0) scale(0.985)';
      case 'right':
        return 'translate3d(-28px, 0, 0) scale(0.985)';
      case 'scale':
        return 'translate3d(0, 14px, 0) scale(0.94)';
      default:
        return 'translate3d(0, 28px, 0) scale(0.985)';
    }
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: reducedMotion || isVisible ? 1 : 0,
        transform: getInitialTransform(),
        transitionProperty: 'opacity, transform',
        transitionDuration: reducedMotion ? '0ms' : '650ms',
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        transitionDelay: isVisible ? `${delayMs}ms` : '0ms',
        willChange: reducedMotion ? 'auto' : 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
};
