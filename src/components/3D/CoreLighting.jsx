import * as THREE from 'three';
import { CORE_CONFIG } from './CoreConfig';

/**
 * 3D System: CoreLighting (Phase 2 Cinematic Lighting System)
 * Configures Key Light, Fill Light, Rim Light, and Subtle Accent Point Light.
 */
export function createCoreLighting(scene) {
  const lightingGroup = new THREE.Group();

  // 1. Soft Ambient Fill Light
  const ambientLight = new THREE.AmbientLight(
    0xffffff,
    0.65
  );
  lightingGroup.add(ambientLight);

  // 2. Main Key Directional Light (Upper-Right)
  const keyLight = new THREE.DirectionalLight(
    0xffffff,
    2.2
  );
  keyLight.position.set(6, 8, 5);
  lightingGroup.add(keyLight);

  // 3. Cinematic Rim Light (Behind/Lower-Left)
  const rimLight = new THREE.DirectionalLight(
    0x93c5fd,
    3.2
  );
  rimLight.position.set(-6, -4, -4);
  lightingGroup.add(rimLight);

  // 4. Subtle Ice Blue Accent Point Light
  const accentLight = new THREE.PointLight(
    0x38bdf8,
    2.0,
    14
  );
  accentLight.position.set(0, 1.5, 3);
  lightingGroup.add(accentLight);

  scene.add(lightingGroup);

  return {
    lightingGroup,
    ambientLight,
    keyLight,
    rimLight,
    accentLight,

    update: (time, isReduced) => {
      if (isReduced) return;
      // Very slow orbit of rim light to create evolving edge reflections
      rimLight.position.x = Math.sin(time * 0.15) * 6 - 2;
      rimLight.position.y = Math.cos(time * 0.1) * 4 - 2;
    },

    dispose: () => {
      scene.remove(lightingGroup);
    },
  };
}
