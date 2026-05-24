import r from '@pdf-lib/restructure';
import { TTFFont } from './TTFFont.js';

const TTCHeader = new r.VersionedStruct(r.uint32, {
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
});

export default class TrueTypeCollection {
	static probe(buffer) {
		return buffer.toString('ascii', 0, 4) === 'ttcf';
	}

	constructor(stream) {
		this.stream = stream;
		if (stream.readString(4) !== 'ttcf') {
			throw new Error('Not a TrueType collection');
		}

		this.header = TTCHeader.decode(stream);
	}

	getFont(name) {
		for (const offset of this.header.offsets) {
			const stream = new r.DecodeStream(this.stream.buffer);
			stream.pos = offset;
			const font = new TTFFont(stream);
			if (font.postscriptName === name) {
				return font;
			}
		}

		return null;
	}

	get fonts() {
		const fonts = [];
		for (const offset of this.header.offsets) {
			const stream = new r.DecodeStream(this.stream.buffer);
			stream.pos = offset;
			fonts.push(new TTFFont(stream));
		}

		return fonts;
	}
}
