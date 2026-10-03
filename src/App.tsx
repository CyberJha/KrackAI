import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { OneClickResearch } from './components/OneClickResearch';
import { HumanizerStudio } from './components/HumanizerStudio';
import { ForensicScanner } from './components/ForensicScanner';
import { CodeViewer } from './components/CodeViewer';
import { EvasionGuide } from './components/EvasionGuide';
import { SettingsModal, ProviderConfig } from './components/SettingsModal';
import { ShieldCheck, Code2, BookOpen, X } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'research' | 'humanizer' | 'scanner'>('research');
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('krackai_theme');
    return saved ? saved === 'dark' : true;
  });

  const [providerConfig, setProviderConfig] = useState<ProviderConfig>(() => {
    try {
      const saved = localStorage.getItem('krackai_provider_config');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return {
      provider: 'gemini',
      apiKey: '',
      model: 'gemini-3.1-flash-lite',
    };
  });

  const [activeModal, setActiveModal] = useState<'none' | 'code' | 'guide' | 'settings'>('none');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
      localStorage.setItem('krackai_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
      localStorage.setItem('krackai_theme', 'light');
    }
  }, [darkMode]);

  const handleSaveProviderConfig = (newConfig: ProviderConfig) => {
    setProviderConfig(newConfig);
    localStorage.setItem('krackai_provider_config', JSON.stringify(newConfig));
  };

  return (
    <div className="min-h-screen bg-gradient-page flex flex-col font-sans transition-colors duration-300">
      {/* Top Navigation Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        providerConfig={providerConfig}
        onOpenSettings={() => setActiveModal('settings')}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {activeTab === 'research' && (
          <OneClickResearch
            onOpenStudio={() => setActiveTab('humanizer')}
            providerConfig={providerConfig}
            onOpenSettings={() => setActiveModal('settings')}
          />
        )}
        {activeTab === 'humanizer' && (
          <HumanizerStudio
            providerConfig={providerConfig}
            onOpenSettings={() => setActiveModal('settings')}
          />
        )}
        {activeTab === 'scanner' && <ForensicScanner />}
      </main>

      {/* Footer */}
      <footer className="border-t dark:border-[#e6d5a8]/15 border-[#d8c496] dark:bg-[#080608]/90 bg-[#fbf6ea]/90 py-8 text-xs font-sans font-bold dark:text-white/70 text-black transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-[#fa520f]" />
            <span className="font-bold dark:text-white text-black">KrackAI Engine</span>
            <span>—</span>
            <span>Multi-Provider Anti-Detection Architecture ({providerConfig.provider.toUpperCase()})</span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setActiveModal('code')}
              className="hover:text-[#fa520f] font-mono flex items-center space-x-1 transition-colors cursor-pointer"
            >
              <Code2 className="w-3.5 h-3.5 text-[#fa520f]" />
              <span>KrackAI.ipynb</span>
            </button>
            <span>•</span>
            <button
              onClick={() => setActiveModal('guide')}
              className="hover:text-[#fa520f] font-mono flex items-center space-x-1 transition-colors cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#fa520f]" />
              <span>Evasion Guide</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={activeModal === 'settings'}
        onClose={() => setActiveModal('none')}
        config={providerConfig}
        onSaveConfig={handleSaveProviderConfig}
      />

      {/* Slide-Over Modal for Code or Guide */}
      {(activeModal === 'code' || activeModal === 'guide') && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200 font-sans">
          <div className="surface-card rounded-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl relative border dark:border-[#e6d5a8]/25 border-[#d8c496]">
            <div className="flex items-center justify-between px-6 py-4 border-b dark:border-[#e6d5a8]/15 border-[#d8c496] surface-deep">
              <span className="font-serif font-bold text-lg text-[#fa520f]">
                {activeModal === 'code' ? 'KrackAI Source Notebook' : 'Linguistic Evasion Guide'}
              </span>
              <button
                onClick={() => setActiveModal('none')}
                className="p-1 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5 text-[#fa520f]" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-1">
              {activeModal === 'code' ? <CodeViewer /> : <EvasionGuide />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
