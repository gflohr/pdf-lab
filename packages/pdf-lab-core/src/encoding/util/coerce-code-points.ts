export function coerceCodePoints(cps: number[] | undefined): number {
	if (!cps) {
		return 0xfffd;
	} else if (!cps.length) {
		return 0xfffd;
	} else if (cps.length === 1) {
		return cps[0]!;
	} else {
		// Ligature?
		const asText = cps.map((cp) => String.fromCodePoint(cp)).join('');
		switch (asText) {
			case 'DZ':
				return 0x01f1;
			case 'Dz':
				return 0x01f2;
			case 'dz':
				return 0x01f3;
			case 'ff':
				return 0xfb00;
			case 'fi':
				return 0xfb01;
			case 'fl':
				return 0xfb02;
			case 'ffi':
				return 0xfb03;
			case 'ffl':
				return 0xfb04;
			case 'st':
				return 0xfb06;
			default:
				return cps[0]!; // Better than nothing.
		}
	}
}
