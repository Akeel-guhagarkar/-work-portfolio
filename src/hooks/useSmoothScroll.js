import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

/**
 * Standard Awwwards / High-End Studio Level Smooth Momentum Scrolling Hook (Lenis)
 * 
 * Provides buttery-smooth, hardware-accelerated, linear-interpolated momentum scrolling
 * on laptop trackpads and desktop mouse wheels, eliminating browser wheel stutter.
 */
export function useSmoothScroll(isEnabled = true) {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Respect user reduced-motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    // Initialize Lenis with award-winning luxury easing & momentum
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth exponential ease-out
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
      autoRaf: true,
      anchors: true,
    });

    lenisRef.current = lenis;
    window.lenis = lenis;

    const handlePortfolioRevealed = () => {
      setTimeout(() => {
        lenis.start();
        lenis.resize();
      }, 150);
    };

    const handleResize = () => {
      lenis.resize();
    };

    window.addEventListener('portfolio-revealed', handlePortfolioRevealed);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('portfolio-revealed', handlePortfolioRevealed);
      window.removeEventListener('resize', handleResize);
      lenis.destroy();
      lenisRef.current = null;
      if (window.lenis === lenis) {
        window.lenis = undefined;
      }
    };
  }, []);

  // Update active/paused state based on isEnabled (e.g. landing screen vs portfolio)
  useEffect(() => {
    if (!lenisRef.current) return;
    if (isEnabled) {
      lenisRef.current.start();
      // Allow DOM to settle before recalculating scroll height
      requestAnimationFrame(() => {
        lenisRef.current?.resize();
      });
    } else {
      lenisRef.current.stop();
    }
  }, [isEnabled]);

  return lenisRef;
}

/**
 * Global helper to smoothly scroll to any element, selector, or position
 */
export function smoothScrollTo(target, options = {}) {
  if (window.lenis) {
    window.lenis.scrollTo(target, {
      offset: options.offset ?? 0,
      duration: options.duration ?? 1.2,
      ...options,
    });
  } else {
    if (typeof target === 'string') {
      const el = document.querySelector(target) || document.getElementById(target.replace('#', ''));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else if (typeof target === 'number') {
      window.scrollTo({ top: target, behavior: 'smooth' });
    } else if (target instanceof HTMLElement) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
