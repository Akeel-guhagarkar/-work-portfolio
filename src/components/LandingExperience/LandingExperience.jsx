import React, { useState, useEffect } from 'react';
import LandingCanvas from './LandingCanvas';
import Atmosphere from './Atmosphere';
import HeroTypography from './HeroTypography';
import PortfolioCTA from './PortfolioCTA';
import { HeroMetadataLeft, HeroMetadataRight } from './HeroMetadata';
import { CustomCursor } from '../interaction/CustomCursor';
import { Spotlight } from '../interaction/Spotlight';
import { useLandingTransition } from '../interaction/useLandingTransition';
import '../../styles/landing.css';

/**
 * Landing Experience: Root Assembly Component (Synchronized Animated Portal Layer)
 * Bridges the 3D Digital Core landing experience into the existing portfolio smoothly.
 */
export default function LandingExperience({
  isVisible,
  onEnterPortfolio,
  onTransitionStart,
  onProgress,
}) {
  const [hasRevealed, setHasRevealed] = useState(false);
  const [isCTAHovered, setIsCTAHovered] = useState(false);

  const {
    transitionState,
    transitionProgress,
    isTransitioning,
    isComplete,
    startTransition,
  } = useLandingTransition(onEnterPortfolio, onTransitionStart, onProgress);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setHasRevealed(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (isComplete || !isVisible) return null;

  return (
    <section
      className={`landing-experience-container ${
        hasRevealed ? 'landing-revealed' : ''
      } ${isTransitioning ? 'landing-transitioning' : ''}`}
      aria-hidden={isTransitioning}
      style={{
        opacity: isTransitioning ? Math.max(1 - transitionProgress * 1.15, 0) : 1,
        transform: isTransitioning ? `translateY(${-transitionProgress * 30}px)` : 'none',
        filter: isTransitioning ? `blur(${transitionProgress * 8}px)` : 'none',
      }}
    >
      {/* Level 1: Desktop Physical Custom Cursor */}
      <CustomCursor isHovered={isCTAHovered} />

      {/* Level 2: GPU Radial Illumination Spotlight */}
      <Spotlight />

      {/* Layer 1: WebGL 3D Canvas Layer with Transition Camera Push */}
      <LandingCanvas
        transitionProgress={transitionProgress}
        isTransitioning={isTransitioning}
      />

      {/* Layer 2: Atmosphere, Grid & Vignette Overlay */}
      <Atmosphere />

      {/* Layer 4: Minimal Header */}
      <header className="landing-header" role="banner">
        <HeroMetadataLeft />
        <HeroMetadataRight />
      </header>

      {/* Layer 3: Central Editorial Typography */}
      <HeroTypography />

      {/* Layer 5: Interactive CTA */}
      <PortfolioCTA
        onEnterPortfolio={startTransition}
        onHoverChange={setIsCTAHovered}
        isTransitioning={isTransitioning}
        isComplete={isComplete}
      />
    </section>
  );
}
