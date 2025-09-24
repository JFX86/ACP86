import React from 'react';
import type { TabId } from '../types';
import { TABS, AIRCRAFT_COLORS } from '../constants';

interface FavoritesContentProps {
  currentFavorite: TabId | null;
  setFavorite: (tab: TabId | null) => void;
}

const FavoriteButton: React.FC<{
  tabId: TabId;
  isFavorite: boolean;
  onClick: (tabId: TabId) => void;
}> = ({ tabId, isFavorite, onClick }) => {
  const colors = AIRCRAFT_COLORS[tabId];
  return (
    <button
      onClick={() => onClick(tabId)}
      className={`p-4 font-bold rounded-lg text-center transition-all duration-200 ease-in-out transform focus:outline-none focus:ring-4 ${colors?.ring}
        ${isFavorite
          ? `${colors?.bg} ${colors?.text} scale-105 shadow-2xl ring-4 ring-offset-2 ring-offset-gray-900`
          : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:scale-105 hover:shadow-lg'
        }`}
    >
      <span className="text-2xl">{tabId}</span>
      {isFavorite && (
        <span className="block text-xs mt-2 opacity-90">(Favori actuel)</span>
      )}
    </button>
  );
}

const FavoritesContent: React.FC<FavoritesContentProps> = ({ currentFavorite, setFavorite }) => {
  const aircraftOptions = TABS.filter(t => !['LIENS', 'NOTICE', 'FAVORI', 'RECAP'].includes(t)).sort();
  const otherOptions: TabId[] = ['RECAP', 'LIENS'];

  const handleSelectFavorite = (tabId: TabId) => {
    // If the clicked tab is already the favorite, deselect it. Otherwise, set it as the new favorite.
    if (currentFavorite === tabId) {
      setFavorite(null);
    } else {
      setFavorite(tabId);
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in p-4 sm:p-6 md:p-8 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold text-white mb-6 tracking-wider text-center">
        CHOISIR VOTRE ONGLET FAVORI
      </h2>
       <div className="text-center mb-8">
        <p className="text-gray-300">
          L'onglet sélectionné s'affichera par défaut au lancement de l'application.
        </p>
        <p className="text-gray-400 text-sm mt-2">
          Cliquez à nouveau sur un favori pour le désélectionner. Sans favori, l'application s'ouvrira sur l'onglet NOTICE.
        </p>
      </div>
      
      <div className="space-y-10">
        {/* Section Avions */}
        <div>
          <h3 className="text-xl font-semibold text-sky-400 mb-4 border-b border-gray-600 pb-2">
            Avions
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {aircraftOptions.map(tabId => (
              <FavoriteButton
                key={tabId}
                tabId={tabId}
                isFavorite={currentFavorite === tabId}
                onClick={handleSelectFavorite}
              />
            ))}
          </div>
        </div>

        {/* Section Autres */}
        <div>
          <h3 className="text-xl font-semibold text-sky-400 mb-4 border-b border-gray-600 pb-2">
            Autres Onglets
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {otherOptions.map(tabId => (
              <FavoriteButton
                key={tabId}
                tabId={tabId}
                isFavorite={currentFavorite === tabId}
                onClick={handleSelectFavorite}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoritesContent;
