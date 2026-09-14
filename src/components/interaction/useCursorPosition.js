import { useState, useEffect, useRef } from 'react';
import { INTERACTION_CONFIG } from './InteractionConfig';

/**
 * Custom Hook: useCursorPosition
 * Calculates smooth interpolated positions for central dot and outer ring.
 * Disables automatically on touch devices or fine pointer absent.
 */
export function useCursorPosition() {
  const [isPointerFine, setIsPointerFine] = useState(false);
  const mouseRef = useRef({ x: -100, y: -100 });
  const dotRef = useRef({ x: -100, y: -100 });
  const ringRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Media query & touch detection for desktop fine pointer
    const checkPointer = () => {
      const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
      const isTouchDevice =
        'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsPointerFine(hasFinePointer && !isTouchDevice);
    };

    checkPointer();
    window.addEventListener('resize', checkPointer);

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop for physics lerping
    let animId;
    const updatePhysics = () => {
      const mouse = mouseRef.current;
      const c = INTERACTION_CONFIG.cursor;

      // Lerp dot
      dotRef.current.x += (mouse.x - dotRef.current.x) * c.dotLerp;
      dotRef.current.y += (mouse.y - dotRef.current.y) * c.dotLerp;

      // Lerp outer ring with inertia
      ringRef.current.x += (mouse.x - ringRef.current.x) * c.ringLerp;
      ringRef.current.y += (mouse.y - ringRef.current.y) * c.ringLerp;

      animId = requestAnimationFrame(updatePhysics);
    };

    animId = requestAnimationFrame(updatePhysics);

    return () => {
      window.removeEventListener('resize', checkPointer);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return {
    isPointerFine,
    mouse: mouseRef,
    dot: dotRef,
    ring: ringRef,
  };
}
