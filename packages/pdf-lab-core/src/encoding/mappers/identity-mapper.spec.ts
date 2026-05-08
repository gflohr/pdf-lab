import { describe, expect, it } from 'vitest';
import { IdentityMapper } from './identity-mapper.js';
import { PDFArray, PDFContext, PDFName, PDFNumber } from '@cantoo/pdf-lib';

describe('Identity mapper', () => {
	describe('basics', () => {
		it('should map characters to themselves', () => {
			const mapper = new IdentityMapper('Identity-H');

			expect(mapper).toBeDefined();
			expect(mapper).toBeInstanceOf(IdentityMapper);
			expect(mapper.lookupCodepoints(0x123)).toStrictEqual([0x123]);
		});
	});

	describe('Differences', () => {
		const context = PDFContext.create();
		const differences = PDFArray.withContext(context);
		differences.push(PDFNumber.of('a'.codePointAt(0)!));
		for (let c = 'A'.codePointAt(0); c! <= 'Z'.codePointAt(0)!; ++c!) {
			differences.push(PDFName.of(String.fromCharCode(c!)));
		}
		differences.push(PDFNumber.of(0xdb));
		differences.push(PDFName.of('Euro'));

		const mapper = new IdentityMapper(
			'Identity-H',
			differences,
		);

		it('should honour the differences', () => {
			expect(mapper.lookup('a'.codePointAt(0)!)).toBe('A');
			expect(mapper.lookup('z'.codePointAt(0)!)).toBe('Z');
			expect(mapper.lookup(0xdb)).toBe('€');
		});

		it('should not modify the targets of the mappings', () => {
			expect(mapper.lookup('A'.codePointAt(0)!)).toBe('A');
			expect(mapper.lookup('Z'.codePointAt(0)!)).toBe('Z');
		});

		it('should not modify mappings that are not involved', () => {
			expect(mapper.lookup('5'.codePointAt(0)!)).toBe('5');
			expect(mapper.lookup(0xa7)).toBe(String.fromCodePoint(0xa7));
		});
	});
});
