import React, { useState, useEffect } from 'react';
import { Settings, Key, Cpu, Check, ShieldCheck, X, Sparkles } from 'lucide-react';

export interface ProviderConfig {
  provider: 'gemini' | 'groq' | 'openrouter' | 'openai';
  apiKey: string;
  model: string;
}

interface SettingsModalProps {
  darkMode?: boolean;
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
  darkMode = true,
}) => {
  const [provider, setProvider] = useState<'gemini' | 'groq' | 'openrouter' | 'openai'>(config.provider || 'gemini');
  const [apiKey, setApiKey] = useState(config.apiKey || '');
  const [model, setModel] = useState(config.model || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    setProvider(config.provider || 'gemini');
    setApiKey(config.apiKey || '');
    setModel(config.model || '');
  }, [config, isOpen]);

  if (!isOpen) return null;

  const handleProviderSelect = (p: 'gemini' | 'groq' | 'openrouter' | 'openai') => {
    setProvider(p);
    if (p === 'gemini') {
      setModel('gemini-3.5-flash');
    } else if (p === 'groq') {
      setModel('llama-3.3-70b-versatile');
    } else if (p === 'openrouter' || p === 'openai') {
      setModel('nvidia/nemotron-3-ultra-550b-a55b:free');
    }
  };

  const handleSave = () => {
    onSaveConfig({
      provider,
      apiKey: apiKey.trim(),
      model: model || (provider === 'gemini' ? 'gemini-3.5-flash' : provider === 'groq' ? 'llama-3.3-70b-versatile' : 'nvidia/nemotron-3-ultra-550b-a55b:free'),
    });
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        background: darkMode ? 'rgba(0,0,0,0.7)' : 'rgba(40,25,10,0.3)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '520px',
          background: darkMode ? '#14110e' : '#ffffff',
          borderRadius: '16px',
          border: darkMode ? '1px solid rgba(255,255,255,0.12)' : '1px solid #e7ded2',
          overflow: 'hidden',
          boxShadow: darkMode ? '0 32px 80px rgba(0,0,0,0.85)' : '0 24px 60px rgba(120,80,30,0.15)',
          fontFamily: 'var(--font-sans)',
          backdropFilter: 'blur(32px)',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 20px',
            borderBottom: darkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid #efe6da', background: darkMode ? 'rgba(255,255,255,0.03)' : '#faf7f2',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Settings size={15} color="#fa520f" />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--text-primary)',
              }}
            >
              AI Engine &amp; API Configuration
            </span>
          </div>
          <button
            onClick={onClose}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '28px',
              height: '28px',
              borderRadius: '7px',
              border: '1px solid var(--border-subtle)', background: (darkMode ? 'rgba(255,255,255,0.03)' : '#faf7f2'),
              cursor: 'pointer',
              color: 'var(--text-secondary)',
              transition: 'background 140ms ease',
            }}
          >
            <X size={15} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Provider Selection */}
          <div>
            <label
              style={{
                display: 'block',
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--text-muted)',
                marginBottom: '8px',
              }}
            >
              Select Active AI Provider
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {[
                { id: 'gemini', label: 'Google Gemini', desc: 'Built-in Default', icon: Sparkles },
                { id: 'groq', label: 'Groq API', desc: 'Llama 3.3 70B', icon: Cpu },
                { id: 'openrouter', label: 'OpenRouter', desc: 'Nemotron 3 Free', icon: Key },
              ].map(({ id, label, desc, icon: Icon }) => {
                const active = provider === id;
                return (
                  <button
                    key={id}
                    onClick={() => handleProviderSelect(id as any)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '12px 8px',
                      borderRadius: '8px',
                      border: `1px solid ${active ? 'var(--forge-500)' : 'var(--border-subtle)'}`,
                      background: active ? 'rgba(250,82,15,0.15)' : 'var(--glass-card)',
                      cursor: 'pointer',
                      transition: 'all 140ms ease',
                    }}
                  >
                    <Icon size={16} color={active ? '#fa520f' : 'var(--text-muted)'} />
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: active ? 700 : 500,
                        color: active ? '#ffffff' : 'var(--text-secondary)',
                      }}
                    >
                      {label}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '9px',
                        color: active ? 'var(--forge-300)' : 'var(--text-muted)',
                      }}
                    >
                      {desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Model Selection */}
          <div>
            <label
              style={{
                display: 'block',
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--text-muted)',
                marginBottom: '8px',
              }}
            >
              Model Architecture
            </label>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 12px',
                borderRadius: '8px',
                border: darkMode ? '1px solid rgba(255,255,255,0.12)' : '1px solid #ded4c5', background: darkMode ? 'rgba(255,255,255,0.05)' : '#faf7f2', fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                color: darkMode ? '#ffffff' : '#18120a',
                outline: 'none',
                cursor: 'pointer',
              }}
            >
                            {provider === 'gemini' && (
                <>
                  <option style={{ background: darkMode ? '#1c1917' : '#ffffff', color: darkMode ? '#ffffff' : '#1c1917' }} value="gemini-3.5-flash-lite">gemini-3.5-flash-lite (Lite / Fast)</option>
                  <option style={{ background: darkMode ? '#1c1917' : '#ffffff', color: darkMode ? '#ffffff' : '#1c1917' }} value="gemini-3.5-flash">gemini-3.5-flash (Standard)</option>
                  <option style={{ background: darkMode ? '#1c1917' : '#ffffff', color: darkMode ? '#ffffff' : '#1c1917' }} value="gemini-3.6-flash">gemini-3.6-flash (Advanced)</option>
                  <option style={{ background: darkMode ? '#1c1917' : '#ffffff', color: darkMode ? '#ffffff' : '#1c1917' }} value="gemini-3.7-flash">gemini-3.7-flash (Dynamic Pro)</option>
                  <option style={{ background: darkMode ? '#1c1917' : '#ffffff', color: darkMode ? '#ffffff' : '#1c1917' }} value="gemini-flash-latest">gemini-flash-latest</option>
                </>
              )}
              {provider === 'groq' && (
                <>
                  <option style={{ background: darkMode ? '#1c1917' : '#ffffff', color: darkMode ? '#ffffff' : '#1c1917' }} value="llama-3.3-70b-versatile">llama-3.3-70b-versatile (Recommended)</option>
                  <option style={{ background: darkMode ? '#1c1917' : '#ffffff', color: darkMode ? '#ffffff' : '#1c1917' }} value="mixtral-8x7b-32768">mixtral-8x7b-32768</option>
                  <option style={{ background: darkMode ? '#1c1917' : '#ffffff', color: darkMode ? '#ffffff' : '#1c1917' }} value="deepseek-r1-distill-llama-70b">deepseek-r1-distill-llama-70b</option>
                  <option style={{ background: darkMode ? '#1c1917' : '#ffffff', color: darkMode ? '#ffffff' : '#1c1917' }} value="openai/gpt-oss-120b">openai/gpt-oss-120b (High Capacity)</option>
                </>
              )}
              {(provider === 'openrouter' || provider === 'openai') && (
                <>
                  <option style={{ background: darkMode ? '#1c1917' : '#ffffff', color: darkMode ? '#ffffff' : '#1c1917' }} value="nvidia/nemotron-3-ultra-550b-a55b:free">nvidia/nemotron-3-ultra-550b-a55b:free (Nemotron 3 Ultra 550B - Free)</option>
                  <option style={{ background: darkMode ? '#1c1917' : '#ffffff', color: darkMode ? '#ffffff' : '#1c1917' }} value="meta-llama/llama-3.3-70b-instruct:free">meta-llama/llama-3.3-70b-instruct:free (Llama 3.3 70B - Free)</option>
                  <option style={{ background: darkMode ? '#1c1917' : '#ffffff', color: darkMode ? '#ffffff' : '#1c1917' }} value="deepseek/deepseek-r1:free">deepseek/deepseek-r1:free (DeepSeek R1 - Free)</option>
                  <option style={{ background: darkMode ? '#1c1917' : '#ffffff', color: darkMode ? '#ffffff' : '#1c1917' }} value="google/gemini-2.0-flash-exp:free">google/gemini-2.0-flash-exp:free (Gemini 2.0 Flash - Free)</option>
                </>
              )}
            </select>
          </div>

          {/* API Key Input */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                }}
              >
                <Key size={12} color="#fa520f" />
                {provider === 'gemini' ? 'Custom Gemini API Key (Optional)' : `${provider.toUpperCase()} API Key`}
              </label>
              {provider === 'gemini' && (
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#34d399', fontWeight: 600 }}>
                  Uses built-in server key if left blank
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
                  : provider === 'openrouter' || provider === 'openai' ? 'Enter your OpenRouter Key (sk-or-v1-...)' : 'Enter your API Key'
              }
              style={{
                width: '100%',
                padding: '9px 12px',
                borderRadius: '8px',
                border: darkMode ? '1px solid rgba(255,255,255,0.12)' : '1px solid #ded4c5', background: darkMode ? 'rgba(255,255,255,0.05)' : '#faf7f2', fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                color: darkMode ? '#ffffff' : '#18120a',
                outline: 'none',
              }}
            />
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                color: 'var(--text-muted)',
                marginTop: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span>🔒 Client-side security: Keys stay strictly in your local browser (localStorage).</span>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={handleSave}
            className="btn-primary"
            style={{ width: '100%', padding: '11px 16px', fontSize: '13px' }}
          >
            {savedSuccess ? (
              <>
                <Check size={14} color="#ffffff" />
                <span>Configuration Saved!</span>
              </>
            ) : (
              <>
                <ShieldCheck size={14} />
                <span>Save Provider &amp; Model Configuration</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};


