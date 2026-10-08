import React, { useRef, useState, useEffect } from 'react';
import { Layers, Activity, Brain, ShieldCheck, Sparkles, Rotate3d, Compass, Zap, Eye } from 'lucide-react';

interface PerplexityMatrix3DProps {
  darkMode: boolean;
  className?: string;
}

interface Node3D {
  id: string;
  name: string;
  role: string;
  x: number;
  y: number;
  z: number;
  radius: number;
  color: string;
  entropy: number;
  pulsePhase: number;
}

export const PerplexityMatrix3D: React.FC<PerplexityMatrix3DProps> = ({ darkMode, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const [isInteracting, setIsInteracting] = useState(false);
  const [viewMode, setViewMode] = useState<'3d' | 'plane' | 'lattice'>('3d');
  const [activeNode, setActiveNode] = useState<string | null>('humanizer');

  // Agent nodes in 3D coordinate space
  const agents: Node3D[] = [
    { id: 'manager', name: 'Manager Agent', role: 'Task Decomposition', x: -140, y: -70, z: 40, radius: 8, color: '#E8899C', entropy: 92, pulsePhase: 0 },
    { id: 'retrieval', name: 'Retrieval Agent', role: 'Empirical Grounding', x: -70, y: 80, z: -60, radius: 7, color: '#38bdf8', entropy: 88, pulsePhase: 1.2 },
    { id: 'writer', name: 'Technical Writer', role: 'Technical Synthesis', x: 80, y: -90, z: -30, radius: 8, color: '#D96B82', entropy: 84, pulsePhase: 2.4 },
    { id: 'critic', name: 'Fact Critic', role: 'Certainty Verification', x: 140, y: 50, z: 70, radius: 7, color: '#34d399', entropy: 96, pulsePhase: 3.6 },
    { id: 'humanizer', name: 'Humanizing Agent', role: 'Entropy Inversion & PR-39', x: 0, y: 0, z: 0, radius: 12, color: '#ce4e69', entropy: 99, pulsePhase: 4.8 },
  ];

  // Mouse move tilt listener
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePos((prev) => ({ ...prev, targetX: nx, targetY: ny }));
    setIsInteracting(true);
  };

  const handleMouseLeave = () => {
    setMousePos((prev) => ({ ...prev, targetX: 0, targetY: 0 }));
    setIsInteracting(false);
  };

  // 3D particle canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.offsetWidth * window.devicePixelRatio);
    let height = (canvas.height = canvas.offsetHeight * window.devicePixelRatio);
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      height = canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    window.addEventListener('resize', handleResize);

    // Generate 75 3D points in a sphere shell
    const points: { x: number; y: number; z: number; origX: number; origY: number; origZ: number; size: number; alpha: number }[] = [];
    const count = 75;
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 110 + Math.random() * 80;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      points.push({ x, y, z, origX: x, origY: y, origZ: z, size: Math.random() * 2 + 1, alpha: Math.random() * 0.5 + 0.3 });
    }

    let angleY = 0;
    let angleX = 0;
    let curX = 0;
    let curY = 0;

    const render = () => {
      // Smooth lerp mouse coordinates
      curX += (mousePos.targetX - curX) * 0.06;
      curY += (mousePos.targetY - curY) * 0.06;

      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      const fov = 380;
      const cx = canvas.offsetWidth / 2;
      const cy = canvas.offsetHeight / 2;

      angleY += 0.004 + curX * 0.008;
      angleX = curY * 0.35;

      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);

      // Projected agent nodes
      const projectedAgents = agents.map((agent) => {
        // Rotate around Y
        let x1 = agent.x * cosY - agent.z * sinY;
        let z1 = agent.z * cosY + agent.x * sinY;
        // Rotate around X
        let y2 = agent.y * cosX - z1 * sinX;
        let z2 = z1 * cosX + agent.y * sinX;

        const scale = fov / (fov + z2);
        return {
          ...agent,
          projX: cx + x1 * scale,
          projY: cy + y2 * scale,
          scale,
          z2,
        };
      });

      // Sort by depth
      projectedAgents.sort((a, b) => a.z2 - b.z2);

      // Draw connective multi-agent vectors
      const centerNode = projectedAgents.find((a) => a.id === 'humanizer');
      if (centerNode) {
        projectedAgents.forEach((ag) => {
          if (ag.id !== 'humanizer') {
            ctx.beginPath();
            ctx.moveTo(centerNode.projX, centerNode.projY);
            ctx.lineTo(ag.projX, ag.projY);
            const lineAlpha = (ag.scale * 0.35).toFixed(2);
            ctx.strokeStyle = darkMode
              ? `rgba(206, 78, 105, ${lineAlpha})`
              : `rgba(180, 50, 80, ${lineAlpha})`;
            ctx.lineWidth = ag.scale * 1.5;
            ctx.setLineDash([4, 4]);
            ctx.stroke();
            ctx.setLineDash([]);
          }
        });
      }

      // Project and render 3D points
      points.forEach((p) => {
        let x1 = p.origX * cosY - p.origZ * sinY;
        let z1 = p.origZ * cosY + p.origX * sinY;
        let y2 = p.origY * cosX - z1 * sinX;
        let z2 = z1 * cosX + p.origY * sinX;

        const scale = fov / (fov + z2);
        const px = cx + x1 * scale;
        const py = cy + y2 * scale;

        if (scale > 0) {
          ctx.beginPath();
          ctx.arc(px, py, Math.max(0.8, p.size * scale), 0, Math.PI * 2);
          const ptAlpha = Math.max(0.1, Math.min(0.9, p.alpha * scale * (darkMode ? 0.9 : 0.7)));
          ctx.fillStyle = darkMode
            ? `rgba(247, 202, 212, ${ptAlpha})`
            : `rgba(206, 78, 105, ${ptAlpha})`;
          ctx.fill();
        }
      });

      // Render 3D agent nodes
      projectedAgents.forEach((ag) => {
        const radius = Math.max(3, ag.radius * ag.scale);

        // Glow ring
        ctx.beginPath();
        ctx.arc(ag.projX, ag.projY, radius * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `${ag.color}22`;
        ctx.fill();

        // Core circle
        ctx.beginPath();
        ctx.arc(ag.projX, ag.projY, radius, 0, Math.PI * 2);
        ctx.fillStyle = ag.color;
        ctx.fill();

        // Node label
        ctx.font = `${Math.max(9, Math.round(10 * ag.scale))}px JetBrains Mono`;
        ctx.fillStyle = darkMode ? '#ffffff' : '#121013';
        ctx.textAlign = 'center';
        ctx.fillText(ag.name.replace(' Agent', ''), ag.projX, ag.projY + radius + 13);
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [darkMode, mousePos.targetX, mousePos.targetY]);

  const activeAgentInfo = agents.find((a) => a.id === activeNode) || agents[4];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`surface-card rounded-3xl p-6 sm:p-8 border dark:border-[#ce4e69]/25 border-[#CE4E69]/15 glass-card shadow-2xl relative overflow-hidden font-sans transform-gpu ${className}`}
    >
      {/* Background Accent Gradients */}
      <div
        className="absolute -top-32 -left-32 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #ce4e69 0%, #7e305f 60%, transparent 80%)' }}
      />
      <div
        className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #D96B82 0%, #E8899C 60%, transparent 80%)' }}
      />

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b dark:border-white/10 border-neutral-300 relative z-10">
        <div>
          <div className="inline-flex items-center space-x-2 text-[11px] font-mono tag-chip px-3 py-1 rounded-full mb-1.5 shadow-sm">
            <Rotate3d className="w-3.5 h-3.5 text-[#ce4e69] animate-spin" style={{ animationDuration: '10s' }} />
            <span className="font-extrabold uppercase tracking-wider text-[#ce4e69]">Interactive 3D Vector Space</span>
            <span>·</span>
            <span className="dark:text-[#E8899C] text-neutral-800 font-semibold">Realtime Perplexity Lattice</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold dark:text-white text-neutral-900 tracking-tight">
            Multi-Agent Neural Coordinates &amp; Perplexity Matrix
          </h3>
          <p className="text-xs sm:text-sm dark:text-neutral-300 text-neutral-700 font-medium mt-0.5">
            Hover and rotate the 3D space to inspect multi-agent token velocity, burstiness entropy, and factual certainty bounds.
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center space-x-1.5 tag-chip p-1 rounded-xl font-mono text-xs shrink-0 self-start sm:self-auto">
          <button
            onClick={() => setViewMode('3d')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer font-bold ${
              viewMode === '3d'
                ? 'bg-[#ce4e69] text-white shadow-sm'
                : 'dark:text-neutral-300 text-neutral-700 hover:text-black dark:hover:text-white'
            }`}
          >
            3D Orbit
          </button>
          <button
            onClick={() => setViewMode('plane')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer font-bold ${
              viewMode === 'plane'
                ? 'bg-[#ce4e69] text-white shadow-sm'
                : 'dark:text-neutral-300 text-neutral-700 hover:text-black dark:hover:text-white'
            }`}
          >
            Telemetry
          </button>
        </div>
      </div>

      {/* Main Content Asymmetric Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6 items-center relative z-10">
        
        {/* Left Column: 3D Interactive Canvas Viewport (7 Cols) */}
        <div className="lg:col-span-7 relative h-72 sm:h-88 rounded-2xl surface-deep border dark:border-white/10 border-neutral-300 overflow-hidden shadow-inner flex items-center justify-center group cursor-grab active:cursor-grabbing">
          {/* Subtle 3D Coordinate Grid Watermark */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(206, 78, 105, 0.4) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          <canvas ref={canvasRef} className="w-full h-full relative z-10" />

          {/* Interactive Gyro Hint Pill */}
          <div className="absolute bottom-3 left-3 pointer-events-none flex items-center space-x-2 text-[10px] font-mono font-semibold px-2.5 py-1 rounded-lg bg-black/60 text-white/80 backdrop-blur-md border border-white/10 z-20">
            <Compass className="w-3 h-3 text-[#E8899C]" />
            <span>Interactive 3D Gyro · Move pointer to tilt</span>
          </div>

          <div className="absolute top-3 right-3 pointer-events-none flex items-center space-x-1.5 text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#ce4e69]/20 text-[#ce4e69] border border-[#ce4e69]/30 z-20 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ce4e69] animate-ping" />
            <span>5 Active Nodes</span>
          </div>
        </div>

        {/* Right Column: High-Density Telemetry & Agent Selector (5 Cols) */}
        <div className="lg:col-span-5 space-y-4 font-mono text-xs">
          {/* Active Node Card */}
          <div className="p-4 rounded-2xl surface-deep border dark:border-[#ce4e69]/30 border-neutral-300 space-y-3 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: activeAgentInfo.color }} />
                <span className="font-serif font-bold text-base dark:text-white text-neutral-900">
                  {activeAgentInfo.name}
                </span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#ce4e69]/15 text-[#ce4e69]">
                Entropy: {activeAgentInfo.entropy}%
              </span>
            </div>

            <p className="text-[11px] font-sans dark:text-neutral-300 text-neutral-700 font-medium leading-relaxed">
              Role: <strong>{activeAgentInfo.role}</strong>. Continuously measures linguistic vector shifts against standard generative predictability surfaces.
            </p>

            {/* Micro Telemetry Metrics */}
            <div className="grid grid-cols-3 gap-2 text-center pt-1">
              <div className="surface-card p-2 rounded-xl border dark:border-white/10 border-neutral-300">
                <span className="text-[9px] uppercase font-bold text-neutral-500 block">X-Vector</span>
                <span className="font-bold dark:text-white text-neutral-900">{activeAgentInfo.x}</span>
              </div>
              <div className="surface-card p-2 rounded-xl border dark:border-white/10 border-neutral-300">
                <span className="text-[9px] uppercase font-bold text-neutral-500 block">Y-Cadence</span>
                <span className="font-bold dark:text-white text-neutral-900">{activeAgentInfo.y}</span>
              </div>
              <div className="surface-card p-2 rounded-xl border dark:border-white/10 border-neutral-300">
                <span className="text-[9px] uppercase font-bold text-neutral-500 block">Z-Fidelity</span>
                <span className="font-bold text-[#ce4e69]">{activeAgentInfo.z}</span>
              </div>
            </div>
          </div>

          {/* Agent Node Buttons List */}
          <div className="space-y-1.5">
            <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-500 block px-1">
              Select Agent Vector:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-1.5">
              {agents.map((ag) => (
                <button
                  key={ag.id}
                  onClick={() => setActiveNode(ag.id)}
                  className={`flex items-center justify-between p-2.5 rounded-xl border transition-all cursor-pointer transform-gpu active:scale-98 ${
                    activeNode === ag.id
                      ? 'bg-gradient-to-r from-[#ce4e69]/15 to-[#D96B82]/10 border-[#ce4e69] shadow-sm'
                      : 'surface-deep border-neutral-300/80 dark:border-white/5 hover:border-[#ce4e69]/40'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: ag.color }} />
                    <span className="font-bold text-[11px] dark:text-white text-neutral-900">{ag.name}</span>
                  </div>
                  <span className="text-[10px] text-neutral-500 font-semibold">{ag.role.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Platform Performance Badge */}
          <div className="p-3 rounded-xl bg-gradient-to-r from-[#ce4e69]/10 via-[#D96B82]/10 to-transparent border dark:border-[#ce4e69]/20 border-[#ce4e69]/20 flex items-center justify-between text-[11px] font-bold">
            <div className="flex items-center space-x-2">
              <Zap className="w-3.5 h-3.5 text-[#ce4e69]" />
              <span className="dark:text-white text-neutral-900">Perplexity Variance: +240%</span>
            </div>
            <span className="text-emerald-500 font-extrabold">0% AI Risk</span>
          </div>

        </div>

      </div>
    </div>
  );
};
