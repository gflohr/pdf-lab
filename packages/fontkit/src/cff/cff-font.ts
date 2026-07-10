import type { DecodeStream } from 'restructure';
import type { CFFDict } from './cff-dict.js';
import type { CFFPrivateDictTable } from './cff-private-dict.js';
import { cffTop } from './cff-top.js';
import type { CFF1Font } from './cff1-font.js';
import type { CFF2Font } from './cff2-font.js';
import { StandardString } from './cff-standard-strings.js';

export namespace CFFTable {
	export interface IndexDescriptor {
		offset: number;
		length: number;
	}

	export interface TopDataV1 {
		version: 1 | undefined;
		hdrSize: number;
		offSize: number;
		nameIndex: string[];
		topDictIndex: CFFDict[];
		stringIndex: StandardString[];
		globalSubrIndex: IndexDescriptor[];
	}

	export interface TopDataV2 {
		version: 2;
		hdrSize: number;
		length: number;
		topDict: CFFDict[];
		globalSubrIndex: IndexDescriptor[];
	}

	export type TopData = TopDataV1 | TopDataV2;
}

export interface AnyCFFFontHeader {
	hdrSize: number;
	globalSubrIndex: CFFTable.IndexDescriptor[];

	size(): 0;
	encode(): void;

	string(sid: number | null): StandardString | null;
}

export type AnyCFFFont = CFF1Font | CFF2Font;

export abstract class CFFFont {
	protected topData: CFFTable.TopData;
	public readonly version: 1 | 2 | undefined;
	protected readonly decodedTopDataVersion: number | undefined;

	public hdrSize: number;
	public globalSubrIndex: CFFTable.IndexDescriptor[];

	private topDictIndex!: CFFDict[];
	public topDict!: Record<string, any>;
	public isCIDFont!: boolean;
	private nameIndex!: string[];
	public length!: number;
	public header!: Uint8Array;

	constructor(public readonly stream: DecodeStream) {
		this.topData = cffTop.decode(this.stream);
		this.version = this.topData.version;
		this.decodedTopDataVersion = this.version;
		this.hdrSize = this.topData.hdrSize;
		this.globalSubrIndex = this.topData.globalSubrIndex;

		for (const k in this.topData) {
			const key = k as keyof typeof this.topData;
			const val = this.topData[key];
			(this as Record<string, unknown>)[key as string] = val;
		}

		if (this.version !== 2) {
			if (this.topDictIndex.length !== 1) {
				throw new Error('Only a single font is allowed in CFF');
			}

			this.topDict = this.topDictIndex[0];
		}

		this.isCIDFont = 'ROS' in this.topDict && this.topDict.ROS != null;
	}

	public size(): 0 {
		return 0;
	}

	public encode() {}

	abstract string(sid: number | null): StandardString | null;

	get postscriptName(): string | null {
		if (this.version !== 2) {
			return this.nameIndex[0];
		}

		return null;
	}

	get fullName() {
		return this.string(this.topDict.FullName);
	}

	get familyName() {
		return this.string(this.topDict.FamilyName);
	}

	getCharString(glyph: number): Uint8Array {
		this.stream.pos = this.topDict.CharStrings[glyph].offset;
		return this.stream.readBuffer(this.topDict.CharStrings[glyph].length);
	}

	getGlyphName(gid: number): string | null {
		// CFF2 glyph names are in the post table.
		if (this.version === 2) {
			return null;
		}

		// CID-keyed fonts don't have glyph names
		if (this.isCIDFont) {
			return null;
		}

		const { charset } = this.topDict;
		if (Array.isArray(charset)) {
			return charset[gid];
		}

		if (gid === 0) {
			return '.notdef';
		}

		gid -= 1;

		switch (charset.version) {
			case 0:
				return this.string(charset.glyphs[gid]);

			case 1:
			case 2:
				for (let i = 0; i < charset.ranges.length; i++) {
					const range = charset.ranges[i];
					if (range.offset <= gid && gid <= range.offset + range.nLeft) {
						return this.string(range.first + (gid - range.offset));
					}
				}
				break;
		}

		return null;
	}

	fdForGlyph(gid: number): number | null {
		if (!this.topDict.FDSelect) {
			return null;
		}

		switch (this.topDict.FDSelect.version) {
			case 0:
				return this.topDict.FDSelect.fds[gid];
			case 3:
			case 4:
				{
					const { ranges } = this.topDict.FDSelect;
					let low = 0;
					let high = ranges.length - 1;

					while (low <= high) {
						const mid = (low + high) >> 1;

						if (gid < ranges[mid].first) {
							high = mid - 1;
						} else if (mid < high && gid >= ranges[mid + 1].first) {
							low = mid + 1;
						} else {
							return ranges[mid].fd;
						}
					}
				}
				throw new Error(
					`Unknown FDSelect version: ${this.topDict.FDSelect.version}`,
				);
			default:
				throw new Error(
					`Unknown FDSelect version: ${this.topDict.FDSelect.version}`,
				);
		}
	}

	// gid: number, @returns { BlueValues: ... }
	privateDictForGlyph(gid: number): CFFPrivateDictTable | null {
		if (this.topDict.FDSelect && this.topDict.FDArray) {
			const fd = this.fdForGlyph(gid);
			if (fd !== null && this.topDict.FDArray[fd]) {
				return this.topDict.FDArray[fd].Private;
			}

			return null;
		}

		if (this.version !== 2) {
			return this.topDict.Private;
		}

		return this.topDict.FDArray[0].Private;
	}
}
