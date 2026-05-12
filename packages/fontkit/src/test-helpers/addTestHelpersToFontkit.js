import fs from 'node:fs';
import fontkit from '../index.js';

fontkit.openSync = (filename, postscriptName) => {
	const buffer = fs.readFileSync(filename);
	return fontkit.create(buffer, postscriptName);
};

fontkit.open = (filename, postscriptName, callback) => {
	if (typeof postscriptName === 'function') {
		callback = postscriptName;
		postscriptName = null;
	}

	fs.readFile(filename, (err, buffer) => {
		if (err) {
			return callback(err);
		}

		let font;
		try {
			font = fontkit.create(buffer, postscriptName);
		} catch (e) {
			return callback(e);
		}

		return callback(null, font);
	});

	return;
};
