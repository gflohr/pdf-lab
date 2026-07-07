import * as r from 'restructure';
import { TrueTypeFont } from './true-type-font.js';

const DFontName = new r.String(r.uint8);

interface Ref {
	id: number;
	nameOffset: number;
	name?: string | null;
	attr: number;
	dataOffset: number;
	handle: number;
}

const refFields = {
	id: r.uint16,
	nameOffset: r.int16,
	attr: r.uint8,
	dataOffset: r.uint24,
	handle: r.uint32,
};
const ref = new r.Struct<typeof refFields, Ref>(refFields);

interface ResourceTypeEntry {
	name: string;
	maxTypeIndex: number;
	refList: Ref[];
}
const resourceTypeEntryFields = {
	name: new r.String(4),
	maxTypeIndex: r.uint16,
	refList: new r.Pointer(
		r.uint16,
		new r.Array(ref, (t) => t.maxTypeIndex + 1),
		{ type: 'parent' },
	),
};
const resourceTypeEntry = new r.Struct<
	typeof resourceTypeEntryFields,
	ResourceTypeEntry
>(resourceTypeEntryFields);

interface ResourceTypeList {
	length: number;
	types: ResourceTypeEntry[];
}

const resourceTypeListFields = {
	length: r.uint16,
	types: new r.Array(resourceTypeEntry, (t) => t.length + 1),
};
const resourceTypeList = new r.Struct<
	typeof resourceTypeListFields,
	ResourceTypeList
>(resourceTypeListFields);

interface DFontMap {
	typeList: ResourceTypeList;
	nameListOffset: number;
}

const dFontMapFields = {
	reserved: new r.Reserved(r.uint8, 24),
	typeList: new r.Pointer(r.uint16, resourceTypeList),
	nameListOffset: new r.Pointer(r.uint16, 'void'),
};
const dFontMap = new r.Struct<typeof dFontMapFields, DFontMap>(dFontMapFields);

interface DFontHeader {
	dataOffset: number;
	map: DFontMap;
	dataLength: number;
	mapLength: number;
}

const dfontHeaderFields = {
	dataOffset: r.uint32,
	map: new r.Pointer(r.uint32, dFontMap),
	dataLength: r.uint32,
	mapLength: r.uint32,
};
const dFontHeader = new r.Struct<typeof dfontHeaderFields, DFontHeader>(
	dfontHeaderFields,
);

export class DFont {
	private readonly stream: r.DecodeStream;
	private readonly header: DFontHeader;
	private readonly sfnt?: ResourceTypeEntry;

	static probe(buffer: Buffer) {
		const stream = new r.DecodeStream(buffer);
		let header: DFontHeader;

		try {
			header = dFontHeader.decode(stream);
		} catch {
			return false;
		}

		for (const type of header.map.typeList.types) {
			if (type.name === 'sfnt') {
				return true;
			}
		}

		return false;
	}

	constructor(streamOrBuffer: Uint8Array | r.DecodeStream) {
		if (streamOrBuffer instanceof Uint8Array) {
			this.stream = new r.DecodeStream(streamOrBuffer);
		} else {
			this.stream = streamOrBuffer;
		}

		this.header = dFontHeader.decode(this.stream);

		for (const type of this.header.map.typeList.types) {
			for (const ref of type.refList) {
				if (ref.nameOffset >= 0) {
					this.stream.pos = ref.nameOffset + this.header.map.nameListOffset;
					ref.name = DFontName.decode(this.stream);
				} else {
					ref.name = null;
				}
			}

			if (type.name === 'sfnt') {
				this.sfnt = type;
			}
		}
	}

	public getFont(name: string | Uint8Array): TrueTypeFont | null {
		if (!this.sfnt) {
			return null;
		}

		for (const ref of this.sfnt.refList) {
			const font = this.decodeFont(ref);
			if (
				font.postscriptName === name ||
				(font.postscriptName instanceof Uint8Array &&
					name instanceof Uint8Array &&
					font.postscriptName.every((v, i) => name[i] === v))
			) {
				return font;
			}
		}

		return null;
	}

	public get fonts(): TrueTypeFont[] {
		return this.sfnt
			? this.sfnt.refList.map((ref) => this.decodeFont(ref))
			: [];
	}

	private decodeFont(ref: Ref): TrueTypeFont {
		const pos = this.header.dataOffset + ref.dataOffset + 4;
		const stream = new r.DecodeStream(this.stream.buffer.slice(pos));
		return new TrueTypeFont(stream);
	}
}
