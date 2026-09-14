import { useState, useEffect } from 'react';

/**
 * Custom Hook: useCursorInteraction
 * Architecturally manages custom cursor state, touch detection, and element hovers.
 */
export function useCursorInteraction() {
  const [isDesktop, setIsDesktop] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [hoverType, setHoverType] = useState('default');

  useEffect(() => {
    // Disable custom cursor extensions on touch devices
    const checkIsTouch = () => {
      setIsDesktop(
        !('ontouchstart' in window || navigator.maxTouchPoints > 0)
      );
    };

    checkIsTouch();
    window.addEventListener('resize', checkIsTouch);
    return () => window.removeEventListener('resize', checkIsTouch);
  }, []);

  const bindHover = (type = 'interactive') => ({
    onMouseEnter: () => {
      setIsHovered(true);
      setHoverType(type);
    },
    onMouseLeave: () => {
      setIsHovered(false);
      setHoverType('default');
    },
  });

  return {
    isDesktop,
    isHovered,
    hoverType,
    bindHover,
  };
}
