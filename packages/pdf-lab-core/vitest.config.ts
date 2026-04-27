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
});
