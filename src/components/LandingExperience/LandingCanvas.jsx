import React from 'react';
import CoreScene from '../3D/CoreScene';

/**
 * Landing Experience: LandingCanvas
 * Container wrapper for the WebGL / 3D Scene Layer with Phase 4 transition controls.
 */
export default function LandingCanvas({ transitionProgress, isTransitioning }) {
  return (
    <div className="landing-canvas-wrapper" aria-hidden="true">
      <CoreScene
        transitionProgress={transitionProgress}
        isTransitioning={isTransitioning}
      />
    </div>
  );
}
