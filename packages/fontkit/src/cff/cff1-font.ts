import type { DecodeStream } from 'restructure';
import { type AnyCFFFontHeader, CFFFont, type CFFTable } from './cff-font';
import { type StandardString, standardStrings } from './cff-standard-strings';

export interface CFF1Font extends AnyCFFFontHeader {
	readonly version: 1 | undefined;
}

// biome-ignore lint/suspicious/noUnsafeDeclarationMerging: Intentional.
export class CFF1Font extends CFFFont {
	protected declare topData: CFFTable.TopDataV1;
	private nameIndex: string[];
	public declare _topDict: CFFTable.TopDictDataV1;
	private topDictIndex: CFFTable.TopDictDataV1[];
	private stringIndex: string[];

	constructor(stream: DecodeStream) {
		super(stream);

		if (
			typeof this.decodedTopDataVersion !== 'undefined' &&
			this.decodedTopDataVersion !== 1
		) {
			throw new Error(
				`CFF1TopData1 version mismatch: ${this.decodedTopDataVersion} is not equal to 1!`,
			);
		}

		this.nameIndex = this.topData.nameIndex;
		this.topDictIndex = this.topData.topDictIndex;
		this.stringIndex = this.topData.stringIndex;

		if (this.topDictIndex.length !== 1) {
			throw new Error('Only a single font is allowed in CFF version 1');
		}

		if (!this.topDictIndex.length) {
			throw new Error('TopDict list of CFF 1 font is empty!');
		}

		this._topDict = this.topDictIndex[0];
	}

	public declare readonly version: 1 | undefined;

	static decode(stream: DecodeStream): CFF1Font {
		return new CFF1Font(stream);
	}

	public override string(sid: number | null): StandardString | null {
		if (sid === null) {
			return null;
		}

		if (sid < standardStrings.length) {
			return standardStrings[sid];
		}

		return this.stringIndex[sid - standardStrings.length] as StandardString;
	}

	public override get topDict(): CFFTable.TopDictDataV1 {
		return this._topDict;
	}

	public override get postscriptName(): string | null {
		return this.nameIndex[0] ?? null;
	}

	public override get fullName() {
		return this.string(this.topDict.FullName) ?? null;
	}

	public override get familyName() {
		return this.string(this.topDict.FamilyName) ?? null;
	}
}
