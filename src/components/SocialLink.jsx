import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import LinkedinIcon from './icons/LinkedinIcon';
import './Buttons.css';

export default function SocialLink({ label = "LinkedIn", url = "https://www.linkedin.com/in/akeel-guhagarkar-b37b25315" }) {
  return (
    <a 
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="social-pill-link"
      aria-label={`Connect on ${label}`}
    >
      <LinkedinIcon size={14} className="social-icon" />
      <span>{label}</span>
      <ArrowUpRight size={12} className="social-arrow" />
    </a>
  );
}
