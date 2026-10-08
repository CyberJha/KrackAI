import React, { useState } from 'react';
import { FileCode, Copy, Check, Download } from 'lucide-react';
import { PYTHON_SCRIPT_CODE } from '../data/samples';

export const CodeViewer: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(PYTHON_SCRIPT_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadFile = (filename: string, content: string) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const downloadIpynb = () => {
    const notebookJson = {
      cells: [
        {
          cell_type: 'markdown',
          metadata: {},
          source: [
            '# Researchub Multi-Agent Engine — Production Source Code\n',
            '### Upgraded with Two-Stage Anti-Detection Architecture (0% AI Risk)\n',
          ],
        },
        {
          cell_type: 'code',
          execution_count: null,
          metadata: {},
          outputs: [],
          source: PYTHON_SCRIPT_CODE.split('\n').map((line) => line + '\n'),
        },
      ],
      metadata: {
        language_info: { name: 'python' },
        kernelspec: { display_name: 'Python 3', language: 'python', name: 'python3' },
      },
      nbformat: 4,
      nbformat_minor: 2,
    };

    downloadFile('Researchub.ipynb', JSON.stringify(notebookJson, null, 2));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '960px', margin: '0 auto', fontFamily: 'var(--font-sans)' }}>
      {/* Top Banner */}
      <div
        style={{
          background: '#fafafa',
          borderRadius: '10px',
          padding: '20px',
          border: '1px solid #e5e5e5',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
        }}
      >
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: '#fa520f',
              marginBottom: '4px',
            }}
          >
            <FileCode size={14} />
            <span>Researchub Python Engine Architecture</span>
          </div>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#1f1f1f', margin: '0 0 6px' }}>
            Production LangGraph Orchestration &amp; Directives
          </h2>
          <p style={{ fontSize: '13px', color: '#6a6a6a', margin: 0, maxWidth: '58ch', lineHeight: 1.5 }}>
            Python source with two-stage anti-detection rewrite agents, entropy modulation (0.88), sentence burstiness constraints, and LangGraph workflow.
          </p>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={copyCode}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 12px',
              borderRadius: '7px',
              border: '1px solid #c7c7c7',
              background: '#ffffff',
              cursor: 'pointer',
              fontSize: '12px',
              fontFamily: 'var(--font-sans)',
              fontWeight: 600,
              color: '#1f1f1f',
            }}
          >
            {copied ? <Check size={13} color="#059669" /> : <Copy size={13} />}
            <span>{copied ? 'Copied!' : 'Copy Code'}</span>
          </button>

          <button
            onClick={() => downloadFile('Researchub.py', PYTHON_SCRIPT_CODE)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 12px',
              borderRadius: '7px',
              border: '1px solid #c7c7c7',
              background: '#ffffff',
              cursor: 'pointer',
              fontSize: '12px',
              fontFamily: 'var(--font-sans)',
              fontWeight: 600,
              color: '#1f1f1f',
            }}
          >
            <Download size={13} />
            <span>Download .py</span>
          </button>

          <button
            onClick={downloadIpynb}
            className="btn-primary"
            style={{ padding: '7px 14px', fontSize: '12px' }}
          >
            <Download size={13} />
            <span>Download .ipynb</span>
          </button>
        </div>
      </div>

      {/* Code Window Container */}
      <div
        style={{
          borderRadius: '10px',
          overflow: 'hidden',
          border: '1px solid #e5e5e5',
          background: '#1c1c1e',
          boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
        }}
      >
        {/* Code Window Chrome Bar */}
        <div
          style={{
            background: '#2c2c2e',
            padding: '10px 16px',
            borderBottom: '1px solid #3a3a3c',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f56', display: 'inline-block' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffbd2e', display: 'inline-block' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#27c93f', display: 'inline-block' }} />
            <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#d1d1d6', fontWeight: 600, marginLeft: '8px' }}>
              Researchub.py
            </span>
          </div>

          <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#8e8e93' }}>
            Python 3.11 · LangGraph Multi-Agent
          </div>
        </div>

        {/* Code View Block */}
        <pre
          style={{
            margin: 0,
            padding: '20px',
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            lineHeight: 1.65,
            color: '#e5e5e7',
            overflowX: 'auto',
            userSelect: 'text',
          }}
        >
          <code>{PYTHON_SCRIPT_CODE}</code>
        </pre>
      </div>
    </div>
  );
};
