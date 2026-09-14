import { useEffect, useRef } from 'react';
import { INTERACTION_CONFIG } from './InteractionConfig';

/**
 * Custom Hook: useCursorVelocity
 * Calculates smooth mouse movement velocity magnitude with exponential decay.
 */
export function useCursorVelocity() {
  const velocityRef = useRef({ vx: 0, vy: 0, speed: 0 });
  const lastMouseRef = useRef({ x: 0, y: 0, time: Date.now() });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const now = Date.now();
      const dt = Math.max((now - lastMouseRef.current.time) / 1000, 0.001);

      const dx = e.clientX - lastMouseRef.current.x;
      const dy = e.clientY - lastMouseRef.current.y;

      const vx = dx / dt;
      const vy = dy / dt;
      const speed = Math.sqrt(vx * vx + vy * vy);

      velocityRef.current = { vx, vy, speed };
      lastMouseRef.current = { x: e.clientX, y: e.clientY, time: now };
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Decay velocity smoothly when mouse stops
    let animId;
    const decayLoop = () => {
      velocityRef.current.speed *= INTERACTION_CONFIG.cursor.velocityDecay;
      velocityRef.current.vx *= INTERACTION_CONFIG.cursor.velocityDecay;
      velocityRef.current.vy *= INTERACTION_CONFIG.cursor.velocityDecay;

      if (velocityRef.current.speed < 0.01) {
        velocityRef.current = { vx: 0, vy: 0, speed: 0 };
      }

      animId = requestAnimationFrame(decayLoop);
    };

    animId = requestAnimationFrame(decayLoop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return velocityRef;
}
