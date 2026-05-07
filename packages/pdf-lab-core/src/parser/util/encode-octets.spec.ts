import { describe, expect, it } from 'vitest';
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

		const result = encodeOctets(octets, 'Identity-H');

		expect(Array.from(result)).toStrictEqual([0x41, 0x42, 0x43]);
	});

	it('should decode UTF-8 correctly', () => {
		const octets = [0xc3, 0xb6];

		const result = encodeOctets(octets, 'UTF-8');

		expect(Array.from(result)).toStrictEqual([0x00f6]);
	});

	it('should decode UTF-16LE correctly', () => {
		const octets = [0xf6, 0x00];

		const result = encodeOctets(octets, 'UTF-16LE');

		expect(Array.from(result)).toStrictEqual([0x00f6]);
	});

	it('should decode UTF-16BE correctly (byte swap path)', () => {
		const octets = [0x00, 0xf6];

		const result = encodeOctets(octets, 'UTF-16BE');

		expect(Array.from(result)).toStrictEqual([0x00f6]);
	});

	it('should handle multiple characters in UTF-8', () => {
		const octets = [0x46, 0xc3, 0xbc, 0xc3, 0x9f, 0x65];

		const result = encodeOctets(octets, 'UTF-8');

		expect(Array.from(result)).toStrictEqual([0x46, 0x00fc, 0x00df, 0x65]);
	});

	it('should not swap bytes', () => {
		const octets = [0xab, 0xcd];

		const result = encodeOctets(octets, 'Identity-H');

		expect(Array.from(result)).toStrictEqual([0xab, 0xcd]);
	});
});
