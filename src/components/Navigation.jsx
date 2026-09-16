import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Briefcase, ShieldCheck, Mail } from 'lucide-react';
import { smoothScrollTo } from '../hooks/useSmoothScroll';
import './Navigation.css';

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('hero');

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    smoothScrollTo(`#${targetId}`, { offset: -70 });
    setActiveSection(targetId);
  };

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const sections = ['hero', 'featured-work', 'credentials', 'connect'];
          const scrollPosition = window.scrollY + 200;

          for (let i = sections.length - 1; i >= 0; i--) {
            const elem = document.getElementById(sections[i]);
            if (elem && elem.offsetTop <= scrollPosition) {
              setActiveSection(sections[i]);
              break;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Glassmorphic Navigation Header */}
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
            <span className="brand-name-mobile">AKEEL</span>
          </a>

          <nav className="nav-menu">
            <a 
              href="#featured-work" 
              className={`nav-link ${activeSection === 'featured-work' ? 'is-active' : ''}`}
              onClick={(e) => handleNavClick(e, 'featured-work')}
            >
              Work
            </a>
            <a 
              href="#credentials" 
              className={`nav-link ${activeSection === 'credentials' ? 'is-active' : ''}`}
              onClick={(e) => handleNavClick(e, 'credentials')}
            >
              Credentials
            </a>
            <a 
              href="#connect" 
              className={`nav-link ${activeSection === 'connect' ? 'is-active' : ''}`}
              onClick={(e) => handleNavClick(e, 'connect')}
            >
              Connect
            </a>
            <a 
              href="https://akeel-guhagarkar.github.io/my-portfolio/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="nav-cta-link"
              aria-label="Open Full Portfolio"
            >
              <span className="desktop-text">Portfolio</span>
              <ArrowUpRight size={14} className="icon-arrow" />
            </a>
          </nav>
        </div>
      </header>

      {/* Floating Bottom Glass Navigation Dock for Smartphones (Android & iPhone) */}
      <nav className="mobile-bottom-dock" aria-label="Mobile Bottom Navigation Dock">
        <div className="dock-container">
          <a
            href="#featured-work"
            className={`dock-item ${activeSection === 'featured-work' ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, 'featured-work')}
            aria-label="Navigate to Featured Work"
          >
            <Briefcase size={18} className="dock-icon" />
            <span className="dock-label">Work</span>
          </a>
          
          <a
            href="#credentials"
            className={`dock-item ${activeSection === 'credentials' ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, 'credentials')}
            aria-label="Navigate to Credentials & Proof"
          >
            <ShieldCheck size={18} className="dock-icon" />
            <span className="dock-label">Credentials</span>
          </a>

          <a
            href="#connect"
            className={`dock-item ${activeSection === 'connect' ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, 'connect')}
            aria-label="Navigate to Connect section"
          >
            <Mail size={18} className="dock-icon" />
            <span className="dock-label">Connect</span>
          </a>
        </div>
      </nav>
    </>
  );
}
