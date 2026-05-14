import type { Glyph } from './glyph.js';

export interface SubsetStream extends AsyncIterable<Uint8Array> {
	on: (
		eventType: 'data' | 'end' | 'error',
		// biome-ignore lint/suspicious/noExplicitAny: backwards compatibility.
		callback: (data: Uint8Array) => any,
	) => SubsetStream;

	pipe<T>(destination: T): T;
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
