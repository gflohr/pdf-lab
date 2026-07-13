import type { DecodeStream } from 'restructure';
import type { OpenTypeVariation } from '../tables/variations.js';
import type { CFFPrivateDictTable } from './cff-private-dict.js';
import { cffTop } from './cff-top.js';
import type { CFF1Font } from './cff1-font.js';
import type { CFF2Font } from './cff2-font.js';

export namespace CFFTable {
	export interface IndexDescriptor {
		offset: number;
		length: number;
	}

	export interface CustomEncodingDataV0 {
		version: 0;
		nCodes: number;
		codes: number[];
	}

	export interface CustomEncodingDataV1 {
		version: 1;
		nRanges: number;
		ranges: number[];
	}

	export type CustomEncodingData = CustomEncodingDataV0 | CustomEncodingDataV1;

	export interface RangeRecord {
		first: number;
		nLeft: number;
		offset?: number;
	}

	export interface FDRange {
		first: number;
		fd: number;
	}

	export interface FDSelectV0 {
		version: 0;
		fds: number[];
	}

	export interface FDSelectV3 {
		version: 3;
		nRanges: number;
		ranges: FDRange[];
		sentinel: number;
	}

	export interface FDSelectV4 {
		version: 4;
		nRanges: number;
		ranges: FDRange[];
		sentinel: number;
	}

	export type FDSelect = FDSelectV0 | FDSelectV3 | FDSelectV4;
	export interface TopDictDataHeader {
		FontMatrix: [number, number, number, number, number, number];
		CharStrings: IndexDescriptor[] | null;
		FDSelect?: FDSelect;
		FDArray?: FontDictData[];
	}

	export interface TopDictDataV1 extends TopDictDataHeader {
		ROS: [string, string, number] | null;
		version: number | null;
		Notice: number | null;
		Copyright: number | null;
		FullName: number | null;
		FamilyName: number | null;
		Weight: number | null;
		isFixedPitch: boolean;
		ItalicAngle: number;
		UnderlinePosition: number;
		UnderlineThickness: number;
		PaintType: number;
		CharstringType: number;
		UniqueID?: number;
		FontBBox: [number, number, number, number];
		StrokeWidth: number;
		XUID: unknown[];
		charset: RangeRecord[];
		Encoding: CustomEncodingData;
		Private: CFFPrivateDictTable; // FIXME! This is probably wrong!
		SytheticBase?: number;
		PostScript: number | null;
		SFNTFontName: number | null;
		SFNTFontBlend?: number;
		CIDFontVersion: number;
		CIDFontRevision: number;
		CIDFontType: number;
		CIDCount: number;
		UIDBase: number;
		FontName: number | null;
	}

	export interface FontDictData {
		Private?: CFFPrivateDictTable;
		FontName?: string;
		FontPatrix: number[];
		PaintType: number;
	}

	export interface VariationStore {
		length: number;
		itemVariationStore: OpenTypeVariation.ItemVariationStore;
	}

	export interface TopDictDataV2 extends TopDictDataHeader {
		vstore?: VariationStore;
		maxstack: number;
	}

	export type TopDictData = TopDictDataV1 | TopDictDataV2;

	export interface TopDataHeader {
		version: 1 | undefined | 2;
		hdrSize: number;
		globalSubrIndex: IndexDescriptor[];
	}

	export interface TopDataV1 extends TopDataHeader {
		version: 1 | undefined;
		offSize: number; // unused?
		nameIndex: string[];
		topDictIndex: TopDictDataV1[];
		topDict: TopDictDataV1;
		stringIndex: string[];
	}

	export interface TopDataV2 extends TopDataHeader {
		version: 2;
		topDict: TopDictDataV2;
		length: number;
	}

	export type TopData = TopDataV1 | TopDataV2;
}

export interface CFFFontBase {
	hdrSize: number;
	globalSubrIndex: CFFTable.IndexDescriptor[];

	size(): 0;
	encode(): void;
}

export type CFFFont = CFF1Font | CFF2Font;

// biome-ignore lint/suspicious/noUnsafeDeclarationMerging: Deliberately
export abstract class CFFFontBase {
	protected topData: CFFTable.TopData;
	public readonly version: 1 | 2 | undefined;
	protected readonly decodedTopDataVersion: number | undefined;

	public hdrSize: number;
	public globalSubrIndex: CFFTable.IndexDescriptor[];

	public length!: number;
	public header!: Uint8Array;

	constructor(public readonly stream: DecodeStream) {
		if (new.target === CFFFontBase) {
			throw new Error(
				'CFFFont is an abstract base class! Use CFF1Font or CFF2Font instead!',
			);
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

	public abstract get topDict(): CFFTable.TopDictData;

	public get isCIDFont(): boolean {
		return 'ROS' in this.topDict && this.topDict.ROS != null;
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
					`Unknown FDSelect version: ${(this.topDict.FDSelect as { version: unknown }).version}`,
				);
		}
	}
}
