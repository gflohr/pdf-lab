import { describe, expect, it } from 'vitest';
import { LiteralParser } from './literal-parser.js';

function toOctets(str: string): number[] {
	return Array.from(new TextEncoder().encode(str));
}

function decodeNumberArray(codes: number[]): string {
	return codes.map(n => String.fromCodePoint(n)).join('');
}

describe('Literal string parsing', () => {
	describe('Basics', () => {
		it('should parse simple literals', () => {
			const parser = new LiteralParser();
			const cp = parser.parse(toOctets('(Hello, world!)'));
			expect(decodeNumberArray(cp)).toBe('Hello, world!');
		});

		it('should assume byte semantics', () => {
			const parser = new LiteralParser();
			const cp = parser.parse(toOctets('(böse)'));
			expect(cp).toStrictEqual([0x62, 0xc3, 0xb6, 0x73, 0x65]);
		});

		it('should allow unescaped nested parentheses', () => {
			const parser = new LiteralParser();
			const cp = parser.parse(toOctets('(Hello, world!)'));
			expect(decodeNumberArray(cp)).toBe('Hello, world!');
		});
	});
})
