import { Textdomain } from '@esgettext/runtime';
import * as yaml from 'js-yaml';
import { PDFLab } from 'pdf-lab-core';
import type { Arguments, InferredOptionTypes } from 'yargs';
import type { Command } from '../command.js';
import { defaultOptions } from '../default-options.js';
import { coerceOptions, type OptSpec } from '../optspec.js';
import { Package } from '../package.js';
import { toFontInfoDto } from '../util/font-info-dto.js';

const gtx = Textdomain.getInstance('pdf-lab');

const options: {
	list: OptSpec;
	format: OptSpec;
} = {
	list: {
		group: gtx._('Mode of Operation'),
		alias: ['l'],
		type: 'boolean',
		describe: gtx._('list fonts'),
	},
	format: {
		group: gtx._('Listing Output Format'),
		alias: ['f'],
		type: 'string',
		choices: ['text', 'json', 'yaml'],
		default: 'text',
		describe: gtx._('the output format'),
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

	private listFonts(lab: PDFLab, format: string) {
		const fonts = lab.collectFonts();

		if (format === 'text') {
			const uniqueFontNames = new Set(
				[...fonts.values()].map((v) => v.fontName),
			);

			console.log([...uniqueFontNames].join('\n'));

			return;
		}

		const fontsDto = [...fonts.values()].map(toFontInfoDto);

		if (format === 'yaml') {
			console.log(yaml.dump(fontsDto));
		} else {
			console.log(JSON.stringify(fontsDto));
		}
	}

	private async doRun(input: Buffer, configOptions: ConfigOptions) {
		const lab = await PDFLab.from(input);

		if (configOptions.list) {
			this.listFonts(lab, configOptions.format as string);
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
			console.error(
				gtx._x('{programName}: {error}', {
					programName: Package.name,
					error: e,
				}),
			);

			return 1;
		}
	}
}
