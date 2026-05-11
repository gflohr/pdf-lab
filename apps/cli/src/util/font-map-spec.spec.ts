import { describe, expect, it } from 'vitest';
import { fontMapSpec } from './font-map-spec.js';

describe('parse font-map specifications', () => {
	it('should parse font name and path pairs', () => {
		const name = 'Helvetica';
		const filename = '/path/to/Helvetica.ttf';
		const spec = `${name},${filename}`;
		expect(fontMapSpec([spec])).toStrictEqual({
			[name]: {
				source: filename,
				postScriptName: undefined,
			},
		});
	});

	it('should parse font name, path, and PostScript name triples', () => {
		const name = 'Helvetica-Oblique';
		const filename = '/path/to/Helvetica.ttc';
		const psname = 'Helvetica-Oblique';
		const spec = `${name},${filename},${psname}`;
		expect(fontMapSpec([spec])).toStrictEqual({
			[name]: {
				source: filename,
				postScriptName: 'Helvetica-Oblique',
			},
		});
	});

	it('should trim whitespace', () => {
		const name = 'Helvetica-Oblique';
		const filename = '/path/to/Helvetica.ttc';
		const psname = 'Helvetica-Oblique';
		const spec = `${name}\t,  ${filename}, ${psname}`;
		expect(fontMapSpec([spec])).toStrictEqual({
			[name]: {
				source: filename,
				postScriptName: 'Helvetica-Oblique',
			},
		});
	});

	it('should allow escaping', () => {
		const name = 'Helve,,tica';
		const filename = '/pa,,th/t,,o/Hel,,vetica.ttc';
		const psname = 'Helveti,,ca';
		const spec = `${name},${filename},${psname}`;
		expect(fontMapSpec([spec])).toStrictEqual({
			'Helve,tica': {
				source: '/pa,th/t,o/Hel,vetica.ttc',
				postScriptName: 'Helveti,ca',
			},
		});
	});

	it('should trip reject specs with missing paths', () => {
		const name = 'Helvetica-Oblique';
		expect(() => fontMapSpec([name])).toThrow(
			`invalid font map specification '${name}'`,
		);
	});

	it('should trip reject specs with too many components', () => {
		const name = 'foo,bar,baz,bazoo';
		expect(() => fontMapSpec([name])).toThrow(
			`invalid font map specification '${name}'`,
		);
	});

	it('should coerce single steps into arrays', () => {
		const name = 'Helvetica';
		const filename = '/path/to/Helvetica.ttf';
		const spec = `${name},${filename}`;
		expect(fontMapSpec(spec)).toStrictEqual({
			[name]: {
				source: filename,
				postScriptName: undefined,
			},
		});
	});
});
