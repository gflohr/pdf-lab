# Extract Text

You can extract textual information contained in a PDF.

## Usage

```shell
pdfa-lab text FILENAME.pdf
pdfa-lab text -i FILENAME.pdf
pdfa-lab text --input FILENAME.pdf
```

These commands are all equivalent.

By default, the raw text is simply printed to the console. You can change that
with the option `--format`, see below.

## Options

| Option                         | Description |
|--------------------------------|-------------|
| `-i`, `--input` `FILENAME.pdf` | The input filename. |
| `-f`, `--format` `FORMAT`      | Choose one of `text` (default), `json`, or `yaml` as the output format. |
| `-V`, `--version`              | Show version number and exit. |
| `-h`, `--help`                 | Show help and exit. |

If you choose `json` or `yaml` as output format, additional information like
the font used and the page number is printed with the extracted text.

## Caveats and Limitations

### Order of Text Snippets

The text is extracted page by page. However, on a page level, the text snippets
are not necessarily printed in natural reading order.

The reason is that in a PDF, each text snippet can be positioned individually.
The snippets are extracted in the order of their appearance in the PDF source
code.

### Scanned Documents

PDFs produced by scanners usually do not contain structured, textual
information but only bitmaps. In this case, the textual information cannot be
extracted with `pdfa-lab`.

The only way to retrieve the textual content is to use optical character
recognition (OCR).
