import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  hue: number;     // 15-45 for warm orange/amber palette
  alpha: number;
  baseAlpha: number;
}

// Smooth easing for cursor-follow
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

interface InteractiveFoundryCanvasProps {
  darkMode?: boolean;
}

export const InteractiveFoundryCanvas: React.FC<InteractiveFoundryCanvasProps> = ({ darkMode = true }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDarkRef = useRef(darkMode);

  useEffect(() => {
    isDarkRef.current = darkMode;
  }, [darkMode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf: number;
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    // Smoothed mouse (lerps to actual position)
    const mouse = { x: W * 0.5, y: H * 0.3, tx: W * 0.5, ty: H * 0.3, inside: false };

    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    const onMove = (e: MouseEvent) => {
      mouse.tx = e.clientX;
      mouse.ty = e.clientY;
      mouse.inside = true;
    };
    const onLeave = () => { mouse.inside = false; };

    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);

    // ── Spawn particles ────────────────────────────────────────────────
    const COUNT = Math.min(70, Math.floor((W * H) / 15000));
    const particles: Particle[] = Array.from({ length: COUNT }, () => {
      const baseAlpha = Math.random() * 0.45 + 0.25;
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.55,
        vy: (Math.random() - 0.5) * 0.55,
        radius: Math.random() * 2.5 + 1,
        hue: 15 + Math.random() * 35, // 15° (red-orange) → 50° (amber)
        alpha: baseAlpha,
        baseAlpha,
      };
    });

    // ── Aurora gradient anchors (slowly drifting) ──────────────────────
    let auroraT = 0;

    const drawAurora = () => {
      auroraT += 0.003;
      const isDark = isDarkRef.current;

      // Left orb — deep forge orange
      const cx1 = W * 0.25 + Math.sin(auroraT * 0.7) * W * 0.12;
      const cy1 = H * 0.35 + Math.cos(auroraT * 0.5) * H * 0.1;
      const g1 = ctx.createRadialGradient(cx1, cy1, 0, cx1, cy1, W * 0.42);
      g1.addColorStop(0, isDark ? 'rgba(250, 82, 15, 0.18)' : 'rgba(240, 110, 40, 0.16)');
      g1.addColorStop(0.45, isDark ? 'rgba(204, 58, 5, 0.09)' : 'rgba(250, 160, 60, 0.08)');
      g1.addColorStop(1, 'transparent');
      ctx.fillStyle = g1;
      ctx.beginPath();
      ctx.arc(cx1, cy1, W * 0.42, 0, Math.PI * 2);
      ctx.fill();

      // Right orb — amber / gold
      const cx2 = W * 0.78 + Math.sin(auroraT * 0.4 + 2) * W * 0.1;
      const cy2 = H * 0.55 + Math.cos(auroraT * 0.6 + 1) * H * 0.14;
      const g2 = ctx.createRadialGradient(cx2, cy2, 0, cx2, cy2, W * 0.38);
      g2.addColorStop(0, isDark ? 'rgba(255, 161, 16, 0.15)' : 'rgba(255, 175, 55, 0.14)');
      g2.addColorStop(0.5, isDark ? 'rgba(255, 138, 0, 0.07)' : 'rgba(245, 145, 30, 0.07)');
      g2.addColorStop(1, 'transparent');
      ctx.fillStyle = g2;
      ctx.beginPath();
      ctx.arc(cx2, cy2, W * 0.38, 0, Math.PI * 2);
      ctx.fill();

      // Bottom accent — deep crimson for warmth
      const cx3 = W * 0.5 + Math.sin(auroraT * 0.35 + 4) * W * 0.15;
      const cy3 = H * 0.82 + Math.sin(auroraT * 0.5) * H * 0.06;
      const g3 = ctx.createRadialGradient(cx3, cy3, 0, cx3, cy3, W * 0.3);
      g3.addColorStop(0, isDark ? 'rgba(250, 82, 15, 0.1)' : 'rgba(225, 75, 20, 0.09)');
      g3.addColorStop(1, 'transparent');
      ctx.fillStyle = g3;
      ctx.beginPath();
      ctx.arc(cx3, cy3, W * 0.3, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawMouseSpotlight = () => {
      if (!mouse.inside) return;
      const isDark = isDarkRef.current;
      const sg = ctx.createRadialGradient(
        mouse.x, mouse.y, 0,
        mouse.x, mouse.y, 380
      );
      sg.addColorStop(0, isDark ? 'rgba(250, 82, 15, 0.10)' : 'rgba(250, 82, 15, 0.06)');
      sg.addColorStop(0.35, isDark ? 'rgba(255, 138, 0, 0.05)' : 'rgba(255, 138, 0, 0.02)');
      sg.addColorStop(1, 'transparent');
      ctx.fillStyle = sg;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 380, 0, Math.PI * 2);
      ctx.fill();
    };

    const render = () => {
      const isDark = isDarkRef.current;

      // ── Clear with background ──────────────────────────────────────────
      ctx.fillStyle = isDark ? '#0c0a09' : '#f5efe6';
      ctx.fillRect(0, 0, W, H);

      // ── Aurora layer ──────────────────────────────────────────────────
      drawAurora();

      // ── Subtle grid ───────────────────────────────────────────────────
      ctx.strokeStyle = isDark ? 'rgba(255, 200, 120, 0.04)' : 'rgba(200, 160, 100, 0.07)';
      ctx.lineWidth = 0.5;
      const GRID = 52;
      for (let x = 0; x < W; x += GRID) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for (let y = 0; y < H; y += GRID) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }

      // ── Mouse spotlight ───────────────────────────────────────────────
      drawMouseSpotlight();

      // ── Lerp mouse position ───────────────────────────────────────────
      mouse.x = lerp(mouse.x, mouse.tx, 0.06);
      mouse.y = lerp(mouse.y, mouse.ty, 0.06);

      // ── Particles ─────────────────────────────────────────────────────
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges
        if (p.x < -20) p.x = W + 20;
        else if (p.x > W + 20) p.x = -20;
        if (p.y < -20) p.y = H + 20;
        else if (p.y > H + 20) p.y = -20;

        // Mouse interaction — soft gravitation
        if (mouse.inside) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 200) {
            const force = (1 - dist / 200) * 0.4;
            p.x += (dx / dist) * force;
            p.y += (dy / dist) * force;
            p.alpha = Math.min(0.9, p.baseAlpha + (1 - dist / 200) * 0.55);

            // Beam line from particle to cursor
            const beamAlpha = (1 - dist / 200) * 0.22;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `hsla(${p.hue}, 90%, 60%, ${beamAlpha})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          } else {
            p.alpha = lerp(p.alpha, p.baseAlpha, 0.05);
          }
        } else {
          p.alpha = lerp(p.alpha, p.baseAlpha, 0.05);
        }

        // Draw node
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.shadowColor = `hsl(${p.hue}, 90%, 55%)`;
        ctx.shadowBlur = 10;
        ctx.fillStyle = `hsl(${p.hue}, 90%, 65%)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Constellation edges between neighbors
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const d2 = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (d2 < 120) {
            const la = (1 - d2 / 120) * 0.14;
            const mixHue = (p.hue + p2.hue) / 2;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `hsla(${mixHue}, 80%, 60%, ${la})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        width: '100%',
        height: '100%',
      }}
    />
  );
};
