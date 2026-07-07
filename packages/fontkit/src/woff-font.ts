import * as r from 'restructure';
import inflate from 'tiny-inflate';
import type { WOFFDirectory } from './tables/woff-directory.js';
import { woffDirectoryStruct } from './tables/woff-directory.js';
import { TrueTypeFont } from './true-type-font.js';
import { asciiDecoder } from './utils.js';

export class WOFFFont extends TrueTypeFont<WOFFDirectory> {
	static probe(buffer: Uint8Array) {
		return asciiDecoder.decode(buffer.slice(0, 4)) === 'wOFF';
	}

	protected decodeDirectory(): WOFFDirectory {
		return woffDirectoryStruct.decode(this.stream, {
			_startOffset: 0,
		} as r.FieldT<unknown>);
	}

	protected getTableStream(tag: string): r.DecodeStream | null {
		const table = this.directory.tables[tag];
		if (table) {
			this.stream.pos = table.offset;

			if (table.compLength < table.length) {
				this.stream.pos += 2; // skip deflate header
				const outBuffer = new Uint8Array(table.length);
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
