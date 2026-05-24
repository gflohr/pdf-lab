import r from '@pdf-lib/restructure';
import inflate from 'tiny-inflate';
import WOFFDirectory from './tables/WOFFDirectory.js';
import { TrueTypeFont } from './true-type-font.js';

export default class WOFFFont extends TrueTypeFont {
	static probe(buffer) {
		return buffer.toString('ascii', 0, 4) === 'wOFF';
	}

	// private
	decodeDirectory() {
		return WOFFDirectory.decode(this.stream, { _startOffset: 0 });
	}

	_getTableStream(tag) {
		const table = this.directory.tables[tag];
		if (table) {
			this.stream.pos = table.offset;

			if (table.compLength < table.length) {
				this.stream.pos += 2; // skip deflate header
				const outBuffer = new Buffer(table.length);
				const buf = inflate(
					this.stream.readBuffer(table.compLength - 2),
					outBuffer,
				);
				return new r.DecodeStream(buf);
			} else {
				return this.stream;
			}
		}

		return null;
	}
}
