import brotli from 'brotli/decompress.js';
import * as r from 'restructure';
import type { Glyph } from './glyph/glyph.js';
import {
	type DecodedCompositeGlyph,
	type DecodedGlyph,
	Point,
	TrueTypeGlyph,
} from './glyph/true-type-glyph.js';
import { WOFF2Glyph } from './glyph/woff2-glyph.js';
import type { SFNTDirectoryEntry } from './tables/directory.js';
import type { tables } from './tables/index.js';
import type { WOFF2Directory } from './tables/woff2-directory.js';
import { woff2DirectoryStruct } from './tables/woff2-directory.js';
import { TrueTypeFont } from './true-type-font.js';
import type { TrueTypeSubsetFont } from './true-type-subset-font.js';
import { asciiDecoder } from './utils.js';

/**
 * Subclass of TrueTypeFont that represents a TTF/OTF font compressed by WOFF2
 * See spec here: http://www.w3.org/TR/WOFF2/
 */
export class WOFF2Font extends TrueTypeFont<WOFF2Directory> {
	private dataPos?: number;
	// DO NOT initialize this inline (e.g., `= false`).
	//
	// See https://www.guido-flohr.net/a-javascript-lifecycle-trap-how-class-field-initialisers-break-inheritance/
	private decompressed: boolean;
	public transformedGlyphs?: DecodedGlyph[];

	public static probe(buffer: Uint8Array) {
		return asciiDecoder.decode(buffer.slice(0, 4)) === 'wOF2';
	}

	constructor(
		streamOrBuffer: Uint8Array | r.DecodeStream,
		variationCoords: number[] | null = null,
	) {
		super(streamOrBuffer, variationCoords);
		this.decompress();
		this.decompressed = true;
	}

	protected decodeDirectory(): WOFF2Directory {
		const directory = woff2DirectoryStruct.decode(this.stream);

		this.dataPos = this.stream.pos;

		return directory;
	}

	private decompress() {
		this.stream.pos = this.dataPos!;
		const buffer = this.stream.readBuffer(this.directory.totalCompressedSize);

		let decompressedSize = 0;
		for (const tag in this.directory.tables) {
			const entry = this.directory.tables[tag];
			entry.offset = decompressedSize;
			decompressedSize +=
				entry.transformLength != null ? entry.transformLength : entry.length;
		}

		const decompressed = brotli(buffer as Buffer, decompressedSize);
		if (!decompressed) {
			throw new Error('Error decoding compressed data in WOFF2');
		}

		this.stream = new r.DecodeStream(Buffer.from(decompressed));
	}

	protected decodeTable<K extends keyof typeof tables>(
		table: SFNTDirectoryEntry,
	): ReturnType<(typeof tables)[K]['decode']> | null {
		if (!this.decompressed) {
			throw new Error(
				`Attempt to access uninitialised font table data '${table.tag}'!`,
			);
		}

		return super.decodeTable<K>(table as unknown as SFNTDirectoryEntry);
	}

	// Override this method to get a glyph and return our
	// custom subclass if there is a glyf table.
	public getBaseGlyph(glyph: number, characters: number[] = []): Glyph | null {
		const tables = this.directory.tables;
		if (!this.glyphs[glyph]) {
			if (tables.glyf?.transformed) {
				if (!this.transformedGlyphs) {
					this.transformGlyfTable();
				}

				this.glyphs[glyph] = new WOFF2Glyph(glyph, characters, this);
				return this.glyphs[glyph];
			} else {
				return super.getBaseGlyph(glyph, characters);
			}
		}

		return null;
	}

	private transformGlyfTable() {
		const tables = this.directory.tables;
		this.stream.pos = tables.glyf!.offset;
		const table = GlyfTable.decode(this.stream);
		const glyphs: DecodedGlyph[] = [];

		for (let index = 0; index < table.numGlyphs; index++) {
			const glyph: DecodedGlyph = {} as DecodedGlyph;
			const nContours = table.nContours.readInt16BE();
			glyph.numberOfContours = nContours;

			if (nContours > 0) {
				// simple glyph
				const nPoints = [];
				let totalPoints = 0;

				for (let i = 0; i < nContours; i++) {
					const rPoints = read255UInt16(table.nPoints);
					totalPoints += rPoints;
					nPoints.push(totalPoints);
				}

				const points = decodeTriplet(table.flags, table.glyphs, totalPoints);
				for (let i = 0; i < nContours; i++) {
					points[nPoints[i] - 1].endContour = true;
				}

				glyph.points = points;

				read255UInt16(table.glyphs);
			} else if (nContours < 0) {
				// composite glyph
				const haveInstructions = TrueTypeGlyph.prototype.decodeComposite.call(
					{ _font: this },
					glyph as DecodedCompositeGlyph,
					table.composites,
				);
				if (haveInstructions) {
					read255UInt16(table.glyphs);
				}
			}

			glyphs.push(glyph);
		}

		this.transformedGlyphs = glyphs;
	}

