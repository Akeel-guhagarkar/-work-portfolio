import { useRef, useEffect } from 'react';
import { useMousePosition } from './useMousePosition';
import { useCursorVelocity } from './useCursorVelocity';
import { INTERACTION_CONFIG } from './InteractionConfig';

/**
 * Custom Hook: useCoreInteraction
 * Maps mouse position, velocity, and parallax offsets for the 3D Digital Core & Lights.
 */
export function useCoreInteraction() {
  const mouse = useMousePosition();
  const velocityRef = useCursorVelocity();

  const coreTransformRef = useRef({
    rotX: 0,
    rotY: 0,
    posX: 0,
    posY: 0,
    keyLightX: 6,
    keyLightY: 8,
    rimLightX: -6,
  });

  useEffect(() => {
    const c = INTERACTION_CONFIG.core;
    const l = INTERACTION_CONFIG.lighting;

    // Convert normalized mouse coords (-1 to +1) to degrees and position shifts
    const targetRotX = mouse.normalizedY * (c.maxTiltXDeg * (Math.PI / 180));
    const targetRotY = mouse.normalizedX * (c.maxTiltYDeg * (Math.PI / 180));

    const targetPosX = mouse.normalizedX * c.followShiftX;
    const targetPosY = mouse.normalizedY * c.followShiftY;

    const targetKeyX = 6 + mouse.normalizedX * l.keyLightShiftX;
    const targetKeyY = 8 + mouse.normalizedY * l.keyLightShiftY;
    const targetRimX = -6 + mouse.normalizedX * l.rimLightShiftX;

    let animId;
    const lerpPhysics = () => {
      const current = coreTransformRef.current;

      // Smooth damping interpolation (0.06 lerp speed)
      current.rotX += (targetRotX - current.rotX) * 0.06;
      current.rotY += (targetRotY - current.rotY) * 0.06;
      current.posX += (targetPosX - current.posX) * 0.05;
      current.posY += (targetPosY - current.posY) * 0.05;

      current.keyLightX += (targetKeyX - current.keyLightX) * 0.05;
      current.keyLightY += (targetKeyY - current.keyLightY) * 0.05;
      current.rimLightX += (targetRimX - current.rimLightX) * 0.05;

      animId = requestAnimationFrame(lerpPhysics);
    };

    animId = requestAnimationFrame(lerpPhysics);

    return () => cancelAnimationFrame(animId);
  }, [mouse.normalizedX, mouse.normalizedY]);

  return {
    coreTransformRef,
    velocityRef,
    normalizedMouse: mouse,
  };
}
