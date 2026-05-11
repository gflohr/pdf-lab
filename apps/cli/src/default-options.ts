import { Textdomain } from '@esgettext/runtime';
import type { OptSpec } from './util/optspec.js';

const gtx = Textdomain.getInstance('pdf-lab');

export const defaultOptions: {
	input: OptSpec;
} = {
	input: {
		group: gtx._('Input file location'),
		alias: ['i'],
		type: 'string',
		nargs: 1,
	},
};
