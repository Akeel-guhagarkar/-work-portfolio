import React from 'react';

/**
 * Landing Experience: LandingHeader
 * Minimal luxury editorial top header.
 */
export default function LandingHeader() {
  return (
    <header className="landing-header" role="banner">
      <div className="landing-header-left">
        <span className="landing-header-dot" aria-hidden="true" />
        <span>AKEEL / 2026</span>
      </div>
      <div className="landing-header-right">
        <span>WEB &bull; AI &bull; DESIGN</span>
      </div>
    </header>
  );
}
