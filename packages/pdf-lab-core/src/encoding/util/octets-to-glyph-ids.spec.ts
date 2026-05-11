import { describe, expect, it } from 'vitest';
import { CMapMapper } from '../mappers/cmap-mapper.js';
import { SingleByteEncodingMapper } from '../mappers/single-byte-encoding-mapper.js';
import { octetsToGlyphIds } from './octets-to-glyph-ids.js';

describe('Convert octets to glyph IDs', () => {
	it('should return 8-bit glyph IDs, if they exist', () => {
		const mapper = new SingleByteEncodingMapper('MacRomanEncoding');

		const octets = new TextEncoder().encode('Hello');
		expect(octetsToGlyphIds(octets, mapper)).toStrictEqual([
			72, 101, 108, 108, 111,
		]);
	});

	it('should allow 1-4 leading zeros', () => {
		const source = `1 beginbfrange
<0001> <0005> <0041>
endbfchar
	`;
		const mapper = new CMapMapper(source);
		const octets = new Uint8Array([
			0x01, 0x00, 0x02, 0x00, 0x00, 0x03, 0x00, 0x00, 0x00, 0x04, 0x00, 0x00,
			0x00, 0x00, 0x05,
		]);
		expect(octetsToGlyphIds(octets, mapper)).toStrictEqual([
			0x01, 0x02, 0x03, 0x04, 0x00, 0x05,
		]);
	});

	it('should handle unexpected end of string', () => {
		const source = `1 beginbfrange
<0001> <0005> <0041>
endbfchar
	`;
		const mapper = new CMapMapper(source);
		const octets = new Uint8Array([0x00, 0x00, 0x00]);
		expect(octetsToGlyphIds(octets, mapper)).toStrictEqual([0x00, 0x00, 0x00]);
	});
});
