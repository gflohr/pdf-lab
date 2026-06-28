import { FatalFontError } from './fatal-font-error';

export class MissingTableError extends FatalFontError {
	constructor(
		message: string,
		public tag: string,
	) {
		super(message, tag);
		this.name = 'FatalFontError';
	}
}
