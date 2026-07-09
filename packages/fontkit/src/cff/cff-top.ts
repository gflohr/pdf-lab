import type {
	DecodeStream,
	EncodeStream,
	FieldT,
	ParsingContext,
	PropertyDescriptor,
} from 'restructure';
import * as r from 'restructure';
import { itemVariationStore } from '../tables/variations.js';
import {
	expertCharset,
	expertSubsetCharset,
	isoAdobeCharset,
} from './cff-charsets.js';
import { CFFDict } from './cff-dict.js';
import { expertEncoding, standardEncoding } from './cff-encodings.js';
import { CFFIndex } from './cff-index.js';
import { CFFPointer, type Ptr } from './cff-pointer.js';
import {
	type CFFPrivateDictTable,
	cffPrivateDict,
} from './cff-private-dict.js';
import type { StandardString } from './cff-standard-strings.js';
import { CFFSubsetCharset } from '../subset/cff-subset.js';

interface RangeRecord {
	first: number;
	nLeft: number;
	offset?: number;
}

// Checks if an operand is an index of a predefined value,
// otherwise delegates to the provided type.
export class PredefinedOp {
	constructor(
		private readonly predefinedOps: StandardString[] | StandardString[][] | CFFSubsetCharset[],
		private readonly type: CFFPointer<FieldT<any>>,
	) {}

	decode(
		stream: DecodeStream,
		parent: unknown,
		operands: number[],
	): PropertyDescriptor | StandardString | StandardString[] | CFFSubsetCharset{
		if (this.predefinedOps[operands[0]]) {
			return this.predefinedOps[operands[0]];
		}

		return this.type.decode(stream, parent, operands);
	}

	size(value: unknown, ctx?: ParsingContext): number {
		return this.type.size(value, ctx);
	}

	encode(
		stream: EncodeStream,
		value: StandardString | StandardString[] | CFFSubsetCharset,
		ctx?: ParsingContext,
	): number | Ptr | Ptr[] {
		if (typeof value === 'string'
			&& typeof this.predefinedOps[0] === 'string') {
			const index = (this.predefinedOps as StandardString[]).indexOf(value);
			if (index >= 0) {
				return index;
			}
		}

		return this.type.encode(stream, value as CFFSubsetCharset, ctx);
	}
}

class CFFEncodingVersion extends r.Number {
	constructor() {
		super('UInt8');
	}

	decode(stream: DecodeStream) {
		return r.uint8.decode(stream) & 0x7f;
	}
}

const range1Fields = {
	first: r.uint16,
	nLeft: r.uint8,
};
const range1 = new r.Struct<typeof range1Fields, RangeRecord>(range1Fields);

const range2Fields = {
	first: r.uint16,
	nLeft: r.uint16,
};
const range2 = new r.Struct<typeof range2Fields, RangeRecord>(range2Fields);

interface CFFCustomEncodingDataV0 {
	version: 0;
	nCodes: number;
	codes: number[];
}

interface CFFCustomEncodingDataV1 {
	version: 1;
	nRanges: number;
	ranges: number[];
}

type CFFCustomEncodingData = CFFCustomEncodingDataV0 | CFFCustomEncodingDataV1;

const cffCustomEncodingFields = {
	0: {
		nCodes: r.uint8,
		codes: new r.Array(r.uint8, 'nCodes'),
	},

	1: {
		nRanges: r.uint8,
		ranges: new r.Array(range1, 'nRanges'),
	},

	// TODO: supplement?
};
const cffCustomEncoding = new r.VersionedStruct<
	typeof cffCustomEncodingFields,
	CFFCustomEncodingData
>(new CFFEncodingVersion(), cffCustomEncodingFields);

const cffEncoding = new PredefinedOp(
	[standardEncoding, expertEncoding],
	new CFFPointer(cffCustomEncoding, { lazy: true }),
);

/**
 * Decodes an array of ranges until the total
 * length is equal to the provided length.
 * @internal
 */
export class RangeArray extends r.Array<FieldT<RangeRecord>> {
	override decode(stream: DecodeStream, parent?: ParsingContext) {
		const length = r.resolveLength(this.length, stream, parent);
		let count = 0;
		const res = [];
		while (count < length) {
			const range = this.type.decode(stream, parent);
			range.offset = count;
			count += range.nLeft + 1;
			res.push(range);
		}

		return res;
	}
}

interface CFFCustomCharsetDataV0 {
	version: 0;
	glyphs: number[];
}

