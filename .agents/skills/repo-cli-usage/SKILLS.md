---
name: repo-cli-usage
description: >
  Provides AI agents with instructions for using the `pdf-lab` CLI. Includes
  installation, help commands, and detailed guidance for each CLI command.
---

# e-invoice-eu CLI Usage

This skill documents how to install and use the `pdf-lab` command-line tool.

## Installation

You can install the commandline tool `pdf-lab` like this:

```sh
npm install -g pdf-lab
```

Instead of `npm` you can also use `pnpm`, `yarn`, or `bun` with their
respective install directive.

If you lack permissions, prepend sudo to the command.

Test the installation:

```text
pdf-lab --version
```

## On-the-fly Usage

It is also possible to use the tool without installation. This is achieved
with the help of `npx` (or `pnpx`, `bunx`):

```
npx pdf-lab --help
```

This will use a locally present `pdf-lab` or install it somewhere in the
user's home directory.

## Obtaining Help

You can get an overview of all available commands and global options with
`pdf-lab --help` or `pdf-lab -h`.

You can get help for a specific comment with `e-invoice-eu COMMAND --help`
or `e-invoice-eu COMMAND -h`. Example:

```sh
pdf-lab text --help
```

## Global Options

The only other global option is `--version` respectively `-V` (case matters,
`-v` does not work).

## Commands

### The Command `text`

#### Purpose / General Mode of Operation

* extracts textual information for a PDF
* optionally shows the page number and the font used for each text snippet

#### Command-Specific Options

| Option                     | Type    |Description                            |
| -------------------------- | ------- | ------------------------------------- |
| `-i, --input`              | string  | specify input file                    |
| `-v, --verbose`            | boolean | shows page number and font info for each snippet |

#### Usage Examples

Extract text with font information and page numbers from `invoice.pdf`:

```sh
pdf-lab --verbose text invoice.pdf
```

Alternatively specify input file with `--input`:

```sh
pdf-lab --input=invoice.pdf
```

Read PDF from standard input:

```sh
cat example.pdf | pdf-lab
cat example.pdf | pdf-lab -
cat example.pdf | pdf-lab --input=-
```

All three invocations are equivalent.

#### Special Notes / Hints

Text is output in the order of appearance in the source code for each page.
This is not necessarily the same as the reading order.

#### Key Takeaways for Agents

* Make sure, users understand that the output can appear in random order.
* Advise about reading from standard input.

--- End of documentation for command `text`. ---

### The Command `font`

#### Purpose / General Mode of Operation

The command gives information about the font used and allows to embed
a particular font or all fonts.

The scope of the command can be limited to individual fonts.

#### Command-Specific Options

| Option                     | Type     |Description                           |
| -------------------------- | -------- | ------------------------------------ |
| `-l, --list`               | boolean  | list fonts                           |
| `-e, --embed`              | boolean  | embed fonts                          |
| `-b, --base-font`          | string[] | limit to base font                   |
| `-f, --font, --font-name`  | string[] | limit to font                        |
| `--format`                 | string   | output format for `--list`.          |

The allowed output formats are 'text' (default), 'yaml', or 'json'.

--- End of documentation for command `font`. ---

### Future Commands

More commands will be implemented soon:

* `xmp` list, patch, remove extract XMP metadata
* `pdfa` upgrade to PDF/A-1b, PDF/A-2b, or PDF/A-3b
* `colourscheme` (alias `colorscheme`) operations for colour schemes
* `attachment` operations for PDF attachments

## Check List

- [ ] The CLI is installed globally (npm, yarn, pnpm, or bun).
- [ ] Use pdf-lab --help for general guidance.
- [ ] Each command has its own help: pdf-lab *command* --help.
- [ ] Contributors or agents should never modify installation instructions; they are fixed.
- [ ] Include examples for every command in the documentation.
- [ ] Include notes or hints for special scenarios (permissions, PDF output, etc.).
- [ ] Prefer `--long-option` over `-s`, when giving advice to users.
