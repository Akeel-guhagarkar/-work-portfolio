import React, { useRef, useEffect } from 'react';
import portraitImg from '../assets/images/akeel-portrait.jpg';
import './PortraitColumn.css';

export default function PortraitColumn() {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotateX = ((y - cy) / cy) * -6;
      const rotateY = ((x - cx) / cx) * 6;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    };

    const handleMouseLeave = () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <aside className="portrait-container animate-reveal-portrait" aria-label="Akeel Guhagarkar Portrait">

      {/* Glowing ambient orb behind card */}
      <div className="portrait-ambient-orb" />

      {/* Rotating gradient ring */}
      <div className="portrait-ring-wrapper">
        <div className="portrait-ring" />
      </div>

      {/* Main 3D tilt card */}
      <div className="portrait-card" ref={cardRef}>

        {/* Corner bracket accents */}
        <div className="corner-bracket top-left">+</div>
        <div className="corner-bracket top-right">+</div>
        <div className="corner-bracket bottom-left">+</div>
        <div className="corner-bracket bottom-right">+</div>

        <div className="portrait-image-frame">
          <img
            src={portraitImg}
            alt="Akeel Guhagarkar Editorial Portrait"
            className="portrait-image"
            loading="eager"
            decoding="async"
          />

          {/* Cinematic gradient vignette */}
          <div className="portrait-glass-overlay" />

          {/* Hover shimmer scan line */}
          <div className="portrait-shimmer" />
        </div>

        {/* Bottom cursive text inside card */}
        <div className="cursive-tagline-bottom">
          <span className="cursive-text">Let's Build Together.</span>
          <svg className="cursive-underline-svg" viewBox="0 0 160 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 8C40 2 120 3 158 9" stroke="#0052FF" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>


    </aside>
  );
}
