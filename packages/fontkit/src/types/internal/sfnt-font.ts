import type { Font } from '../font';

interface SFNTDirectory {
	numTables: number;
	searchRange: number;
	entrySelector: number;
	rangeShift: number;
	tables: unknown[];
}

export interface SFNTFont extends Font {
	directory: SFNTDirectory;
}
