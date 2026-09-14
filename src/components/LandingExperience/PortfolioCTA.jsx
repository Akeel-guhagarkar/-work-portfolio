import React, { useRef, useEffect } from 'react';
import { useCursorPosition } from '../interaction/useCursorPosition';
import { useReducedMotion } from '../interaction/useReducedMotion';
import { INTERACTION_CONFIG } from '../interaction/InteractionConfig';

/**
 * Landing Experience: PortfolioCTA
 * Refined Primary Action Button with Phase 4 Transition Trigger & Lock.
 */
export default function PortfolioCTA({
  onEnterPortfolio,
  onHoverChange,
  isTransitioning,
  isComplete,
}) {
  const buttonRef = useRef(null);
  const { isPointerFine, mouse } = useCursorPosition();
  const prefersReducedMotion = useReducedMotion();

  const magneticOffset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (
      !isPointerFine ||
      prefersReducedMotion ||
      !buttonRef.current ||
      isTransitioning ||
      isComplete
    ) {
      return;
    }

    let animId;
    const calculateMagneticPull = () => {
      const btn = buttonRef.current;
      if (btn) {
        const rect = btn.getBoundingClientRect();
        const btnCenterX = rect.left + rect.width / 2;
        const btnCenterY = rect.top + rect.height / 2;

        const dx = mouse.current.x - btnCenterX;
        const dy = mouse.current.y - btnCenterY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const config = INTERACTION_CONFIG.magneticCTA;

        let targetX = 0;
        let targetY = 0;

        if (distance < config.radiusPx) {
          const pullStrength = 1 - distance / config.radiusPx;
          targetX = (dx / distance) * config.maxOffsetPx * pullStrength;
          targetY = (dy / distance) * config.maxOffsetPx * pullStrength;
        }

        magneticOffset.current.x +=
          (targetX - magneticOffset.current.x) * config.lerp;
        magneticOffset.current.y +=
          (targetY - magneticOffset.current.y) * config.lerp;

        btn.style.transform = `translate3d(${magneticOffset.current.x}px, ${magneticOffset.current.y}px, 0)`;
      }
      animId = requestAnimationFrame(calculateMagneticPull);
    };

    animId = requestAnimationFrame(calculateMagneticPull);
    return () => cancelAnimationFrame(animId);
  }, [isPointerFine, prefersReducedMotion, mouse, isTransitioning, isComplete]);

  return (
    <div className={`landing-cta-container reveal-element delay-cta ${isTransitioning ? 'cta-transitioning' : ''}`}>
      <button
        ref={buttonRef}
        type="button"
        className="landing-cta-button"
        onClick={onEnterPortfolio}
        onMouseEnter={() => onHoverChange && onHoverChange(true)}
        onMouseLeave={() => onHoverChange && onHoverChange(false)}
        disabled={isTransitioning || isComplete}
        aria-label="Enter Portfolio Experience"
      >
        <span className="cta-text">ENTER PORTFOLIO</span>
        <span className="cta-arrow" aria-hidden="true">&rarr;</span>
      </button>
    </div>
  );
}
