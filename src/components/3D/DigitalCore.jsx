import * as THREE from 'three';
import { CORE_CONFIG } from './CoreConfig';

/**
 * 3D System: DigitalCore (Awwwards Studio Luxury Upgrade)
 * Ultra-refined obsidian crystal and liquid chrome 3D hero sculpture:
 * 1. Liquid Obsidian & Chrome Core with dynamic harmonic fluid deformation
 * 2. Platinum-Blue Wireframe Cyber Lattice
 * 3. Sapphire Luminescent Energy Pulse
 * 4. Dual Minimalist Orbital Rings
 */

export function createDigitalCore(scene) {
  const group = new THREE.Group();

  // ── 1. Main Solid Liquid Obsidian Core ──
  const mainGeometry = new THREE.IcosahedronGeometry(
    CORE_CONFIG.geometry.radius,
    5 // High subdivision detail for fluid deformation
  );

  const posAttribute = mainGeometry.attributes.position;
  const basePositions = new Float32Array(posAttribute.count * 3);
  for (let i = 0; i < posAttribute.count * 3; i++) {
    basePositions[i] = posAttribute.array[i];
  }

  const mainMaterial = new THREE.MeshStandardMaterial({
    color: 0x0f172a, // Deep slate obsidian metal
    emissive: 0x1e293b, // Subtle dark slate glow
    roughness: 0.12,
    metalness: 0.95,
    wireframe: false,
    transparent: true,
    opacity: 0.98,
  });

  const mainMesh = new THREE.Mesh(mainGeometry, mainMaterial);
  group.add(mainMesh);

  // ── 2. Outer Platinum-Blue Wireframe Lattice ──
  const outerGeometry = new THREE.IcosahedronGeometry(
    CORE_CONFIG.geometry.radius * 1.3,
    3
  );
  const outerMaterial = new THREE.MeshStandardMaterial({
    color: 0x93c5fd, // Platinum ice blue wireframe
    emissive: 0x1d4ed8,
    roughness: 0.08,
    metalness: 0.95,
    wireframe: true,
    transparent: true,
    opacity: 0.45,
  });

  const outerMesh = new THREE.Mesh(outerGeometry, outerMaterial);
  group.add(outerMesh);

  // ── 3. Internal Luminescent Sapphire Core ──
  const innerGeometry = new THREE.IcosahedronGeometry(
    CORE_CONFIG.geometry.radius * 0.52,
    3
  );
  const innerMaterial = new THREE.MeshStandardMaterial({
    color: 0x3b82f6,
    emissive: 0x2563eb,
    emissiveIntensity: 1.6,
    roughness: 0.1,
    wireframe: false,
    transparent: true,
    opacity: 0.9,
  });

  const innerMesh = new THREE.Mesh(innerGeometry, innerMaterial);
  group.add(innerMesh);

  // ── 4. Primary Platinum Orbital Ring ──
  const ring1Geometry = new THREE.TorusGeometry(
    CORE_CONFIG.geometry.radius * 1.62,
    0.012,
    16,
    120
  );
  const ring1Material = new THREE.MeshBasicMaterial({
    color: 0x93c5fd,
    transparent: true,
    opacity: 0.45,
  });
  const ring1Mesh = new THREE.Mesh(ring1Geometry, ring1Material);
  ring1Mesh.rotation.x = Math.PI / 3.2;
  ring1Mesh.rotation.y = Math.PI / 6;
  group.add(ring1Mesh);

  // ── 5. Secondary Ice Blue Orbital Ring ──
  const ring2Geometry = new THREE.TorusGeometry(
    CORE_CONFIG.geometry.radius * 2.0,
    0.009,
    16,
    120
  );
  const ring2Material = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.35,
  });
  const ring2Mesh = new THREE.Mesh(ring2Geometry, ring2Material);
  ring2Mesh.rotation.x = -Math.PI / 3.8;
  ring2Mesh.rotation.y = -Math.PI / 2.8;
  group.add(ring2Mesh);

  scene.add(group);

  let revealProgress = 1; // Default to fully visible instantly
  const tempVec = new THREE.Vector3();

  return {
    group,
    mainMesh,
    outerMesh,
    innerMesh,
    ring1Mesh,
    ring2Mesh,

    setRevealProgress: (progress) => {
      revealProgress = Math.min(Math.max(progress, 0), 1);
      const scale = Math.max(revealProgress, 0.001);
      group.scale.set(scale, scale, scale);
      mainMaterial.opacity = 0.98 * revealProgress;
      outerMaterial.opacity = 0.45 * revealProgress;
    },

    update: (time, isReducedMotion) => {
      if (isReducedMotion) return;

      // Real-Time Dynamic Harmonic Fluid Morphing
      const positions = mainGeometry.attributes.position;
      const count = positions.count;
      const amplitude = 0.18;
      const speed = 1.2;

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        tempVec.set(basePositions[i3], basePositions[i3 + 1], basePositions[i3 + 2]);
        const length = tempVec.length();
        tempVec.normalize();

        const displacement =
          Math.sin(tempVec.x * 2.2 + time * speed) *
          Math.cos(tempVec.y * 2.2 + time * speed * 0.9) *
          Math.sin(tempVec.z * 2.2 + time * speed * 1.1) *
          amplitude;

        const newLen = length + displacement;
        positions.setXYZ(i, tempVec.x * newLen, tempVec.y * newLen, tempVec.z * newLen);
      }
      positions.needsUpdate = true;
      mainGeometry.computeVertexNormals();

      // Rotations & Animations
      const r = CORE_CONFIG.rotation;

      mainMesh.rotation.x = Math.sin(time * 0.35) * 0.2 + time * r.mainCoreX;
      mainMesh.rotation.y = time * r.mainCoreY;

      outerMesh.rotation.x = time * r.outerShellX;
      outerMesh.rotation.y = Math.cos(time * 0.3) * 0.25 + time * r.outerShellY;

      innerMesh.rotation.y = -time * r.innerEnergyY;
      innerMesh.rotation.z = Math.sin(time * 0.5) * 0.2;

      ring1Mesh.rotation.z = time * r.orbitalRingZ;
      ring2Mesh.rotation.z = -time * r.orbitalRingZ * 1.3;

      // Gentle vertical float
      group.position.y = Math.sin(time * 1.3) * 0.15;

      // Breathing luminescence pulse
      innerMaterial.emissiveIntensity = 1.5 + Math.sin(time * 2.0) * 0.4;
    },

    dispose: () => {
      scene.remove(group);
      mainGeometry.dispose();
      mainMaterial.dispose();
      outerGeometry.dispose();
      outerMaterial.dispose();
      innerGeometry.dispose();
      innerMaterial.dispose();
      ring1Geometry.dispose();
      ring1Material.dispose();
      ring2Geometry.dispose();
      ring2Material.dispose();
    },
  };
}


