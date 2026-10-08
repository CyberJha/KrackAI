import React, { useState, useEffect } from 'react';
import { CommandCenter } from './components/CommandCenter';
import { ProviderConfig } from './components/SettingsModal';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('krackai_theme');
      if (saved !== null) return saved === 'dark';
    } catch (e) {
      console.error(e);
    }
    return true; // Default dark
  });

  useEffect(() => {
    try {
      localStorage.setItem('krackai_theme', darkMode ? 'dark' : 'light');
      if (darkMode) {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      } else {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {
      console.error(e);
    }
  }, [darkMode]);

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
      model: 'gemini-3.5-flash',
    };
  });

  const handleSaveProviderConfig = (config: ProviderConfig) => {
    setProviderConfig(config);
    try {
      localStorage.setItem('krackai_provider_config', JSON.stringify(config));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <CommandCenter
      darkMode={darkMode}
      setDarkMode={setDarkMode}
      providerConfig={providerConfig}
      onSaveProviderConfig={handleSaveProviderConfig}
    />
  );
}

