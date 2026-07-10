import type { DecodeStream } from 'restructure';
import { type AnyCFFFontHeader, CFFFont } from './cff-font';

export interface CFF2Font extends AnyCFFFontHeader {
	version: 2;
}

// biome-ignore lint/suspicious/noUnsafeDeclarationMerging: Intentional.
export class CFF2Font extends CFFFont {
	public declare version: 2;

	constructor(stream: DecodeStream) {
		super(stream);

		if (this.decodedTopDataVersion !== 2) {
			throw new Error(`CFF2TopData version mismatch: ${this.decodedTopDataVersion} is not equal to 2!`);
		}

	}
	static decode(stream: DecodeStream): CFF2Font {
		return new CFF2Font(stream);
	}
}
