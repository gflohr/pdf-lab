import path from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		environment: 'node',
		include: ['src/**/*.spec.ts'],
		coverage: {
			reporter: ['text', 'json-summary', 'lcov'],
			reportsDirectory: './coverage',
		},
		clearMocks: true,
		restoreMocks: true,
		mockReset: true,
	},
	resolve: {
		alias: {
			'pdf-lab-core': path.resolve(
				__dirname,
				'../../packages/pdf-lab-core/src',
			),
		},
	},
});
