import type { DecodeStream } from 'restructure';
import { type AnyCFFFontHeader, CFFFont, type CFFTable } from './cff-font';
import { type StandardString, standardStrings } from './cff-standard-strings';

export interface CFF1Font extends AnyCFFFontHeader {
	readonly version: 1 | undefined;

	string(sid: number | null): StandardString | null;
}

// biome-ignore lint/suspicious/noUnsafeDeclarationMerging: Intentional.
export class CFF1Font extends CFFFont {
	declare protected topData: CFFTable.TopDataV1;

	private stringIndex: StandardString[];

	constructor(stream: DecodeStream) {
		super(stream);

		if (typeof this.decodedTopDataVersion !== 'undefined' &&
			this.decodedTopDataVersion !== 1) {
			throw new Error(`CFF1TopData1 version mismatch: ${this.decodedTopDataVersion} is not equal to 1!`);
		}

		this.stringIndex = this.topData.stringIndex;
	}

	public declare readonly version: 1 | undefined;

	static decode(stream: DecodeStream): CFF1Font {
		return new CFF1Font(stream);
	}

	string(sid: number | null): StandardString | null {
		if (sid === null) {
			return null;
		}

		if (sid < standardStrings.length) {
			return standardStrings[sid];
		}

		return this.stringIndex[sid - standardStrings.length] as StandardString;
	}
}
