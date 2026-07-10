import type { DecodeStream } from 'restructure';
import { type AnyCFFFontHeader, CFFFont, type CFFTable } from './cff-font';

export interface CFF2Font extends AnyCFFFontHeader {
	version: 2;

	string(sid: number | null): null;
}

// biome-ignore lint/suspicious/noUnsafeDeclarationMerging: Intentional.
export class CFF2Font extends CFFFont {
	public declare version: 2;
	declare protected topData: CFFTable.TopDataV1;

	constructor(stream: DecodeStream) {
		super(stream);

		if (this.decodedTopDataVersion !== 2) {
			throw new Error(`CFF2TopData version mismatch: ${this.decodedTopDataVersion} is not equal to 2!`);
		}

	}

	public static decode(stream: DecodeStream): CFF2Font {
		return new CFF2Font(stream);
	}

	public string(_sid: number | null): null {
		return null;
	}
}
