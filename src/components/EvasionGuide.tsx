import React from 'react';
import { BookOpen, Activity, Zap, AlertTriangle, ShieldAlert, CheckCircle2, ShieldCheck, FileCheck, Layers } from 'lucide-react';

export const EvasionGuide: React.FC = () => {
  return (
    <div className="space-y-8 max-w-5xl mx-auto font-sans">
      {/* Top Banner */}
      <div className="surface-card rounded-3xl p-6 sm:p-8 border dark:border-white/10 border-[#d8c496] glass-card shadow-xl">
        <div className="flex items-center space-x-2 text-[#fa520f] font-mono text-xs uppercase mb-1 font-bold">
          <BookOpen className="w-4 h-4" />
          <span>KRACKAI LINGUISTIC &amp; EDITING CONSTITUTION</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif dark:text-white text-black tracking-tight font-bold">
          Editing Constraints, Priorities &amp; 31-Pattern Architecture
        </h2>
        <p className="text-xs sm:text-sm dark:text-white/80 text-black mt-1 max-w-3xl leading-relaxed font-semibold">
          When constraints conflict, KrackAI enforces a strict 5-tier priority hierarchy: preserving factual certainty, respecting the author's input register, dissolving synthetic clichés, and verifying claims against original evidence.
        </p>
      </div>

      {/* Editing Constraints Hierarchy */}
      <div className="surface-card rounded-3xl p-6 sm:p-8 border dark:border-white/10 border-[#d8c496] glass-card space-y-5">
        <div className="flex items-center space-x-2 border-b dark:border-white/10 border-[#d8c496] pb-3">
          <ShieldCheck className="w-5 h-5 text-[#fa520f]" />
          <h3 className="font-serif text-lg sm:text-xl font-bold dark:text-white text-black">
            Hierarchical Priority Order for Conflicting Constraints
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans leading-relaxed">
          <div className="p-4 rounded-2xl surface-deep border dark:border-white/10 border-[#d8c496] space-y-2">
            <div className="font-mono font-bold text-[#fa520f] flex items-center space-x-2">
              <span className="w-5 h-5 rounded-full bg-[#fa520f] text-white flex items-center justify-center text-[10px]">1</span>
              <span>Retain Information &amp; Degree of Certainty</span>
            </div>
            <p className="dark:text-white/85 text-black font-semibold">
              Never fabricate facts, numbers, dates, citations, or implementation details not in original text. Retain negation, comparison objects, scope, conditions, time, completion status, and attribution. Do not change <em>"related"</em> to <em>"causal"</em>, <em>"possible"</em> to <em>"certain"</em>, or <em>"planned"</em> to <em>"completed"</em>.
            </p>
          </div>

          <div className="p-4 rounded-2xl surface-deep border dark:border-white/10 border-[#d8c496] space-y-2">
            <div className="font-mono font-bold text-[#fa520f] flex items-center space-x-2">
              <span className="w-5 h-5 rounded-full bg-[#fa520f] text-white flex items-center justify-center text-[10px]">2</span>
              <span>Adhere to Editing Scope &amp; Style</span>
            </div>
            <p className="dark:text-white/85 text-black font-semibold">
              Polishing does not by default include summarizing or rewriting viewpoints. When the user explicitly requests illustrative examples, clearly distinguish between original facts and new fictional scenarios—never disguise speculation as real records.
            </p>
          </div>

          <div className="p-4 rounded-2xl surface-deep border dark:border-white/10 border-[#d8c496] space-y-2">
            <div className="font-mono font-bold text-[#fa520f] flex items-center space-x-2">
              <span className="w-5 h-5 rounded-full bg-[#fa520f] text-white flex items-center justify-center text-[10px]">3</span>
              <span>Match Author Voice &amp; Input Register</span>
            </div>
            <p className="dark:text-white/85 text-black font-semibold">
              For technical &amp; product docs, accurately preserve terminology, version, and operating status. For factual &amp; academic texts, retain necessary formality, attribution, and qualifiers without forcing fake colloquialisms. Natural conjunctions (<em>"firstly"</em>, <em>"however"</em>) are preserved when functional.
            </p>
          </div>

          <div className="p-4 rounded-2xl surface-deep border dark:border-white/10 border-[#d8c496] space-y-2">
            <div className="font-mono font-bold text-[#fa520f] flex items-center space-x-2">
              <span className="w-5 h-5 rounded-full bg-[#fa520f] text-white flex items-center justify-center text-[10px]">4</span>
              <span>Resolve 31 Pattern Checkpoints</span>
            </div>
            <p className="dark:text-white/85 text-black font-semibold">
              Check for vague intros, false contrasts (<em>"Not X, but Y"</em>), dramatic single-sentence fragments, unearned authority claims, and customer service remnants without mechanically deleting valid domain phrases.
            </p>
          </div>
        </div>
      </div>

      {/* 31 Pattern Checkpoints Categorization */}
      <div className="surface-card rounded-3xl p-6 sm:p-8 border dark:border-white/10 border-[#d8c496] glass-card space-y-6">
        <div className="flex items-center space-x-2 border-b dark:border-white/10 border-[#d8c496] pb-3">
          <Layers className="w-5 h-5 text-[#fa520f]" />
          <h3 className="font-serif text-lg sm:text-xl font-bold dark:text-white text-black">
            The 31-Point Anti-Slop Pattern Checklist (PR 39 Specification)
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs font-mono">
          {/* Category A */}
          <div className="p-4 rounded-2xl surface-deep border dark:border-white/10 border-[#d8c496] space-y-2">
            <div className="font-bold text-[#fa520f] uppercase tracking-wider text-[11px]">A. Setting the Stage</div>
            <ul className="space-y-1 dark:text-white/80 text-black list-disc list-inside text-[11px] font-semibold">
              <li>1. False contrasts (<em>"It's not X, it's Y"</em>)</li>
              <li>2. Single-sentence fragments</li>
              <li>3. Maxims &amp; pseudo-depth metaphors</li>
              <li>4. Starting line preparation filler</li>
              <li>5. Debating hypothetical enemies</li>
            </ul>
          </div>

          {/* Category B */}
          <div className="p-4 rounded-2xl surface-deep border dark:border-white/10 border-[#d8c496] space-y-2">
            <div className="font-bold text-[#fa520f] uppercase tracking-wider text-[11px]">B. Formulaic Rhythm</div>
            <ul className="space-y-1 dark:text-white/80 text-black list-disc list-inside text-[11px] font-semibold">
              <li>6. Forced three-part structures</li>
              <li>7. Repeating sentence beginnings</li>
              <li>8. Universal suspense dashes</li>
              <li>9. Stacking identical determiners</li>
              <li>10. Coined buzzwords &amp; labels</li>
              <li>11. Missing subjects &amp; passive stacking</li>
            </ul>
          </div>

          {/* Category C */}
          <div className="p-4 rounded-2xl surface-deep border dark:border-white/10 border-[#d8c496] space-y-2">
            <div className="font-bold text-[#fa520f] uppercase tracking-wider text-[11px]">C. Elevating Authority</div>
            <ul className="space-y-1 dark:text-white/80 text-black list-disc list-inside text-[11px] font-semibold">
              <li>12. High-frequency AI terms (<em>delve, tapestry</em>)</li>
              <li>13. Unearned significance clichés</li>
              <li>14. Fuzzy relationships &amp; identity guessing</li>
              <li>15. Sentence-ending praise phrases</li>
              <li>16. Empty promotional slogans</li>
              <li>17. Fabricating expert citations</li>
              <li>18. Overusing linking verbs</li>
            </ul>
          </div>

          {/* Category D */}
          <div className="p-4 rounded-2xl surface-deep border dark:border-white/10 border-[#d8c496] space-y-2">
            <div className="font-bold text-[#fa520f] uppercase tracking-wider text-[11px]">D. Formulaic Typesetting</div>
            <ul className="space-y-1 dark:text-white/80 text-black list-disc list-inside text-[11px] font-semibold">
              <li>19. Decorative bolding obstruction</li>
              <li>20. Decorative emojis/arrows in titles</li>
              <li>21. Punctuation &amp; quote compliance</li>
            </ul>
          </div>

          {/* Category E */}
          <div className="p-4 rounded-2xl surface-deep border dark:border-white/10 border-[#d8c496] space-y-2">
            <div className="font-bold text-[#fa520f] uppercase tracking-wider text-[11px]">E. Chat &amp; Draft Remnants</div>
            <ul className="space-y-1 dark:text-white/80 text-black list-disc list-inside text-[11px] font-semibold">
              <li>22. Customer service greetings (<em>"Good question!"</em>)</li>
              <li>23. Knowledge boundary guesswork</li>
              <li>24. First-sentence title restatements</li>
              <li>25. Meta-notes on previous revisions</li>
            </ul>
          </div>

          {/* Category F */}
          <div className="p-4 rounded-2xl surface-deep border dark:border-white/10 border-[#d8c496] space-y-2">
            <div className="font-bold text-[#fa520f] uppercase tracking-wider text-[11px]">F. Multilingual Clarity</div>
            <ul className="space-y-1 dark:text-white/80 text-black list-disc list-inside text-[11px] font-semibold">
              <li>26. Layered convoluted modifiers (的)</li>
              <li>27. Repetitive <em>"continue + verb"</em></li>
              <li>28. Passive voice stacking</li>
              <li>29. Forced parallel 4-character phrasing</li>
              <li>30. <em>"With the development of..."</em> clichés</li>
              <li>31. Stock ending wishes (<em>"wait and see"</em>)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Pre-Delivery Verification Checklist */}
      <div className="surface-card rounded-3xl p-6 sm:p-8 border dark:border-white/10 border-[#d8c496] glass-card space-y-4">
        <div className="flex items-center space-x-2 text-emerald-500 font-bold">
          <FileCheck className="w-5 h-5" />
          <h3 className="font-serif text-lg font-bold dark:text-white text-black">
            Pre-Delivery Verification Checklist (Runs Before Every Output)
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs font-mono">
          {[
            'Factual certainty preserved (No degree shifts)',
            'No fabricated facts, dates, or metrics',
            'Independent claims & negation intact',
            'Code blocks, URLs, and IDs untouched',
            'Markdown table structures & numbers preserved',
            'Zero AI meta-notes or greeting filler',
          ].map((check, i) => (
            <div key={i} className="flex items-center space-x-2 p-3 rounded-xl surface-deep border dark:border-white/10 border-[#d8c496]">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span className="dark:text-white text-black font-semibold">{check}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
