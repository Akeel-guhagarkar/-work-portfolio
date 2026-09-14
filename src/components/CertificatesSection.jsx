import React, { useState } from 'react';
import { ShieldCheck, X, ZoomIn, CheckCircle2, ExternalLink } from 'lucide-react';
import IITDelhiLogo from './icons/IITDelhiLogo';
import useScrollReveal from '../hooks/useScrollReveal';
import mlCertImage from '../assets/images/ml-certificate.jpg';
import aiCertImage from '../assets/images/ai-certificate.jpg';
import './CertificatesSection.css';

export default function CertificatesSection() {
  useScrollReveal('.reveal-on-scroll', 0.15);
  const [selectedCert, setSelectedCert] = useState(null);

  const certificates = [
    {
      id: 'cert-01',
      title: 'Artificial Intelligence (AI)',
      subtitle: 'AI Applications & System Architecture',
      issuer: 'eDC IIT Delhi & Indian Institute of Placement',
      date: '15 Apr, 2026',
      badge: 'OFFICIAL // VERIFIED',
      skills: ['Generative AI', 'Cybersecurity AI', 'Medical Image Analysis', 'Predictive Maintenance'],
      credentialId: '2905457',
      description: 'Certificate of Completion in Artificial Intelligence with hands-on training in real-world AI applications (Privacy Risk Assessment, Cybersecurity Threat Detection, Energy Forecasting, Medical Image Analysis, Predictive Maintenance).',
      logoType: 'iit',
      image: aiCertImage,
      externalUrl: 'https://www.linkedin.com/posts/akeel-guhagarkar-b37b25315_artificialintelligence-machinelearning-aiprojects-activity-7451109896139272193-nWx9?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFAUHhsB_XIYSfEqZPIRPY0XaMPzBDsu9h0'
    },
    {
      id: 'cert-02',
      title: 'Machine Learning (ML)',
      subtitle: 'ML Models & Predictive Analytics',
      issuer: 'eDC IIT Delhi & Indian Institute of Placement',
      date: '21 Apr, 2026',
      badge: 'OFFICIAL // VERIFIED',
      skills: ['Machine Learning', 'Fraud Detection', 'Churn Prediction', 'Sentiment Analysis', 'Price Regression'],
      credentialId: '2905467',
      description: 'Certificate of Completion in Machine Learning with hands-on training in real-world ML applications (Credit Card Fraud Detection, Customer Churn, Sentiment Analysis, Student Performance, House Price Prediction).',
      logoType: 'iit',
      image: mlCertImage,
      externalUrl: 'https://lnkd.in/p/dt94DnuJ'
    }
  ];

  const handleCardClick = (cert, e) => {
    if (cert.externalUrl) {
      window.open(cert.externalUrl, '_blank', 'noopener,noreferrer');
    } else {
      setSelectedCert(cert);
    }
  };

  return (
    <section id="credentials" className="certificates-section reveal-on-scroll" aria-label="IIT Delhi Certifications">
      
      {/* Section Header with Line Divider */}
      <div className="section-header-line-row">
        <div className="header-left">
          <h2 className="header-title-text">CERTIFICATIONS & PROOF</h2>
        </div>
        <div className="header-line"></div>
        <span className="header-right-label">IIT DELHI VERIFIED CREDENTIALS</span>
      </div>

      {/* Grid of 3 Certificates */}
      <div className="certificates-grid">
        {certificates.map((cert) => (
          <div 
            key={cert.id}
            className={`certificate-card ${cert.externalUrl ? 'has-external-link' : ''}`}
            onClick={(e) => handleCardClick(cert, e)}
            role="button"
            tabIndex={0}
            aria-label={`View certificate ${cert.title}`}
            onKeyDown={(e) => e.key === 'Enter' && handleCardClick(cert, e)}
          >
            {/* Top Seal Header */}
            <div className="cert-card-header">
              <div className="cert-issuer-seal">
                <IITDelhiLogo size={34} />
              </div>
              <div className="cert-badge-pill">
                <ShieldCheck size={13} className="shield-icon" />
                <span>{cert.badge}</span>
              </div>
            </div>

            {/* Certificate Graphic Shell */}
            <div className="cert-preview-shell">
              {cert.image ? (
                <img src={cert.image} alt={`${cert.title} Certificate`} className="cert-preview-img" loading="lazy" decoding="async" />
              ) : (
                <div className="cert-paper-mockup">
                  <div className="cert-watermark">IIT DELHI</div>
                  <div className="cert-inner-border">
                    <div className="cert-mock-header">
                      <span className="cert-org">IIT DELHI</span>
                      <span className="cert-year">{cert.date}</span>
                    </div>
                    <h4 className="cert-mock-title">{cert.title}</h4>
                    <p className="cert-mock-recipient">Awarded to <strong>Akeel Guhagarkar</strong></p>
                    <div className="cert-id-tag">ID: {cert.credentialId}</div>
                  </div>
                </div>
              )}
              <div className="cert-hover-overlay">
                <div className="zoom-btn">
                  {cert.externalUrl ? (
                    <>
                      <ExternalLink size={16} />
                      <span>OPEN LINKEDIN POST</span>
                    </>
                  ) : (
                    <>
                      <ZoomIn size={16} />
                      <span>INSPECT PROOF</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Certificate Meta Details */}
            <div className="cert-details">
              <div className="cert-title-row">
                <h3 className="cert-title">{cert.title}</h3>
                {cert.externalUrl && <ExternalLink size={15} className="external-link-icon" />}
              </div>
              <p className="cert-issuer-text">{cert.issuer}</p>
              <p className="cert-description">{cert.description}</p>
              
              <div className="cert-tags-row">
                {cert.skills.map((skill, idx) => (
                  <span key={idx} className="cert-skill-pill">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox / Modal for Proof Inspection */}
      {selectedCert && (
        <div className="cert-modal-backdrop" onClick={() => setSelectedCert(null)}>
          <div className="cert-modal-card" onClick={(e) => e.stopPropagation()}>
            <button 
              className="cert-modal-close" 
              onClick={() => setSelectedCert(null)}
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            <div className="cert-modal-header">
              <div className="cert-modal-title-group">
                <div className="cert-verified-pill">
                  <CheckCircle2 size={16} />
                  <span>IIT DELHI VERIFIED PROOF</span>
                </div>
                <h3>{selectedCert.title}</h3>
                <p>{selectedCert.issuer} • {selectedCert.date}</p>
              </div>
            </div>

            {/* Full-size certificate document view */}
            <div className="cert-document-view">
              {selectedCert.image ? (
                <div className="cert-real-doc-wrapper">
                  <img src={selectedCert.image} alt={selectedCert.title} className="cert-modal-full-img" />
                </div>
              ) : (
                <div className="cert-doc-paper">
                  <div className="doc-top-bar">
                    <div className="doc-seal">
                      <IITDelhiLogo size={48} />
                    </div>
                    <div className="doc-verified-stamp">OFFICIAL IIT DELHI CREDENTIAL</div>
                  </div>
                  <div className="doc-body">
                    <span className="doc-subtitle">CERTIFICATE OF ACHIEVEMENT</span>
                    <h2>{selectedCert.title}</h2>
                    <p className="doc-presented">This is to certify that</p>
                    <h3 className="doc-name">AKEEL GUHAGARKAR</h3>
                    <p className="doc-desc">{selectedCert.description}</p>
                    
                    <div className="doc-footer-meta">
                      <div>
                        <span className="meta-label">CREDENTIAL ID</span>
                        <span className="meta-val">{selectedCert.credentialId}</span>
                      </div>
                      <div>
                        <span className="meta-label">STATUS</span>
                        <span className="meta-val status-green">✓ Active & Verified</span>
                      </div>
                      <div>
                        <span className="meta-label">ISSUING BODY</span>
                        <span className="meta-val">{selectedCert.issuer}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="cert-modal-footer">
              {selectedCert.externalUrl ? (
                <a 
                  href={selectedCert.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cert-linkedin-btn"
                >
                  <ExternalLink size={16} />
                  <span>VIEW LINKEDIN POST & PROOF ↗</span>
                </a>
              ) : (
                <p className="cert-modal-note">
                  ✓ Official Certificate Credential ID: <code>{selectedCert.credentialId}</code>
                </p>
              )}
            </div>
          </div>
        </div>
      )}

    </section>
  );
}

