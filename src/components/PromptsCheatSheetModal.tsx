import React, { useState } from 'react';
import { X, Copy, Check, BookOpen } from 'lucide-react';
import { THE_10_PROMPT_TEMPLATES } from '../data/samples';

interface PromptsCheatSheetModalProps {
  darkMode?: boolean;
  isOpen: boolean;
  onClose: () => void;
}

export const PromptsCheatSheetModal: React.FC<PromptsCheatSheetModalProps> = ({
  isOpen,
  onClose,
  darkMode = true,
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
      (p) => `${p.id}. ${p.title}\n${p.prompt}`
    ).join('\n\n');
    navigator.clipboard.writeText(fullText);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
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
          maxWidth: '860px',
          maxHeight: '90vh',
          background: darkMode ? '#14110e' : '#ffffff',
          borderRadius: '16px',
          border: darkMode ? '1px solid rgba(255,255,255,0.12)' : '1px solid #e7ded2',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
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
            padding: '18px 24px',
            borderBottom: darkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid #efe6da',
            background: darkMode ? 'rgba(255,255,255,0.03)' : '#faf7f2',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '8px',
                background: 'rgba(250,82,15,0.12)',
                border: '1px solid rgba(250,82,15,0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <BookOpen size={16} color="#fa520f" />
            </div>
            <div>
              <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>
                10 Humanizing Directives &amp; Evasion Prompts
              </span>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0' }}>
                Verbatim prompt instructions engineered for human-grade tone and statistical evasion.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={copyAllPrompts}
              className="btn-primary"
              style={{ padding: '7px 14px', fontSize: '12px' }}
            >
              {copiedAll ? <Check size={13} color="#ffffff" /> : <Copy size={13} />}
              <span>{copiedAll ? 'Copied All' : 'Copy All Directives'}</span>
            </button>

            <button
              onClick={onClose}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '30px',
                height: '30px',
                borderRadius: '7px',
                border: '1px solid var(--border-subtle)',
                background: 'var(--glass-card)',
                cursor: 'pointer',
                color: 'var(--text-secondary)',
                transition: 'background 140ms ease',
              }}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Content list */}
        <div style={{ padding: '24px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {THE_10_PROMPT_TEMPLATES.map((item) => (
            <div
              key={item.id}
              style={{
                background: darkMode ? 'rgba(255,255,255,0.03)' : '#faf7f2',
                borderRadius: '12px',
                padding: '16px',
                border: darkMode ? '1px solid rgba(255,255,255,0.07)' : '1px solid #ece2d5',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span
                    style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '6px',
                      background: 'var(--forge-500)',
                      color: '#ffffff',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 700,
                      fontSize: '11px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {item.id}
                  </span>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {item.title}
                  </span>
                </div>

                <button
                  onClick={() => copySinglePrompt(item.id, item.prompt)}
                  className="btn-ghost"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    padding: '4px 10px',
                    fontSize: '11px',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 600,
                  }}
                >
                  {copiedId === item.id ? (
                    <>
                      <Check size={12} color="#34d399" />
                      <span style={{ color: '#34d399' }}>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy size={12} />
                      <span>Copy Directive</span>
                    </>
                  )}
                </button>
              </div>

              <div
                style={{
                  background: darkMode ? 'rgba(255,255,255,0.05)' : '#ffffff',
                  border: darkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid #e2d7c7',
                  borderRadius: '8px',
                  padding: '12px 14px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  lineHeight: 1.6,
                  color: 'var(--text-primary)',
                  userSelect: 'text',
                }}
              >
                {item.prompt}
              </div>

              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0, fontStyle: 'italic' }}>
                Direct utility: {item.explanation}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


