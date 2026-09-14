import React, { useEffect, useRef } from 'react';
import { useCursorPosition } from './useCursorPosition';
import { useReducedMotion } from './useReducedMotion';
import { INTERACTION_CONFIG } from './InteractionConfig';

/**
 * Interaction System: Spotlight Component
 * GPU-accelerated radial illumination spotlight following cursor smoothly.
 */
export function Spotlight() {
  const { isPointerFine, mouse } = useCursorPosition();
  const prefersReducedMotion = useReducedMotion();

  const spotlightRef = useRef(null);
  const currentPos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  useEffect(() => {
    if (!isPointerFine || prefersReducedMotion) return;

    let animId;
    const renderSpotlight = () => {
      if (spotlightRef.current) {
        // Smooth lerp for spotlight center
        currentPos.current.x += (mouse.current.x - currentPos.current.x) * INTERACTION_CONFIG.spotlight.lerp;
        currentPos.current.y += (mouse.current.y - currentPos.current.y) * INTERACTION_CONFIG.spotlight.lerp;

        spotlightRef.current.style.background = `radial-gradient(
          ${INTERACTION_CONFIG.spotlight.sizePx}px circle at ${currentPos.current.x}px ${currentPos.current.y}px,
          rgba(77, 163, 255, 0.09) 0%,
          rgba(8, 11, 16, 0.02) 50%,
          transparent 80%
        )`;
      }
      animId = requestAnimationFrame(renderSpotlight);
    };

    animId = requestAnimationFrame(renderSpotlight);
    return () => cancelAnimationFrame(animId);
  }, [isPointerFine, prefersReducedMotion, mouse]);

  if (!isPointerFine || prefersReducedMotion) return null;

  return <div ref={spotlightRef} className="landing-spotlight-layer" aria-hidden="true" />;
}
