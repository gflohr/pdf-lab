import type {
	FontCategory,
	FontDescription,
	FontStyle,
	FontWeight,
} from './font-resolver.js';

export type OsType = 'unix' | 'darwin' | 'win32';

const fontLocations: Record<OsType, string[]> = {
	unix: ['/usr/share/fonts', '/usr/share/fonts/truetype'],
	darwin: ['/System/Library/Fonts/Supplemental', '/System/Library/Fonts'],
	win32: ['C:/Windows/Fonts'],
};

const fontFiles: Record<
	OsType,
	Record<FontCategory, Record<FontWeight, Record<FontStyle, string[]>>>
> = {
	unix: {
		sans: {
			normal: {
				roman: [
					'liberation-fonts/LiberationSans-Regular',
					'dejavu/DejaVuSans',
					'ubuntu/Ubuntu-R',
				],
				italic: [
					'liberation-fonts/LiberationSans-Italic',
					'dejavu/DejaVuSans-Oblique',
					'ubuntu/Ubuntu-I',
				],
			},
			bold: {
				roman: [
					'liberation-fonts/LiberationSans-Bold',
					'dejavu/DejaVuSans-Bold',
					'ubuntu/Ubuntu-B',
				],
				italic: [
					'liberation-fonts/LiberationSans-Italic',
					'dejavu/DejaVuSans-BoldOblique',
					'ubuntu/Ubuntu-BI',
				],
			},
		},
		serif: {
			normal: {
				roman: [
					'liberation-fonts/LiberationSerif-Regular',
					'dejavu/DejaVuSerif',
				],
				italic: [
					'liberation-fonts/LiberationSerif-Italic',
					'dejavu/DejaVuSerif-Oblique',
				],
			},
			bold: {
				roman: [
					'liberation-fonts/LiberationSerif-Bold',
					'dejavu/DejaVuSerif-Bold',
				],
				italic: [
					'liberation-fonts/LiberationSerif-Italic',
					'dejavu/DejaVuSerif-BoldOblique',
				],
			},
		},
		mono: {
			normal: {
				roman: [
					'liberation-fonts/LiberationMon-Regular',
					'dejavu/DejaVuSansMono',
					'ubuntu/UbuntuMono-R',
				],
				italic: [
					'liberation-fonts/LiberationMon-Italic',
					'dejavu/DejaVuSansMono-Oblique',
					'ubuntu/UbuntuMono-I',
				],
			},
			bold: {
				roman: [
					'liberation-fonts/LiberationMono-Bold',
					'dejavu/DejaVuSansMono-Bold',
					'ubuntu/UbuntuMono-B',
				],
				italic: [
					'liberation-fonts/LiberationMono-Italic',
					'dejavu/DejaVuSansMono-BoldOblique',
					'ubuntu/UbuntuMono-BI',
				],
			},
		},
		symbol: {
			normal: {
				roman: [],
				italic: [
					/* empty */
				],
			},
			bold: {
				roman: [
					/* empty */
				],
				italic: [
					/* empty */
				],
			},
		},
		zapfdingbats: {
			normal: {
				roman: [],
				italic: [
					/* empty */
				],
			},
			bold: {
				roman: [
					/* empty */
				],
				italic: [
					/* empty */
				],
			},
		},
	},
	darwin: {
		sans: {
			normal: {
				roman: ['Arial'],
				italic: ['Arial Italic'],
			},
			bold: {
				roman: ['Arial Bold'],
				italic: ['Arial Bold Italic'],
			},
		},
		serif: {
			normal: {
				roman: ['Times New Roman'],
				italic: ['Times New Roman Italic'],
			},
			bold: {
				roman: ['Times New Roman Bold'],
				italic: ['Times New Roman Bold Italic'],
			},
		},
		mono: {
			normal: {
				roman: ['Courier New'],
				italic: ['Courier New Italic'],
			},
			bold: {
				roman: ['Courier New Bold'],
				italic: ['Courier New Bold Italic'],
			},
		},
		symbol: {
			normal: {
				roman: ['Symbol'],
				italic: [
					/* empty */
				],
			},
			bold: {
				roman: [
					/* empty */
				],
				italic: [
					/* empty */
				],
			},
		},
		zapfdingbats: {
			normal: {
				roman: ['ZapfDingbats'],
				italic: [
					/* empty */
				],
			},
			bold: {
				roman: [
					/* empty */
				],
				italic: [
					/* empty */
				],
			},
		},
	},
	win32: {
		sans: {
			normal: {
				roman: ['arial'],
				italic: ['ariali'],
			},
			bold: {
				roman: ['arialbd'],
				italic: ['arialbi'],
			},
		},
		serif: {
			normal: {
				roman: ['times'],
				italic: ['timesi'],
			},
			bold: {
				roman: ['timesb'],
				italic: ['timesbi'],
			},
		},
		mono: {
			normal: {
				roman: ['cour'],
				italic: ['couri'],
			},
			bold: {
				roman: ['courb'],
				italic: ['courbi'],
			},
		},
		symbol: {
			normal: {
				roman: ['symbol'],
				italic: [
					/* empty */
				],
			},
			bold: {
				roman: [
					/* empty */
				],
				italic: [
					/* empty */
				],
			},
		},
		zapfdingbats: {
			normal: {
				roman: ['winbats'],
				italic: [
					/* empty */
				],
			},
			bold: {
				roman: [
					/* empty */
				],
				italic: [
					/* empty */
				],
			},
		},
	},
};

export class FontLoader {
	constructor(private readonly platform: OsType | undefined) {}

	public async load(
		font: FontDescription,
		fontName: string,
	): Promise<Uint8Array | undefined> {
		const isNode =
			Object.prototype.toString.call(
				typeof process !== 'undefined' ? process : 0,
			) === '[object process]';
		if (!isNode || !this.platform) {
			throw new Error(
				`The font '${fontName}' is not embedded, and no replacement font has been specified.`,
			);
		} else {
			const fs = await import('node:fs/promises');
			const map = fontFiles[this.platform] ?? fontFiles.unix;
			const locations = fontLocations[this.platform] ?? fontLocations.unix;
			const candidates = map[font.category][font.weight][font.style];
			const extensions = ['ttf', 'otf'];
			for (let i = 0; i < candidates.length; ++i) {
				for (let j = 0; j < locations.length; ++j) {
					for (let k = 0; k < extensions.length; ++k) {
						const fullname = `${locations[j]}/${candidates[i]}.${extensions[k]}`;
						try {
							const fontBytes = await fs.readFile(fullname);
							if (fontBytes) return fontBytes;
						} catch {}
					}
				}
			}
		}
	}

	public async loadFromPath(
		fontName: string,
		path: string,
	): Promise<Uint8Array> {
		const isNode =
			Object.prototype.toString.call(
				typeof process !== 'undefined' ? process : 0,
			) === '[object process]';
		if (!isNode || !this.platform) {
			throw new Error(
				`The font '${fontName}' is not embedded, and cannot be loaded from the file system.`,
			);
		} else {
			const fs = await import('node:fs/promises');

			return await fs.readFile(path);
		}
	}
}
