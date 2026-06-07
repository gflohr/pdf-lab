import type {
	DecodeStream,
	EncodeStream,
	FieldT,
	InferField,
	ParsingContext,
} from '@pdf-lib/restructure';
import r from '@pdf-lib/restructure';
import { resolveLength } from '@pdf-lib/restructure/src/utils.js';
import { itemVariationStore } from '../tables/variations.js';
import {
	ExpertCharset,
	ExpertSubsetCharset,
	ISOAdobeCharset,
} from './cff-charsets.js';
import CFFDict from './cff-dict.js';
import { ExpertEncoding, StandardEncoding } from './cff-encodings.js';
import CFFIndex from './cff-index.js';
import CFFPointer, { type Ptr } from './cff-pointer.js';
import CFFPrivateDict from './cff-private-dict.js';

interface RangeRecord {
	first: number;
	nLeft: number;
	offset?: number;
}

// Checks if an operand is an index of a predefined value,
// otherwise delegates to the provided type.
class PredefinedOp {
	constructor(
		private readonly predefinedOps: any[],
		private readonly type: CFFPointer<any>,
	) {}

	decode(stream: DecodeStream, parent: unknown, operands: [number]): any {
		if (this.predefinedOps[operands[0]]) {
			return this.predefinedOps[operands[0]];
		}

		return this.type.decode(stream, parent, operands);
	}

	size(value: any, ctx?: ParsingContext) {
		return this.type.size(value, ctx);
	}

	encode(
		stream: EncodeStream,
		value: any,
		ctx?: ParsingContext,
	): number | Ptr | Ptr[] {
		const index = this.predefinedOps.indexOf(value);
		if (index !== -1) {
			return index;
		}

		return this.type.encode(stream, value, ctx);
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
const Range1 = new r.Struct<typeof range1Fields, RangeRecord>(range1Fields);

const range2Fields = {
	first: r.uint16,
	nLeft: r.uint16,
};
const Range2 = new r.Struct<typeof range2Fields, RangeRecord>(range2Fields);

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
		ranges: new r.Array(Range1, 'nRanges'),
	},

	// TODO: supplement?
};
const CFFCustomEncoding = new r.VersionedStruct<
	typeof cffCustomEncodingFields,
	CFFCustomEncodingData
>(new CFFEncodingVersion(), cffCustomEncodingFields);

const CFFEncoding = new PredefinedOp(
	[StandardEncoding, ExpertEncoding],
	new CFFPointer(CFFCustomEncoding, { lazy: true }),
);

