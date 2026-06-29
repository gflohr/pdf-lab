import r from '@pdf-lib/restructure';
import { describe, expect, it } from 'vitest'; // or jest
import { opbd } from '../src/tables/opbd.js';

describe('opbd (Optical Bounds) Table parsing', () => {
	it('should successfully parse an AAT LookupTable Format 8 structure', () => {
		const mockOpbdData = new Uint8Array([
			// Table header.
			0x00,
			0x01,
			0x00,
			0x00, // version: fixed32 (1.0)
			0x00,
			0x01, // format: uint16 (1)

			// VersionedStruct with version 8.
			0x00,
			0x08, // Lookup Table format: uint16 (Format 8)

			// Format and body.
			0x00,
			0x05, // firstGlyph: uint16 (Glyph ID 5)
			0x00,
			0x02, // count: uint16 (2 glyphs have bounds data)

			// Optical bounds data of glyph 5.
			0xff,
			0xf0, // left: int16 (-16)
			0x03,
			0xe8, // top: int16 (1000)
			0x02,
			0x58, // right: int16 (600)
			0x00,
			0x00, // bottom: int16 (0)

			// Optical bounds data of glyph 5.
			0x00,
			0x0a, // left: int16 (10)
			0x04,
			0x00, // top: int16 (1024)
			0x01,
			0xf4, // right: int16 (500)
			0xff,
			0x9c, // bottom: int16 (-100)
		]);

		// Decode the raw mock binary using restructure
		const result = opbd.decode(new r.DecodeStream(Buffer.from(mockOpbdData)));

		// Verify the parent header
		expect(result.version).toBe(1.0);
		expect(result.format).toBe(1);

		// Verify the inner LookUpTable parsed its Discriminated Union accurately
		expect(result.lookupTable.version).toBe(8);

		// This is always true because of the assertion above. But the
		// TypeScript compiler needs it.
		if (result.lookupTable.version === 8) {
			expect(result.lookupTable.firstGlyph).toBe(5);
			expect(result.lookupTable.count).toBe(2);

			// Assert on parsed array values
			expect(result.lookupTable.values).toHaveLength(2);
			expect(result.lookupTable.values[0]).toEqual({
				left: -16,
				top: 1000,
				right: 600,
				bottom: 0,
			});
			expect(result.lookupTable.values[1]).toEqual({
				left: 10,
				top: 1024,
				right: 500,
				bottom: -100,
			});
		}
	});
});
