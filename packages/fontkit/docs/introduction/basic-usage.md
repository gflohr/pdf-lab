# Basic Usage

You can load a font file like this:

:::tabs key:language variant:code

== TypeScript
```TypeScript
import * as fs from 'node:fs';
import fontkit, { BoundingBox } from '@pdf-lab/fontkit';

const bytes = fs.readFileSync('Helvetica.ttf');
const font = fontkit.create(bytes);
const bbox = new BoundingBox(5, 3, 25, 30);
```

== ES6
```JavaScript
import * as fs from 'node:fs';
import fontkit, { BoundingBox } from '@pdf-lab/fontkit';

const bytes = fs.readFileSync('Helvetica.ttf');
const font = fontkit.create(bytes);
const bbox = new BoundingBox(5, 3, 25, 30);
```

== CommonJS
```JavaScript
const fs = require('fs');
const fontkit = require('@pdf-lab/fontkit');

const bytes = fs.readFileSync('Helvetica.ttf');
const font = fontkit.create(bytes);
const bbox = new fontkit.BoundingBox(5, , 25, 30);
```

== UMD
```JavaScript
const fontkit = window.fontkit;

window.fetch('Helvetica.ttf')
	.then(response => {
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		return response.arrayBuffer();
	})
	.then(buffer => {
		const fontData = new Uint8Array(buffer);
		const font = fontkit.create(fontData);
		const bbox = new fontkit.BoundingBox(5, 3, 25, 30);
	})
	.catch(error => console.error('Error loading font:', error));
```
