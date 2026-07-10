import type { DecodeStream } from 'restructure';
import type { CFFDict } from './cff-dict.js';
import type { CFFPrivateDictTable } from './cff-private-dict.js';
import type { StandardString } from './cff-standard-strings.js';
import { type CFFTopDictData, cffTop } from './cff-top.js';
import type { CFF1Font } from './cff1-font.js';
import type { CFF2Font } from './cff2-font.js';

export namespace CFFTable {
	export interface IndexDescriptor {
		offset: number;
		length: number;
	}

	export interface TopDataHeader {
		version: 1 | undefined | 2;
		hdrSize: number;
		globalSubrIndex: IndexDescriptor[];
		topDict: CFFTopDictData;
	}
	export interface TopDataV1 extends TopDataHeader {
		version: 1 | undefined;
		offSize: number; // unused?
		nameIndex: string[];
		topDictIndex: CFFTopDictData[];
		stringIndex: StandardString[];
	}

	export interface TopDataV2 extends TopDataHeader {
		version: 2;
		length: number;
	}

	export type TopData = TopDataV1 | TopDataV2;
}

export interface AnyCFFFontHeader {
	hdrSize: number;
	globalSubrIndex: CFFTable.IndexDescriptor[];

	size(): 0;
	encode(): void;

	string(sid: number | null): StandardString | null;
	postscriptName: string | null;
	topDict: CFFTopDictData;
	readonly isCIDFont: boolean;
}

export type AnyCFFFont = CFF1Font | CFF2Font;

export abstract class CFFFont {
	protected topData: CFFTable.TopData;
	public readonly version: 1 | 2 | undefined;
	protected readonly decodedTopDataVersion: number | undefined;

	public hdrSize: number;
	public globalSubrIndex: CFFTable.IndexDescriptor[];

	public length!: number;
	public header!: Uint8Array;

	constructor(public readonly stream: DecodeStream) {
		if (new.target === CFFFont) {
			throw new Error('CFFFont is an abstract base class! Use CFF1Font or CFF2Font instead!');
		}
		this.topData = cffTop.decode(this.stream);
		this.version = this.topData.version;
		this.decodedTopDataVersion = this.version;
		this.hdrSize = this.topData.hdrSize;
		this.globalSubrIndex = this.topData.globalSubrIndex;
	}

	public size(): 0 {
		return 0;
	}

	public encode() {}

	public abstract string(sid: number | null): StandardString | null;

	public abstract get topDict(): CFFTopDictData;

	public get isCIDFont(): boolean {
		return 'ROS' in this.topDict && this.topDict.ROS != null;
	}

	public abstract get postscriptName(): string | null;

	get fullName() {
		return this.string(this.topDict.FullName) ?? null;
	}

	get familyName() {
		return this.string(this.topDict.FamilyName);
	}

	getCharString(glyph: number): Uint8Array {
		this.stream.pos = this.topDict.CharStrings[glyph].offset;
		return this.stream.readBuffer(
			this.topDict.CharStrings[glyph].length,
		);
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

	fdForGlyph(gid: number): number | null {
		if (!this.topDict.FDSelect) {
			return null;
		}

		switch ((this.topDict.FDSelect as any).version) {
			case 0:
				return (this.topDict.FDSelect as any).fds[gid];
			case 3:
			case 4:
				{
					const { ranges } = this.topDict.FDSelect as any;
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
					`Unknown FDSelect version: ${(this.topDict.FDSelect as any).version}`,
				);
			default:
				throw new Error(
					`Unknown FDSelect version: ${(this.topDict.FDSelect as any).version}`,
				);
		}
	}

	// gid: number, @returns { BlueValues: ... }
	privateDictForGlyph(gid: number): CFFPrivateDictTable | null {
		if (this.topDict.FDSelect && this.topDict.FDArray) {
			const fd = this.fdForGlyph(gid);
			if (fd !== null && this.topDict.FDArray[fd]) {
				return (this.topDict.FDArray[fd] as any).Private;
			}

			return null;
		}

		if (this.version !== 2) {
			return this.topDict.Private;
		}

		return (this.topDict.FDArray![0] as any).Private;
	}
}
