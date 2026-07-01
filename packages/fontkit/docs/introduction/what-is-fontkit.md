# What is `@pdf-lab/fontkit`?

Fontkit is an advanced font engine for Node and the browser.

## Features

* Supports TrueType (`.ttf`), OpenType (`.otf`), WOFF (`.woff`), WOFF2 (`.woff2`), TrueType Collection (`.ttc`), and Datafork TrueType (`.dfont`) font files.
* Supports mapping characters to glyphs, including support for ligatures and other advanced substitutions.
* Supports reading glyph metrics and laying out glyphs, including support for kerning and other advanced layout features.
* Advanced OpenType features including glyph substitution (GSUB) and positioning (GPOS)
* Apple Advanced Typography (AAT) glyph substitution features (morx table).
* Support for getting glyph vector paths and converting them to SVG paths, or rendering them to a graphics context.
* Supports TrueType (glyf) and PostScript (CFF/CFF2) outlines.
* Support for color glyphs (e.g. emoji), including Apple’s SBIX table, and Microsoft’s COLR table.
* Support for AAT variation glyphs, allowing for nearly infinite design control over weight, width, and other axes.
* Font subsetting support - create a new font including only the specified glyphs.

## Improvements in `@pdf-lab/fontkit`

* Fully Typed Architecture: Re-engineered from the ground up in native TypeScript, offering robust auto-completion, strict compiler checks, and inline documentation for complex internal font structures (such as layout tables and glyph collections).
* API documentation; you are currently reading it.
* Modern ESM Native & CJS Layouts: Shipped with strict, modern dual-package support (.js and .cjs), eliminating old bundler quirks and offering out-of-the-box support for modern frameworks (Vite, Next.js, etc.) alongside backward-compatible UMD browser targets.
* Modernized Engineering Tooling: Replaced aging, custom hand-crafted build scripts with modern tooling (Rollup/Vite) and an overhauled, modern testing pipeline (Vitest/Jest).

## The Typescript Shift

The primary limitation of the original codebase and its early forks was the
reliance on loose JavaScript objects to represent complex, low-level binary
specifications (like OpenType and AAT structures).

By porting @pdf-lab/fontkit to strict TypeScript, the library has been turned
internal structural contracts into a form of static analysis. This migration
has allowed to eliminate legacy silent bugs, clearly define cross-module 
internal boundaries (like table registration schemes), and dramatically 
improve the developer experience for anyone building advanced layout or PDF 
rendering engines.

## History of `fontkit`

The [original version of fontkit](https://github.com/foliojs/fontkit) was
written by [Devon Govett](https://github.com/devongovett) in JavaScript.

Later, [Andrew Dillon](https://github.com/Hopding) created a fork
[`@pdf-lib/fontkit`](https://github.com/Hopding/fontkit) that was mainly
focused on improving browser compatibility. It was used by the
popular [`pdf-lib`](https://github.com/Hopding/pdf-lib) project by the same
author. Because `pdf-lib` has not seen any updates for years, an actively
maintained fork [`@cantoo/pdf-lib`](https://github.com/cantoo-scribe/pdf-lib)
has been created.

There is another popular fontkit fork
[`@foliojs-fork/fontkit`](https://github.com/foliojs-fork/fontkit#readme)
that included many improvements and bugfixes to the original fontkit.

This version `@pdf-lab/fontkit` is based on the original fontkit and the
two forks. It tries to incorporate all improvements in the other forks.

The main advantage of `@pdf-lab/fontkit` is that the original codebase has
been ported to TypeScript, which improves developer experience significantly.

## About This Documentation

This documentation is a work in progress, and your contributions are highly
welcome! If you spot any factual errors, notice missing sections, or have ideas
for stylistic improvements, please feel free to open an issue or submit a pull
request directly to the [pdf-lab GitHub
repository](https://github.com/gflohr/pdf-lab).
