import React from 'react';
import { ExternalLink } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';
import portfolioImg from '../assets/images/project-01-portfolio.jpg';
import mauliImg from '../assets/images/project-02-mauli.jpg';
import cleanmaxImg from '../assets/images/project-03-cleanmax.jpg';
import './FeaturedWork.css';

export default function FeaturedWork() {
  useScrollReveal('.reveal-on-scroll', 0.15);

  const projects = [
    {
      id: '01',
      title: 'My Portfolio',
      subtitle: 'Projects | Skills | Experience',
      tags: ['React', 'CSS3', 'Vite'],
      urlDisplay: 'akeel-guhagarkar.github.io/my-portfolio/',
      url: 'https://akeel-guhagarkar.github.io/my-portfolio/',
      image: portfolioImg
    },
    {
      id: '02',
      title: 'Mauli Homestay',
      subtitle: 'Hotel & Hospitality Platform',
      tags: ['Web App', 'Responsive', 'Booking'],
      urlDisplay: 'maulihomestay.com',
      url: 'https://maulihomestay.com/',
      image: mauliImg
    },
    {
      id: '03',
      title: 'CleanMax Dashboard',
      subtitle: 'O&M Service Dashboard',
      tags: ['Solar O&M', 'Analytics', 'Dashboard'],
      urlDisplay: 'akeel-guhagarkar.github.io/cleanmax-dashboard/',
      url: 'https://akeel-guhagarkar.github.io/cleanmax-dashboard/',
      image: cleanmaxImg
    }
  ];

  return (
    <section id="featured-work" className="featured-work-section reveal-on-scroll" aria-label="Featured Work Showcase">
      
      {/* Section Header with Line Divider */}
      <div className="section-header-line-row">
        <div className="header-left">
          <h2 className="header-title-text">FEATURED WORK</h2>
        </div>
        <div className="header-line"></div>
        <span className="header-right-label">WEB SOLUTIONS FOR A BETTER TOMORROW</span>
        <span className="mobile-swipe-hint">SWIPE ↔</span>
      </div>

      {/* 3 Horizontal Cards Grid */}
      <div className="featured-cards-grid">
        {projects.map((project) => (
          <a
            key={project.id}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="featured-project-card"
            aria-label={`Open project ${project.title}`}
          >
            {/* Browser Window Shell Top Bar */}
            <div className="browser-window-header">
              <div className="window-dots">
                <span className="dot dot-red"></span>
                <span className="dot dot-yellow"></span>
                <span className="dot dot-green"></span>
              </div>
              <span className="window-url-text">{project.urlDisplay}</span>
              <ExternalLink size={13} className="window-link-icon" />
            </div>

            {/* Card Image Frame */}
            <div className="card-image-wrapper">
              <img 
                src={project.image} 
                alt={`${project.title} screenshot preview`} 
                className="card-image"
                loading="lazy"
              />
              <div className="image-hover-glass">
                <span className="view-project-btn">VIEW LIVE SITE ↗</span>
              </div>
            </div>

            {/* Card Details */}
            <div className="card-details">
              <div className="card-title-row">
                <div className="title-text-group">
                  <div className="card-meta-row">
                    <span className="project-id-badge">{project.id}</span>
                    <span className="card-subtitle">{project.subtitle}</span>
                  </div>
                  <h3 className="card-title">{project.title}</h3>
                </div>
              </div>

              {/* Tech Tags Row */}
              <div className="card-tags-row">
                {project.tags.map((tag, idx) => (
                  <span key={idx} className="project-tag-pill">{tag}</span>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>

    </section>
  );
}
