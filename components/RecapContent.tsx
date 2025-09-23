

import React, { useState } from 'react';
import { RECAP_DATA, AIRCRAFT_COLORS, BRIEFING_PAX_DATA } from '../constants';
import type { TabId, AircraftRecap } from '../types';
import { AircraftCard } from './AircraftCard';

const BriefingPaxCard: React.FC = () => {
  const colors = AIRCRAFT_COLORS['BRIEFING PAX'];
  return (
    <div className={`bg-gray-800/80 border-l-4 ${colors?.border ?? 'border-gray-500'} rounded-r-lg shadow-lg p-6`}>
      <h3 className={`text-2xl font-bold mb-4 text-white`}>{BRIEFING_PAX_DATA.title}</h3>
      <ul className="space-y-3 list-disc list-inside text-gray-300 text-lg">
        {BRIEFING_PAX_DATA.items.map((item, index) => (
          <li key={index} className="pl-2">{item}</li>
        ))}
      </ul>
    </div>
  );
};

const RecapContent: React.FC = () => {
    type FilterType = TabId | 'ALL' | 'BRIEFING PAX';
    const [filter, setFilter] = useState<FilterType>('ALL');
    const aircrafts = RECAP_DATA.map(a => a.id);
    const filteredData = filter === 'ALL' ? RECAP_DATA : RECAP_DATA.filter(d => d.id === filter);
    const title = "Récap'";

    return (
        <div className="max-w-7xl mx-auto animate-fade-in">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-white tracking-wide">
                {title}
            </h2>

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
                <FilterButton label="TOUT" isActive={filter === 'ALL'} onClick={() => setFilter('ALL')} />
                {aircrafts.map(id => (
                    <FilterButton 
                        key={id} 
                        label={id} 
                        isActive={filter === id} 
                        onClick={() => setFilter(id)}
                        colors={AIRCRAFT_COLORS[id]}
                    />
                ))}
                 <FilterButton 
                    label="BRIEFING PAX" 
                    isActive={filter === 'BRIEFING PAX'} 
                    onClick={() => setFilter('BRIEFING PAX')}
                    colors={AIRCRAFT_COLORS['BRIEFING PAX']}
                />
            </div>

            {/* AIRCRAFT CONTENT */}
            {filteredData.length > 0 && (
                <>
                    {/* Mobile & Tablet Portrait View (Cards) */}
                    <div className="lg:hidden space-y-6">
                        {filteredData.map(plane => (
                            <AircraftCard key={plane.id} plane={plane} />
                        ))}
                    </div>

                    {/* Desktop & Tablet Landscape View (Table) */}
                    <div className="hidden lg:block bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg shadow-xl overflow-x-auto">
                        <AircraftTable data={filteredData} />
                    </div>
                </>
            )}

             {/* BRIEFING PAX CONTENT */}
            {(filter === 'ALL' || filter === 'BRIEFING PAX') && (
                <div className={filter === 'ALL' ? "mt-8" : ""}>
                    <BriefingPaxCard />
                </div>
            )}
        </div>
    );
};

interface ColorProps {
    bg: string;
    text: string;
    ring: string;
    border: string;
}

const FilterButton: React.FC<{ label: string; isActive: boolean; onClick: () => void; colors?: ColorProps }> = ({ label, isActive, onClick, colors }) => {
    const activeBg = colors?.bg ?? 'bg-blue-600';
    const activeText = colors?.text ?? 'text-white';
    const activeRing = colors?.ring ?? 'ring-blue-500';

    return (
        <button
            onClick={onClick}
            className={`px-3 py-1 text-sm font-bold transition-colors duration-200 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-75
                ${isActive
                    ? `${activeBg} ${activeText} ring-2 ${activeRing} shadow-lg`
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
                }`}
        >
            {label}
        </button>
    );
}


const AircraftTable: React.FC<{ data: AircraftRecap[] }> = ({ data }) => (
    <table className="w-full text-center text-sm">
        <thead className="bg-gray-700/80 text-xs uppercase tracking-wider">
            <tr>
                <th rowSpan={2} className="p-3 border-b border-r border-gray-600">Avion</th>
                <th colSpan={2} className="p-2 border-b border-r border-gray-600">CARBURANT MAX</th>
                <th colSpan={2} className="p-2 border-b border-r border-gray-600">Inutilisable</th>
                <th colSpan={2} className="p-2 border-b border-r border-gray-600">Conso</th>
                <th colSpan={2} className="p-2 border-b border-r border-gray-600">Autonomie</th>
                <th colSpan={2} className="p-2 border-b border-r border-gray-600">Vent Travers</th>
                <th colSpan={2} className="p-2 border-b border-r border-gray-600">Distances</th>
                <th rowSpan={2} className="p-3 border-b border-gray-600">Puissance Décollage</th>
            </tr>
            <tr>
                <th className="p-2 border-b border-r border-gray-600">princ.</th>
                <th className="p-2 border-b border-r border-gray-600">2nd</th>
                <th className="p-2 border-b border-r border-gray-600">princ.</th>
                <th className="p-2 border-b border-r border-gray-600">2nd</th>
                <th className="p-2 border-b border-r border-gray-600">par H</th>
                <th className="p-2 border-b border-r border-gray-600">par min</th>
                <th className="p-2 border-b border-r border-gray-600">PRINC.</th>
                <th className="p-2 border-b border-r border-gray-600">TOTAL</th>
                <th className="p-2 border-b border-r border-gray-600">décollage</th>
                <th className="p-2 border-b border-r border-gray-600">atterrissage</th>
                <th className="p-2 border-b border-r border-gray-600">décollage</th>
                <th className="p-2 border-b border-r border-gray-600">atterrissage</th>
            </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
            {data.map(plane => {
                const colors = AIRCRAFT_COLORS[plane.id];
                return (
                    <tr key={plane.id} className={`${colors?.tableHighlight || ''} transition-all hover:brightness-125`}>
                        <td className={`p-3 font-bold text-white border-r border-gray-600`}>{plane.shortName}</td>
                        <td className="p-2 border-r border-gray-600">{plane.cocoMax.princ}</td>
                        <td className="p-2 border-r border-gray-600">{plane.cocoMax.second || '-'}</td>
                        <td className="p-2 border-r border-gray-600">{plane.inutilisable.princ}</td>
                        <td className="p-2 border-r border-gray-600">{plane.inutilisable.second || '-'}</td>
                        <td className="p-2 border-r border-gray-600">{plane.conso.perHour}</td>
                        <td className="p-2 border-r border-gray-600">{plane.conso.perMin}</td>
                        <td className="p-2 border-r border-gray-600">{plane.autonomie.coco1}</td>
                        <td className="p-2 border-r border-gray-600">{plane.autonomie.coco2 || '-'}</td>
                        <td className="p-2 border-r border-gray-600">{plane.ventTravers.decollage}</td>
                        <td className="p-2 border-r border-gray-600">{plane.ventTravers.atterrissage}</td>
                        <td className="p-2 border-r border-gray-600">{plane.distances.decollage}</td>
                        <td className="p-2 border-r border-gray-600">{plane.distances.atterrissage}</td>
                        <td className="p-2">{plane.puissance.decollage}</td>
                    </tr>
                );
            })}
        </tbody>
    </table>
);

export default RecapContent;