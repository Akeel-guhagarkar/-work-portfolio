import React, { useState, useEffect, useRef } from 'react';
import LandingExperience from './components/LandingExperience/LandingExperience';
import Navigation from './components/Navigation';
import PortraitColumn from './components/PortraitColumn';
import HeroContent from './components/HeroContent';
import FeaturedWork from './components/FeaturedWork';
import CertificatesSection from './components/CertificatesSection';
import ConnectSection from './components/ConnectSection';
import GlobalBackground from './components/GlobalBackground';
import Footer from './components/Footer';
import { useSmoothScroll } from './hooks/useSmoothScroll';

import './styles/tokens.css';
import './styles/landing.css';
import './styles/global.css';
import './styles/responsive.css';
import './App.css';

export default function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionProgress, setTransitionProgress] = useState(0);
  const [overlayPhase, setOverlayPhase] = useState('hidden'); // 'hidden' | 'expanding' | 'full' | 'contracting' | 'done'
  const overlayTimers = useRef([]);

  // Initialize standard-level smooth inertia scrolling when viewing portfolio
  useSmoothScroll(!showLanding);

  const clearAllTimers = () => {
    overlayTimers.current.forEach(clearTimeout);
    overlayTimers.current = [];
  };

  const handleTransitionStart = () => {
    setIsTransitioning(true);
    setTransitionProgress(0);
    // Phase 1 — iris starts expanding (after slight click-register delay)
    const t1 = setTimeout(() => setOverlayPhase('expanding'), 400);
    // Phase 2 — iris covers full screen
    const t2 = setTimeout(() => setOverlayPhase('full'), 1800);
    overlayTimers.current.push(t1, t2);
  };

  const handleProgress = (progress) => {
    setTransitionProgress(progress);
  };

  const handleEnterPortfolio = () => {
    // Phase 3 — hold full black for a beat, then iris contracts away
    const t3 = setTimeout(() => {
      setOverlayPhase('contracting');
      setShowLanding(false);
      setIsTransitioning(false);
      setTransitionProgress(1);
      window.dispatchEvent(new CustomEvent('portfolio-revealed'));
    }, 500);
    // Phase 4 — cleanup after reveal completes & trigger fallback reveal check
    const t4 = setTimeout(() => {
      setOverlayPhase('done');
      window.dispatchEvent(new CustomEvent('portfolio-revealed'));
    }, 1500);
    overlayTimers.current.push(t3, t4);
  };

  const handleReturnToLanding = () => {
    clearAllTimers();
    setOverlayPhase('hidden');
    setShowLanding(true);
    setIsTransitioning(false);
    setTransitionProgress(0);
  };

  // Manage body scrollbar lock when landing screen is active vs portfolio
  useEffect(() => {
    if (showLanding) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showLanding]);

  // Cleanup timers on unmount
  useEffect(() => () => clearAllTimers(), []);

  // Overlay scale & opacity maps — iris must reach scale(2) to cover full viewport
  const overlayStyles = {
    hidden:      { transform: 'scale(0.01)', opacity: 0,   pointerEvents: 'none', display: 'none' },
    expanding:   { transform: 'scale(2)',    opacity: 1,   pointerEvents: 'all',  display: 'block' },
    full:        { transform: 'scale(2)',    opacity: 1,   pointerEvents: 'all',  display: 'block' },
    contracting: { transform: 'scale(0.01)', opacity: 1,   pointerEvents: 'none', display: 'block' },
    done:        { transform: 'scale(0.01)', opacity: 0,   pointerEvents: 'none', display: 'none' },
  };
  const currentOverlay = overlayStyles[overlayPhase] || overlayStyles.hidden;

  // Portfolio reveals after overlay covers screen
  const portfolioOpacity = !showLanding ? 1 : 0;
  const portfolioTranslateY = !showLanding ? 0 : 30;

  return (
    <div className="app-container">

      {/* ── Cinematic Iris Portal Transition Overlay ── */}
      <div
        className="transition-portal-overlay"
        aria-hidden="true"
        style={{
          display: currentOverlay.display,
          transform: currentOverlay.transform,
          opacity: currentOverlay.opacity,
          pointerEvents: currentOverlay.pointerEvents,
          transition:
            overlayPhase === 'hidden'
              ? 'none'
              : overlayPhase === 'expanding'
              ? 'transform 1.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s ease'
              : overlayPhase === 'full'
              ? 'none'
              : overlayPhase === 'contracting'
              ? 'transform 1.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease 1.5s'
              : 'opacity 0.3s ease',
        }}
      />

      {/* ── Phase 4 Cinematic Landing Experience & Transition Bridge ── */}
      {showLanding && (
        <LandingExperience
          isVisible={showLanding}
          onEnterPortfolio={handleEnterPortfolio}
          onTransitionStart={handleTransitionStart}
          onProgress={handleProgress}
        />
      )}

      {/* Floating trigger to return to landing screen */}
      {!showLanding && (
        <button
          type="button"
          className="landing-reentry-trigger"
          onClick={handleReturnToLanding}
          aria-label="Return to Landing Experience"
          title="Return to Landing Screen"
        >
          &larr; LANDING SCREEN
        </button>
      )}

      {/* ── Existing Portfolio Experience (Synchronized Animated Reveal) ── */}
      <div
        className={`portfolio-content-wrapper ${!showLanding ? 'portfolio-revealed' : 'portfolio-hidden'}`}
        style={{ pointerEvents: !showLanding ? 'auto' : 'none' }}
      >
        {/* One Reusable Global Animated Digital Background System */}
        <GlobalBackground />

        {/* Top Glassmorphic Navigation */}
        <Navigation />

        {/* Main Portfolio Container */}
        <main className="profile-layout-container">
          {/* Top Hero Section — 40% Left Portrait / 60% Right Content Split */}
          <section className="hero-grid-wrapper">
            <div className="portrait-column-wrapper">
              <PortraitColumn />
            </div>
            <div className="content-column-wrapper">
              <HeroContent />
            </div>
          </section>

          {/* Full-Width Section 01: Featured Work Showcase */}
          <div className="full-width-section-wrapper">
            <FeaturedWork />
          </div>

          {/* Full-Width Section 02: Certifications & Proof Credentials */}
          <div className="full-width-section-wrapper">
            <CertificatesSection />
          </div>

          {/* Full-Width Section 03: Let's Connect & Contact Form */}
          <div className="full-width-section-wrapper">
            <ConnectSection />
          </div>
        </main>

        {/* Minimal Editorial Footer */}
        <Footer />
      </div>
    </div>
  );
}


