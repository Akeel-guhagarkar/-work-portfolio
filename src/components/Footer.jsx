import React from 'react';
import { ArrowUp } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer" aria-label="Footer Line">
      <div className="footer-container">
        <div className="footer-tagline-block">
          <span className="footer-tagline-reference">MODERN WEBSITES</span>
          <span className="footer-sep">•</span>
          <span className="footer-tagline-reference">INTELLIGENT SOLUTIONS</span>
          <span className="footer-sep">•</span>
          <span className="footer-tagline-reference">MEASURABLE IMPACT</span>
          <div className="footer-accent-tick"></div>
        </div>

        <div className="footer-meta-block">
          <span className="copyright-text">© {new Date().getFullYear()} AKEEL GUHAGARKAR. ALL RIGHTS RESERVED.</span>
          <button onClick={scrollToTop} className="scroll-top-btn" aria-label="Scroll to top of page">
            <span>TOP</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
