import React from 'react';
import ProjectPreview from './ProjectPreview';
import ProjectMeta from './ProjectMeta';
import './ProjectShowcase.css';

export default function ProjectShowcase({ project }) {
  const isImageRight = project.layout === 'imageRight';

  return (
    <article className={`project-showcase-row ${isImageRight ? 'layout-image-right' : 'layout-image-left'}`}>
      
      {/* Visual Preview Column */}
      <div className="showcase-preview-column">
        <ProjectPreview 
          image={project.image} 
          name={project.name} 
          url={project.url} 
        />
      </div>

      {/* Editorial Content Meta Column */}
      <div className="showcase-meta-column">
        <ProjectMeta 
          number={project.number}
          name={project.name}
          category={project.category}
          description={project.description}
          url={project.url}
        />
      </div>

    </article>
  );
}
