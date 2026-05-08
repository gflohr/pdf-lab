import { describe, expect, it } from 'vitest';
import type { Encoding } from '../../encoding/types.js';
import { encodeOctets } from './encode-octets.js'; // adjust path as needed

describe('encodeOctets', () => {
	it('should map bytes using StandardEncoding (single-byte mapper)', () => {
		// 'böse' in UTF-8 -> bytes: 62 C3 B6 73 65
		const octets = [0x62, 0xc3, 0xb6, 0x73, 0x65];

		const result = encodeOctets(octets, 'StandardEncoding');

		expect(Array.from(result)).toStrictEqual([
			0x62, 0x02c6, 0x00b6, 0x73, 0x65,
		]);
	});

	it('should fall back to raw octet if mapper returns empty', () => {
		const octets = [0x00];

		const result = encodeOctets(octets, 'StandardEncoding');

		expect(Array.from(result)).toStrictEqual([0x00]);
	});

	it('should pass through octets for Identity-H encoding', () => {
		const octets = [0x41, 0x42, 0x43];

		const result = encodeOctets(octets, 'Identity-H' as Encoding);

		expect(Array.from(result)).toStrictEqual([0x41, 0x42, 0x43]);
	});

	it('should not swap bytes', () => {
		const octets = [0xab, 0xcd];

		const result = encodeOctets(octets, 'Identity-H' as Encoding);

		expect(Array.from(result)).toStrictEqual([0xab, 0xcd]);
	});
});
