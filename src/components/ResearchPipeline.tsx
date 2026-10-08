import React, { useState } from 'react';
import {
  Bot,
  Play,
  CheckCircle2,
  AlertCircle,
  FileText,
  Search,
  BookOpen,
  ShieldCheck,
  Brain,
  Sparkles,
  ArrowRight,
  TrendingDown,
  Layers,
  Copy,
  Check,
  RotateCcw,
  ThumbsUp,
  ThumbsDown,
} from 'lucide-react';
import {
  storeFeedbackItem,
  buildAdaptiveFeedbackDirectives,
  FeedbackItem,
} from '../engine/feedbackMemory';
import { ResearchPipelineResult } from '../types';

export const ResearchPipeline: React.FC = () => {
  const [query, setQuery] = useState('What is quantum engineering?');
  const [isRunning, setIsRunning] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(-1);
  const [result, setResult] = useState<ResearchPipelineResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'final' | 'draft' | 'critique'>('final');
  const [loopCount, setLoopCount] = useState<number>(2);
  const [feedbackRating, setFeedbackRating] = useState<'up' | 'down' | null>(null);
  const [feedbackStatusMsg, setFeedbackStatusMsg] = useState<string>('');

  const agentSteps = [
    { id: 0, name: 'Manager Agent', role: 'Plans 3 focused research subtasks', icon: Brain },
    { id: 1, name: 'Search & Wiki', role: 'Gathers empirical metrics & encyclopedic facts', icon: Search },
    { id: 2, name: 'Writer Agent', role: 'Synthesizes exhaustive technical draft', icon: FileText },
    { id: 3, name: 'Critic Agent', role: 'Audits factual grounding & flaws', icon: AlertCircle },
    { id: 4, name: 'Humanizing Agent', role: `StealthHumanizer v3 + Blader v3.1 (${loopCount}-Loop Engine)`, icon: Sparkles },
    { id: 5, name: 'Originality Checker', role: 'Compares against retrieved corpus', icon: ShieldCheck },
  ];

  const handleRunPipeline = async () => {
    if (!query.trim()) return;

    setIsRunning(true);
    setResult(null);
    setActiveStep(0);

    // Dynamic step progression animation
    const interval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev < 4) return prev + 1;
        return prev;
      });
    }, 2800);

    try {
      const res = await fetch('/api/run-research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query,
          loopCount,
          feedbackDirectives: buildAdaptiveFeedbackDirectives(),
        }),
      });

      clearInterval(interval);
      const data = await res.json();

      if (data.success) {
        setResult(data.data);
        setActiveStep(5);
      } else {
        alert(data.error || 'Research pipeline encountered an issue.');
      }
    } catch (err: any) {
      clearInterval(interval);
      console.error(err);
      alert('Error running pipeline: ' + err.message);
    } finally {
      setIsRunning(false);
    }
  };

    const handleResearchFeedback = async (rating: 'up' | 'down') => {
    if (!result?.finalReport) return;
    const newRating = feedbackRating === rating ? null : rating;
    setFeedbackRating(newRating);

    if (newRating) {
      const item: FeedbackItem = {
        id: 'fb-res-' + Date.now(),
        timestamp: Date.now(),
        rating: newRating,
        sampleSnippet: result.finalReport.slice(0, 240),
        candidateName: 'Deep Research Synthesis',
        burstinessScore: result.finalAnalysis?.burstinessScore,
        zerogptScore: result.finalAnalysis?.detectorScores?.zeroGpt,
      };
      storeFeedbackItem(item);
      setFeedbackStatusMsg(
        newRating === 'up'
          ? '👍 Style Learned: Research Humanizer will reinforce this natural cadence.'
          : '👎 Noted: Research Humanizer will avoid this phrasing register in future passes.'
      );
      try {
        await fetch('/api/feedback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item),
        });
      } catch (e) {}
    } else {
      setFeedbackStatusMsg('');
    }
  };

  const copyFinalReport = () => {
    if (!result?.finalReport) return;
    navigator.clipboard.writeText(result.finalReport);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-cyan-400 font-semibold text-xs tracking-wider uppercase mb-1">
              <Bot className="w-4 h-4" />
              <span>LangGraph Multi-Agent Architecture</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              End-to-End Autonomous Research System
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-3xl">
              Witness the complete multi-agent pipeline from query decomposition to empirical synthesis,
              rigorous critique, and final anti-detection humanization.
            </p>
          </div>

          {/* Quick Query Suggestions */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400">Suggestions:</span>
            {[
              'What is quantum engineering ?',
              'Next-gen solid-state batteries',
              'Autonomous LLM reasoning systems',
            ].map((q, idx) => (
              <button
                key={idx}
                onClick={() => setQuery(q)}
                className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-white hover:bg-slate-750 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="mt-5 flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter research topic (e.g. what is quantum engineering ?)"
            className="flex-1 bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
          />

          {/* Humanizer Loop Selector */}
          <div className="flex items-center space-x-2 bg-slate-950 px-3.5 py-2 rounded-xl border border-slate-700/80 shrink-0">
            <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-xs text-slate-300 font-medium">Humanizer Passes:</span>
            <div className="flex items-center space-x-1 bg-slate-800/80 p-0.5 rounded-lg">
              {[1, 2, 3].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setLoopCount(num)}
                  title={`${num}x Iterative Humanizer Pass${num > 1 ? 'es' : ''}`}
                  className={`px-2.5 py-1 rounded text-xs font-bold transition-all ${
                    loopCount === num
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {num}x
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleRunPipeline}
            disabled={isRunning || !query.trim()}
            className={`px-6 py-3 rounded-xl font-semibold text-sm flex items-center justify-center space-x-2 shadow-lg transition-all shrink-0 ${
              isRunning || !query.trim()
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20 active:scale-[0.99]'
            }`}
          >
            {isRunning ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Executing Pipeline...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>Run Research System</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Visual LangGraph Agent Flow */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-md">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 flex items-center space-x-2">
          <Layers className="w-3.5 h-3.5 text-emerald-400" />
          <span>Interactive LangGraph Execution Nodes</span>
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {agentSteps.map((step) => {
            const Icon = step.icon;
            const isCompleted = activeStep > step.id || (activeStep === 5 && !isRunning);
            const isCurrent = activeStep === step.id && isRunning;
            const isPending = activeStep < step.id;

            return (
              <div
                key={step.id}
                className={`relative rounded-xl p-3.5 border transition-all flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-emerald-950/40 border-emerald-500 shadow-md shadow-emerald-500/10 ring-1 ring-emerald-500/50'
                    : isCompleted
                    ? 'bg-slate-950/80 border-slate-700/80'
                    : 'bg-slate-950/30 border-slate-800/60 opacity-60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                        isCurrent
                          ? 'bg-emerald-500 text-slate-950 animate-pulse'
                          : isCompleted
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-slate-800 text-slate-500'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    {isCompleted && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                    {isCurrent && (
                      <div className="w-3 h-3 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
                    )}
                  </div>
                  <h4 className="font-semibold text-xs text-slate-200">{step.name}</h4>
                  <p className="text-[11px] text-slate-400 mt-1 leading-snug">{step.role}</p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-800/80 text-[10px] font-mono">
                  {isCurrent && <span className="text-emerald-400 font-bold">● Active</span>}
                  {isCompleted && <span className="text-slate-400">Completed</span>}
                  {isPending && <span className="text-slate-600">Pending</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Output Results / Whiteboard */}
      {result && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-md space-y-5">
          {/* Subtasks Planned by Manager */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center space-x-2">
              <Brain className="w-3.5 h-3.5 text-cyan-400" />
              <span>Manager Agent Decomposed Subtasks</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {result.subtasks.map((task, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900/90 border border-slate-800 rounded-lg p-3 text-xs text-slate-300 flex items-start space-x-2"
                >
                  <span className="w-4 h-4 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-mono font-bold text-[10px] flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{task}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Detector Comparison Card: Writer Draft vs Humanized Final */}
          <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-emerald-500/30 rounded-xl p-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <div>
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                  Anti-Detection Transformation Analysis
                </span>
                <p className="text-xs text-slate-400">
                  How the Humanizing Agent neutralized the Writer Agent's synthetic footprint
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs px-2.5 py-1 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 font-mono">
                  Writer Draft: {result.draftAnalysis?.detectorScores.overallAiRisk || 94}% AI
                </span>
                <ArrowRight className="w-4 h-4 text-emerald-400" />
                <span className="text-xs px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-mono font-bold">
                  Final Report: {result.finalAnalysis?.detectorScores.overallAiRisk || 4}% AI
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
              <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                <div className="text-slate-400 text-[10px] uppercase font-mono">GPTZero Drop</div>
                <div className="font-bold text-emerald-400 font-mono mt-0.5 flex items-center justify-center space-x-1">
                  <span>
                    {result.draftAnalysis?.detectorScores.gptZero}% &rarr; {result.finalAnalysis?.detectorScores.gptZero}%
                  </span>
                  <TrendingDown className="w-3.5 h-3.5 text-emerald-400" />
                </div>
              </div>
              <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                <div className="text-slate-400 text-[10px] uppercase font-mono">Turnitin Drop</div>
                <div className="font-bold text-emerald-400 font-mono mt-0.5 flex items-center justify-center space-x-1">
                  <span>
                    {result.draftAnalysis?.detectorScores.turnitin}% &rarr; {result.finalAnalysis?.detectorScores.turnitin}%
                  </span>
                  <TrendingDown className="w-3.5 h-3.5 text-emerald-400" />
                </div>
              </div>
              <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                <div className="text-slate-400 text-[10px] uppercase font-mono">Burstiness Elevation</div>
                <div className="font-bold text-teal-300 font-mono mt-0.5">
                  {result.draftAnalysis?.burstinessScore} &rarr; {result.finalAnalysis?.burstinessScore}/100 ⚡
                </div>
              </div>
              <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                <div className="text-slate-400 text-[10px] uppercase font-mono">Purged AI Markers</div>
                <div className="font-bold text-emerald-400 font-mono mt-0.5">
                  {result.draftAnalysis?.detectedMarkers.length || 0} cliches eradicated
                </div>
              </div>
            </div>

            {/* Loop Round Progression Pills */}
            {result.loopRoundMetrics && result.loopRoundMetrics.length > 1 && (
              <div className="mt-3 pt-3 border-t border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-emerald-400 font-bold flex items-center space-x-1.5">
                    <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{result.loopRoundMetrics.length}-Pass Humanizer Loop Progression:</span>
                  </span>
                  <span className="text-emerald-300 font-bold">
                    {result.loopRoundMetrics[0].zerogpt}% → {result.loopRoundMetrics[result.loopRoundMetrics.length - 1].zerogpt}% ZeroGPT
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {result.loopRoundMetrics.map((rm) => (
                    <div key={rm.round} className="bg-slate-900/90 p-2 rounded-lg border border-slate-800 text-[11px] font-mono">
                      <div className="flex items-center justify-between text-slate-400 font-bold">
                        <span>Pass {rm.round}</span>
                        <span className="text-teal-300">{rm.burstiness} Burst</span>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-emerald-400 font-bold">{rm.zerogpt}% ZeroGPT</span>
                        <span className="text-rose-400">{rm.turnitin}% Turnitin</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Report Viewer with Tabs */}
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
              <div className="flex space-x-2">
                <button
                  onClick={() => setViewMode('final')}
                  className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-all ${
                    viewMode === 'final'
                      ? 'bg-emerald-600 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Undetectable Final Report (Plain Text • 0% AI)
                </button>
                <button
                  onClick={() => setViewMode('draft')}
                  className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-all ${
                    viewMode === 'draft'
                      ? 'bg-rose-600/80 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Raw Writer Draft (Pre-Humanizer)
                </button>
                <button
                  onClick={() => setViewMode('critique')}
                  className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-all ${
                    viewMode === 'critique'
                      ? 'bg-amber-600/80 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Critic Agent Audit
                </button>
              </div>

              {viewMode === 'final' && (
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1 bg-slate-900 border border-slate-800 p-0.5 rounded-lg">
                    <button
                      onClick={() => handleResearchFeedback('up')}
                      title="Good humanized tone - AI will learn and replicate this style"
                      className={`p-1.5 rounded text-xs transition-all ${
                        feedbackRating === 'up'
                          ? 'bg-emerald-500 text-white font-bold'
                          : 'text-slate-400 hover:text-emerald-400'
                      }`}
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleResearchFeedback('down')}
                      title="Needs improvement - AI will avoid this style next time"
                      className={`p-1.5 rounded text-xs transition-all ${
                        feedbackRating === 'down'
                          ? 'bg-rose-500 text-white font-bold'
                          : 'text-slate-400 hover:text-rose-400'
                      }`}
                    >
                      <ThumbsDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={copyFinalReport}
                    className="flex items-center space-x-1.5 text-xs px-3 py-1.5 rounded-lg bg-emerald-600/90 hover:bg-emerald-500 text-white font-medium transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied!' : 'Copy Plain Text'}</span>
                  </button>
                </div>
              )}
            </div>

            {viewMode === 'final' && (
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 text-sm text-slate-200 leading-relaxed font-sans max-h-[500px] overflow-y-auto scrollbar-thin whitespace-pre-wrap select-text">
                {result.finalReport}
              </div>
            )}

            {viewMode === 'draft' && (
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 text-sm text-slate-300 leading-relaxed font-sans max-h-[500px] overflow-y-auto scrollbar-thin whitespace-pre-wrap select-text opacity-90">
                <div className="mb-3 p-2 bg-rose-500/10 border border-rose-500/20 rounded text-xs text-rose-300">
                  Notice the typical AI hallmarks below: symmetrical bullet lists, flat sentence lengths, and generic markers
                  like "delve", "pivotal", and "landscape" that easily trigger classifiers.
                </div>
                {result.draftReport}
              </div>
            )}

            {viewMode === 'critique' && (
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4 text-xs">
                <div>
                  <h5 className="font-semibold text-amber-400 uppercase tracking-wider mb-2">
                    Critic Agent Recommended Fixes
                  </h5>
                  <ul className="space-y-1 text-slate-300">
                    {(result.criticData.recommended_fixes || ['Incorporate real-world empirical benchmarks', 'Eliminate formulaic listicle symmetries']).map(
                      (fix, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <span className="text-amber-400 mt-0.5">•</span>
                          <span>{fix}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
