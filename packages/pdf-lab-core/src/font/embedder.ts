import type { PDFDocument } from '@cantoo/pdf-lib';

import type { FontEmbedOptions } from '../pdf-lab.js';
import type { FontInfo } from './types.js';

export abstract class FontEmbedder {
	constructor(
		protected readonly _pdfDoc: PDFDocument,
		protected readonly _fontInfo: FontInfo,
		protected readonly _glyphIds: Set<number>,
		protected readonly _options: FontEmbedOptions,
	) {
		if (!this.options.fontkit) {
			throw new Error(
				'You have to pass a fontkit instance in the embed options!',
			);
		}
	}

	protected get pdfDoc(): PDFDocument {
		return this._pdfDoc;
	}

	protected get fontInfo(): FontInfo {
		return this._fontInfo;
	}

	protected get glyphIds(): Set<number> {
		return this._glyphIds;
	}

	protected get options(): FontEmbedOptions {
		return this._options;
	}
}
