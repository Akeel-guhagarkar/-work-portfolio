import React from 'react';
import { ArrowUp } from 'lucide-react';
import { smoothScrollTo } from '../hooks/useSmoothScroll';
import './Footer.css';

export default function Footer() {
  const scrollToTop = () => {
    smoothScrollTo(0, { duration: 1.5 });
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
