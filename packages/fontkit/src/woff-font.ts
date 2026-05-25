import r, { type DecodeStream, type FieldT } from '@pdf-lib/restructure';
import inflate from 'tiny-inflate';
import type { SFNTDirectory, WOFFTable } from './tables/directory.js';
import WOFFDirectory from './tables/woff-directory.js';
import { TrueTypeFont } from './true-type-font.js';

export class WOFFFont extends TrueTypeFont {
	static probe(buffer: Buffer) {
		return buffer.toString('ascii', 0, 4) === 'wOFF';
	}

	// private
	decodeDirectory(): SFNTDirectory {
		return WOFFDirectory.decode(this.stream, {
			_startOffset: 0,
		} as unknown as FieldT<unknown>) as unknown as SFNTDirectory;
	}

	_getTableStream(tag: string): DecodeStream | null {
		const table = this.directory.tables[tag] as WOFFTable;
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
