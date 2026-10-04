import React, { useState } from 'react';
import { X, Copy, Check, Sparkles, BookOpen, Layers } from 'lucide-react';
import { THE_10_PROMPT_TEMPLATES } from '../data/samples';

interface PromptsCheatSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PromptsCheatSheetModal: React.FC<PromptsCheatSheetModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  if (!isOpen) return null;

  const copySinglePrompt = (id: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const copyAllPrompts = () => {
    const fullText = THE_10_PROMPT_TEMPLATES.map(
      (p) => `${p.id}. ${p.prompt}`
    ).join('\n\n');
    navigator.clipboard.writeText(fullText);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 font-sans">
      <div className="surface-card rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl relative border dark:border-white/10 border-[#d8c496] glass-card">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b dark:border-white/10 border-[#d8c496] surface-deep">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#fa520f]/20 to-[#ff8a00]/10 flex items-center justify-center text-[#fa520f] border border-[#fa520f]/30 shadow-sm">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <span className="font-serif font-bold text-lg text-[#fa520f]">
                10 Humanizing Agent Prompts & Directives
              </span>
              <p className="text-xs dark:text-white/70 text-black font-semibold">
                Verbatim prompt instructions engineered for authentic humanization.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={copyAllPrompts}
              className="btn-mistral text-xs h-9 px-3.5 shimmer-effect hover:scale-105 transition-all cursor-pointer"
            >
              {copiedAll ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedAll ? 'Copied All' : 'Copy All 10 Prompts'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl hover:bg-black/10 dark:hover:bg-white/10 transition-colors cursor-pointer text-[#fa520f]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content list */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          <div className="grid grid-cols-1 gap-4">
            {THE_10_PROMPT_TEMPLATES.map((item) => (
              <div
                key={item.id}
                className="surface-deep rounded-xl p-4 border dark:border-[#e6d5a8]/15 border-[#d8c496] space-y-2 hover:border-[#fa520f]/40 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-6 h-6 rounded-md bg-[#fa520f] text-white font-mono font-bold text-xs flex items-center justify-center">
                      {item.id}
                    </span>
                    <span className="font-bold text-sm dark:text-white text-black">
                      {item.title}
                    </span>
                  </div>

                  <button
                    onClick={() => copySinglePrompt(item.id, item.prompt)}
                    className="flex items-center space-x-1 px-2.5 py-1 rounded-md text-xs font-mono font-bold border dark:border-white/10 border-black/10 hover:border-[#fa520f] transition-colors cursor-pointer dark:text-white text-black"
                  >
                    {copiedId === item.id ? (
                      <>
                        <Check className="w-3 h-3 text-[#fa520f]" />
                        <span className="text-[#fa520f]">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="bg-black/5 dark:bg-white/5 rounded-lg p-3 font-mono text-xs leading-relaxed dark:text-white text-black border dark:border-white/5 border-black/5 select-text">
                  {item.prompt}
                </div>

                <p className="text-xs dark:text-white/60 text-black/70 italic">
                  💡 {item.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
