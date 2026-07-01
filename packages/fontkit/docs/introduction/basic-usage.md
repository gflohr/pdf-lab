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
const bbox = new fontkit.BoundingBox(5, 3, 25, 30);
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
	})
	.catch(error => console.error('Error loading font:', error));
```

:::

Note that for UMD builds, you can only access the default export `fontkit` but no
utility exports like [`BoundingBox`](../../api/classes/BoundingBox) or
[`Glyph`](../../api/classes/Glyph). This constraint is an
intentional architectural design choice to preserve the legacy
`window.fontkit.create()` global API footprint for backward compatibility.

If you require standalone browser access to those individual helper classes,
please use a modern module bundler instead of relying on raw UMD script
injections. Alternatively, file a pull request that removes this limitation.
