

import React from 'react';
import { TABS, AIRCRAFT_COLORS } from '../constants';
import type { TabId } from '../types';

interface HeaderProps {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
}

const DEFAULT_COLORS = { bg: 'bg-blue-600', text: 'text-white', ring: 'ring-blue-500' };


const TabButton: React.FC<{
  tabId: TabId;
  isActive: boolean;
  onClick: () => void;
}> = ({ tabId, isActive, onClick }) => {
  const colors = AIRCRAFT_COLORS[tabId] || DEFAULT_COLORS;
  
  const activeClasses = `${colors.bg} ${colors.text} shadow-lg scale-105`;
  const focusClasses = `focus:ring-2 focus:${colors.ring} focus:ring-opacity-75`;

  return (
    <button
      onClick={onClick}
      className={`px-2 py-1 text-xs sm:text-sm font-bold transition-all duration-200 ease-in-out whitespace-nowrap rounded-md focus:outline-none 
        ${
          isActive
            ? `${activeClasses} ${focusClasses}`
            : `text-gray-300 hover:bg-gray-700 hover:text-white ${focusClasses}`
        }`}
    >
      {tabId}
    </button>
  );
};

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const airplaneTabs = TABS.filter(t => !['LIENS', 'NOTICE', 'RECAP', 'FAVORI'].includes(t)).sort();
  
  return (
    <header className="bg-gray-800 shadow-lg w-full z-10">
      {/* Title Bar */}
      <div className="w-full bg-sky-800 py-2 shadow-md">
        <div className="container mx-auto px-2 sm:px-4">
          <h1 className="text-center text-xl sm:text-2xl font-bold text-white tracking-wider">
            <a
              href="https://www.aero-club-poitou.fr/volmoteur/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline transition-colors duration-200"
            >
              🌤️ 🛫 AéroClub du Poitou 🛬 🌥️
            </a>
          </h1>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="container mx-auto px-2 sm:px-4 py-2">
        <nav className="flex flex-col items-center gap-2 w-full">
          {/* Top Row */}
          <div className="flex flex-wrap justify-center items-center gap-2">
             <TabButton
                tabId='LIENS'
                isActive={activeTab === 'LIENS'}
                onClick={() => setActiveTab('LIENS')}
              />
              <TabButton
                tabId='NOTICE'
                isActive={activeTab === 'NOTICE'}
                onClick={() => setActiveTab('NOTICE')}
              />
              <div className="border-l border-gray-600 h-6 mx-1"></div>
               <TabButton
                tabId='FAVORI'
                isActive={activeTab === 'FAVORI'}
                onClick={() => setActiveTab('FAVORI')}
              />
              <div className="border-l border-gray-600 h-6 mx-1"></div>
              <TabButton
                tabId='RECAP'
                isActive={activeTab === 'RECAP'}
                onClick={() => setActiveTab('RECAP')}
              />
          </div>
           {/* Bottom Row */}
          <div className="flex flex-nowrap justify-center items-center gap-1">
            {airplaneTabs.map((tabId) => (
              <TabButton
                key={tabId}
                tabId={tabId}
                isActive={activeTab === tabId}
                onClick={() => setActiveTab(tabId)}
              />
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;