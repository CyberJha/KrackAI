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
            '# KrackAI Multi-Agent Engine — Production Source Code\\n',
            '### Upgraded with Two-Stage Anti-Detection Architecture (0% AI Risk)\\n',
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

    downloadFile('KrackAI.ipynb', JSON.stringify(notebookJson, null, 2));
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Banner */}
      <div className="surface-card rounded-2xl p-6 border dark:border-[#e6d5a8]/20 border-[#e6d5a8] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[#fa520f] font-mono text-xs uppercase mb-1 font-bold">
            <FileCode className="w-4 h-4" />
            <span>KRACKAI SOURCE ARCHITECTURE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif dark:text-[#fff8e0] text-[#24180e] tracking-tight">
            KrackAI.ipynb / Python Implementation
          </h2>
          <p className="text-xs sm:text-sm dark:text-[#ffb83e]/80 text-[#633f00] mt-1 max-w-2xl leading-relaxed">
            Pristine Python script with two-stage anti-detection rewrite agents, high-temperature sampling (0.88), sentence burstiness constraints, and LangGraph workflow.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={copyCode}
            className="btn-mistral-outline text-xs h-9 px-3.5"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-[#fa520f]" />}
            <span className="dark:text-[#fff8e0] text-[#24180e] font-semibold">{copied ? 'Copied!' : 'Copy Code'}</span>
          </button>

          <button
            onClick={() => downloadFile('KrackAI.py', PYTHON_SCRIPT_CODE)}
            className="btn-mistral-outline text-xs h-9 px-3.5"
          >
            <Download className="w-3.5 h-3.5 text-[#fa520f]" />
            <span className="dark:text-[#fff8e0] text-[#24180e] font-semibold">Download .py</span>
          </button>

          <button
            onClick={downloadIpynb}
            className="btn-mistral text-xs h-9 px-4"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .ipynb</span>
          </button>
        </div>
      </div>

      {/* Code Window Container */}
      <div className="surface-card rounded-2xl overflow-hidden shadow-xl border dark:border-[#e6d5a8]/20 border-[#e6d5a8]">
        {/* Code Window Chrome Bar */}
        <div className="surface-deep px-4 py-3 border-b dark:border-[#e6d5a8]/15 border-[#e6d5a8] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-rose-500 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
            <span className="text-xs font-mono dark:text-[#ffd06a] text-[#633f00] font-bold ml-2">KrackAI.py</span>
          </div>

          <div className="text-xs font-mono dark:text-[#ffb83e]/70 text-[#633f00] font-semibold">
            Python 3.11 · LangGraph
          </div>
        </div>

        {/* Code View Block */}
        <pre className="p-6 text-xs sm:text-sm font-mono dark:bg-[#0c090b] bg-[#fffaeb] dark:text-[#fff8e0] text-[#1c1209] leading-relaxed overflow-x-auto select-text scrollbar-thin">
          <code>{PYTHON_SCRIPT_CODE}</code>
        </pre>
      </div>
    </div>
  );
};
