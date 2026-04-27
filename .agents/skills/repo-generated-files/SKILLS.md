---
name: repo-generated-files
description: >
  Explains the rules and patterns for generated files in the pdf-lab core
	library. Guides AI agents on which files are generated, how they are updated,
	and how to handle issues or pull requests involving generated code.
---

# PDF-Lab Generated Files

This skill documents **how generated files are handled** in the e-invoice-eu repo.
Generated files appear in `packages/pdf-lab-core/src`.

## General Rules

- **Generated files are read-only.**
  - Do not edit manually.
  - Edits must be made in the **source from which the file is generated** or the script that generates it.
- **First line always contains a warning comment!**. Example:
  
```ts
/* istanbul ignore file */
// This file is generated! Do NOT edit!
//
// Edit the file 'gen-tables.ts' in the directory 'scripts' in the project
// root instead!
```

The exact wording differs, but it is always clear that changes to the file will
be overwritten.

Generated files include:

* `agl.ts` with mappings from Adobe Glyph List (AGL) names to Unicode and vice versa

More files may follow in the future.

## Updating Generated Files

Files are updated by scripts in `/scripts` (in the repository root) via
`script` entries in the top-level `package.json`.

Typical workflow:

* Edit data source or generating script(YAML, XSL, spreadsheet, or JSON template)
* Run `pnpm run gen` in the repository root
* Commit both the source and updated generated files together

The command `pnpm run gen` generates all files.
You can also generate subsets of the generated files, for example with
`pnpm run gen:agl`.

Don'ts:

* Do not update generated files independently in PRs.

## Handling Issues and Pull Requests

AI agents should:

* Never suggest direct edits to generated files.
* Detect if a PR modifies generated files without updating sources → flag as improper.
* Prefer to guide contributors to modify the source artifacts instead.
* Understand that most type-checking, linting, and documentation applies to source-generated content, not runtime values in generated files.

## Summary for AI Agents

* Generated files are read-only; never edit manually.
* Workflow: edit source → regenerate → commit.
* Validation: type tests, linting, and documentation check the generated files automatically.
* PR handling: advise contributors to update sources, not generated files.
