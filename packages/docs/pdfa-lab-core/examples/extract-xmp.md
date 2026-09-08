# Extracting XMP Meta Information

Eventually embedded XMP meta information can be extracted and serialised into
various formats:

:::tabs key:language variant:code

== TypeScript
```TypeScript
import { PDFALab } from '@pdfa-lab/core';

extract().catch(err => {
	console.error(`Extracting XMP meta information failed: ${err}`);
	process.exit(1);
});

async function extract() {
	const url = 'https://github.com/gflohr/pdfa-lab/raw/refs/heads/main/assets/pdfs/factur-x-invoice.pdf';
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
	}

	const arrayBuffer = await response.arrayBuffer();
	const bytes = new Uint8Array(arrayBuffer);

	const lab = await PDFALab.from(bytes);
	const output = await lab.extractXmp(
		'text/turtle',
		'urn:xmp:doc',
		{ flags: 'o' },
	);

	console.log(output);
}
```

== ES6
```JavaScript
import { PDFALab } from '@pdfa-lab/core';

extract().catch(err => {
	console.error(`Extracting XMP meta information failed: ${err}`);
	process.exit(1);
});

async function extract() {
	const url = 'https://github.com/gflohr/pdfa-lab/raw/refs/heads/main/assets/pdfs/factur-x-invoice.pdf';
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
	}

	const arrayBuffer = await response.arrayBuffer();
	const bytes = new Uint8Array(arrayBuffer);

	const lab = await PDFALab.from(bytes);
	const output = await lab.extractXmp(
		'text/turtle',
		'urn:xmp:doc',
		{ flags: 'o' },
	);

	console.log(output);
}
```

== CommonJS
```JavaScript
const { PDFALab } = require('@pdfa-lab/core');

extract().catch(err => {
	console.error(`Extracting XMP meta information failed: ${err}`);
	process.exit(1);
});

async function extract() {
	const url = 'https://github.com/gflohr/pdfa-lab/raw/refs/heads/main/assets/pdfs/factur-x-invoice.pdf';
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
	}

	const arrayBuffer = await response.arrayBuffer();
	const bytes = new Uint8Array(arrayBuffer);

	const lab = await PDFALab.from(bytes);
	const output = await lab.extractXmp(
		'text/turtle',
		'urn:xmp:doc',
		{ flags: 'o' },
	);

	console.log(output);
}
```

:::

The method [`extractXmp()`](/pdfa-lab-core/api/classes/PDFALab.html#extractxmp)
returns the extracted XMP meta information in various formats, or `null`, if
no XMP meta information is found.

It takes three optional arguments. The first, determines the [serialisation
format](#output-format) (defaults to `application/rdf+xml`). The second
argument specifies the
base IRI (defaults to `urn:xmp:doc`). The third optional argument can pass
[options](/pdfa-lab-core/api/interfaces/PDFAConversionOptions.html) to the serialiser, currently only [`flags`](#serialiser-flags).

## Output Format

`pdfa-lib` supports all output formats that
[`rdflib`](https://linkeddata.github.io/rdflib.js/doc/) supports:

| Format                  | Aliases           | Description                |
|-------------------------|-------------------|----------------------------|
| `application/rdf+xml`   | `xml`, `rdf+xml`  | The default output format, which is also the format embedded into a PDF document. |
| `text/turtle`           | `application/x-turtle` |                            |
| `application/n-triples` |                   |                            |
| `application/ld+json`   |                   | |
| `text/n3`               | `application/n3`  | |
| `application/nquads`    | `application/n-quads` | |

## Serialiser Flags

You can further control the output by passing flags. Flags
can be combined (for example `{ flags: 'o k' }`):


* `s i` – used by default for Turtle to suppress `=`, `=>` notations
* `d e i n p r s t u x` – used for N-Triples/N-Quads to simplify output
* `dr` – used with JSON‑LD conversion (no default, no relative prefix)
* `o` – new: do not abbreviate to a prefixed name when the local part contains a dot. This keeps IRIs like http://example.org/ns/subject.example in <...> form instead of ns:subject.example.

Notes:

* For Turtle and JSON‑LD, user‑provided flags are merged with the defaults so your flags (like `o`) are honored.
* By contrast, passing `p` disables prefix abbreviations entirely (all terms are written as `<...>` IRIs).
