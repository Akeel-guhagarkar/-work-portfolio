import React from 'react';
import ParticleBackground from './ParticleBackground';
import CursorSpotlight from './CursorSpotlight';
import './GlobalBackground.css';

export default function GlobalBackground() {
  return (
    <div className="global-background-container" aria-hidden="true">
      {/* Top-to-Bottom Animated Blue Light Wave Sweep */}
      <div className="global-blue-beam-layer" />

      {/* Continuous Page-Wide Ambient Radial Glow Orbs */}
      <div className="global-radial-orbs-layer" />

      {/* SVG Continuous Geometric Accents & Network Constellation System */}
      <div className="global-svg-network-layer">
        <svg
          className="global-network-svg"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
        >
          <defs>
            <linearGradient id="globalLineGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0052FF" stopOpacity="0.25" />
              <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.02" />
            </linearGradient>
            <linearGradient id="globalLineGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#6366F1" stopOpacity="0.20" />
              <stop offset="50%" stopColor="#0052FF" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#00D4AA" stopOpacity="0.03" />
            </linearGradient>
          </defs>

          {/* ── SECTION 1: HERO NETWORK CONSTELLATION (0% - 20%) ── */}
          <line x1="12%" y1="4%" x2="42%" y2="9%" stroke="rgba(0, 82, 255, 0.16)" strokeWidth="1.2" strokeDasharray="5 5" />
          <line x1="42%" y1="9%" x2="82%" y2="6%" stroke="rgba(0, 82, 255, 0.14)" strokeWidth="1.2" />
          <line x1="82%" y1="6%" x2="90%" y2="14%" stroke="rgba(59, 130, 246, 0.14)" strokeWidth="1.2" strokeDasharray="4 4" />

          <circle cx="12%" cy="4%" r="4.5" className="network-node pulse-delay-1" />
          <circle cx="42%" cy="9%" r="5" className="network-node pulse-delay-2" />
          <circle cx="82%" cy="6%" r="4" className="network-node pulse-delay-3" />
          <circle cx="90%" cy="14%" r="4.5" className="network-node pulse-delay-4" />

          {/* Inter-Section Vertical Threading Line 1 -> 2 */}
          <line x1="90%" y1="14%" x2="15%" y2="26%" stroke="url(#globalLineGrad1)" strokeWidth="1.2" strokeDasharray="8 6" />

          {/* ── SECTION 2: FEATURED WORK SHOWCASE CONSTELLATION (25% - 48%) ── */}
          <line x1="15%" y1="26%" x2="55%" y2="32%" stroke="rgba(0, 82, 255, 0.16)" strokeWidth="1.2" strokeDasharray="6 6" />
          <line x1="55%" y1="32%" x2="88%" y2="29%" stroke="rgba(0, 82, 255, 0.14)" strokeWidth="1.2" />
          <line x1="88%" y1="29%" x2="72%" y2="40%" stroke="rgba(59, 130, 246, 0.14)" strokeWidth="1.2" strokeDasharray="5 5" />
          <line x1="72%" y1="40%" x2="22%" y2="47%" stroke="rgba(0, 82, 255, 0.13)" strokeWidth="1.2" />

          <circle cx="15%" cy="26%" r="4.5" className="network-node pulse-delay-2" />
          <circle cx="55%" cy="32%" r="5" className="network-node pulse-delay-4" />
          <circle cx="88%" cy="29%" r="4" className="network-node pulse-delay-1" />
          <circle cx="72%" cy="40%" r="4.5" className="network-node pulse-delay-3" />
          <circle cx="22%" cy="47%" r="4" className="network-node pulse-delay-5" />

          {/* Inter-Section Vertical Threading Line 2 -> 3 */}
          <line x1="22%" y1="47%" x2="80%" y2="55%" stroke="url(#globalLineGrad2)" strokeWidth="1.2" strokeDasharray="8 6" />

          {/* ── SECTION 3: CERTIFICATIONS & PROOF CONSTELLATION (52% - 72%) ── */}
          <line x1="80%" y1="55%" x2="48%" y2="60%" stroke="rgba(0, 82, 255, 0.16)" strokeWidth="1.2" />
          <line x1="48%" y1="60%" x2="18%" y2="58%" stroke="rgba(59, 130, 246, 0.14)" strokeWidth="1.2" strokeDasharray="4 4" />
          <line x1="18%" y1="58%" x2="35%" y2="68%" stroke="rgba(0, 82, 255, 0.13)" strokeWidth="1.2" />
          <line x1="35%" y1="68%" x2="85%" y2="71%" stroke="rgba(0, 82, 255, 0.15)" strokeWidth="1.2" strokeDasharray="6 6" />

          <circle cx="80%" cy="55%" r="5" className="network-node pulse-delay-3" />
          <circle cx="48%" cy="60%" r="4.5" className="network-node pulse-delay-1" />
          <circle cx="18%" cy="58%" r="4" className="network-node pulse-delay-5" />
          <circle cx="35%" cy="68%" r="4.5" className="network-node pulse-delay-2" />
          <circle cx="85%" cy="71%" r="5" className="network-node pulse-delay-4" />

          {/* Inter-Section Vertical Threading Line 3 -> 4 */}
          <line x1="85%" y1="71%" x2="18%" y2="78%" stroke="url(#globalLineGrad1)" strokeWidth="1.2" strokeDasharray="8 6" />

          {/* ── SECTION 4 & 5: LET'S CONNECT & FOOTER CONSTELLATION (75% - 98%) ── */}
          <line x1="18%" y1="78%" x2="58%" y2="83%" stroke="rgba(0, 82, 255, 0.16)" strokeWidth="1.2" strokeDasharray="6 6" />
          <line x1="58%" y1="83%" x2="90%" y2="80%" stroke="rgba(59, 130, 246, 0.14)" strokeWidth="1.2" />
          <line x1="90%" y1="80%" x2="75%" y2="92%" stroke="rgba(0, 82, 255, 0.14)" strokeWidth="1.2" strokeDasharray="5 5" />
          <line x1="75%" y1="92%" x2="30%" y2="96%" stroke="rgba(0, 82, 255, 0.15)" strokeWidth="1.2" />
          <line x1="30%" y1="96%" x2="82%" y2="98%" stroke="rgba(59, 130, 246, 0.13)" strokeWidth="1.2" strokeDasharray="4 4" />

          <circle cx="18%" cy="78%" r="4.5" className="network-node pulse-delay-1" />
          <circle cx="58%" cy="83%" r="5" className="network-node pulse-delay-4" />
          <circle cx="90%" cy="80%" r="4" className="network-node pulse-delay-2" />
          <circle cx="75%" cy="92%" r="5" className="network-node pulse-delay-5" />
          <circle cx="30%" cy="96%" r="4.5" className="network-node pulse-delay-3" />
          <circle cx="82%" cy="98%" r="5" className="network-node pulse-delay-1" />
        </svg>
      </div>

      {/* Interactive 60 FPS HTML5 Canvas Floating Particles */}
      <ParticleBackground />

      {/* Cursor Spotlight (Desktop mouse tracking glow) */}
      <CursorSpotlight />
    </div>
  );
}
