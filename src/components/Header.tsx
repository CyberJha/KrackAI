import React from 'react';
import { PlayCircle, Sparkles, Radar, Sun, Moon, Settings } from 'lucide-react';
import { ProviderConfig } from './SettingsModal';

interface HeaderProps {
  activeTab: 'research' | 'humanizer' | 'scanner';
  setActiveTab: (tab: 'research' | 'humanizer' | 'scanner') => void;
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  providerConfig: ProviderConfig;
  onOpenSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  darkMode,
  setDarkMode,
  providerConfig,
  onOpenSettings,
}) => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md dark:bg-[#080608]/90 bg-[#fbf6ea]/95 dark:border-b dark:border-[#e6d5a8]/15 border-b border-[#d8c496] transition-colors duration-300 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Zone 1: Brand Wordmark (KrackAI) */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group shrink-0" 
            onClick={() => setActiveTab('research')}
          >
            {/* Calligraphic Emblem Logo */}
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#fa520f] via-[#ff8a00] to-[#cc3a05] text-white flex items-center justify-center shadow-lg shadow-[#fa520f]/35 border border-white/20 group-hover:scale-105 transition-transform duration-200">
              <div className="absolute inset-0 rounded-xl bg-black/10 backdrop-blur-[1px]"></div>
              <span className="relative z-10 font-serif italic font-bold text-2xl tracking-tighter drop-shadow-md select-none">K</span>
            </div>

            {/* Dynamic Calligraphic Wordmark */}
            <div className="flex items-baseline space-x-1">
              <span className="font-serif italic font-normal tracking-tight text-2xl sm:text-3xl dark:text-white text-black drop-shadow-sm select-none">
                Krack<span className="font-serif italic text-[#fa520f] font-bold">AI</span>
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#fa520f] inline-block animate-pulse"></span>
            </div>
          </div>

          {/* Zone 2: TABS (AI Research, Human it, Is it AI) */}
          <nav className="flex items-center space-x-1 sm:space-x-2">
            <button
              onClick={() => setActiveTab('research')}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'research'
                  ? 'bg-[#fa520f] text-white shadow-sm shadow-[#fa520f]/20'
                  : 'dark:text-[#ffd06a] text-black hover:bg-[#eee0b8] dark:hover:bg-white/5'
              }`}
            >
              <PlayCircle className="w-4 h-4" />
              <span>AI Research</span>
            </button>

            <button
              onClick={() => setActiveTab('humanizer')}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'humanizer'
                  ? 'bg-[#fa520f] text-white shadow-sm shadow-[#fa520f]/20'
                  : 'dark:text-[#ffd06a] text-black hover:bg-[#eee0b8] dark:hover:bg-white/5'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Human it</span>
            </button>

            <button
              onClick={() => setActiveTab('scanner')}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'scanner'
                  ? 'bg-[#fa520f] text-white shadow-sm shadow-[#fa520f]/20'
                  : 'dark:text-[#ffd06a] text-black hover:bg-[#eee0b8] dark:hover:bg-white/5'
              }`}
            >
              <Radar className="w-4 h-4" />
              <span>Is it AI</span>
            </button>
          </nav>

          {/* Zone 3: Actions, Provider Settings & Night Mode Switch */}
          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            {/* AI Provider Settings Button */}
            <button
              onClick={onOpenSettings}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer shadow-sm dark:bg-[#181216] bg-[#f3e7cb] dark:border-[#e6d5a8]/20 border-[#d8c496] dark:text-white text-black hover:border-[#fa520f]"
              title="Configure AI Provider (Gemini / Groq / OpenAI)"
            >
              <Settings className="w-4 h-4 text-[#fa520f]" />
              <span className="capitalize">{providerConfig.provider}</span>
            </button>

            {/* Night Mode Switch Button */}
            <button
              onClick={() => setDarkMode((prev) => !prev)}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer shadow-sm ${
                darkMode
                  ? 'bg-[#181216] border-[#fa520f]/40 text-[#ffd900] hover:border-[#fa520f] shadow-[#fa520f]/10'
                  : 'bg-[#f3e7cb] border-[#d8c496] text-black hover:bg-[#eee0b8]'
              }`}
              title={darkMode ? 'Switch to Day Mode' : 'Switch to Night Mode'}
              aria-label="Toggle Night Mode"
            >
              {darkMode ? (
                <>
                  <Moon className="w-4 h-4 text-[#fa520f] fill-[#fa520f]/30" />
                  <span className="hidden xs:inline text-white">Night Mode</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#fa520f] animate-pulse"></span>
                </>
              ) : (
                <>
                  <Sun className="w-4 h-4 text-[#ff8a00]" />
                  <span className="hidden xs:inline text-black">Day Mode</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
