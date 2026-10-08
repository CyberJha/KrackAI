import React from 'react';
import { PlayCircle, Sparkles, Radar, Activity, Sun, Moon, Settings } from 'lucide-react';
import { ProviderConfig } from './SettingsModal';

interface HeaderProps {
  activeTab: 'research' | 'humanizer' | 'scanner' | 'telemetry';
  setActiveTab: (tab: 'research' | 'humanizer' | 'scanner' | 'telemetry') => void;
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  providerConfig: ProviderConfig;
  onOpenSettings: () => void;
  onOpenSkill?: () => void;
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
    <header className="sticky top-0 z-50 backdrop-blur-2xl dark:bg-[#06050a]/80 bg-[#faf7f2]/85 dark:border-b dark:border-[#CE4E69]/[0.08] border-b border-[#CE4E69]/[0.1] transition-all duration-300 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3 sm:gap-4">

          {/* Zone 1: Researchub Brand with SVG Logo */}
          <div
            className="flex items-center space-x-3 cursor-pointer group shrink-0 select-none"
            onClick={() => setActiveTab('research')}
            title="Researchub Home"
          >
            {/* Logo Emblem framed crisply from image.svg */}
            <div className="relative w-10 h-10 rounded-xl overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-105 shadow-md shadow-[#CE4E69]/15 group-hover:shadow-lg group-hover:shadow-[#CE4E69]/30 border dark:border-[#CE4E69]/20 border-[#CE4E69]/15 dark:bg-[#0e0c14]/90 bg-white/90 flex items-center justify-center">
              <img
                src="/image.svg"
                alt="Researchub Logo"
                className="w-full h-full object-cover scale-[1.75] -translate-y-[8%] transition-transform duration-300 group-hover:scale-[1.85]"
              />
            </div>

            {/* Typographic Wordmark & Telemetry Beacon */}
            <div className="flex items-baseline space-x-0.5">
              <span className="font-serif font-normal tracking-tight text-xl sm:text-2xl dark:text-white text-[#1a1424] leading-none">
                Research
              </span>
              <span className="font-serif font-normal text-xl sm:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#CE4E69] via-[#D96B82] to-[#CE4E69] leading-none">
                hub
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#CE4E69] to-[#D96B82] ml-1 animate-breathe shadow-sm shadow-[#CE4E69]/40"></span>
            </div>
          </div>

          {/* Zone 2: Navigation Pills — Tactile Floating Container */}
          <nav className="flex items-center p-1 rounded-2xl dark:bg-[#0e0c14]/70 bg-[#f5f0e8]/70 backdrop-blur-xl border dark:border-[#CE4E69]/[0.08] border-[#CE4E69]/[0.12] shadow-inner">
            <button
              onClick={() => setActiveTab('research')}
              className={`flex items-center space-x-1.5 sm:space-x-2 px-2.5 sm:px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap active:scale-[0.97] ${
                activeTab === 'research'
                  ? 'bg-gradient-to-r from-[#CE4E69] via-[#D96B82] to-[#CE4E69] text-white shadow-md shadow-[#CE4E69]/30 scale-[1.02] border border-white/15'
                  : 'dark:text-[#E8899C]/80 text-[#8C2D43] hover:bg-[#CE4E69]/[0.06] dark:hover:bg-[#CE4E69]/[0.08] opacity-85 hover:opacity-100'
              }`}
            >
              <PlayCircle className="w-4 h-4 shrink-0" />
              <span>Research</span>
            </button>

            <button
              onClick={() => setActiveTab('humanizer')}
              className={`flex items-center space-x-1.5 sm:space-x-2 px-2.5 sm:px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap active:scale-[0.97] ${
                activeTab === 'humanizer'
                  ? 'bg-gradient-to-r from-[#CE4E69] via-[#D96B82] to-[#CE4E69] text-white shadow-md shadow-[#CE4E69]/30 scale-[1.02] border border-white/15'
                  : 'dark:text-[#E8899C]/80 text-[#8C2D43] hover:bg-[#CE4E69]/[0.06] dark:hover:bg-[#CE4E69]/[0.08] opacity-85 hover:opacity-100'
              }`}
            >
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>Humanizer</span>
            </button>

