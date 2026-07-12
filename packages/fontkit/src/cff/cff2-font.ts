import type { DecodeStream } from 'restructure';
import { CFFFontBase, type CFFFontHeader, type CFFTable } from './cff-font';

export interface CFF2Font extends CFFFontHeader {
	version: 2;
	length: number;
}

// biome-ignore lint/suspicious/noUnsafeDeclarationMerging: Intentional.
export class CFF2Font extends CFFFontBase {
	public declare version: 2;
	protected declare topData: CFFTable.TopDataV2;
	public length: number;
	public declare _topDict: CFFTable.TopDictDataV2;

	constructor(stream: DecodeStream) {
		super(stream);

		if (this.decodedTopDataVersion !== 2) {
			throw new Error(
				`CFF2TopData version mismatch: ${this.decodedTopDataVersion} is not equal to 2!`,
			);
		}

		this.length = this.topData.length;
		this._topDict = this.topData.topDict;
	}

	public static decode(stream: DecodeStream): CFF2Font {
		return new CFF2Font(stream);
	}

	public override string(_sid: number | null): null {
		return null;
	}

	public override get topDict(): CFFTable.TopDictDataV2 {
		return this._topDict;
	}
}
