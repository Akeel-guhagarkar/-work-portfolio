/**
 * Centralized Configuration for Phase 2 Digital Core & Hero Composition
 * Allows rapid artistic iteration for scale, materials, lighting, and animation timing.
 */
export const CORE_CONFIG = {
  // ── Viewport Scaling Constants ──
  scale: {
    desktop: 1.85,
    tablet: 1.4,
    mobile: 1.05,
  },

  // ── Multi-Layer Rotational Velocities (Rad/s) ──
  rotation: {
    mainCoreX: 0.25,
    mainCoreY: 0.45,
    outerShellX: -0.3,
    outerShellY: -0.55,
    innerEnergyY: 0.9,
    orbitalRingZ: 0.35,
  },

  // ── Deformed Geometry Math Parameters ──
  geometry: {
    detail: 4, // Icosahedron subdivision detail
    radius: 1.5,
    distortionFrequency: 1.8,
    distortionAmplitude: 0.28,
  },

  // ── Material Art Direction Properties ──
  materials: {
    mainCore: {
      color: 0x070b12,
      emissive: 0x061836,
      roughness: 0.16,
      metalness: 0.9,
      wireframe: false,
    },
    outerShell: {
      color: 0x4da3ff,
      emissive: 0x0a3266,
      roughness: 0.1,
      metalness: 0.95,
      wireframe: true,
      opacity: 0.55,
    },
    innerEnergy: {
      color: 0x4da3ff,
      emissive: 0x1a75ff,
      emissiveIntensity: 1.8,
      roughness: 0.1,
    },
    orbitalRing: {
      color: 0x4da3ff,
      opacity: 0.45,
    },
  },

  // ── Cinematic Lighting Intensities ──
  lighting: {
    ambientIntensity: 0.55,
    keyLightColor: 0xffffff,
    keyLightIntensity: 1.8,
    rimLightColor: 0x4da3ff,
    rimLightIntensity: 3.6,
    accentPointColor: 0x00d4aa,
    accentPointIntensity: 1.5,
  },

  // ── Entrance Reveal Timeline (Seconds) ──
  revealTimeline: {
    atmosphereDelay: 0.2,
    coreDelay: 0.4,
    nameDelay: 1.2,
    headlineDelay: 1.5,
    rolesDelay: 1.9,
    ctaDelay: 2.3,
  },
};
