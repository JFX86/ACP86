// Fix: Import ReactNode to properly type component children/renderable content.
import type { ReactNode } from 'react';

export type TabId = 'LIENS' | 'NOTICE' | 'FAVORI' | 'RECAP' | 'BUBK' | 'GIYA' | 'GKQA' | 'GLVX' | 'HMPI' | 'HNNY' | 'HPPL';

export interface ChecklistItem {
  item: string;
  // Action is now optional to allow for simple checkbox items
  action?: ReactNode;
  isNote?: boolean;
  isWarning?: boolean; // <-- Ajoutez cette ligne
}

export interface ChecklistSection {
  title: string;
  items: ChecklistItem[];
}

export interface ChecklistData {
  title: string;
  content: ChecklistSection[];
  pdfUrl?: string;
}

export type AircraftRecap = {
  id: TabId;
  shortName: string;
  cocoMax: { princ: string; second?: string };
  inutilisable: { princ: string; second?: string };
  conso: { perHour: string; perMin: string };
  autonomie: { coco1: string; coco2?: string };
  ventTravers: { decollage: string; atterrissage: string };
  distances: { decollage: string; atterrissage: string };
  puissance: { decollage: string };
};