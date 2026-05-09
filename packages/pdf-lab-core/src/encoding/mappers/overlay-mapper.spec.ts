import { describe, expect, it, vi } from 'vitest';

import { OverlayMapper } from './overlay-mapper.js';
import type { GlyphMapper } from './glyph-mapper.js';

describe('OverlayMapper', () => {
	it('should use the fallback mapper name when no overlay is present', () => {
		const fallback: GlyphMapper = {
			name: 'WinAnsiEncoding',
			lookup: vi.fn(),
			lookupCodePoints: vi.fn(),
		};

		const mapper = new OverlayMapper(fallback);

		expect(mapper.name).toBe('WinAnsiEncoding');
	});

	it('should use the overlay mapper name when present', () => {
		const fallback: GlyphMapper = {
			name: 'StandardEncoding',
			lookup: vi.fn(),
			lookupCodePoints: vi.fn(),
		};

		const overlay: GlyphMapper = {
			name: 'Identity-H',
			lookup: vi.fn(),
			lookupCodePoints: vi.fn(),
		};

		const mapper = new OverlayMapper(fallback, overlay);

		expect(mapper.name).toBe('Identity-H');
	});

	it('should use the overlay lookup result when it is not the replacement character', () => {
		const fallback: GlyphMapper = {
			name: 'StandardEncoding',
			lookup: vi.fn().mockReturnValue('fallback'),
			lookupCodePoints: vi.fn(),
		};

		const overlay: GlyphMapper = {
			name: 'Identity-H',
			lookup: vi.fn().mockReturnValue('overlay'),
			lookupCodePoints: vi.fn(),
		};

		const mapper = new OverlayMapper(fallback, overlay);

		expect(mapper.lookup(42)).toBe('overlay');
		expect(overlay.lookup).toHaveBeenCalledWith(42);
		expect(fallback.lookup).not.toHaveBeenCalled();
	});

	it('should fall back when the overlay lookup returns the replacement character', () => {
		const fallback: GlyphMapper = {
			name: 'StandardEncoding',
			lookup: vi.fn().mockReturnValue('fallback'),
			lookupCodePoints: vi.fn(),
		};

		const overlay: GlyphMapper = {
			name: 'Identity-H',
			lookup: vi.fn().mockReturnValue('\uFFFD'),
			lookupCodePoints: vi.fn(),
		};

		const mapper = new OverlayMapper(fallback, overlay);

		expect(mapper.lookup(42)).toBe('fallback');
		expect(overlay.lookup).toHaveBeenCalledWith(42);
		expect(fallback.lookup).toHaveBeenCalledWith(42);
	});

	it('should use the fallback lookup when no overlay is present', () => {
		const fallback: GlyphMapper = {
			name: 'MacRomanEncoding',
			lookup: vi.fn().mockReturnValue('fallback'),
			lookupCodePoints: vi.fn(),
		};

		const mapper = new OverlayMapper(fallback);

		expect(mapper.lookup(123)).toBe('fallback');
		expect(fallback.lookup).toHaveBeenCalledWith(123);
	});

	it('should use overlay code points when available', () => {
		const fallback: GlyphMapper = {
			name: 'StandardEncoding',
			lookup: vi.fn(),
			lookupCodePoints: vi.fn().mockReturnValue([1, 2, 3]),
		};

		const overlay: GlyphMapper = {
			name: 'Identity-V',
			lookup: vi.fn(),
			lookupCodePoints: vi.fn().mockReturnValue([4, 5, 6]),
		};

		const mapper = new OverlayMapper(fallback, overlay);

		expect(mapper.lookupCodePoints(42)).toStrictEqual([4, 5, 6]);
		expect(overlay.lookupCodePoints).toHaveBeenCalledWith(42);
		expect(fallback.lookupCodePoints).not.toHaveBeenCalled();
	});

	it('should fall back when overlay code points are empty', () => {
		const fallback: GlyphMapper = {
			name: 'StandardEncoding',
			lookup: vi.fn(),
			lookupCodePoints: vi.fn().mockReturnValue([1, 2, 3]),
		};

		const overlay: GlyphMapper = {
			name: 'Identity-V',
			lookup: vi.fn(),
			lookupCodePoints: vi.fn().mockReturnValue([]),
		};

		const mapper = new OverlayMapper(fallback, overlay);

		expect(mapper.lookupCodePoints(42)).toStrictEqual([1, 2, 3]);
		expect(overlay.lookupCodePoints).toHaveBeenCalledWith(42);
		expect(fallback.lookupCodePoints).toHaveBeenCalledWith(42);
	});

	it('should use fallback code points when no overlay is present', () => {
		const fallback: GlyphMapper = {
			name: 'MacRomanEncoding',
			lookup: vi.fn(),
			lookupCodePoints: vi.fn().mockReturnValue([7, 8, 9]),
		};

		const mapper = new OverlayMapper(fallback);

		expect(mapper.lookupCodePoints(123)).toStrictEqual([7, 8, 9]);
		expect(fallback.lookupCodePoints).toHaveBeenCalledWith(123);
	});
});
