import type { Font } from '../font.js';
import type { HheaTable } from './tables/hhea.js';

interface SFNTDirectory {
	numTables: number;
	searchRange: number;
	entrySelector: number;
	rangeShift: number;
	tables: unknown[];
}

export interface SFNTFont extends Font {
	directory: SFNTDirectory;
	hhea: HheaTable;
}
