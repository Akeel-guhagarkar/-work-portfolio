import React from 'react';
import IITDelhiLogo from './icons/IITDelhiLogo';
import './CredentialCard.css';

export default function CredentialCard() {
  const handleClick = () => {
    const elem = document.getElementById('credentials');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div 
      id="hero-credential-card" 
      className="credential-section-compact" 
      aria-label="IIT Delhi Certification"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      style={{ cursor: 'pointer' }}
      title="Click to view Certifications & Proof section"
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
    >
      <div className="credential-pill-card-compact">
        
        {/* Left Seal Icon */}
        <div className="seal-icon-wrapper-compact">
          <IITDelhiLogo size={36} />
          <div className="verified-check-badge-compact" title="Verified Credentials">✓</div>
        </div>

        {/* Right Info */}
        <div className="credential-info-compact">
          <div className="credential-header-row-compact">
            <h3 className="credential-pill-title-compact">IIT Delhi Certified</h3>
            <span className="certified-tag-compact">VERIFIED // 2026</span>
          </div>
          <div className="credential-pill-skills-compact">
            <span className="skill-chip-compact">Artificial Intelligence</span>
            <span className="skill-chip-compact">Machine Learning</span>
          </div>
        </div>

      </div>
    </div>
  );
}
