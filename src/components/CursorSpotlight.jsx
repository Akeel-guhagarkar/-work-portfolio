import React, { useEffect, useRef } from 'react';
import './CursorSpotlight.css';

export default function CursorSpotlight() {
  const spotlightRef = useRef(null);

  useEffect(() => {
    const el = spotlightRef.current;
    if (!el) return;

    // Skip on touch-only devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let animationFrameId;
    let currentX = -1000;
    let currentY = -1000;
    let targetX = -1000;
    let targetY = -1000;

    const handleMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const updateSpotlight = () => {
      // Smooth interpolation
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;

      if (el) {
        el.style.background = `radial-gradient(650px circle at ${currentX.toFixed(1)}px ${currentY.toFixed(1)}px, rgba(0, 82, 255, 0.16), rgba(37, 99, 235, 0.08) 45%, transparent 80%)`;
      }

      animationFrameId = requestAnimationFrame(updateSpotlight);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animationFrameId = requestAnimationFrame(updateSpotlight);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={spotlightRef}
      className="cursor-spotlight-layer"
      aria-hidden="true"
    />
  );
}
