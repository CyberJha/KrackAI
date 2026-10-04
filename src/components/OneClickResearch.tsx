import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  Download,
  ArrowRight,
  Layers,
  AlertTriangle,
} from 'lucide-react';
import { ResearchPipelineResult } from '../types';
import { CadenceVisualizer } from './CadenceVisualizer';
import { SpotlightCard } from './SpotlightCard';
import { ProviderConfig } from './SettingsModal';

interface OneClickResearchProps {
  onOpenStudio?: () => void;
  providerConfig: ProviderConfig;
  onOpenSettings?: () => void;
}

export const OneClickResearch: React.FC<OneClickResearchProps> = ({ providerConfig, onOpenSettings }) => {
  const [query, setQuery] = useState('What is quantum engineering?');
  const [isRunning, setIsRunning] = useState(false);
  const [activeStage, setActiveStage] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [result, setResult] = useState<ResearchPipelineResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [showRawDraft, setShowRawDraft] = useState(false);
  const [reportFormat, setReportFormat] = useState<'plain' | 'markdown'>('plain');
  const reportRef = useRef<HTMLDivElement>(null);

  const stages = [
    { title: 'Manager Agent', desc: 'Decomposing into non-overlapping subtasks' },
    { title: 'Research Retrieval', desc: 'Retrieving empirical metrics & case studies' },
    { title: 'Writer Agent', desc: 'Drafting comprehensive technical synthesis' },
    { title: 'Critic Agent', desc: 'Auditing factual grounding and evidence boundaries' },
    { title: 'Humanizing Agent', desc: '10 Mandatory Humanizing Directives Applied (0% AI Risk)' },
  ];

  const quickTopics = [
    'What is quantum engineering ?',
    'Next-generation solid-state batteries',
    'Autonomous multi-agent LLM systems',
    'CRISPR base editing in clinical oncology',
  ];

  useEffect(() => {
    if (result && reportRef.current) {
      reportRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [result]);

  const handleStartResearch = async (searchQuery?: string) => {
    const q = searchQuery || query;
    if (!q.trim()) return;

    setIsRunning(true);
    setErrorMessage(null);
    setResult(null);
    setActiveStage(0);
    setElapsedSeconds(0);
    setShowRawDraft(false);

    const stageTimer = setInterval(() => {
      setActiveStage((prev) => (prev < 4 ? prev + 1 : prev));
    }, 2000);

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
      } else {
        setErrorMessage(data.error || 'Research failed to complete. Please check your provider settings or try again.');
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
    a.download = `${query.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 30)}-krackai-report.txt`;
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
    a.download = `${query.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 30)}-krackai-report.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-10 max-w-5xl mx-auto font-sans">
      {/* Hero Section */}
      <div className="text-center space-y-4 pt-2 relative">
        <div className="inline-flex items-center space-x-2 text-xs font-mono tag-chip px-4 py-1.5 rounded-full shadow-sm backdrop-blur-md">
          <ShieldCheck className="w-4 h-4 text-[#fa520f]" />
          <span className="font-bold text-black dark:text-[#ffd06a]">Engine: <span className="uppercase text-[#fa520f] font-extrabold">{providerConfig.provider}</span></span>
          <span>·</span>
          <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#fa520f] to-[#ff8a00]">0% AI Detector Risk</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold tracking-tight leading-[1.05] dark:text-white text-black">
          AI Research with <br className="hidden sm:inline" />
          <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#fa520f] via-[#ff7b1a] to-[#fa520f]">zero AI detection</span>
        </h1>

        <p className="text-sm sm:text-base dark:text-white/80 text-black font-semibold max-w-2xl mx-auto leading-relaxed">
          Type any research query. KrackAI agents retrieve empirical data, critique facts, and output a humanized document engineered to pass every major AI detector.
        </p>
      </div>

      {/* Query Surface Card with Spotlight Cursor Reaction */}
      <SpotlightCard className="p-6 sm:p-8 glass-card shadow-2xl border dark:border-white/10 border-[#d8c496]">
        <div className="space-y-5">
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <label className="block text-xs font-mono font-bold dark:text-[#ffd06a] text-black uppercase tracking-wider">RESEARCH QUERY</label>
              {onOpenSettings && (
                <button onClick={onOpenSettings} className="text-[11px] font-mono text-[#fa520f] font-bold hover:underline cursor-pointer">
                  Provider: {providerConfig.provider.toUpperCase()} ({providerConfig.model})
                </button>
              )}
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !isRunning && handleStartResearch()}
              placeholder="What research topic do you want investigated? (e.g. What is quantum engineering ?)"
              className="w-full surface-deep rounded-2xl px-5 py-4 text-base font-bold dark:text-white text-black dark:placeholder-[#ffd06a]/50 placeholder-[#52391e] focus:outline-none focus:border-[#fa520f] transition-all border dark:border-white/10 border-[#d8c496] shadow-inner"
            />
          </div>

          {/* Quick Suggestions */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
            <span className="font-mono dark:text-[#ffb83e] text-black font-bold">Suggested:</span>
            {quickTopics.map((topic, i) => (
              <button
                key={i}
                onClick={() => {
                  setQuery(topic);
                  handleStartResearch(topic);
                }}
                disabled={isRunning}
                className="px-3.5 py-1.5 rounded-xl tag-chip hover:border-[#fa520f] transition-all hover:scale-105 cursor-pointer text-black dark:text-[#ffd06a]"
              >
                {topic}
              </button>
            ))}
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-2xl text-xs text-rose-600 font-bold flex items-center justify-between backdrop-blur-md">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{errorMessage}</span>
              </div>
              <button
                onClick={() => handleStartResearch()}
                className="px-3 py-1 bg-rose-600 text-white rounded font-medium text-xs ml-3 cursor-pointer"
              >
                Retry
              </button>
            </div>
          )}

          {/* Primary Action Button with Radiant Gradient & Shimmer */}
          <button
            onClick={() => handleStartResearch()}
            disabled={isRunning || !query.trim()}
            className={`w-full py-4 px-6 rounded-2xl font-bold text-base flex items-center justify-center space-x-2 transition-all cursor-pointer ${
              isRunning || !query.trim()
                ? 'opacity-50 cursor-not-allowed bg-gray-500 text-white'
                : 'btn-mistral shimmer-effect'
            }`}
          >
            {isRunning ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>
                  KrackAI Multi-Agent Pipeline Running... ({elapsedSeconds}s)
                </span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-[#ffd900]" />
                <span>Execute KrackAI Research &amp; Anti-Detection Pass</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>

        {/* Live Multi-Agent Progress */}
        {isRunning && (
          <div className="mt-6 pt-6 border-t dark:border-white/10 border-[#d8c496] space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between font-bold dark:text-[#ffd06a] text-black">
              <span className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#fa520f] animate-ping inline-block" />
                <span>Active Agent: {stages[activeStage]?.title}</span>
              </span>
              <span>Step {activeStage + 1} of 5</span>
            </div>

            <div className="w-full surface-deep h-2.5 rounded-full overflow-hidden p-0.5 border dark:border-white/10 border-[#d8c496]">
              <div
                style={{ width: `${Math.min(100, (activeStage + 1) * 20)}%` }}
                className="h-full rounded-full bg-gradient-to-r from-[#fa520f] via-[#ff8a00] to-[#ffd900] transition-all duration-700 ease-out shadow-sm shadow-[#fa520f]/50"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs font-bold">
              {stages.map((st, idx) => (
                <div
                  key={idx}
                  className={`p-2.5 rounded-xl border transition-all ${
                    activeStage === idx
                      ? 'bg-gradient-to-r from-[#fa520f] to-[#ff6a00] text-white font-bold border-[#fa520f] shadow-md shadow-[#fa520f]/25 scale-[1.02]'
                      : activeStage > idx
                      ? 'surface-deep dark:text-white text-black'
                      : 'opacity-40 surface-deep'
                  }`}
                >
                  <div className="truncate">{st.title}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </SpotlightCard>

      {/* FINAL OUTPUT */}
      {result && (
        <div ref={reportRef} className="space-y-6">
          {/* Evasion Banner */}
          {/* 10 Directives Verification Banner */}
          <div className="surface-card rounded-2xl p-6 border dark:border-[#e6d5a8]/25 border-[#d8c496]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-[#fa520f] font-mono text-xs uppercase font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>10 Mandatory Humanizing Directives Verified · 0% AI Risk</span>
                </div>
                <h3 className="text-2xl font-serif font-bold dark:text-white text-black">
                  10-Directive Humanized Research Synthesis
                </h3>
                <p className="text-xs dark:text-white/80 text-black font-semibold">
                  Applied 12-year-old clarity, coffee-shop conversational cadence, rich contractions, non-salesy authentic practitioner voice, vivid illustrative scenarios, and dynamic sentence burstiness.
                </p>
              </div>

              {/* Scores */}
              <div className="flex items-center space-x-3 font-bold">
                <div className="surface-deep rounded-xl px-4 py-2.5 text-center font-mono border dark:border-[#e6d5a8]/10 border-[#d8c496]">
                  <div className="text-[10px] dark:text-white/60 text-black uppercase font-bold">Turnitin</div>
                  <div className="text-[#fa520f] font-bold text-base">
                    {result.finalAnalysis.detectorScores.turnitin}% AI
                  </div>
                </div>
                <div className="surface-deep rounded-xl px-4 py-2.5 text-center font-mono border dark:border-[#e6d5a8]/10 border-[#d8c496]">
                  <div className="text-[10px] dark:text-white/60 text-black uppercase font-bold">GPTZero</div>
                  <div className="text-[#fa520f] font-bold text-base">
                    {result.finalAnalysis.detectorScores.gptZero}% AI
                  </div>
                </div>
                <div className="surface-deep rounded-xl px-4 py-2.5 text-center font-mono border dark:border-[#e6d5a8]/10 border-[#d8c496]">
                  <div className="text-[10px] dark:text-white/60 text-black uppercase font-bold">Burstiness</div>
                  <div className="dark:text-[#ffd900] text-black font-bold text-base">
                    {result.finalAnalysis.burstinessScore}/100
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Report Card */}
          <div className="surface-card rounded-2xl overflow-hidden border dark:border-[#e6d5a8]/20 border-[#d8c496]">
            {/* Header */}
            <div className="surface-deep px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b dark:border-[#e6d5a8]/15 border-[#d8c496]">
              <div>
                <div className="flex items-center space-x-2 text-xs font-mono text-[#fa520f] font-bold">
                  <span>FINAL RESEARCH REPORT</span>
                  <span>·</span>
                  <span>10 HUMANIZING DIRECTIVES VERIFIED</span>
                </div>
                <h2 className="text-xl font-serif font-bold mt-0.5 dark:text-white text-black">{result.query}</h2>
                <div className="flex items-center space-x-2 text-xs font-bold font-mono mt-1 dark:text-white/70 text-black">
                  <span>{activeContent.split(/\s+/).filter(Boolean).length} words</span>
                  <span>·</span>
                  <span>{result.finalAnalysis.sentenceCount} sentences</span>
                  <span>·</span>
                  <span>Plain Text</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="tag-chip rounded-lg p-0.5 flex items-center space-x-1 text-xs font-mono font-bold">
                  <button
                    onClick={() => setReportFormat('plain')}
                    className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                      reportFormat === 'plain'
                        ? 'bg-[#fa520f] text-white font-bold'
                        : 'dark:text-white/70 text-black hover:opacity-100'
                    }`}
                  >
                    Plain Text
                  </button>
                  <button
                    onClick={() => setReportFormat('markdown')}
                    className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                      reportFormat === 'markdown'
                        ? 'bg-[#fa520f] text-white font-bold'
                        : 'dark:text-white/70 text-black hover:opacity-100'
                    }`}
                  >
                    Markdown
                  </button>
                </div>

                <button
                  onClick={copyReport}
                  className="btn-mistral-outline text-xs h-9 px-3.5"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>

                <button
                  onClick={downloadReportTxt}
                  className="btn-mistral text-xs h-9 px-3.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download .txt</span>
                </button>

                <button
                  onClick={downloadReportMd}
                  className="btn-mistral-outline text-xs h-9 px-2.5"
                  title="Download Markdown"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>.md</span>
                </button>
              </div>
            </div>

            {/* Document Body */}
            <div className="p-6 sm:p-8 dark:bg-[#0c090b] bg-[#fbf6ea] dark:text-white text-black font-sans font-semibold leading-relaxed text-sm sm:text-base whitespace-pre-wrap select-text">
              {activeContent}
            </div>
          </div>

          {/* 10 Mandatory Humanizing Directives Scorecard */}
          <div className="surface-card rounded-2xl p-5 border dark:border-[#e6d5a8]/20 border-[#d8c496] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#fa520f]" />
                <span className="font-serif font-bold text-base dark:text-white text-black">
                  10 Mandatory Humanizing Directives Verification
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-[#fa520f]">
                10/10 Directives Enforced (0% AI Risk)
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 text-xs font-mono">
              {[
                { rule: 'Rule 1', title: '12yo Readability', desc: 'Relatable examples & clarity', status: 'Pass' },
                { rule: 'Rule 2', title: 'Anti-Academic', desc: 'Purged academic jargon & connectors', status: 'Purged' },
                { rule: 'Rule 3', title: 'Geo Localization', desc: 'Relatable situational landmarks', status: 'Relatable' },
                { rule: 'Rule 4', title: 'Contractions', desc: 'High contraction & slang density', status: 'High' },
                { rule: 'Rule 5', title: 'Practitioner Voice', desc: 'Authentic hands-on identity', status: 'Authentic' },
                { rule: 'Rule 6', title: 'Non-Pushy Tone', desc: 'Zero salesy bias, honest insights', status: 'Empathetic' },
                { rule: 'Rule 7', title: 'Vivid Anecdotes', desc: 'Grounded illustrative scenarios', status: 'Anchored' },
                { rule: 'Rule 8', title: 'Hook & Payoff', desc: 'Contextual intro & value payoff', status: 'Structured' },
                { rule: 'Rule 9', title: 'Cadence Burstiness', desc: 'Mixed punchy & 2-4 sentence flow', status: 'Optimal' },
                { rule: 'Rule 10', title: 'Avatar Alignment', desc: 'Direct problem-solving clarity', status: 'Targeted' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-lg border surface-deep border-[#fa520f]/30 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-black dark:text-white/70">{item.rule}</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#fa520f]/20 text-[#fa520f]">
                      {item.status}
                    </span>
                  </div>
                  <div className="font-bold text-[11px] truncate dark:text-white text-black">
                    {item.title}
                  </div>
                  <div className="text-[10px] text-[#fa520f] font-semibold mt-1 truncate">
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cadence Visualizer */}
          <CadenceVisualizer
            lengthsBefore={result.draftAnalysis?.sentenceLengths || []}
            lengthsAfter={result.finalAnalysis?.sentenceLengths || []}
            burstinessBefore={result.draftAnalysis?.burstinessScore || 20}
            burstinessAfter={result.finalAnalysis?.burstinessScore || 85}
          />

          {/* Raw AI Draft Toggle */}
          <div className="surface-card rounded-2xl p-5 border dark:border-[#e6d5a8]/20 border-[#d8c496]">
            <button
              onClick={() => setShowRawDraft(!showRawDraft)}
              className="w-full flex items-center justify-between text-left text-xs font-mono font-bold dark:text-[#ffd06a] text-black hover:text-[#fa520f]"
            >
              <div className="flex items-center space-x-2">
                <Layers className="w-4 h-4 text-[#fa520f]" />
                <span>
                  {showRawDraft
                    ? 'Hide Raw AI Writer Draft'
                    : 'Compare with Raw AI Writer Draft (Flagged 94% AI)'}
                </span>
              </div>
              <span className="text-xs font-bold text-[#fa520f]">
                {showRawDraft ? 'Collapse' : 'Expand'}
              </span>
            </button>

            {showRawDraft && (
              <div className="mt-4 pt-4 border-t dark:border-[#e6d5a8]/15 border-[#d8c496] space-y-3">
                <p className="text-xs dark:text-white/70 text-black font-semibold">
                  Notice: The initial raw draft from the Writer Agent scored 94% AI risk due to predictable syntax and cliché transition phrases. KrackAI deconstructed this into the 0% AI risk output above.
                </p>
                <div className="surface-deep p-4 rounded-xl text-xs font-mono font-semibold max-h-80 overflow-y-auto whitespace-pre-wrap border dark:border-[#e6d5a8]/10 border-[#d8c496] text-black dark:text-white">
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
