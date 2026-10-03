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
} from 'lucide-react';
import { SAMPLE_AI_DRAFTS } from '../data/samples';
import { DetectabilityAnalysis } from '../types';
import { CadenceVisualizer } from './CadenceVisualizer';
import { ProviderConfig } from './SettingsModal';

interface HumanizerStudioProps {
  providerConfig: ProviderConfig;
  onOpenSettings?: () => void;
}

export const HumanizerStudio: React.FC<HumanizerStudioProps> = ({ providerConfig, onOpenSettings }) => {
  const [inputText, setInputText] = useState(SAMPLE_AI_DRAFTS[0].text);
  const [selectedPreset, setSelectedPreset] = useState(SAMPLE_AI_DRAFTS[0].id);
  const [temperature, setTemperature] = useState(0.88);
  const [preserveTables, setPreserveTables] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [stageProgressText, setStageProgressText] = useState('');

  const [outputText, setOutputText] = useState('');
  const [stage1Intermediate, setStage1Intermediate] = useState('');
  const [analysisBefore, setAnalysisBefore] = useState<DetectabilityAnalysis | null>(null);
  const [analysisAfter, setAnalysisAfter] = useState<DetectabilityAnalysis | null>(null);

  const [copied, setCopied] = useState(false);
  const [activeOutputTab, setActiveOutputTab] = useState<'final' | 'stage1'>('final');

  useEffect(() => {
    analyzeDraft(inputText);
  }, []);

  const handlePresetChange = (presetId: string) => {
    setSelectedPreset(presetId);
    const found = SAMPLE_AI_DRAFTS.find((p) => p.id === presetId);
    if (found) {
      setInputText(found.text);
      analyzeDraft(found.text);
      setOutputText('');
      setAnalysisAfter(null);
    }
  };

  const analyzeDraft = async (textToScan: string) => {
    try {
      const res = await fetch('/api/analyze-detector', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: textToScan }),
      });
      const data = await res.json();
      if (data.success) {
        setAnalysisBefore(data.data);
      }
    } catch (e) {
      console.error('Failed to analyze draft', e);
    }
  };

  const handleRunHumanizer = async () => {
    if (!inputText.trim()) return;

    setIsLoading(true);
    setStageProgressText(`Stage 1: De-synthesizing structure using ${providerConfig.provider.toUpperCase()} (${providerConfig.model})...`);

    try {
      const timer = setTimeout(() => {
        setStageProgressText('Stage 2: Micro-syntax cadence refinement & AI token purging...');
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
        }),
      });

      clearTimeout(timer);
      const data = await res.json();

      if (data.success) {
        setOutputText(data.humanizedPlainText || data.humanizedText);
        setStage1Intermediate(data.stage1Text || '');
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
      {/* Top Banner */}
      <div className="surface-card rounded-2xl p-6 relative overflow-hidden border dark:border-[#e6d5a8]/20 border-[#d8c496]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-[#fa520f] font-bold mb-1">
              <ShieldCheck className="w-4 h-4 text-[#fa520f]" />
              <span>KRACKAI "HUMAN IT" ENGINE</span>
              <span>·</span>
              <span className="uppercase text-black dark:text-[#ffd06a]">Provider: {providerConfig.provider}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif dark:text-white text-black font-bold tracking-tight">
              Two-Stage Anti-AI Humanization Studio
            </h2>
            <p className="text-xs sm:text-sm dark:text-white/80 text-black font-semibold mt-1 max-w-3xl leading-relaxed">
              Transform formulaic AI text into authentic human-grade prose. Eradicate telltale tokens,
              infuse asymmetric sentence burstiness, and force high perplexity to bypass Turnitin, GPTZero, ZeroGPT,
              and CopyLeaks with near-zero AI risk.
            </p>
          </div>

          {/* Presets */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
            <span className="dark:text-white text-black font-bold mr-1">Presets:</span>
            {SAMPLE_AI_DRAFTS.map((p) => (
              <button
                key={p.id}
                onClick={() => handlePresetChange(p.id)}
                className={`px-3 py-1 rounded-lg border transition-colors cursor-pointer ${
                  selectedPreset === p.id
                    ? 'bg-[#fa520f] text-white font-bold border-[#fa520f]'
                    : 'tag-chip hover:border-[#fa520f] text-black dark:text-[#ffd06a]'
                }`}
              >
                {p.title.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT PANEL */}
        <div className="surface-card rounded-2xl p-5 flex flex-col space-y-4 border dark:border-[#e6d5a8]/20 border-[#d8c496]">
          <div className="flex items-center justify-between border-b dark:border-[#e6d5a8]/15 border-[#d8c496] pb-3 text-xs font-mono">
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4 text-[#fa520f]" />
              <span className="font-bold dark:text-white text-black">Source AI Input</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="dark:text-white/80 text-black font-bold">
                {inputText.split(/\s+/).filter(Boolean).length} words
              </span>
              {onOpenSettings && (
                <button onClick={onOpenSettings} className="text-[#fa520f] font-bold hover:underline">
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
                analyzeDraft(e.target.value);
              }}
              rows={11}
              placeholder="Paste AI-generated research draft or essay here..."
              className="w-full surface-deep rounded-xl p-3.5 text-sm dark:text-white text-black font-bold dark:placeholder-[#ffd06a]/50 placeholder-[#52391e] focus:outline-none focus:border-[#fa520f] font-sans leading-relaxed resize-y border dark:border-[#e6d5a8]/15 border-[#d8c496]"
            />
          </div>

          {analysisBefore && (
            <div className="surface-deep rounded-xl p-3.5 space-y-3 font-mono text-xs border dark:border-[#e6d5a8]/10 border-[#d8c496]">
              <div className="flex items-center justify-between">
                <span className="dark:text-white text-black font-bold uppercase flex items-center space-x-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-[#fa520f]" />
                  <span>Pre-Scan AI Risk</span>
                </span>
                <span className="text-[#fa520f] font-bold text-sm">
                  {analysisBefore.detectorScores.overallAiRisk}% AI
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                <div className="surface-card p-2 rounded-lg border dark:border-[#e6d5a8]/15 border-[#d8c496]">
                  <div className="dark:text-white/70 text-black text-[10px] uppercase font-bold">GPTZero</div>
                  <div className="font-bold text-[#fa520f] text-sm">{analysisBefore.detectorScores.gptZero}%</div>
                </div>
                <div className="surface-card p-2 rounded-lg border dark:border-[#e6d5a8]/15 border-[#d8c496]">
                  <div className="dark:text-white/70 text-black text-[10px] uppercase font-bold">Turnitin</div>
                  <div className="font-bold text-[#fa520f] text-sm">{analysisBefore.detectorScores.turnitin}%</div>
                </div>
                <div className="surface-card p-2 rounded-lg border dark:border-[#e6d5a8]/15 border-[#d8c496]">
                  <div className="dark:text-white/70 text-black text-[10px] uppercase font-bold">ZeroGPT</div>
                  <div className="font-bold text-[#fa520f] text-sm">{analysisBefore.detectorScores.zeroGpt}%</div>
                </div>
                <div className="surface-card p-2 rounded-lg border dark:border-[#e6d5a8]/15 border-[#d8c496]">
                  <div className="dark:text-white/70 text-black text-[10px] uppercase font-bold">Burstiness</div>
                  <div className="font-bold dark:text-[#ffd900] text-black text-sm">{analysisBefore.burstinessScore}</div>
                </div>
              </div>
            </div>
          )}

          <div className="surface-deep rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 text-xs font-mono border dark:border-[#e6d5a8]/10 border-[#d8c496]">
            <div className="flex items-center space-x-3">
              <Sliders className="w-3.5 h-3.5 text-[#fa520f]" />
              <div className="flex items-center space-x-2">
                <span className="dark:text-white text-black font-bold">Temp:</span>
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
              <span>Retain Facts</span>
            </label>
          </div>

          <button
            onClick={handleRunHumanizer}
            disabled={isLoading || !inputText.trim()}
            className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center space-x-2 transition-all cursor-pointer ${
              isLoading || !inputText.trim()
                ? 'opacity-50 cursor-not-allowed bg-gray-400 text-white'
                : 'btn-mistral'
            }`}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Running KrackAI Rewrite ({providerConfig.provider.toUpperCase()})...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Human it (Two-Stage Pass)</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          {isLoading && (
            <div className="p-3 surface-deep rounded-xl text-xs font-mono font-bold text-[#fa520f]">
              {stageProgressText}
            </div>
          )}
        </div>

        {/* RIGHT PANEL */}
        <div className="surface-card rounded-2xl p-5 flex flex-col space-y-4 border dark:border-[#e6d5a8]/20 border-[#d8c496]">
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
              </div>

              <div className="surface-deep rounded-xl p-4 text-sm font-sans leading-relaxed overflow-y-auto max-h-[380px] whitespace-pre-wrap select-text dark:text-white text-black font-semibold border dark:border-[#e6d5a8]/10 border-[#d8c496]">
                {activeOutputTab === 'final' ? outputText : stage1Intermediate}
              </div>

              {analysisAfter && (
                <div className="surface-deep rounded-xl p-3.5 space-y-2 font-mono text-xs border dark:border-[#e6d5a8]/10 border-[#d8c496]">
                  <div className="flex items-center justify-between">
                    <span className="text-[#fa520f] font-bold flex items-center space-x-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Scan Result</span>
                    </span>
                    <span className="text-[#fa520f] font-bold text-sm">
                      {analysisAfter.detectorScores.overallAiRisk}% AI Risk
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
                      <div className="dark:text-white/70 text-black text-[10px] font-bold">ZeroGPT</div>
                      <div className="font-bold text-[#fa520f] flex items-center justify-center space-x-0.5">
                        <span>{analysisAfter.detectorScores.zeroGpt}%</span>
                        <TrendingDown className="w-3 h-3" />
                      </div>
                    </div>
                    <div className="surface-card p-2 rounded-lg border dark:border-[#e6d5a8]/15 border-[#d8c496]">
                      <div className="dark:text-white/70 text-black text-[10px] font-bold">Burstiness</div>
                      <div className="font-bold dark:text-[#ffd900] text-black">
                        {analysisAfter.burstinessScore}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed dark:border-[#e6d5a8]/20 border-[#c4b184] rounded-xl p-8 text-center text-xs font-mono dark:text-white text-black font-bold">
              Paste AI text and click "Human it" to process.
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
    </div>
  );
};
