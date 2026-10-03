import React from 'react';
import { BookOpen, Activity, Zap, AlertTriangle, ShieldAlert } from 'lucide-react';

export const EvasionGuide: React.FC = () => {
  return (
    <div className="space-y-8 max-w-5xl mx-auto font-sans">
      {/* Top Banner */}
      <div className="surface-card rounded-2xl p-6 border dark:border-[#e6d5a8]/20 border-[#e6d5a8]">
        <div className="flex items-center space-x-2 text-[#fa520f] font-mono text-xs uppercase mb-1 font-bold">
          <BookOpen className="w-4 h-4" />
          <span>KRACKAI LINGUISTIC ARCHITECTURE</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif dark:text-[#fff8e0] text-[#24180e] tracking-tight">
          How Classifiers Work &amp; Why KrackAI Bypasses Them
        </h2>
        <p className="text-xs sm:text-sm dark:text-[#ffb83e]/80 text-[#633f00] mt-1 max-w-2xl leading-relaxed">
          Classifiers calculate statistical probability distributions over token sequences. Here is how KrackAI neutralizes every detector vector.
        </p>
      </div>

      {/* 4 Pillars of Evasion */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pillar 1 */}
        <div className="surface-card rounded-2xl p-5 space-y-3 border dark:border-[#e6d5a8]/20 border-[#e6d5a8]">
          <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 font-medium text-sm">
            <Activity className="w-4 h-4 text-emerald-500" />
            <h3 className="font-serif text-base font-bold dark:text-[#fff8e0] text-[#24180e]">1. Sentence Burstiness Vector</h3>
          </div>
          <p className="text-xs dark:text-[#fff8e0]/80 text-[#24180e] leading-relaxed">
            LLMs generate sentences with remarkably uniform lengths (16–22 words). Classifiers compute standard deviation of sentence length. KrackAI forces extreme cadence oscillation, pairing 3–7 word punches with 35+ word compound sentences.
          </p>
        </div>

        {/* Pillar 2 */}
        <div className="surface-card rounded-2xl p-5 space-y-3 border dark:border-[#e6d5a8]/20 border-[#e6d5a8]">
          <div className="flex items-center space-x-2 text-amber-600 dark:text-amber-400 font-medium text-sm">
            <Zap className="w-4 h-4 text-amber-500" />
            <h3 className="font-serif text-base font-bold dark:text-[#fff8e0] text-[#24180e]">2. High Perplexity &amp; Temperature</h3>
          </div>
          <p className="text-xs dark:text-[#fff8e0]/80 text-[#24180e] leading-relaxed">
            Perplexity measures next-token predictability. Deterministic text at temp=0 flags as synthetic. KrackAI samples at temperature=0.88 with high perplexity constraints to guarantee human token distributions.
          </p>
        </div>

        {/* Pillar 3 */}
        <div className="surface-card rounded-2xl p-5 space-y-3 border dark:border-[#e6d5a8]/20 border-[#e6d5a8]">
          <div className="flex items-center space-x-2 text-rose-600 dark:text-rose-400 font-medium text-sm">
            <AlertTriangle className="w-4 h-4 text-rose-500" />
            <h3 className="font-serif text-base font-bold dark:text-[#fff8e0] text-[#24180e]">3. Token Marker Purging</h3>
          </div>
          <p className="text-xs dark:text-[#fff8e0]/80 text-[#24180e] leading-relaxed">
            RLHF outputs over-index on 40+ cliché tokens (delve, tapestry, pivotal, foster, landscape). KrackAI's forensic polisher purges these markers and substitutes empirical domain vocabulary.
          </p>
        </div>

        {/* Pillar 4 */}
        <div className="surface-card rounded-2xl p-5 space-y-3 border dark:border-[#e6d5a8]/20 border-[#e6d5a8]">
          <div className="flex items-center space-x-2 text-[#fa520f] font-medium text-sm">
            <ShieldAlert className="w-4 h-4 text-[#fa520f]" />
            <h3 className="font-serif text-base font-bold dark:text-[#fff8e0] text-[#24180e]">4. Symmetry Destruction</h3>
          </div>
          <p className="text-xs dark:text-[#fff8e0]/80 text-[#24180e] leading-relaxed">
            AI models generate formulaic bold-bullet listicles. KrackAI breaks listicle symmetries, weaving benchmarks into continuous analytical prose or clean, plain text tables.
          </p>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="surface-card rounded-2xl p-6 border dark:border-[#e6d5a8]/20 border-[#e6d5a8]">
        <h3 className="text-sm font-serif font-bold dark:text-[#fff8e0] text-[#24180e] mb-4">
          Statistical Signature Comparison
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs dark:text-[#fff8e0]/90 text-[#24180e] border-collapse font-mono">
            <thead>
              <tr className="border-b dark:border-[#e6d5a8]/15 border-[#e6d5a8] dark:text-[#ffd06a] text-[#633f00] font-bold uppercase">
                <th className="py-2.5 px-3">Metric</th>
                <th className="py-2.5 px-3 text-rose-600 dark:text-rose-400">Standard AI Output</th>
                <th className="py-2.5 px-3 text-emerald-600 dark:text-emerald-400">KrackAI Output</th>
                <th className="py-2.5 px-3 dark:text-[#fff8e0]/70 text-[#633f00]">Human Baseline</th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-[#e6d5a8]/10 divide-[#e6d5a8]">
              <tr>
                <td className="py-2.5 px-3 font-semibold dark:text-[#fff8e0] text-[#24180e]">Sentence Burstiness Ratio</td>
                <td className="py-2.5 px-3 text-rose-600 dark:text-rose-400 font-bold">0.18 – 0.28 (Low)</td>
                <td className="py-2.5 px-3 text-emerald-600 dark:text-emerald-400 font-bold">0.82 – 1.15 (High)</td>
                <td className="py-2.5 px-3 dark:text-[#fff8e0]/80 text-[#24180e]">0.75 – 1.20</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold dark:text-[#fff8e0] text-[#24180e]">Sampling Temperature</td>
                <td className="py-2.5 px-3 text-rose-600 dark:text-rose-400 font-bold">0.0 (Deterministic)</td>
                <td className="py-2.5 px-3 text-emerald-600 dark:text-emerald-400 font-bold">0.88 (High Perplexity)</td>
                <td className="py-2.5 px-3 dark:text-[#fff8e0]/80 text-[#24180e]">Cognitive</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold dark:text-[#fff8e0] text-[#24180e]">AI Marker Density</td>
                <td className="py-2.5 px-3 text-rose-600 dark:text-rose-400 font-bold">&gt;3.5 per 100 words</td>
                <td className="py-2.5 px-3 text-emerald-600 dark:text-emerald-400 font-bold">0.0 per 100 words</td>
                <td className="py-2.5 px-3 dark:text-[#fff8e0]/80 text-[#24180e]">&lt;0.2 per 100 words</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold dark:text-[#fff8e0] text-[#24180e]">Average Detector Score</td>
                <td className="py-2.5 px-3 text-rose-600 dark:text-rose-400 font-bold">88% – 100% AI</td>
                <td className="py-2.5 px-3 text-emerald-600 dark:text-emerald-400 font-bold">0% AI Risk</td>
                <td className="py-2.5 px-3 dark:text-[#fff8e0]/80 text-[#24180e]">0% – 4% Clean</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
