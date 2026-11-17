import React, { useRef } from 'react';

interface Tilt3DCardProps {
  children: React.ReactNode;
  className?: string;
  maxTiltDeg?: number;
  spotlightColor?: string;
  noirCursorLabel?: string;
  onClick?: () => void;
  role?: string;
  tabIndex?: number;
  ariaLabel?: string;
}

export const Tilt3DCard: React.FC<Tilt3DCardProps> = ({
  children,
  className = '',
  maxTiltDeg = 4.5,
  spotlightColor = 'rgba(225, 6, 0, 0.16)',
  noirCursorLabel,
  onClick,
  role,
  tabIndex,
  ariaLabel,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const pointerStartRef = useRef<{ x: number; y: number } | null>(null);

  const applyTiltFromPoint = (clientX: number, clientY: number) => {
    if (rafRef.current !== null) {
      window.cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = window.requestAnimationFrame(() => {
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
      const y = Math.max(0, Math.min(rect.height, clientY - rect.top));
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -maxTiltDeg;
      const rotateY = ((x - centerX) / centerX) * maxTiltDeg;

      card.style.transform = `perspective(1100px) rotateX(${rotateX.toFixed(
        2
      )}deg) rotateY(${rotateY.toFixed(2)}deg) translate3d(0, -4px, 0) scale3d(1.008, 1.008, 1.008)`;

      if (spotlightRef.current) {
        const px = ((x / rect.width) * 100).toFixed(1);
        const py = ((y / rect.height) * 100).toFixed(1);
        spotlightRef.current.style.opacity = '1';
        spotlightRef.current.style.background = `radial-gradient(500px circle at ${px}% ${py}%, ${spotlightColor}, transparent 65%)`;
      }
    });
  };

  const resetTilt = () => {
    if (rafRef.current !== null) {
      window.cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    pointerStartRef.current = null;
    if (cardRef.current) {
      cardRef.current.style.transform =
        'perspective(1100px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0) scale3d(1, 1, 1)';
    }
    if (spotlightRef.current) {
      spotlightRef.current.style.opacity = '0';
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    pointerStartRef.current = { x: e.clientX, y: e.clientY };
    if (e.pointerType !== 'touch') {
      applyTiltFromPoint(e.clientX, e.clientY);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch') {
      if (!pointerStartRef.current) return;
      const dy = Math.abs(e.clientY - pointerStartRef.current.y);
      const dx = Math.abs(e.clientX - pointerStartRef.current.x);
      if (dy > 8 && dy >= dx) {
        resetTilt();
        return;
      }
    }
    applyTiltFromPoint(e.clientX, e.clientY);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      ref={cardRef}
      data-noir-cursor={noirCursorLabel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={resetTilt}
      onPointerCancel={resetTilt}
      onPointerLeave={resetTilt}
      onClick={onClick}
      onKeyDown={onClick ? handleKeyDown : undefined}
      role={role}
      tabIndex={tabIndex}
      aria-label={ariaLabel}
      className={`relative overflow-hidden transition-transform duration-300 ease-out touch-pan-y hover:shadow-[0_24px_60px_rgba(5,5,5,0.22)] ${className}`}
      style={{
        transform:
          'perspective(1100px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0) scale3d(1, 1, 1)',
        transformStyle: 'preserve-3d',
        touchAction: 'pan-y',
      }}
    >
      {/* Subtle Crimson Specular Pointer Glare Overlay */}
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{ opacity: 0 }}
      />
      <div className="relative z-10 h-full flex flex-col justify-between">{children}</div>
    </div>
  );
};
