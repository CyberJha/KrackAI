import React, { useState } from 'react';
import {
  Baby,
  Coffee,
  MapPin,
  MessageSquare,
  Building2,
  HeartHandshake,
  Sparkles,
  Zap,
  Activity,
  UserCheck,
  ChevronDown,
  ChevronUp,
  Sliders,
  CheckCircle2,
  HelpCircle,
  Copy,
  Check,
  Eye,
  RotateCcw,
  Terminal,
} from 'lucide-react';
import { Humanizer10RulesConfig, RuleComplianceAudit } from '../types';
import { THE_10_PROMPT_TEMPLATES, SAMPLE_10_RULE_PRESETS } from '../data/samples';

interface Rules10ManagerProps {
  config: Humanizer10RulesConfig;
  onChange: (newConfig: Humanizer10RulesConfig) => void;
  ruleAudits?: RuleComplianceAudit[];
  onOpenCheatSheet?: () => void;
  onOpenSkillModal?: () => void;
}

export const Rules10Manager: React.FC<Rules10ManagerProps> = ({
  config,
  onChange,
  ruleAudits,
  onOpenCheatSheet,
  onOpenSkillModal,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeTab, setActiveTab] = useState<'matrix' | 'prompt_preview'>('matrix');
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [selectedPresetId, setSelectedPresetId] = useState<string>('austin-solar');

  const activeRulesCount = [
    config.rule1_12yoReading,
    config.rule2_antiAcademicCoffeeShop,
    config.rule3_localGeographic,
    config.rule4_contractionsColloquial,
    config.rule5_brandIntegration,
    config.rule6_nonPushyAuthentic,
    config.rule7_fictionalAnecdotes,
    config.rule8_hookIntroFramework,
    config.rule9_dynamicCadence,
    config.rule10_targetAvatar,
  ].filter(Boolean).length;

  const handleApplyPreset = (presetId: string) => {
    setSelectedPresetId(presetId);
    const preset = SAMPLE_10_RULE_PRESETS.find((p) => p.id === presetId);
    if (preset) {
      onChange(preset.config);
    }
  };

  const handleToggleRule = (key: keyof Humanizer10RulesConfig) => {
    onChange({
      ...config,
      [key]: !config[key],
    });
  };

  const handleTextChange = (key: keyof Humanizer10RulesConfig, value: string) => {
    onChange({
      ...config,
      [key]: value,
    });
  };

  const getCompiledPromptText = () => {
    const lines: string[] = [];
    if (config.rule1_12yoReading) lines.push(`1. “Write for a 12-year-old. They should be able to understand this, so provide relatable information and examples, but don’t sound cheesy, as adults will be the ones actually reading this article.”`);
    if (config.rule2_antiAcademicCoffeeShop) lines.push(`2. “Please generate text that avoids using formal or overly academic phrases such as 'it is worth noting,' 'furthermore,' 'consequently,' 'in terms of,' 'one may argue,' 'it is imperative,' 'this suggests that,' 'thus,' 'it is evident that,' 'notwithstanding,' 'pertaining to,' 'therein lies,' 'utilize,' 'be advised,' 'hence,' 'indicate,' 'facilitate,' 'subsequently,' 'moreover,' and 'it can be seen that.' Aim for a natural, conversational style that sounds like two friends talking at the coffee shop. Use direct, simple language and choose phrases that are commonly used in everyday speech. If a formal phrase is absolutely necessary for clarity or accuracy, you may include it, but otherwise, please prioritize making the text engaging, clear, and relatable."`);
    if (config.rule3_localGeographic && config.rule3_targetLocation) lines.push(`3. “When writing this article, keep in mind our customers live in ${config.rule3_targetLocation}. Reference local phrases, landmarks, cultures, etc., if applicable.”`);
    if (config.rule4_contractionsColloquial) lines.push(`4. “Use contractions, colloquialisms, and approachable language throughout the article.”`);
    if (config.rule5_brandIntegration && config.rule5_companyName) lines.push(`5. “When writing the article, please use our company name, which is ${config.rule5_companyName}, at a few different points. It should be clear to the reader that we are the ones writing this post.”${config.rule5_companyInfo ? ` (${config.rule5_companyInfo})` : ''}`);
    if (config.rule6_nonPushyAuthentic) lines.push(`6. “Do NOT be pushy or salesy with your writing style. We want the reader to know our company exists and that it solves the problem the article is discussing, but the style should not come across as biased. This is VERY important. The reader should sense we are very human just like them, we understand their problems, and we seek to honestly give them accurate information, in a fun, casual way.”`);
    if (config.rule7_fictionalAnecdotes) lines.push(`7. "Clarify the concepts in the article by anchoring them in vivid, conceivable real-life scenarios. Feel free to craft illustrative anecdotes that shed light on the subject matter. Transparency is key here—ensure that these hypothetical situations are presented as fictional examples, NOT as factual occurrences, as we want to maintain integrity with the reader."${config.rule7_anecdoteTheme ? ` (Theme: ${config.rule7_anecdoteTheme})` : ''}`);
    if (config.rule8_hookIntroFramework) lines.push(`8. “The introduction of the article should identify the problem the buyer has and contextualize who they are. It should also outline what the reader will get and learn from reading the post, and the payoff that will come with completing the content.”`);
    if (config.rule9_dynamicCadence) lines.push(`9. “Vary the length of the paragraphs and sentences in these writings. Look for opportunities to create punchy, incisive moments to land your points, while at other times produce paragraphs that are 2-4 sentences as needed.”`);
    if (config.rule10_targetAvatar && config.rule10_avatarDescription) lines.push(`10. “Keep in mind our primary avatar/persona for this article is ${config.rule10_avatarDescription}. Reference these elements of the avatar when appropriate to the content.”`);
    return lines.join('\n\n');
  };

  const copyCompiledPrompt = () => {
    navigator.clipboard.writeText(getCompiledPromptText());
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const getRuleIcon = (id: number) => {
    switch (id) {
      case 1: return <Baby className="w-4 h-4 text-[#CE4E69]" />;
      case 2: return <Coffee className="w-4 h-4 text-[#CE4E69]" />;
      case 3: return <MapPin className="w-4 h-4 text-[#CE4E69]" />;
      case 4: return <MessageSquare className="w-4 h-4 text-[#CE4E69]" />;
      case 5: return <Building2 className="w-4 h-4 text-[#CE4E69]" />;
      case 6: return <HeartHandshake className="w-4 h-4 text-[#CE4E69]" />;
      case 7: return <Sparkles className="w-4 h-4 text-[#CE4E69]" />;
      case 8: return <Zap className="w-4 h-4 text-[#CE4E69]" />;
      case 9: return <Activity className="w-4 h-4 text-[#CE4E69]" />;
      case 10: return <UserCheck className="w-4 h-4 text-[#CE4E69]" />;
      default: return <Sliders className="w-4 h-4 text-[#CE4E69]" />;
    }
  };

  return (
    <div className="surface-card rounded-3xl border dark:border-white/10 border-[#CE4E69] overflow-hidden transition-all duration-300 glass-card shadow-xl">
      {/* Header Bar */}
      <div className="p-4 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-3 border-b dark:border-white/10 border-[#CE4E69] surface-deep">
        <div className="flex items-center space-x-3 cursor-pointer select-none" onClick={() => setIsExpanded(!isExpanded)}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#CE4E69]/20 to-[#D96B82]/10 flex items-center justify-center text-[#CE4E69] border border-[#CE4E69]/30 shadow-sm">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-serif font-bold text-base sm:text-lg dark:text-white text-black">
                10 Humanizing Agent Directives
              </h3>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-extrabold bg-gradient-to-r from-[#CE4E69] to-[#D96B82] text-white shadow-sm shadow-[#CE4E69]/30">
                {activeRulesCount}/10 Active
              </span>
            </div>
            <p className="text-xs dark:text-white/70 text-black font-semibold mt-0.5">
              Fine-tune the 10 core persona, tone, geographic, anti-formal, and narrative rules.
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Preset Buttons */}
          <div className="flex items-center space-x-1.5 text-xs font-mono">
            <span className="text-black dark:text-[#E8899C] font-bold hidden sm:inline">Presets:</span>
            {SAMPLE_10_RULE_PRESETS.map((p) => (
              <button
                key={p.id}
                onClick={() => handleApplyPreset(p.id)}
                className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all hover:scale-105 cursor-pointer shadow-sm ${selectedPresetId === p.id
                    ? 'bg-gradient-to-r from-[#CE4E69] to-[#D96B82] text-white border-[#CE4E69]'
                    : 'tag-chip text-black dark:text-[#E8899C] hover:border-[#CE4E69]'
                  }`}
                title={p.description}
              >
                {p.name.split(' ')[0]}
              </button>
            ))}
          </div>

          <button
            onClick={onOpenCheatSheet}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono font-bold dark:bg-white/5 bg-black/5 hover:bg-[#CE4E69]/15 dark:text-white text-black border-[#CE4E69] dark:border-white/10 transition-all hover:scale-105 cursor-pointer shadow-sm"
            title="View full prompt instructions and copy cheatsheet"
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#CE4E69]" />
            <span>Prompt Docs</span>
          </button>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-[#CE4E69] cursor-pointer"
            aria-label="Toggle drawer"
          >
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Expandable Body */}
      {isExpanded && (
        <div className="p-4 sm:p-6 space-y-6">
          {/* Sub Navigation */}
          <div className="flex items-center justify-between border-b dark:border-[#CE4E69]/15 border-[#CE4E69] pb-3 text-xs font-mono">
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab('matrix')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${activeTab === 'matrix'
                    ? 'bg-[#CE4E69] text-white font-bold'
                    : 'dark:text-white text-black hover:bg-[#f5f0e8] dark:hover:bg-white/5'
                  }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>10 Directives Matrix</span>
              </button>

              <button
                onClick={() => setActiveTab('prompt_preview')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${activeTab === 'prompt_preview'
                    ? 'bg-[#CE4E69] text-white font-bold'
                    : 'dark:text-white text-black hover:bg-[#f5f0e8] dark:hover:bg-white/5'
                  }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Compiled System Prompt</span>
              </button>
            </div>

            {activeTab === 'prompt_preview' && (
              <button
                onClick={copyCompiledPrompt}
                className="btn-mistral text-xs h-7 px-2.5"
              >
                {copiedPrompt ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>{copiedPrompt ? 'Copied' : 'Copy System Prompt'}</span>
              </button>
            )}
          </div>

          {activeTab === 'matrix' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* RULE 1 */}
              <div className={`p-4 rounded-xl border transition-all ${config.rule1_12yoReading ? 'surface-card border-[#CE4E69]/40 shadow-sm' : 'surface-deep opacity-60 border-dashed dark:border-white/10 border-black/10'
                }`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {getRuleIcon(1)}
                    <span className="font-bold text-sm dark:text-white text-black">1. 12-Year-Old Readability</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.rule1_12yoReading}
                      onChange={() => handleToggleRule('rule1_12yoReading')}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-gray-300 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#CE4E69]"></div>
                  </label>
                </div>
                <p className="text-xs dark:text-white/80 text-black leading-relaxed">
                  "Write for a 12-year-old. Relatable info & examples, never cheesy, as adults read this."
                </p>
              </div>

              {/* RULE 2 */}
              <div className={`p-4 rounded-xl border transition-all ${config.rule2_antiAcademicCoffeeShop ? 'surface-card border-[#CE4E69]/40 shadow-sm' : 'surface-deep opacity-60 border-dashed dark:border-white/10 border-black/10'
                }`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {getRuleIcon(2)}
                    <span className="font-bold text-sm dark:text-white text-black">2. Anti-Academic Coffee-Shop Chat</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.rule2_antiAcademicCoffeeShop}
                      onChange={() => handleToggleRule('rule2_antiAcademicCoffeeShop')}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-gray-300 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#CE4E69]"></div>
                  </label>
                </div>
                <p className="text-xs dark:text-white/80 text-black leading-relaxed">
                  Bans 20+ formal academic clichés ('it is worth noting', 'furthermore', 'consequently', 'utilize', 'thus').
                </p>
              </div>

              {/* RULE 3 */}
              <div className={`p-4 rounded-xl border transition-all ${config.rule3_localGeographic ? 'surface-card border-[#CE4E69]/40 shadow-sm' : 'surface-deep opacity-60 border-dashed dark:border-white/10 border-black/10'
                }`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {getRuleIcon(3)}
                    <span className="font-bold text-sm dark:text-white text-black">3. Local Geographic Anchoring</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.rule3_localGeographic}
                      onChange={() => handleToggleRule('rule3_localGeographic')}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-gray-300 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#CE4E69]"></div>
                  </label>
                </div>
                <div className="space-y-1.5 mt-2">
                  <label className="text-[11px] font-mono font-bold dark:text-[#E8899C] text-[#7a6b5a]">Target Region / City / Landmark:</label>
                  <input
                    type="text"
                    value={config.rule3_targetLocation}
                    onChange={(e) => handleTextChange('rule3_targetLocation', e.target.value)}
                    placeholder="e.g. Austin & Hill Country, Denver, Pacific Northwest"
                    disabled={!config.rule3_localGeographic}
                    className="w-full surface-deep rounded-lg p-2 text-xs font-semibold dark:text-white text-[#1a1424] border dark:border-[#CE4E69]/15 border-[#CE4E69]/15 focus:outline-none focus:border-[#CE4E69]"
                  />
                </div>
              </div>

              {/* RULE 4 */}
              <div className={`p-4 rounded-xl border transition-all ${config.rule4_contractionsColloquial ? 'surface-card border-[#CE4E69]/40 shadow-sm' : 'surface-deep opacity-60 border-dashed dark:border-white/10 border-black/10'
                }`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {getRuleIcon(4)}
                    <span className="font-bold text-sm dark:text-white text-[#1a1424]">4. Contractions & Colloquialisms</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.rule4_contractionsColloquial}
                      onChange={() => handleToggleRule('rule4_contractionsColloquial')}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-gray-300 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#CE4E69]"></div>
                  </label>
                </div>
                <p className="text-xs dark:text-white/80 text-[#1a1424]/80 leading-relaxed">
                  "Use contractions (it's, don't, we've), colloquialisms, and approachable language throughout."
                </p>
              </div>

              {/* RULE 5 */}
              <div className={`p-4 rounded-xl border transition-all ${config.rule5_brandIntegration ? 'surface-card border-[#CE4E69]/40 shadow-sm' : 'surface-deep opacity-60 border-dashed dark:border-white/10 border-black/10'
                }`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {getRuleIcon(5)}
                    <span className="font-bold text-sm dark:text-white text-[#1a1424]">5. Brand Authorship Integration</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.rule5_brandIntegration}
                      onChange={() => handleToggleRule('rule5_brandIntegration')}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-gray-300 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#CE4E69]"></div>
                  </label>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                  <div>
                    <label className="text-[11px] font-mono font-bold dark:text-[#E8899C] text-[#7a6b5a]">Company Name:</label>
                    <input
                      type="text"
                      value={config.rule5_companyName}
                      onChange={(e) => handleTextChange('rule5_companyName', e.target.value)}
                      placeholder="e.g. Acme Labs"
                      disabled={!config.rule5_brandIntegration}
                      className="w-full surface-deep rounded-lg p-2 text-xs font-semibold dark:text-white text-[#1a1424] border dark:border-[#CE4E69]/15 border-[#CE4E69]/15 focus:outline-none focus:border-[#CE4E69]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-mono font-bold dark:text-[#E8899C] text-[#7a6b5a]">Company Value / Context:</label>
                    <input
                      type="text"
                      value={config.rule5_companyInfo}
                      onChange={(e) => handleTextChange('rule5_companyInfo', e.target.value)}
                      placeholder="e.g. Local family installer for 12 yrs"
                      disabled={!config.rule5_brandIntegration}
                      className="w-full surface-deep rounded-lg p-2 text-xs font-semibold dark:text-white text-[#1a1424] border dark:border-[#CE4E69]/15 border-[#CE4E69]/15 focus:outline-none focus:border-[#CE4E69]"
                    />
                  </div>
                </div>
              </div>

              {/* RULE 6 */}
              <div className={`p-4 rounded-xl border transition-all ${config.rule6_nonPushyAuthentic ? 'surface-card border-[#CE4E69]/40 shadow-sm' : 'surface-deep opacity-60 border-dashed dark:border-white/10 border-black/10'
                }`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {getRuleIcon(6)}
                    <span className="font-bold text-sm dark:text-white text-black">6. Non-Pushy / Non-Salesy Human Touch</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.rule6_nonPushyAuthentic}
                      onChange={() => handleToggleRule('rule6_nonPushyAuthentic')}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-gray-300 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#CE4E69]"></div>
                  </label>
                </div>
                <p className="text-xs dark:text-white/80 text-black leading-relaxed">
                  "Do NOT be pushy or salesy. Reader should sense we are human, understand their problems, and give honest facts in a fun, casual way."
                </p>
              </div>

              {/* RULE 7 */}
              <div className={`p-4 rounded-xl border transition-all ${config.rule7_fictionalAnecdotes ? 'surface-card border-[#CE4E69]/40 shadow-sm' : 'surface-deep opacity-60 border-dashed dark:border-white/10 border-black/10'
                }`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {getRuleIcon(7)}
                    <span className="font-bold text-sm dark:text-white text-black">7. Vivid Fictional Anecdotes</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.rule7_fictionalAnecdotes}
                      onChange={() => handleToggleRule('rule7_fictionalAnecdotes')}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-gray-300 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#CE4E69]"></div>
                  </label>
                </div>
                <div className="space-y-1.5 mt-2">
                  <label className="text-[11px] font-mono font-bold dark:text-[#E8899C] text-[#7a6b5a]">Anecdote Scenario Archetype:</label>
                  <input
                    type="text"
                    value={config.rule7_anecdoteTheme}
                    onChange={(e) => handleTextChange('rule7_anecdoteTheme', e.target.value)}
                    placeholder="e.g. Imagine a homeowner whose AC trips at 104 degrees..."
                    disabled={!config.rule7_fictionalAnecdotes}
                    className="w-full surface-deep rounded-lg p-2 text-xs font-semibold dark:text-white text-black border dark:border-[#CE4E69]/15 border-[#CE4E69] focus:outline-none focus:border-[#CE4E69]"
                  />
                </div>
              </div>

              {/* RULE 8 */}
              <div className={`p-4 rounded-xl border transition-all ${config.rule8_hookIntroFramework ? 'surface-card border-[#CE4E69]/40 shadow-sm' : 'surface-deep opacity-60 border-dashed dark:border-white/10 border-black/10'
                }`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {getRuleIcon(8)}
                    <span className="font-bold text-sm dark:text-white text-black">8. Problem-Payoff Intro Hook</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.rule8_hookIntroFramework}
                      onChange={() => handleToggleRule('rule8_hookIntroFramework')}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-gray-300 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#CE4E69]"></div>
                  </label>
                </div>
                <p className="text-xs dark:text-white/80 text-black leading-relaxed">
                  "Introduction identifies buyer problem, contextualizes who they are, outlines what they'll learn, and the payoff."
                </p>
              </div>

              {/* RULE 9 */}
              <div className={`p-4 rounded-xl border transition-all ${config.rule9_dynamicCadence ? 'surface-card border-[#CE4E69]/40 shadow-sm' : 'surface-deep opacity-60 border-dashed dark:border-white/10 border-black/10'
                }`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {getRuleIcon(9)}
                    <span className="font-bold text-sm dark:text-white text-black">9. Dynamic Cadence (Burstiness)</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.rule9_dynamicCadence}
                      onChange={() => handleToggleRule('rule9_dynamicCadence')}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-gray-300 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#CE4E69]"></div>
                  </label>
                </div>
                <p className="text-xs dark:text-white/80 text-black leading-relaxed">
                  "Vary length of paragraphs and sentences. Look for punchy incisive moments while producing 2-4 sentence paragraphs."
                </p>
              </div>

              {/* RULE 10 */}
              <div className={`p-4 rounded-xl border transition-all ${config.rule10_targetAvatar ? 'surface-card border-[#CE4E69]/40 shadow-sm' : 'surface-deep opacity-60 border-dashed dark:border-white/10 border-black/10'
                }`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {getRuleIcon(10)}
                    <span className="font-bold text-sm dark:text-white text-black">10. Target Reader Avatar</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.rule10_targetAvatar}
                      onChange={() => handleToggleRule('rule10_targetAvatar')}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-gray-300 dark:bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#CE4E69]"></div>
                  </label>
                </div>
                <div className="space-y-1.5 mt-2">
                  <label className="text-[11px] font-mono font-bold dark:text-[#E8899C] text-[#7a6b5a]">Primary Avatar / Persona Description:</label>
                  <input
                    type="text"
                    value={config.rule10_avatarDescription}
                    onChange={(e) => handleTextChange('rule10_avatarDescription', e.target.value)}
                    placeholder="e.g. Stressed parent or founder balancing 5 tasks at once"
                    disabled={!config.rule10_targetAvatar}
                    className="w-full surface-deep rounded-lg p-2 text-xs font-semibold dark:text-white text-black border dark:border-[#CE4E69]/15 border-[#CE4E69] focus:outline-none focus:border-[#CE4E69]"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="surface-deep rounded-xl p-4 font-mono text-xs leading-relaxed whitespace-pre-wrap dark:text-white text-black border dark:border-[#CE4E69]/15 border-[#CE4E69] max-h-[360px] overflow-y-auto">
                {getCompiledPromptText()}
              </div>
              <p className="text-xs dark:text-white/70 text-black font-semibold">
                This exact prompt is dynamically injected into Researchub's two-stage humanizer engine to ensure 100% compliance with every rule.
              </p>
            </div>
          )}

          {/* Compliance Audit Section (if provided) */}
          {ruleAudits && ruleAudits.length > 0 && (
            <div className="border-t dark:border-[#CE4E69]/15 border-[#CE4E69] pt-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#CE4E69]" />
                  <span className="font-serif font-bold text-sm dark:text-white text-black">
                    10 Directives Compliance Scorecard
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-[#CE4E69]">
                  {ruleAudits.filter((r) => r.passed).length}/10 Passed
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs font-mono">
                {ruleAudits.map((audit) => (
                  <div
                    key={audit.ruleId}
                    className={`p-2.5 rounded-lg border flex flex-col justify-between ${audit.passed
                        ? 'surface-card border-[#CE4E69]/30'
                        : 'surface-deep border-dashed border-red-500/40'
                      }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold text-black dark:text-white/70">Rule {audit.ruleId}</span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${audit.passed ? 'bg-[#CE4E69]/20 text-[#CE4E69]' : 'bg-red-500/20 text-red-400'
                        }`}>
                        {audit.passed ? `${audit.score}%` : 'Fix'}
                      </span>
                    </div>
                    <div className="font-bold text-[11px] truncate dark:text-white text-black">
                      {audit.title}
                    </div>
                    {audit.metric && (
                      <div className="text-[10px] text-[#CE4E69] font-semibold mt-1 truncate">
                        {audit.metric}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