            <button
              onClick={() => setActiveTab('scanner')}
              className={`flex items-center space-x-1.5 sm:space-x-2 px-2.5 sm:px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap active:scale-[0.97] ${
                activeTab === 'scanner'
                  ? 'bg-gradient-to-r from-[#CE4E69] via-[#D96B82] to-[#CE4E69] text-white shadow-md shadow-[#CE4E69]/30 scale-[1.02] border border-white/15'
                  : 'dark:text-[#E8899C]/80 text-[#8C2D43] hover:bg-[#CE4E69]/[0.06] dark:hover:bg-[#CE4E69]/[0.08] opacity-85 hover:opacity-100'
              }`}
            >
              <Radar className="w-4 h-4 shrink-0" />
              <span>Audit</span>
            </button>

            <button
              onClick={() => setActiveTab('telemetry')}
              className={`flex items-center space-x-1.5 sm:space-x-2 px-2.5 sm:px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap active:scale-[0.97] ${
                activeTab === 'telemetry'
                  ? 'bg-gradient-to-r from-[#CE4E69] via-[#D96B82] to-[#CE4E69] text-white shadow-md shadow-[#CE4E69]/30 scale-[1.02] border border-white/15'
                  : 'dark:text-[#E8899C]/80 text-[#8C2D43] hover:bg-[#CE4E69]/[0.06] dark:hover:bg-[#CE4E69]/[0.08] opacity-85 hover:opacity-100'
              }`}
            >
              <Activity className="w-4 h-4 shrink-0" />
              <span>3D Lattice</span>
            </button>
          </nav>

          {/* Zone 3: Provider Badge & Theme Toggle */}
          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            {/* AI Provider Settings Button with Gear Rotation */}
            <button
              onClick={onOpenSettings}
              className="group/settings flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono font-semibold transition-all duration-200 cursor-pointer shadow-sm dark:bg-[#0e0c14]/80 bg-[#f5f0e8]/90 dark:border-[#CE4E69]/[0.12] border-[#CE4E69]/[0.15] dark:text-white text-[#1a1424] hover:border-[#CE4E69]/40 backdrop-blur-sm hover:scale-[1.04] active:scale-[0.96]"
              title="Configure AI Engine (Gemini / Groq / OpenAI)"
            >
              <Settings className="w-4 h-4 text-[#CE4E69] transition-transform duration-500 ease-out group-hover/settings:rotate-90" />
              <span className="capitalize">{providerConfig.provider}</span>
            </button>

            {/* Day / Night Mode Toggle */}
            <button
              onClick={() => setDarkMode((prev) => !prev)}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl border text-xs font-mono font-semibold transition-all duration-250 cursor-pointer shadow-sm backdrop-blur-sm hover:scale-[1.04] active:scale-[0.96] ${
                darkMode
                  ? 'bg-[#0e0c14]/80 border-[#CE4E69]/25 text-[#E8899C] hover:border-[#CE4E69]/50 shadow-[#CE4E69]/10'
                  : 'bg-[#f5f0e8]/90 border-[#CE4E69]/15 text-[#1a1424] hover:bg-[#f0ead8]'
              }`}
              title={darkMode ? 'Switch to Day Mode' : 'Switch to Night Mode'}
              aria-label="Toggle Night Mode"
            >
              {darkMode ? (
                <>
                  <Moon className="w-4 h-4 text-[#CE4E69] fill-[#CE4E69]/25" />
                  <span className="hidden xs:inline text-white/90">Night</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#CE4E69] animate-pulse"></span>
                </>
              ) : (
                <>
                  <Sun className="w-4 h-4 text-[#D96B82]" />
                  <span className="hidden xs:inline text-[#1a1424]">Day</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
