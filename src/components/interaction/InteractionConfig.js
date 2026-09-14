/**
 * Centralized Interaction Configuration for Phase 3
 * Controls cursor physics, core responsiveness, magnetic CTA strength,
 * particle velocity decay, and environmental parallax limits.
 */
export const INTERACTION_CONFIG = {
  // ── Custom Cursor & Velocity Physics ──
  cursor: {
    dotLerp: 0.35,        // Fast tracking for central dot
    ringLerp: 0.14,       // Smooth inertia tracking for outer ring
    velocityDecay: 0.9,   // Exponential decay rate for velocity (0.0 to 1.0)
    hoverRingScale: 1.6,  // Ring scale multiplier when hovering CTA
  },

  // ── Spotlight Physics ──
  spotlight: {
    lerp: 0.1,            // Smooth light follow speed
    sizePx: 480,          // Radius of radial illumination
    opacity: 0.65,        // Max opacity over environment
  },

  // ── 3D Digital Core Mouse Response ──
  core: {
    maxTiltXDeg: 3.5,     // Max tilt angle around X axis (deg)
    maxTiltYDeg: 4.5,     // Max tilt angle around Y axis (deg)
    followShiftX: 0.25,   // Max horizontal position shift
    followShiftY: 0.2,    // Max vertical position shift
    velocityInfluence: 1.5,// Multiplier for high-velocity mouse movement
  },

  // ── Lighting Mouse Response ──
  lighting: {
    keyLightShiftX: 2.5,  // Max X shift of key light following cursor
    keyLightShiftY: 2.0,  // Max Y shift of key light following cursor
    rimLightShiftX: -2.0, // Inverse shift of rim light for edge highlights
  },

  // ── Environmental & Typography Parallax Limits (px) ──
  parallax: {
    backgroundPx: 2,      // Subtle background grid shift
    atmospherePx: 4,      // Atmospheric depth radial gradient shift
    typographyPx: 3,      // Headline text parallax shift
  },

  // ── CTA Magnetic Interaction ──
  magneticCTA: {
    radiusPx: 120,        // Proximity radius to activate magnetic pull
    maxOffsetPx: 6,       // Maximum magnetic button translation limit (px)
    lerp: 0.18,           // Magnetic pull smoothness
  },

  // ── Particle Field Interaction ──
  particle: {
    count: 180,
    mouseInfluence: 0.08,
    velocityResponse: 0.4,
  },
};
