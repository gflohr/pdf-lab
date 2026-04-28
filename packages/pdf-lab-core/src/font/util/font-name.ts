/**
 * Normalises a PDF font name by removing implementation-specific decorations.
 *
 * In PDF files, font names often differ from the original font’s PostScript
 * name due to two common transformations applied by PDF producers:
 *
 * 1. **Subset prefix** (e.g. `ABCDEF+`):
 *    A six-letter uppercase tag followed by a plus sign indicates that the
 *    embedded font is a subset containing only a subset of glyphs. This prefix
 *    is defined by the PDF specification and is used to avoid name collisions
 *    between multiple subsets of the same base font.
 *
 * 2. **Producer-specific numerical suffix** (e.g. `-1234`):
 *    Some PDF generators append a numeric suffix to ensure uniqueness of font
 *    resource names within the document. This suffix is not defined by the PDF
 *    specification and has no semantic meaning for rendering; it is ignored by
 *    PDF viewers.
 *
 * This function strips both components and returns a stable, comparable font
 * name (typically the original PostScript font name).
 *
 * **Important**: The function does not strip off vendor-specific suffixes like
 * MT or PSMT.
 *
 * @param name - The raw font name as found in the PDF (e.g. `/BaseFont` or `/FontName`).
 * @returns The normalised font name without subset prefix or numeric suffix.
 *
 * @example
 * getFontName('ABCDEF+Helvetica-1234') // -> 'Helvetica'
 * getFontName('ArialMT-5678')          // -> 'ArialMT'
 * getFontName('TimesNewRomanPSMT')     // -> 'TimesNewRomanPSMT'
 */
export function fontName(name: string): string {
	// Strip subset prefix (ABCDEF+).
	name = name.replace(/^[A-Z]{6}\+/, '');

	// Strip producer-specific numerical suffix.
	name = name.replace(/-[0-9]+$/, '');

	return name;
}
