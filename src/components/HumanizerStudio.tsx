interface CandidateResult {
  id: number;
  name: string;
  plainText: string;
  markdownText: string;
  overallAiRisk: number;
  zerogptRisk: number;
  turnitinRisk: number;
  gptzeroRisk: number;
  burstinessScore: number;
  perplexityScore: number;
  compositeScore: number;
  isWinner: boolean;
}

interface LoopRoundMetric {
  round: number;
  zerogpt: number;
  turnitin: number;
  overallAiRisk: number;
  burstiness: number;
  compositeScore?: number;
}

interface VerificationAudit {
  totalCandidatesGenerated: number;
  winningCandidateId: number;
  winningCandidateName: string;
  winningScore: number;
  totalRefinementLoops?: number;
  winReason: string;
}

import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  Copy,
  Check,
  Sliders,
  CheckCircle2,
  FileText,
  TrendingDown,
  BookOpen,
  SlidersHorizontal,
  RotateCcw,
  Feather,
  Cpu,
  Layers,
  ChevronDown,
  ChevronUp,
  ThumbsUp,
  ThumbsDown,
} from 'lucide-react';
import {
  getStoredFeedbackItems,
  storeFeedbackItem,
  buildAdaptiveFeedbackDirectives,
  FeedbackItem,
} from '../engine/feedbackMemory';
import { SAMPLE_10_RULE_PRESETS, DEFAULT_10_RULES_CONFIG } from '../data/samples';
import { DetectabilityAnalysis, Humanizer10RulesConfig } from '../types';
import { CadenceVisualizer } from './CadenceVisualizer';
import { Rules10Manager } from './Rules10Manager';
import { PromptsCheatSheetModal } from './PromptsCheatSheetModal';
import { PR39ProtocolModal } from './PR39ProtocolModal';
import { SkillModal } from './SkillModal';
import { SpotlightCard } from './SpotlightCard';
import { ProviderConfig } from './SettingsModal';

interface HumanizerStudioProps {
  providerConfig: ProviderConfig;
  onOpenSettings?: () => void;
  onOpenSkill?: () => void;
}

