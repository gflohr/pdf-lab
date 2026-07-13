import type { DecodeStream } from 'restructure';
import { CFFFontBase, type CFFTable } from './cff-font';

export interface CFF2Font extends CFFFontBase {
	version: 2;
	topData: CFFTable.TopDataV2;
	length: number;
}

// biome-ignore lint/suspicious/noUnsafeDeclarationMerging: Intentional.
export class CFF2Font extends CFFFontBase {
	public declare version: 2;
	public declare topData: CFFTable.TopDataV2;
	public length: number;
	private declare _topDict: CFFTable.TopDictDataV2;

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

	public get topDict(): CFFTable.TopDictDataV2 {
		return this._topDict;
	}

	privateDictForGlyph(gid: number): CFFTable.PrivateDictData | null {
		if (this.topDict.FDSelect && this.topDict.FDArray) {
			const fd = this.fdForGlyph(gid);
			if (fd !== null && this.topDict.FDArray[fd]) {
				return (this.topDict.FDArray[fd] as any).Private;
			}

			return null;
		}

		return this.topDict.FDArray?.[0].Private ?? null;
	}
}
