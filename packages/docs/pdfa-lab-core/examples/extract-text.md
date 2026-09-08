# Extracting Text

Extracting text from PDFs is a best-effort approach and may still miss a
number of edge cases.

:::tabs key:language variant:code

== TypeScript
```TypeScript
import { PDFALab } from '@pdfa-lab/core';

extract().catch(err => {
	console.error(`Extracting text failed: ${err}`);
	process.exit(1);
});

async function extract() {
	const url = 'https://github.com/gflohr/pdfa-lab/raw/refs/heads/main/assets/pdfs/type1-fonts-missing.pdf';
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
	}

	const arrayBuffer = await response.arrayBuffer();
	const bytes = new Uint8Array(arrayBuffer);

	const lab = await PDFALab.from(bytes);
	const blocks = await lab.extractText();

	for (let i = 0; i < blocks.length; ++i) {
		const block = blocks[i];

		console.log(`# Block ${i + 1}\n`);
		console.log(`Page ${block.pageNumber + 1}`);
		console.log(`Font name: ${block.font.fontName}`);
		console.log(`Base font name: ${block.font.baseFont}`);
		console.log(`Text: ${block.text}`);
		console.log('\n');
	}
}
```

== ES6
```JavaScript
import { PDFALab } from '@pdfa-lab/core';

extract().catch(err => {
	console.error(`Extracting text failed: ${err}`);
	process.exit(1);
});

async function extract() {
	const url = 'https://github.com/gflohr/pdfa-lab/raw/refs/heads/main/assets/pdfs/type1-fonts-missing.pdf';
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
	}

	const arrayBuffer = await response.arrayBuffer();
	const bytes = new Uint8Array(arrayBuffer);

	const lab = await PDFALab.from(bytes);
	const blocks = await lab.extractText();

	for (let i = 0; i < blocks.length; ++i) {
		const block = blocks[i];

		console.log(`# Block ${i + 1}\n`);
		console.log(`Page ${block.pageNumber + 1}`);
		console.log(`Font name: ${block.font.fontName}`);
		console.log(`Base font name: ${block.font.baseFont}`);
		console.log(`Text: ${block.text}`);
		console.log('\n');
	}
}
```

== CommonJS
```JavaScript
const { PDFALab } = require('@pdfa-lab/core');

extract().catch(err => {
	console.error(`Extracting text failed: ${err}`);
});

async function extract() {
	const url = 'https://github.com/gflohr/pdfa-lab/raw/refs/heads/main/assets/pdfs/type1-fonts-missing.pdf';
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
	}

	const arrayBuffer = await response.arrayBuffer();
	const bytes = new Uint8Array(arrayBuffer);

	const lab = await PDFALab.from(bytes);
	const blocks = await lab.extractText();

	for (let i = 0; i < blocks.length; ++i) {
		const block = blocks[i];

		console.log(`# Block ${i + 1}\n`);
		console.log(`Page ${block.pageNumber + 1}`);
		console.log(`Font name: ${block.font.fontName}`);
		console.log(`Base font name: ${block.font.baseFont}`);
		console.log(`Text: ${block.text}`);
		console.log('\n');
	}
}
```

:::

The method [`extractText()`](/pdfa-lab-core/api/classes/PDFALab.html#extracttext)
returns the extracted text in blocks as they appear in the PDF. This is not
necessarily the visual order. Each text rendering instruction can specify
coordinates, where the particular piece of text should be rendered.

The output should be this:

```text
# Block 1

Page 1
Font name: Helvetica
Base font name: Helvetica
Text: This page uses Helvetica.


# Block 2

Page 2
Font name: Times-Italic
Base font name: Times-Italic
Text: ÄÖÜäöüß in Times-Roman.


# Block 3

Page 3
Font name: Symbol
Base font name: Symbol
Text: ΑαΒβΓγ∆δ


# Block 4

Page 4
Font name: ZapfDingbats
Base font name: ZapfDingbats
Text: ✂✈✉☎✔✘★
```
