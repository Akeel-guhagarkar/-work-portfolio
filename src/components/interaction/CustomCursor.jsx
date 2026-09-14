import React, { useEffect, useRef } from 'react';
import { useCursorPosition } from './useCursorPosition';
import { useReducedMotion } from './useReducedMotion';
import { INTERACTION_CONFIG } from './InteractionConfig';

/**
 * Interaction System: CustomCursor Component
 * Minimal, precise luxury custom cursor featuring central dot + smooth inertia outer ring.
 * Automatically disabled on touch devices or prefers-reduced-motion.
 */
export function CustomCursor({ isHovered }) {
  const { isPointerFine, dot, ring } = useCursorPosition();
  const prefersReducedMotion = useReducedMotion();

  const dotElRef = useRef(null);
  const ringElRef = useRef(null);

  useEffect(() => {
    if (!isPointerFine || prefersReducedMotion) return;

    let animId;
    const renderLoop = () => {
      if (dotElRef.current && ringElRef.current) {
        dotElRef.current.style.transform = `translate3d(${dot.current.x}px, ${dot.current.y}px, 0)`;
        ringElRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) scale(${
          isHovered ? INTERACTION_CONFIG.cursor.hoverRingScale : 1.0
        })`;
      }
      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);
    return () => cancelAnimationFrame(animId);
  }, [isPointerFine, prefersReducedMotion, isHovered, dot, ring]);

  if (!isPointerFine || prefersReducedMotion) return null;

  return (
    <div className="custom-cursor-container" aria-hidden="true">
      {/* Central Cursor Dot */}
      <div ref={dotElRef} className="cursor-dot" />

      {/* Inertia Outer Ring */}
      <div
        ref={ringElRef}
        className={`cursor-ring ${isHovered ? 'cursor-ring-active' : ''}`}
      />
    </div>
  );
}
