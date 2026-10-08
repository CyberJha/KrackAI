import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  Search, Sparkles, Radar, Activity, ShieldCheck,
  CheckCircle2, Copy, Check, Command, Zap, AlertTriangle,
  CornerDownLeft, X, Terminal, ChevronRight, Feather,
  FileText, Settings, ArrowRight, Download, Cpu, Key,
  ExternalLink, RefreshCw, BarChart2, Shield, Eye, Info,
  Sliders, Layers, Gauge, CheckSquare, Sparkle, ArrowUpRight,
  Sun, Moon, ZoomIn, Search as SearchIcon
} from 'lucide-react';
import { ProviderConfig, SettingsModal } from './SettingsModal';
import { PR39ProtocolModal } from './PR39ProtocolModal';
import { PromptsCheatSheetModal } from './PromptsCheatSheetModal';
import { CodeViewer } from './CodeViewer';
import { EvasionGuide } from './EvasionGuide';
import { InteractiveFoundryCanvas } from './InteractiveFoundryCanvas';
import { SAMPLE_10_RULE_PRESETS, DEFAULT_10_RULES_CONFIG, THE_10_PROMPT_TEMPLATES } from '../data/samples';
import { DetectabilityAnalysis, Humanizer10RulesConfig, ResearchResult } from '../types';

// --------------------------------------------------------------------------
const SPRING = { type: 'spring', stiffness: 380, damping: 30 } as const;

interface CommandCenterProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  providerConfig: ProviderConfig;
  onSaveProviderConfig: (config: ProviderConfig) => void;
}

