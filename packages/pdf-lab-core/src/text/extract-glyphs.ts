import {
	decodePDFRawStream,
	PDFArray,
	type PDFDocument,
	PDFName,
	PDFRawStream,
	type PDFRef,
} from '@cantoo/pdf-lib';
import { Lexer } from '../parser/lexer.js';
import type { Token } from '../parser/types.js';

export type GlyphBlock = {
	glyphs: Uint8Array;
	type: 'string' | 'lstring';
	fontResource: string;
	pageRef: PDFRef;
	pageNumber: number;
	stream: PDFRawStream;
	streamId: number;
	offset: number;
	length: number;
};

export function extractGlyphs(pdfDoc: PDFDocument): GlyphBlock[] {
	const pages = pdfDoc.getPages();
	const blocks: GlyphBlock[] = [];

	let streamId = 0;
	for (let i = 0; i < pages.length; ++i) {
		const page = pages[i]!;

		const contents = page.node.get(PDFName.of('Contents'));
		if (!contents) continue;

		if (contents instanceof PDFRawStream) {
			// Case 1: single stream.
			parseStream(blocks, page.ref, i, contents, streamId++);
		} else if (contents instanceof PDFArray) {
			// Case 2: array of streams
			for (let j = 0; j < contents.size(); ++j) {
				const item = contents.get(j);
				const resolved = pdfDoc.context.lookup(item);

				if (resolved instanceof PDFRawStream) {
					parseStream(blocks, page.ref, i, resolved, streamId++);
				}
			}
		} else {
			// Case 3: indirect ref
			const resolved = pdfDoc.context.lookup(contents);
			if (resolved instanceof PDFRawStream) {
				parseStream(blocks, page.ref, i, resolved, streamId++);
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
	streamId: number,
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
			const value = decodeUint8Array(token.value);
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
						fontResource = decodeUint8Array(tokens[i - 2]!.value).replace(
							/^\//,
							'',
						);
					}
					break;
				case 'Tj':
				case '"':
				case "'":
					if (inText && isString(tokens[i - 1]!) && fontResource.length) {
						const token = tokens[i - 1]!;
						collector.push({
							glyphs: token.value,
							type: token.type as 'string' | 'lstring',
							fontResource,
							pageRef,
							pageNumber,
							stream,
							offset: token.offset,
							length: token.length,
							streamId,
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
						extractTJStringArray(tokens, i - 1).forEach((t) => {
							if (t.value.length) {
								collector.push({
									glyphs: t.value,
									type: t.type as 'string' | 'lstring',
									fontResource,
									pageRef,
									pageNumber,
									stream,
									offset: t.offset,
									length: t.length,
									streamId,
								});
							}
						});
					}
					break;
				default:
					break;
			}
		}
	}
}

function extractTJStringArray(tokens: Token[], end: number): Token[] {
	const tjTokens: Token[] = [];
	for (let i = end - 1; i >= 0; --i) {
		const token = tokens[i]!;
		if (isString(token)) {
			tjTokens.push(token);
		} else if (
			token.type === 'token' &&
			token.value.length === 1 &&
			token.value[0] === 91
		) {
			break;
		}
	}

	return tjTokens.reverse();
}

function decodeUint8Array(value: Uint8Array): string {
	return new TextDecoder().decode(value);
}

function isString(token: Token): boolean {
	return token.type === 'string' || token.type === 'lstring';
}
