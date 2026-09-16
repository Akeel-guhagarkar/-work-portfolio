import { useEffect } from 'react';

export default function useScrollReveal(selector = '.reveal-on-scroll', threshold = 0.15) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const revealElement = (el) => {
      if (el) {
        el.classList.add('is-revealed');
      }
    };

    if (prefersReducedMotion) {
      document.querySelectorAll(selector).forEach(revealElement);
      return;
    }

    const checkViewportVisibility = () => {
      const elements = document.querySelectorAll(selector);
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

      elements.forEach((el) => {
        if (el.classList.contains('is-revealed')) return;
        const rect = el.getBoundingClientRect();
        // Check if element top is visible within viewport height (with threshold margin)
        if (rect.top <= viewportHeight * 0.95 && rect.bottom >= 0) {
          revealElement(el);
        }
      });
    };

    const elements = document.querySelectorAll(selector);
    if (!elements.length) return;

    // Immediately run check on mount
    checkViewportVisibility();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            revealElement(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    elements.forEach((el) => observer.observe(el));

    // Listen for custom portfolio reveal event & window events
    const handleRevealTrigger = () => {
      checkViewportVisibility();
      // Re-observe any unrevealed elements
      document.querySelectorAll(selector).forEach((el) => {
        if (!el.classList.contains('is-revealed')) {
          observer.observe(el);
        }
      });
    };

    window.addEventListener('portfolio-revealed', handleRevealTrigger);
    window.addEventListener('resize', checkViewportVisibility, { passive: true });

    // Fallback checks after entry transitions
    const t1 = setTimeout(checkViewportVisibility, 300);
    const t2 = setTimeout(checkViewportVisibility, 1000);
    const t3 = setTimeout(checkViewportVisibility, 2500);

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      window.removeEventListener('portfolio-revealed', handleRevealTrigger);
      window.removeEventListener('resize', checkViewportVisibility);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [selector, threshold]);
}

