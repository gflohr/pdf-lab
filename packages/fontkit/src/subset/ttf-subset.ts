import type { EncodeStream } from '@pdf-lib/restructure';
import type Path from '../glyph/path.js';
import TTFGlyph from '../glyph/ttf-glyph.js';
import TTFGlyphEncoder from '../glyph/ttf-glyph-encoder.js';
import Directory, { type SFNTDirectoryEntry } from '../tables/directory.js';
import type { hmtxTable } from '../tables/hmtx.js';
import Tables from '../tables/index.js';
import type { TrueTypeFont } from '../true-type-font.js';
import Subset from './subset.js';

type Glyf = Uint8Array[];
interface Loca {
	version?: number;
	offsets: number[];
}
interface Hmtx {
	metrics: hmtxTable.Entry[];
	bearings: number[];
}

export default class TTFSubset extends Subset {
	private readonly glyphEncoder: TTFGlyphEncoder;
	private offset?: number;
	private glyf?: Glyf;
	private loca?: Loca;
	private hmtx?: Hmtx;

	constructor(font: TrueTypeFont) {
		super(font);
		this.glyphEncoder = new TTFGlyphEncoder();
	}

	private addGlyph(gid: number): number {
		const glyph = this.getGlyph(gid);
		const glyf = glyph.decode();

		// Get the offset to the glyph from the loca table.
		const curOffset = this.font.loca.offsets[gid];
		const nextOffset = this.font.loca.offsets[gid + 1];

		const stream = this.font.getGlyfTableStream();
		if (!stream) {
			throw new Error("Cannot get 'glyf' table stream");
		}
		stream.pos += curOffset;

		let buffer = stream.readBuffer(nextOffset - curOffset);

		// if it is a compound glyph, include its components
		if (glyf && glyf.numberOfContours < 0) {
			buffer = new Uint8Array(buffer);
			const view = new DataView(
				buffer.buffer,
				buffer.byteOffset,
				buffer.byteLength,
			);

			for (const component of glyf.components || []) {
				gid = this.includeGlyph(component.glyphID);
				view.setUint16(component.pos, gid, false);
			}
		} else if (glyf && this.font.variationProcessor) {
			// If this is a TrueType variation glyph, re-encode the path
			buffer = this.glyphEncoder.encodeSimple(
				glyph.path as Path,
				glyf.instructions,
			);
		}

		this.glyf!.push(buffer);
		this.loca!.offsets.push(this.offset!);

		this.hmtx!.metrics.push({
			advance: glyph.advanceWidth,
			bearing: glyph.getMetrics().leftBearing,
		});

		this.offset! += buffer.length;

		return this.glyf!.length - 1;
	}

	encode(stream: EncodeStream) {
		// tables required by PDF spec:
		//   head, hhea, loca, maxp, cvt , prep, glyf, hmtx, fpgm
		//
		// additional tables required for standalone fonts:
		//   name, cmap, OS/2, post

		this.glyf = [];
		this.offset = 0;
		this.loca = {
			offsets: [],
		};

		this.hmtx = {
			metrics: [],
			bearings: [],
		};

		// include all the glyphs
		// not using a for loop because we need to support adding more
		// glyphs to the array as we go, and CoffeeScript caches the length.
		let i = 0;
		while (i < this.glyphs.length) {
			this.addGlyph(this.glyphs[i++]);
		}

		const maxp = structuredClone(this.font.maxp);
		maxp.numGlyphs = this.glyf.length;

		this.loca.offsets.push(this.offset);
		(Tables.loca.preEncode as () => void).call(this.loca);

		const head = structuredClone(this.font.head) as typeof this.font.head & {
			indexToLocFormat: number;
		};
		head.indexToLocFormat = this.loca.version!;

		const hhea = structuredClone(this.font.hhea) as typeof this.font.hhea & {
			numberOfMetrics: number;
		};
		hhea.numberOfMetrics = this.hmtx.metrics.length;

		// map = []
		// for index in [0...256]
		//     if index < @numGlyphs
		//         map[index] = index
		//     else
		//         map[index] = 0
		//
		// cmapTable =
		//     version: 0
		//     length: 262
		//     language: 0
		//     codeMap: map
		//
		// cmap =
		//     version: 0
		//     numSubtables: 1
		//     tables: [
		//         platformID: 1
		//         encodingID: 0
		//         table: cmapTable
		//     ]

		// TODO: subset prep, cvt, fpgm?
		Directory.encode(stream, {
			tables: {
				head,
				hhea,
				loca: this.loca,
				maxp,
				'cvt ': this.font['cvt '],
				prep: this.font.prep,
				glyf: this.glyf,
				hmtx: this.hmtx,
				fpgm: this.font.fpgm,

				// name: clone @font.name
				// 'OS/2': clone @font['OS/2']
				// post: clone @font.post
				// cmap: cmap
			} as Record<string, SFNTDirectoryEntry | Record<string, any>>,
		});
	}

	private getGlyph(gid: number): TTFGlyph {
		const glyph = this.font.getGlyph(gid);

		if (!(glyph instanceof TTFGlyph)) {
			throw new Error(
				'TrueType font subset cannot contain glyphs that are not TrueType glyphs',
			);
		}

		return glyph;
	}
}
