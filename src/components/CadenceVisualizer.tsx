import React from 'react';
import { Activity, Zap } from 'lucide-react';

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
    <div className="surface-card rounded-2xl p-5 border dark:border-[#e6d5a8]/20 border-[#d8c496]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2 text-xs font-mono font-bold">
        <div className="flex items-center space-x-2 dark:text-white text-black">
          <Activity className="w-4 h-4 text-[#fa520f]" />
          <h4 className="text-sm font-serif font-bold dark:text-white text-black">
            Sentence Burstiness &amp; Cadence Spectrum
          </h4>
        </div>
        <div className="flex items-center space-x-4 text-xs font-bold">
          <span className="flex items-center space-x-1.5 text-rose-600 dark:text-rose-400">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span>Raw AI Rhythm (Flat)</span>
          </span>
          <span className="flex items-center space-x-1.5 text-emerald-600 dark:text-emerald-400">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span>Humanized Pacing (Spiky)</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono font-bold">
        {/* Before Cadence */}
        <div className="surface-deep rounded-xl p-3.5 space-y-2 border dark:border-[#e6d5a8]/10 border-[#d8c496]">
          <div className="flex items-center justify-between dark:text-white text-black font-bold">
            <span>Raw Sequence ({lengthsBefore.length} sentences)</span>
            <span className="text-rose-600 dark:text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/30">
              Burstiness: {burstinessBefore}/100
            </span>
          </div>

          <div className="h-24 flex items-end space-x-1 pt-4 pb-1 overflow-x-auto scrollbar-thin">
            {lengthsBefore.length === 0 ? (
              <div className="w-full text-center text-xs dark:text-white/50 text-black py-6 font-sans font-bold">
                No sentence data
              </div>
            ) : (
              lengthsBefore.map((len, idx) => {
                const heightPercent = Math.min(100, Math.max(12, (len / globalMax) * 100));
                return (
                  <div
                    key={idx}
                    className="flex-1 min-w-[8px] max-w-[20px] group relative flex flex-col items-center justify-end h-full"
                  >
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className="w-full bg-rose-500 rounded-t-sm transition-all"
                    />
                  </div>
                );
              })
            )}
          </div>
          <div className="text-[11px] dark:text-white/80 text-black text-center font-sans font-semibold">
            Uniform sentences (16–22 words) easily flagged by classifiers.
          </div>
        </div>

        {/* After Cadence */}
        <div className="surface-deep rounded-xl p-3.5 space-y-2 border dark:border-[#e6d5a8]/10 border-[#d8c496]">
          <div className="flex items-center justify-between dark:text-white text-black font-bold">
            <span>Humanized Sequence ({lengthsAfter.length} sentences)</span>
            <span className="text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30 flex items-center space-x-1">
              <Zap className="w-3 h-3 text-emerald-500" />
              <span>Burstiness: {burstinessAfter}/100</span>
            </span>
          </div>

          <div className="h-24 flex items-end space-x-1 pt-4 pb-1 overflow-x-auto scrollbar-thin">
            {lengthsAfter.length === 0 ? (
              <div className="w-full text-center text-xs dark:text-white/50 text-black py-6 font-sans font-bold">
                Run humanizer to inspect cadence
              </div>
            ) : (
              lengthsAfter.map((len, idx) => {
                const heightPercent = Math.min(100, Math.max(12, (len / globalMax) * 100));
                return (
                  <div
                    key={idx}
                    className="flex-1 min-w-[8px] max-w-[20px] group relative flex flex-col items-center justify-end h-full"
                  >
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className="w-full bg-emerald-500 rounded-t-sm transition-all"
                    />
                  </div>
                );
              })
            )}
          </div>
          <div className="text-[11px] dark:text-white/80 text-black text-center font-sans font-semibold">
            High variance (3-word punches mixed with 40-word compound sentences).
          </div>
        </div>
      </div>
    </div>
  );
};
