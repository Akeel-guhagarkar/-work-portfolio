import React from 'react';
import { useCursorInteraction } from '../interaction/useCursorInteraction';

/**
 * Landing Experience: LandingCTA
 * Primary Action Button: "ENTER PORTFOLIO →"
 */
export default function LandingCTA({ onEnterPortfolio }) {
  const { bindHover } = useCursorInteraction();

  return (
    <div className="landing-cta-container">
      <button
        type="button"
        className="landing-cta-button"
        onClick={onEnterPortfolio}
        aria-label="Enter Portfolio Experience"
        {...bindHover('button')}
      >
        <span>ENTER PORTFOLIO</span>
        <span className="cta-arrow" aria-hidden="true">&rarr;</span>
      </button>
    </div>
  );
}
