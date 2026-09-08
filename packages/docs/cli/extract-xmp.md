# Extract XMP Meta Information

You can extract the XMP meta information contained in a PDF.

## Usage

```shell
pdfa-lab xmp FILENAME.pdf
pdfa-lab xmp -i FILENAME.pdf
pdfa-lab xmp --input FILENAME.pdf
```

These commands are all equivalent.

By default, the embedded XMP meta information is printed as XML to the console.
The output format can be changed with the option `--format` or `-f`.

## Options

| Option                         | Description |
|--------------------------------|-------------|
| `-i`, `--input` `FILENAME.pdf` | The input filename. |
| `-f`, `--format` `FORMAT`      | Try `pdfa-lab xmp --help` for a list of formats. |
| `-b`, `--base-iri` `URI`       | Use `URI` as base IRI. |
| `--flags` `FLAGS`              | Use `FLAGS` as serialisation flags. |
| `-V`, `--version`              | Show version number and exit. |
| `-h`, `--help`                 | Show help and exit. |

## Output

By default, the XMP meta information is printed to the console.

### Output Format

`pdfa-lib` supports all output formats that
[`rdflib`](https://linkeddata.github.io/rdflib.js/doc/) supports:

| Format                  | Aliases           | Description                |
|-------------------------|-------------------|----------------------------|
| `application/rdf+xml`   | `xml`, `rdf+xml`  | The default output format, which is also the format embedded into a PDF document. |
| `text/turtle`           | `turtle`, `application/x-turtle` |                            |
| `application/n-triples` | `n-triples`       |                            |
| `application/ld+json`   | `json-ld`, `ld+json`, `json` | |
| `text/n3`               | `n3`, `notation3`, `application/n3` | |
| `application/nquads`    | `nquads`, `application/n-quads` | |

Formats identifiers and their aliases are case-insensitive.

### Serialiser Flags

You can further control the output with the option `--flags`. Flags
can be combined (for example `o k`):


* `s i` – used by default for Turtle to suppress `=`, `=>` notations
* `d e i n p r s t u x` – used for N-Triples/N-Quads to simplify output
* `dr` – used with JSON‑LD conversion (no default, no relative prefix)
* `o` – new: do not abbreviate to a prefixed name when the local part contains a dot. This keeps IRIs like http://example.org/ns/subject.example in <...> form instead of ns:subject.example.

Notes:

* For Turtle and JSON‑LD, user‑provided flags are merged with the defaults so your flags (like `o`) are honored.
* By contrast, passing `p` disables prefix abbreviations entirely (all terms are written as `<...>` IRIs).


