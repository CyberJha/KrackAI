import React, { useState } from 'react';
import {
  X,
  Copy,
  Check,
  Download,
  Terminal,
  Sparkles,
  Layers,
  FileCode,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { THE_10_PROMPT_TEMPLATES } from '../data/samples';

interface SkillModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HUMANIZER_SKILL_MD = `---
name: humanizer
description: Production-grade anti-detection humanizer skill engineered to deconstruct AI syntax patterns, eliminate statistical AI markers, and enforce PR-39 Factual Fidelity alongside 10 core human copywriting directives.
author: blader
version: 1.1.0
---

# Blader Humanizer Agent Skill (10 Directives + PR-39 Fidelity Protocol)

## Purpose & Objective
This skill equips AI agents (Claude, Cursor, Windsurf, Antigravity, Gemini) with a forensic two-stage humanization pipeline that eliminates detectable AI signatures, preserves 100% factual fidelity and certainty bounds, and transforms formulaic prose into authentic, engaging human writing.

---

## 4-Tier Conflict Resolution Hierarchy (PR-39 Protocol)
When constraints conflict, handle them in the following strict order:
1. **Retain Information and Degree of Certainty**: Do not add facts, figures, names, dates, citations, or implementation details not provided in original text; retain negation, scope, time, completion status, and attribution. Do not change "related" to "causal," "possible" to "certain," or "planned" to "completed."
2. **Adhere to Editing Scope & Style**: Polishing does not by default include summarizing or rewriting viewpoints. Fictional examples can be created as illustrative scenarios, but CANNOT be disguised as real records.
3. **Match Author's Voice & Input Register**: For technical documents, explain functions/sequences accurately and retain exact versions; for academic/business, preserve formality and qualifiers without forced colloquialisms. Natural conjunctions are preserved.
4. **Address 31 Expression Checkpoints**: Revise vague staging, repetitive rhythms, unearned authority, formulaic typesetting, and chat remnants.

---

## The 10 Mandatory Humanizing Directives

### 1. 12-Year-Old Readability with Adult Respect
> “Write for a 12-year-old. They should be able to understand this, so provide relatable information and examples, but don’t sound cheesy, as adults will be the ones actually reading this article.”
- Use direct, relatable metaphors and simple explanations.
- Never write condescending or childish phrases.

### 2. Anti-Academic & Coffee-Shop Conversational Flow
> “Please generate text that avoids using formal or overly academic phrases such as 'it is worth noting,' 'furthermore,' 'consequently,' 'in terms of,' 'one may argue,' 'it is imperative,' 'this suggests that,' 'thus,' 'it is evident that,' 'notwithstanding,' 'pertaining to,' 'therein lies,' 'utilize,' 'be advised,' 'hence,' 'indicate,' 'facilitate,' 'subsequently,' 'moreover,' and 'it can be seen that.' Aim for a natural, conversational style that sounds like two friends talking at the coffee shop. Use direct, simple language and choose phrases that are commonly used in everyday speech. If a formal phrase is absolutely necessary for clarity or accuracy, you may include it, but otherwise, please prioritize making the text engaging, clear, and relatable.”
- **Banned AI Tokens**: \`delve\`, \`tapestry\`, \`beacon\`, \`foster\`, \`testament\`, \`pivotal\`, \`paramount\`, \`landscape\`, \`revolutionize\`, \`underscores\`, \`crucial\`, \`furthermore\`, \`moreover\`, \`notably\`, \`significantly\`, \`consequently\`, \`subsequently\`, \`additionally\`, \`indeed\`, \`utilize\`, \`facilitate\`.

### 3. Geographic & Regional Localization
> “When writing this article, keep in mind our customers live in (name the area if this applies to a local/regional business). Reference local phrases, landmarks, cultures, etc., if applicable.”

### 4. Contractions & Colloquialisms
> “Use contractions, colloquialisms, and approachable language throughout the article.”
- Always prioritize: \`it's\`, \`don't\`, \`we've\`, \`you'll\`, \`there's\`, \`let's\`, \`that's\`, \`can't\`.

### 5. Brand / Company Identity Integration
> “When writing the article, please use our company name, which is (Company Name), at a few different points. It should be clear to the reader that we are the ones writing this post.”

### 6. Non-Pushy, Non-Salesy Human Touch
> “Do NOT be pushy or salesy with your writing style. We want the reader to know our company exists and that it solves the problem the article is discussing, but the style should not come across as biased. This is VERY important. The reader should sense we are very human just like them, we understand their problems, and we seek to honestly give them accurate information, in a fun, casual way.”

### 7. Vivid Scenarios & Transparent Fictional Anecdotes
> "Clarify the concepts in the article by anchoring them in vivid, conceivable real-life scenarios. Feel free to craft illustrative anecdotes that shed light on the subject matter. Transparency is key here—ensure that these hypothetical situations are presented as fictional examples, NOT as factual occurrences, as we want to maintain integrity with the reader."

### 8. High-Hook Introduction & Problem-Payoff Framework
> “The introduction of the article should identify the problem the buyer has and contextualize who they are. It should also outline what the reader will get and learn from reading the post, and the payoff that will come with completing the content.”

### 9. Dynamic Paragraph & Sentence Cadence (Burstiness)
> “Vary the length of the paragraphs and sentences in these writings. Look for opportunities to create punchy, incisive moments to land your points, while at other times produce paragraphs that are 2-4 sentences as needed.”
- Alternate 2-6 word short punchlines with medium and compound multi-clause sentences.
- Never write three sentences of identical length consecutively.

### 10. Target Buyer Persona / Reader Avatar Alignment
> “Keep in mind our primary avatar/persona for this article is (Describe your ideal persona/reader here. Be as detailed as you’d like to be.) Reference these elements of the avatar when appropriate to the content.”

---

## 31 Expression Checkpoints (PR-39 Checklist)
- **Group A (Staging)**: 1. Remove "Not X, but Y" false contrasts | 2. Merge single-sentence endings | 3. Remove pseudo-depth maxims | 4. Delete starting line preparation filler ("Let's take a closer look") | 5. Remove hypothetical enemy debates.
- **Group B (Rhythm)**: 6. Dissolve forced 3-part trios | 7. Merge repeating sentence beginnings | 8. Clean universal dashes | 9. Compress stacked determiners | 10. Replace coined buzzwords with plain definitions | 11. Adjust passive voice when agent is known.
- **Group C (Authority)**: 12. Refine high-frequency AI words without touching valid engineering terms | 13. Remove "marking a new era" significance clichés | 14. Clarify fuzzy relationships | 15. Delete ending praise phrases | 16. Remove slogan praise | 17. Preserve uncertainty in "experts believe" without fabricating names | 18. Simplify "is/exists".
- **Group D (Typesetting)**: 19. Reduce decorative bolding | 20. Clean decorative emojis/arrows | 21. Standardize clean target punctuation.
- **Group E (Chat Remnants)**: 22. Remove customer service greetings ("Good question!") | 23. Remove duplicate knowledge disclaimers | 24. Delete first-sentence title repeats | 25. Remove "What was changed earlier" meta-notes.
- **Group F (Multilingual)**: 26. Streamline layered modifiers | 27. Use direct verbs for "Continue + Verb" | 28. Maintain certainty in stacked passives | 29. Refine forced 4-character parallelism | 30. Compress "With the development of..." beginnings | 31. Remove stock ending wishes.

---

## Pre-Delivery Verification Checklist
1. Can every newly added fact or number be verified against original materials? (If not, remove it).
2. Are independent information, negation, time, scope, and attribution complete?
3. Were code blocks, inline code, URLs, paths, numbers, and markdown tables preserved intact?
4. Output ONLY the finalized text without meta-commentary, draft logs, or surrounding markdown codeblocks.
`;

export const SkillModal: React.FC<SkillModalProps> = ({ isOpen, onClose }) => {
  const [selectedAgent, setSelectedAgent] = useState<'claude' | 'cursor' | 'windsurf' | 'antigravity' | 'custom'>('claude');
  const [customAgentName, setCustomAgentName] = useState('my-agent');
  const [copiedCmd, setCopiedCmd] = useState(false);
  const [copiedSkill, setCopiedSkill] = useState(false);
  const [activeTab, setActiveTab] = useState<'cli' | 'skill_md' | 'quick_start'>('cli');

  if (!isOpen) return null;

  const getAgentArg = () => {
    switch (selectedAgent) {
      case 'claude': return 'claude';
      case 'cursor': return 'cursor';
      case 'windsurf': return 'windsurf';
      case 'antigravity': return 'antigravity';
      case 'custom': return customAgentName || 'my-agent';
    }
  };

  const fullCliCommand = `npx skills add blader/humanizer --global --agent ${getAgentArg()}`;

  const copyCliCommand = () => {
    navigator.clipboard.writeText(fullCliCommand);
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  const copySkillMd = () => {
    navigator.clipboard.writeText(HUMANIZER_SKILL_MD);
    setCopiedSkill(true);
    setTimeout(() => setCopiedSkill(false), 2000);
  };

  const downloadSkillMd = () => {
    const blob = new Blob([HUMANIZER_SKILL_MD], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'SKILL.md';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200 font-sans">
      <div className="surface-card rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl relative border dark:border-[#e6d5a8]/25 border-[#d8c496]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b dark:border-[#e6d5a8]/15 border-[#d8c496] surface-deep">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-[#fa520f]/20 flex items-center justify-center text-[#fa520f] border border-[#fa520f]/40 shadow-sm">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-serif font-bold text-lg text-[#fa520f]">
                  blader/humanizer
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#fa520f] text-white">
                  v1.0.0
                </span>
              </div>
              <p className="text-xs dark:text-white/70 text-black font-semibold">
                Universal Agent Skill CLI Package · 10 Humanizing Directives
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-colors cursor-pointer text-[#fa520f]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center space-x-2 px-6 pt-4 border-b dark:border-[#e6d5a8]/10 border-[#d8c496] text-xs font-mono">
          <button
            onClick={() => setActiveTab('cli')}
            className={`flex items-center space-x-1.5 px-3.5 py-2 border-b-2 font-bold transition-colors cursor-pointer ${
              activeTab === 'cli'
                ? 'border-[#fa520f] text-[#fa520f]'
                : 'border-transparent dark:text-white/70 text-black hover:text-[#fa520f]'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>CLI Installation</span>
          </button>

          <button
            onClick={() => setActiveTab('skill_md')}
            className={`flex items-center space-x-1.5 px-3.5 py-2 border-b-2 font-bold transition-colors cursor-pointer ${
              activeTab === 'skill_md'
                ? 'border-[#fa520f] text-[#fa520f]'
                : 'border-transparent dark:text-white/70 text-black hover:text-[#fa520f]'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>SKILL.md Definition</span>
          </button>

          <button
            onClick={() => setActiveTab('quick_start')}
            className={`flex items-center space-x-1.5 px-3.5 py-2 border-b-2 font-bold transition-colors cursor-pointer ${
              activeTab === 'quick_start'
                ? 'border-[#fa520f] text-[#fa520f]'
                : 'border-transparent dark:text-white/70 text-black hover:text-[#fa520f]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Agent Compatibility</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'cli' && (
            <div className="space-y-5">
              {/* Agent Selector */}
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold dark:text-[#ffd06a] text-[#52391e] uppercase">
                  Select Target Agent Framework:
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'claude', name: 'Claude Code' },
                    { id: 'cursor', name: 'Cursor' },
                    { id: 'windsurf', name: 'Windsurf / Cascade' },
                    { id: 'antigravity', name: 'Antigravity' },
                    { id: 'custom', name: 'Custom Agent' },
                  ].map((agent) => (
                    <button
                      key={agent.id}
                      onClick={() => setSelectedAgent(agent.id as any)}
                      className={`px-3.5 py-1.5 rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer ${
                        selectedAgent === agent.id
                          ? 'bg-[#fa520f] text-white border-[#fa520f] shadow-sm shadow-[#fa520f]/30'
                          : 'tag-chip dark:text-white text-black hover:border-[#fa520f]'
                      }`}
                    >
                      {agent.name}
                    </button>
                  ))}
                </div>

                {selectedAgent === 'custom' && (
                  <div className="pt-2">
                    <input
                      type="text"
                      value={customAgentName}
                      onChange={(e) => setCustomAgentName(e.target.value)}
                      placeholder="Enter custom agent identifier..."
                      className="w-full sm:w-72 surface-deep rounded-lg p-2 text-xs font-mono font-bold dark:text-white text-black border dark:border-[#e6d5a8]/20 border-[#d8c496] focus:outline-none focus:border-[#fa520f]"
                    />
                  </div>
                )}
              </div>

              {/* Terminal Code Box */}
              <div className="surface-deep rounded-2xl p-4 border dark:border-[#e6d5a8]/15 border-[#d8c496] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
                    <span className="text-[11px] font-mono dark:text-white/60 text-black font-semibold ml-2">
                      terminal / bash
                    </span>
                  </div>

                  <button
                    onClick={copyCliCommand}
                    className="btn-mistral text-xs h-7 px-3 flex items-center space-x-1"
                  >
                    {copiedCmd ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedCmd ? 'Copied Command!' : 'Copy Command'}</span>
                  </button>
                </div>

                <div className="bg-black/90 rounded-xl p-4 font-mono text-sm sm:text-base text-emerald-400 font-bold overflow-x-auto select-all shadow-inner border border-white/5">
                  <span className="text-[#fa520f] mr-2">$</span>
                  <span>{fullCliCommand}</span>
                </div>
              </div>

              {/* Feature Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                <div className="surface-card p-3 rounded-xl border dark:border-[#e6d5a8]/15 border-[#d8c496] space-y-1">
                  <div className="flex items-center space-x-1.5 text-[#fa520f] font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>10 Prompt Directives</span>
                  </div>
                  <p className="dark:text-white/70 text-black text-[11px]">
                    Pre-packaged with 12yo reading, coffee-shop chat, contractions, and avatar targeting.
                  </p>
                </div>

                <div className="surface-card p-3 rounded-xl border dark:border-[#e6d5a8]/15 border-[#d8c496] space-y-1">
                  <div className="flex items-center space-x-1.5 text-[#fa520f] font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>0% AI Detection Signature</span>
                  </div>
                  <p className="dark:text-white/70 text-black text-[11px]">
                    Automatic token purging across Turnitin, GPTZero, ZeroGPT, and CopyLeaks.
                  </p>
                </div>

                <div className="surface-card p-3 rounded-xl border dark:border-[#e6d5a8]/15 border-[#d8c496] space-y-1">
                  <div className="flex items-center space-x-1.5 text-[#fa520f] font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Global & Per-Agent Scope</span>
                  </div>
                  <p className="dark:text-white/70 text-black text-[11px]">
                    Installs globally to <code className="text-[#fa520f]">~/.skills/humanizer</code> or project level.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'skill_md' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold dark:text-[#ffd06a] text-[#52391e]">
                  SKILL.md Spec for blader/humanizer
                </span>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={copySkillMd}
                    className="btn-mistral-outline text-xs h-7 px-3"
                  >
                    {copiedSkill ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedSkill ? 'Copied' : 'Copy Spec'}</span>
                  </button>

                  <button
                    onClick={downloadSkillMd}
                    className="btn-mistral text-xs h-7 px-3"
                  >
                    <Download className="w-3 h-3" />
                    <span>Download SKILL.md</span>
                  </button>
                </div>
              </div>

              <div className="surface-deep rounded-xl p-4 font-mono text-xs leading-relaxed dark:text-white text-black whitespace-pre-wrap max-h-[380px] overflow-y-auto border dark:border-[#e6d5a8]/15 border-[#d8c496] select-text">
                {HUMANIZER_SKILL_MD}
              </div>
            </div>
          )}

          {activeTab === 'quick_start' && (
            <div className="space-y-4 font-mono text-xs">
              <div className="surface-deep p-4 rounded-xl space-y-3 border dark:border-[#e6d5a8]/15 border-[#d8c496]">
                <h4 className="font-bold text-sm text-[#fa520f]">
                  How Agents Invoke blader/humanizer
                </h4>
                <p className="dark:text-white/80 text-black leading-relaxed font-sans">
                  Once installed via <code className="text-[#fa520f] font-mono font-bold">npx skills add blader/humanizer</code>, your AI agent gains native access to the humanization skill. You can instruct your agent:
                </p>

                <div className="bg-black/80 rounded-lg p-3 text-emerald-400 font-mono select-all">
                  "Use the humanizer skill to rewrite this blog post using the 10 directives."
                </div>

                <div className="bg-black/80 rounded-lg p-3 text-emerald-400 font-mono select-all">
                  "Apply blader/humanizer on section 3 with target region: Austin, TX and avatar: B2B Founder."
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
