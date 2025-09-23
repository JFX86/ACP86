
import React from 'react';

const LinksContent: React.FC = () => {
  const lastUpdatedDate = new Date().toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="max-w-4xl mx-auto animate-fade-in p-4 sm:p-6 md:p-8 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg shadow-xl">
      <div className="space-y-12">
        {/* Liens Utiles Section */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4 tracking-wider">
            LIENS UTILES
          </h2>
          <ul className="space-y-3">
            <li>
              <a
                href="https://openflyers.com/acp/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 hover:underline transition-colors duration-200 text-lg"
              >
                OpenFlyers
              </a>
            </li>
            <li>
              <a
                href="https://www.aero-club-poitou.fr/acp/coin-des-pilotes"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 hover:underline transition-colors duration-200 text-lg"
              >
                Le Coin des Pilotes
              </a>
            </li>
          </ul>
        </div>

        <div className="border-t border-gray-700"></div>

        {/* Contact Section */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4 tracking-wider">
            CONTACT
          </h2>
          <p className="text-gray-300 mb-3">
            Pour toute question ou suggestion, contacter l'adresse suivante :
          </p>
          <a
            href="mailto:aeroclubdupoitou86@gmail.com"
            className="text-blue-400 hover:text-blue-300 hover:underline transition-colors duration-200 text-lg"
          >
            aeroclubdupoitou86@gmail.com
          </a>
        </div>
      </div>

       {/* Footer section inside the card */}
       <div className="mt-16 text-right text-xs text-gray-500">
          <p>créé par Julien FRADET</p>
          <p>Dernière mise à jour : {lastUpdatedDate}</p>
       </div>
    </div>
  );
};

export default LinksContent;