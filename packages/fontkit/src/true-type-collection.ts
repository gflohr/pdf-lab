import r, { type DecodeStream } from '@pdf-lib/restructure';
import { TrueTypeFont } from './true-type-font.js';

export interface TrueTypeCollectionTableV65536 {
	numFonts: number;
	offsets: number[];
}

export interface TrueTypeCollectionTableV131072
	extends TrueTypeCollectionTableV65536 {
	dsigTag: number;
	dsigLength: number;
	dsigOffset: number;
}

export type TrueTypeCollectionTable =
	| TrueTypeCollectionTableV65536
	| TrueTypeCollectionTableV65536;

const fields = {
	65536: {
		numFonts: r.uint32,
		offsets: new r.Array(r.uint32, 'numFonts'),
	},
	131072: {
		numFonts: r.uint32,
		offsets: new r.Array(r.uint32, 'numFonts'),
		dsigTag: r.uint32,
		dsigLength: r.uint32,
		dsigOffset: r.uint32,
	},
};

const TTCHeader = new r.VersionedStruct<typeof fields, TrueTypeCollectionTable>(
	r.uint32,
	fields,
);

export default class TrueTypeCollection {
	private stream: DecodeStream;
	private header: TrueTypeCollectionTable;

	static probe(buffer: Buffer) {
		return buffer.toString('ascii', 0, 4) === 'ttcf';
	}

	constructor(stream: DecodeStream) {
		this.stream = stream;
		if (stream.readString(4) !== 'ttcf') {
			throw new Error('Not a TrueType collection');
		}

		this.header = TTCHeader.decode(stream);
	}

	public getFont(name: string): TrueTypeFont | null {
		for (const offset of this.header.offsets) {
			const stream = new r.DecodeStream(this.stream.buffer);
			stream.pos = offset;
			const font = new TrueTypeFont(stream);
			if (font.postscriptName === name) {
				return font;
			}
		}

		return null;
	}

	public get fonts(): TrueTypeFont[] {
		const fonts = [];
		for (const offset of this.header.offsets) {
			const stream = new r.DecodeStream(this.stream.buffer);
			stream.pos = offset;
			fonts.push(new TrueTypeFont(stream));
		}

		return fonts;
	}
}
