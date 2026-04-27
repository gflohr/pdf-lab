import { describe, expect, it } from 'vitest';
import { SingleByteEncodingMapper } from './single-byte-encoding-mapper.js';

describe('8-bit mappers', () => {
	describe('basic', () => {
		it('should support the MacExpert encoding', () => {
			const mapper = new SingleByteEncodingMapper('MacExpertEncoding');

			expect(mapper).toBeDefined();
			expect(mapper).toBeInstanceOf(SingleByteEncodingMapper);
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

		it('should throw an exception for unknown encodings', () => {
			expect(() => new SingleByteEncodingMapper('AtariST')).toThrow();
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
});
