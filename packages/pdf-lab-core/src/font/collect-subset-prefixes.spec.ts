import {
	PDFArray,
	type PDFDict,
	PDFDocument,
	PDFName,
} from '@cantoo/pdf-lib';
import { describe, expect, it } from 'vitest';

import collectSubsetPrefixes from './collect-subset-prefixes.js';
import { FontUsage } from './collect-resources.js';

describe('collectSubsetPrefixes', () => {
	it('should collect subset prefixes from simple fonts', async () => {
		const pdfDoc = await PDFDocument.create();
		const context = pdfDoc.context;

		const fontDict = context.obj({
			Type: PDFName.of('Font'),
			Subtype: PDFName.of('Type1'),
			BaseFont: PDFName.of('ABCDEF+Helvetica'),
		}) as PDFDict;

		const fontRef = context.register(fontDict);

		const resources = [
			{
				F1: fontRef,
			},
		];

		const prefixes = collectSubsetPrefixes(
			pdfDoc,
			resources,
		);

		expect(prefixes).toStrictEqual(
			new Set(['ABCDEF']),
		);
	});

	it('should collect subset prefixes from descendant fonts', async () => {
		const pdfDoc = await PDFDocument.create();
		const context = pdfDoc.context;

		const descendantFontDict = context.obj({
			Type: PDFName.of('Font'),
			Subtype: PDFName.of('CIDFontType2'),
			BaseFont: PDFName.of('GHIJKL+NotoSans'),
		}) as PDFDict;

		const descendantFontRef =
			context.register(descendantFontDict);

		const descendantFonts = PDFArray.withContext(context);
		descendantFonts.push(descendantFontRef);

		const type0FontDict = context.obj({
			Type: PDFName.of('Font'),
			Subtype: PDFName.of('Type0'),
			BaseFont: PDFName.of('MNOPQR+Composite'),
			DescendantFonts: descendantFonts,
		}) as PDFDict;

		const type0FontRef =
			context.register(type0FontDict);

		const resources = [
			{
				F1: type0FontRef,
			},
		];

		const prefixes = collectSubsetPrefixes(
			pdfDoc,
			resources,
		);

		expect(prefixes).toStrictEqual(
			new Set(['MNOPQR', 'GHIJKL']),
		);
	});

	it('should ignore fonts without subset prefixes', async () => {
		const pdfDoc = await PDFDocument.create();
		const context = pdfDoc.context;

		const fontDict = context.obj({
			Type: PDFName.of('Font'),
			Subtype: PDFName.of('Type1'),
			BaseFont: PDFName.of('Helvetica'),
		}) as PDFDict;

		const fontRef = context.register(fontDict);

		const resources = [
			{
				F1: fontRef,
			},
		];

		const prefixes = collectSubsetPrefixes(
			pdfDoc,
			resources,
		);

		expect(prefixes.size).toBe(0);
	});

	it('should deduplicate subset prefixes', async () => {
		const pdfDoc = await PDFDocument.create();
		const context = pdfDoc.context;

		const fontDict = context.obj({
			Type: PDFName.of('Font'),
			Subtype: PDFName.of('Type1'),
			BaseFont: PDFName.of('ABCDEF+Helvetica'),
		}) as PDFDict;

		const fontRef = context.register(fontDict);

		const resources = [
			{
				F1: fontRef,
			},
			{
				F2: fontRef,
			},
		] as FontUsage[];

		const prefixes = collectSubsetPrefixes(
			pdfDoc,
			resources,
		);

		expect(prefixes).toStrictEqual(
			new Set(['ABCDEF']),
		);
	});
});
