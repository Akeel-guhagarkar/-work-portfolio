import React from 'react';

/**
 * Landing Experience: Atmosphere Component
 * Dark Luxury Background Layers, Subtle Grid, Radial Depth & Vignette.
 */
export default function Atmosphere() {
  return (
    <div className="landing-atmosphere" aria-hidden="true">
      <div className="landing-grid-overlay" />
      <div className="landing-radial-depth" />
      <div className="landing-vignette" />
    </div>
  );
}
