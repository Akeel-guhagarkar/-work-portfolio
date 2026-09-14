import React from 'react';

/**
 * Landing Experience: HeroMetadata
 * Editorial micro metadata labels and identity markers.
 */
export function HeroMetadataLeft() {
  return (
    <div className="landing-header-left reveal-element delay-meta">
      <span className="landing-header-dot" aria-hidden="true" />
      <span>AKEEL / 2026</span>
    </div>
  );
}

export function HeroMetadataRight() {
  return (
    <div className="landing-header-right reveal-element delay-meta">
      <span>WEB &bull; AI &bull; DESIGN</span>
    </div>
  );
}
