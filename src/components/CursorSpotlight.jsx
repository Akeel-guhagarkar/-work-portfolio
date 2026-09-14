import React, { useEffect, useState } from 'react';
import './CursorSpotlight.css';

export default function CursorSpotlight() {
  const [pos, setPos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    let animationFrameId;
    let targetX = -1000;
    let targetY = -1000;

    const handleMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const updateSpotlight = () => {
      setPos((prev) => ({
        x: prev.x + (targetX - prev.x) * 0.15,
        y: prev.y + (targetY - prev.y) * 0.15,
      }));
      animationFrameId = requestAnimationFrame(updateSpotlight);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animationFrameId = requestAnimationFrame(updateSpotlight);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      className="cursor-spotlight-layer"
      style={{
        background: `radial-gradient(650px circle at ${pos.x}px ${pos.y}px, rgba(0, 82, 255, 0.16), rgba(37, 99, 235, 0.08) 45%, transparent 80%)`,
      }}
      aria-hidden="true"
    />
  );
}
