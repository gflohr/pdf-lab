[![licence](https://img.shields.io/badge/licence-WTFPL-blue)](http://www.wtfpl.net/)
[![price](https://img.shields.io/badge/price-FREE-green)](https://github.com/gflohr/pdf-lab/blob/main/LICENSE)
[![coverage](https://img.shields.io/coverallsCoverage/github/gflohr/pdf-lab?branch=main)](https://coveralls.io/github/gflohr/pdf-lab?branch=main)
[![stand with](https://img.shields.io/badge/stand%20with-Ukraine🇺🇦-ffc107)](https://www.standwithukraineeurope.com/en/)
<!-- Disabled until package is documented and published. -->
<!--[![downloads](https://img.shields.io/npm/dw/%40pdf-lab%2Fcore)](https://www.npmjs.com/package/@pdf-lab/core)-->
<!--[![documentation](https://img.shields.io/badge/documentation-read-green)](https://gflohr.github.io/pdf-lab)-->

# PDF-Lab<!--omit-from-toc-->

This project is currently a work in progress. It is a supplement
to the Cantoo fork of [pdf-lib](https://github.com/cantoo-scribe/pdf-lib).

- [PDF-Lab](#pdf-lab)
	- [Description](#description)
	- [Current State](#current-state)
		- [Text Extraction](#text-extraction)
		- [`fontkit` Replacement](#fontkit-replacement)
	- [Limitations and Caveats](#limitations-and-caveats)
		- [CJK Scripts](#cjk-scripts)
		- [Encoding Differences are Not Supported](#encoding-differences-are-not-supported)

## Description

In the future, it will hopefully help with these things:

* upgrading regular PDFs to PDF/A-1b, PDF/A-2b, or PDF/A-3b
* replacing/embedding fonts in PDFs
* subsetting fonts in PDFs
* manipulation of XMP metadata in PDFs
* allow access to the Adobe Glyph List Specification
* ...

The software is written in TypeScript. It consists of a command-line
interface and a library.

## Current State

### Text Extraction

The software can extract text from many, but not all PDFs:

```
pnpm install
cd apps/cli
pnpm start:dev text PATH_TO_PDF
```

### `fontkit` Replacement

The package [`@pdf-lib/fontkit`](https://www.npmjs.com/package/@pdf-lib/fontkit)
is unmaintained and known to have bugs that prevent font embedding from
working reliably. However, short of other options, it is the `fontkit`
implementation recommended by
[`pdf-lib`](https://www.npmjs.com/package/pdf-lib) and its actively maintained
fork [`@cantoo/pdf-lib`](https://www.npmjs.com/package/@cantoo/pdf-lib).

This project contains a drop-in replacement for `@pdf-lib/fontkit`, see its
[README](packages/core/README.md#readme). The replacement aims at fixing the
known bugs in the existing implementation.

## Limitations and Caveats

### CJK Scripts

Documents that use CJK scripts will probably not work.

### Encoding Differences are Not Supported

The PDF specification allows referencing a base encoding and patching it.
Implementing support for this requires test documents that use the feature.
