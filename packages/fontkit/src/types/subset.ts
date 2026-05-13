import type { Glyph } from './glyph';

export interface SubsetStream {
	on: (
		eventType: 'data' | 'end',
		// biome-ignore lint/suspicious/noExplicitAny: backwards compatibility.
		callback: (data: Uint8Array) => any,
	) => SubsetStream;
}

export interface Subset {
	/**
	 * Includes the given glyph object or glyph ID in the subset.
	 * Returns the glyph's new ID in the subset.
	 */
	includeGlyph(glyph: number | Glyph): number;

	/**
	 * Returns a stream containing the encoded font file that can be piped to a
	 * destination, such as a file.
	 */
	encodeStream(): SubsetStream;
}
