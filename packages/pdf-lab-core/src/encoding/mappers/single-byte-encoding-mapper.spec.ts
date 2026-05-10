import { PDFArray, PDFContext, PDFName, PDFNumber } from '@cantoo/pdf-lib';
import { describe, expect, it } from 'vitest';
import type { Encoding } from '../types.js';
import { SingleByteEncodingMapper } from './single-byte-encoding-mapper.js';

describe('8-bit mappers', () => {
	describe('basic', () => {
		it('should support the MacExpert encoding', () => {
			const mapper = new SingleByteEncodingMapper('MacExpertEncoding');

			expect(mapper).toBeDefined();
			expect(mapper).toBeInstanceOf(SingleByteEncodingMapper);
			expect(mapper.name).toBe('MacExpertEncoding');
			expect(mapper.highest).toBe(255);
		});

		it('should support the MacRoman encoding', () => {
			const mapper = new SingleByteEncodingMapper('MacRomanEncoding');

			expect(mapper).toBeDefined();
			expect(mapper).toBeInstanceOf(SingleByteEncodingMapper);
		});

		it('should support the PDFDoc encoding', () => {
			const mapper = new SingleByteEncodingMapper('PDFDocEncoding');

			expect(mapper).toBeDefined();
			expect(mapper).toBeInstanceOf(SingleByteEncodingMapper);
		});

		it('should support the Standard encoding', () => {
			const mapper = new SingleByteEncodingMapper('StandardEncoding');

			expect(mapper).toBeDefined();
			expect(mapper).toBeInstanceOf(SingleByteEncodingMapper);
		});

		it('should support the Symbol encoding', () => {
			const mapper = new SingleByteEncodingMapper('SymbolEncoding');

			expect(mapper).toBeDefined();
			expect(mapper).toBeInstanceOf(SingleByteEncodingMapper);
		});

		it('should support the WinAnsi encoding', () => {
			const mapper = new SingleByteEncodingMapper('WinAnsiEncoding');

			expect(mapper).toBeDefined();
			expect(mapper).toBeInstanceOf(SingleByteEncodingMapper);
		});

		it('should fall back to StandardEncoding for unknown encodings', () => {
			const mapper = new SingleByteEncodingMapper('AtariST' as Encoding);

			expect(mapper).toBeDefined();
			expect(mapper).toBeInstanceOf(SingleByteEncodingMapper);
			expect(mapper.name).toBe('StandardEncoding');
		});
	});

	describe('MacExpert encoding', () => {
		const mapper = new SingleByteEncodingMapper('MacExpertEncoding');

		it('should map a comma', () => {
			expect(mapper.lookup(0x2c)).toBe(',');
		});

		it('should not find character 0x41', () => {
			expect(mapper.lookup(0x41)).toBe('\uFFFD');
		});
	});

	describe('MacRoman encoding', () => {
		const mapper = new SingleByteEncodingMapper('MacRomanEncoding');

		it('should map a German double s', () => {
			expect(mapper.lookup(0xa7)).toBe('ß');
		});

		it('should not find character 0x1a', () => {
			expect(mapper.lookup(0x1a)).toBe('\uFFFD');
		});
	});

	describe('PDF encoding', () => {
		const mapper = new SingleByteEncodingMapper('PDFDocEncoding');

		it('should map a trademark sign', () => {
			expect(mapper.lookup(0x92)).toBe('™');
		});

		it('should not find a newline character', () => {
			expect(mapper.lookup(0x0a)).toBe('\uFFFD');
		});
	});

	describe('Standard encoding', () => {
		const mapper = new SingleByteEncodingMapper('StandardEncoding');

		it('should map a perthousand sign', () => {
			expect(mapper.lookup(0xbd)).toBe('‰');
		});

		it('should not find a newline character', () => {
			expect(mapper.lookup(0x0a)).toBe('\uFFFD');
		});
	});

	describe('Symbol encoding', () => {
		const mapper = new SingleByteEncodingMapper('SymbolEncoding');

		it('should map a Greek capital Omega', () => {
			expect(mapper.lookup(0x57)).toBe('Ω');
		});

		it('should not find the character 0x8e', () => {
			expect(mapper.lookup(0x8e)).toBe('\uFFFD');
		});
	});

	describe('WinAnsi encoding', () => {
		const mapper = new SingleByteEncodingMapper('WinAnsiEncoding');

		it('should map a Euro sign', () => {
			expect(mapper.lookup(0x80)).toBe('€');
		});

		it('should not find the character 0x8e', () => {
			expect(mapper.lookup(0x81)).toBe('\uFFFD');
		});
	});

	describe('ZapfDingbats encoding', () => {
		const mapper = new SingleByteEncodingMapper('ZapfDingbatsEncoding');

		it('should map a scissors sign', () => {
			expect(mapper.lookup(0x24)).toBe('✄');
		});

		it('should not find the character 0x19', () => {
			expect(mapper.lookup(0x19)).toBe('\uFFFD');
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

		const mapper = new SingleByteEncodingMapper(
			'MacRomanEncoding',
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
			expect(mapper.lookup(0xa7)).toBe('ß');
		});
	});
});
