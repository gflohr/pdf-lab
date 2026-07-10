import type { DecodeStream } from 'restructure';
import { type AnyCFFFontHeader, CFFFont } from './cff-font';

export interface CFF1Font extends AnyCFFFontHeader {
	readonly version: 1 | undefined;
}

// biome-ignore lint/suspicious/noUnsafeDeclarationMerging: Intentional.
export class CFF1Font extends CFFFont {
	constructor(stream: DecodeStream) {
		super(stream);

		if (typeof this.decodedTopDataVersion !== 'undefined' &&
			this.decodedTopDataVersion !== 1) {
			throw new Error(`CFF1TopData1 version mismatch: ${this.decodedTopDataVersion} is not equal to 1!`);
		}
	}

	public declare readonly version: 1 | undefined;

	static decode(stream: DecodeStream): CFF1Font {
		return new CFF1Font(stream);
	}
}
