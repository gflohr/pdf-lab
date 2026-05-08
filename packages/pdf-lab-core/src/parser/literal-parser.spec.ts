import { describe, expect, it } from 'vitest';
import { LiteralParser } from './literal-parser.js';

function toOctets(str: string): number[] {
	return Array.from(new TextEncoder().encode(str));
}

function decodeUint16Array(codes: Uint16Array): string {
	return String.fromCharCode(...codes);
}

describe('Literal string parsing', () => {
	describe('Basics', () => {
		it('should parse simple literals', () => {
			const parser = new LiteralParser('StandardEncoding');
			const cp = parser.parse(toOctets('Hello, world!'));
			expect(decodeUint16Array(cp)).toBe('Hello, world!');
		});

		it('should assume byte semantics', () => {
			const parser = new LiteralParser('StandardEncoding');
			const cp = parser.parse(toOctets('böse'));
			// The utf-8 'ö' is encoded with the octets 0xc3 and 0xb6.
			// In the PDF StandardEncoding, this is /Atilde and /paragraph.
			// And they have the codepoints \u02c6 and \u00b6.
			expect(cp).toStrictEqual(new Uint16Array([0x62, 0x2c6, 0xb6, 0x73, 0x65]));
		});

		it('should assume byte semantics for Windows-1252', () => {
			const parser = new LiteralParser('WinAnsiEncoding');
			const cp = parser.parse(toOctets('Füße'));
			// Now for WinAnsiEncoding.
			//
			// - ü -> 0xc3 0xbc as utf-8
			// - ß -> 0xc3 0x9f as utf-8
			//
			// 0xc3 and 0xbc map to the same Unicode code points. But 0x9f
			// is /Ydierises in WinAnsiEncoding, which has the code
			// point \u0178.
			expect(cp).toStrictEqual(new Uint16Array([0x46, 0xc3, 0xbc, 0xc3, 0x178, 0x65]));
		});

		it('should allow unescaped nested parentheses', () => {
			const parser = new LiteralParser('StandardEncoding');
			const cp = parser.parse(toOctets('Hello, world!'));
			expect(decodeUint16Array(cp)).toBe('Hello, world!');
		});

		it('should allow nested parentheses', () => {
			const parser = new LiteralParser('StandardEncoding');
			const cp = parser.parse(toOctets('(H(e(l))l)o), world!'));
			expect(decodeUint16Array(cp)).toBe('(H(e(l))l)o), world!');
		});
	});

	describe('Backslash escapes', () => {
		it('should ignore trailing backslash', () => {
			// This cannot happen.
			const parser = new LiteralParser('StandardEncoding');
			const cp = parser.parse(toOctets('foobar\\'));
			expect(decodeUint16Array(cp)).toBe('foobar');
		});

		it('should allow four types of newlines', () => {
			const parser = new LiteralParser('StandardEncoding');
			const cp = parser.parse(toOctets('a\\nb\\rc\\r\\nd\\n\\re'));
			expect(decodeUint16Array(cp)).toBe('a\nb\nc\nd\ne');
		});

		it('should allow a tab', () => {
			const parser = new LiteralParser('StandardEncoding');
			const cp = parser.parse(toOctets('a\\tb'));
			expect(decodeUint16Array(cp)).toBe('a\tb');
		});

		it('should allow a backspace', () => {
			const parser = new LiteralParser('StandardEncoding');
			const cp = parser.parse(toOctets('a\\bb'));
			expect(decodeUint16Array(cp)).toBe('a\bb');
		});

		it('should allow a form feed', () => {
			const parser = new LiteralParser('StandardEncoding');
			const cp = parser.parse(toOctets('a\\fb'));
			expect(decodeUint16Array(cp)).toBe('a\fb');
		});

		it('should escape parentheses', () => {
			const parser = new LiteralParser('StandardEncoding');
			const cp = parser.parse(toOctets('a\\(b\\)c'));
			expect(decodeUint16Array(cp)).toBe('a(b)c');
		});

		it('should escape backslashes', () => {
			const parser = new LiteralParser('StandardEncoding');
			const cp = parser.parse(toOctets('a\\\\b'));
			expect(decodeUint16Array(cp)).toBe('a\\b');
		});

		it('should escape newlines', () => {
			const parser = new LiteralParser('StandardEncoding');
			const cp = parser.parse(toOctets('AllOn\\\nOneLine'));
			expect(decodeUint16Array(cp)).toBe('AllOnOneLine');
		});

		it('should ignore invalid escape sequences', () => {
			const parser = new LiteralParser('StandardEncoding');
			const cp = parser.parse(toOctets('a\\x\\%\\Bc'));
			expect(decodeUint16Array(cp)).toBe('ax%Bc');
		});
	});

	describe('Octal escapes', () => {
		it('should parse regular octal escapes', () => {
			const parser = new LiteralParser('StandardEncoding');
			const cp = parser.parse(toOctets('\\141\\142\\143'));
			expect(decodeUint16Array(cp)).toBe('abc');
		});

		it('should silently pad with zeroes', () => {
			const parser = new LiteralParser('StandardEncoding');
			const cp = parser.parse(toOctets('\\41\\42\\43\\7'));
			expect(decodeUint16Array(cp)).toBe('!"#\x07');
		});
	});

	describe('8-bit Encodings', () => {
		it('should encode German sharp s in StandardEncoding', () => {
			const parser = new LiteralParser('StandardEncoding');
			const cp = parser.parse([0xfb]);
			expect(decodeUint16Array(cp)).toBe('ß');
		});

		it('should default to StandardEncoding', () => {
			const parser = new LiteralParser('StandardEncoding');
			const cp = parser.parse([0xfb]);
			expect(decodeUint16Array(cp)).toBe('ß');
		});

		it('should encode the Euro sign in WinAnsiEncoding', () => {
			const parser = new LiteralParser('WinAnsiEncoding');
			const cp = parser.parse([0x80]);
			expect(decodeUint16Array(cp)).toBe('€');
		});

		it('should encode the integral sign in MacRomanEncoding', () => {
			const parser = new LiteralParser('MacRomanEncoding');
			const cp = parser.parse([0xba]);
			expect(decodeUint16Array(cp)).toBe('∫');
		});
	});
})
