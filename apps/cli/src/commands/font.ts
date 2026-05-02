import * as os from 'node:os';
import { Textdomain } from '@esgettext/runtime';
import fontkit from '@pdf-lib/fontkit';
import * as yaml from 'js-yaml';
import { type FontInfo, PDFLab } from 'pdf-lab-core';
import type { Arguments, InferredOptionTypes } from 'yargs';
import type { Command } from '../command.js';
import { defaultOptions } from '../default-options.js';
import { Package } from '../package.js';
import { toFontInfoDto } from '../util/font-info-dto.js';
import { fontMapSpec } from '../util/font-map-spec.js';
import { coerceOptions, type OptSpec } from '../util/optspec.js';
import { writeOutput } from '../util/write-output.js';

const gtx = Textdomain.getInstance('pdf-lab');

const options: {
	embed: OptSpec;
	list: OptSpec;
	output: OptSpec;
	'base-font': OptSpec;
	font: OptSpec;
	format: OptSpec;
	'font-map': OptSpec;
	'fc-match': OptSpec;
	compress: OptSpec;
} = {
	embed: {
		group: gtx._('Mode of Operation'),
		alias: ['e'],
		type: 'boolean',
		conflicts: ['list'],
		describe: gtx._('embed fonts'),
	},
	list: {
		group: gtx._('Mode of Operation'),
		alias: ['l'],
		type: 'boolean',
		conflicts: ['embed'],
		describe: gtx._('list fonts'),
	},
	output: {
		group: gtx._('Output location'),
		alias: ['o'],
		type: 'string',
		default: '-',
		describe: gtx._("output file location ('-' for standard output)"),
	},
	'base-font': {
		group: gtx._('Selection of Fonts'),
		alias: ['b'],
		type: 'string',
		multi: true,
		describe: gtx._('limit to base-font(s)'),
	},
	font: {
		group: gtx._('Selection of Fonts'),
		alias: ['b', 'font-name'],
		type: 'string',
		multi: true,
		describe: gtx._('limit to font-name'),
	},
	format: {
		group: gtx._('Listing Output Format'),
		type: 'string',
		choices: ['text', 'json', 'yaml'],
		default: 'text',
		describe: gtx._('the output format'),
	},
	'fc-match': {
		group: gtx._('Font Embedding Options'),
		type: 'string',
		default: 'fc-match',
		describe: gtx._("path to the 'fc-match' program"),
	},
	'font-map': {
		group: gtx._('Font Embedding Options'),
		type: 'string',
		multi: true,
		describe: gtx._('font mapping (FONT_NAME:PATH[:POSTSCRIPT_NAME]'),
	},
	compress: {
		group: gtx._('Font Embedding Options'),
		type: 'boolean',
		default: true,
		describe: gtx._('compress embedded fonts'),
	},
};

const allOptions = { ...defaultOptions, ...options };
export type ConfigOptions = InferredOptionTypes<typeof allOptions>;

export class FontCommand implements Command {
	description(): string {
		return gtx._('List fonts from a PDF document.');
	}

	aliases(): Array<string> {
		return [];
	}

	options(): Record<string, OptSpec> {
		return options;
	}

	private getFonts(
		lab: PDFLab,
		configOptions: ConfigOptions,
	): Map<string, FontInfo> {
		const fonts = lab.collectFonts();

		const fontNames = configOptions.font as string[] | undefined;
		const baseFonts = configOptions['base-font'] as string[] | undefined;

		if (baseFonts || fontNames) {
			return new Map(
				[...fonts.entries()].filter(
					([, font]) =>
						(font.fontName !== undefined &&
							fontNames?.includes(font.fontName)) ??
						(font.baseFont !== undefined && baseFonts?.includes(font.baseFont)),
				),
			);
		}

		return fonts;
	}

	private async embedFonts(lab: PDFLab, configOptions: ConfigOptions) {
		const fonts = this.getFonts(lab, configOptions);
		const refs = [...fonts.values()].map((f) => f.ref);
		const fontMap = fontMapSpec((configOptions['font-map'] ?? []) as string[]);

		await lab.embedFonts(refs, {
			fontMap,
			fcMatch: configOptions['fc-match'] as string,
			platform: os.platform(),
			fontkit,
		});

		await writeOutput(configOptions.output as string, lab);
	}

	private listFonts(lab: PDFLab, configOptions: ConfigOptions) {
		const fonts = this.getFonts(lab, configOptions);

		if (configOptions.format === 'text') {
			const uniqueFontNames = new Set(
				[...fonts.values()].map((v) => v.fontName),
			);

			console.log([...uniqueFontNames].join('\n'));

			return;
		}

		const fontsDto = [...fonts.values()].map(toFontInfoDto);

		if (configOptions.format === 'yaml') {
			console.log(yaml.dump(fontsDto));
		} else {
			console.log(JSON.stringify(fontsDto));
		}
	}

	private async doRun(input: Buffer, configOptions: ConfigOptions) {
		const lab = await PDFLab.from(input);

		if (configOptions.list) {
			this.listFonts(lab, configOptions);
		} else if (configOptions.embed) {
			await this.embedFonts(lab, configOptions);
		} else {
			throw new Error(gtx._('nothing to do'));
		}
	}

	public async run(input: Buffer, argv: Arguments): Promise<number> {
		const configOptions = argv as unknown as ConfigOptions;

		if (!coerceOptions(argv, options)) {
			console.warn('coerce failed :(');
			return 1;
		}

		try {
			await this.doRun(input, configOptions);
			return 0;
		} catch (e) {
			console.trace(
				gtx._x('{programName}: {error}', {
					programName: Package.name,
					error: e,
				}),
			);

			return 1;
		}
	}
}
