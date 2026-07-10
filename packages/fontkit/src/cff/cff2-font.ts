import type { DecodeStream } from 'restructure';
import { type AnyCFFFontHeader, CFFFont, type CFFTable } from './cff-font';
import type { CFFTopDictData } from './cff-top';

export interface CFF2Font extends AnyCFFFontHeader {
	version: 2;
	length: number;
}

// biome-ignore lint/suspicious/noUnsafeDeclarationMerging: Intentional.
export class CFF2Font extends CFFFont {
	public declare version: 2;
	protected declare topData: CFFTable.TopDataV2;
	public length: number;
	public _topDict: CFFTopDictData;

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

	public override get topDict(): CFFTopDictData {
		return this._topDict;
	}

	public override get postscriptName(): null {
		return null;
	}
}
