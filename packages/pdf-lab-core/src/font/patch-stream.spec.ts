import {
	PDFContext,
	PDFDict,
	PDFName,
	PDFRawStream,
} from '@cantoo/pdf-lib';
import { describe, expect, it } from 'vitest';

import { patchStream } from './patch-stream.js';
import type { PatchSet } from './types.js';

describe('patchStream', () => {
	it('should patch an uncompressed stream', () => {
		const context = PDFContext.create();

		const original = new Uint8Array([
			0x41, // A
			0x42, // B
			0x43, // C
			0x44, // D
			0x45, // E
		]);

		const stream = PDFRawStream.of(
			PDFDict.withContext(context),
			original,
		);

		const patchSets: PatchSet[] = [
			{
				stream,
				offset: 1,
				length: 2,
				glyphs: new Uint8Array(),
				hexstring: [0x78, 0x79], // xy
			},
		];

		patchStream(
			stream,
			context,
			patchSets,
			false,
		);

		expect(Array.from(stream.getContents())).toStrictEqual([
			0x41, // A
			0x78, // x
			0x79, // y
			0x44, // D
		]);

		expect(stream.dict.has(PDFName.of('Filter'))).toBe(false);
	});

	it('should patch multiple ranges in reverse order', () => {
		const context = PDFContext.create();

		const original = new Uint8Array([
			0x30, // 0
			0x31, // 1
			0x32, // 2
			0x33, // 3
			0x34, // 4
			0x35, // 5
		]);

		const stream = PDFRawStream.of(
			PDFDict.withContext(context),
			original,
		);

		const patchSets: PatchSet[] = [
			{
				streamId: 1,
				offset: 1,
				length: 2,
				hexstring: [0x61], // a
			},
			{
				streamId: 1,
				offset: 4,
				length: 1,
				hexstring: [0x62, 0x63], // bc
			},
		];

		patchStream(
			stream,
			context,
			patchSets,
			false,
		);

		expect(Array.from(stream.getContents())).toStrictEqual([
			0x30, // 0
			0x61, // a
			0x33, // 3
			0x62, // b
			0x63, // c
		]);
	});

	it('should compress the patched stream', () => {
		const context = PDFContext.create();

		const original = new Uint8Array([
			0x41,
			0x42,
			0x43,
		]);

		const stream = PDFRawStream.of(
			PDFDict.withContext(context),
			original,
		);

		const patchSets: PatchSet[] = [
			{
				streamId: 2,
				offset: 1,
				length: 1,
				hexstring: [0x5a], // Z
			},
		];

		patchStream(
			stream,
			context,
			patchSets,
			true,
		);

		expect(stream.dict.get(PDFName.of('Filter')))
			.toBe(PDFName.of('FlateDecode'));

		expect(stream.dict.get(PDFName.of('Length')))
			.toBeDefined();

		expect(stream.getContents().length)
			.toBeGreaterThan(0);
	});
});
