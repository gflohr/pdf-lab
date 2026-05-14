import type { Font } from '../font.js';
import type {
	NamedVariations,
	VariationAxes,
	VariationCoordinates,
} from './tables/fvar.js';
import type { HheaTable } from './tables/hhea.js';

interface SFNTDirectory {
	numTables: number;
	searchRange: number;
	entrySelector: number;
	rangeShift: number;
	tables: Record<string, unknown>;
}

// FIXME! The base class for all fonts in fontkit is TTFFont. The interface
// will probably be renamed to TTFFont, and the extension added here should
// maybe go into the official API.
export interface SFNTFont extends Font {
	directory: SFNTDirectory;
	hhea: HheaTable;
	variationAxes: VariationAxes;
	namedVariations(): NamedVariations;
	/** Throws, if the necessary tables are absent in the font. */
	getVariation(settings: string | VariationCoordinates): SFNTFont;
	stringsForGlyph(id: number): string[];
}
