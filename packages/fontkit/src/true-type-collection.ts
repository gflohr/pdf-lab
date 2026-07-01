import r, { type DecodeStream } from '@pdf-lib/restructure';
import { TrueTypeFont } from './true-type-font.js';

export namespace TTCTable {
	export interface HeaderV1 {
		version: 0x00010000; // Version 1.0
		numFonts: number;
		offsets: number[];
	}

	export interface HeaderV2 {
		version: 0x00020000; // Version 2.0
		numFonts: number;
		offsets: number[];
		dsigTag: number;
		dsigLength: number;
		dsigOffset: number;
	}

	export type Header = HeaderV1 | HeaderV2;
}

const ttcHeaderFields = {
	// Hex literals align perfectly with Fixed 16.16 versions
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

// Use r.uint32 as the fixed version discriminator block
const TTCHeader = new r.VersionedStruct<
	typeof ttcHeaderFields,
	TTCTable.Header
>(r.uint32, ttcHeaderFields);

export class TrueTypeCollection {
	private stream: DecodeStream;
	private header: TTCTable.Header;

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
