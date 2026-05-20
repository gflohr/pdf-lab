import type { Font } from './font.js';
import type { HheaTable } from './tables/hhea.js';
import type { HmtxTable } from './tables/hmtx.js';
import { HVARTable } from './tables/HVAR.js';
import type { PostTable } from './tables/post.js';
import type { VmtxTable } from './tables/vmtx.js';
import type {
	NamedVariations,
	VariationAxes,
	VariationCoordinates,
} from './types/internal/tables/fvar.js';

/**
 * SFNT (Spline Font) directory structure.
 *
 * Represents the top-level table directory of an SFNT-based font
 * (TrueType / OpenType / WOFF / WOFF2).
 */
export interface SFNTDirectory {
	/** Number of tables in the font. */
	numTables: number;

	/** Maximum power-of-two search range for table directory. */
	searchRange: number;

	/** Log2(max tables) used for binary search optimization. */
	entrySelector: number;

	/** Remaining range after binary search steps. */
	rangeShift: number;

	/** Map of table tags to raw table data. */
	tables: Record<string, unknown>;
}

/**
 * SFNT-based font interface (OpenType / TrueType).
 *
 * This extends the generic {@link Font} interface with access to
 * SFNT table data, horizontal metrics, and variation features.
 *
 * All concrete font implementations in this library (TTF, OTF, WOFF, WOFF2)
 * expose this interface.
 */
export interface SFNTFont extends Omit<Font, 'post'> {
	/**
	 * The SFNT table directory containing all raw font tables.
	 */
	readonly directory: SFNTDirectory;

	/**
	 * Horizontal header metrics (hhea table).
	 */
	readonly hhea: HheaTable;

	/**
	 * Variable font axes (if present in the font).
	 */
	readonly variationAxes: VariationAxes;

	/**
	 * Returns named variation instances defined in the font.
	 */
	namedVariations(): NamedVariations;

	/**
	 * Returns a new font instance with applied variation coordinates.
	 *
	 * @throws if the font does not contain required variation tables.
	 */
	getVariation(settings: string | VariationCoordinates): SFNTFont;

	/**
	 * Returns all Unicode strings associated with a glyph ID.
	 *
	 * @param id - Glyph ID in the font’s glyph table
	 */
	stringsForGlyph(id: number): string[];

	/**
	 * The font's `hmtx` table.
	 */
	hmtx: HmtxTable;

	/**
	 * The font's `HVAR` table.
	 */
	HVAR: HVARTable;

	/**
	 * The font's `post` table.
	 */
	post: PostTable;

	/**
	 * The font's `vmtx` table.
	 */
	vmtx?: VmtxTable;

	// Bad interface starts here.
	_variationProcessor: any;
	'OS/2': any;
}
