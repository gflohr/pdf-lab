#! /usr/bin/env node

import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { globSync } from 'glob';
import yaml from 'js-yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const workspaceYaml = fs.readFileSync(
	`${rootDir}/pnpm-workspace.yaml`,
	'utf-8',
);
const workspaceConfig = yaml.load(workspaceYaml);
if (
	!workspaceConfig ||
	typeof workspaceConfig !== 'object' ||
	!Array.isArray(workspaceConfig.packages)
) {
	throw new Error(
		'Invalid pnpm-workspace.yaml: expected a top-level "packages" array.',
	);
}
const workspaceGlobs = workspaceConfig.packages;

const roots = [];
for (let pattern of workspaceGlobs) {
	pattern = [rootDir, pattern, 'coverage'].join('/');
	roots.push(...globSync(pattern));
}

if (roots.length === 0) {
	throw new Error('No coverage directories found for workspace packages.');
}

const total = {
	lines: { covered: 0, total: 0 },
};

for (const root of roots) {
	const file = [root, 'coverage-summary.json'].join('/');

	const data = JSON.parse(fs.readFileSync(file, 'utf-8'));
	const lines = data.total.lines;

	total.lines.covered += lines.covered;
	total.lines.total += lines.total;
}

if (total.lines.total <= 0) {
	throw new Error('No instrumented lines found in coverage summaries.');
}

const pct = (total.lines.covered / total.lines.total) * 100;

fs.writeFileSync(
	'coverage-summary.json',
	`${JSON.stringify({ total: { lines: { pct } } }, null, 2)}\n`,
);
