---
name: repo-encodings
description: >
  Teaches AI agents about the different ways how glyph IDs may be mapped to
	Unicode code points. The mapping can also be indirect via glyph names contained
	in the Adobe Glyph List (AGL) specification.
---

# PDF Encodings

This skill documents **core domain knowledge** for PDF encodings. Encodings
are necessary for recovering textual information from a PDF.

## Pre-defined Encodings

A number of encodings are pre-defined, and must be known to every conforming
PDF viewer:

* `WinAnsiEncoding` (equivalent to Windows-1251 resp. CP1251)
* `MacRomanEncoding` (equivalent to the Macintosh resp. Mac Roman encoding)
* `MacExpertEncoding` for special variants of glyphs, for example small numbers, superscript numbers, etc.
* `StandardEncoding` used as a fallback
* `PDFDocEncoding`, encoding for strings that are not part of the actual text content, like metadata, form fields, bookmarks etc.
* `SymbolEncoding` for the Symbol font, one of the 14 PDF standard fonts
* `ZapfDingbatsEncoding` for the ZapfDingbats decorative font, one of the 14 PDF standard fonts

All pre-defined encodings have these features in common:

* 8-bit only
* no mappings for control characters (0x00 to 0x1a)
* no mapings for the delete character (0x7f)
* they are usually only used with one of the 14 standard fonts, and otherwise considered obsolete

With the exception of `MaxExpertEncoding, `Symbol` and `ZapfDingbats`, all
pre-defined fonts cover US-ASCII, some characters from Western scripts, often
used symbols like the Euro sign, and so on.

The `MacExpertEncoding` contains variants of standard characters like
small caps ("Kapitälchen" in German), superscript ("superior") or subscript
("inferior") characters, and the ligatures "ff", "fi", "fl", "ffi", and "ffl".

The `Symbol` encoding was traditionally used to render mathematical formulas.
It therefore contains:

* all letters from the Greek alphabet (uppercase and lowercase)
* mathematical symbols like integral sign, all kinds of parentheses, mathematical operators
* some German "Fraktur" letters

The `ZapfDingbats` encoding contains symbols like scissors, letters, playing
card suits (club, spade, heart, diamond), geometrical forms, arrows, and so
on. They are also present in the Unicode code block "Dingbats" in the range
U+2700 to U+27BF. However, the order of glyphs differs significantly between
Unicode and the pre-defined PDF encoding.

### Structure and Location

The pre-defined encodings are not defined in terms of code points but in terms
of glyph names from the Adobe Glyph List Specification. The mapping to Unicode
is therefore indirects. The glyph ID used in the PDF is first mapped to
a Adobe glyph name. And the glyph name is then mapped to one or more
Unicode code points.

The encodigns are stored in `packages/core/src/encoding/single-byte-encodings`.
They are represented of arrays for 256 strings. The special glyph name
`.notdef` is used for codes not used in the encoding.

## `ToUnicode` Dictionaries

### CMap Tables

The legacy pre-defined encodings are nowadays mostly replaced by CMap tables
that map single glyph IDs to Unicode code points or a range of glyph IDs to
a range of Unicode code points. CMap tables have a a lot more semantics, but
they are out of the scope of this software.

Glyphs can also be mapped to a sequence of c s. Example:

```
beginbfrange
<005f> <0061> [<00660066> <00660069> <00660066006C>]
endbfrange`;
```

This maps the glyph IDs 0x5f to 0x61 to three ligatures. The first ligature
id `U+0066U+0066`, the "ff" ligature. The other two glyph IDs are mapped to
the ligatures "fi" and "ffl".

### Key Takeaways

* `ToUnicode` mappings in form of CMap tables are the modern standard way of mapping glyphs to Unicode code points.
* CMap tables are not to be confused with "cmap" tables present in TrueType font programs
* One glyph may be mapped to a sequence of code points for ligatures
