import React, { useState } from 'react';
import { ArrowUpRight, Mail, Phone, MapPin, Copy, Check } from 'lucide-react';
import LinkedinIcon from './icons/LinkedinIcon';
import useScrollReveal from '../hooks/useScrollReveal';
import './ConnectSection.css';

export default function ConnectSection() {
  useScrollReveal('.reveal-on-scroll', 0.15);

  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText('guhagarkarakeel@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleGetInTouch = () => {
    const subject = encodeURIComponent('Hello Akeel — Let\'s Connect!');
    const body = encodeURIComponent(
      'Hi Akeel,\n\nI came across your portfolio and would love to get in touch.\n\n'
    );
    window.location.href = `mailto:guhagarkarakeel@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="connect" className="connect-section reveal-on-scroll" aria-label="Let's Connect Section">

      {/* Section Header with Line Divider */}
      <div className="section-header-line-row">
        <div className="header-left">
          <h2 className="header-title-text">LET'S CONNECT</h2>
        </div>
        <div className="header-line"></div>
        <span className="header-right-label">ALWAYS OPEN TO OPPORTUNITIES</span>
      </div>

      {/* Copy Toast Notification */}
      {copiedEmail && (
        <div className="toast-notification animate-bounce-in">
          <Check size={16} />
          <span>Email copied to clipboard!</span>
        </div>
      )}

      {/* Quick Direct Info Chips Bar */}
      <div className="connect-info-chips-bar">
        <div className="info-chip copy-chip" onClick={handleCopyEmail} title="Click to copy email">
          <Mail size={14} className="chip-icon" />
          <span>guhagarkarakeel@gmail.com</span>
          <Copy size={12} className="copy-icon" />
        </div>
        <a href="tel:+918275177216" className="info-chip">
          <Phone size={14} className="chip-icon" />
          <span>+91 82751 77216</span>
        </a>
        <div className="info-chip">
          <MapPin size={14} className="chip-icon" />
          <span>Ratnagiri, MH • India</span>
        </div>
      </div>

      {/* 2 Horizontal Cards Grid */}
      <div className="connect-cards-grid">

        {/* Card 01: LinkedIn */}
        <a
          href="https://www.linkedin.com/in/akeel-guhagarkar-b37b25315"
          target="_blank"
          rel="noopener noreferrer"
          className="connect-pill-card"
          aria-label="LinkedIn Profile"
        >
          <div className="connect-card-left">
            <div className="connect-blue-icon-box">
              <LinkedinIcon size={22} />
            </div>
            <div className="connect-card-text">
              <h3 className="connect-card-title">LinkedIn</h3>
              <span className="connect-card-url">linkedin.com/in/akeel-guhagarkar-b37b25315</span>
            </div>
          </div>
          <div className="card-arrow-wrapper">
            <ArrowUpRight size={18} className="connect-arrow-icon" />
          </div>
        </a>

        {/* Card 02: Get in Touch — opens mail client directly */}
        <div
          onClick={handleGetInTouch}
          className="connect-pill-card get-in-touch-card"
          aria-label="Email Akeel directly"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleGetInTouch()}
        >
          <div className="connect-card-left">
            <div className="connect-blue-icon-box">
              <Mail size={22} />
            </div>
            <div className="connect-card-text">
              <h3 className="connect-card-title">Get in Touch</h3>
              <span className="connect-card-url">Opens your mail app → guhagarkarakeel@gmail.com</span>
            </div>
          </div>
          <div className="card-arrow-wrapper">
            <ArrowUpRight size={18} className="connect-arrow-icon" />
          </div>
        </div>

      </div>

    </section>
  );
}
