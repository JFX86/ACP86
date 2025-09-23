import React from 'react';

const NoticeContent: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in p-4 sm:p-6 md:p-8 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg shadow-xl text-gray-300">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-white tracking-wider text-center">
        Notice d'Utilisation
      </h2>
      
      <div className="space-y-8">
        <section>
          <h3 className="text-xl font-semibold text-sky-400 mb-3">Bienvenue sur l'application ACP !</h3>
          <p>
            Cette application vous donne un accès rapide et interactif aux checklists des avions de l'AéroClub du Poitou. Elle est conçue pour fonctionner hors-ligne une fois installée sur votre appareil.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-sky-400 mb-3">Comment utiliser l'application</h3>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Navigation :</strong> Utilisez les onglets en haut pour sélectionner un avion ou une section.</li>
            <li><strong>Checklists Interactives :</strong> Cochez les cases au fur et à mesure que vous effectuez les vérifications. L'application mettra en surbrillance le prochain item à vérifier.</li>
            <li><strong>Avertissements :</strong> Si vous cochez un item en sautant le précédent, ce dernier sera marqué en rouge pour attirer votre attention. Un message d'avertissement apparaîtra en bas de l'écran.</li>
            <li><strong>Favori :</strong> Allez dans l'onglet <strong className="text-yellow-400">FAVORI</strong> pour sélectionner votre avion par défaut. Il s'affichera directement au prochain lancement.</li>
             <li><strong>Récapitulatif :</strong> L'onglet <strong className="text-gray-400">RECAP'</strong> vous donne un tableau comparatif des performances de tous les avions.</li>
            <li><strong>PDF Officiel :</strong> Cliquez sur le titre d'une checklist (ex: "Checklist F-BUBK") pour ouvrir la version PDF officielle du club.</li>
            <li><strong>Réinitialiser :</strong> Un bouton "Réinitialiser" est disponible en haut de chaque checklist pour effacer toutes les cases cochées.</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-sky-400 mb-3">Installer l'application sur votre appareil</h3>
          <p className="mb-4">
            Pour un accès encore plus rapide et une utilisation hors-ligne, vous pouvez installer cette application sur l'écran d'accueil de votre smartphone ou tablette.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-900/50 p-4 rounded-lg">
              <h4 className="font-bold text-lg text-white mb-2">Sur iOS (iPhone/iPad)</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>Ouvrez ce site dans <strong>Safari</strong>.</li>
                <li>Appuyez sur l'icône de partage (un carré avec une flèche vers le haut).</li>
                <li>Faites défiler vers le bas et sélectionnez "Sur l'écran d'accueil".</li>
                <li>Confirmez en appuyant sur "Ajouter".</li>
              </ol>
            </div>
            <div className="bg-gray-900/50 p-4 rounded-lg">
              <h4 className="font-bold text-lg text-white mb-2">Sur Android</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>Ouvrez ce site dans <strong>Chrome</strong>.</li>
                <li>Appuyez sur le menu (les trois points verticaux).</li>
                <li>Sélectionnez "Installer l'application" ou "Ajouter à l'écran d'accueil".</li>
                <li>Suivez les instructions pour confirmer.</li>
              </ol>
            </div>
          </div>
        </section>
      </div>

       <div className="mt-12 text-center text-xs text-gray-500">
          <p>Cette application est un outil d'aide et ne se substitue pas aux documents officiels de l'aéronef.</p>
       </div>
    </div>
  );
};

export default NoticeContent;
