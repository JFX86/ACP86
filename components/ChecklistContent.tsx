import React, { useState, useRef, useEffect, useMemo, forwardRef } from 'react';
import { createPortal } from 'react-dom';
import type { ChecklistData, ChecklistSection, ChecklistItem, AircraftRecap, TabId } from '../types';
import { AircraftCard } from './AircraftCard';
import { AIRCRAFT_COLORS } from '../constants';

interface WarningPopupProps {
  isVisible: boolean;
  onClose: () => void;
  skippedCount: number;
}

const WarningPopup: React.FC<WarningPopupProps> = ({ isVisible, onClose, skippedCount }) => {
  if (!isVisible || skippedCount === 0) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 z-50 animate-fade-in" role="alert">
      <div className="flex items-center justify-between gap-4 bg-red-800 border border-red-600 text-white font-bold p-3 rounded-lg shadow-2xl max-w-md mx-auto sm:mx-0">
        <span>{`Attention, ${skippedCount} item${skippedCount > 1 ? 's' : ''} n'ont pas été vérifiés !`}</span>
        <button
          onClick={onClose}
          className="p-1 rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Fermer l'alerte"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};


interface ChecklistItemRowProps {
  item: ChecklistItem;
  isChecked?: boolean;
  onToggle?: () => void;
  highlightStyle?: 'next' | 'red';
  aircraftHighlightClasses?: string;
  checkboxClasses?: string;
}

const ChecklistItemRow = forwardRef<HTMLDivElement, ChecklistItemRowProps>(
  ({ item, isChecked, onToggle, highlightStyle, aircraftHighlightClasses, checkboxClasses }, ref) => {
    if (item.isNote) {
      return (
        <div className="text-center text-sm italic text-yellow-300 bg-yellow-900/40 py-2 px-4 my-2 mx-4 rounded-md">
          <p>{item.item}</p>
          {item.action && <p>{item.action}</p>}
        </div>
      );
    }

    const rowClasses = [
      'grid grid-cols-[1fr,auto] gap-4 items-center py-3 px-4 border-b border-gray-700/50 last:border-b-0 transition-all duration-300',
       isChecked
        ? 'bg-gray-800/50'
        : highlightStyle === 'next' && aircraftHighlightClasses
        ? aircraftHighlightClasses
        : highlightStyle === 'red'
        ? 'bg-red-900/60 ring-2 ring-red-600'
        : 'hover:bg-gray-700/40',
    ].join(' ');

    const textClasses = isChecked
      ? 'text-gray-500 line-through italic'
      : item.isWarning || item.item === 'Avion à laver'
      ? 'text-red-400 font-bold'
      : item.item === 'Feux NAV si vol de nuit'
      ? 'italic text-gray-400'
      : 'text-gray-300';

    return (
      <div ref={ref} className={rowClasses}>
        <div className={textClasses}>{item.item}</div>
        <div className="font-semibold text-white">
          {item.action !== undefined ? (
            item.action
          ) : (
            <input
              type="checkbox"
              className={`h-5 w-5 bg-gray-900 border-gray-600 focus:ring-offset-gray-800 rounded ${checkboxClasses ?? 'accent-blue-500 focus:ring-blue-500'}`}
              aria-label={item.item}
              checked={isChecked ?? false}
              onChange={onToggle}
            />
          )}
        </div>
      </div>
    );
  }
);
ChecklistItemRow.displayName = 'ChecklistItemRow';

interface ChecklistSectionCardProps {
  section: ChecklistSection;
  sectionIndex: number;
  checkedState: Record<string, boolean>;
  itemStyles: Record<string, 'next' | 'red'>;
  itemRefs: React.MutableRefObject<Record<string, HTMLDivElement | null>>;
  onItemToggle: (sectionIndex: number, itemIndex: number) => void;
  onSectionToggle: (sectionIndex: number, shouldCheck: boolean) => void;
  aircraftHighlightClasses?: string;
  checkboxClasses?: string;
}