interface CFFCustomCharsetDataV1 {
	version: 1;
	ranges: RangeRecord[];
}

interface CFFCustomCharsetDataV2 {
	version: 2;
	ranges: RangeRecord[];
}

type CFFCustomCharsetData =
	| CFFCustomCharsetDataV0
	| CFFCustomCharsetDataV1
	| CFFCustomCharsetDataV2;

// Subtracting 1 from the length drops the .notdef glyph from the total length
// count constraint.
const cffCustomCharsetFields = {
	0: {
		glyphs: new r.Array(r.uint16, (t) => t.parent.CharStrings.length - 1),
	},

	1: {
		ranges: new RangeArray(range1, (t) => t.parent.CharStrings.length - 1),
	},

	2: {
		ranges: new RangeArray(range2, (t) => t.parent.CharStrings.length - 1),
	},
};
const cffCustomCharset = new r.VersionedStruct<
	typeof cffCustomCharsetFields,
	CFFCustomCharsetData
>(r.uint8, cffCustomCharsetFields);

const cffCharset = new PredefinedOp(
	[isoAdobeCharset, expertCharset, expertSubsetCharset],
	new CFFPointer(cffCustomCharset, { lazy: true }),
);

const fdRange3 = new r.Struct({
	first: r.uint16,
	fd: r.uint8,
});

const fdRange4 = new r.Struct({
	first: r.uint32,
	fd: r.uint16,
});

const fdSelect = new r.VersionedStruct(r.uint8, {
	0: {
		fds: new r.Array(r.uint8, (t) => t.parent.CharStrings.length),
	},

	3: {
		nRanges: r.uint16,
		ranges: new r.Array(fdRange3, 'nRanges'),
		sentinel: r.uint16,
	},

	4: {
		nRanges: r.uint32,
		ranges: new r.Array(fdRange4, 'nRanges'),
		sentinel: r.uint32,
	},
});

const ptr = new CFFPointer(cffPrivateDict);
export class CFFPrivateOp {
	decode(
		stream: DecodeStream,
		parent: ParsingContext,
		operands: number[],
	): CFFPrivateDictTable {
		parent.length = operands[0];
		const decoded = ptr.decode(stream, parent, [operands[1]]);
		return decoded;
	}

	size(dict: CFFDict, ctx?: ParsingContext): [number, number] {
		// FIXME: This method has zero test coverage upstream and contains a
		// fatal runtime bug.  Upstream returns `ptr.size(dict, ctx)[0]` as
		// the second item of the array, which crashes because `this` is
		// undefined. I temporarily return `0` for the key size fallback to
		// prevent such crashes, but proper serialisation behaviour for this
		// private dict pointer needs verification.
		return [cffPrivateDict.size(dict, ctx, false), 0];
	}

	encode(stream: EncodeStream, dict: CFFDict, ctx?: ParsingContext) {
		const size = cffPrivateDict.size(dict, ctx, false);
		const encoded = ptr.encode(stream, dict, ctx);

		return [size, encoded[0]];
	}
}

interface CFFFontDictData {
	Private?: CFFPrivateDictTable;
	FontName?: string;
	FontPatrix: number[];
	PaintType: number;
}
const fontDict = new CFFDict<CFFFontDictData>([
	// key, name, type(s), default
	[18, 'Private', new CFFPrivateOp(), null],
	[[12, 38], 'FontName', 'sid', null],
	[[12, 7], 'FontMatrix', 'array', [0.001, 0, 0, 0.001, 0, 0]],
	[[12, 5], 'PaintType', 'number', 0],
]);

