import React, { useRef, useState } from 'react';

interface Tilt3DCardProps {
  children: React.ReactNode;
  className?: string;
  maxTiltDeg?: number;
  spotlightColor?: string;
  onClick?: () => void;
  role?: string;
  tabIndex?: number;
  ariaLabel?: string;
}

export const Tilt3DCard: React.FC<Tilt3DCardProps> = ({
  children,
  className = '',
  maxTiltDeg = 5.5,
  spotlightColor = 'rgba(59, 130, 246, 0.14)',
  onClick,
  role,
  tabIndex,
  ariaLabel,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState<string>(
    'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
  );
  const [spotlightPos, setSpotlightPos] = useState<{ x: number; y: number; active: boolean }>({
    x: 50,
    y: 50,
    active: false,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    // Skip 3D tilt on touch-primary devices or reduced motion
    if (
      typeof window !== 'undefined' &&
      (window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
        window.matchMedia('(hover: none)').matches)
    ) {
      return;
    }

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTiltDeg;
    const rotateY = ((x - centerX) / centerX) * maxTiltDeg;

    setTransformStyle(
      `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(
        2
      )}deg) scale3d(1.01, 1.01, 1.01)`
    );
    setSpotlightPos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      active: true,
    });
  };

  const handleMouseLeave = () => {
    setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setSpotlightPos((prev) => ({ ...prev, active: false }));
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
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      onKeyDown={onClick ? handleKeyDown : undefined}
      role={role}
      tabIndex={tabIndex}
      aria-label={ariaLabel}
      className={`relative overflow-hidden transition-transform duration-200 ease-out ${className}`}
      style={{
        transform: transformStyle,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Subtle Cursor-Following Spotlight Overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          opacity: spotlightPos.active ? 1 : 0,
          background: `radial-gradient(480px circle at ${spotlightPos.x}% ${spotlightPos.y}%, ${spotlightColor}, transparent 65%)`,
        }}
      />
      <div className="relative z-10 h-full flex flex-col justify-between">{children}</div>
    </div>
  );
};
