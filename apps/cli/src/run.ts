import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Textdomain } from '@esgettext/runtime';
import * as v from 'valibot';
import '@valibot/i18n/de';
import type { Arguments, Argv } from 'yargs';
import yargs from 'yargs';

import type { Command } from './command.js';
import { FontCommand } from './commands/font.js';
import { TextCommand } from './commands/text.js';
import { defaultOptions } from './default-options.js';
import { loadInput } from './load-input.js';
import { Package } from './package.js';

const commandNames = ['font', 'text'];

const gtx = Textdomain.getInstance('pdf-lab');
v.setGlobalConfig({ lang: Textdomain.locale });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const localePath = path.join(__dirname, 'locale');

export async function run(argv = process.argv.slice(2)): Promise<number> {
	gtx.bindtextdomain(localePath);
	await gtx.resolve();

	try {
		let exitCode = 0;
		const ulocale = Textdomain.locale.replace('-', '_');

		const commands: { [key: string]: Command } = {
			text: new TextCommand(),
			font: new FontCommand(),
		};

		const program = yargs(argv)
			.locale(ulocale)
			.strict()
			.showHelpOnFail(
				false,
				gtx._x(
					"Try '{programName} --help' or '{programName} COMMAND --help' for more information!",
					{
						programName: Package.name,
					},
				),
			)
			.alias('V', 'version')
			.alias('h', 'help')
			.demandCommand(1, gtx._('Error: No command given.'))
			.scriptName(Package.name);

		for (const name of commandNames) {
			const command = commands[name]!;

			const commandName = command.synopsis
				? `${name} ${command.synopsis()}`
				: `${name} [PDF]`;

			program.command({
				command: commandName,
				aliases: command.aliases(),
				describe: command.description(),
				builder: (argv: Argv) => {
					const options = { ...defaultOptions, ...command.options() };
					const builder = argv.options(options);

					return builder
						.positional('file', {
							describe: gtx._('Input file'),
							type: 'string',
							nargs: 1,
						})
						.conflicts('input', 'PDF');
				},
				handler: async (argv: Arguments) => {
					argv._.shift();

					if (typeof argv.PDF !== 'undefined' && (argv.PDF as string).length) {
						argv.input = argv.PDF;
					} else if (
						typeof argv.input === 'undefined' ||
						!(argv.input as string).length
					) {
						argv.input = '-';
					}
					const input = await loadInput(argv.input as string);
					exitCode = await command.run(input, argv);
				},
			});
		}
		const epilogue = gtx._x('Report bugs in the bugtracker at\n{url}!', {
			url: Package.bugTrackerUrl,
		});

		await program.help().epilogue(epilogue).parse();

		return exitCode;
	} catch (exception) {
		console.error(
			gtx._x('{programName}: unhandled exception: {exception}', {
				programName: Package.name,
				exception,
			}),
		);

		throw exception;
	}
}
