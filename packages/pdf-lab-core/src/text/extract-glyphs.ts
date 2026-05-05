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
	stream: PDFRawStream;
};

export function extractGlyphs(pdfDoc: PDFDocument): GlyphBlock[] {
	const pages = pdfDoc.getPages();
	const blocks: GlyphBlock[] = [];

	for (let i = 0; i < pages.length; ++i) {
		const page = pages[i]!;

		const contents = page.node.get(PDFName.of('Contents'));
		if (!contents) continue;

		if (contents instanceof PDFRawStream) {
			// Case 1: single stream.
			parseStream(blocks, page.ref, i, contents);
		} else if (contents instanceof PDFArray) {
			// Case 2: array of streams
			for (let j = 0; j < contents.size(); ++j) {
				const item = contents.get(j);
				const resolved = pdfDoc.context.lookup(item);

				if (resolved instanceof PDFRawStream) {
					parseStream(blocks, page.ref, i, resolved);
				}
			}
		} else {
			// Case 3: indirect ref
			const resolved = pdfDoc.context.lookup(contents);
			if (resolved instanceof PDFRawStream) {
				parseStream(blocks, page.ref, i, resolved);
			}
		}
	}

	return blocks;
}

function parseStream(
	collector: GlyphBlock[],
	pageRef: PDFRef,
	pageNumber: number,
	stream: PDFRawStream,
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
							stream,
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
								stream,
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
	} as Token;

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