interface CFFTopDictData {
	ROS?: [string, string, number];
	version?: string;
	Notice?: string;
	Copyright?: string;
	FullName?: string;
	FamilyName?: string;
	Weight?: string;
	isFixedPitch: boolean;
	ItalicAngle: number;
	UnderlinePosition: number;
	UnderlineThickness: number;
	PaintType: number;
	CharstringType: number;
	FontMatrix: [number, number, number, number, number, number];
	UniqueID?: number;
	FontBBox: [number, number, number, number];
	StrokeWidth: number;
	XUID: unknown[];
	charset: StandardString[];
	Private: CFFPrivateDictTable; // FIXME! This is probably wrong!
	SytheticBase?: number;
	PostScript?: string;
	SFNTFontName?: string;
	SFNTFontBlend?: number;
	CIDFontVersion: number;
	CIDFontRevision: number;
	CIDFontType: number;
	CIDCount: number;
	UIDBase: number;
	FDSelect?: number[];
	FDArray?: number[];
	FontName?: string;
}
const cffTopDict = new CFFDict<CFFTopDictData>([
	// key, name, type(s), default
	[[12, 30], 'ROS', ['sid', 'sid', 'number'], null],

	[0, 'version', 'sid', null],
	[1, 'Notice', 'sid', null],
	[[12, 0], 'Copyright', 'sid', null],
	[2, 'FullName', 'sid', null],
	[3, 'FamilyName', 'sid', null],
	[4, 'Weight', 'sid', null],
	[[12, 1], 'isFixedPitch', 'boolean', false],
	[[12, 2], 'ItalicAngle', 'number', 0],
	[[12, 3], 'UnderlinePosition', 'number', -100],
	[[12, 4], 'UnderlineThickness', 'number', 50],
	[[12, 5], 'PaintType', 'number', 0],
	[[12, 6], 'CharstringType', 'number', 2],
	[[12, 7], 'FontMatrix', 'array', [0.001, 0, 0, 0.001, 0, 0]],
	[13, 'UniqueID', 'number', null],
	[5, 'FontBBox', 'array', [0, 0, 0, 0]],
	[[12, 8], 'StrokeWidth', 'number', 0],
	[14, 'XUID', 'array', null],
	[15, 'charset', cffCharset, isoAdobeCharset],
	[16, 'Encoding', cffEncoding, standardEncoding],
	[17, 'CharStrings', new CFFPointer(new CFFIndex()), null],
	[18, 'Private', new CFFPrivateOp(), null],
	[[12, 20], 'SyntheticBase', 'number', null],
	[[12, 21], 'PostScript', 'sid', null],
	[[12, 22], 'SFNTFontName', 'sid', null],
	[[12, 23], 'SFNTFontBlend', 'delta', null],

	// CID font specific
	[[12, 31], 'CIDFontVersion', 'number', 0],
	[[12, 32], 'CIDFontRevision', 'number', 0],
	[[12, 33], 'CIDFontType', 'number', 0],
	[[12, 34], 'CIDCount', 'number', 8720],
	[[12, 35], 'UIDBase', 'number', null],
	[[12, 37], 'FDSelect', new CFFPointer(fdSelect), null],
	[[12, 36], 'FDArray', new CFFPointer(new CFFIndex(fontDict)), null],
	[[12, 38], 'FontName', 'sid', null],
]);

const variationStore = new r.Struct({
	length: r.uint16,
	itemVariationStore: itemVariationStore,
});

interface CFF2TopDictData {
	FontMatrix: [number, number, number, number, number, number];
	CharStrings?: number[];
	FDSelect?: number[];
	FDArray?: CFFFontDictData[];
	vstore?: typeof variationStore;
	maxstack: number;
}
const cff2TopDict = new CFFDict<CFF2TopDictData>([
	[[12, 7], 'FontMatrix', 'array', [0.001, 0, 0, 0.001, 0, 0]],
	[17, 'CharStrings', new CFFPointer(new CFFIndex()), null],
	[[12, 37], 'FDSelect', new CFFPointer(fdSelect), null],
	[[12, 36], 'FDArray', new CFFPointer(new CFFIndex(fontDict)), null],
	[24, 'vstore', new CFFPointer(variationStore), null],
	[25, 'maxstack', 'number', 193],
]);

export interface CFFTopDataV1 {
	version: 1;
	hdrSize: number;
	offSize: number;
	nameIndex: string[];
	topDictIndex: CFFDict[];
	stringIndex: string[];
	globalSubrIndex: { offset: number; length: number }[];
}

export interface CFFTopDataV2 {
	version: 2;
	hdrSize: number;
	length: number;
	topDict: CFFDict[];
	globalSubrIndex: { offset: number; length: number }[];
}

export type CFFTopData = CFFTopDataV1 | CFFTopDataV2;

const fields = {
	1: {
		hdrSize: r.uint8,
		offSize: r.uint8,
		nameIndex: new CFFIndex(new r.String('length')),
		topDictIndex: new CFFIndex(cffTopDict),
		stringIndex: new CFFIndex(new r.String('length')),
		globalSubrIndex: new CFFIndex(),
	},

	2: {
		hdrSize: r.uint8,
		length: r.uint16,
		topDict: cff2TopDict,
		globalSubrIndex: new CFFIndex(),
	},
};

/** @internal */
export const cffTop = new r.VersionedStruct<typeof fields, CFFTopData>(
	r.fixed16,
	fields,
);
