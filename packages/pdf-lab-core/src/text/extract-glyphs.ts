import {
	decodePDFRawStream,
	PDFArray,
	PDFDict,
	type PDFDocument,
	PDFName,
	type PDFObject,
	type PDFPage,
	PDFRawStream,
	type PDFRef,
} from '@cantoo/pdf-lib';
import { Lexer, type Token } from '../parser/lexer.js';

export type GlyphBlock = {
	glyphs: number[];
	fontResource: string;
	pageRef: PDFRef;
	pageNumber: number;
};

export function extractGlyphs(
	pdfDoc: PDFDocument,
	encode = false,
): GlyphBlock[] {
	const blocks: GlyphBlock[] = [];
	const pages = pdfDoc.getPages();
	for (let i = 0; i < pages.length; ++i) {
		parsePage(blocks, pages[i]!, i, pdfDoc, encode);
	}

	return blocks;
}

function parseRecursively(
	collector: GlyphBlock[],
	obj: PDFObject,
	pageRef: PDFRef,
	pageNumber: number,
	pdfDoc: PDFDocument,
	encode: boolean,
) {
	if (obj instanceof PDFRawStream) {
		parseStream(collector, pageRef, pageNumber, obj, encode);
		parseDictionary(collector, obj.dict, pageRef, pageNumber, pdfDoc, encode);
	} else if (obj instanceof PDFDict) {
		parseDictionary(collector, obj, pageRef, pageNumber, pdfDoc, encode);
	} else if (obj instanceof PDFArray) {
		for (let i = 0; i < obj.size(); ++i) {
			const item = obj.get(i);
			const resolved = pdfDoc.context.lookup(item);
			if (resolved) {
				parseRecursively(
					collector,
					resolved,
					pageRef,
					pageNumber,
					pdfDoc,
					encode,
				);
			}
		}
	}
}

function parseDictionary(
	collector: GlyphBlock[],
	dict: PDFDict,
	pageRef: PDFRef,
	pageNumber: number,
	pdfDoc: PDFDocument,
	encode: boolean,
) {
	const resources = dict.get(PDFName.of('Resources'));
	if (!resources) return;

	const res = pdfDoc.context.lookup(resources);
	if (!(res instanceof PDFDict)) return;

	const xObject = res?.get(PDFName.of('XObject'));
	if (!xObject) return;

	const xo = pdfDoc.context.lookupMaybe(xObject, PDFDict);
	if (!xo) return;

	xo.keys().forEach((key) => {
		const ref = xo.get(key);
		const resolved = pdfDoc.context.lookup(ref);
		if (resolved instanceof PDFRawStream) {
			parseStream(collector, pageRef, pageNumber, resolved, encode);
		}
	});
}

function parsePage(
	collector: GlyphBlock[],
	page: PDFPage,
	pageNumber: number,
	pdfDoc: PDFDocument,
	encode: boolean,
) {
	const node = page.node;

	const contents = node.get(PDFName.of('Contents'));
	if (!contents) return;

	parseRecursively(collector, contents, page.ref, pageNumber, pdfDoc, encode);
}

function parseStream(
	collector: GlyphBlock[],
	pageRef: PDFRef,
	pageNumber: number,
	stream: PDFRawStream,
	encode: boolean,
) {
	const decoded = decodePDFRawStream(stream);
	const bytes = decoded.getBytes(0);

	const lexer = new Lexer();
	const tokens = lexer.tokenize(bytes);

	let inText = false;
	let fontResource = '';
	for (let i = 1; i < tokens.length; ++i) {
		const token = tokens[i]!;
		if (token.type === 'token') {
			const value = decodeNumberArray(token.value);
			switch (value) {
				case 'BT':
					inText = true;
					break;
				case 'ET':
					inText = false;
					fontResource = '';
					break;
				case 'Tf':
					if (inText && i > 1 && tokens[i - 2]!.type === 'token') {
						fontResource = decodeNumberArray(tokens[i - 2]!.value).replace(
							/^\//,
							'',
						);
					}
					break;
				case 'Tj':
				case '"':
				case "'":
					if (
						inText &&
						tokens[i - 1]!.type === 'string' &&
						fontResource.length
					) {
						collector.push({
							glyphs: tokens[i - 1]!.value,
							fontResource,
							pageRef,
							pageNumber,
						});
					}
					break;
				case 'TJ':
					if (
						inText &&
						tokens[i - 1]!.type === 'token' &&
						i > 3 &&
						tokens[i - 1]!.value.length === 1 &&
						tokens[i - 1]!.value[0] === 93 &&
						fontResource.length
					) {
						const textToken = extractTJStringArray(tokens, i - 1);
						if (textToken.value.length) {
							collector.push({
								glyphs: textToken.value,
								fontResource,
								pageRef,
								pageNumber,
							});
						}
					}
					break;
				default:
					break;
			}
		}
	}
}

function extractTJStringArray(tokens: Token[], end: number): Token {
	const stringToken: Token = {
		type: 'string',
		value: [] as number[],
	};

	for (let i = end - 1; i >= 0; --i) {
		const token = tokens[i]!;
		if (token.type === 'string') {
			stringToken.value.unshift(...token.value);
		} else if (
			token.type === 'token' &&
			token.value.length === 1 &&
			token.value[0] === 91
		) {
			break;
		}
	}

	return stringToken;
}

function decodeNumberArray(value: number[]): string {
	return value.map((c) => String.fromCharCode(c)).join('');
}
