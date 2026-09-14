import { useMousePosition } from './useMousePosition';

/**
 * Custom Hook: useMouseParallax
 * Calculates smooth parallax offset based on intensity multiplier.
 */
export function useMouseParallax(intensity = 1.0) {
  const { normalizedX, normalizedY } = useMousePosition();

  return {
    parallaxX: normalizedX * intensity,
    parallaxY: normalizedY * intensity,
  };
}
