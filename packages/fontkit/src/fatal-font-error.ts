export class FatalFontError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'FatalFontError';
	}
}
