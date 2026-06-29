export class FatalFontError extends Error {
	constructor(
		message: string,
		public tag: string,
	) {
		super(message);
		this.name = 'FatalFontError';
	}
}
