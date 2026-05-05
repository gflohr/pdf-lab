export class LiteralParser {
	public parse(input: number[]): number[] {
		const octets: number[] = [];

		for (let i = 1; i < input.length; ++i) {
			const octet = input[i]!;

			switch(octet) {
				case 0x29:
					return octets;
				default:
					octets.push(octet);
			}
		}

		return octets;
	}
}
