import React from 'react';
import CredentialCard from './CredentialCard';
import './HeroContent.css';

export default function HeroContent() {
  return (
    <section id="hero" className="hero-section" aria-label="Akeel Guhagarkar Profile Header">
      
      {/* Top Category Bar */}
      <div className="hero-top-category-bar animate-fade-in-up delay-1">
        <div className="category-pills">
          <span>WEB</span>
          <span className="bar-sep">|</span>
          <span>AI</span>
          <span className="bar-sep">|</span>
          <span>DESIGN</span>
          <span className="bar-sep">|</span>
          <span>AUTOMATION</span>
        </div>
      </div>

      {/* Main Identity & Centered Cursive Block */}
      <div className="hero-identity-center animate-fade-in-up delay-2">
        <div className="hero-name-block">
          <h1 className="hero-name-display text-display-large">
            <span className="hero-name-navy">AKEEL </span>
            <span className="hero-name-blue">GUHAGARKAR</span>
          </h1>
        </div>

        {/* Cursive Accent Callout Centered Directly Below Name */}
        <div className="hero-cursive-callout-centered animate-fade-in-up delay-3">
          <div className="floating-tagline-container">
            <div className="cursive-wrapper">
              <svg className="sparkle-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="#7C3AED" />
              </svg>
              <span className="cursive-tagline">Turning Ideas into Digital Reality.</span>
            </div>
            <svg className="cursive-underline-hero" viewBox="0 0 220 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 12C60 3 160 4 216 13" stroke="#7C3AED" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Credential Card Directly Below Cursive Tagline */}
        <div className="hero-credential-wrapper animate-fade-in-up delay-4">
          <CredentialCard />
        </div>
      </div>

    </section>
  );
}