// Decodes an array of ranges until the total
// length is equal to the provided length.
export class RangeArray extends r.Array<FieldT<RangeRecord>> {
	override decode(stream: DecodeStream, parent?: ParsingContext) {
		const length = resolveLength(this.length, stream, parent);
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

// Subtracting 1 from the length rops the .notdef glyph from the total length
// count constraint.
const cffCustomCharsetFields = {
	0: {
		glyphs: new r.Array(r.uint16, (t) => t.parent.CharStrings.length - 1),
	},

	1: {
		ranges: new RangeArray(Range1, (t) => t.parent.CharStrings.length - 1),
	},

	2: {
		ranges: new RangeArray(Range2, (t) => t.parent.CharStrings.length - 1),
	},
};
const CFFCustomCharset = new r.VersionedStruct<
	typeof cffCustomCharsetFields,
	CFFCustomCharsetData
>(r.uint8, cffCustomCharsetFields);

const CFFCharset = new PredefinedOp(
	[ISOAdobeCharset, ExpertCharset, ExpertSubsetCharset],
	new CFFPointer(CFFCustomCharset, { lazy: true }),
);

const FDRange3 = new r.Struct({
	first: r.uint16,
	fd: r.uint8,
});

const FDRange4 = new r.Struct({
	first: r.uint32,
	fd: r.uint16,
});

const FDSelect = new r.VersionedStruct(r.uint8, {
	0: {
		fds: new r.Array(r.uint8, (t) => t.parent.CharStrings.length),
	},

	3: {
		nRanges: r.uint16,
		ranges: new r.Array(FDRange3, 'nRanges'),
		sentinel: r.uint16,
	},

	4: {
		nRanges: r.uint32,
		ranges: new r.Array(FDRange4, 'nRanges'),
		sentinel: r.uint32,
	},
});

const ptr = new CFFPointer(CFFPrivateDict);
export class CFFPrivateOp {
	decode(
		stream: DecodeStream,
		parent: ParsingContext,
		operands: number[],
	): InferField<FieldT<any>> {
		parent.length = operands[0];
		return ptr.decode(stream, parent, [operands[1]]);
	}

	size(dict: CFFDict, ctx?: ParsingContext): [number, number] {
		// The original version used ptr.size(dict, ctx)[0] as the second
		// value. But invoking size() on ptr would cause a crash, as "this"
		// is undefined in that context.
		return [CFFPrivateDict.size(dict, ctx, false), 0];
	}

	encode(stream: EncodeStream, dict: CFFDict, ctx?: ParsingContext) {
		return [
			CFFPrivateDict.size(dict, ctx, false),
			ptr.encode(stream, dict, ctx)[0],
		];
	}
}

const FontDict = new CFFDict([
	// key, name, type(s), default
	[18, 'Private', new CFFPrivateOp(), null],
	[[12, 38], 'FontName', 'sid', null],
]);

const CFFTopDict = new CFFDict([
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
	[15, 'charset', CFFCharset, ISOAdobeCharset],
	[16, 'Encoding', CFFEncoding, StandardEncoding],
	[17, 'CharStrings', new CFFPointer(new CFFIndex()), null],
	[18, 'Private', new CFFPrivateOp(), null],
	[[12, 20], 'SyntheticBase', 'number', null],
	[[12, 21], 'PostScript', 'sid', null],
	[[12, 22], 'BaseFontName', 'sid', null],
	[[12, 23], 'BaseFontBlend', 'delta', null],

	// CID font specific
	[[12, 31], 'CIDFontVersion', 'number', 0],
	[[12, 32], 'CIDFontRevision', 'number', 0],
	[[12, 33], 'CIDFontType', 'number', 0],
	[[12, 34], 'CIDCount', 'number', 8720],
	[[12, 35], 'UIDBase', 'number', null],
	[[12, 37], 'FDSelect', new CFFPointer(FDSelect), null],
	[[12, 36], 'FDArray', new CFFPointer(new CFFIndex(FontDict)), null],
	[[12, 38], 'FontName', 'sid', null],
]);

const VariationStore = new r.Struct({
	length: r.uint16,
	itemVariationStore: itemVariationStore,
});

const CFF2TopDict = new CFFDict([
	[[12, 7], 'FontMatrix', 'array', [0.001, 0, 0, 0.001, 0, 0]],
	[17, 'CharStrings', new CFFPointer(new CFFIndex()), null],
	[[12, 37], 'FDSelect', new CFFPointer(FDSelect), null],
	[[12, 36], 'FDArray', new CFFPointer(new CFFIndex(FontDict)), null],
	[24, 'vstore', new CFFPointer(VariationStore), null],
	[25, 'maxstack', 'number', 193],
]);

interface CFFTopDataV1 {
	version: 1;
	hdrSize: number;
	offSize: number;
	nameIndex: string;
	topDictIndex: CFFDict;
	stringIndex: string[];
	globalSubrIndex: { offset: number; length: number };
}

interface CFFTopDataV2 {
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
		topDictIndex: new CFFIndex(CFFTopDict),
		stringIndex: new CFFIndex(new r.String('length')),
		globalSubrIndex: new CFFIndex(),
	},

	2: {
		hdrSize: r.uint8,
		length: r.uint16,
		topDict: CFF2TopDict,
		globalSubrIndex: new CFFIndex(),
	},
};

const CFFTop = new r.VersionedStruct<typeof fields, CFFTopData>(
	r.fixed16,
	fields,
);

export default CFFTop;
