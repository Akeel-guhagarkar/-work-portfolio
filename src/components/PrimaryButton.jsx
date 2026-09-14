import React from 'react';
import { ArrowRight } from 'lucide-react';
import './Buttons.css';

export default function PrimaryButton({ label = "VIEW MY WORK", targetId = "featured-work", onClick }) {
  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
      return;
    }
    if (targetId) {
      e.preventDefault();
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <a 
      href={`#${targetId}`} 
      onClick={handleClick}
      className="btn btn-primary-editorial"
      aria-label={label}
    >
      <span className="btn-label-text">{label}</span>
      <ArrowRight size={16} className="btn-arrow-icon" />
    </a>
  );
}
