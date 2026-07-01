import type { EncodeStream } from '@pdf-lib/restructure';
import type { CFFDict } from '../cff/cff-dict.js';
import type { CFFFont } from '../cff/cff-font.js';
import type { CFFIndexRecord } from '../cff/cff-index.js';
import { standardStrings } from '../cff/cff-standard-strings.js';
import { type CFFTopData, cffTop } from '../cff/cff-top.js';
import { CFFGlyph } from '../glyph/cff-glyph.js';
import type { TrueTypeFont } from '../true-type-font.js';
import { Subset } from './subset.js';

export class CFFSubset extends Subset {
	private readonly cff: CFFFont;
	private charstrings: Uint8Array[] = [];
	private gsubrs?: Uint8Array[];
	private strings?: string[];

	constructor(protected font: TrueTypeFont) {
		super(font);

		this.cff = this.font['CFF '];
		if (!this.cff) {
			throw new Error('Not a CFF Font');
		}
	}

	private subsetCharstrings(): void {
		this.charstrings = [];
		const gsubrs: Record<number, boolean> = {};

		for (const gid of this.glyphs) {
			this.charstrings.push(this.cff.getCharString(gid));

			const glyph = this.getGlyph(gid);

			// FIXME! The getter must have a side-effect.
			glyph.path; // this causes the glyph to be parsed

			// FIXME! Actually, subr is a number. But converting it to a
			// number breaks things.
			for (const subr in glyph.usedGsubrs) {
				gsubrs[subr] = true;
			}
		}

		this.gsubrs = this.subsetSubrs(this.cff.globalSubrIndex, gsubrs);
	}

	private subsetSubrs(
		subrs: CFFIndexRecord[],
		used: Record<number, boolean>,
	): Uint8Array[] {
		const res: Uint8Array[] = [];
		for (let i = 0; i < subrs.length; i++) {
			const subr = subrs[i];
			if (used[i]) {
				this.cff.stream.pos = subr.offset;
				res.push(this.cff.stream.readBuffer(subr.length));
			} else {
				res.push(Buffer.from([11])); // return
			}
		}

		return res;
	}

	private subsetFontdict(topDict: CFFDict) {
		const fdArray: Record<string, unknown>[] = [];
		topDict.FDArray = fdArray;

		const fds: number[] = [];
		const fdSelect = {
			version: 0,
			fds,
		};
		topDict.FDSelect = fdSelect;

		const fdMap: Record<number, number> = {};
		const used_subrs: Record<number, boolean>[] = [];
		for (const gid of this.glyphs) {
			const fd = this.cff.fdForGlyph(gid);
			if (fd == null) {
				continue;
			}

			if (fdMap[fd] == null) {
				fdArray.push(Object.assign({}, this.cff.topDict.FDArray[fd]));
				used_subrs.push({});
				fdMap[fd] = fdArray.length - 1;
			}

			const subsetFdIndex = fdMap[fd];
			fdSelect.fds.push(subsetFdIndex);

			const glyph = this.getGlyph(gid);

			glyph.path; // this causes the glyph to be parsed
			for (const subr in glyph.usedSubrs) {
				used_subrs[subsetFdIndex][subr] = true;
			}
		}

		for (let i = 0; i < fdArray.length; i++) {
			const dict = fdArray[i] as {
				FontName: unknown;
				Private?: Record<string, CFFIndexRecord[] | Uint8Array[]>;
			};
			delete dict.FontName;
			if (dict.Private?.Subrs) {
				dict.Private = Object.assign({}, dict.Private);
				dict.Private.Subrs = this.subsetSubrs(
					dict.Private.Subrs as CFFIndexRecord[],
					used_subrs[i],
				);
			}
		}

		return;
	}

	private createCIDFontdict(topDict: CFFDict) {
		const used_subrs: Record<string, boolean> = {};
		for (const gid of this.glyphs) {
			const glyph = this.getGlyph(gid);

			// FIXME! The getter must have a side-effect.
			glyph.path; // this causes the glyph to be parsed

			for (const subr in glyph.usedSubrs) {
				used_subrs[subr] = true;
			}
		}

		const privateDict = Object.assign({}, this.cff.topDict.Private);
		if (this.cff.topDict.Private?.Subrs) {
			privateDict.Subrs = this.subsetSubrs(
				this.cff.topDict.Private.Subrs,
				used_subrs,
			);
		}

		topDict.FDArray = [{ Private: privateDict }];
		topDict.FDSelect = {
			version: 3,
			nRanges: 1,
			ranges: [{ first: 0, fd: 0 }],
			sentinel: this.charstrings.length,
		};

		return topDict.FDSelect;
	}

	private addString(str: string | null) {
		if (!str) {
			return null;
		}

		if (!this.strings) {
			this.strings = [];
		}

		this.strings.push(str);

		return standardStrings.length + this.strings.length - 1;
	}

	encode(stream: EncodeStream) {
		this.subsetCharstrings();

		const charset = {
			version: this.charstrings.length > 255 ? 2 : 1,
			ranges: [{ first: 1, nLeft: this.charstrings.length - 2 }],
		};

		const topDict = Object.assign({}, this.cff.topDict) as CFFDict;
		topDict.Private = null;
		topDict.charset = charset;
		topDict.Encoding = null;
		topDict.CharStrings = this.charstrings;

		for (const key of [
			'version',
			'Notice',
			'Copyright',
			'FullName',
			'FamilyName',
			'Weight',
			'PostScript',
			'SFNTFontName',
			'FontName',
		]) {
			topDict[key] = this.addString(
				this.cff.string(topDict[key] as number | null),
			);
		}

		topDict.ROS = [this.addString('Adobe'), this.addString('Identity'), 0];
		topDict.CIDCount = this.charstrings.length;

		if (this.cff.isCIDFont) {
			this.subsetFontdict(topDict);
		} else {
			this.createCIDFontdict(topDict);
		}

		const top = {
			version: 1,
			hdrSize: this.cff.hdrSize,
			offSize: this.cff.length,
			header: this.cff.header,
			nameIndex: [this.cff.postscriptName],
			topDictIndex: [topDict],
			stringIndex: this.strings,
			globalSubrIndex: this.gsubrs,
		} as unknown as CFFTopData;

		cffTop.encode(stream, top);
	}

	private getGlyph(gid: number): CFFGlyph {
		const glyph = this.font.getGlyph(gid);

		if (!(glyph instanceof CFFGlyph)) {
			throw new Error(
				'CFF subset cannot contain glyphs that are not CFF glyphs',
			);
		}

		return glyph;
	}
}
