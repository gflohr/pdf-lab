import { describe, expect, it } from 'vitest';
import { fontName } from './font-name.js';

describe('get font name', () => {
	it('should strip off the subset id', () => {
		expect(fontName('ABCDEF+Helvetica')).toBe('Helvetica');
	});

	it('should only recognise uppercase subset ids', () => {
		expect(fontName('abcdef+Helvetica')).toBe('abcdef+Helvetica');
	});

	it('should strip off producer suffixes', () => {
		expect(fontName('Helvetica-1234')).toBe('Helvetica');
	});

	it('should preserve clean names', () => {
		expect(fontName('Helvetica-Oblique')).toBe('Helvetica-Oblique');
	});
});
