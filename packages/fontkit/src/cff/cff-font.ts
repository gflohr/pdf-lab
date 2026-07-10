import type { DecodeStream } from 'restructure';
import type { CFFDict } from './cff-dict.js';
import type { CFFIndexRecord } from './cff-index.js';
import type { CFFPrivateDictTable } from './cff-private-dict.js';
import { standardStrings } from './cff-standard-strings.js';
import { cffTop } from './cff-top.js';

export class CFFFont {
	public version!: number;
	private topDictIndex!: CFFDict[];
	public topDict!: Record<string, any>;
	private stringIndex!: string[];
	public isCIDFont!: boolean;
	private nameIndex!: string[];
	public globalSubrIndex!: CFFIndexRecord[];
	// These three properties somehow pop up and are needed for subsetting.
	public hdrSize!: number;
	public length!: number;
	public header!: Uint8Array;

	constructor(public readonly stream: DecodeStream) {
		this.decode();
	}

	static decode(stream: DecodeStream) {
		return new CFFFont(stream);
	}

	decode() {
		const top = cffTop.decode(this.stream);
		for (const k in top) {
			const key = k as keyof typeof top;
			const val = top[key];
			(this as Record<string, unknown>)[key] = val;
		}

		if (this.version !== 2) {
			if (this.topDictIndex.length !== 1) {
				throw new Error('Only a single font is allowed in CFF');
			}

			this.topDict = this.topDictIndex[0];
		}

		this.isCIDFont = 'ROS' in this.topDict && this.topDict.ROS != null;

		return this;
	}

	public size() {
		return 0;
	}
	public encode() {}

	// sid: number | null
	string(sid: number | null) {
		if (sid === null || this.version >= 2) {
			return null;
		}

		if (sid < standardStrings.length) {
			return standardStrings[sid];
		}

		return this.stringIndex[sid - standardStrings.length];
	}

	get postscriptName(): string | null {
		if (this.version < 2) {
			return this.nameIndex[0];
		}

		return null;
	}

	get fullName() {
		return this.string(this.topDict.FullName);
	}

	get familyName() {
		return this.string(this.topDict.FamilyName);
	}

	getCharString(glyph: number): Uint8Array {
		this.stream.pos = this.topDict.CharStrings[glyph].offset;
		return this.stream.readBuffer(this.topDict.CharStrings[glyph].length);
	}

	getGlyphName(gid: number): string | null {
		// CFF2 glyph names are in the post table.
		if (this.version >= 2) {
			return null;
		}

		// CID-keyed fonts don't have glyph names
		if (this.isCIDFont) {
			return null;
		}

		const { charset } = this.topDict;
		if (Array.isArray(charset)) {
			return charset[gid];
		}

		if (gid === 0) {
			return '.notdef';
		}

		gid -= 1;

		switch (charset.version) {
			case 0:
				return this.string(charset.glyphs[gid]);

			case 1:
			case 2:
				for (let i = 0; i < charset.ranges.length; i++) {
					const range = charset.ranges[i];
					if (range.offset <= gid && gid <= range.offset + range.nLeft) {
						return this.string(range.first + (gid - range.offset));
					}
				}
				break;
		}

		return null;
	}

	fdForGlyph(gid: number): number | null {
		if (!this.topDict.FDSelect) {
			return null;
		}

		switch (this.topDict.FDSelect.version) {
			case 0:
				return this.topDict.FDSelect.fds[gid];
			case 3:
			case 4:
				{
					const { ranges } = this.topDict.FDSelect;
					let low = 0;
					let high = ranges.length - 1;

					while (low <= high) {
						const mid = (low + high) >> 1;

						if (gid < ranges[mid].first) {
							high = mid - 1;
						} else if (mid < high && gid >= ranges[mid + 1].first) {
							low = mid + 1;
						} else {
							return ranges[mid].fd;
						}
					}
				}
				throw new Error(
					`Unknown FDSelect version: ${this.topDict.FDSelect.version}`,
				);
			default:
				throw new Error(
					`Unknown FDSelect version: ${this.topDict.FDSelect.version}`,
				);
		}
	}

	// gid: number, @returns { BlueValues: ... }
	privateDictForGlyph(gid: number): CFFPrivateDictTable | null {
		if (this.topDict.FDSelect && this.topDict.FDArray) {
			const fd = this.fdForGlyph(gid);
			if (fd !== null && this.topDict.FDArray[fd]) {
				return this.topDict.FDArray[fd].Private;
			}

			return null;
		}

		if (this.version < 2) {
			return this.topDict.Private;
		}

		return this.topDict.FDArray[0].Private;
	}
}
