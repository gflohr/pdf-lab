---
name: repo-structure-navigate
description: Navigate pdf-lab repository structure. Use when looking for files, understanding the codebase layout, locating tests, API docs, or guide pages. Covers monorepo layout, library architecture, file naming conventions, and quick lookups.
---

# E-Invoice-EU Repository Structure

## Monorepo Layout

```text
pdf-lab/
├── assets/             # PDF documents, fonts, and so on.
├── apps/               # Applications.
│   └── cli/            # The command-line interfaace
├── packages/           # Other.
│   └── pdf-lab-core/   # The pdf-lab-core library.
└   scripts/            # Various helper scripts.
```

## Core Library (`/packages/pdf-lab-core/src/`)

### Directory Structure

| Directory   | Purpose                         | Examples                                      |
| ----------- | ------------------------------- | --------------------------------------------- |
| `encoding/` | Encoding domain.                | `mappers/`, `single-byte-encodings/`          |
| `font/`     | Font domain.                    | `font-loader/`, `font-resolver`               |
| `parser/`   | Mini-parser for PDF             | `lexer/`.                                     |
| `pdf/`      | PDF manipulation and analysis   | `text-extractor.ts`, `glyph-extractor.ts`.    |

### File Naming Convention

Test files (`*.spec.ts`) live next to the file with the class under test. There
is no test directory.

## Commands

```bash
pnpm install                    # Install dependencies
pnpm test                       # Run Jest tests (all packages)
pnpm check                      # Biome check (all packages)
pnpm check:fix                  # Biome check and fix fixable issues (all packages)
pnpm build                      # Build for publishing (all packages)
```

They work and do the same thing from the root of the repository for all
workspaces or from a workspace directory.

## Key Principles

1. **Modularity** - Small, focused functions
2. **Maximum test coverage** - Required for library
3. **Tree-shakable** - Use `// @__NO_SIDE_EFFECTS__` annotation (not yet implemented)
4. **Type-safe** - Full TypeScript with strict mode

## Do's and Don'ts

**Do:**

- Follow existing code patterns
- Write runtime and type tests
- Add TypeDoc documentation
- Keep functions small and focused
- Check bundle size impact

**Don't:**

- Add unnecessary external dependencies (left-pad)
- Modify core types without full test run
- Skip tests
- Create large multi-purpose functions
- Modify generated files (`dist/`, `coverage/`)
