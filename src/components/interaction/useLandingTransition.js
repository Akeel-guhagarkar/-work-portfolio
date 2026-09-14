import { useState, useCallback, useRef, useEffect } from 'react';
import { useReducedMotion } from './useReducedMotion';

/**
 * Transition Controller Hook: useLandingTransition
 * Manages the transition state machine: "idle" -> "transitioning" -> "complete"
 * Centralizes cinematic camera push, CTA click sequence, rapid click lock, and unmount timing.
 */
export const TRANSITION_TIMINGS = {
  ctaActiveDelay: 200,
  cameraPushStart: 400,
  textFadeStart: 600,
  portfolioRevealStart: 2000,
  durationMs: 4200,
  reducedMotionDurationMs: 400,
};

export function useLandingTransition(onTransitionComplete, onTransitionStart, onProgress) {
  const [transitionState, setTransitionState] = useState('idle'); // 'idle' | 'transitioning' | 'complete'
  const [transitionProgress, setTransitionProgress] = useState(0); // 0.0 -> 1.0
  const prefersReducedMotion = useReducedMotion();

  const isTransitioningRef = useRef(false);
  const startTimeRef = useRef(0);
  const animFrameRef = useRef(null);

  const startTransition = useCallback(() => {
    if (isTransitioningRef.current || transitionState === 'complete') return;

    isTransitioningRef.current = true;
    setTransitionState('transitioning');
    startTimeRef.current = Date.now();

    if (onTransitionStart) onTransitionStart();

    const duration = prefersReducedMotion
      ? TRANSITION_TIMINGS.reducedMotionDurationMs
      : TRANSITION_TIMINGS.durationMs;

    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const progress = Math.min(Math.max(elapsed / duration, 0), 1.0);

      // Smooth ease-in-out cubic curve
      const easedProgress =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      setTransitionProgress(easedProgress);
      if (onProgress) onProgress(easedProgress);

      if (progress < 1.0) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        setTransitionState('complete');
        isTransitioningRef.current = false;
        if (onTransitionComplete) onTransitionComplete();
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);
  }, [transitionState, prefersReducedMotion, onTransitionComplete, onTransitionStart, onProgress]);

  const resetTransition = useCallback(() => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    isTransitioningRef.current = false;
    setTransitionState('idle');
    setTransitionProgress(0);
  }, []);

  // Keyboard accessibility: Enter or Space key triggers transition if focused
  const handleKeyDown = useCallback(
    (e) => {
      if (
        (e.key === 'Enter' || e.key === ' ') &&
        transitionState === 'idle'
      ) {
        e.preventDefault();
        startTransition();
      }
    },
    [transitionState, startTransition]
  );

  // Gentle scroll awareness trigger
  useEffect(() => {
    if (transitionState !== 'idle') return;

    let wheelDeltaSum = 0;
    const handleWheel = (e) => {
      if (e.deltaY > 0) {
        wheelDeltaSum += e.deltaY;
        if (wheelDeltaSum > 220) {
          startTransition();
        }
      } else {
        wheelDeltaSum = 0;
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [transitionState, startTransition]);

  return {
    transitionState,
    transitionProgress,
    isTransitioning: transitionState === 'transitioning',
    isComplete: transitionState === 'complete',
    startTransition,
    resetTransition,
    handleKeyDown,
  };
}
