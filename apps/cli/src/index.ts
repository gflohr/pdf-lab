/* istanbul ignore file */
import * as url from 'node:url';

import { run } from './run.js';

// Only run if this script is executed directly
if (import.meta.url === url.pathToFileURL(process.argv[1]!).href) {
	run()
		.then((exitCode) => process.exit(exitCode))
		.catch((err) => {
			console.error(err);
			process.exit(2);
		});
}
