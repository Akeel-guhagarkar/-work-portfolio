import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import './ProjectCard.css';

export default function ProjectCard({ number, title, description, category, link }) {
  return (
    <a 
      href={link} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="project-card-link"
      aria-label={`View project ${title}`}
    >
      <article className="project-card">
        <div className="project-card-header">
          <span className="project-number">{number}</span>
          <span className="project-category">{category}</span>
        </div>

        <div className="project-card-body">
          <h3 className="project-title text-card-title">
            {title}
          </h3>
          <p className="project-description text-caption">
            {description}
          </p>
        </div>

        <div className="project-card-footer">
          <span className="project-cta-text">Explore Project</span>
          <div className="project-cta-arrow">
            <ArrowUpRight size={18} />
          </div>
        </div>
      </article>
    </a>
  );
}
