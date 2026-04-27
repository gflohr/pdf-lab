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
			{ type: 'token', value: [97, 98, 99] },
			{ type: 'token', value: [100, 101, 102] },
		]);
	});

	it('handles whitespace separation', () => {
		const lexer = new Lexer();
		const tokens = lexer.tokenize(toBytes('abc   def\tghi\njkl'));

		expect(tokens).toEqual([
			{ type: 'token', value: [97, 98, 99] },
			{ type: 'token', value: [100, 101, 102] },
			{ type: 'token', value: [103, 104, 105] },
			{ type: 'token', value: [106, 107, 108] },
		]);
	});

	it('parses literal strings', () => {
		const lexer = new Lexer();
		const tokens = lexer.tokenize(toBytes('1 2(Hello) "'));

		expect(tokens).toEqual([
			{ type: 'token', value: [49] },
			{ type: 'token', value: [50] },
			{ type: 'string', value: [72, 101, 108, 108, 111] },
			{ type: 'token', value: [34] },
		]);
	});

	it('handles escaped characters in strings', () => {
		const lexer = new Lexer();
		const tokens = lexer.tokenize(toBytes('(Hel\\)lo)'));

		expect(tokens.length).toBe(1);
		expect(tokens[0].type).toBe('string');
		expect(tokens[0].value.length).toBeGreaterThan(0);
	});

	it('handles nested parentheses', () => {
		const lexer = new Lexer();
		const tokens = lexer.tokenize(toBytes('(Hello (world))'));

		expect(tokens).toEqual([
			{
				type: 'string',
				value: [72, 101, 108, 108, 111, 32, 40, 119, 111, 114, 108, 100, 41],
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
			},
			{
				type: 'token',
				value: [84, 106],
			},
		]);
	});

	it('parses hex strings', () => {
		const lexer = new Lexer();
		const tokens = lexer.tokenize(toBytes('<1704>Y<1359>'));

		expect(tokens).toEqual([
			{ type: 'string', value: [0x17, 0x04] },
			{ type: 'token', value: [89] },
			{ type: 'string', value: [0x13, 0x59] },
		]);
	});

	it('ignores whitespace in hex strings', () => {
		const lexer = new Lexer();
		const tokens = lexer.tokenize(toBytes('<48 65 6c 6c 6f>'));

		expect(tokens.length).toBe(1);
		expect(tokens[0].value).toEqual([72, 101, 108, 108, 111]);
	});

	it('handles comments', () => {
		const lexer = new Lexer();
		const tokens = lexer.tokenize(toBytes('abc % this is a comment\ndef'));

		expect(tokens).toEqual([
			{ type: 'token', value: [97, 98, 99] },
			{ type: 'token', value: [100, 101, 102] },
		]);
	});

	it('handles inline comments at end of file', () => {
		const lexer = new Lexer();
		const tokens = lexer.tokenize(toBytes('abc % comment'));

		expect(tokens).toEqual([{ type: 'token', value: [97, 98, 99] }]);
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

	it('handles CMap bfchar entries', () => {
		const lexer = new Lexer();
		const input = `
      <0001> <003a>
      <0002> <003B>
    `;

		const tokens = lexer.tokenize(toBytes(input));

		const strings = tokens.filter((t) => t.type === 'string');

		expect(strings).toEqual([
			{ type: 'string', value: [0x00, 0x01] },
			{ type: 'string', value: [0x00, 0x3a] },
			{ type: 'string', value: [0x00, 0x02] },
			{ type: 'string', value: [0x00, 0x3b] },
		]);
	});

	it('does not crash on malformed hex strings', () => {
		const lexer = new Lexer();
		const tokens = lexer.tokenize(toBytes('<123>'));

		expect(tokens.length).toBeGreaterThan(0);
	});
});
