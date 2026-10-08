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

  // Canvas particle constellation with rose-crimson palette
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

    const particleCount = Math.min(40, Math.floor((width * height) / 32000));
    const particles: Particle[] = [];

    // Rose-crimson palette particles
    const colorsDark = [
      'rgba(206, 78, 105, ',  // primary rose
      'rgba(217, 107, 130, ', // lighter rose
      'rgba(176, 58, 84, ',   // deep crimson
      'rgba(232, 137, 156, ', // soft pink
    ];

    const colorsLight = [
      'rgba(206, 78, 105, ',
      'rgba(176, 58, 84, ',
      'rgba(140, 45, 67, ',
      'rgba(217, 107, 130, ',
    ];

    for (let i = 0; i < particleCount; i++) {
      const colors = darkMode ? colorsDark : colorsLight;
      const baseColor = colors[Math.floor(Math.random() * colors.length)];
      const radius = Math.random() * 2 + 0.8;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.38,
        vy: (Math.random() - 0.5) * 0.38,
        radius,
        baseRadius: radius,
        alpha: Math.random() * 0.55 + 0.15,
        phase: Math.random() * Math.PI * 2,
        color: baseColor,
      });
    }

    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Smooth mouse interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.07;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.07;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.phase += dt * 1.2;
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around bounds
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Mouse interaction — spring-physics soft repulsion
        if (mouseRef.current.isActive) {
          const dx = mouseRef.current.x - p.x;
          const dy = mouseRef.current.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 200;
          if (dist < maxDist && dist > 0) {
            const force = (1 - dist / maxDist) * 0.5;
            p.x -= (dx / dist) * force;
            p.y -= (dy / dist) * force;
            p.radius = p.baseRadius + (1 - dist / maxDist) * 1.8;
          } else {
            p.radius += (p.baseRadius - p.radius) * 0.08;
          }
        }

        const currentAlpha = p.alpha * (0.65 + 0.35 * Math.sin(p.phase));

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${currentAlpha})`;
        ctx.fill();

        // Connective filaments — rose-tinted
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const distSq = (p.x - p2.x) ** 2 + (p.y - p2.y) ** 2;
          const maxConnectDist = 130;
          if (distSq < maxConnectDist ** 2) {
            const dist = Math.sqrt(distSq);
            const lineAlpha = (1 - dist / maxConnectDist) * (darkMode ? 0.14 : 0.1);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = darkMode
              ? `rgba(206, 78, 105, ${lineAlpha})`
              : `rgba(176, 58, 84, ${lineAlpha})`;
            ctx.lineWidth = 0.6;
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
      {/* 1. Interactive Cursor Spotlight — Rose-crimson radial glow */}
      <div
        className="absolute w-[36rem] h-[36rem] rounded-full blur-[100px] pointer-events-none transition-opacity duration-500 ease-out will-change-transform"
        style={{
          transform: `translate3d(${cursorPos.x - 288}px, ${cursorPos.y - 288}px, 0)`,
          opacity: cursorPos.opacity * (darkMode ? 0.2 : 0.16),
          background: darkMode
            ? 'radial-gradient(circle, rgba(206, 78, 105, 0.8) 0%, rgba(176, 58, 84, 0.35) 40%, transparent 72%)'
            : 'radial-gradient(circle, rgba(206, 78, 105, 0.6) 0%, rgba(217, 107, 130, 0.3) 45%, transparent 72%)',
        }}
      />

      {/* 2. Ambient Floating Mesh Orbs — Asymmetric placement */}
      <div
        className="absolute -top-[16rem] left-[40%] -translate-x-1/2 w-[40rem] sm:w-[52rem] h-[30rem] sm:h-[36rem] rounded-full blur-[120px] sm:blur-[150px] opacity-70 animate-orb-1"
        style={{
          background: darkMode
            ? 'radial-gradient(ellipse, rgba(206, 78, 105, 0.28) 0%, rgba(176, 58, 84, 0.1) 50%, transparent 72%)'
            : 'radial-gradient(ellipse, rgba(217, 107, 130, 0.3) 0%, rgba(206, 78, 105, 0.1) 55%, transparent 78%)',
        }}
      />

      <div
        className="absolute top-[25%] -right-[14rem] w-[30rem] sm:w-[38rem] h-[30rem] sm:h-[38rem] rounded-full blur-[130px] opacity-45 animate-orb-2"
        style={{
          background: darkMode
            ? 'radial-gradient(circle, rgba(232, 137, 156, 0.18) 0%, rgba(206, 78, 105, 0.06) 50%, transparent 68%)'
            : 'radial-gradient(circle, rgba(232, 196, 154, 0.25) 0%, rgba(206, 78, 105, 0.08) 55%, transparent 72%)',
        }}
      />

      <div
        className="absolute -bottom-[12rem] -left-[10rem] w-[32rem] sm:w-[44rem] h-[32rem] sm:h-[44rem] rounded-full blur-[140px] opacity-40 animate-orb-3"
        style={{
          background: darkMode
            ? 'radial-gradient(circle, rgba(176, 58, 84, 0.22) 0%, rgba(232, 196, 154, 0.05) 55%, transparent 72%)'
            : 'radial-gradient(circle, rgba(206, 78, 105, 0.18) 0%, rgba(232, 196, 154, 0.06) 55%, transparent 72%)',
        }}
      />

      {/* 3. Interactive Canvas Particle Web */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-65" />

      {/* 4. Subtle Dot Matrix — Non-uniform pattern to break predictability */}
      <div
        className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
        style={{
          backgroundImage: `
            radial-gradient(circle, rgba(206, 78, 105, 0.35) 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px',
        }}
      />
    </div>
  );
};
