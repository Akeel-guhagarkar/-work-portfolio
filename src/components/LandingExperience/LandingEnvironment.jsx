import React from 'react';

/**
 * Landing Experience: LandingEnvironment
 * Decorative background atmosphere, grid pattern, radial lighting depth & vignette.
 */
export default function LandingEnvironment() {
  return (
    <div className="landing-atmosphere" aria-hidden="true">
      <div className="landing-grid-overlay" />
      <div className="landing-radial-depth" />
      <div className="landing-vignette" />
    </div>
  );
}
