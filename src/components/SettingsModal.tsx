import React, { useState, useEffect } from 'react';
import { Settings, Key, Cpu, Check, ShieldCheck, X, Sparkles } from 'lucide-react';

export interface ProviderConfig {
  provider: 'gemini' | 'groq' | 'openai';
  apiKey: string;
  model: string;
}

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: ProviderConfig;
  onSaveConfig: (newConfig: ProviderConfig) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig,
}) => {
  const [provider, setProvider] = useState<'gemini' | 'groq' | 'openai'>(config.provider || 'gemini');
  const [apiKey, setApiKey] = useState(config.apiKey || '');
  const [model, setModel] = useState(config.model || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    setProvider(config.provider || 'gemini');
    setApiKey(config.apiKey || '');
    setModel(config.model || '');
  }, [config, isOpen]);

  if (!isOpen) return null;

  const handleProviderSelect = (p: 'gemini' | 'groq' | 'openai') => {
    setProvider(p);
    if (p === 'gemini') {
      setModel('gemini-3.5-flash');
    } else if (p === 'groq') {
      setModel('llama-3.3-70b-versatile');
    } else if (p === 'openai') {
      setModel('gpt-4o-mini');
    }
  };

  const handleSave = () => {
    onSaveConfig({
      provider,
      apiKey: apiKey.trim(),
      model: model || (provider === 'gemini' ? 'gemini-3.5-flash' : provider === 'groq' ? 'llama-3.3-70b-versatile' : 'gpt-4o-mini'),
    });
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200 font-sans">
      <div className="surface-card rounded-2xl w-full max-w-lg flex flex-col overflow-hidden shadow-2xl relative border dark:border-[#e6d5a8]/25 border-[#d8c496]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b dark:border-[#e6d5a8]/15 border-[#d8c496] surface-deep">
          <div className="flex items-center space-x-2 text-[#fa520f] font-mono font-bold text-sm">
            <Settings className="w-4 h-4" />
            <span>AI ENGINE PROVIDER &amp; API KEYS</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5 text-[#fa520f]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Provider Selection Cards */}
          <div>
            <label className="block text-xs font-mono font-bold uppercase mb-2 dark:text-white text-black">
              SELECT ACTIVE AI PROVIDER
            </label>
            <div className="grid grid-cols-3 gap-2 font-mono text-xs">
              <button
                onClick={() => handleProviderSelect('gemini')}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center space-y-1.5 transition-all cursor-pointer ${
                  provider === 'gemini'
                    ? 'bg-[#fa520f] text-white font-bold border-[#fa520f] shadow-md shadow-[#fa520f]/20'
                    : 'surface-deep dark:text-white text-black hover:border-[#fa520f]'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>Google Gemini</span>
                <span className="text-[10px] opacity-80">(Built-in Default)</span>
              </button>

              <button
                onClick={() => handleProviderSelect('groq')}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center space-y-1.5 transition-all cursor-pointer ${
                  provider === 'groq'
                    ? 'bg-[#fa520f] text-white font-bold border-[#fa520f] shadow-md shadow-[#fa520f]/20'
                    : 'surface-deep dark:text-white text-black hover:border-[#fa520f]'
                }`}
              >
                <Cpu className="w-4 h-4" />
                <span>Groq API</span>
                <span className="text-[10px] opacity-80">(Llama / DeepSeek)</span>
              </button>

              <button
                onClick={() => handleProviderSelect('openai')}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center space-y-1.5 transition-all cursor-pointer ${
                  provider === 'openai'
                    ? 'bg-[#fa520f] text-white font-bold border-[#fa520f] shadow-md shadow-[#fa520f]/20'
                    : 'surface-deep dark:text-white text-black hover:border-[#fa520f]'
                }`}
              >
                <Key className="w-4 h-4" />
                <span>OpenAI API</span>
                <span className="text-[10px] opacity-80">(GPT-4o)</span>
              </button>
            </div>
          </div>

          {/* Model Selection */}
          <div>
            <label className="block text-xs font-mono font-bold uppercase mb-2 dark:text-white text-black">
              MODEL SELECTION
            </label>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full surface-deep rounded-xl p-3 text-xs font-mono font-bold dark:text-white text-black border dark:border-[#e6d5a8]/20 border-[#d8c496] focus:outline-none focus:border-[#fa520f]"
            >
              {provider === 'gemini' && (
                <>
                  <option value="gemini-3.5-flash">gemini-3.5-flash (Standard)</option>
                  <option value="gemini-3.6-flash">gemini-3.6-flash (Advanced)</option>
                  <option value="gemini-3.7-flash">gemini-3.7-flash (Dynamic Pro)</option>
                  <option value="gemini-flash-latest">gemini-flash-latest</option>
                </>
              )}
              {provider === 'groq' && (
                <>
                  <option value="llama-3.3-70b-versatile">llama-3.3-70b-versatile (Recommended)</option>
                  <option value="mixtral-8x7b-32768">mixtral-8x7b-32768</option>
                  <option value="deepseek-r1-distill-llama-70b">deepseek-r1-distill-llama-70b</option>
                  <option value="openai/gpt-oss-120b">openai/gpt-oss-120b (High Capacity)</option>
                </>
              )}
              {provider === 'openai' && (
                <>
                  <option value="gpt-4o-mini">gpt-4o-mini (Fast &amp; Cost-Effective)</option>
                  <option value="gpt-4o">gpt-4o (Full Flagship)</option>
                  <option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
                </>
              )}
            </select>
          </div>

          {/* API Key Input */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-mono font-bold uppercase dark:text-white text-black flex items-center space-x-1.5">
                <Key className="w-3.5 h-3.5 text-[#fa520f]" />
                <span>
                  {provider === 'gemini' ? 'CUSTOM GEMINI API KEY (OPTIONAL)' : `${provider.toUpperCase()} API KEY`}
                </span>
              </label>
              {provider === 'gemini' && (
                <span className="text-[10px] font-mono text-[#fa520f] font-bold">
                  Leave blank to use default system key
                </span>
              )}
            </div>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder={
                provider === 'gemini'
                  ? 'Optional: AIzaSy...'
                  : provider === 'groq'
                  ? 'Enter your Groq Key (gsk_...)'
                  : 'Enter your OpenAI Key (sk-...)'
              }
              className="w-full surface-deep rounded-xl p-3 text-xs font-mono font-bold dark:text-white text-black dark:placeholder-[#ffd06a]/50 placeholder-[#52391e] border dark:border-[#e6d5a8]/20 border-[#d8c496] focus:outline-none focus:border-[#fa520f]"
            />
            <p className="text-[11px] font-mono dark:text-white/60 text-black mt-1.5 font-semibold">
              🔒 Keys are stored strictly in your local browser storage (`localStorage`) and passed securely to server requests.
            </p>
          </div>

          {/* Action Button */}
          <button
            onClick={handleSave}
            className="btn-mistral w-full py-3.5 text-xs font-mono font-bold"
          >
            {savedSuccess ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Provider Config Saved!</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Save Provider &amp; API Configuration</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
