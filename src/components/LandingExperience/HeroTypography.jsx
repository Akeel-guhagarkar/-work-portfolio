import React from 'react';

/**
 * Landing Experience: HeroTypography
 * Large Editorial Headline & Identity Stack.
 */
export default function HeroTypography() {
  return (
    <div className="landing-content">
      {/* Brand Identity Name */}
      <p className="landing-brand-name reveal-element delay-name">
        AKEEL GUHAGARKAR
      </p>

      {/* Large Editorial Hero Headline */}
      <h1 className="landing-hero-statement">
        <span className="statement-line reveal-element delay-headline-1">
          TURNING IDEAS
        </span>
        <br />
        <span className="statement-line statement-accent reveal-element delay-headline-2">
          INTO DIGITAL IMPACT
        </span>
      </h1>

      {/* Professional Identity Bar */}
      <div className="landing-roles-bar reveal-element delay-roles">
        <span>WEB DEVELOPER</span>
        <span className="role-separator" aria-hidden="true">&bull;</span>
        <span>UI/UX DESIGNER</span>
        <span className="role-separator" aria-hidden="true">&bull;</span>
        <span>DASHBOARD DEVELOPER</span>
      </div>
    </div>
  );
}
