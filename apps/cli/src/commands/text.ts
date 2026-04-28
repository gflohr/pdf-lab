import { Textdomain } from '@esgettext/runtime';
import * as yaml from 'js-yaml';
import { PDFLab } from 'pdf-lab-core';
import type { Arguments, InferredOptionTypes } from 'yargs';
import type { Command } from '../command.js';
import { defaultOptions } from '../default-options.js';
import { coerceOptions, type OptSpec } from '../util/optspec.js';
import { Package } from '../package.js';
import { type FontInfoDto, toFontInfoDto } from '../util/font-info-dto.js';

const gtx = Textdomain.getInstance('pdf-lab');

const options: {
	format: OptSpec;
} = {
	format: {
		group: gtx._('Output format'),
		alias: ['f'],
		type: 'string',
		choices: ['text', 'json', 'yaml'],
		default: 'text',
		describe: gtx._('the output format'),
	},
};

const allOptions = { ...defaultOptions, ...options };
export type ConfigOptions = InferredOptionTypes<typeof allOptions>;

type OutputTextBlock = {
	text: string;
	font: FontInfoDto;
	pageNumber: number;
};

export class TextCommand implements Command {
	description(): string {
		return gtx._('Extract text from a PDF document.');
	}

	aliases(): Array<string> {
		return [];
	}

	options(): Record<string, OptSpec> {
		return options;
	}

	private async doRun(input: Buffer, configOptions: ConfigOptions) {
		const lab = await PDFLab.from(input);

		const blocks = await lab.extractText();
		if (configOptions.format === 'text') {
			console.log(blocks.map((b) => b.text).join('\n'));
			return;
		}

		const textBlocksDto: OutputTextBlock[] = blocks.map((block) => {
			const textBlockDto = {
				text: block.text,
				font: toFontInfoDto(block.font),
				pageNumber: block.pageNumber,
			};

			return textBlockDto;
		});

		if (configOptions.format === 'yaml') {
			console.log(yaml.dump(textBlocksDto));
		} else {
			console.log(JSON.stringify(textBlocksDto));
		}
	}

	public async run(input: Buffer, argv: Arguments): Promise<number> {
		const configOptions = argv as unknown as ConfigOptions;

		if (!coerceOptions(argv, options)) {
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