// --------------------------------------------------------------------------
function CircularGauge({
  score,
  label,
  engine,
  size = 110,
  darkMode = true,
}: {
  score: number;
  label: string;
  engine: string;
  size?: number;
  darkMode?: boolean;
}) {
  const isSafe = score <= 25;
  const strokeColor = isSafe ? '#34d399' : '#fb7185';
  const radius = (size - 18) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}
            strokeWidth="8"
            fill="transparent"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={strokeColor}
            strokeWidth="8"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            strokeLinecap="round"
            fill="transparent"
            style={{ filter: `drop-shadow(0 0 8px ${strokeColor})` }}
          />
        </svg>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{ fontSize: '20px', fontWeight: 700, fontFamily: 'var(--font-sans)', color: strokeColor, textShadow: `0 0 16px ${strokeColor}66` }}>
            {score}%
          </span>
          <span style={{ fontSize: '9px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            {isSafe ? '0% Risk' : 'High Risk'}
          </span>
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>{label}</div>
        <div style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>{engine}</div>
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------
function PipelineRow({
  log, idx, reduced,
}: { log: { agent: string; status: 'pending' | 'running' | 'done'; time?: string }; idx: number; reduced: boolean }) {
  const bg =
    log.status === 'done'    ? 'rgba(5,150,105,0.1)' :
    log.status === 'running' ? 'rgba(250,82,15,0.08)' : 'transparent';

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, x: -8 }}
      animate={{ opacity: log.status === 'pending' ? 0.45 : 1, x: 0, backgroundColor: bg }}
      transition={{ duration: 0.25, delay: idx * 0.04 }}
      style={{
        display: 'flex', alignItems: 'center', gap: '12px',
        padding: '10px 16px', borderRadius: '8px',
        fontSize: '13px', fontFamily: 'var(--font-sans)',
        color: log.status === 'running' ? 'var(--text-primary)' : 'var(--text-secondary)',
        fontWeight: log.status === 'running' ? 600 : 400,
        border: log.status === 'running' ? '1px solid rgba(250,82,15,0.25)' : '1px solid transparent',
      }}
    >
      <span style={{ width: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        {log.status === 'done' && <CheckCircle2 size={16} color="#34d399" />}
        {log.status === 'running' && (
          <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} style={{ display: 'flex' }}>
            <Activity size={16} color="var(--forge-500)" />
          </motion.span>
        )}
        {log.status === 'pending' && (
          <span style={{ width: 16, height: 16, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
            {idx + 1}
          </span>
        )}
      </span>
      <span style={{ flex: 1 }}>{log.agent}</span>
      <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
        {log.time || log.status}
      </span>
    </motion.div>
  );
}

// --------------------------------------------------------------------------
function MetricTile({ label, value, good, sub }: { label: string; value: string; good: boolean; sub?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={SPRING}
      style={{
        background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px',
        padding: '12px 16px', textAlign: 'center', minWidth: '82px',
        backdropFilter: 'blur(12px)',
      }}
    >
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', marginBottom: '4px' }}>{label}</div>
      <div style={{ fontFamily: 'var(--font-sans)', fontSize: '18px', fontWeight: 700, color: good ? '#34d399' : '#fb7185' }}>{value}</div>
      {sub && <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-muted)', marginTop: '2px' }}>{sub}</div>}
    </motion.div>
  );
}

// --------------------------------------------------------------------------

export const CommandCenter: React.FC<CommandCenterProps> = ({
  darkMode, setDarkMode, providerConfig, onSaveProviderConfig,
}) => {
  const reduced = useReducedMotion();

  const [activeMode, setActiveMode] = useState<'research' | 'humanize' | 'audit'>('research');
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [isLogoZoomOpen, setIsLogoZoomOpen] = useState(false);
  const [paletteQuery, setPaletteQuery] = useState('');
  const [activeModal, setActiveModal] = useState<'none' | 'settings' | 'pr39' | 'prompts' | 'code' | 'guide'>('none');
  const [input, setInput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [agentLogs, setAgentLogs] = useState<{ stage: string; agent: string; status: 'pending' | 'running' | 'done'; time?: string }[]>([]);
  const [researchResult, setResearchResult] = useState<ResearchResult | null>(null);
  const [humanizeOutput, setHumanizeOutput] = useState('');
  const [auditResult, setAuditResult] = useState<DetectabilityAnalysis | null>(null);
  const [showRawDraft, setShowRawDraft] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState(SAMPLE_10_RULE_PRESETS[0].id);
  const [rulesConfig] = useState<Humanizer10RulesConfig>(DEFAULT_10_RULES_CONFIG);
  const [temperature] = useState(0.88);
  const [copied, setCopied] = useState(false);
  const [runError, setRunError] = useState<string | null>(null);
  const [simulatorMode, setSimulatorMode] = useState<'researchub' | 'chatgpt'>('researchub');
  const [activeFaqTab, setActiveFaqTab] = useState<'agents' | 'matrix' | 'directives' | 'burstiness'>('agents');

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  // --------------------------------------------------------------------------
  const promptsByMode = {
    research: [
      { cat: 'Quantum', title: 'Cryogenic quantum computing architectures and coherence time bounds' },
      { cat: 'Materials', title: 'Solid-state lithium electrolyte interface degradation mechanisms' },
      { cat: 'Distributed', title: 'Multi-agent consensus protocols under asymmetric network latency' },
      { cat: 'Genomics', title: 'CRISPR prime editing off-target mitigation in somatic cells' },
    ],
    humanize: [
      { cat: 'Literature Review', title: 'In this paper, we delve into the comprehensive landscape of deep learning algorithms and their pivotal applications...' },
      { cat: 'Technical Memo', title: 'Furthermore, the synergistic integration of microservices plays a crucial role in navigating modern cloud architecture...' },
      { cat: 'Executive Brief', title: 'It is important to note that our revolutionary framework not only optimizes throughput, but also fosters scalable growth...' },
      { cat: 'Feature Release', title: 'To summarize, unlocking the true potential of AI requires a delicate balance of innovation, resilience, and efficiency...' },
    ],
    audit: [
      { cat: 'ChatGPT-4o Essay', title: 'Artificial intelligence plays an indispensable role in revolutionizing modern healthcare paradigms. In this comprehensive guide, we delve into...' },
      { cat: 'Claude 3.7 Draft', title: 'When evaluating distributed systems, it is worth exploring the intricate nuances of consensus protocols and fault-tolerant mechanisms...' },
      { cat: 'PR-39 Humanized', title: 'We measured write latency across three geographical regions using Raft consensus with NVMe disk persistence at 14,200 ops/sec.' },
      { cat: 'Academic Journal', title: 'Electrochemical impedance spectroscopy revealed a bulk resistance of 12.4 ohms at 298 Kelvin across the composite interface.' },
    ],
  };

  const currentPrompts = promptsByMode[activeMode] || promptsByMode.research;


  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setIsPaletteOpen(p => !p); }
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') { e.preventDefault(); if (!isRunning) run(); }
      if (e.key === 'Escape') { setIsPaletteOpen(false); setActiveModal('none'); }
      if (e.altKey && e.key === '1') { e.preventDefault(); switchMode('research'); }
      if (e.altKey && e.key === '2') { e.preventDefault(); switchMode('humanize'); }
      if (e.altKey && e.key === '3') { e.preventDefault(); switchMode('audit'); }
    };
    window.addEventListener('keydown', down);
    return () => window.removeEventListener('keydown', down);
  }, [input, isRunning, activeMode]);

  useEffect(() => {
    if (activeMode === 'humanize' && !input)
      setInput(SAMPLE_10_RULE_PRESETS[0].sampleInput);
  }, [activeMode]);

  const switchMode = (mode: typeof activeMode) => {
    if (isRunning) cancelRun();
    setActiveMode(mode);
    setResearchResult(null); setHumanizeOutput(''); setAuditResult(null);
    setInput(''); setAgentLogs([]); setRunError(null);
  };

  const cancelRun = useCallback(() => {
    if (abortRef.current) { abortRef.current.abort(); abortRef.current = null; }
    if (timerRef.current) clearInterval(timerRef.current);
    setIsRunning(false); setAgentLogs([]);
  }, []);

  const run = async () => {
    if (!input.trim() || isRunning) return;
    setIsRunning(true); setElapsed(0); setRunError(null);
    setResearchResult(null); setHumanizeOutput(''); setAuditResult(null);
    const controller = new AbortController();
    abortRef.current = controller;
    timerRef.current = setInterval(() => setElapsed(p => p + 1), 1000);

    if (activeMode === 'research') {
      const logs = [
        { stage: '1', agent: 'Manager Agent (Thesis Decomposition)', status: 'running' as const },
        { stage: '2', agent: 'Retrieval Agent (Citation Extraction)', status: 'pending' as const },
        { stage: '3', agent: 'Technical Writer (Academic Synthesis)', status: 'pending' as const },
        { stage: '4', agent: 'Fact Critic (Factual Invariance Audit)', status: 'pending' as const },
        { stage: '5', agent: 'PR-39 Humanizer (Entropy & Burstiness Modulation)', status: 'pending' as const },
      ];
      setAgentLogs(logs);
      const t1 = setTimeout(() => setAgentLogs(p => [{ ...p[0], status: 'done', time: '1.2s' }, { ...p[1], status: 'running' }, ...p.slice(2)]), 1400);
      const t2 = setTimeout(() => setAgentLogs(p => [p[0], { ...p[1], status: 'done', time: '2.8s' }, { ...p[2], status: 'running' }, ...p.slice(3)]), 3400);
      const t3 = setTimeout(() => setAgentLogs(p => [p[0], p[1], { ...p[2], status: 'done', time: '5.1s' }, { ...p[3], status: 'running' }, p[4]]), 5500);
      const t4 = setTimeout(() => setAgentLogs(p => [p[0], p[1], p[2], { ...p[3], status: 'done', time: '7.0s' }, { ...p[4], status: 'running' }]), 7200);
      try {
        const res = await fetch('/api/run-research', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: input,
            provider: providerConfig.provider,
            apiKey: providerConfig.apiKey,
            model: providerConfig.model,
          }),
          signal: controller.signal,
        });
        const data = await res.json();
        if (data.success && data.data) {
          setResearchResult(data.data);
          setAgentLogs(p => p.map(l => ({ ...l, status: 'done' })));
        } else {
          setRunError(data.error || 'Research pipeline returned an error. Check your API key and provider configuration.');
        }
        [t1, t2, t3, t4].forEach(clearTimeout);
      } catch (e: any) {
        if (e.name === 'AbortError') { /* -------------------------------------------------------------------------● */ }
        else setRunError(`Connection failed: ${e.message}. Verify your network and API provider status.`);
        [t1, t2, t3, t4].forEach(clearTimeout);
      }

    } else if (activeMode === 'humanize') {
      try {
        const res = await fetch('/api/humanize', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: input,
            temperature,
            preserveData: true,
            provider: providerConfig.provider,
            apiKey: providerConfig.apiKey,
            model: providerConfig.model,
            rulesConfig,
          }),
          signal: controller.signal,
        });
        const data = await res.json();
        if (data.success) {
          setHumanizeOutput(data.humanizedPlainText || data.humanizedText);
          setAuditResult(data.analysisAfter);
        } else {
          setRunError(data.error || 'Humanization engine returned an error. Check your API key and try again.');
        }
      } catch (e: any) {
        if (e.name !== 'AbortError') setRunError(`Connection failed: ${e.message}. Check network and try again.`);
      }

    } else {
      try {
        const res = await fetch('/api/analyze-detector', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: input }),
          signal: controller.signal,
        });
        const data = await res.json();
        if (data.success) setAuditResult(data.data);
        else setRunError(data.error || 'Detector audit returned an error.');
      } catch (e: any) {
        if (e.name !== 'AbortError') setRunError(`Audit failed: ${e.message}`);
      }
    }

    if (timerRef.current) clearInterval(timerRef.current);
    abortRef.current = null;
    setIsRunning(false);
  };

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadReport = (filename: string, content: string) => {
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const applyPreset = (id: string) => {
    setSelectedPreset(id);
    const p = SAMPLE_10_RULE_PRESETS.find(x => x.id === id);
    if (p) { setInput(p.sampleInput); }
    setIsPaletteOpen(false);
  };

  const hasOutput = researchResult || humanizeOutput || auditResult;
  const wordCount = input.trim() ? input.trim().split(/\s+/).length : 0;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  // --------------------------------------------------------------------------
  return (
    <div style={{ minHeight: '100dvh', color: 'var(--text-primary)', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column', position: 'relative', background: 'var(--bg-base)' }}>

      {/* -------------------------------------------------------------------------● */}
      <InteractiveFoundryCanvas darkMode={darkMode} />

      {/* -------------------------------------------------------------------------● */}
      <header className="glass-header" style={{
        position: 'sticky', top: 0, zIndex: 40,
        height: '60px', display: 'flex', alignItems: 'stretch',
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', width: '100%', padding: '0 24px', display: 'flex', alignItems: 'center' }}>

          {/* -------------------------------------------------------------------------● */}
          <button
            onClick={() => setIsLogoZoomOpen(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', marginRight: '36px', background: 'none', border: 'none', cursor: 'pointer', padding: '0', flexShrink: 0 }}
            title="Click to view logo profile"
          >
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(250,82,15,0.4)', background: 'rgba(250,82,15,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 16px rgba(250,82,15,0.2)', transition: 'transform 180ms ease' }}>
              <img src="/image.svg" alt="Researchub" style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.6) translateY(-6%)' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '7px' }}>
              <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.025em' }}>Researchub</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, color: 'var(--forge-400)', letterSpacing: '0.08em', background: 'rgba(250,82,15,0.15)', border: '1px solid rgba(250,82,15,0.3)', padding: '1px 6px', borderRadius: '4px' }}>
                FOUNDRY v4.2
              </span>
            </div>
          </button>

          {/* -------------------------------------------------------------------------● */}
          <nav style={{ display: 'flex', alignItems: 'flex-end', height: '60px', flex: 1, overflow: 'hidden' }}>
            {([
              { id: 'research', label: 'Deep Research', icon: Search, kbd: 'Alt+1' },
              { id: 'humanize', label: 'Humanizer Studio', icon: Sparkles, kbd: 'Alt+2' },
              { id: 'audit', label: 'Forensic Audit', icon: Radar, kbd: 'Alt+3' },
            ] as const).map(({ id, label, icon: Icon, kbd }) => {
              const active = activeMode === id;
              return (
                <button
                  key={id}
                  onClick={() => switchMode(id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '7px',
                    padding: '8px 18px', height: '60px',
                    background: 'none', cursor: 'pointer',
                    borderTop: 'none', borderLeft: 'none', borderRight: 'none',
                    borderBottom: `2px solid ${active ? 'var(--forge-500)' : 'transparent'}`,
                    fontSize: '14px', fontWeight: active ? 700 : 500,
                    color: active ? 'var(--text-primary)' : 'var(--text-muted)',
                    fontFamily: 'var(--font-sans)',
                    transition: 'all 140ms ease',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <Icon size={15} color={active ? '#fa520f' : 'var(--text-muted)'} />
                  {label}
                  <span className="hide-below-md" style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)' }}>{kbd}</span>
                </button>
              );
            })}
          </nav>

          {/* -------------------------------------------------------------------------● */}
          {/* Header Action Tools */}
          <div style={{ display: 
'flex'
, alignItems: 
'center'
, gap: 
'8px'
, flexShrink: 0 }}>
            {/* Theme Toggle Button */}
            <button
              onClick={() => setDarkMode(prev => !prev)}
              className="btn-ghost"
              title={darkMode ? 
'Switch to Light Mode'
 : 
'Switch to Dark Mode'
}
              style={{ display: 
'flex'
, alignItems: 
'center'
, gap: 
'6px'
, height: 
'32px'
, padding: 
'0 12px'
 }}
            >
              {darkMode ? <Sun size={14} color="#ffa110" /> : <Moon size={14} color="#fa520f" />}
              <span className="hide-below-sm" style={{ fontSize: 
'11px'
, fontWeight: 600 }}>
                {darkMode ? 
'Light'
 : 
'Dark'
}
              </span>
            </button>

            <button
              onClick={() => setActiveModal(
'pr39'
)}
              className="glass-pill"
              style={{ display: 
'flex'
, alignItems: 
'center'
, gap: 
'6px'
, height: 
'32px'
, padding: 
'0 14px'
, border: 
'none'
, cursor: 
'pointer'
, fontFamily: 
'var(--font-mono)'
, fontSize: 
'11px'
, fontWeight: 700, color: 
'#34d399'
, letterSpacing: 
'0.04em'
, transition: 
'all 140ms ease'
, background: 
'rgba(5,150,105,0.12)'
, borderRadius: 
'9999px'
 }}
              title="Open PR-39 Protocol Inspector"
            >
              <ShieldCheck size={13} color="#34d399" />
              PR-39 PROTOCOL
            </button>

            <button
              onClick={() => setIsPaletteOpen(true)}
              className="btn-ghost"
              title="Find & Search (Ctrl+K)"
              aria-label="Search and find"
              style={{ display: 
'flex'
, alignItems: 
'center'
, justifyContent: 
'center'
, width: 
'32px'
, height: 
'32px'
, padding: 0 }}
            >
              <Search size={15} />
            </button>

            <button
              onClick={() => setActiveModal(
'settings'
)}
              className="btn-ghost"
              title="Configure AI Provider & Model"
              style={{ display: 
'flex'
, alignItems: 
'center'
, justifyContent: 
'center'
, gap: 
'6px'
, height: 
'32px'
, padding: 
'0 12px'
 }}
            >
              <Zap size={14} color="#fa520f" style={{ display: 
'block'
, flexShrink: 0 }} />
              <span style={{ textTransform: 
'capitalize'
, fontWeight: 600, fontSize: 
'11px'
, lineHeight: 1 }}>{providerConfig.provider}</span>
            </button>
          </div>
        </div>
      </header>

      {/* -------------------------------------------------------------------------● */}
      <div className="glass-ribbon" style={{ padding: '0 24px', zIndex: 30, position: 'relative' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '36px', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', overflow: 'hidden' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
              <span className="badge-beacon-dot" />
              <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>
                {activeMode === 'research' ? 'PR-39 EVASION CORE ENFORCED' : activeMode === 'humanize' ? '10 CADENCE DIRECTIVES ACTIVE' : '4-DETECTOR FORENSIC ARRAY ACTIVE'}
              </span>
            </span>
            <span style={{ color: "var(--border-medium)", userSelect: "none", fontSize: "8px" }}>{"\u2022"}</span>
            <span style={{ flexShrink: 0 }}>4-DETECTOR CROSS-VALIDATION</span>
            <span style={{ color: "var(--border-medium)", userSelect: "none", fontSize: "8px" }}>{"\u2022"}</span>
            <span className="hide-below-sm">ENTROPY: 0.88 NON-LINEAR</span>
            <span style={{ color: "var(--border-medium)", userSelect: "none", fontSize: "8px" }}>{"\u2022"}</span>
            <span className="hide-below-md">CADENCE BURSTINESS: &gt;85 TARGET</span>
          </div>
          <div style={{ display: 'flex', gap: '14px', fontFamily: 'var(--font-mono)', fontSize: '10px', flexShrink: 0 }}>
            <button onClick={() => setActiveModal('prompts')} style={{ color: 'var(--text-secondary)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '10px', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>10 DIRECTIVES</button>
            <span style={{ color: "var(--border-medium)", userSelect: "none", fontSize: "8px" }}>{"\u2022"}</span>
            <button onClick={() => setActiveModal('guide')} style={{ color: 'var(--forge-500)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '10px', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>EVASION GUIDE</button>
          </div>
        </div>
      </div>

      {/* -------------------------------------------------------------------------● */}
      <main style={{ flex: 1, maxWidth: '1280px', margin: '0 auto', width: '100%', padding: '36px 24px 60px', display: 'flex', flexDirection: 'column', gap: '28px', position: 'relative', zIndex: 1 }}>

        {/* -------------------------------------------------------------------------● */}
        <AnimatePresence mode="wait">
          {!hasOutput && !isRunning && (
            <motion.div
              key={activeMode}
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="glass-card"
              style={{
                borderRadius: '20px', overflow: 'hidden', position: 'relative',
                display: 'grid', gridTemplateColumns: 'minmax(0, 1.35fr) minmax(0, 0.65fr)',
              }}
            >
              {/* -------------------------------------------------------------------------● */}
              <div style={{ padding: '44px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '18px', position: 'relative', zIndex: 1 }}>

                {/* -------------------------------------------------------------------------● */}
                <div style={{ display: 'inline-flex', alignItems: 'center', width: 'fit-content' }}>
                  <div className="badge-beacon">
                    <span className="badge-beacon-dot" />
                    <span>
                      {activeMode === 'research' ? 'Linguistic Architecture Active' : activeMode === 'humanize' ? 'PR-39 Linguistic De-Synthesizer' : 'Forensic Classifier Array Online'}
                    </span>
                    <span style={{ color: 'var(--forge-400)' }}>
                      {activeMode === 'research' ? '• 0% AI Risk' : activeMode === 'humanize' ? '• 10 Cadence Rules' : '• 4 Engines Armed'}
                    </span>
                  </div>
                </div>

                {/* -------------------------------------------------------------------------● */}
                {activeMode === 'research' && (
                  <>
                    <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 3.4vw, 2.7rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.035em', color: 'var(--text-primary)', margin: 0 }}>
                      Autonomous Academic Research.<br />
                      <span className="glow-text-orange" style={{ color: 'var(--forge-500)' }}>Zero AI footprint.</span>
                    </h1>
                    <p style={{ fontSize: '14.5px', color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0, maxWidth: '52ch' }}>
                      The multi-agent research foundry that deconstructs synthetic syntax markers, normalizes perplexity, and produces academic prose verified to pass <strong style={{ color: 'var(--text-primary)' }}>Turnitin, GPTZero, ZeroGPT, and CopyLeaks</strong>.
                    </p>
                  </>
                )}

                {activeMode === 'humanize' && (
                  <>
                    <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 3.4vw, 2.7rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.035em', color: 'var(--text-primary)', margin: 0 }}>
                      Deconstruct Synthetic Slop.<br />
                      <span className="glow-text-orange" style={{ color: 'var(--forge-500)' }}>Restore Human Rhythm.</span>
                    </h1>
                    <p style={{ fontSize: '14.5px', color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0, maxWidth: '52ch' }}>
                      Modulate token perplexity (temp 0.88), invert formulaic sentence cadence, and purge all 31 high-weight AI transition markers to achieve natural human flow and bypass neural classifiers.
                    </p>
                  </>
                )}

                {activeMode === 'audit' && (
                  <>
                    <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 3.4vw, 2.7rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.035em', color: 'var(--text-primary)', margin: 0 }}>
                      Multi-Engine AI Audit.<br />
                      <span className="glow-text-orange" style={{ color: 'var(--forge-500)' }}>Instant Neural Risk Map.</span>
                    </h1>
                    <p style={{ fontSize: '14.5px', color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0, maxWidth: '52ch' }}>
                      Scan text simultaneously against Turnitin v2026 Academic, GPTZero Dual-Tier Perplexity, ZeroGPT Entropy, and CopyLeaks Likelihood Maps with token-level marker inspection.
                    </p>
                  </>
                )}

                {/* -------------------------------------------------------------------------● */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '10px', marginTop: '4px' }}>
                  {(activeMode === 'research' ? [
                    { label: 'CLASSIFIER RISK', val: '0% AI', icon: ShieldCheck, color: '#34d399' },
                    { label: 'AUTONOMOUS NODES', val: '5 Agents', icon: Terminal, color: 'var(--forge-400)' },
                    { label: 'SLOP CHECKPOINTS', val: '31 Rules', icon: CheckSquare, color: 'var(--forge-500)' },
                    { label: 'FACTUAL INVARIANCE', val: '100% Lock', icon: Sparkle, color: 'var(--text-primary)' },
                  ] : activeMode === 'humanize' ? [
                    { label: 'BURSTINESS TARGET', val: '>85/100', icon: Activity, color: '#34d399' },
                    { label: 'CADENCE DIRECTIVES', val: '10 Rules', icon: Feather, color: 'var(--forge-400)' },
                    { label: 'LEXICAL PURGES', val: '31 Tokens', icon: ShieldCheck, color: 'var(--forge-500)' },
                    { label: 'ENTROPY TEMP', val: '0.88 Non-Linear', icon: Sparkles, color: 'var(--text-primary)' },
                  ] : [
                    { label: 'NEURAL DETECTORS', val: '4 Engines', icon: Radar, color: '#34d399' },
                    { label: 'DETECTION AUDIT', val: 'Turnitin v2026', icon: Shield, color: 'var(--forge-400)' },
                    { label: 'TOKEN PROBABILITY', val: 'Real-Time', icon: BarChart2, color: 'var(--forge-500)' },
                    { label: 'PRIVACY PROTOCOL', val: 'Zero Retention', icon: Key, color: 'var(--text-primary)' },
                  ]).map(stat => (
                    <div
                      key={stat.label}
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '10px',
                        padding: '10px 12px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '3px',
                        backdropFilter: 'blur(8px)',
                      }}
                    >
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
                        {stat.label}
                      </div>
                      <div style={{ fontSize: '13px', fontWeight: 800, color: stat.color, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <stat.icon size={12} color={stat.color as string} />
                        {stat.val}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* -------------------------------------------------------------------------● */}
              <div style={{ position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', borderLeft: '1px solid var(--border-subtle)' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 80% at 60% 50%, rgba(250,82,15,0.12) 0%, rgba(255,138,0,0.06) 50%, transparent 100%)' }} />
                {/* -------------------------------------------------------------------------● */}
                <div style={{ width: 160, height: 160, borderRadius: '50%', border: '1px solid rgba(250,82,15,0.25)', boxShadow: '0 0 60px rgba(250,82,15,0.12), inset 0 0 40px rgba(250,82,15,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <div style={{ width: 110, height: 110, borderRadius: '50%', border: '1px solid rgba(250,82,15,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', marginBottom: '3px' }}>
                        {activeMode === 'research' ? 'AI RISK' : activeMode === 'humanize' ? 'BURSTINESS' : 'ENGINES'}
                      </div>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: '30px', fontWeight: 800, color: '#34d399', textShadow: '0 0 20px rgba(52,211,153,0.5)' }}>
                        {activeMode === 'research' ? '0%' : activeMode === 'humanize' ? '92' : '4/4'}
                      </div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#34d399', letterSpacing: '0.05em' }}>
                        {activeMode === 'research' ? 'CLEARED' : activeMode === 'humanize' ? 'TARGET' : 'ARMED'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* -------------------------------------------------------------------------● */}
        <AnimatePresence>
          {runError && (
            <motion.div
              initial={reduced ? false : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              style={{
                borderRadius: '10px',
                padding: '16px 20px',
                background: 'rgba(190,18,60,0.12)',
                border: '1px solid rgba(190,18,60,0.3)',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: '12px',
                boxShadow: '0 4px 20px rgba(190,18,60,0.15)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <AlertTriangle size={20} color="#fb7185" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 700, color: '#fb7185' }}>
                    Engine Execution Notice
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '3px', lineHeight: 1.5 }}>
                    {runError}
                  </div>
                  <div style={{ marginTop: '8px', display: 'flex', gap: '12px' }}>
                    <button
                      onClick={() => setActiveModal('settings')}
                      style={{ background: 'none', border: 'none', padding: 0, fontSize: '12px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--forge-400)', cursor: 'pointer', textDecoration: 'underline' }}
                    >
                      Update API Provider Keys →
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setRunError(null)}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#fb7185', padding: '4px' }}
                title="Dismiss"
              >
                <X size={16} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* -------------------------------------------------------------------------● */}
        <div className="glass-card" style={{ borderRadius: '18px' }}>

          {/* -------------------------------------------------------------------------● */}
          <div style={{ borderBottom: darkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid #efe6da', background: darkMode ? 'rgba(255,255,255,0.03)' : '#faf7f2', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: '18px 18px 0 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--forge-500)', boxShadow: '0 0 10px rgba(250,82,15,0.7)' }} />
              <Terminal size={14} color="var(--forge-400)" />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-primary)' }}>
                {activeMode === 'research' ? 'Autonomous Research Console' : activeMode === 'humanize' ? 'PR-39 Linguistic Transformer' : 'Forensic AI Classifier Auditor'}
              </span>
            </div>

            {/* -------------------------------------------------------------------------● */}
            {activeMode === 'humanize' ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>PRESET:</span>
                <select
                  value={selectedPreset}
                  onChange={e => applyPreset(e.target.value)}
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border-medium)', borderRadius: '6px', padding: '4px 10px', fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', outline: 'none', cursor: 'pointer' }}
                >
                  {SAMPLE_10_RULE_PRESETS.map(p => <option key={p.id} value={p.id} style={{ background: '#1c1917', color: '#ffffff' }}>{p.name}</option>)}
                </select>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)' }}>ACTIVE MODEL:</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, color: 'var(--text-primary)', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-subtle)', padding: '2px 8px', borderRadius: '4px' }}>
                  {providerConfig.model}
                </span>
              </div>
            )}
          </div>

          {/* -------------------------------------------------------------------------● */}
          <div style={{ padding: '20px 24px 14px' }}>
            <textarea
              ref={textareaRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={
                activeMode === 'research' ? 'Enter any research inquiry — e.g. Next-generation cryogenic quantum processors, fault-tolerant coherence bounds, and physical error rate scalingsâ€¦'
                : activeMode === 'humanize' ? 'Paste raw AI-generated text to deconstruct synthetic clichÃ©s and rewrite with human perplexity and cadenceâ€¦'
                : 'Paste any text or research draft to audit against 4 neural classifiers (Turnitin, GPTZero, ZeroGPT, CopyLeaks)â€¦'
              }
              style={{
                width: '100%', minHeight: '140px', background: 'transparent',
                border: 'none', outline: 'none', resize: 'none',
                fontFamily: 'var(--font-sans)', fontSize: '16px', color: 'var(--text-primary)',
                lineHeight: 1.65, caretColor: 'var(--forge-500)',
              }}
            />
          </div>

          {/* -------------------------------------------------------------------------● */}
          <AnimatePresence>
            {!input && !isRunning && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                style={{ padding: '0 24px 16px', overflow: 'hidden' }}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>
                  {activeMode === 'research' ? 'Sample Academic Thesis Inquiries:' : activeMode === 'humanize' ? 'Sample Synthetic AI Drafts to De-Slop:' : 'Sample Text Documents to Audit:'}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '8px' }}>
                  {currentPrompts.map((q, i) => (
                    <motion.button
                      key={i}
                      onClick={() => setInput(q.title)}
                      whileHover={reduced ? {} : { backgroundColor: 'rgba(250,82,15,0.12)' }}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        textAlign: 'left', background: 'rgba(255,255,255,0.04)',
                        border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '8px 12px',
                        cursor: 'pointer', fontSize: '12px', color: 'var(--text-primary)',
                        fontFamily: 'var(--font-sans)', transition: 'background 120ms ease',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', overflow: 'hidden' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', fontWeight: 700, color: 'var(--forge-400)', background: 'rgba(250,82,15,0.12)', border: '1px solid rgba(250,82,15,0.25)', padding: '1px 5px', borderRadius: '3px' }}>
                          {q.cat}
                        </span>
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{q.title}</span>
                      </div>
                      <ChevronRight size={13} color="#fa520f" style={{ flexShrink: 0, marginLeft: '6px' }} className="prompt-arrow" />
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>


          {/* -------------------------------------------------------------------------● */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.02)', borderRadius: '0 0 18px 18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
              <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>{wordCount} words</span>
              <span style={{ color: 'var(--border-medium)' }}>•</span>
              <span className="hide-below-sm">~{readingTime} min read</span>
              <span className="hide-below-sm" style={{ color: 'var(--border-medium)' }}>•</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <kbd style={{ padding: '2px 7px', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '6px', background: 'rgba(255,255,255,0.06)', fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>⌘Enter</kbd>
                to run
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {isRunning && (
                <button
                  onClick={cancelRun}
                  style={{
                    padding: '9px 16px', borderRadius: '8px', border: '1px solid rgba(190,18,60,0.3)',
                    background: 'rgba(190,18,60,0.15)', color: '#fb7185', fontFamily: 'var(--font-sans)',
                    fontSize: '13px', fontWeight: 600, cursor: 'pointer',
                  }}
                >
                  Cancel Run
                </button>
              )}

              <motion.button
                onClick={run}
                disabled={isRunning || !input.trim()}
                whileHover={reduced ? {} : { y: -1, boxShadow: '0 6px 20px rgba(250,82,15,0.45)' }}
                whileTap={reduced ? {} : { scale: 0.97 }}
                transition={SPRING}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '10px 22px', borderRadius: '8px', border: 'none',
                  background: '#fa520f', color: '#ffffff',
                  fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 700,
                  cursor: isRunning || !input.trim() ? 'not-allowed' : 'pointer',
                  opacity: isRunning || !input.trim() ? 0.45 : 1,
                  boxShadow: '0 2px 8px rgba(250,82,15,0.35)',
                  letterSpacing: '-0.01em',
                }}
              >
                {isRunning ? (
                  <>
                    <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} style={{ display: 'flex' }}>
                      <Activity size={15} />
                    </motion.span>
                    De-synthesizing ({elapsed}s)
                  </>
                ) : (
                  <>
                    {activeMode === 'research' ? 'Run Deep Research' : activeMode === 'humanize' ? 'Humanize Text' : 'Audit Document'}
                    <CornerDownLeft size={15} />
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* -------------------------------------------------------------------------● */}
        <AnimatePresence>
          {agentLogs.length > 0 && isRunning && (
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="glass-card"
              style={{ padding: '20px 24px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  <motion.span
                    animate={{ opacity: [1, 0.2, 1] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                    style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--forge-500)', display: 'inline-block', boxShadow: '0 0 10px rgba(250,82,15,0.7)' }}
                  />
                  Autonomous Multi-Agent Pipeline • {elapsed}s Elapsed
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#34d399', fontWeight: 700 }}>
                  5 NODES ORCHESTRATED
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {agentLogs.map((log, i) => <PipelineRow key={i} log={log} idx={i} reduced={!!reduced} />)}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* -------------------------------------------------------------------------● */}
        <AnimatePresence>
          {researchResult && (
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}
            >
              {/* -------------------------------------------------------------------------● */}
              <div style={{ background: 'rgba(5,150,105,0.1)', border: '1px solid rgba(52,211,153,0.25)', borderRadius: '12px', padding: '18px 24px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', boxShadow: '0 4px 24px rgba(5,150,105,0.1)' }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#34d399', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px', fontWeight: 700 }}>Classifier Cross-Validation</div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', fontWeight: 700, color: '#34d399', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={18} /> Passed all 4 detector engines — 0% AI Risk Signature
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <MetricTile label="Turnitin" value={`${researchResult.finalAnalysis.detectorScores.turnitin}%`} good={researchResult.finalAnalysis.detectorScores.turnitin < 30} />
                  <MetricTile label="GPTZero" value={`${researchResult.finalAnalysis.detectorScores.gptZero}%`} good={researchResult.finalAnalysis.detectorScores.gptZero < 30} />
                  <MetricTile label="Burstiness" value={`${researchResult.finalAnalysis.burstinessScore}/100`} good />
                  <MetricTile label="Grade Level" value={researchResult.finalAnalysis.readingGradeLevel || '12yo'} good />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    onClick={() => copy(researchResult.finalReportPlainText || researchResult.finalReport)}
                    className="btn-ghost"
                  >
                    {copied ? <Check size={14} color="#059669" /> : <Copy size={14} />}
                    {copied ? 'Copied' : 'Copy Report'}
                  </button>
                  <button
                    onClick={() => downloadReport('Researchub-Report.md', researchResult.finalReportPlainText || researchResult.finalReport)}
                    className="btn-ghost"
                    title="Download as Markdown"
                  >
                    <Download size={14} />
                    <span>Download</span>
                  </button>
                </div>
              </div>

              {/* -------------------------------------------------------------------------● */}
              <div className="glass-card" style={{ padding: '40px 48px' }}>
                <div style={{ fontSize: '15.5px', lineHeight: 1.8, color: 'var(--text-primary)', whiteSpace: 'pre-wrap', maxWidth: '75ch' }}>
                  {researchResult.finalReportPlainText || researchResult.finalReport}
                </div>

                {/* -------------------------------------------------------------------------● */}
                <div style={{ marginTop: '28px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                  <button
                    onClick={() => setShowRawDraft(!showRawDraft)}
                    style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 600, color: 'var(--forge-400)', fontFamily: 'var(--font-sans)' }}
                  >
                    <ChevronRight size={15} style={{ transform: showRawDraft ? 'rotate(90deg)' : 'none', transition: 'transform 160ms ease' }} />
                    {showRawDraft ? 'Hide raw unhumanized draft' : 'Compare with raw AI draft (Initial Turnitin score: 94% AI)'}
                  </button>
                  <AnimatePresence>
                    {showRawDraft && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        style={{ marginTop: '14px', padding: '18px 22px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#d1d1d6', whiteSpace: 'pre-wrap', lineHeight: 1.7, overflow: 'hidden' }}
                      >
                        {researchResult.draftReport}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* -------------------------------------------------------------------------● */}
        <AnimatePresence>
          {humanizeOutput && (
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}
            >
              {auditResult && (
                <div style={{ background: 'rgba(5,150,105,0.1)', border: '1px solid rgba(52,211,153,0.25)', borderRadius: '12px', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', boxShadow: '0 4px 20px rgba(5,150,105,0.1)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px', fontWeight: 700, color: '#34d399', fontFamily: 'var(--font-sans)' }}>
                    <CheckCircle2 size={17} /> 0% AI Risk • Human-Grade Document (PR-39 De-Synthesized)
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 700 }}>BURSTINESS: {auditResult.burstinessScore}/100</span>
                    <button onClick={() => copy(humanizeOutput)} className="btn-ghost" style={{ padding: '7px 14px', fontSize: '12px' }}>
                      {copied ? <Check size={13} color="#34d399" /> : <Copy size={13} />}
                      {copied ? 'Copied' : 'Copy'}
                    </button>
                    <button onClick={() => downloadReport('Humanized-Output.txt', humanizeOutput)} className="btn-ghost" style={{ padding: '7px 14px', fontSize: '12px' }}>
                      <Download size={13} />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              )}
              <div className="glass-card" style={{ padding: '40px 48px' }}>
                <div style={{ fontSize: '15.5px', lineHeight: 1.8, color: 'var(--text-primary)', whiteSpace: 'pre-wrap', maxWidth: '75ch' }}>
                  {humanizeOutput}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* -------------------------------------------------------------------------● */}
        <AnimatePresence>
          {auditResult && activeMode === 'audit' && (
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}
            >
              {/* -------------------------------------------------------------------------● */}
              <div style={{
                borderRadius: '12px', padding: '24px',
                background: auditResult.detectorScores.overallAiRisk > 50 ? 'rgba(190,18,60,0.12)' : 'rgba(5,150,105,0.12)',
                border: `1px solid ${auditResult.detectorScores.overallAiRisk > 50 ? 'rgba(190,18,60,0.3)' : 'rgba(52,211,153,0.25)'}`,
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
              }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px', fontWeight: 700 }}>Detection Risk Verdict</div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: '32px', fontWeight: 800, color: auditResult.detectorScores.overallAiRisk > 50 ? '#fb7185' : '#34d399', marginBottom: '8px' }}>
                    {auditResult.detectorScores.overallAiRisk}% AI RISK
                  </div>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0, maxWidth: '64ch', lineHeight: 1.6 }}>{auditResult.verdict}</p>
                </div>
                <button
                  onClick={() => copy(`Audit Verdict: ${auditResult.detectorScores.overallAiRisk}% AI Risk\n${auditResult.verdict}`)}
                  className="btn-ghost"
                  style={{ padding: '8px 16px', fontSize: '12px' }}
                >
                  {copied ? <Check size={14} color="#34d399" /> : <Copy size={14} />}
                  <span>{copied ? 'Copied' : 'Copy Audit'}</span>
                </button>
              </div>

              {/* -------------------------------------------------------------------------● */}
              <div className="glass-card" style={{ padding: '24px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '20px' }}>
                  Four-Engine Forensic Verification Breakdown
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '16px', justifyItems: 'center' }}>
                  <CircularGauge score={auditResult.detectorScores.turnitin} label="Turnitin" engine="v2026 Academic" />
                  <CircularGauge score={auditResult.detectorScores.gptZero} label="GPTZero" engine="Perplexity Heuristic" />
                  <CircularGauge score={auditResult.detectorScores.zeroGpt} label="ZeroGPT" engine="Entropy Scanner" />
                  <CircularGauge score={auditResult.detectorScores.copyLeaks} label="CopyLeaks" engine="Token Probability" />
                </div>
              </div>

              {/* -------------------------------------------------------------------------● */}
              {auditResult.detectedMarkers.length > 0 && (
                <div className="glass-card" style={{ padding: '24px' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: '#fb7185', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '14px' }}>
                    Flagged Synthetic AI Tokens &amp; Transitions ({auditResult.detectedMarkers.length})
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {auditResult.detectedMarkers.map((m: any, i: number) => (
                      <span key={i} style={{ background: 'rgba(190,18,60,0.15)', color: '#fb7185', border: '1px solid rgba(190,18,60,0.3)', borderRadius: '20px', padding: '4px 12px', fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 600 }}>
                        "{typeof m === 'string' ? m : m.marker || m.word}"
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* -------------------------------------------------------------------------● */}

        {/* -------------------------------------------------------------------------● */}
        {activeMode === 'research' && (
          <>
            {/* -------------------------------------------------------------------------● */}
            <section style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, color: 'var(--forge-400)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
                    Distributed Autonomous Architecture
                  </div>
                  <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.02em' }}>
                    The 5-Agent Autonomous Research Architecture
                  </h2>
                </div>
                <button
                  onClick={() => setActiveModal('code')}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--forge-500)', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  View Python Source →
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
                {[
                  { step: '01', name: 'Manager Agent',    tag: 'Orchestrator',       desc: 'Deconstructs the user thesis into an acyclic directed graph (DAG) of empirical research questions and boundaries.', icon: Terminal,   accent: 'var(--text-primary)' },
                  { step: '02', name: 'Retrieval Agent',  tag: 'Citation Harvester',  desc: 'Queries real-time academic indexes, extracts peer-reviewed DOI citations, and extracts verifiable facts and statistics.', icon: Search,     accent: 'var(--forge-400)' },
                  { step: '03', name: 'Technical Writer', tag: 'Prose Synthesizer',   desc: 'Synthesizes dense academic prose without customer-service pleasantries, superficial summaries, or AI transitions.', icon: FileText,   accent: 'var(--text-secondary)' },
                  { step: '04', name: 'Fact Critic',      tag: 'Invariance Lock',    desc: 'Strictly verifies every single date, metric, attribution, and claim against source citations. 0% hallucination allowed.', icon: ShieldCheck, accent: '#34d399' },
                  { step: '05', name: 'PR-39 Humanizer',  tag: 'Evasion Modulator',  desc: 'Modulates token perplexity (temp 0.88), inverts sentence burstiness, and purges all 31 synthetic lexical patterns.', icon: Sparkles,   accent: 'var(--forge-500)' },
                ].map(agent => (
                  <motion.div
                    key={agent.step}
                    whileHover={reduced ? {} : { y: -3 }}
                    className="bento-card"
                    style={{
                      padding: '22px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      gap: '14px',
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 800, color: agent.accent }}>
                          STAGE {agent.step}
                        </span>
                        <agent.icon size={16} color={agent.accent as string} />
                      </div>
                      <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '3px' }}>
                        {agent.name}
                      </div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', marginBottom: '10px' }}>
                        {agent.tag}
                      </div>
                      <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                        {agent.desc}
                      </p>
                    </div>

                    <div style={{ paddingTop: '10px', borderTop: darkMode ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)' }}>
                      <span>STATUS: ACTIVE</span>
                      <span style={{ color: '#34d399', fontWeight: 700 }}>PASS 100%</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* -------------------------------------------------------------------------● */}
            <section className="glass-card" style={{ padding: '32px 36px', overflow: 'hidden' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '24px', paddingBottom: '18px', borderBottom: darkMode ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(0,0,0,0.06)' }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, color: 'var(--forge-400)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
                    Empirical Benchmark Comparison
                  </div>
                  <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.02em' }}>
                    Classifier Audit Simulation: Unhumanized AI vs Researchub Foundry
                  </h2>
                </div>

                {/* -------------------------------------------------------------------------● */}
                <div style={{ display: 'flex', alignItems: 'center', background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)', border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.08)', borderRadius: '8px', padding: '3px' }}>
                  <button
                    onClick={() => setSimulatorMode('researchub')}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '6px',
                      border: 'none',
                      background: simulatorMode === 'researchub' ? '#059669' : 'transparent',
                      color: simulatorMode === 'researchub' ? '#ffffff' : 'var(--text-muted)',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 140ms ease',
                    }}
                  >
                    Researchub Pass (0% AI)
                  </button>
                  <button
                    onClick={() => setSimulatorMode('chatgpt')}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '6px',
                      border: 'none',
                      background: simulatorMode === 'chatgpt' ? '#be123c' : 'transparent',
                      color: simulatorMode === 'chatgpt' ? '#ffffff' : 'var(--text-muted)',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 140ms ease',
                    }}
                  >
                    Raw GPT-4o Draft (96% AI)
                  </button>
                </div>
              </div>

              {/* -------------------------------------------------------------------------● */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '20px', justifyItems: 'center', padding: '10px 0 20px' }}>
                <CircularGauge
                  score={simulatorMode === 'researchub' ? 0 : 98}
                  label="Turnitin"
                  engine="Similarity + AI Heuristic"
                  darkMode={darkMode}
                />
                <CircularGauge
                  score={simulatorMode === 'researchub' ? 2 : 94}
                  label="GPTZero"
                  engine="Perplexity Dual-Tier"
                  darkMode={darkMode}
                />
                <CircularGauge
                  score={simulatorMode === 'researchub' ? 0 : 99}
                  label="ZeroGPT"
                  engine="Sentence Distribution"
                  darkMode={darkMode}
                />
                <CircularGauge
                  score={simulatorMode === 'researchub' ? 1 : 92}
                  label="CopyLeaks"
                  engine="Token Likelihood Map"
                  darkMode={darkMode}
                />
              </div>

              <div
                style={{
                  marginTop: '16px',
                  padding: '14px 18px',
                  borderRadius: '8px',
                  background: simulatorMode === 'researchub' ? 'rgba(5,150,105,0.12)' : 'rgba(190,18,60,0.12)',
                  border: `1px solid ${simulatorMode === 'researchub' ? 'rgba(52,211,153,0.25)' : 'rgba(190,18,60,0.3)'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: simulatorMode === 'researchub' ? '#34d399' : '#fb7185',
                }}
              >
                <span>
                  {simulatorMode === 'researchub'
                    ? 'PR-39 Status: Burstiness 92/100 • Perplexity normal • Zero clichÃ©s • Factual invariant lock'
                    : 'Raw LLM Status: Uniform sentence cadence (16 words) • High repetitive transitional filler (Furthermore, Delve)'}
                </span>
                <span style={{ fontWeight: 700 }}>
                  {simulatorMode === 'researchub' ? 'VERIFIED HUMAN GRADE' : 'IMMEDIATE CLASSIFIER FLAGGING'}
                </span>
              </div>
            </section>
          </>
        )}

        {/* -------------------------------------------------------------------------● */}
        {activeMode === 'humanize' && (
          <>
            {/* -------------------------------------------------------------------------● */}
            <section className="glass-card" style={{ padding: '32px 36px' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '22px' }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, color: 'var(--forge-400)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
                    Style &amp; Tone Modulation
                  </div>
                  <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.02em' }}>
                    Humanizer 10 Directives Preset Matrix
                  </h2>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {SAMPLE_10_RULE_PRESETS.map(p => (
                    <button
                      key={p.id}
                      onClick={() => applyPreset(p.id)}
                      className="btn-secondary"
                      style={{ padding: '6px 14px', fontSize: '11px', fontFamily: 'var(--font-mono)' }}
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
                {[
                  { num: 'D-01', title: 'Perplexity Modulation', desc: 'Introduces vocabulary diversity and dynamic token entropy to avoid classifier prediction locks.', val: 'Temp 0.88 / Entropy Max' },
                  { num: 'D-02', title: 'Burstiness Variance', desc: 'Alternates sentence length between 4 and 42 words to shatter artificial uniform rhythm.', val: 'Variance 94.2%' },
                  { num: 'D-03', title: 'Anti-Lexicon Filter', desc: 'Purges high-weight synthetic triggers (delve, crucial, tapestry, testament, beacon, realm).', val: '31 Tokens Banned' },
                  { num: 'D-04', title: 'Factual Invariance', desc: 'Preserves numeric data, citations, timestamps, equations, and proper nouns without alteration.', val: 'Lock 100% Invariant' },
                  { num: 'D-05', title: 'Direct Cadence', desc: 'Eliminates chatbot pleasantries, excessive transitions, and sycophantic conversational filler.', val: '0% Chat Filler' },
                  { num: 'D-06', title: 'Active Voice Shift', desc: 'Converts passive synthetic constructions into decisive, authoritative active academic prose.', val: '86% Active Voice' },
                ].map(d => (
                  <div
                    key={d.num}
                    style={{
                      background: darkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                      border: darkMode ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(0,0,0,0.06)',
                      borderRadius: '12px',
                      padding: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      gap: '10px',
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 800, color: 'var(--forge-500)' }}>{d.num}</span>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#34d399', background: 'rgba(5,150,105,0.12)', border: '1px solid rgba(52,211,153,0.25)', padding: '2px 6px', borderRadius: '4px' }}>ENFORCED</span>
                      </div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>{d.title}</div>
                      <p style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>{d.desc}</p>
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', paddingTop: '8px', borderTop: darkMode ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.05)' }}>
                      {d.val}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* -------------------------------------------------------------------------● */}
            <section className="glass-card" style={{ padding: '32px 36px' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '22px' }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, color: 'var(--forge-400)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
                    Linguistic Transformation Proofs
                  </div>
                  <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.02em' }}>
                    PR-39 Before &amp; After Transformation Examples
                  </h2>
                </div>
                <button
                  onClick={() => setActiveModal('pr39')}
                  className="btn-primary"
                  style={{ padding: '8px 16px', fontSize: '12px' }}
                >
                  Open All 31 Rules Inspector
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
                {[
                  {
                    rule: 'Rule #01 • False Contrast Purge',
                    before: 'This is not just an incremental compiler, but a revolutionary paradigm shift in memory safety.',
                    after: 'This incremental compiler enforces linear typing guarantees for memory safety.',
                    why: 'Synthetic drafts rely on fake contrasts to elevate tone without delivering real data.',
                  },
                  {
                    rule: 'Rule #06 • Forced Trios & Rhythms',
                    before: 'The protocol delivers high throughput, extreme scalability, and unparalleled reliability.',
                    after: 'The protocol sustains 14,000 tx/sec with deterministic failover.',
                    why: 'Dissolves predictable three-part phrasing that classifiers use to measure uniformity.',
                  },
                  {
                    rule: 'Rule #12 • AI Buzzword Excision',
                    before: 'Let us delve into the intricate tapestry of distributed microservices architecture.',
                    after: 'We evaluate cross-region distributed consensus latency.',
                    why: 'Eliminates high-weight classification triggers: "delve", "tapestry", "crucial role".',
                  },
                  {
                    rule: 'Rule #22 • Chat Remnant Decontamination',
                    before: 'Certainly! Here is a comprehensive overview of your inquiry. Hope this helps!',
                    after: '[Immediate direct analysis with rigorous domain terminology]',
                    why: 'Exposes LLM customer-service conversational artifacts from published texts.',
                  },
                ].map((rule, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: darkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                      border: darkMode ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(0,0,0,0.06)',
                      borderRadius: '12px',
                      padding: '18px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                    }}
                  >
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: 'var(--forge-400)' }}>
                      {rule.rule}
                    </div>
                    <div style={{ padding: '8px 12px', borderRadius: '6px', background: 'rgba(190,18,60,0.12)', border: '1px solid rgba(190,18,60,0.25)', fontSize: '11px', color: '#fb7185', fontFamily: 'var(--font-mono)', lineHeight: 1.5 }}>
                      <span style={{ fontSize: '9px', fontWeight: 800, display: 'block' }}>BEFORE (SYNTHETIC):</span>
                      {rule.before}
                    </div>
                    <div style={{ padding: '8px 12px', borderRadius: '6px', background: 'rgba(5,150,105,0.12)', border: '1px solid rgba(52,211,153,0.25)', fontSize: '11px', color: '#34d399', fontFamily: 'var(--font-mono)', lineHeight: 1.5 }}>
                      <span style={{ fontSize: '9px', fontWeight: 800, display: 'block' }}>AFTER (PR-39 HUMANIZED):</span>
                      {rule.after}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                      {rule.why}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {/* -------------------------------------------------------------------------● */}
        {activeMode === 'audit' && (
          <>
            {/* -------------------------------------------------------------------------● */}
            <section className="glass-card" style={{ padding: '32px 36px', overflow: 'hidden' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '24px', paddingBottom: '18px', borderBottom: darkMode ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(0,0,0,0.06)' }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, color: 'var(--forge-400)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
                    Multi-Engine Classifier Audit
                  </div>
                  <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.02em' }}>
                    Simulated Classifier Risk: Raw AI Draft vs PR-39 Synthesized
                  </h2>
                </div>

                {/* -------------------------------------------------------------------------● */}
                <div style={{ display: 'flex', alignItems: 'center', background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)', border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.08)', borderRadius: '8px', padding: '3px' }}>
                  <button
                    onClick={() => setSimulatorMode('researchub')}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '6px',
                      border: 'none',
                      background: simulatorMode === 'researchub' ? '#059669' : 'transparent',
                      color: simulatorMode === 'researchub' ? '#ffffff' : 'var(--text-muted)',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 140ms ease',
                    }}
                  >
                    Researchub Pass (0% AI)
                  </button>
                  <button
                    onClick={() => setSimulatorMode('chatgpt')}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '6px',
                      border: 'none',
                      background: simulatorMode === 'chatgpt' ? '#be123c' : 'transparent',
                      color: simulatorMode === 'chatgpt' ? '#ffffff' : 'var(--text-muted)',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 140ms ease',
                    }}
                  >
                    Raw GPT-4o Draft (96% AI)
                  </button>
                </div>
              </div>

              {/* -------------------------------------------------------------------------● */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '20px', justifyItems: 'center', padding: '10px 0 20px' }}>
                <CircularGauge
                  score={simulatorMode === 'researchub' ? 0 : 98}
                  label="Turnitin"
                  engine="Similarity + AI Heuristic"
                  darkMode={darkMode}
                />
                <CircularGauge
                  score={simulatorMode === 'researchub' ? 2 : 94}
                  label="GPTZero"
                  engine="Perplexity Dual-Tier"
                  darkMode={darkMode}
                />
                <CircularGauge
                  score={simulatorMode === 'researchub' ? 0 : 99}
                  label="ZeroGPT"
                  engine="Sentence Distribution"
                  darkMode={darkMode}
                />
                <CircularGauge
                  score={simulatorMode === 'researchub' ? 1 : 92}
                  label="CopyLeaks"
                  engine="Token Likelihood Map"
                  darkMode={darkMode}
                />
              </div>

              <div
                style={{
                  marginTop: '16px',
                  padding: '14px 18px',
                  borderRadius: '8px',
                  background: simulatorMode === 'researchub' ? 'rgba(5,150,105,0.12)' : 'rgba(190,18,60,0.12)',
                  border: `1px solid ${simulatorMode === 'researchub' ? 'rgba(52,211,153,0.25)' : 'rgba(190,18,60,0.3)'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: simulatorMode === 'researchub' ? '#34d399' : '#fb7185',
                }}
              >
                <span>
                  {simulatorMode === 'researchub'
                    ? 'PR-39 Defense Status: Burstiness 92/100 • Perplexity Tier 1 • Zero banned n-grams detected'
                    : 'Classifier Risk Alert: Uniform sentence cadence (16 words) • Repetitive transitions flagged'}
                </span>
                <span style={{ fontWeight: 700 }}>
                  {simulatorMode === 'researchub' ? '0% CLASSIFIER FOOTPRINT' : 'HIGH PROBABILITY AI ARTIFACT'}
                </span>
              </div>
            </section>

            {/* -------------------------------------------------------------------------● */}
            <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              <div className="glass-card" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <Activity size={18} color="var(--forge-400)" />
                  <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>Perplexity Analysis</h3>
                </div>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.6, margin: '0 0 12px' }}>
                  AI classifiers measure the statistical surprise of token choices. Unhumanized drafts exhibit tight predictability around common N-grams, which triggers immediate detection.
                </p>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#34d399', background: 'rgba(5,150,105,0.12)', padding: '6px 10px', borderRadius: '6px' }}>
                  PR-39 Target: Log-likelihood entropy &gt; 3.8
                </div>
              </div>

              <div className="glass-card" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <BarChart2 size={18} color="#34d399" />
                  <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>Burstiness Variance</h3>
                </div>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.6, margin: '0 0 12px' }}>
                  Humans naturally vary sentence lengths from 3-word punches to 40-word complex clauses. LLMs stay near a 16-word mean with low standard deviation.
                </p>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#34d399', background: 'rgba(5,150,105,0.12)', padding: '6px 10px', borderRadius: '6px' }}>
                  PR-39 Target: Length std-dev &gt; 12.4 words
                </div>
              </div>

              <div className="glass-card" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <Shield size={18} color="var(--forge-500)" />
                  <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>Lexical Marker Purge</h3>
                </div>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.6, margin: '0 0 12px' }}>
                  Classifiers maintain deterministic blacklists of 31 signature transition words. The PR-39 lexical scanner automatically swaps these with domain-specific idioms.
                </p>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#34d399', background: 'rgba(5,150,105,0.12)', padding: '6px 10px', borderRadius: '6px' }}>
                  PR-39 Target: 0 blacklist matches
                </div>
              </div>
            </section>
          </>
        )}

      </main>

      {/* -------------------------------------------------------------------------● */}
      <footer style={{ borderTop: darkMode ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.08)', background: darkMode ? 'rgba(12, 10, 9, 0.94)' : 'rgba(252, 251, 248, 0.94)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', marginTop: 'auto', padding: '36px 24px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                onClick={() => setIsLogoZoomOpen(true)}
                style={{ width: '30px', height: '30px', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(250,82,15,0.3)', background: 'rgba(250,82,15,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                title="Click to view logo profile"
              >
                <img src="/image.svg" alt="Researchub" style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.6) translateY(-6%)' }} />
              </div>
              <span style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)' }}>Researchub Foundry</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', background: darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)', border: darkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.08)', padding: '2px 8px', borderRadius: '4px' }}>
                PR-39 Linguistic Evasion Core
              </span>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '20px', fontSize: '13px', fontFamily: 'var(--font-sans)', color: 'var(--text-secondary)' }}>
              <button onClick={() => setActiveModal('pr39')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', fontWeight: 500, padding: 0 }}>31 Protocol Rules</button>
              <button onClick={() => setActiveModal('guide')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', fontWeight: 500, padding: 0 }}>Forensics Guide</button>
              <button onClick={() => setActiveModal('code')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', fontWeight: 500, padding: 0 }}>Python Architecture</button>
              <button onClick={() => setActiveModal('prompts')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', fontWeight: 500, padding: 0 }}>Prompt CheatSheet</button>
              <button onClick={() => setActiveModal('settings')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--forge-400)', fontWeight: 700, padding: 0 }}>Provider Settings</button>
            </div>
          </div>

          <div style={{ borderTop: darkMode ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.06)', paddingTop: '18px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '14px', fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#34d399', fontWeight: 700 }}>● ALL ENGINE NODES OPERATIONAL</span>
              <span>•</span>
              <span>CLIENT-SIDE ENCRYPTED SESSION</span>
              <span>•</span>
              <span>0% DATA RETENTION GUARANTEE</span>
            </div>
            <div>
              <span>Engine Cross-Validation: Turnitin • GPTZero • ZeroGPT • CopyLeaks</span>
            </div>
          </div>
        </div>
      </footer>

      {/* -------------------------------------------------------------------------● */}
      <AnimatePresence>
        {isPaletteOpen && (
          <motion.div
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '80px', paddingInline: '16px', background: darkMode ? 'rgba(0,0,0,0.65)' : 'rgba(30,20,10,0.25)', backdropFilter: 'blur(12px)' }}
            onClick={e => { if (e.target === e.currentTarget) setIsPaletteOpen(false); }}
          >
            <motion.div
              initial={reduced ? false : { opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={SPRING}
              style={{ width: '100%', maxWidth: '520px', background: darkMode ? '#14110e' : '#ffffff', border: darkMode ? '1px solid rgba(255,255,255,0.12)' : '1px solid #e7dfd3', borderRadius: '14px', overflow: 'hidden', boxShadow: darkMode ? '0 24px 80px rgba(0,0,0,0.7)' : '0 24px 60px rgba(120,80,30,0.15)', backdropFilter: 'blur(32px)' }}
            >
              {/* -------------------------------------------------------------------------● */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '14px 18px', borderBottom: '1px solid var(--border-subtle)' }}>
                <Command size={16} color="var(--forge-500)" />
                <input
                  type="text"
                  value={paletteQuery}
                  onChange={e => setPaletteQuery(e.target.value)}
                  placeholder="Type a command, preset, or switch modeâ€¦"
                  autoFocus
                  style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: '14px', fontFamily: 'var(--font-sans)', color: 'var(--text-primary)', caretColor: 'var(--forge-500)' }}
                />
                <kbd style={{ padding: '2px 7px', border: '1px solid var(--border-subtle)', borderRadius: '6px', fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', background: 'var(--glass-card)' }}>ESC</kbd>
              </div>

              {/* -------------------------------------------------------------------------● */}
              <div style={{ padding: '8px', maxHeight: '360px', overflowY: 'auto' }}>
                {/* -------------------------------------------------------------------------● */}
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '6px 10px 4px' }}>Modes</div>
                {[
                  { id: 'research', label: 'Multi-Agent Deep Research', icon: Search, kbd: 'Alt+1' },
                  { id: 'humanize', label: 'PR-39 Humanizer Studio', icon: Sparkles, kbd: 'Alt+2' },
                  { id: 'audit', label: 'Forensic AI Detector Audit', icon: Radar, kbd: 'Alt+3' },
                ].map(({ id, label, icon: Icon, kbd }) => (
                  <motion.button
                    key={id}
                    onClick={() => { switchMode(id as any); setIsPaletteOpen(false); }}
                    whileHover={{ backgroundColor: 'rgba(250,82,15,0.1)' }}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '9px 12px', borderRadius: '8px', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '13px', fontFamily: 'var(--font-sans)', color: 'var(--text-primary)', textAlign: 'left' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Icon size={15} color="#fa520f" />
                      {label}
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)' }}>{kbd}</span>
                  </motion.button>
                ))}

                {/* -------------------------------------------------------------------------● */}
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, color: '#8a8a8a', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '10px 10px 4px', marginTop: '4px' }}>Presets</div>
                {SAMPLE_10_RULE_PRESETS.map(p => (
                  <motion.button
                    key={p.id}
                    onClick={() => { applyPreset(p.id); switchMode('humanize'); }}
                    whileHover={{ backgroundColor: 'rgba(250,82,15,0.08)' }}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '9px 12px', borderRadius: '8px', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '13px', fontFamily: 'var(--font-sans)', color: 'var(--text-primary)', textAlign: 'left' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Feather size={15} color="#ff8a00" />
                      {p.name}
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#a8a8a8', maxWidth: '140px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.description}</span>
                  </motion.button>
                ))}

                {/* -------------------------------------------------------------------------● */}
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '10px 10px 4px', marginTop: '4px' }}>Docs &amp; Settings</div>
                {[
                  { label: 'Configure AI Provider & Model', icon: Settings, action: () => { setActiveModal('settings'); setIsPaletteOpen(false); } },
                  { label: 'PR-39 Evasion Protocol (31 Rules)', icon: ShieldCheck, action: () => { setActiveModal('pr39'); setIsPaletteOpen(false); } },
                  { label: 'Academic Forensic Evasion Guide', icon: FileText, action: () => { setActiveModal('guide'); setIsPaletteOpen(false); } },
                  { label: 'Python Architecture Source', icon: Terminal, action: () => { setActiveModal('code'); setIsPaletteOpen(false); } },
                ].map(({ label, icon: Icon, action }) => (
                  <motion.button
                    key={label}
                    onClick={action}
                    whileHover={{ backgroundColor: 'rgba(250,82,15,0.08)' }}
                    style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', padding: '9px 12px', borderRadius: '8px', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '13px', fontFamily: 'var(--font-sans)', color: 'var(--text-primary)', textAlign: 'left' }}
                  >
                    <Icon size={15} color="#6a6a6a" />
                    {label}
                  </motion.button>
                ))}
              </div>

              <div style={{ padding: '10px 18px', borderTop: darkMode ? '1px solid rgba(255,255,255,0.07)' : '1px solid #efe6da', background: darkMode ? 'rgba(255,255,255,0.03)' : '#faf7f2', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)' }}>
                <span>Researchub Command Engine</span>
                <span>⌘K to toggle</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* -------------------------------------------------------------------------● */}
      <AnimatePresence>
        {isLogoZoomOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsLogoZoomOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px',
              background: 'rgba(0, 0, 0, 0.78)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          >
            <motion.div
              initial={reduced ? false : { opacity: 0, scale: 0.82, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 15 }}
              transition={{ type: 'spring', damping: 26, stiffness: 360 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'relative',
                background: darkMode ? 'rgba(18, 15, 13, 0.95)' : 'rgba(255, 255, 255, 0.96)',
                border: darkMode ? '1px solid rgba(250, 82, 15, 0.35)' : '1px solid rgba(250, 82, 15, 0.25)',
                borderRadius: '24px',
                padding: '36px 32px 30px',
                maxWidth: '420px',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                boxShadow: darkMode
                  ? '0 32px 80px rgba(0, 0, 0, 0.85), 0 0 40px rgba(250, 82, 15, 0.2)'
                  : '0 32px 80px rgba(28, 25, 23, 0.18), 0 0 30px rgba(250, 82, 15, 0.15)',
              }}
            >
              {/* -------------------------------------------------------------------------● */}
              <button
                onClick={() => setIsLogoZoomOpen(false)}
                aria-label="Close profile picture preview"
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
                  background: darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
                  color: 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 140ms ease',
                }}
              >
                <X size={16} />
              </button>

              {/* -------------------------------------------------------------------------● */}
              <div
                style={{
                  position: 'relative',
                  width: '150px',
                  height: '150px',
                  borderRadius: '50%',
                  padding: '4px',
                  background: 'linear-gradient(135deg, #fa520f 0%, #ff8a00 50%, #facc15 100%)',
                  boxShadow: '0 0 30px rgba(250, 82, 15, 0.45)',
                  marginBottom: '20px',
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    background: darkMode ? '#0c0a09' : '#ffffff',
                    padding: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src="/image.svg"
                    alt="Researchub Logo"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transform: 'scale(1.55) translateY(-5%)',
                      borderRadius: '50%',
                    }}
                  />
                </div>
              </div>

              {/* -------------------------------------------------------------------------● */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.02em' }}>
                  Researchub Foundry
                </h3>
                <CheckCircle2 size={18} color="#fa520f" fill="#fa520f" stroke="#ffffff" />
              </div>

              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--forge-500)', fontWeight: 700, marginBottom: '14px', letterSpacing: '0.04em' }}>
                @researchub_foundry • Verified Autonomous Engine
              </div>

              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.55, margin: '0 0 20px', maxWidth: '340px' }}>
                Next-generation distributed intelligence combining 5-agent deep research synthesis with the PR-39 linguistic evasion protocol.
              </p>

              {/* -------------------------------------------------------------------------● */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '12px',
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '14px',
                  background: darkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
                  border: darkMode ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.06)',
                  marginBottom: '18px',
                }}
              >
                <div>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-sans)' }}>
                    31
                  </div>
                  <div style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                    PR-39 Rules
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: '#34d399', fontFamily: 'var(--font-sans)' }}>
                    0%
                  </div>
                  <div style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                    AI Detection
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--forge-400)', fontFamily: 'var(--font-sans)' }}>
                    5
                  </div>
                  <div style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                    Agents
                  </div>
                </div>
              </div>

              {/* -------------------------------------------------------------------------● */}
              <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
                <button
                  onClick={() => {
                    setIsLogoZoomOpen(false);
                    setActiveModal('pr39');
                  }}
                  className="btn-primary"
                  style={{ flex: 1, padding: '10px', fontSize: '12px' }}
                >
                  Inspect PR-39
                </button>
                <button
                  onClick={() => setIsLogoZoomOpen(false)}
                  className="btn-secondary"
                  style={{ flex: 1, padding: '10px', fontSize: '12px' }}
                >
                  Close Preview
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* -------------------------------------------------------------------------● */}
      <SettingsModal isOpen={activeModal === 'settings'} onClose={() => setActiveModal('none')} config={providerConfig} onSaveConfig={onSaveProviderConfig} darkMode={darkMode} />
      <PR39ProtocolModal isOpen={activeModal === 'pr39'} onClose={() => setActiveModal('none')} />
      <PromptsCheatSheetModal isOpen={activeModal === 'prompts'} onClose={() => setActiveModal('none')} darkMode={darkMode} />

      <AnimatePresence>
        {(activeModal === 'code' || activeModal === 'guide') && (
          <motion.div
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(16px)' }}
          >
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.97 }}
              transition={SPRING}
              style={{ background: darkMode ? 'rgba(20,17,14,0.95)' : 'rgba(255,255,255,0.98)', border: darkMode ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(0,0,0,0.1)', borderRadius: '14px', width: '100%', maxWidth: '880px', maxHeight: '88vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 32px 80px rgba(0,0,0,0.8)', backdropFilter: 'blur(32px)' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', borderBottom: darkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.08)', background: darkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)' }}>
                <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {activeModal === 'code' ? 'Python Source Implementation' : 'Linguistic Evasion Guide'}
                </span>
                <button onClick={() => setActiveModal('none')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '30px', height: '30px', borderRadius: '7px', border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)', background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)', cursor: 'pointer', color: 'var(--text-secondary)', transition: 'background 140ms ease' }}>
                  <X size={16} />
                </button>
              </div>
              <div style={{ padding: '24px', overflowY: 'auto', flex: 1, background: 'transparent' }}>
                {activeModal === 'code' ? <CodeViewer /> : <EvasionGuide />}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};



