import { describe, expect, it } from 'vitest';
import { Lexer } from './lexer.js';

function toBytes(str: string): Uint8Array {
	return new TextEncoder().encode(str);
}

describe('Lexer', () => {
	it('tokenizes simple tokens', () => {
		const lexer = new Lexer();
		const tokens = lexer.tokenize(toBytes('abc def'));

		expect(tokens).toEqual([
			{ type: 'token', value: [97, 98, 99], offset: 0, length: 3 },
			{ type: 'token', value: [100, 101, 102], offset: 4, length: 3 },
		]);
	});

	it('handles whitespace separation', () => {
		const lexer = new Lexer();
		const tokens = lexer.tokenize(toBytes('abc   def\tghi\njkl'));

		expect(tokens).toEqual([
			{ type: 'token', value: [97, 98, 99], offset: 0, length: 3 },
			{ type: 'token', value: [100, 101, 102], offset: 6, length: 3 },
			{ type: 'token', value: [103, 104, 105], offset: 10, length: 3 },
			{ type: 'token', value: [106, 107, 108], offset: 14, length: 3 },
		]);
	});

	it('parses literal strings', () => {
		const lexer = new Lexer();
		const tokens = lexer.tokenize(toBytes('1 2(Hello) "'));

		expect(tokens).toEqual([
			{ type: 'token', value: [49], offset: 0, length: 1 },
			{ type: 'token', value: [50], offset: 2, length: 1 },
			{ type: 'string', value: [72, 101, 108, 108, 111], offset: 3, length: 7},
			{ type: 'token', value: [34], offset: 11, length: 1 },
		]);
	});

	it('handles escaped characters in strings', () => {
		const lexer = new Lexer();
		const tokens = lexer.tokenize(toBytes('(Hel\\)lo)'));

		expect(tokens.length).toBe(1);
		const token = tokens[0]!;
		expect(token.type).toBe('string');
		expect(token.value.length).toBeGreaterThan(0);
	});

	it('handles nested parentheses', () => {
		const lexer = new Lexer();
		const tokens = lexer.tokenize(toBytes('(Hello (world))'));

		expect(tokens).toEqual([
			{
				type: 'string',
				value: [72, 101, 108, 108, 111, 32, 40, 119, 111, 114, 108, 100, 41],
				offset: 0,
				length: 15,
			},
		]);
	});

	it('handles deeply nested parentheses', () => {
		const lexer = new Lexer();
		const tokens = lexer.tokenize(toBytes('(Deeper (and (deeper)))'));

		expect(tokens).toEqual([
			{
				type: 'string',
				value: [
					68, 101, 101, 112, 101, 114, 32, 40, 97, 110, 100, 32, 40, 100, 101,
					101, 112, 101, 114, 41, 41,
				],
				offset: 0,
				length: 23,
			},
		]);
	});

	it('handles empty strings', () => {
		const lexer = new Lexer();
		const tokens = lexer.tokenize(toBytes('() Tj'));

		expect(tokens).toEqual([
			{
				type: 'string',
				value: [],
				offset: 0,
				length: 2,
			},
			{
				type: 'token',
				value: [84, 106],
				offset: 3,
				length: 2,
			},
		]);
	});

	it('parses hex strings and literal strings', () => {
		const lexer = new Lexer();
		const tokens = lexer.tokenize(toBytes('<1704>Y( XY )Z<21>'));

		expect(tokens).toEqual([
			{ type: 'string', value: [0x17, 0x04], offset: 0, length: 6 },
			{ type: 'token', value: [0x59], offset: 6, length: 1 },
			{ type: 'string', value: [0x20, 0x58, 0x59, 0x20], offset: 7, length: 6},
			{ type: 'token', value: [0x5A], offset: 13, length: 1 },
			{ type: 'string', value: [0x21], offset: 14, length: 4 },
		]);
	});

	it('ignores whitespace in hex strings', () => {
		const lexer = new Lexer();
		const tokens = lexer.tokenize(toBytes('<48 65 6c 6c 6f>'));

		expect(tokens.length).toBe(1);
		expect(tokens[0]!.value).toEqual([72, 101, 108, 108, 111]);
	});

	it('handles comments', () => {
		const lexer = new Lexer();
		const tokens = lexer.tokenize(toBytes('abc % this is a comment\ndef'));

		expect(tokens).toEqual([
			{ type: 'token', value: [97, 98, 99], offset: 0, length: 3 },
			{ type: 'token', value: [100, 101, 102], offset: 24, length: 3 },
		]);
	});

	it('handles inline comments at end of file', () => {
		const lexer = new Lexer();
		const tokens = lexer.tokenize(toBytes('abc % comment'));

		expect(tokens).toEqual([{ type: 'token', value: [97, 98, 99], offset: 0, length: 3 }]);
	});

	it('handles mixed content (realistic PDF snippet)', () => {
		const lexer = new Lexer();
		const input = `
      BT
      /F1 12 Tf
      (Hello) Tj
      <576f726c64> Tj
      ET
    `;

		const tokens = lexer.tokenize(toBytes(input));

		expect(tokens.length).toBeGreaterThan(0);

		// Ensure both string types are present.
		const stringTokens = tokens.filter((t) => t.type === 'string');
		expect(stringTokens.length).toBeGreaterThan(1);
	});

	it('handles strings with glyph positioning', () => {
		const lexer = new Lexer();
		const input = `BT
/F1 12 Tf
[<0102>2<0303>1<04>] TJ
ET
`;

		const tokens = lexer.tokenize(toBytes(input));

		expect(tokens.length).toBeGreaterThan(0);

		// Ensure both string types are present.
		const stringTokens = tokens.filter((t) => t.type === 'string');
		expect(stringTokens.length).toBe(3);
	});

	it('handles CMap bfchar entries', () => {
		const lexer = new Lexer();
		const input = `
	<0001> <003a>
	<0002> <003B>
`;

		const tokens = lexer.tokenize(toBytes(input));

		const strings = tokens.filter((t) => t.type === 'string');

		expect(strings).toEqual([
			{ type: 'string', value: [0x00, 0x01], offset: 2, length: 6 },
			{ type: 'string', value: [0x00, 0x3a], offset: 9, length: 6 },
			{ type: 'string', value: [0x00, 0x02], offset: 17, length: 6 },
			{ type: 'string', value: [0x00, 0x3b], offset: 24, length: 6 },
		]);
	});

	it('does not crash on malformed hex strings', () => {
		const lexer = new Lexer();
		const tokens = lexer.tokenize(toBytes('<123>'));

		expect(tokens.length).toBeGreaterThan(0);
	});

	describe('Location parsing', () => {
		it('should store the locations of simple strings', () => {
			const lexer = new Lexer();
			const input = `BT
/F1 12 Tf
(Hello) Tj
ET
`;

			const tokens = lexer.tokenize(toBytes(input));
			expect(tokens.length).toBeGreaterThan(0);

			const stringTokens = tokens.filter((t) => t.type === 'string');
			expect(stringTokens.length).toBe(1);
			const token = stringTokens[0]!;
			expect(token.offset).toBe(13);
			expect(token.length).toBe(7);
		});

		it('should store the locations of hex strings', () => {
			const lexer = new Lexer();
			const input = `BT
/F1 12 Tf
<0102030304> Tj
ET
`;

			const tokens = lexer.tokenize(toBytes(input));
			expect(tokens.length).toBeGreaterThan(0);

			const stringTokens = tokens.filter((t) => t.type === 'string');
			expect(stringTokens.length).toBe(1);
			const token = stringTokens[0]!;
			expect(token.offset).toBe(13);
			expect(token.length).toBe(12);
		});
	});
});
