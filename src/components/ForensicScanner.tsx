import React, { useState, useEffect } from 'react';
import { Radar, Search } from 'lucide-react';
import { DetectabilityAnalysis } from '../types';
import { SAMPLE_AI_DRAFTS } from '../data/samples';

export const ForensicScanner: React.FC = () => {
  const [text, setText] = useState(SAMPLE_AI_DRAFTS[0].text);
  const [analysis, setAnalysis] = useState<DetectabilityAnalysis | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [highlightMarkers, setHighlightMarkers] = useState(true);

  useEffect(() => {
    runScan(text);
  }, []);

  const runScan = async (contentToScan: string) => {
    if (!contentToScan.trim()) return;
    setIsScanning(true);
    try {
      const res = await fetch('/api/analyze-detector', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: contentToScan }),
      });
      const data = await res.json();
      if (data.success) {
        setAnalysis(data.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsScanning(false);
    }
  };

  const renderHighlightedText = () => {
    if (!text || !highlightMarkers) return text;

    const markerPatterns = [
      'delve(?:s|d|ing)?',
      'tapestry',
      'beacon',
      'foster(?:s|ed|ing)?',
      'testament(?: to)?',
      'pivotal',
      'paramount',
      'landscape',
      'revolutionize(?:s|d|ing)?',
      'underscores?',
      'interconnected',
      'crucially?',
      'furthermore',
      'moreover',
      'in addition',
      'importantly',
      'it is worth noting',
      'it is important to note',
      'in conclusion',
      'in summary',
      'plays a key role',
      'game-changer',
      'cutting-edge',
      'rapidly evolving',
      'multifaceted',
      'consequently',
      'in terms of',
      'one may argue',
      'it is imperative',
      'this suggests that',
      'thus',
      'it is evident that',
      'notwithstanding',
      'pertaining to',
      'therein lies',
      'utilize(?:s|d|ing)?',
      'be advised',
      'hence',
      'indicate(?:s|d|ing)?',
      'facilitate(?:s|d|ing)?',
      'subsequently',
      'it can be seen that',
    ];

    const regex = new RegExp(`\\b(${markerPatterns.join('|')})\\b`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, i) => {
      const isMatch = markerPatterns.some((p) => new RegExp(`^${p}$`, 'i').test(part));
      if (isMatch) {
        return (
          <mark
            key={i}
            className="bg-[#fa520f]/20 text-[#d43e02] dark:text-[#ff8a00] font-bold px-1 py-0.5 rounded border border-[#fa520f]/40 cursor-help"
            title={`Flagged AI Token: "${part}"`}
          >
            {part}
          </mark>
        );
      }
      return part;
    });
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto font-sans">
      {/* Top Banner */}
      <div className="surface-card rounded-3xl p-6 sm:p-8 relative overflow-hidden border dark:border-white/10 border-[#d8c496] glass-card shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-[#fa520f] font-mono text-xs uppercase font-bold mb-1">
              <Radar className="w-4 h-4 text-[#fa520f]" />
              <span className="tracking-wider">KRACKAI "IS IT AI" CLASSIFIER AUDIT</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif dark:text-white text-black font-bold tracking-tight">
              AI Detection Risk &amp; Token Audit
            </h2>
            <p className="text-xs sm:text-sm dark:text-white/80 text-black font-semibold mt-1 max-w-2xl leading-relaxed">
              Scan raw text to highlight AI clichés, evaluate sentence burstiness scores, and predict classifier verdicts across Turnitin, GPTZero, ZeroGPT, and CopyLeaks.
            </p>
          </div>

          <button
            onClick={() => runScan(text)}
            disabled={isScanning || !text.trim()}
            className="btn-mistral text-xs h-11 px-5 shrink-0 shimmer-effect hover:scale-105 transition-all cursor-pointer"
          >
            <Search className="w-4 h-4" />
            <span>{isScanning ? 'Scanning...' : 'Audit Document'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Text & Highlights */}
        <div className="lg:col-span-2 surface-card rounded-3xl p-6 space-y-4 border dark:border-white/10 border-[#d8c496] glass-card shadow-xl">
          <div className="flex items-center justify-between border-b dark:border-white/10 border-[#d8c496] pb-3 text-xs font-mono">
            <span className="font-bold dark:text-white text-black">Source Text Corpus</span>
            <label className="flex items-center space-x-2 cursor-pointer font-bold dark:text-white text-black">
              <input
                type="checkbox"
                checked={highlightMarkers}
                onChange={(e) => setHighlightMarkers(e.target.checked)}
                className="rounded accent-[#fa520f]"
              />
              <span>Highlight AI Tokens</span>
            </label>
          </div>

          <div className="relative">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={12}
              placeholder="Paste text here to perform classifier scan..."
              className="w-full surface-deep rounded-2xl p-4 text-sm dark:text-white text-black font-semibold focus:outline-none focus:border-[#fa520f] font-sans leading-relaxed resize-y border dark:border-white/10 border-[#d8c496] shadow-inner"
            />
          </div>

          {highlightMarkers && (
            <div className="surface-deep rounded-2xl p-4 text-sm font-sans leading-relaxed max-h-60 overflow-y-auto whitespace-pre-wrap select-text dark:text-white text-black border dark:border-white/10 border-[#d8c496] shadow-inner">
              <div className="text-xs font-mono text-[#fa520f] font-bold mb-2">TOKEN HIGHLIGHT PREVIEW:</div>
              {renderHighlightedText()}
            </div>
          )}
        </div>

        {/* Right Column: Scan Metrics */}
        <div className="space-y-4">
          {analysis ? (
            <div className="surface-card rounded-3xl p-6 space-y-4 font-mono text-xs border dark:border-white/10 border-[#d8c496] glass-card shadow-xl">
              <div className="border-b dark:border-white/10 border-[#d8c496] pb-3">
                <span className="dark:text-white/60 text-black uppercase font-bold text-[10px]">OVERALL RISK ASSESSMENT</span>
                <div className="text-3xl font-serif text-[#fa520f] font-bold mt-1">
                  {analysis.detectorScores.overallAiRisk}% AI RISK
                </div>
                <div className="dark:text-white/80 text-black font-bold text-xs mt-0.5">{analysis.verdict}</div>
              </div>

              <div className="space-y-2">
                <span className="dark:text-white/60 text-black uppercase font-bold text-[10px]">DETECTOR BREAKDOWN</span>
                <div className="space-y-1.5 text-xs font-bold">
                  <div className="flex items-center justify-between p-2.5 rounded-xl surface-deep border dark:border-white/10 border-[#d8c496]">
                    <span className="dark:text-white text-black">Turnitin</span>
                    <span className="text-[#fa520f]">{analysis.detectorScores.turnitin}% AI</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl surface-deep border dark:border-white/10 border-[#d8c496]">
                    <span className="dark:text-white text-black">GPTZero</span>
                    <span className="text-[#fa520f]">{analysis.detectorScores.gptZero}% AI</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl surface-deep border dark:border-white/10 border-[#d8c496]">
                    <span className="dark:text-white text-black">ZeroGPT</span>
                    <span className="text-[#fa520f]">{analysis.detectorScores.zeroGpt}% AI</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl surface-deep border dark:border-white/10 border-[#d8c496]">
                    <span className="dark:text-white text-black">CopyLeaks</span>
                    <span className="text-[#fa520f]">{analysis.detectorScores.copyLeaks}% AI</span>
                  </div>
                </div>
              </div>

              <div className="border-t dark:border-white/10 border-[#d8c496] pt-3 space-y-2 font-bold">
                <div className="flex justify-between">
                  <span className="dark:text-white/80 text-black">Sentence Burstiness:</span>
                  <span className="dark:text-[#ffd900] text-black font-extrabold">{analysis.burstinessScore}/100</span>
                </div>
                <div className="flex justify-between">
                  <span className="dark:text-white/80 text-black">Avg Sentence Length:</span>
                  <span className="dark:text-white text-black">{analysis.avgSentenceLength} words</span>
                </div>
                <div className="flex justify-between">
                  <span className="dark:text-white/80 text-black">Flagged AI Tokens:</span>
                  <span className="text-[#fa520f] font-extrabold">{analysis.detectedMarkers.length} tokens</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="surface-card rounded-3xl p-8 text-center text-xs font-mono dark:text-white/50 text-black font-bold glass-card border dark:border-white/10 border-[#d8c496]">
              Click "Audit Document" to generate classifier risk analysis.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
