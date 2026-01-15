'use client';

import React, { useState } from 'react';
import { Search, Download, Bell, User, Sun, Moon, Monitor } from 'lucide-react';

export default function Header() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'auto'>('dark');
  const [searchQuery, setSearchQuery] = useState('');

  const cycleTheme = () => {
    const themes: ('light' | 'dark' | 'auto')[] = ['light', 'dark', 'auto'];
    const currentIndex = themes.indexOf(theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    setTheme(nextTheme);

    // Apply theme
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (nextTheme === 'light') {
      document.documentElement.classList.remove('dark');
    }
  };

  const ThemeIcon = theme === 'light' ? Sun : theme === 'dark' ? Moon : Monitor;

  return (
    <header className="sticky top-0 z-30 bg-ice-gray dark:bg-deep-navy border-b border-graphite/20 dark:border-medical-teal/10">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Search - CORTEX Search */}
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-graphite-400 dark:text-ice-gray/40" />
            <input
              type="text"
              placeholder="CORTEX Search - Buscar pacientes, protocolos, exames..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="
                w-full pl-10 pr-4 py-2.5 rounded-xl
                bg-white dark:bg-graphite-700
                border border-graphite/20 dark:border-medical-teal/20
                text-graphite dark:text-ice-gray
                placeholder:text-graphite-400 dark:placeholder:text-ice-gray/40
                focus:outline-none focus:ring-2 focus:ring-medical-teal/50 focus:border-medical-teal
                transition-all duration-180
              "
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 ml-6">
          {/* Export Button */}
          <button
            className="
              p-2.5 rounded-xl
              bg-white dark:bg-graphite-700
              border border-graphite/20 dark:border-medical-teal/20
              text-graphite dark:text-ice-gray
              hover:bg-graphite-50 dark:hover:bg-graphite-600
              hover:border-medical-teal
              transition-all duration-180
            "
            title="Exportar"
          >
            <Download className="w-5 h-5" />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={cycleTheme}
            className="
              p-2.5 rounded-xl
              bg-white dark:bg-graphite-700
              border border-graphite/20 dark:border-medical-teal/20
              text-graphite dark:text-ice-gray
              hover:bg-graphite-50 dark:hover:bg-graphite-600
              hover:border-medical-teal
              transition-all duration-180
            "
            title={`Tema: ${theme}`}
          >
            <ThemeIcon className="w-5 h-5" />
          </button>

          {/* Notifications */}
          <button
            className="
              relative p-2.5 rounded-xl
              bg-white dark:bg-graphite-700
              border border-graphite/20 dark:border-medical-teal/20
              text-graphite dark:text-ice-gray
              hover:bg-graphite-50 dark:hover:bg-graphite-600
              hover:border-medical-teal
              transition-all duration-180
            "
            title="Notificações"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-ice-gray dark:border-deep-navy"></span>
          </button>

          {/* User Profile */}
          <button
            className="
              flex items-center gap-3 p-2 pr-4 rounded-xl
              bg-white dark:bg-graphite-700
              border border-graphite/20 dark:border-medical-teal/20
              hover:bg-graphite-50 dark:hover:bg-graphite-600
              hover:border-medical-teal
              transition-all duration-180
            "
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-medical-teal to-medical-teal-700 flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-graphite dark:text-ice-gray">
                Dr. João Victor
              </p>
              <p className="text-xs text-graphite-400 dark:text-ice-gray/60">
                CRM 12345-SP
              </p>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
