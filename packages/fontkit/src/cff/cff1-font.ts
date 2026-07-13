import type { DecodeStream } from 'restructure';
import { CFFFontBase, type CFFTable } from './cff-font';
import { type StandardString, standardStrings } from './cff-standard-strings';

export interface CFF1Font extends CFFFontBase {
	readonly version: 1 | undefined;
}

// biome-ignore lint/suspicious/noUnsafeDeclarationMerging: Intentional.
export class CFF1Font extends CFFFontBase {
	protected declare topData: CFFTable.TopDataV1;
	private nameIndex: string[];
	private declare _topDict: CFFTable.TopDictDataV1;
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

	public string(sid: number | null): StandardString | null {
		if (sid === null) {
			return null;
		}

		if (sid < standardStrings.length) {
			return standardStrings[sid];
		}

		return this.stringIndex[sid - standardStrings.length] as StandardString;
	}

	public get topDict(): CFFTable.TopDictDataV1 {
		return this._topDict;
	}

	public get postscriptName(): string | null {
		return this.nameIndex[0] ?? null;
	}

	public get fullName() {
		return this.string(this.topDict.FullName) ?? null;
	}

	public get familyName() {
		return this.string(this.topDict.FamilyName) ?? null;
	}

	getGlyphName(gid: number): string | null {
		// CID-keyed fonts don't have glyph names
		if (this.isCIDFont) {
			return null;
		}

		const charset = (this.topDict as CFFTable.TopDictDataV1).charset;
		if (Array.isArray(charset)) {
			// FIXME! This code has zero test coverage, and charset[gid] is
			// actually a RangeRecord.
			return charset[gid] as unknown as string;
		}

		if (gid === 0) {
			return '.notdef';
		}

		gid -= 1;

		switch ((charset as any).version) {
			case 0:
				return this.string((charset as any).glyphs[gid]);

			case 1:
			case 2:
				for (let i = 0; i < (charset as any).ranges.length; i++) {
					const range = (charset as any).ranges[i];
					if (range.offset <= gid && gid <= range.offset + range.nLeft) {
						return this.string(range.first + (gid - range.offset));
					}
				}
				break;
		}

		return null;
	}

	getCharString(glyph: number): Uint8Array {
		const charStrings = this.topDict.CharStrings?.[glyph];

		// FIXME! Is this the correct fallback? Or rather throw an exception?
		if (!charStrings) return new Uint8Array();

		this.stream.pos = charStrings.offset;
		return this.stream.readBuffer(charStrings.length);
	}

	privateDictForGlyph(gid: number): CFFTable.PrivateDictData | null {
		if (this.topDict.FDSelect && this.topDict.FDArray) {
			const fd = this.fdForGlyph(gid);
			if (fd !== null && this.topDict.FDArray[fd]) {
				return (this.topDict.FDArray[fd] as any).Private;
			}

			return null;
		}

		return this.topDict.Private;
	}
}
