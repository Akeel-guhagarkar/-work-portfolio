import React from 'react';

export default function IITDelhiLogo({ size = 44, className = "" }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="IIT Delhi Official Emblem"
    >
      {/* Outer Seal Circle */}
      <circle cx="50" cy="50" r="46" stroke="#0B132B" strokeWidth="4" fill="#FFFFFF" />
      <circle cx="50" cy="50" r="40" stroke="#2563EB" strokeWidth="1.5" strokeDasharray="3 2" />
      <circle cx="50" cy="50" r="36" stroke="#0B132B" strokeWidth="2" />
      
      {/* Inner Architectural Temple Emblem & Cogwheel */}
      <path d="M50 18 L68 30 L68 36 L32 36 L32 30 Z" fill="#0B132B" />
      <rect x="36" y="38" width="5" height="22" fill="#0B132B" />
      <rect x="47.5" y="38" width="5" height="22" fill="#0B132B" />
      <rect x="59" y="38" width="5" height="22" fill="#0B132B" />
      <rect x="32" y="62" width="36" height="5" fill="#0B132B" />
      <path d="M30 70 H70 L65 78 H35 Z" fill="#2563EB" />
      
      {/* Surrounding Gear Teeth Accent */}
      <circle cx="50" cy="50" r="26" stroke="#2563EB" strokeWidth="1" />
    </svg>
  );
}
