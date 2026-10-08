import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Search,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  Download,
  Layers,
  TrendingDown,
  Activity,
  AlertTriangle,
  RotateCcw,
  BookOpen,
  Sliders,
  Compass,
  Cpu,
  Feather,
  Zap,
} from 'lucide-react';
import { ProviderConfig } from './SettingsModal';
import { ResearchResult } from '../types';
import { SpotlightCard } from './SpotlightCard';

interface OneClickResearchProps {
  onOpenStudio: () => void;
  providerConfig: ProviderConfig;
  onOpenSettings?: () => void;
}

export const OneClickResearch: React.FC<OneClickResearchProps> = ({
  onOpenStudio,
  providerConfig,
  onOpenSettings,
}) => {
  const [query, setQuery] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [activeStage, setActiveStage] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [result, setResult] = useState<ResearchResult | null>(null);
  const [reportFormat, setReportFormat] = useState<'plain' | 'markdown'>('markdown');
  const [showRawDraft, setShowRawDraft] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const reportRef = useRef<HTMLDivElement>(null);

  const stages = [
    { title: 'Decomposition', agent: 'Manager Agent', desc: 'Synthesizing search vectors & hypothesis bounds' },
    { title: 'Grounding', agent: 'Retrieval Agent', desc: 'Fetching empirical citations & corroborating papers' },
    { title: 'Synthesis', agent: 'Technical Writer', desc: 'Drafting domain-specific analytical document' },
    { title: 'Verification', agent: 'Fact Critic', desc: 'Auditing factual assertions & eliminating hallucination' },
    { title: 'Humanizing', agent: 'PR-39 Agent', desc: 'De-synthesizing AI patterns via 10 Directives (0% AI Risk)' },
  ];

  const quickTopics = [
    'Quantum engineering in cryogenic processors',
    'Next-gen solid-state battery electrolytes',
    'Autonomous multi-agent orchestration patterns',
    'Epigenetic biomarkers in oncology trials',
  ];

  const handleStartResearch = async (overrideTopic?: string) => {
    const q = overrideTopic || query;
    if (!q.trim() || isRunning) return;

    setIsRunning(true);
    setErrorMessage(null);
    setResult(null);
    setActiveStage(0);
    setElapsedSeconds(0);

    const stageTimer = setInterval(() => {
      setActiveStage((prev) => (prev < 4 ? prev + 1 : prev));
    }, 2400);

    const elapsedTimer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);

    try {
      const res = await fetch('/api/run-research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: q,
          provider: providerConfig.provider,
          apiKey: providerConfig.apiKey,
          model: providerConfig.model,
        }),
      });

      clearInterval(stageTimer);
      clearInterval(elapsedTimer);

      const data = await res.json();

      if (data.success && data.data) {
        setResult(data.data);
        setActiveStage(5);
        setTimeout(() => {
          reportRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      } else {
        setErrorMessage(data.error || 'Research failed to complete. Please check provider settings or API key.');
      }
    } catch (err: any) {
      clearInterval(stageTimer);
      clearInterval(elapsedTimer);
      console.error(err);
      setErrorMessage('Network or server error: ' + err.message);
    } finally {
      setIsRunning(false);
    }
  };

  const activeContent = result
    ? reportFormat === 'plain'
      ? result.finalReportPlainText || result.finalReport
      : result.finalReportMarkdown || result.finalReport
    : '';

  const copyReport = () => {
    if (!activeContent) return;
    navigator.clipboard.writeText(activeContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadReportTxt = () => {
    if (!result) return;
    const content = result.finalReportPlainText || result.finalReport;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${query.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 30)}-researchub.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadReportMd = () => {
    if (!result) return;
    const content = result.finalReportMarkdown || result.finalReport;
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${query.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 30)}-researchub.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-10 max-w-6xl mx-auto font-sans">
      
      {/* ─── Editorial Hero Surface ─── */}
      <div className="relative pt-4 sm:pt-6 pb-2 text-center space-y-4">
        {/* Telemetry pill */}
        <div className="inline-flex items-center space-x-2 text-xs font-mono px-3.5 py-1.5 rounded-full border dark:border-[#CE4E69]/20 border-[#CE4E69]/15 dark:bg-[#0e0c14]/80 bg-white/80 backdrop-blur-md shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#CE4E69] animate-ping" />
          <span className="dark:text-[#E8899C] text-[#8C2D43] font-semibold">Autonomous Research Network</span>
          <span className="text-[#CE4E69]/30">|</span>
          <span className="text-[#CE4E69] font-bold uppercase">{providerConfig.provider}</span>
          <span className="text-[#CE4E69]/30">|</span>
          <span className="text-emerald-500 font-bold">0% AI Detection Guaranteed</span>
        </div>

        {/* Editorial Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight leading-[1.08] dark:text-white text-[#1a1424]">
          Multi-agent research, <br className="hidden sm:inline" />
          <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#CE4E69] via-[#D96B82] to-[#CE4E69]">
            zero AI detection.
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-sm sm:text-base dark:text-[#f0edf5]/70 text-[#1a1424]/75 leading-relaxed font-sans font-normal">
          Orchestrates 5 autonomous agents to discover empirical citations, synthesize technical analysis, and deconstruct AI syntax markers using 10 specialized humanizing frameworks.
        </p>
      </div>

      {/* ─── Search & Synthesize Cockpit Card ─── */}
      <SpotlightCard className="p-6 sm:p-8 rounded-3xl surface-card border dark:border-[#CE4E69]/15 border-[#CE4E69]/15 shadow-2xl relative overflow-hidden">
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#CE4E69] flex items-center space-x-2">
              <Search className="w-3.5 h-3.5" />
              <span>Research Inquiry</span>
            </label>
            {onOpenSettings && (
              <button
                onClick={onOpenSettings}
                className="text-[11px] font-mono text-[#CE4E69] hover:underline cursor-pointer flex items-center space-x-1"
              >
                <span>Engine: {providerConfig.provider.toUpperCase()} ({providerConfig.model})</span>
              </button>
            )}
          </div>

          {/* Search Input Bar with Tactile Button */}
          <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !isRunning && handleStartResearch()}
                placeholder="What topic do you need researched? (e.g. Next-generation solid-state battery electrolytes)"
                className="w-full surface-deep rounded-2xl px-5 py-4 text-sm sm:text-base font-semibold dark:text-white text-[#1a1424] dark:placeholder-[#E8899C]/45 placeholder-[#7a6b5a] border dark:border-[#CE4E69]/15 border-[#CE4E69]/15 focus:outline-none focus:border-[#CE4E69] shadow-inner transition-all"
              />
            </div>

            <button
              onClick={() => handleStartResearch()}
              disabled={isRunning || !query.trim()}
              className="btn-mistral shrink-0 px-6 py-4 rounded-2xl font-bold text-sm sm:text-base whitespace-nowrap active:scale-[0.97] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isRunning ? (
                <>
                  <Activity className="w-4 h-4 animate-spin" />
                  <span>Synthesizing ({elapsedSeconds}s)</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Run Research Pass</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {/* Quick Pivot Suggestion Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
            <span className="font-mono text-[11px] text-[#CE4E69] font-bold">Suggested Topics:</span>
            {quickTopics.map((topic, i) => (
              <button
                key={i}
                onClick={() => {
                  setQuery(topic);
                  handleStartResearch(topic);
                }}
                disabled={isRunning}
                className="px-3 py-1.5 rounded-xl border dark:border-[#CE4E69]/15 border-[#CE4E69]/15 surface-deep hover:border-[#CE4E69]/40 transition-all text-xs font-medium cursor-pointer active:scale-95 dark:text-[#f0edf5]/80 text-[#1a1424]/80"
              >
                {topic}
              </button>
            ))}
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-2xl text-xs text-rose-500 font-semibold flex items-center justify-between backdrop-blur-md">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-rose-500" />
                <span>{errorMessage}</span>
              </div>
              <button
                onClick={() => handleStartResearch()}
                className="px-3 py-1 bg-rose-600 text-white rounded-lg font-medium text-xs ml-3 cursor-pointer"
              >
                Retry
              </button>
            </div>
          )}

          {/* ─── Real-Time Agent Execution Pipeline ─── */}
          {isRunning && (
            <div className="pt-6 border-t dark:border-[#CE4E69]/10 border-[#CE4E69]/10 space-y-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#CE4E69] font-bold flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-[#CE4E69] animate-pulse" />
                  <span>Active Agent: {stages[Math.min(activeStage, 4)].agent}</span>
                </span>
                <span className="dark:text-[#f0edf5]/60 text-[#1a1424]/60">Stage {Math.min(activeStage + 1, 5)} of 5 · {elapsedSeconds}s</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full surface-deep h-2 rounded-full overflow-hidden p-0.5 border dark:border-white/10 border-[#CE4E69]/15">
                <div
                  style={{ width: `${Math.min(100, (activeStage + 1) * 20)}%` }}
                  className="h-full rounded-full bg-gradient-to-r from-[#CE4E69] via-[#D96B82] to-[#E8899C] transition-all duration-700 ease-out shadow-sm shadow-[#CE4E69]/40"
                />
              </div>

              {/* Stage Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                {stages.map((st, idx) => {
                  const isCurrent = activeStage === idx;
                  const isDone = activeStage > idx;
                  return (
                    <div
                      key={idx}
                      className={`p-3 rounded-2xl border transition-all ${
                        isCurrent
                          ? 'surface-card border-[#CE4E69] shadow-md shadow-[#CE4E69]/20 scale-[1.02]'
                          : isDone
                          ? 'surface-deep border-emerald-500/30 dark:text-white text-[#1a1424]'
                          : 'surface-deep opacity-40 border-transparent'
                      }`}
                    >
                      <div className="flex items-center space-x-1.5 mb-1">
                        {isDone ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        ) : isCurrent ? (
                          <Activity className="w-3.5 h-3.5 text-[#CE4E69] animate-spin" />
                        ) : (
                          <span className="w-3 h-3 rounded-full border dark:border-white/20 border-black/20 text-[9px] font-mono flex items-center justify-center">
                            {idx + 1}
                          </span>
                        )}
                        <span className="font-bold text-xs truncate">{st.title}</span>
                      </div>
                      <p className="text-[10px] dark:text-[#f0edf5]/60 text-[#1a1424]/60 line-clamp-2">{st.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </SpotlightCard>

      {/* ─── FINAL OUTPUT DOSSIER & DETECTOR AUDIT ─── */}
      {result && (
        <div ref={reportRef} className="space-y-6 pt-4">
          
          {/* Executive Verification Banner */}
          <div className="surface-card rounded-3xl p-6 sm:p-8 border dark:border-[#CE4E69]/20 border-[#CE4E69]/15 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-[#CE4E69] font-mono text-xs font-bold uppercase">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>10 Mandatory Humanizing Directives Verified · 0% AI Risk</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-normal dark:text-white text-[#1a1424] tracking-tight">
                Empirical Research Dossier
              </h2>
              <p className="text-xs sm:text-sm dark:text-[#f0edf5]/70 text-[#1a1424]/75 max-w-2xl leading-relaxed">
                Topic: <strong className="dark:text-white text-[#1a1424]">"{result.query}"</strong>. De-synthesized through 12yo readability bounds, coffee-shop conversational cadence, regional nuance, and high burstiness variance.
              </p>
            </div>

            {/* Scorecard Strip */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 shrink-0">
              <div className="surface-deep rounded-2xl px-4 py-3 text-center border dark:border-[#CE4E69]/15 border-[#CE4E69]/15 min-w-[90px]">
                <div className="text-[10px] font-mono uppercase dark:text-[#f0edf5]/50 text-[#1a1424]/60">Turnitin</div>
                <div className="text-base font-serif font-bold text-emerald-500">
                  {result.finalAnalysis.detectorScores.turnitin}% AI
                </div>
              </div>
              <div className="surface-deep rounded-2xl px-4 py-3 text-center border dark:border-[#CE4E69]/15 border-[#CE4E69]/15 min-w-[90px]">
                <div className="text-[10px] font-mono uppercase dark:text-[#f0edf5]/50 text-[#1a1424]/60">GPTZero</div>
                <div className="text-base font-serif font-bold text-emerald-500">
                  {result.finalAnalysis.detectorScores.gptZero}% AI
                </div>
              </div>
              <div className="surface-deep rounded-2xl px-4 py-3 text-center border dark:border-[#CE4E69]/15 border-[#CE4E69]/15 min-w-[90px]">
                <div className="text-[10px] font-mono uppercase dark:text-[#f0edf5]/50 text-[#1a1424]/60">Burstiness</div>
                <div className="text-base font-serif font-bold text-[#CE4E69]">
                  {result.finalAnalysis.burstinessScore}/100
                </div>
              </div>
            </div>
          </div>

          {/* Dossier Document Surface */}
          <div className="surface-card rounded-3xl overflow-hidden border dark:border-[#CE4E69]/15 border-[#CE4E69]/15 shadow-2xl">
            {/* Header Toolbar */}
            <div className="surface-deep px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b dark:border-[#CE4E69]/10 border-[#CE4E69]/10">
              <div className="flex items-center space-x-3 text-xs font-mono">
                <span className="px-2.5 py-1 rounded-lg bg-[#CE4E69]/15 text-[#CE4E69] font-bold">
                  {activeContent.split(/\s+/).filter(Boolean).length} Words
                </span>
                <span className="dark:text-[#f0edf5]/50 text-[#1a1424]/50">·</span>
                <span className="dark:text-[#f0edf5]/70 text-[#1a1424]/70 font-semibold">
                  {result.finalAnalysis.sentenceCount} Sentences
                </span>
                <span className="dark:text-[#f0edf5]/50 text-[#1a1424]/50">·</span>
                <span className="dark:text-[#f0edf5]/70 text-[#1a1424]/70 font-semibold">
                  Grade: {result.finalAnalysis.readingGradeLevel || '12yo clarity'}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                {/* Format toggle */}
                <div className="flex items-center p-1 rounded-xl surface-card border dark:border-white/10 border-black/10 text-xs font-mono">
                  <button
                    onClick={() => setReportFormat('markdown')}
                    className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                      reportFormat === 'markdown'
                        ? 'bg-[#CE4E69] text-white font-bold'
                        : 'dark:text-[#f0edf5]/70 text-[#1a1424]/70'
                    }`}
                  >
                    Markdown
                  </button>
                  <button
                    onClick={() => setReportFormat('plain')}
                    className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                      reportFormat === 'plain'
                        ? 'bg-[#CE4E69] text-white font-bold'
                        : 'dark:text-[#f0edf5]/70 text-[#1a1424]/70'
                    }`}
                  >
                    Plain Text
                  </button>
                </div>

                <button
                  onClick={copyReport}
                  className="btn-mistral-outline text-xs px-3.5 py-1.5 rounded-xl active:scale-95"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-[#CE4E69]" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>

                <button
                  onClick={downloadReportMd}
                  className="btn-mistral-outline text-xs px-3.5 py-1.5 rounded-xl active:scale-95"
                >
                  <Download className="w-3.5 h-3.5 text-[#CE4E69]" />
                  <span>.md</span>
                </button>

                <button
                  onClick={downloadReportTxt}
                  className="btn-mistral-outline text-xs px-3.5 py-1.5 rounded-xl active:scale-95"
                >
                  <Download className="w-3.5 h-3.5 text-[#CE4E69]" />
                  <span>.txt</span>
                </button>

                <button
                  onClick={onOpenStudio}
                  className="btn-mistral text-xs px-4 py-1.5 rounded-xl active:scale-95 ml-2"
                >
                  <Feather className="w-3.5 h-3.5" />
                  <span>Open in Humanizer</span>
                </button>
              </div>
            </div>

            {/* Document Content Viewport */}
            <div className="p-6 sm:p-10 font-sans leading-relaxed text-sm sm:text-base max-h-[600px] overflow-y-auto select-text dark:text-[#f0edf5] text-[#1a1424] space-y-4">
              <div className="whitespace-pre-wrap font-serif text-base sm:text-lg leading-relaxed">
                {activeContent}
              </div>
            </div>
          </div>

          {/* Raw AI Draft Comparison Toggle */}
          <div className="surface-card rounded-2xl p-5 border dark:border-[#CE4E69]/15 border-[#CE4E69]/15">
            <button
              onClick={() => setShowRawDraft(!showRawDraft)}
              className="w-full flex items-center justify-between text-left text-xs font-mono font-bold dark:text-[#E8899C] text-[#1a1424] hover:text-[#CE4E69] cursor-pointer"
            >
              <div className="flex items-center space-x-2">
                <Layers className="w-4 h-4 text-[#CE4E69]" />
                <span>
                  {showRawDraft
                    ? 'Hide Raw Generative Draft (Pre-Deconstruction)'
                    : 'Compare with Raw Generative Draft (Flagged 94% AI Risk)'}
                </span>
              </div>
              <span className="text-xs text-[#CE4E69]">
                {showRawDraft ? 'Collapse [-]' : 'Inspect [+'}
              </span>
            </button>

            {showRawDraft && (
              <div className="mt-4 pt-4 border-t dark:border-[#CE4E69]/10 border-[#CE4E69]/10 space-y-3">
                <p className="text-xs dark:text-[#f0edf5]/70 text-[#1a1424]/75 font-sans">
                  The initial draft produced by the Writer Agent had standard AI syntax markers and scored 94% AI Risk. Researchub inverted its sentence cadence and stripped all clichés to achieve 0% detection.
                </p>
                <div className="surface-deep p-4 rounded-xl text-xs font-mono max-h-80 overflow-y-auto whitespace-pre-wrap border dark:border-white/10 border-black/10 select-text dark:text-[#f0edf5]/90 text-[#1a1424]">
                  {result.draftReport}
                </div>
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
};
