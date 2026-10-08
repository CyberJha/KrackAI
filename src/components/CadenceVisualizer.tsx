import React from 'react';
import { Activity, Zap, Sparkles, Waves } from 'lucide-react';

interface CadenceVisualizerProps {
  lengthsBefore: number[];
  lengthsAfter: number[];
  burstinessBefore: number;
  burstinessAfter: number;
}

export const CadenceVisualizer: React.FC<CadenceVisualizerProps> = ({
  lengthsBefore,
  lengthsAfter,
  burstinessBefore,
  burstinessAfter,
}) => {
  const maxLenBefore = lengthsBefore.length > 0 ? Math.max(...lengthsBefore, 45) : 45;
  const maxLenAfter = lengthsAfter.length > 0 ? Math.max(...lengthsAfter, 45) : 45;
  const globalMax = Math.max(maxLenBefore, maxLenAfter, 50);

  return (
    <div className="surface-card rounded-3xl p-6 border dark:border-white/10 border-[#CE4E69] glass-card shadow-xl space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono font-bold">
        <div className="flex items-center space-x-2.5 dark:text-white text-black">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#CE4E69] to-[#D96B82] flex items-center justify-center text-white shadow-md shadow-[#CE4E69]/30">
            <Waves className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <h4 className="text-base font-serif font-bold dark:text-white text-black flex items-center space-x-2">
              <span>Sentence Cadence &amp; Soundwave Spectrum</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#CE4E69]/15 text-[#CE4E69] border border-[#CE4E69]/30">
                Interactive Rhythm
              </span>
            </h4>
            <p className="text-[11px] font-sans dark:text-white/60 text-black font-semibold">
              Forensic analysis of rhythm irregularity (per-sentence length variance).
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 text-xs font-bold shrink-0">
          <span className="flex items-center space-x-1.5 text-rose-600 dark:text-rose-400">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block shadow-sm" />
            <span>AI Flatline</span>
          </span>
          <span className="flex items-center space-x-1.5 text-emerald-600 dark:text-emerald-400">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block shadow-sm shadow-emerald-500/50" />
            <span>Humanized Surge</span>
          </span>
        </div>
      </div>

      {/* Visualizer Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs font-mono font-bold">
        {/* Before Cadence (Flat AI) */}
        <div className="surface-deep rounded-2xl p-4 space-y-3 border dark:border-white/10 border-[#CE4E69] shadow-inner relative overflow-hidden group">
          <div className="flex items-center justify-between dark:text-white text-black font-bold">
            <span className="flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              <span>Raw Sequence ({lengthsBefore.length} sentences)</span>
            </span>
            <span className="text-rose-600 dark:text-rose-400 bg-rose-500/10 px-2.5 py-0.5 rounded-lg border border-rose-500/30 text-[11px]">
              Burstiness: {burstinessBefore}/100
            </span>
          </div>

          <div className="h-28 flex items-end space-x-1.5 pt-4 pb-1 overflow-x-auto scrollbar-thin px-1">
            {lengthsBefore.length === 0 ? (
              <div className="w-full text-center text-xs dark:text-white/50 text-black py-8 font-sans font-bold">
                No sentence data
              </div>
            ) : (
              lengthsBefore.map((len, idx) => {
                const heightPercent = Math.min(100, Math.max(12, (len / globalMax) * 100));
                return (
                  <div
                    key={idx}
                    className="flex-1 min-w-[10px] max-w-[24px] group/bar relative flex flex-col items-center justify-end h-full"
                  >
                    {/* Tooltip on Hover */}
                    <div className="absolute -top-7 opacity-0 group-hover/bar:opacity-100 transition-opacity bg-black text-white text-[10px] px-1.5 py-0.5 rounded pointer-events-none whitespace-nowrap z-20 shadow-lg border border-white/20">
                      #{idx + 1}: {len}w
                    </div>
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className="w-full bg-gradient-to-t from-rose-600 to-rose-400 rounded-t-md transition-all duration-300 group-hover/bar:brightness-125 shadow-sm"
                    />
                  </div>
                );
              })
            )}
          </div>
          <div className="text-[11px] dark:text-white/70 text-black text-center font-sans font-semibold">
            Uniform sentences (16–22 words) easily flagged by classifiers.
          </div>
        </div>

        {/* After Cadence (Human Spiky Burstiness) */}
        <div className="surface-deep rounded-2xl p-4 space-y-3 border dark:border-white/10 border-[#CE4E69] shadow-inner relative overflow-hidden group">
          <div className="flex items-center justify-between dark:text-white text-black font-bold">
            <span className="flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Humanized Sequence ({lengthsAfter.length} sentences)</span>
            </span>
            <span className="text-emerald-600 dark:text-emerald-400 bg-emerald-500/15 px-2.5 py-0.5 rounded-lg border border-emerald-500/40 text-[11px] flex items-center space-x-1 shadow-sm shadow-emerald-500/20">
              <Zap className="w-3 h-3 text-emerald-500" />
              <span>Burstiness: {burstinessAfter}/100</span>
            </span>
          </div>

          <div className="h-28 flex items-end space-x-1.5 pt-4 pb-1 overflow-x-auto scrollbar-thin px-1">
            {lengthsAfter.length === 0 ? (
              <div className="w-full text-center text-xs dark:text-white/50 text-black py-8 font-sans font-bold">
                Run humanizer to inspect dynamic cadence
              </div>
            ) : (
              lengthsAfter.map((len, idx) => {
                const heightPercent = Math.min(100, Math.max(12, (len / globalMax) * 100));
                return (
                  <div
                    key={idx}
                    className="flex-1 min-w-[10px] max-w-[24px] group/bar relative flex flex-col items-center justify-end h-full"
                  >
                    {/* Tooltip on Hover */}
                    <div className="absolute -top-7 opacity-0 group-hover/bar:opacity-100 transition-opacity bg-black text-white text-[10px] px-1.5 py-0.5 rounded pointer-events-none whitespace-nowrap z-20 shadow-lg border border-white/20">
                      #{idx + 1}: {len}w
                    </div>
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className="w-full bg-gradient-to-t from-emerald-600 via-emerald-400 to-[#E8899C] rounded-t-md transition-all duration-300 group-hover/bar:brightness-125 shadow-md shadow-emerald-500/30"
                    />
                  </div>
                );
              })
            )}
          </div>
          <div className="text-[11px] dark:text-emerald-400 text-emerald-800 text-center font-sans font-bold flex items-center justify-center space-x-1">
            <Sparkles className="w-3 h-3 text-[#E8899C]" />
            <span>High variance: Short 3–6 word punches blended with compound 28+ word narrative clauses.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
