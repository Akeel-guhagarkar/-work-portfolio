import React from 'react';
import './ProjectPreview.css';

export default function ProjectPreview({ image, name, url }) {
  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="project-preview-wrapper"
      aria-label={`Open live project preview for ${name}`}
    >
      <div className="project-preview-frame">
        <img 
          src={image} 
          alt={`Visual screenshot preview of ${name}`}
          className="project-preview-img"
          loading="lazy"
        />
        <div className="project-preview-overlay"></div>
      </div>
    </a>
  );
}
