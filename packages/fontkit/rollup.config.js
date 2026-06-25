import commonjs from '@rollup/plugin-commonjs';
import inject from '@rollup/plugin-inject';
import json from '@rollup/plugin-json';
import nodeResolve from '@rollup/plugin-node-resolve';
import swc from '@rollup/plugin-swc';
import terser from '@rollup/plugin-terser';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import typescript from 'rollup-plugin-typescript2';

const plugins = [
	typescript({
		include: ['*/**/*.{js,ts}'],
		exclude: ['**/node_modules/**/*'],
	}),

	nodeResolve({
		browser: true,
		preferBuiltins: false,
	}),

	json(),

	nodePolyfills(),

	swc({
		include: ['**/*.js'],
		exclude: ['node_modules/**'],
		jsc: {
			parser: {
				syntax: 'ecmascript',
				decorators: true,
			},
			transform: {
				legacyDecorator: true,
				decoratorMetadata: false,
			},
			target: 'es2020',
		},
	}),

	commonjs(),

	inject({
		Buffer: ['buffer', 'Buffer'],
		process: 'process',
	}),
];

const onwarn = (warning, warn) => {
	// Silence noisy legacy dependency warnings.
	if (warning.code === 'CIRCULAR_DEPENDENCY') return;
	warn(warning);
};

export default [
	{
		input: 'src/index.ts',
		external: ['pako'], // pdf-lib provides pako for the other formats.
		output: {
			file: 'dist/fontkit.esm.js',
			format: 'esm',
			sourcemap: true,
		},
		plugins,
		onwarn,
	},
	{
		input: 'src/index.ts',
		output: {
			file: 'dist/fontkit.cjs.js',
			format: 'cjs',
			sourcemap: true,
			exports: 'auto',
		},

		plugins,
		onwarn,
	},
	{
		input: 'src/index.ts',
		output: {
			file: 'dist/fontkit.umd.js',
			format: 'umd',
			name: 'fontkit',
			sourcemap: true,
			globals: {
				pako: 'pako',
			},
		},
		external: ['pako'],
		plugins,
		onwarn,
	},
	{
		input: 'src/index.ts',
		output: {
			file: 'dist/fontkit.umd.min.js',
			format: 'umd',
			name: 'fontkit',
			sourcemap: true,
			globals: {
				pako: 'pako',
			},
		},
		external: ['pako'],
		plugins: [...plugins, terser()],
		onwarn,
	},
];