const ChecklistSectionCard: React.FC<ChecklistSectionCardProps> = ({ section, sectionIndex, checkedState, itemStyles, itemRefs, onItemToggle, onSectionToggle, aircraftHighlightClasses, checkboxClasses }) => {
  const sectionCheckboxRef = useRef<HTMLInputElement>(null);

  const checkableItems = useMemo(() => 
    section.items
      .map((item, index) => ({ item, index }))
      .filter(({ item }) => item.action === undefined && !item.isNote)
  , [section.items]);

  const checkedCount = useMemo(() => 
    checkableItems.filter(({ index }) => checkedState[`${sectionIndex}-${index}`]).length
  , [checkableItems, checkedState, sectionIndex]);
  
  const isAllChecked = checkableItems.length > 0 && checkedCount === checkableItems.length;
  const isIndeterminate = checkedCount > 0 && checkedCount < checkableItems.length;

  useEffect(() => {
    if (sectionCheckboxRef.current) {
      sectionCheckboxRef.current.indeterminate = isIndeterminate;
    }
  }, [isIndeterminate]);

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg shadow-xl overflow-hidden mb-8">
      <h3 className="bg-gray-700/80 text-white text-lg font-bold p-3 border-b-2 border-blue-500 flex justify-between items-center">
        <span>{section.title}</span>
        {checkableItems.length > 0 && (
          <input
            ref={sectionCheckboxRef}
            type="checkbox"
            className={`h-5 w-5 bg-gray-900 border-gray-600 focus:ring-offset-gray-800 rounded ${checkboxClasses ?? 'accent-blue-500 focus:ring-blue-500'}`}
            checked={isAllChecked}
            onChange={() => onSectionToggle(sectionIndex, !isAllChecked)}
            aria-label={`Cocher ou décocher tous les éléments pour ${section.title}`}
          />
        )}
      </h3>
      <div>
        {section.items.map((item, index) => {
           const itemKey = `${sectionIndex}-${index}`;
           const isCheckable = item.action === undefined && !item.isNote;
           return (
            <ChecklistItemRow
              ref={el => { if (isCheckable) itemRefs.current[itemKey] = el; }}
              key={index}
              item={item}
              isChecked={checkedState[itemKey]}
              onToggle={isCheckable ? () => onItemToggle(sectionIndex, index) : undefined}
              highlightStyle={itemStyles[itemKey]}
              aircraftHighlightClasses={aircraftHighlightClasses}
              checkboxClasses={checkboxClasses}
            />
          );
        })}
      </div>
    </div>
  );
};

interface ChecklistContentProps {
  data: ChecklistData;
  recapData?: AircraftRecap;
  tabId: TabId;
  checkedState: Record<string, boolean>;
  onCheckedStateChange: (newState: Record<string, boolean>) => void;
  onReset: () => void;
}

