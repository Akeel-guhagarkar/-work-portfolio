import * as THREE from 'three';

/**
 * 3D System: LightingSystem Foundation
 * Sets up ambient, directional key, and subtle accent point lighting.
 */
export function createLightingSystem(scene) {
  // Ambient fill light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);

  // Key directional light (cyan tint)
  const keyLight = new THREE.DirectionalLight(0x4da3ff, 1.2);
  keyLight.position.set(5, 5, 5);
  scene.add(keyLight);

  // Fill directional light (soft white)
  const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
  fillLight.position.set(-5, -3, -5);
  scene.add(fillLight);

  // Subtle accent point light
  const accentLight = new THREE.PointLight(0x00d4aa, 0.8, 10);
  accentLight.position.set(0, 0, 2);
  scene.add(accentLight);

  return {
    ambientLight,
    keyLight,
    fillLight,
    accentLight,
    dispose: () => {
      scene.remove(ambientLight);
      scene.remove(keyLight);
      scene.remove(fillLight);
      scene.remove(accentLight);
    },
  };
}
