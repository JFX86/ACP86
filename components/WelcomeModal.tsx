import React from 'react';
import { createPortal } from 'react-dom';

interface WelcomeModalProps {
  onClose: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ onClose }) => {
  return createPortal(
    <div 
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 animate-fade-in"
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="welcome-modal-title"
    >
      <div className="bg-gray-800 p-6 sm:p-8 rounded-lg shadow-xl border border-gray-600 w-full max-w-lg mx-4 text-center text-gray-300">
        <h2 id="welcome-modal-title" className="text-2xl sm:text-3xl font-bold mb-4 text-white tracking-wider">
          Bienvenue sur ACP Checklists
        </h2>
        <p className="mb-4">
          Cette application vous donne un accès rapide et interactif aux checklists des avions de l'AéroClub du Poitou.
        </p>
        <p className="mb-6">
          <strong>Conseil :</strong> Allez dans l'onglet <strong className="text-yellow-400">FAVORI</strong> pour sélectionner votre avion par défaut et y accéder directement au prochain lancement !
        </p>
        <button
          onClick={onClose}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg shadow-md transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500 transform hover:scale-105"
        >
          Commencer
        </button>
      </div>
    </div>,
    document.body
  );
};

export default WelcomeModal;
