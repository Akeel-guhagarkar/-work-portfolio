import * as THREE from 'three';
import { INTERACTION_CONFIG } from '../interaction/InteractionConfig';

/**
 * 3D System: ParticleField (Awwwards Studio Luxury Upgrade)
 * Subtle, elegant platinum silver-blue spatial particles.
 */
export function createParticleField(scene, count = 220) {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count * 3; i += 3) {
    const x = (Math.random() - 0.5) * 16;
    const y = (Math.random() - 0.5) * 16;
    const z = (Math.random() - 0.5) * 12 - 2;

    positions[i] = x;
    positions[i + 1] = y;
    positions[i + 2] = z;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color: 0x93c5fd,
    size: 0.038,
    transparent: true,
    opacity: 0.35,
    sizeAttenuation: true,
  });

  const points = new THREE.Points(geometry, material);
  scene.add(points);

  let currentMouseShiftX = 0;
  let currentMouseShiftY = 0;

  return {
    points,
    update: (time, isReduced, mouseNormX = 0, mouseNormY = 0, speed = 0) => {
      if (isReduced) return;

      const speedMultiplier = 1 + Math.min(speed / 800, 1) * INTERACTION_CONFIG.particle.velocityResponse;
      const targetShiftX = mouseNormX * INTERACTION_CONFIG.particle.mouseInfluence * speedMultiplier;
      const targetShiftY = mouseNormY * INTERACTION_CONFIG.particle.mouseInfluence * speedMultiplier;

      currentMouseShiftX += (targetShiftX - currentMouseShiftX) * 0.04;
      currentMouseShiftY += (targetShiftY - currentMouseShiftY) * 0.04;

      points.rotation.y = time * 0.015 + currentMouseShiftX;
      points.rotation.x = Math.sin(time * 0.01) * 0.05 + currentMouseShiftY;
    },
    dispose: () => {
      scene.remove(points);
      geometry.dispose();
      material.dispose();
    },
  };
}


