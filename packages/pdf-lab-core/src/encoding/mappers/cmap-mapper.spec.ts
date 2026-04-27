import { describe, expect, it } from 'vitest';
import { CMapMapper } from './cmap-mapper.js';

function toBytes(str: string): Uint8Array {
	return new TextEncoder().encode(str);
}

describe('CMap', () => {
	describe('Basics', () => {
		it('should instantiate the class', () => {
			expect(new CMapMapper(toBytes(''))).toBeDefined();
		});

		it('should ignore garbage', () => {
			const source = `
(misplaced string)
1 beginbfchar
<0021> <0065>
endbfchar
`;
			const cmap = new CMapMapper(toBytes(source));
			expect(cmap).toBeDefined();
			expect(cmap.lookup(0x21)).toBe('e');
		});

		it('should ignore missing end markers', () => {
			const source = `
(misplaced string)
1 beginbfchar
<0021> <0065>
`;
			const cmap = new CMapMapper(toBytes(source));
			expect(cmap).toBeDefined();
			expect(cmap.lookup(0x21)).toBe('e');
		});
	});

	describe('Single Mappings', () => {
		it('should parse single mappings', () => {
			const source = `
/PostScript /gibberish
3 beginbfchar
<0021> <0065>
<00af> <0036>
<abcd> <1234>
endbfchar
`;
			const cmap = new CMapMapper(toBytes(source));
			expect(cmap).toBeDefined();
			expect(cmap.lookup(0)).toBe('\uFFFD');
			expect(cmap.lookup(0x21)).toBe('e');
			expect(cmap.lookup(0x22)).toBe('\uFFFD');
			expect(cmap.lookup(0xaf)).toBe('6');
			expect(cmap.lookup(0xbf)).toBe('\uFFFD');
			expect(cmap.lookup(0xabcd)).toBe('\u1234');
			expect(cmap.lookup(0xdcba)).toBe('\uFFFD');
		});

		it('should ignore incomplete single mappings', () => {
			const source = `
3 beginbfchar
<0021> <0065>
<00af> <0036>
<abcd>
endbfchar
`;
			const cmap = new CMapMapper(toBytes(source));
			expect(cmap).toBeDefined();
			expect(cmap.lookup(0x21)).toBe('e');
			expect(cmap.lookup(0xaf)).toBe('6');
			expect(cmap.lookup(0xabcd)).toBe('\uFFFD');
		});

		it('should ignore incomplete range mappings', () => {
			const source = `
3 beginbfrange
<0001> <0002> <00a0>
<0021> <0022> <0100>
<0121> <0122> <0200>
<0200> <a000>
endbfrange
`;
			const cmap = new CMapMapper(toBytes(source));
			expect(cmap).toBeDefined();
			expect(cmap.lookup(0x22)).toBe('\u0101');
			expect(cmap.lookup(0x201)).toBe('\uFFFD');
		});

		it('should decode BTF16-BE Unicode values', () => {
			const source = `
1 beginbfchar
<3AF1> <D840DC3E>
endbfchar
`;
			const cmap = new CMapMapper(toBytes(source));
			expect(cmap).toBeDefined();
			expect(cmap.lookup(0x3af1)).toBe(String.fromCharCode(0x2003e));
		});

		it('should ignore invalid surrogate pairs', () => {
			const source = `
1 beginbfchar
<3AF1> <E840DC3E>
<3AF2> <D840EC3E>
endbfchar
`;
			const cmap = new CMapMapper(toBytes(source));
			expect(cmap).toBeDefined();
			expect(cmap.lookup(0x3af1)).toBe('\uFFFD');
			expect(cmap.lookup(0x3af2)).toBe('\uFFFD');
		});

		it('should parse a ligature mapping', () => {
			const source = `
1 beginbfchar
<0061> [<00660066006C>]
endbfchar
`;
			const cmap = new CMapMapper(toBytes(source));
			expect(cmap).toBeDefined();
			expect(cmap.lookup(0x61)).toBe('ffl');
		});

		it('should discard an invalid ligature', () => {
			// We could also try to heal this error, but why bother repairing
			// broken input?
			const source = `
1 beginbfchar
<0061> [<00660066006C>
endbfchar
`;
			const cmap = new CMapMapper(toBytes(source));
			expect(cmap).toBeDefined();
			expect(cmap.lookup(0x61)).toBe('\uFFFD');
		});
	});

	describe('Range Mappings', () => {
		it('should parse range mappings', () => {
			const source = `
/PostScript /gibberish
3 beginbfrange
<0001> <0002> <00a0>
<0021> <0022> <0100>
<0121> <0122> <0200>
<0200> <a000> <0400>
endbfrange
trailing garbage
`;
			const cmap = new CMapMapper(toBytes(source));
			expect(cmap).toBeDefined();
			expect(cmap.lookup(0)).toBe('\uFFFD');
			expect(cmap.lookup(0x21)).toBe('\u0100');
			expect(cmap.lookup(0x22)).toBe('\u0101');
			expect(cmap.lookup(0x23)).toBe('\uFFFD');
		});

		it('should parse ligature ranges', () => {
			const source = `
beginbfrange
<005f> <0061> [<00660066> <00660069> <00660066006C>]
endbfrange`;
			const cmap = new CMapMapper(toBytes(source));
			expect(cmap).toBeDefined();
			expect(cmap.lookup(0x5f)).toBe('ff');
			expect(cmap.lookup(0x60)).toBe('fi');
			expect(cmap.lookup(0x61)).toBe('ffl');
			expect(cmap.lookup(0x62)).toBe('\uFFFD');
		});

		it('should ignore out-of-range glyphs', () => {
			const source = `
beginbfrange
<005f> <0061> [<00660066> <00660069>]
endbfrange`;
			const cmap = new CMapMapper(toBytes(source));
			expect(cmap).toBeDefined();
			expect(cmap.lookup(0x5f)).toBe('ff');
			expect(cmap.lookup(0x60)).toBe('fi');
			expect(cmap.lookup(0x61)).toBe('\uFFFD');
		});

		it('should discard invalid ligature specifications', () => {
			const source = `
beginbfrange
<005f> <0061> I should not be here!
endbfrange`;
			const cmap = new CMapMapper(toBytes(source));
			expect(cmap).toBeDefined();
			expect(cmap.lookup(0x5f)).toBe('\uFFFD');
			expect(cmap.lookup(0x60)).toBe('\uFFFD');
			expect(cmap.lookup(0x61)).toBe('\uFFFD');
		});

		it('should discard incomplete ligatures', () => {
			// We could also try to heal this error, but why bother repairing
			// broken input?
			const source = `
beginbfrange
<005f> <0061> [<00660066> <00660069> <00660066006C>
endbfrange`;
			const cmap = new CMapMapper(toBytes(source));
			expect(cmap).toBeDefined();
			expect(cmap.lookup(0x5f)).toBe('\uFFFD');
			expect(cmap.lookup(0x60)).toBe('\uFFFD');
			expect(cmap.lookup(0x61)).toBe('\uFFFD');
		});
	});

	describe('String source', () => {
		it('should parse strings', () => {
			const source = `
/PostScript /gibberish
3 beginbfchar
<0021> <0065>
<00af> <0036>
<abcd> <1234>
endbfchar
`;
			const cmap = new CMapMapper(source);
			expect(cmap).toBeDefined();
			expect(cmap.lookup(0)).toBe('\uFFFD');
			expect(cmap.lookup(0x21)).toBe('e');
			expect(cmap.lookup(0x22)).toBe('\uFFFD');
			expect(cmap.lookup(0xaf)).toBe('6');
			expect(cmap.lookup(0xbf)).toBe('\uFFFD');
			expect(cmap.lookup(0xabcd)).toBe('\u1234');
			expect(cmap.lookup(0xdcba)).toBe('\uFFFD');
		});

		it('should bail out on everything else', () => {
			const source = { foo: 'bar' };

			expect(() => new CMapMapper(source as unknown as string)).toThrow(
				"unsupported CMap source type 'object'",
			);
		});
	});

	describe('Codepoint lookup API', () => {
		it('should lookup codepoints', () => {
			const source = `
beginbfrange
<005f> <0061> [<00660066> <00660069> <00660066006C>]
endbfrange`;
			const cmap = new CMapMapper(toBytes(source));
			expect(cmap).toBeDefined();
			expect(cmap.lookupCodepoints(0x5f)).toStrictEqual([0x66, 0x66]);
			expect(cmap.lookupCodepoints(0x60)).toStrictEqual([0x66, 0x69]);
			expect(cmap.lookupCodepoints(0x61)).toStrictEqual([0x66, 0x66, 0x6c]);
			expect(cmap.lookupCodepoints(0x62)).toStrictEqual([]);
		});
	});
});
