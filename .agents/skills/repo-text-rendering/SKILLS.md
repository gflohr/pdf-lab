---
name: repo-rendering
description: >
  Teaches AI agents about the mental model used for rendering text in PDFs,
  and the different ways of recovering the original text from PDFs.
---

# PDF Text Rendering

PDF is not a text format but a graphics format. The process of rendering text
is not always reversible. Sometimes, the actual textual content can only be
retrieved with Optical Character Recognition (OCR). One obvious case, where
OCR is needed are embedded images that contain the text.

The PDF specification usually uses the term "text showing" for the process
of including human-readable text in PDFs.

## Text Showing Process

Rendering a character into a PDF involves these steps:

1. Select a font.
2. Select a glyph from this font.
3. Assign an arbitrary numerical glyph ID to that glyph or re-use a previously assigned glyph ID.
4. Encode the glyph ID into the operand of the text showing operand.

A content stream inside of a PDF may contain text blocks like this:

```
BT
/F13 48 Tf
20 40 Td
<0102030304050607040803090a> Tj
ET
```

Break-down for each line:

* `BT` stands for "Begin Textblock".
* `/F13` selects the font with the identifier "F13".
* `20 40 Td` moves the cursor twenty units horizontally and 40 units vertically.
* `0 Tr`
* `<HEXCODES...> Tj` shows a sequence of glyphs.

The above example could show the text "Hello, world!". The encoding application
had assigned glyph IDs in order of appearance in the text:

* H: 0x01
* e: 0x02
* l: 0x03
* o: 0x04
* ,: 0x05
* ' ' (space): 0x06
* w: 0x07
* r: 0x08
* d: 0x09
* !: 0x0a

This strategy is very common. And therefore, the beginning of many such glyph
sequences is very often `<010203...>`.

Especially older PDFs have a slightly different syntax:

```
BT
/F13 48 Tf
20 40 Td
(Hello, world!) Tj
ET
```

The difference is that angle brackets (`<>`) are delimiters for hex-encoded
glyph IDs whereas parentheses (`()`) or delimiters for byte strings. The
latter form is mostly used for text using one of the 14 standard fonts.

the ligatures "fi" and "ffl".

There are a handful of other text showing operators than `Tj` but their usage
is very similar.

### Key Takeaways

* Glyph IDs are arbitrary and can rarely be mapped directly to code points
* Encoding strings into hexcodes is the prevalent method for modern applications
* Text can rarely be found in PDFs with tools like `grep`.

## Text Extraction Process

Recovering the text differs slightly between the byte and the hexcode
representation.

### Byte Codes

Example:

```
BT
/F13 48 Tf
20 40 Td
(Hello, world!) Tj
ET
```

The following steps are involved for recovering the text:

1. Extract the byte sequence between the parentheses.
2. Lookup the encoding for font "F13".
3. Map each byte of the sequence to a glyph name.
4. Map each glyph name of the sequence to a Unicode code point from the Adoble Glyph List (AGL).

Theoretically, font "F13" could also use a `ToUnicode` CMap, but this is
rare in practice.

### 8-bit Hexcodes


```
BT
/F13 48 Tf
20 40 Td
<0102030304050607040803090a> Tj
ET
```

The steps are similar:

1. Extract the hexcodes sequence between the angle brackets.
2. Convert the codes to numerical glyph IDs.
3. Find the `ToUnicode` CMap for font "F13".
4. Map each glyph ID to a Unicode code point.

Theoretically, the font "F13" may use one of the standard encodings instead of
a `ToUnicode` CMap, but that is rare in practice.

### 16-bit Hexcodes

If the font subset includes more than 256 glyphs, 16 bits are required for
encoding the glyph IDs. This is not yet implemented in the library because
of lack of example documents.

### Limitations

The text extraction process a best-effort approach. If neither an `Encoding`
entry, nor a `ToUnicode` CMap is present in a font dictionary resp. an
associated font dictionarty, the `StandardEncoding` is assumed but that will
often lead to garbage output, because using the `StandardEncoding` is just
an educated guess.

## Key Takeaways for Agents

* Text extraction from PDFs is imperfect.
* The "pdf-lab" still oversimplifies things and may produce wrong results.
* 
