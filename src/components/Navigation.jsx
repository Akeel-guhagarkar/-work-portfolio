import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import './Navigation.css';

export default function Navigation() {
  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const elem = document.getElementById(targetId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="site-navigation" aria-label="Main Navigation">
      <div className="nav-container">
        <a 
          href="#hero" 
          className="nav-brand" 
          aria-label="Akeel Guhagarkar Home"
          onClick={(e) => handleNavClick(e, 'hero')}
        >
          <span className="brand-dot"></span>
          <span className="brand-name">AKEEL GUHAGARKAR</span>
        </a>

        <nav className="nav-menu">
          <a 
            href="#featured-work" 
            className="nav-link"
            onClick={(e) => handleNavClick(e, 'featured-work')}
          >
            Work
          </a>
          <a 
            href="#credentials" 
            className="nav-link"
            onClick={(e) => handleNavClick(e, 'credentials')}
          >
            Credentials
          </a>
          <a 
            href="#connect" 
            className="nav-link"
            onClick={(e) => handleNavClick(e, 'connect')}
          >
            Connect
          </a>
          <a 
            href="https://akeel-guhagarkar.github.io/my-portfolio/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="nav-cta-link"
          >
            Portfolio <ArrowUpRight size={14} className="icon-arrow" />
          </a>
        </nav>
      </div>
    </header>
  );
}
