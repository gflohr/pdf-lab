import { describe, expect, it } from 'vitest';
import { coerceCodePoints } from './coerce-code-points.js';

describe('Coerce code points', () => {
	it('should handle undefined arguments', () => {
		expect(coerceCodePoints(undefined)).toBe(0xfffd);
	});

	it('should handle empty arguments', () => {
		expect(coerceCodePoints([])).toBe(0xfffd);
	});

	it('should detect the DZ ligature', () => {
		const encoded = Array.from(new TextEncoder().encode('DZ'));
		expect(coerceCodePoints(encoded)).toBe(0x01f1);
	});

	it('should detect the Dz ligature', () => {
		const encoded = Array.from(new TextEncoder().encode('Dz'));
		expect(coerceCodePoints(encoded)).toBe(0x01f2);
	});

	it('should detect the dz ligature', () => {
		const encoded = Array.from(new TextEncoder().encode('dz'));
		expect(coerceCodePoints(encoded)).toBe(0x01f3);
	});

	it('should detect the ff ligature', () => {
		const encoded = Array.from(new TextEncoder().encode('ff'));
		expect(coerceCodePoints(encoded)).toBe(0xfb00);
	});

	it('should detect the fi ligature', () => {
		const encoded = Array.from(new TextEncoder().encode('fi'));
		expect(coerceCodePoints(encoded)).toBe(0xfb01);
	});

	it('should detect the fl ligature', () => {
		const encoded = Array.from(new TextEncoder().encode('fl'));
		expect(coerceCodePoints(encoded)).toBe(0xfb02);
	});

	it('should detect the ffi ligature', () => {
		const encoded = Array.from(new TextEncoder().encode('ffi'));
		expect(coerceCodePoints(encoded)).toBe(0xfb03);
	});

	it('should detect the ffl ligature', () => {
		const encoded = Array.from(new TextEncoder().encode('ffl'));
		expect(coerceCodePoints(encoded)).toBe(0xfb04);
	});

	it('should detect the st ligature', () => {
		const encoded = Array.from(new TextEncoder().encode('st'));
		expect(coerceCodePoints(encoded)).toBe(0xfb06);
	});

	it('should handle unknown ligatures', () => {
		expect(coerceCodePoints([99, 107])).toBe(99);
	});
});
