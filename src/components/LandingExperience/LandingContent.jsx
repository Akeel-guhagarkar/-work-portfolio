import React from 'react';

/**
 * Landing Experience: LandingContent
 * Luxury Editorial Typography Stack.
 */
export default function LandingContent() {
  return (
    <div className="landing-content">
      <p className="landing-brand-name">AKEEL GUHAGARKAR</p>
      
      <h1 className="landing-hero-statement">
        TURNING IDEAS <br />
        <span className="statement-accent">INTO DIGITAL IMPACT</span>
      </h1>

      <div className="landing-roles-bar">
        <span>WEB DEVELOPER</span>
        <span className="role-separator">&bull;</span>
        <span>UI/UX DESIGNER</span>
        <span className="role-separator">&bull;</span>
        <span>DASHBOARD DEVELOPER</span>
      </div>
    </div>
  );
}
