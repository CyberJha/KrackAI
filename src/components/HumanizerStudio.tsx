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
} from 'lucide-react';
import { SAMPLE_AI_DRAFTS, DEFAULT_10_RULES_CONFIG, SAMPLE_10_RULE_PRESETS } from '../data/samples';
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

export const HumanizerStudio: React.FC<HumanizerStudioProps> = ({ providerConfig, onOpenSettings, onOpenSkill }) => {
  const [inputText, setInputText] = useState(SAMPLE_10_RULE_PRESETS[0].sampleInput);
  const [selectedPreset, setSelectedPreset] = useState(SAMPLE_10_RULE_PRESETS[0].id);
  const [temperature, setTemperature] = useState(0.88);
  const [preserveTables, setPreserveTables] = useState(true);
  const [rulesConfig, setRulesConfig] = useState<Humanizer10RulesConfig>(DEFAULT_10_RULES_CONFIG);
  const [showCheatSheet, setShowCheatSheet] = useState(false);
  const [showPR39Modal, setShowPR39Modal] = useState(false);
  const [showSkillModal, setShowSkillModal] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [stageProgressText, setStageProgressText] = useState('');

  const [outputText, setOutputText] = useState('');
  const [stage1Intermediate, setStage1Intermediate] = useState('');
  const [compiledPrompt, setCompiledPrompt] = useState('');
  const [analysisBefore, setAnalysisBefore] = useState<DetectabilityAnalysis | null>(null);
  const [analysisAfter, setAnalysisAfter] = useState<DetectabilityAnalysis | null>(null);

  const [copied, setCopied] = useState(false);
  const [activeOutputTab, setActiveOutputTab] = useState<'final' | 'stage1' | 'prompt'>('final');

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
    if (!inputText.trim()) return;

    setIsLoading(true);
    setStageProgressText(`Stage 1: Enforcing 10 Directives via ${providerConfig.provider.toUpperCase()} (${providerConfig.model})...`);

    try {
      const timer = setTimeout(() => {
        setStageProgressText('Stage 2: Coffee-shop cadence inversion & 0% AI risk pass...');
      }, 1600);

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
        }),
      });

      clearTimeout(timer);
      const data = await res.json();

      if (data.success) {
        setOutputText(data.humanizedPlainText || data.humanizedText);
        setStage1Intermediate(data.stage1Text || '');
        setCompiledPrompt(data.compiledPrompt || '');
        setAnalysisBefore(data.analysisBefore);
        setAnalysisAfter(data.analysisAfter);
      } else {
        alert(data.error || 'Humanization failed. Please verify your API Key and provider settings.');
      }
    } catch (err: any) {
      console.error(err);
      alert('Error during humanization: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto font-sans">
      {/* Top Banner with UI Flair */}
      <div className="surface-card rounded-3xl p-6 sm:p-8 relative overflow-hidden border dark:border-white/10 border-[#d8c496] glass-card shadow-2xl">
        {/* Subtle Ambient Glow Flare in Background */}
        <div 
          className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #fa520f 0%, #ff8a00 50%, transparent 75%)' }}
        />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative z-10">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-mono tag-chip px-3.5 py-1 rounded-full mb-2.5 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#fa520f] to-[#ff8a00] animate-pulse"></div>
              <ShieldCheck className="w-3.5 h-3.5 text-[#fa520f]" />
              <span className="tracking-wider uppercase font-extrabold text-[#fa520f]">10-Directive Humanizing Engine</span>
              <span>·</span>
              <span className="uppercase text-black dark:text-[#ffd06a] font-bold">Provider: {providerConfig.provider}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif dark:text-white text-black font-bold tracking-tight">
              Humanizing Agent <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#fa520f] via-[#ff7b1a] to-[#fa520f]">Studio</span>
            </h2>
            <p className="text-xs sm:text-sm dark:text-white/80 text-black font-semibold mt-1.5 max-w-3xl leading-relaxed">
              De-synthesize AI text into authentic, engaging, relatable human writing. Guided by 10 specialized prompt frameworks:
              12yo reading level, coffee-shop conversational flow, regional nuance, brand voice, non-pushy empathy, and asymmetric cadence.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono shrink-0">
            <button
              onClick={() => setShowPR39Modal(true)}
              className="btn-mistral-outline h-10 px-3.5 text-xs flex items-center space-x-1.5 cursor-pointer shadow-sm border-[#fa520f]/50 text-[#fa520f] hover:bg-[#fa520f]/15 hover:scale-105 transition-all"
              title="Inspect PR-39 4-Tier Conflict Hierarchy & 31 Pattern Checkpoints"
            >
              <ShieldCheck className="w-4 h-4 text-[#fa520f]" />
              <span>PR-39 Protocol (31 Checkpoints)</span>
            </button>

            <button
              onClick={() => setShowCheatSheet(true)}
              className="btn-mistral h-10 px-4 text-xs flex items-center space-x-1.5 cursor-pointer shadow-md shimmer-effect hover:scale-105 transition-all"
            >
              <BookOpen className="w-4 h-4 text-[#ffd900]" />
              <span>10 Prompts Reference</span>
            </button>
          </div>
        </div>
      </div>

      {/* 10-Rule Interactive Configurator */}
      <Rules10Manager
        config={rulesConfig}
        onChange={handleRulesChange}
        ruleAudits={analysisAfter?.ruleAudits || analysisBefore?.ruleAudits}
        onOpenCheatSheet={() => setShowCheatSheet(true)}
        onOpenSkillModal={() => (onOpenSkill ? onOpenSkill() : setShowSkillModal(true))}
      />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT PANEL */}
        <div className="surface-card rounded-3xl p-6 flex flex-col space-y-4 border dark:border-white/10 border-[#d8c496] glass-card shadow-xl">
          <div className="flex items-center justify-between border-b dark:border-white/10 border-[#d8c496] pb-3 text-xs font-mono">
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4 text-[#fa520f]" />
              <span className="font-bold dark:text-white text-black">Source AI Input</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="dark:text-white/80 text-black font-bold">
                {inputText.split(/\s+/).filter(Boolean).length} words
              </span>
              {onOpenSettings && (
                <button onClick={onOpenSettings} className="text-[#fa520f] font-bold hover:underline cursor-pointer">
                  [{providerConfig.provider.toUpperCase()}]
                </button>
              )}
            </div>
          </div>

          <div className="relative">
            <textarea
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
                analyzeDraft(e.target.value, rulesConfig);
              }}
              rows={10}
              placeholder="Paste AI-generated research draft, article, or essay here..."
              className="w-full surface-deep rounded-2xl p-4 text-sm dark:text-white text-black font-bold dark:placeholder-[#ffd06a]/50 placeholder-[#52391e] focus:outline-none focus:border-[#fa520f] font-sans leading-relaxed resize-y border dark:border-white/10 border-[#d8c496] shadow-inner"
            />
          </div>

          {analysisBefore && (
            <div className="surface-deep rounded-2xl p-4 space-y-3 font-mono text-xs border dark:border-white/10 border-[#d8c496] shadow-inner">
              <div className="flex items-center justify-between">
                <span className="dark:text-white text-black font-bold uppercase flex items-center space-x-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-[#fa520f]" />
                  <span>Pre-Scan AI Detectability</span>
                </span>
                <span className="text-[#fa520f] font-bold text-sm">
                  {analysisBefore.detectorScores.overallAiRisk}% AI Risk
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                <div className="surface-card p-2 rounded-xl border dark:border-white/10 border-[#d8c496]">
                  <div className="dark:text-white/70 text-black text-[10px] uppercase font-bold">GPTZero</div>
                  <div className="font-bold text-[#fa520f] text-sm">{analysisBefore.detectorScores.gptZero}%</div>
                </div>
                <div className="surface-card p-2 rounded-xl border dark:border-white/10 border-[#d8c496]">
                  <div className="dark:text-white/70 text-black text-[10px] uppercase font-bold">Turnitin</div>
                  <div className="font-bold text-[#fa520f] text-sm">{analysisBefore.detectorScores.turnitin}%</div>
                </div>
                <div className="surface-card p-2 rounded-xl border dark:border-white/10 border-[#d8c496]">
                  <div className="dark:text-white/70 text-black text-[10px] uppercase font-bold">Banned Clichés</div>
                  <div className="font-bold text-[#fa520f] text-sm">{analysisBefore.bannedAcademicCount || analysisBefore.detectedMarkers.length}</div>
                </div>
                <div className="surface-card p-2 rounded-xl border dark:border-white/10 border-[#d8c496]">
                  <div className="dark:text-white/70 text-black text-[10px] uppercase font-bold">Burstiness</div>
                  <div className="font-bold dark:text-[#ffd900] text-black text-sm">{analysisBefore.burstinessScore}</div>
                </div>
              </div>
            </div>
          )}

          <div className="surface-deep rounded-2xl p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono border dark:border-white/10 border-[#d8c496]">
            <div className="flex items-center space-x-3">
              <Sliders className="w-3.5 h-3.5 text-[#fa520f]" />
              <div className="flex items-center space-x-2">
                <span className="dark:text-white text-black font-bold">Creativity Temp:</span>
                <span className="font-bold text-[#fa520f]">{temperature}</span>
                <input
                  type="range"
                  min="0.60"
                  max="1.0"
                  step="0.02"
                  value={temperature}
                  onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  className="w-20 accent-[#fa520f] cursor-pointer"
                />
              </div>
            </div>

            <label className="flex items-center space-x-2 cursor-pointer font-bold dark:text-white text-black">
              <input
                type="checkbox"
                checked={preserveTables}
                onChange={(e) => setPreserveTables(e.target.checked)}
                className="rounded accent-[#fa520f]"
              />
              <span>Retain Facts & Tables</span>
            </label>
          </div>

          <button
            onClick={handleRunHumanizer}
            disabled={isLoading || !inputText.trim()}
            className={`w-full py-4 px-5 rounded-2xl font-bold text-sm flex items-center justify-center space-x-2 transition-all cursor-pointer ${
              isLoading || !inputText.trim()
                ? 'opacity-50 cursor-not-allowed bg-gray-400 text-white'
                : 'btn-mistral shimmer-effect'
            }`}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Applying 10 Humanizing Directives ({providerConfig.provider.toUpperCase()})...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-[#ffd900]" />
                <span>Humanize with 10 Directives</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          {isLoading && (
            <div className="p-3 surface-deep rounded-xl text-xs font-mono font-bold text-[#fa520f] animate-pulse">
              {stageProgressText}
            </div>
          )}
        </div>

        {/* RIGHT PANEL */}
        <div className="surface-card rounded-3xl p-6 flex flex-col space-y-4 border dark:border-white/10 border-[#d8c496] glass-card shadow-xl">
          <div className="flex items-center justify-between border-b dark:border-[#e6d5a8]/15 border-[#d8c496] pb-3 text-xs font-mono">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-[#fa520f]" />
              <span className="font-bold dark:text-white text-black">Humanized Output (0% AI Risk)</span>
            </div>

            {outputText && (
              <button
                onClick={copyToClipboard}
                className="btn-mistral text-xs h-8 px-3"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            )}
          </div>

          {outputText ? (
            <div className="flex flex-col space-y-4 flex-1">
              <div className="flex space-x-2 text-xs font-mono border-b dark:border-[#e6d5a8]/15 border-[#d8c496] pb-2">
                <button
                  onClick={() => setActiveOutputTab('final')}
                  className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                    activeOutputTab === 'final'
                      ? 'bg-[#fa520f] text-white font-bold'
                      : 'dark:text-white text-black hover:bg-[#eee0b8]'
                  }`}
                >
                  Final Output
                </button>
                {stage1Intermediate && (
                  <button
                    onClick={() => setActiveOutputTab('stage1')}
                    className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                      activeOutputTab === 'stage1'
                        ? 'bg-[#fa520f] text-white font-bold'
                        : 'dark:text-white text-black hover:bg-[#eee0b8]'
                    }`}
                  >
                    Stage 1 Draft
                  </button>
                )}
                {compiledPrompt && (
                  <button
                    onClick={() => setActiveOutputTab('prompt')}
                    className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                      activeOutputTab === 'prompt'
                        ? 'bg-[#fa520f] text-white font-bold'
                        : 'dark:text-white text-black hover:bg-[#eee0b8]'
                    }`}
                  >
                    Injected Directives
                  </button>
                )}
              </div>

              <div className="surface-deep rounded-xl p-4 text-sm font-sans leading-relaxed overflow-y-auto max-h-[380px] whitespace-pre-wrap select-text dark:text-white text-black font-semibold border dark:border-[#e6d5a8]/10 border-[#d8c496]">
                {activeOutputTab === 'final'
                  ? outputText
                  : activeOutputTab === 'stage1'
                  ? stage1Intermediate
                  : compiledPrompt}
              </div>

              {analysisAfter && (
                <div className="surface-deep rounded-xl p-3.5 space-y-2 font-mono text-xs border dark:border-[#e6d5a8]/10 border-[#d8c496]">
                  <div className="flex items-center justify-between">
                    <span className="text-[#fa520f] font-bold flex items-center space-x-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Post-Humanize Detector Verification</span>
                    </span>
                    <span className="text-[#fa520f] font-bold text-sm">
                      {analysisAfter.detectorScores.overallAiRisk}% AI Risk ({analysisAfter.verdict})
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-2 text-center text-xs">
                    <div className="surface-card p-2 rounded-lg border dark:border-[#e6d5a8]/15 border-[#d8c496]">
                      <div className="dark:text-white/70 text-black text-[10px] font-bold">GPTZero</div>
                      <div className="font-bold text-[#fa520f] flex items-center justify-center space-x-0.5">
                        <span>{analysisAfter.detectorScores.gptZero}%</span>
                        <TrendingDown className="w-3 h-3" />
                      </div>
                    </div>
                    <div className="surface-card p-2 rounded-lg border dark:border-[#e6d5a8]/15 border-[#d8c496]">
                      <div className="dark:text-white/70 text-black text-[10px] font-bold">Turnitin</div>
                      <div className="font-bold text-[#fa520f] flex items-center justify-center space-x-0.5">
                        <span>{analysisAfter.detectorScores.turnitin}%</span>
                        <TrendingDown className="w-3 h-3" />
                      </div>
                    </div>
                    <div className="surface-card p-2 rounded-lg border dark:border-[#e6d5a8]/15 border-[#d8c496]">
                      <div className="dark:text-white/70 text-black text-[10px] font-bold">Reading Level</div>
                      <div className="font-bold text-[#fa520f] text-[11px] truncate">
                        {analysisAfter.readingGradeLevel?.split(' ')[0] || '12yo'}
                      </div>
                    </div>
                    <div className="surface-card p-2 rounded-lg border dark:border-[#e6d5a8]/15 border-[#d8c496]">
                      <div className="dark:text-white/70 text-black text-[10px] font-bold">Burstiness</div>
                      <div className="font-bold dark:text-[#ffd900] text-black">
                        {analysisAfter.burstinessScore}/100
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed dark:border-[#e6d5a8]/20 border-[#c4b184] rounded-xl p-8 text-center text-xs font-mono dark:text-white text-black font-bold">
              Paste AI text and click "Humanize with 10 Directives" to transform and verify your writing.
            </div>
          )}
        </div>
      </div>

      {/* Cadence Visualizer */}
      <CadenceVisualizer
        lengthsBefore={analysisBefore?.sentenceLengths || []}
        lengthsAfter={analysisAfter?.sentenceLengths || []}
        burstinessBefore={analysisBefore?.burstinessScore || 0}
        burstinessAfter={analysisAfter?.burstinessScore || 0}
      />

      {/* Cheatsheet Modal */}
      <PromptsCheatSheetModal
        isOpen={showCheatSheet}
        onClose={() => setShowCheatSheet(false)}
      />

      {/* PR-39 Protocol Modal */}
      <PR39ProtocolModal
        isOpen={showPR39Modal}
        onClose={() => setShowPR39Modal(false)}
      />

      {/* Skill CLI Modal */}
      <SkillModal
        isOpen={showSkillModal}
        onClose={() => setShowSkillModal(false)}
      />
    </div>
  );
};

