import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale';
  threshold?: number;
  /**
   * When true (default), elements animate smoothly when scrolling both DOWN and UP
   * as they enter/re-enter the viewport on mobile, tablet, and desktop.
   */
  repeat?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delayMs = 0,
  direction = 'up',
  threshold = 0.08,
  repeat = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
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
        rootMargin: '0px 0px -24px 0px',
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, repeat]);

  const getInitialTransform = () => {
    if (isVisible) return 'perspective(900px) translate3d(0, 0, 0) rotateX(0deg) scale(1)';
    switch (direction) {
      case 'up':
        return 'perspective(900px) translate3d(0, 32px, 0) rotateX(4deg) scale(0.965)';
      case 'down':
        return 'perspective(900px) translate3d(0, -32px, 0) rotateX(-4deg) scale(0.965)';
      case 'left':
        return 'perspective(900px) translate3d(28px, 0, 0) scale(0.965)';
      case 'right':
        return 'perspective(900px) translate3d(-28px, 0, 0) scale(0.965)';
      case 'scale':
        return 'perspective(900px) translate3d(0, 18px, 0) scale(0.93)';
      default:
        return 'perspective(900px) translate3d(0, 32px, 0) rotateX(4deg) scale(0.965)';
    }
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getInitialTransform(),
        transitionProperty: 'opacity, transform',
        transitionDuration: '620ms',
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        transitionDelay: isVisible ? `${delayMs}ms` : '0ms',
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
};
