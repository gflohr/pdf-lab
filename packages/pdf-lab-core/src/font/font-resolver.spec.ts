import { describe, expect, it } from 'vitest';
import { FontResolver } from './font-resolver.js';

describe('font loader', () => {
	it('should be instantiated', () => {
		expect(new FontResolver('darwin', {})).toBeDefined();
	});
});
