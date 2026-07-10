import type { DecodeStream } from 'restructure';
import { CFFFont } from './cff-font';

export class CFF1Font extends CFFFont {
	static decode(stream: DecodeStream): CFF1Font {
		return new CFF1Font(stream);
	}
}
