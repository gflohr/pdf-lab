import type { FontDescription } from './resolve-font.js';
import type { FontData } from './types.js';

export async function fcMatch(
	desc: FontDescription,
	fcMatchPath: string,
): Promise<FontData | undefined> {
	const isNode =
		Object.prototype.toString.call(
			typeof process !== 'undefined' ? process : 0,
		) === '[object process]';
	if (!isNode) return;

	const { execFile } = await import('node:child_process');
	const { promisify } = await import('node:util');
	const { readFile } = await import('node:fs/promises');

	const execFileAsync = promisify(execFile);

	try {
		// Strip-off vendor suffixes.
		const fontName = desc.fontName.replace(/PSMT$/i, '').replace(/MT$/i, '');
		const query = `${fontName}:slant=${desc.style}:weight=${desc.weight}:width=${desc.width}`;
		const { stdout } = await execFileAsync(fcMatchPath, [
			'--format',
			'%{file} : %{postscriptname}',
			query,
		]);

		const [filename, postScriptName] = stdout.split(' : ', 2);
		if (typeof postScriptName === 'undefined') return;

console.log(`reading file ${filename}`);
		const source = await readFile(filename!);

		return { source, postScriptName };
	} catch {
		return;
	}
}
