import type {
	DecodeStream,
	EncodeStream,
	FieldT,
	ParsingContext,
	PropertyDescriptor,
} from 'restructure';
import * as r from 'restructure';
import type { CFFSubsetCharset } from '../subset/cff-subset.js';
import { itemVariationStore } from '../tables/variations.js';
import {
	expertCharset,
	expertSubsetCharset,
	isoAdobeCharset,
} from './cff-charsets.js';
import { CFFDict } from './cff-dict.js';
import { expertEncoding, standardEncoding } from './cff-encodings.js';
import type { CFFTable } from './cff-font.js';
import { CFFIndex } from './cff-index.js';
import { CFFPointer, type Ptr } from './cff-pointer.js';
import { cffPrivateDict } from './cff-private-dict.js';
import type { StandardString } from './cff-standard-strings.js';

// Checks if an operand is an index of a predefined value,
// otherwise delegates to the provided type.
export class PredefinedOp<T> {
	constructor(
		private readonly predefinedOps:
			| StandardString[]
			| StandardString[][]
			| CFFSubsetCharset[],
		private readonly type: CFFPointer<FieldT<T>>,
	) {}

	decode(
		stream: DecodeStream,
		parent: unknown,
		operands: number[],
	):
		| PropertyDescriptor
		| StandardString
		| StandardString[]
		| CFFSubsetCharset
		| T {
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
		value: StandardString | T,
		ctx?: ParsingContext,
	): Ptr[] | number {
		if (
			typeof value === 'string' &&
			typeof this.predefinedOps[0] === 'string'
		) {
			const index = (this.predefinedOps as StandardString[]).indexOf(
				value as StandardString,
			);
			if (index >= 0) {
				return index;
			}
		}

		const retval = this.type.encode(stream, value as T, ctx);

		return retval;
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
const range1 = new r.Struct<typeof range1Fields, CFFTable.RangeRecord>(
	range1Fields,
);

const range2Fields = {
	first: r.uint16,
	nLeft: r.uint16,
};
const range2 = new r.Struct<typeof range2Fields, CFFTable.RangeRecord>(
	range2Fields,
);

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
	CFFTable.CustomEncodingData
>(new CFFEncodingVersion(), cffCustomEncodingFields);

const cffEncoding = new PredefinedOp<CFFTable.CustomEncodingData>(
	[standardEncoding, expertEncoding],
	new CFFPointer(cffCustomEncoding, { lazy: true }),
);

/**
 * Decodes an array of ranges until the total
 * length is equal to the provided length.
 * @internal
 */
export class RangeArray extends r.Array<FieldT<CFFTable.RangeRecord>> {
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
	CFFTable.CustomCharsetData
>(r.uint8, cffCustomCharsetFields);

const cffCharset = new PredefinedOp<CFFTable.CustomCharsetData>(
	[isoAdobeCharset, expertCharset, expertSubsetCharset],
	new CFFPointer(cffCustomCharset, { lazy: true }),
);

const fdRange3Fields = {
	first: r.uint16,
	fd: r.uint8,
};
const fdRange3 = new r.Struct<typeof fdRange3Fields, CFFTable.FDRange>(
	fdRange3Fields,
);

const fdRange4Fields = {
	first: r.uint32,
	fd: r.uint16,
};
const fdRange4 = new r.Struct<typeof fdRange4Fields, CFFTable.FDRange>(
	fdRange4Fields,
);

const fdSelectFields = {
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
};

const fdSelect = new r.VersionedStruct<
	typeof fdSelectFields,
	CFFTable.FDSelect
>(r.uint8, fdSelectFields);

const ptr = new CFFPointer(cffPrivateDict);
export class CFFPrivateOp {
	decode(
		stream: DecodeStream,
		parent: ParsingContext,
		operands: number[],
	): CFFTable.PrivateDictData {
		parent.length = operands[0];
		const decoded = ptr.decode(stream, parent, [operands[1]]);
		return decoded;
	}

	size(dict: CFFTable.PrivateDictData, ctx?: ParsingContext): [number, number] {
		// FIXME: This method has zero test coverage upstream and contains a
		// fatal runtime bug.  Upstream returns `ptr.size(dict, ctx)[0]` as
		// the second item of the array, which crashes because `this` is
		// undefined. I temporarily return `0` for the key size fallback to
		// prevent such crashes, but proper serialisation behaviour for this
		// private dict pointer needs verification.
		return [cffPrivateDict.size(dict, ctx, false), 0];
	}

	encode(
		stream: EncodeStream,
		dict: CFFTable.PrivateDictData,
		ctx?: ParsingContext,
	) {
		const size = cffPrivateDict.size(dict, ctx, false);
		const encoded = ptr.encode(stream, dict, ctx);

		return [size, encoded[0]];
	}
}

const fontDict = new CFFDict<CFFTable.FontDictData>([
	// key, name, type(s), default
	[18, 'Private', new CFFPrivateOp(), null],
	[[12, 38], 'FontName', 'sid', null],
	[[12, 7], 'FontMatrix', 'array', [0.001, 0, 0, 0.001, 0, 0]],
	[[12, 5], 'PaintType', 'number', 0],
]);

const cffTopDict = new CFFDict<CFFTable.TopDictDataV1>([
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

const variationStoreFields = {
	length: r.uint16,
	itemVariationStore: itemVariationStore,
};

const variationStore = new r.Struct<
	typeof variationStoreFields,
	CFFTable.VariationStore
>(variationStoreFields);

const cff2TopDict = new CFFDict<CFFTable.TopDictDataV2>([
	[[12, 7], 'FontMatrix', 'array', [0.001, 0, 0, 0.001, 0, 0]],
	[17, 'CharStrings', new CFFPointer(new CFFIndex()), null],
	[[12, 37], 'FDSelect', new CFFPointer(fdSelect), null],
	[[12, 36], 'FDArray', new CFFPointer(new CFFIndex(fontDict)), null],
	[24, 'vstore', new CFFPointer(variationStore), null],
	[25, 'maxstack', 'number', 193],
]);

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
export const cffTop = new r.VersionedStruct<typeof fields, CFFTable.TopData>(
	r.fixed16,
	fields,
);
