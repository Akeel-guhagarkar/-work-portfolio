import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import './ProjectMeta.css';

export default function ProjectMeta({ number, name, category, description, url }) {
  return (
    <div className="project-meta-container">
      
      {/* Header Metadata: Number & Category */}
      <div className="project-meta-header">
        <span className="project-number-badge">{number}</span>
        <span className="project-category-label">{category}</span>
      </div>

      {/* Main Title & Description */}
      <div className="project-meta-body">
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="project-title-link"
        >
          <h3 className="project-meta-title">{name}</h3>
        </a>
        <p className="project-meta-description">{description}</p>
      </div>

      {/* Action CTA Link */}
      <div className="project-meta-footer">
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="project-action-link"
          aria-label={`View live project ${name}`}
        >
          <span className="action-label">VIEW PROJECT</span>
          <ArrowUpRight size={16} className="action-arrow-icon" />
        </a>
      </div>

    </div>
  );
}
