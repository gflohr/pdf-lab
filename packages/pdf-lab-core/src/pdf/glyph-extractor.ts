import {
	decodePDFRawStream,
	PDFArray,
	PDFDict,
	type PDFDocument,
	PDFName,
	type PDFObject,
	type PDFPage,
	PDFRawStream,
} from '@cantoo/pdf-lib';
import { Lexer, type Token } from '../parser/lexer.js';

type GlyphBlock = {
	glyphs: number[];
	fontResource: string;
	pageNumber: number;
};

export class GlyphExtractor {
	parseDocument(pdfDoc: PDFDocument): GlyphBlock[] {
		const blocks: GlyphBlock[] = [];
		const pages = pdfDoc.getPages();
		for (let i = 0; i < pages.length; ++i) {
			this.parsePage(blocks, pages[i]!, i, pdfDoc);
		}

		return blocks;
	}

	private parseRecursively(
		collector: GlyphBlock[],
		obj: PDFObject,
		pageNumber: number,
		pdfDoc: PDFDocument,
	) {
		if (obj instanceof PDFRawStream) {
			this.parseStream(collector, pageNumber, obj);
			this.parseDictionary(collector, obj.dict, pageNumber, pdfDoc);
		} else if (obj instanceof PDFDict) {
			this.parseDictionary(collector, obj, pageNumber, pdfDoc);
		} else if (obj instanceof PDFArray) {
			for (let i = 0; i < obj.size(); ++i) {
				const item = obj.get(i);
				const resolved = pdfDoc.context.lookup(item);
				if (resolved) {
					this.parseRecursively(collector, resolved, pageNumber, pdfDoc);
				}
			}
		}
	}

	private parseDictionary(
		collector: GlyphBlock[],
		dict: PDFDict,
		pageNumber: number,
		pdfDoc: PDFDocument,
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
				this.parseStream(collector, pageNumber, resolved);
			}
		});
	}

	private parsePage(
		collector: GlyphBlock[],
		page: PDFPage,
		pageNumber: number,
		pdfDoc: PDFDocument,
	) {
		const node = page.node;

		const contents = node.get(PDFName.of('Contents'));
		if (!contents) return;

		this.parseRecursively(collector, contents, pageNumber, pdfDoc);
	}

	private parseStream(
		collector: GlyphBlock[],
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
				const value = this.decodeNumberArray(token.value);
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
							fontResource = this.decodeNumberArray(
								tokens[i - 2]!.value,
							).replace(/^\//, '');
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
							const textToken = this.extractTJStringArray(tokens, i - 1);
							if (textToken.value.length) {
								collector.push({
									glyphs: textToken.value,
									fontResource,
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

	private extractTJStringArray(tokens: Token[], end: number): Token {
		const token: Token = {
			type: 'string',
			value: [] as number[],
		};

		for (let i = end - 1; i >= 0; --i) {
			const token = tokens[i]!;
			if (token.type === 'string') {
				token.value.unshift(...token.value);
			} else if (
				token.type === 'token' &&
				token.value.length === 1 &&
				token.value[0] === 91
			) {
				break;
			}
		}

		return token;
	}

	private decodeNumberArray(value: number[]): string {
		return value.map((c) => String.fromCharCode(c)).join('');
	}
}
