import { describe, expect, it } from 'vitest';
import { FontLoader } from './font-loader.js';

describe('font loader', () => {
	it('should be instantiated', () => {
		expect(new FontLoader('darwin')).toBeDefined();
	});
});
