import path from 'node:path';
import commonjs from '@rollup/plugin-commonjs';
import inject from '@rollup/plugin-inject';
import json from '@rollup/plugin-json';
import nodeResolve from '@rollup/plugin-node-resolve';
import swc from '@rollup/plugin-swc';
import terser from '@rollup/plugin-terser';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import typescript from 'rollup-plugin-typescript2';

const getPlugins = () => [
	typescript({
		include: ['*/**/*.{js,ts}'],
		exclude: ['**/node_modules/**/*'],
	}),

	nodeResolve({
		browser: true,
		preferBuiltins: false,
		moduleDirectories: ['node_modules'],
	}),

	json(),
	nodePolyfills(),

	swc({
		include: ['**/*.js'],
		exclude: ['node_modules/**'],
		jsc: {
			parser: { syntax: 'ecmascript', decorators: true },
			transform: { legacyDecorator: true, decoratorMetadata: false },
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
	if (warning.code === 'CIRCULAR_DEPENDENCY') return;
	warn(warning);
};

// A helper function to automatically treat all node_modules dependencies
// as external for ESM/CJS, but return an empty array for UMD so everything
// packages up.
const configureExternal = (isUmd) => {
	if (isUmd) return [];

	return (id) => {
		if (path.isAbsolute(id)) {
			return id.includes('node_modules');
		}

		if (
			id.startsWith('.') ||
			id.startsWith('/') ||
			id.startsWith('\0') ||
			id.startsWith('src/')
		) {
			return false;
		}

		return true;
	};
};

export default [
	{
		input: 'src/index.ts',
		external: configureExternal(false),
		output: {
			file: 'dist/fontkit.esm.js',
			format: 'esm',
			sourcemap: true,
		},
		plugins: getPlugins(),
		onwarn,
	},
	{
		input: 'src/index.ts',
		external: configureExternal(false),
		output: {
			file: 'dist/fontkit.cjs',
			format: 'cjs',
			sourcemap: true,
			exports: 'named',
		},
		plugins: getPlugins(),
		onwarn,
	},
	{
		input: 'src/index.umd.ts',
		external: configureExternal(true),
		output: {
			file: 'dist/fontkit.umd.js',
			format: 'umd',
			name: 'fontkit',
			sourcemap: true,
			exports: 'default',
		},
		plugins: getPlugins(),
		onwarn,
	},
	{
		input: 'src/index.umd.ts',
		external: configureExternal(true),
		output: {
			file: 'dist/fontkit.umd.min.js',
			format: 'umd',
			name: 'fontkit',
			sourcemap: true,
			exports: 'default',
		},
		plugins: [...getPlugins(), terser()],
		onwarn,
	},
];