	public asTrueTypeSubsetFont(): TrueTypeSubsetFont | null {
		if (!this.decompressed) {
			throw new Error('Attempt to access uninitialised font table data!');
		}

		return super.asTrueTypeSubsetFont();
	}
}

// Special class that accepts a length and returns a sub-stream for that data
class Substream extends r.DecodeStream {
	private buf: r.BufferT;

	constructor(readonly length: r.Length) {
		super(new Uint8Array());
		this.buf = new r.Buffer(this.length);
	}

	decode(stream: r.DecodeStream, parent?: r.ParsingContext): r.DecodeStream {
		return new r.DecodeStream(this.buf.decode(stream, parent));
	}
}

// This struct represents the entire glyf table.
interface GlyfTableData {
	version: number;
	numGlyphs: number;
	indexFormat: number;
	nContourStreamSize: number;
	nPointsStreamSize: number;
	flagStreamSize: number;
	glyphStreamSize: number;
	compositeStreamSize: number;
	bboxStreamSize: number;
	instructionStreamSize: number;
	nContours: Substream;
	nPoints: Substream;
	flags: Substream;
	glyphs: Substream;
	composites: Substream;
	bboxes: Substream;
	instructions: Substream;
}
const fields = {
	version: r.uint32,
	numGlyphs: r.uint16,
	indexFormat: r.uint16,
	nContourStreamSize: r.uint32,
	nPointsStreamSize: r.uint32,
	flagStreamSize: r.uint32,
	glyphStreamSize: r.uint32,
	compositeStreamSize: r.uint32,
	bboxStreamSize: r.uint32,
	instructionStreamSize: r.uint32,
	nContours: new Substream('nContourStreamSize') as r.DecodeStream,
	nPoints: new Substream('nPointsStreamSize'),
	flags: new Substream('flagStreamSize'),
	glyphs: new Substream('glyphStreamSize'),
	composites: new Substream('compositeStreamSize'),
	bboxes: new Substream('bboxStreamSize'),
	instructions: new Substream('instructionStreamSize'),
};
const GlyfTable = new r.Struct<GlyfTableData>(fields);

const WORD_CODE = 253;
const ONE_MORE_BYTE_CODE2 = 254;
const ONE_MORE_BYTE_CODE1 = 255;
const LOWEST_U_CODE = 253;

function read255UInt16(stream: r.DecodeStream) {
	const code = stream.readUInt8();

	if (code === WORD_CODE) {
		return stream.readUInt16BE();
	}

	if (code === ONE_MORE_BYTE_CODE1) {
		return stream.readUInt8() + LOWEST_U_CODE;
	}

	if (code === ONE_MORE_BYTE_CODE2) {
		return stream.readUInt8() + LOWEST_U_CODE * 2;
	}

	return code;
}

function withSign(flag: number, baseval: number): number {
	return flag & 1 ? baseval : -baseval;
}

function decodeTriplet(
	flags: r.DecodeStream,
	glyphs: r.DecodeStream,
	nPoints: number,
) {
	let x = 0;
	let y = 0;
	const res = [];

	for (let i = 0; i < nPoints; i++) {
		let dx = 0,
			dy = 0;
		let flag = flags.readUInt8();
		const onCurve = !(flag >> 7);
		flag &= 0x7f;

		if (flag < 10) {
			dx = 0;
			dy = withSign(flag, ((flag & 14) << 7) + glyphs.readUInt8());
		} else if (flag < 20) {
			dx = withSign(flag, (((flag - 10) & 14) << 7) + glyphs.readUInt8());
			dy = 0;
		} else if (flag < 84) {
			const b0 = flag - 20;
			const b1 = glyphs.readUInt8();
			dx = withSign(flag, 1 + (b0 & 0x30) + (b1 >> 4));
			dy = withSign(flag >> 1, 1 + ((b0 & 0x0c) << 2) + (b1 & 0x0f));
		} else if (flag < 120) {
			const b0 = flag - 84;
			dx = withSign(flag, 1 + ((b0 / 12) << 8) + glyphs.readUInt8());
			dy = withSign(
				flag >> 1,
				1 + (((b0 % 12) >> 2) << 8) + glyphs.readUInt8(),
			);
		} else if (flag < 124) {
			const b1 = glyphs.readUInt8();
			const b2 = glyphs.readUInt8();
			dx = withSign(flag, (b1 << 4) + (b2 >> 4));
			dy = withSign(flag >> 1, ((b2 & 0x0f) << 8) + glyphs.readUInt8());
		} else {
			dx = withSign(flag, glyphs.readUInt16BE());
			dy = withSign(flag >> 1, glyphs.readUInt16BE());
		}

		x += dx;
		y += dy;

		res.push(new Point(onCurve, false, x, y));
	}

	return res;
}
