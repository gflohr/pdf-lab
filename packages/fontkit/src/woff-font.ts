import r, { type DecodeStream, type FieldT } from '@pdf-lib/restructure';
import inflate from 'tiny-inflate';
import type { WOFFDirectory } from './tables/woff-directory.js';
import { woffDirectoryStruct } from './tables/woff-directory.js';
import { TrueTypeFont } from './true-type-font.js';

export class WOFFFont extends TrueTypeFont<WOFFDirectory> {
	static probe(buffer: Buffer) {
		return buffer.toString('ascii', 0, 4) === 'wOFF';
	}

	protected decodeDirectory(): WOFFDirectory {
		return woffDirectoryStruct.decode(this.stream, {
			_startOffset: 0,
		} as FieldT<unknown>);
	}

	protected getTableStream(tag: string): DecodeStream | null {
		const table = this.directory.tables[tag];
		if (table) {
			this.stream.pos = table.offset;

			if (table.compLength < table.length) {
				this.stream.pos += 2; // skip deflate header
				const outBuffer = Buffer.alloc(table.length);
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
