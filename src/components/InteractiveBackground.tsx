import React, { useEffect, useRef, useState } from 'react';

interface InteractiveBackgroundProps {
  darkMode: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  alpha: number;
  phase: number;
  color: string;
}

export const InteractiveBackground: React.FC<InteractiveBackgroundProps> = ({ darkMode }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; targetX: number; targetY: number; isActive: boolean }>({
    x: -1000,
    y: -1000,
    targetX: -1000,
    targetY: -1000,
    isActive: false,
  });

  const [cursorPos, setCursorPos] = useState<{ x: number; y: number; opacity: number }>({
    x: -500,
    y: -500,
    opacity: 0,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
      mouseRef.current.isActive = true;
      setCursorPos({ x: e.clientX, y: e.clientY, opacity: 1 });
    };

    const handleMouseLeave = () => {
      mouseRef.current.isActive = false;
      setCursorPos((prev) => ({ ...prev, opacity: 0 }));
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Canvas particle constellation & linguistic web
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particleCount = Math.min(45, Math.floor((width * height) / 28000));
    const particles: Particle[] = [];

    const colorsDark = [
      'rgba(250, 82, 15, ',
      'rgba(255, 138, 0, ',
      'rgba(255, 217, 0, ',
      'rgba(224, 68, 6, ',
    ];

    const colorsLight = [
      'rgba(230, 80, 10, ',
      'rgba(240, 120, 20, ',
      'rgba(210, 60, 0, ',
      'rgba(180, 50, 0, ',
    ];

    for (let i = 0; i < particleCount; i++) {
      const colors = darkMode ? colorsDark : colorsLight;
      const baseColor = colors[Math.floor(Math.random() * colors.length)];
      const radius = Math.random() * 2.2 + 1;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius,
        baseRadius: radius,
        alpha: Math.random() * 0.6 + 0.2,
        phase: Math.random() * Math.PI * 2,
        color: baseColor,
      });
    }

    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Lerp mouse
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      ctx.clearRect(0, 0, width, height);

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.phase += dt * 1.5;
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around bounds
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Mouse interaction (soft attraction / repulsion)
        if (mouseRef.current.isActive) {
          const dx = mouseRef.current.x - p.x;
          const dy = mouseRef.current.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 180;
          if (dist < maxDist && dist > 0) {
            const force = (1 - dist / maxDist) * 0.6;
            p.x -= (dx / dist) * force;
            p.y -= (dy / dist) * force;
            p.radius = p.baseRadius + (1 - dist / maxDist) * 2;
          } else {
            p.radius = p.baseRadius;
          }
        }

        const currentAlpha = p.alpha * (0.7 + 0.3 * Math.sin(p.phase));

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${currentAlpha})`;
        ctx.fill();

        // Draw connective filaments to close neighbors
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const distSq = (p.x - p2.x) ** 2 + (p.y - p2.y) ** 2;
          const maxConnectDist = 120;
          if (distSq < maxConnectDist ** 2) {
            const dist = Math.sqrt(distSq);
            const lineAlpha = (1 - dist / maxConnectDist) * (darkMode ? 0.16 : 0.12);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = darkMode
              ? `rgba(250, 82, 15, ${lineAlpha})`
              : `rgba(210, 70, 0, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [darkMode]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* 1. Interactive Cursor Spotlight (Tracks user pointer smoothly) */}
      <div
        className="absolute w-[38rem] h-[38rem] rounded-full blur-[100px] pointer-events-none transition-opacity duration-500 ease-out will-change-transform"
        style={{
          transform: `translate3d(${cursorPos.x - 304}px, ${cursorPos.y - 304}px, 0)`,
          opacity: cursorPos.opacity * (darkMode ? 0.22 : 0.18),
          background: darkMode
            ? 'radial-gradient(circle, rgba(250, 82, 15, 0.85) 0%, rgba(255, 138, 0, 0.4) 40%, transparent 75%)'
            : 'radial-gradient(circle, rgba(255, 140, 20, 0.7) 0%, rgba(255, 190, 60, 0.35) 45%, transparent 75%)',
        }}
      />

      {/* 2. Ambient Floating Mesh Orbs */}
      <div
        className="absolute -top-[14rem] left-1/2 -translate-x-1/2 w-[42rem] sm:w-[54rem] h-[32rem] sm:h-[38rem] rounded-full blur-[110px] sm:blur-[140px] opacity-75 animate-orb-1"
        style={{
          background: darkMode
            ? 'radial-gradient(circle, rgba(250, 82, 15, 0.3) 0%, rgba(255, 120, 10, 0.14) 50%, transparent 75%)'
            : 'radial-gradient(circle, rgba(255, 170, 40, 0.38) 0%, rgba(250, 82, 15, 0.14) 60%, transparent 80%)',
        }}
      />

      <div
        className="absolute top-[22%] -right-[12rem] w-[32rem] sm:w-[40rem] h-[32rem] sm:h-[40rem] rounded-full blur-[120px] opacity-55 animate-orb-2"
        style={{
          background: darkMode
            ? 'radial-gradient(circle, rgba(255, 140, 0, 0.22) 0%, rgba(250, 82, 15, 0.08) 50%, transparent 70%)'
            : 'radial-gradient(circle, rgba(255, 200, 80, 0.32) 0%, rgba(250, 82, 15, 0.1) 60%, transparent 75%)',
        }}
      />

      <div
        className="absolute -bottom-[10rem] -left-[12rem] w-[34rem] sm:w-[46rem] h-[34rem] sm:h-[46rem] rounded-full blur-[130px] opacity-50 animate-orb-3"
        style={{
          background: darkMode
            ? 'radial-gradient(circle, rgba(212, 62, 2, 0.25) 0%, rgba(255, 140, 0, 0.06) 60%, transparent 75%)'
            : 'radial-gradient(circle, rgba(255, 180, 70, 0.28) 0%, rgba(250, 82, 15, 0.06) 60%, transparent 75%)',
        }}
      />

      {/* 3. Interactive Canvas Particle Web */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-70" />

      {/* 4. Subtle Cyber-Grid Line Matrix */}
      <div
        className="absolute inset-0 opacity-[0.035] dark:opacity-[0.055]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(250, 82, 15, 0.25) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(250, 82, 15, 0.25) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />
    </div>
  );
};