const ChecklistContent: React.FC<ChecklistContentProps> = ({ data, recapData, tabId, checkedState, onCheckedStateChange, onReset }) => {
  const colors = AIRCRAFT_COLORS[tabId];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemStyles, setItemStyles] = useState<Record<string, 'next' | 'red'>>({});
  const [showSkippedWarning, setShowSkippedWarning] = useState(false);
  const [skippedCount, setSkippedCount] = useState(0);
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const checkableItems = useMemo(() => {
    const items: { key: string }[] = [];
    data.content.forEach((section, sectionIndex) => {
      section.items.forEach((item, itemIndex) => {
        if (item.action === undefined && !item.isNote) {
          items.push({ key: `${sectionIndex}-${itemIndex}` });
        }
      });
    });
    return items;
  }, [data.content]);

  useEffect(() => {
    // Reset highlights when data source changes (tab switch)
    setItemStyles({});
    setShowSkippedWarning(false);
    setSkippedCount(0);
  }, [data]);
  
  useEffect(() => {
    const newStyles: Record<string, 'next' | 'red'> = {};
    let firstSkippedItemKey: string | null = null;
    let nextItemToHighlightKey: string | null = null;
    let currentSkippedCount = 0;

    const checkedIndices = checkableItems
      .map((item, index) => (checkedState[item.key] ? index : -1))
      .filter((index) => index !== -1);
    
    if (checkedIndices.length === 0) {
      if (checkableItems.length > 0) {
        const firstItemKey = checkableItems[0].key;
        newStyles[firstItemKey] = 'next';
      }
    } else {
        const sortedChecked = [...checkedIndices].sort((a, b) => a - b);
        const firstCheckedIndex = sortedChecked[0];
        
        // Find skips before the very first checked item
        for (let i = 0; i < firstCheckedIndex; i++) {
            const itemKey = checkableItems[i].key;
            if (!checkedState[itemKey]) { // Should always be true
                newStyles[itemKey] = 'red';
                currentSkippedCount++;
                if (!firstSkippedItemKey) {
                    firstSkippedItemKey = itemKey;
                }
            }
        }

        // Find skips between subsequent checked items
        for (let i = 0; i < sortedChecked.length - 1; i++) {
            const current = sortedChecked[i];
            const next = sortedChecked[i + 1];
            if (next > current + 1) {
                for (let j = current + 1; j < next; j++) {
                    const itemKey = checkableItems[j].key;
                    if (!checkedState[itemKey]) {
                        newStyles[itemKey] = 'red';
                        currentSkippedCount++;
                        if (!firstSkippedItemKey) {
                            firstSkippedItemKey = itemKey;
                        }
                    }
                }
            }
        }
    }
    
    // Find next item to highlight
    const lastCheckedIndex = checkedIndices.length > 0 ? Math.max(...checkedIndices) : -1;
    
    if (lastCheckedIndex + 1 < checkableItems.length) {
      const nextItemKey = checkableItems[lastCheckedIndex + 1].key;
      if (!newStyles[nextItemKey] && !checkedState[nextItemKey]) {
        newStyles[nextItemKey] = 'next';
        nextItemToHighlightKey = nextItemKey;
      }
    }
    
    setItemStyles(newStyles);
    setShowSkippedWarning(currentSkippedCount > 0);
    setSkippedCount(currentSkippedCount);

    const scrollToKey = (key: string | null) => {
        if (!key) return;
        const element = itemRefs.current[key];
        if (!element) return;
        
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
        });
    };

    // Scroll logic: red takes precedence over blue
    if (firstSkippedItemKey) {
      scrollToKey(firstSkippedItemKey);
    } else if (nextItemToHighlightKey) {
      scrollToKey(nextItemToHighlightKey);
    }
  }, [checkedState, checkableItems]);


  const handleItemToggle = (sectionIndex: number, itemIndex: number) => {
    const key = `${sectionIndex}-${itemIndex}`;
    onCheckedStateChange({
      ...checkedState,
      [key]: !checkedState[key],
    });
  };

  const handleSectionToggle = (sectionIndex: number, shouldCheck: boolean) => {
    const newCheckedState = { ...checkedState };
    data.content[sectionIndex].items.forEach((item, itemIndex) => {
      if (item.action === undefined && !item.isNote) {
        newCheckedState[`${sectionIndex}-${itemIndex}`] = shouldCheck;
      }
    });
    onCheckedStateChange(newCheckedState);
  };
  
  const handleConfirmReset = () => {
    onReset();
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        {data.pdfUrl && colors ? (
          <a
            href={data.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`block text-center text-2xl sm:text-3xl font-bold p-4 rounded-lg shadow-lg transition-transform duration-200 ease-in-out hover:scale-105 ${colors.bg} ${colors.text}`}
          >
            {data.title}
          </a>
        ) : (
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-white tracking-wide">
            {data.title}
          </h2>
        )}
         {data.content.length > 0 && (
            <div className="mt-4 flex justify-center items-center gap-4">
                <p className="text-red-400 font-semibold text-sm">Ne remplace pas le manuel de vol ⚠</p>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex-shrink-0 px-3 py-1 bg-gray-600 hover:bg-gray-500 text-white font-semibold text-sm rounded-lg shadow-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    aria-label="Réinitialiser la checklist"
                >
                    Réinitialiser
                </button>
            </div>
        )}
      </div>


      {recapData && <AircraftCard plane={recapData} showTitle={false} />}

      {data.content.length > 0 ? (
        <div>
          {data.content.map((section, index) => (
             <ChecklistSectionCard
              key={index}
              section={section}
              sectionIndex={index}
              checkedState={checkedState}
              itemStyles={itemStyles}
              itemRefs={itemRefs}
              onItemToggle={handleItemToggle}
              onSectionToggle={handleSectionToggle}
              aircraftHighlightClasses={colors?.highlight}
              checkboxClasses={colors?.checkbox}
            />
          ))}
        </div>
      ) : null}

       {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-start justify-center pt-20 z-50" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <div className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-600 w-full max-w-sm mx-4">
            <h3 id="modal-title" className="text-xl font-bold mb-4 text-white">Réinitialiser la checklist ?</h3>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                Annuler
              </button>
              <button
                onClick={handleConfirmReset}
                className="px-4 py-2 bg-red-700 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
       {createPortal(
            <WarningPopup isVisible={showSkippedWarning} onClose={() => setShowSkippedWarning(false)} skippedCount={skippedCount} />,
            document.body
        )}
    </div>
  );
};

export default ChecklistContent;
