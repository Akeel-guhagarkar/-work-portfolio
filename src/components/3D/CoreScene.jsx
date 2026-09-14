import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { createCoreLighting } from './CoreLighting';
import { createDigitalCore } from './DigitalCore';
import { createParticleField } from './ParticleField';
import { CORE_CONFIG } from './CoreConfig';
import { useCoreInteraction } from '../interaction/useCoreInteraction';
import { useReducedMotion } from '../interaction/useReducedMotion';

/**
 * 3D System: CoreScene Orchestration Component (Robust React 19 Render Engine)
 * Handles Three.js initialization with static mount effect (no array size changes),
 * Page Visibility API optimization, and smooth frame loop rendering.
 */
export default function CoreScene({ transitionProgress = 0, isTransitioning = false }) {
  const canvasRef = useRef(null);
  const { coreTransformRef, velocityRef, normalizedMouse } = useCoreInteraction();
  const prefersReducedMotion = useReducedMotion();

  // Stable Refs to prevent useEffect re-instantiation crashes
  const mouseRef = useRef(normalizedMouse);
  useEffect(() => {
    mouseRef.current = normalizedMouse;
  }, [normalizedMouse]);

  const reducedMotionRef = useRef(prefersReducedMotion);
  useEffect(() => {
    reducedMotionRef.current = prefersReducedMotion;
  }, [prefersReducedMotion]);

  const transitionRef = useRef({ transitionProgress, isTransitioning });
  useEffect(() => {
    transitionRef.current = { transitionProgress, isTransitioning };
  }, [transitionProgress, isTransitioning]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // 1. Three.js Scene Setup & Fog
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05070a, 0.012);

    // 2. Camera Setup
    const width = canvas.clientWidth || window.innerWidth;
    const height = canvas.clientHeight || window.innerHeight;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    const startCamZ = 7.2;
    camera.position.set(0, 0, startCamZ);

    // 3. WebGL Renderer Setup with Low-Network & Hardware Adaptive Capping
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const isSlowNetwork = connection && (connection.saveData || connection.effectiveType === '2g' || connection.effectiveType === '3g');
    const isLowPowerDevice = (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4);

    const targetDPR = (isSlowNetwork || isLowPowerDevice) ? 1.0 : Math.min(window.devicePixelRatio, 1.5);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: !isSlowNetwork, // Disable antialiasing on slow networks for 2x performance
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height, false);
    renderer.setPixelRatio(targetDPR);

    // 4. Subsystems Initializations with Adaptive Detail
    const particleCount = isSlowNetwork ? 100 : 220;
    const lighting = createCoreLighting(scene);
    const digitalCore = createDigitalCore(scene);
    const particleField = createParticleField(scene, particleCount);

    const getResponsiveConfig = () => {
      const w = window.innerWidth;
      if (w < 768) return { scale: CORE_CONFIG.scale.mobile, posY: 0.1 };
      if (w < 1024) return { scale: CORE_CONFIG.scale.tablet, posY: 0 };
      return { scale: CORE_CONFIG.scale.desktop, posY: 0 };
    };

    let responsiveConfig = getResponsiveConfig();
    digitalCore.group.position.y = responsiveConfig.posY;

    // 5. Render Loop
    let animationFrameId;
    let clock = new THREE.Clock();
    let isTabVisible = true;

    let targetParallaxX = 0;
    let targetParallaxY = 0;
    let currentParallaxX = 0;
    let currentParallaxY = 0;

    const render = () => {
      if (!isTabVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const elapsedTime = clock.getElapsedTime();
      const isReduced = reducedMotionRef.current;
      const { transitionProgress: tProgress, isTransitioning: tActive } = transitionRef.current;

      // Base materialization progress — renders instantly on load
      const revealProgress = isReduced
        ? 1
        : Math.min(Math.max(elapsedTime / 0.8, 0), 1);

      const easedReveal = 1 - Math.pow(1 - revealProgress, 3);
      digitalCore.setRevealProgress(easedReveal);

      // Transition Progression Scale & Camera Push
      const baseScale = responsiveConfig.scale * easedReveal;
      const transitionScaleMultiplier = 1 + tProgress * 7.5;

      digitalCore.group.scale.set(
        baseScale * transitionScaleMultiplier,
        baseScale * transitionScaleMultiplier,
        baseScale * transitionScaleMultiplier
      );

      // Camera push-in toward core
      const targetCamZ = startCamZ - tProgress * (startCamZ - 1.4);
      camera.position.z = targetCamZ;

      // Physical mouse transforms when not transitioning
      const physics = coreTransformRef.current;
      const velocity = velocityRef.current;
      const mouse = mouseRef.current;

      if (!isReduced && !tActive && physics) {
        digitalCore.group.rotation.x = physics.rotX;
        digitalCore.group.rotation.y = physics.rotY;
        digitalCore.group.position.x = physics.posX;
        digitalCore.group.position.y = responsiveConfig.posY + physics.posY;

        lighting.keyLight.position.x = physics.keyLightX;
        lighting.keyLight.position.y = physics.keyLightY;
        lighting.rimLight.position.x = physics.rimLightX;
      }

      // Update 3D Object rotations and lighting
      const transitionRotationFactor = 1 + tProgress * 1.5;
      digitalCore.update(elapsedTime * transitionRotationFactor, isReduced);
      lighting.update(elapsedTime, isReduced);
      particleField.update(
        elapsedTime,
        isReduced,
        mouse ? mouse.normalizedX : 0,
        mouse ? mouse.normalizedY : 0,
        velocity ? velocity.speed : 0
      );

      // Camera parallax
      if (!isReduced && !tActive && mouse) {
        targetParallaxX = mouse.normalizedX * 0.35;
        targetParallaxY = mouse.normalizedY * 0.25;
      } else {
        targetParallaxX = 0;
        targetParallaxY = 0;
      }

      currentParallaxX += (targetParallaxX - currentParallaxX) * 0.04;
      currentParallaxY += (targetParallaxY - currentParallaxY) * 0.04;

      camera.position.x = currentParallaxX;
      camera.position.y = currentParallaxY;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // 6. Page Visibility API Listener
    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible) {
        clock.start();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // 7. Responsive Window Resize Handler
    const handleResize = () => {
      if (!canvas) return;
      const newWidth = canvas.clientWidth || window.innerWidth;
      const newHeight = canvas.clientHeight || window.innerHeight;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(newWidth, newHeight, false);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));

      responsiveConfig = getResponsiveConfig();
      digitalCore.group.position.y = responsiveConfig.posY;
    };

    window.addEventListener('resize', handleResize);

    // 8. Cleanup & GPU Resource Disposal
    return () => {
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('resize', handleResize);

      digitalCore.dispose();
      particleField.dispose();
      lighting.dispose();
      renderer.dispose();
    };
  }, []); // Static dependency array to ensure 100% stable mount in React 19

  return <canvas ref={canvasRef} className="landing-canvas-element" />;
}