export const HumanizerStudio: React.FC<HumanizerStudioProps> = ({
  providerConfig,
  onOpenSettings,
  onOpenSkill,
}) => {
  const [inputText, setInputText] = useState(SAMPLE_10_RULE_PRESETS[0].sampleInput);
  const [selectedPreset, setSelectedPreset] = useState(SAMPLE_10_RULE_PRESETS[0].id);
  const [temperature, setTemperature] = useState(0.88);
  const [preserveTables, setPreserveTables] = useState(true);
  const [rulesConfig, setRulesConfig] = useState<Humanizer10RulesConfig>(DEFAULT_10_RULES_CONFIG);
  const [showCheatSheet, setShowCheatSheet] = useState(false);
  const [showPR39Modal, setShowPR39Modal] = useState(false);
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [showDirectivesMatrix, setShowDirectivesMatrix] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [stageProgressText, setStageProgressText] = useState('');

  const [outputText, setOutputText] = useState('');
  const [stage1Intermediate, setStage1Intermediate] = useState('');
  const [compiledPrompt, setCompiledPrompt] = useState('');
  const [analysisBefore, setAnalysisBefore] = useState<DetectabilityAnalysis | null>(null);
  const [analysisAfter, setAnalysisAfter] = useState<DetectabilityAnalysis | null>(null);

  const [copied, setCopied] = useState(false);
  const [activeOutputTab, setActiveOutputTab] = useState<'final' | 'stage1' | 'prompt'>('final');
  const [engineVersion, setEngineVersion] = useState<string>('');
  const [candidates, setCandidates] = useState<CandidateResult[]>([]);
  const [selectedCandidateId, setSelectedCandidateId] = useState<number | null>(null);
  const [verificationAudit, setVerificationAudit] = useState<VerificationAudit | null>(null);
  const [loopCount, setLoopCount] = useState<number>(2);
  const [loopRoundMetrics, setLoopRoundMetrics] = useState<LoopRoundMetric[]>([]);
  const [feedbackRating, setFeedbackRating] = useState<'up' | 'down' | null>(null);
  const [feedbackStatusMsg, setFeedbackStatusMsg] = useState<string>('');
  const [feedbackHistory, setFeedbackHistory] = useState<FeedbackItem[]>([]);

  useEffect(() => {
    setFeedbackHistory(getStoredFeedbackItems());
  }, []);

  useEffect(() => {
    analyzeDraft(inputText, rulesConfig);
  }, []);

  const handlePresetChange = (presetId: string) => {
    setSelectedPreset(presetId);
    const found = SAMPLE_10_RULE_PRESETS.find((p) => p.id === presetId);
    if (found) {
      setInputText(found.sampleInput);
      setRulesConfig(found.config);
      analyzeDraft(found.sampleInput, found.config);
      setOutputText('');
      setAnalysisAfter(null);
    }
  };

  const analyzeDraft = async (textToScan: string, currentRules?: Humanizer10RulesConfig) => {
    try {
      const res = await fetch('/api/analyze-detector', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: textToScan,
          rulesConfig: currentRules || rulesConfig,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setAnalysisBefore(data.data);
      }
    } catch (e) {
      console.error('Failed to analyze draft', e);
    }
  };

  const handleRulesChange = (newConfig: Humanizer10RulesConfig) => {
    setRulesConfig(newConfig);
    analyzeDraft(inputText, newConfig);
  };

  const handleRunHumanizer = async () => {
    if (!inputText.trim() || isLoading) return;

    setIsLoading(true);
    setFeedbackRating(null);
    setFeedbackStatusMsg('');
    setStageProgressText(`Stage 1: Generating 3 diverse candidate rewrites via ${providerConfig.provider.toUpperCase()}...`);

    try {
      const timer1 = setTimeout(() => {
        setStageProgressText('Stage 2: Running Blader forensic verification audit across all candidates...');
      }, 1500);
      const timer2 = setTimeout(() => {
        setStageProgressText(
          loopCount > 1
            ? `Stage 3: Executing 3-candidate tournament & ${loopCount}-pass refinement loops...`
            : 'Stage 3: Executing forensic tournament to select the cleanest, 0% AI candidate...'
        );
      }, 3000);

      const res = await fetch('/api/humanize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: inputText,
          temperature,
          preserveData: preserveTables,
          provider: providerConfig.provider,
          apiKey: providerConfig.apiKey,
          model: providerConfig.model,
          rulesConfig,
          loopCount,
          feedbackDirectives: buildAdaptiveFeedbackDirectives(feedbackHistory),
        }),
      });

      clearTimeout(timer1);
      clearTimeout(timer2);
      const data = await res.json();

      if (data.success) {
        setOutputText(data.humanizedPlainText || data.humanizedText);
        setStage1Intermediate(data.stage1Text || '');
        setCompiledPrompt(data.compiledPrompt || '');
        setAnalysisBefore(data.analysisBefore);
        setAnalysisAfter(data.analysisAfter);
        if (data.engineVersion) setEngineVersion(data.engineVersion);
        if (data.candidates) setCandidates(data.candidates);
        if (data.verificationAudit) {
          setVerificationAudit(data.verificationAudit);
          setSelectedCandidateId(data.verificationAudit.winningCandidateId);
        }
        if (data.loopRoundMetrics) {
          setLoopRoundMetrics(data.loopRoundMetrics);
        }
      } else {
        alert(data.error || 'Humanization failed. Please verify provider settings.');
      }
    } catch (err: any) {
      console.error(err);
      alert('Error during humanization: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

    const handleFeedback = async (rating: 'up' | 'down') => {
    if (!outputText) return;
    const newRating = feedbackRating === rating ? null : rating;
    setFeedbackRating(newRating);

    if (newRating) {
      const winningCandidate = candidates.find((c) => c.isWinner) || candidates.find((c) => c.id === selectedCandidateId);
      const item: FeedbackItem = {
        id: 'fb-' + Date.now(),
        timestamp: Date.now(),
        rating: newRating,
        sampleSnippet: outputText.slice(0, 240),
        candidateName: winningCandidate?.name,
        burstinessScore: analysisAfter?.burstinessScore,
        zerogptScore: analysisAfter?.detectorScores.zeroGpt,
      };
      const updated = storeFeedbackItem(item);
      setFeedbackHistory(updated);
      setFeedbackStatusMsg(
        newRating === 'up'
          ? '👍 Style Learned: AI will replicate this natural cadence and burstiness in future passes.'
          : '👎 Noted: AI will avoid this sentence structure and phrasing register in future passes.'
      );
      try {
        await fetch('/api/feedback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item),
        });
      } catch (e) {
        // Offline / local storage fallback
      }
    } else {
      setFeedbackStatusMsg('');
    }
  };

  const copyToClipboard = () => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePasteSample = (text: string) => {
    setInputText(text);
    analyzeDraft(text, rulesConfig);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto font-sans">
      
      {/* ─── Top Studio Banner ─── */}
      <div className="surface-card rounded-3xl p-6 sm:p-8 border dark:border-[#CE4E69]/15 border-[#CE4E69]/15 shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-xs font-mono text-[#CE4E69] font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>10-Directive Humanizing Engine · Provider: {providerConfig.provider.toUpperCase()}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-normal tracking-tight dark:text-white text-[#1a1424]">
              Humanizing Agent <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#CE4E69] via-[#D96B82] to-[#CE4E69]">Studio</span>
            </h1>
            <p className="text-xs sm:text-sm dark:text-[#f0edf5]/70 text-[#1a1424]/75 max-w-2xl leading-relaxed">
              Deconstruct synthetic AI syntax into authentic, relatable human writing. Guided by 10 specialized prompt frameworks: 12yo readability level, coffee-shop conversational cadence, regional grounding, and non-pushy empathy.
            </p>
          </div>

          {/* Protocol Links */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={() => setShowPR39Modal(true)}
              className="btn-mistral-outline text-xs px-3.5 py-2 rounded-xl active:scale-95"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>PR-39 Protocol (31 Rules)</span>
            </button>

            <button
              onClick={() => setShowCheatSheet(true)}
              className="btn-mistral text-xs px-4 py-2 rounded-xl active:scale-95"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>10 Prompts Reference</span>
            </button>
          </div>
        </div>

        {/* Persona Preset Ribbon */}
        <div className="mt-6 pt-5 border-t dark:border-[#CE4E69]/10 border-[#CE4E69]/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-2 text-xs">
            <span className="font-mono text-[#CE4E69] font-bold">Personas:</span>
            {SAMPLE_10_RULE_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handlePresetChange(preset.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer active:scale-95 ${
                  selectedPreset === preset.id
                    ? 'bg-[#CE4E69] text-white shadow-sm shadow-[#CE4E69]/30 font-bold'
                    : 'surface-deep hover:border-[#CE4E69]/40 border dark:border-white/5 border-black/5 dark:text-[#f0edf5]/70 text-[#1a1424]/70'
                }`}
              >
                {preset.name}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowDirectivesMatrix(!showDirectivesMatrix)}
            className="flex items-center space-x-1.5 text-xs font-mono text-[#CE4E69] hover:underline cursor-pointer font-semibold"
          >
            <span>{showDirectivesMatrix ? 'Hide Directives Matrix' : 'Customize 10 Directives'}</span>
            {showDirectivesMatrix ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* ─── Collapsible 10 Directives Matrix ─── */}
      {showDirectivesMatrix && (
        <div className="surface-card rounded-3xl p-6 border dark:border-[#CE4E69]/15 border-[#CE4E69]/15 shadow-xl transition-all">
          <Rules10Manager
            config={rulesConfig}
            onChange={handleRulesChange}
            ruleAudits={analysisBefore?.ruleAudits}
          />
        </div>
      )}

      {/* ─── Split Comparison Workspace ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Column: Raw AI Input */}
        <div className="surface-card rounded-3xl p-6 border dark:border-[#CE4E69]/15 border-[#CE4E69]/15 shadow-xl flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
              <label className="text-xs font-mono font-bold uppercase text-[#CE4E69]">
                Raw AI Text (Synthetic Input)
              </label>
            </div>
            <span className="text-xs font-mono dark:text-[#f0edf5]/50 text-[#1a1424]/50">
              {inputText.split(/\s+/).filter(Boolean).length} words
            </span>
          </div>

          <textarea
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value);
              analyzeDraft(e.target.value, rulesConfig);
            }}
            placeholder="Paste your raw AI draft here..."
            rows={12}
            className="w-full surface-deep rounded-2xl p-4 text-xs sm:text-sm font-sans font-medium dark:text-white text-[#1a1424] dark:placeholder-[#E8899C]/45 placeholder-[#7a6b5a] border dark:border-white/10 border-black/10 focus:outline-none focus:border-[#CE4E69] leading-relaxed shadow-inner resize-y"
          />

          {/* Pre-Scan Detector Warning Banner */}
          {analysisBefore && (
            <div className="surface-deep rounded-2xl p-4 border dark:border-rose-500/20 border-rose-500/20 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-rose-500 flex items-center space-x-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Pre-Scan Detector Verdict</span>
                </span>
                <span className="text-xs font-mono font-bold text-rose-500">
                  {analysisBefore.detectorScores.overallAiRisk}% AI Risk
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                <div className="surface-card p-2 rounded-xl border dark:border-white/10 border-black/5">
                  <div className="text-[10px] font-mono dark:text-[#f0edf5]/50 text-[#1a1424]/50 uppercase">GPTZero</div>
                  <div className="font-bold text-rose-500">{analysisBefore.detectorScores.gptZero}%</div>
                </div>
                <div className="surface-card p-2 rounded-xl border dark:border-white/10 border-black/5">
                  <div className="text-[10px] font-mono dark:text-[#f0edf5]/50 text-[#1a1424]/50 uppercase">Turnitin</div>
                  <div className="font-bold text-rose-500">{analysisBefore.detectorScores.turnitin}%</div>
                </div>
                <div className="surface-card p-2 rounded-xl border dark:border-white/10 border-black/5">
                  <div className="text-[10px] font-mono dark:text-[#f0edf5]/50 text-[#1a1424]/50 uppercase">Clichés</div>
                  <div className="font-bold text-rose-500">{analysisBefore.bannedAcademicCount || analysisBefore.detectedMarkers.length}</div>
                </div>
                <div className="surface-card p-2 rounded-xl border dark:border-white/10 border-black/5">
                  <div className="text-[10px] font-mono dark:text-[#f0edf5]/50 text-[#1a1424]/50 uppercase">Burstiness</div>
                  <div className="font-bold text-[#CE4E69]">{analysisBefore.burstinessScore}</div>
                </div>
              </div>
            </div>
          )}

          {/* Controls Strip */}
          <div className="surface-deep rounded-2xl p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono border dark:border-white/10 border-black/5">
            <div className="flex items-center space-x-2">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#CE4E69]" />
              <span className="dark:text-white text-[#1a1424] font-semibold">Temperature:</span>
              <span className="font-bold text-[#CE4E69]">{temperature}</span>
              <input
                type="range"
                min="0.5"
                max="1.0"
                step="0.02"
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                className="w-20 accent-[#CE4E69]"
              />
            </div>

            {/* Multi-Pass Humanizer Loops */}
            <div className="flex items-center space-x-2">
              <RotateCcw className="w-3.5 h-3.5 text-[#CE4E69]" />
              <span className="dark:text-white text-[#1a1424] font-semibold">Passes:</span>
              <div className="flex items-center space-x-1 bg-black/5 dark:bg-white/5 p-0.5 rounded-xl border dark:border-white/10 border-black/5">
                {[1, 2, 3].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setLoopCount(num)}
                    title={`${num}x Humanizing Pass${num > 1 ? 'es (iterative zero-detection loop)' : ''}`}
                    className={`px-2 py-0.5 rounded-lg text-xs font-bold transition-all ${
                      loopCount === num
                        ? 'bg-[#CE4E69] text-white shadow-sm'
                        : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
                    }`}
                  >
                    {num}x
                  </button>
                ))}
              </div>
            </div>

            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={preserveTables}
                onChange={(e) => setPreserveTables(e.target.checked)}
                className="rounded accent-[#CE4E69]"
              />
              <span className="dark:text-[#f0edf5]/80 text-[#1a1424]/80">Preserve Tables</span>
            </label>
          </div>

          {/* Run Action Button */}
          <button
            onClick={handleRunHumanizer}
            disabled={isLoading || !inputText.trim()}
            className="btn-mistral w-full py-4 text-sm font-bold active:scale-[0.98] transition-all disabled:opacity-40"
          >
            {isLoading ? (
              <span className="flex items-center space-x-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>{stageProgressText || 'Humanizing AI Syntax...'}</span>
              </span>
            ) : (
              <span className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4" />
                <span>Execute 10-Directive Humanization Pass</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </button>
        </div>

        {/* Right Column: Humanized Output */}
        <div className="surface-card rounded-3xl p-6 border dark:border-[#CE4E69]/15 border-[#CE4E69]/15 shadow-xl flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 flex-wrap gap-y-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <label className="text-xs font-mono font-bold uppercase text-emerald-500">
                Humanized Output (0% AI Risk)
              </label>
              {engineVersion && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                  {engineVersion}
                </span>
              )}
            </div>

            {/* Output View Tabs */}
            <div className="flex items-center p-1 rounded-xl surface-deep border dark:border-white/10 border-black/5 text-xs font-mono">
              <button
                onClick={() => setActiveOutputTab('final')}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  activeOutputTab === 'final'
                    ? 'bg-[#CE4E69] text-white font-bold'
                    : 'dark:text-[#f0edf5]/60 text-[#1a1424]/60'
                }`}
              >
                Final Pass
              </button>
              {stage1Intermediate && (
                <button
                  onClick={() => setActiveOutputTab('stage1')}
                  className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                    activeOutputTab === 'stage1'
                      ? 'bg-[#CE4E69] text-white font-bold'
                      : 'dark:text-[#f0edf5]/60 text-[#1a1424]/60'
                  }`}
                >
                  Stage 1
                </button>
              )}
              {compiledPrompt && (
                <button
                  onClick={() => setActiveOutputTab('prompt')}
                  className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                    activeOutputTab === 'prompt'
                      ? 'bg-[#CE4E69] text-white font-bold'
                      : 'dark:text-[#f0edf5]/60 text-[#1a1424]/60'
                  }`}
                >
                  Prompt
                </button>
              )}
            </div>
          </div>

          {/* Output Display */}
          <div className="surface-deep rounded-2xl p-4 text-xs sm:text-sm font-sans leading-relaxed overflow-y-auto max-h-[380px] min-h-[280px] whitespace-pre-wrap select-text dark:text-white text-[#1a1424] font-medium border dark:border-white/10 border-black/10">
            {outputText ? (
              activeOutputTab === 'final'
                ? outputText
                : activeOutputTab === 'stage1'
                ? stage1Intermediate
                : compiledPrompt
            ) : (
              <span className="dark:text-[#f0edf5]/30 text-[#1a1424]/35 italic">
                Humanized document will render here after running the pass.
              </span>
            )}
          </div>

          {/* ── Multi-Candidate Verification Tournament Ribbon ── */}
          {candidates.length > 0 && (
            <div className="surface-deep rounded-2xl p-4 border dark:border-[#CE4E69]/25 border-[#CE4E69]/25 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono flex-wrap gap-2">
                <span className="text-[#CE4E69] font-bold flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                  <span>Verifying Sequence: 3 Candidates Audited</span>
                </span>
                {verificationAudit && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold">
                    🏆 Cleanest Version Auto-Selected
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {candidates.map((cand) => {
                  const isSelected = selectedCandidateId === cand.id;
                  return (
                    <button
                      key={cand.id}
                      onClick={() => {
                        setSelectedCandidateId(cand.id);
                        setOutputText(cand.plainText);
                      }}
                      className={`p-2.5 rounded-xl text-left transition-all border cursor-pointer ${
                        isSelected
                          ? 'bg-[#CE4E69]/15 border-[#CE4E69] text-white shadow-md'
                          : 'surface-card dark:border-white/5 border-black/5 hover:border-[#CE4E69]/40 dark:text-[#f0edf5]/70 text-[#1a1424]/70'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span className="truncate pr-1">{cand.name.split(' ')[0]} {cand.name.split(' ')[1]}</span>
                        {cand.isWinner && (
                          <span className="shrink-0 px-1.5 py-0.2 rounded text-[9px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            WINNER
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between mt-1.5 text-[10px] font-mono">
                        <span className="text-emerald-400 font-semibold">{cand.zerogptRisk}% ZeroGPT</span>
                        <span className="text-sky-400 font-semibold">{cand.burstinessScore} Burst</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {verificationAudit && (
                <div className="text-[11px] font-sans dark:text-[#f0edf5]/60 text-[#1a1424]/60 italic pt-1 border-t dark:border-white/5 border-black/5 flex items-center space-x-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{verificationAudit.winReason}</span>
                </div>
              )}

              {/* Loop Refinement Progression Row */}
              {loopRoundMetrics.length > 1 && (
                <div className="pt-2.5 border-t dark:border-white/5 border-black/5 space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-sky-400 font-bold flex items-center space-x-1.5">
                      <RotateCcw className="w-3 h-3 text-sky-400" />
                      <span>{loopRoundMetrics.length}-Pass Refinement Trajectory:</span>
                    </span>
                    <span className="text-emerald-400 font-bold">
                      {loopRoundMetrics[0].zerogpt}% → {loopRoundMetrics[loopRoundMetrics.length - 1].zerogpt}% ZeroGPT
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {loopRoundMetrics.map((rm) => (
                      <div key={rm.round} className="surface-card p-2 rounded-xl border dark:border-white/5 border-black/5 text-[10px] font-mono">
                        <div className="flex items-center justify-between text-zinc-400 font-bold">
                          <span>Pass {rm.round}</span>
                          <span className="text-sky-400">{rm.burstiness} Burst</span>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-emerald-400 font-bold">{rm.zerogpt}% ZeroGPT</span>
                          <span className="text-rose-400 font-semibold">{rm.turnitin}% Turnitin</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Post-Humanize Verification Breakdown */}
          {analysisAfter && (
            <div className="surface-deep rounded-2xl p-4 border dark:border-emerald-500/25 border-emerald-500/25 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-500 flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Post-Humanize Detector Verification</span>
                </span>
                <span className="text-xs font-mono font-bold text-emerald-500">
                  {analysisAfter.detectorScores.overallAiRisk}% AI Risk ({analysisAfter.verdict})
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                <div className="surface-card p-2 rounded-xl border dark:border-white/10 border-black/5">
                  <div className="text-[10px] font-mono dark:text-[#f0edf5]/50 text-[#1a1424]/50">GPTZero</div>
                  <div className="font-bold text-emerald-500 flex items-center justify-center space-x-0.5">
                    <span>{analysisAfter.detectorScores.gptZero}%</span>
                    <TrendingDown className="w-3 h-3" />
                  </div>
                </div>
                <div className="surface-card p-2 rounded-xl border dark:border-white/10 border-black/5">
                  <div className="text-[10px] font-mono dark:text-[#f0edf5]/50 text-[#1a1424]/50">Turnitin</div>
                  <div className="font-bold text-emerald-500 flex items-center justify-center space-x-0.5">
                    <span>{analysisAfter.detectorScores.turnitin}%</span>
                    <TrendingDown className="w-3 h-3" />
                  </div>
                </div>
                <div className="surface-card p-2 rounded-xl border dark:border-white/10 border-black/5">
                  <div className="text-[10px] font-mono dark:text-[#f0edf5]/50 text-[#1a1424]/50">Reading Level</div>
                  <div className="font-bold text-[#CE4E69] truncate">
                    {analysisAfter.readingGradeLevel?.split(' ')[0] || '12yo'}
                  </div>
                </div>
                <div className="surface-card p-2 rounded-xl border dark:border-white/10 border-black/5">
                  <div className="text-[10px] font-mono dark:text-[#f0edf5]/50 text-[#1a1424]/50">Burstiness</div>
                  <div className="font-bold text-[#CE4E69]">
                    {analysisAfter.burstinessScore}/100
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── Humanizer Feedback & Adaptive Learning System ── */}
          {outputText && (
            <div className="surface-deep rounded-2xl p-3 border dark:border-white/10 border-black/5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold dark:text-[#f0edf5]/80 text-[#1a1424]/80 flex items-center space-x-1.5">
                  <span>How was this output?</span>
                  {feedbackHistory.length > 0 && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#CE4E69]/10 text-[#CE4E69] border border-[#CE4E69]/20 font-bold">
                      {feedbackHistory.length} Adaptive Memory Points
                    </span>
                  )}
                </span>
                <div className="flex items-center space-x-1.5">
                  <button
                    onClick={() => handleFeedback('up')}
                    title="Thumbs Up - AI will learn and replicate this style next time"
                    className={`flex items-center space-x-1 px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
                      feedbackRating === 'up'
                        ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20 scale-105'
                        : 'surface-card dark:border-white/10 border-black/5 text-zinc-400 hover:text-emerald-400 hover:border-emerald-500/40'
                    }`}
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>Good</span>
                  </button>

                  <button
                    onClick={() => handleFeedback('down')}
                    title="Thumbs Down - AI will avoid this method/phrasing next time"
                    className={`flex items-center space-x-1 px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
                      feedbackRating === 'down'
                        ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20 scale-105'
                        : 'surface-card dark:border-white/10 border-black/5 text-zinc-400 hover:text-rose-400 hover:border-rose-500/40'
                    }`}
                  >
                    <ThumbsDown className="w-3.5 h-3.5" />
                    <span>Bad</span>
                  </button>
                </div>
              </div>

              {feedbackStatusMsg && (
                <div className={`text-[11px] font-sans p-2 rounded-xl transition-all ${
                  feedbackRating === 'up'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                }`}>
                  {feedbackStatusMsg}
                </div>
              )}
            </div>
          )}

          {/* Copy Button */}
          <button
            onClick={copyToClipboard}
            disabled={!outputText}
            className="btn-mistral-outline w-full py-3.5 text-xs font-bold active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {copied ? (
              <span className="flex items-center justify-center space-x-1.5 text-emerald-500">
                <Check className="w-4 h-4" />
                <span>Copied to Clipboard!</span>
              </span>
            ) : (
              <span className="flex items-center justify-center space-x-1.5">
                <Copy className="w-4 h-4 text-[#CE4E69]" />
                <span>Copy Humanized Document</span>
              </span>
            )}
          </button>
        </div>

      </div>

      {/* Cadence Visualizer if Available */}
      {analysisBefore && analysisAfter && (
        <CadenceVisualizer
          lengthsBefore={analysisBefore.sentenceLengths || []}
          lengthsAfter={analysisAfter.sentenceLengths || []}
          burstinessBefore={analysisBefore.burstinessScore || 20}
          burstinessAfter={analysisAfter.burstinessScore || 85}
        />
      )}

      {/* Modals */}
      <PR39ProtocolModal isOpen={showPR39Modal} onClose={() => setShowPR39Modal(false)} />
      <PromptsCheatSheetModal isOpen={showCheatSheet} onClose={() => setShowCheatSheet(false)} />
      <SkillModal isOpen={showSkillModal} onClose={() => setShowSkillModal(false)} />

    </div>
  );
};
