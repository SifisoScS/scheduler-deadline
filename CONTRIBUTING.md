# Contributing

Thanks for taking the time to contribute.

## Getting started

Requires Node.js 20 or newer (see `engines` in `package.json`).

```bash
git clone https://github.com/SifisoScS/scheduler-deadline.git
cd scheduler-deadline
npm ci
```

Use `npm ci` rather than `npm install` so you get exactly the locked dependency
tree that CI uses.

## Scripts

| Script                  | What it does                                    |
| ----------------------- | ----------------------------------------------- |
| `npm run build`         | Compiles `src/` to `dist/`                      |
| `npm test`              | Runs the Jest suite                             |
| `npm run test:coverage` | Runs tests and enforces the coverage thresholds |
| `npm run lint`          | ESLint, including type-aware rules              |
| `npm run type-check`    | Type-checks the production and test projects    |
| `npm run format`        | Formats with Prettier                           |

Before opening a pull request, run the same checks CI does:

```bash
npm run lint && npm run type-check && npm run test:coverage && npm run build
```

## Project layout

- `src/` — the published source. Compiled to `dist/`, which is gitignored.
- `tests/` — Jest specs. Type-checked via `tsconfig.test.json`.
- `tsconfig.json` — production build. Deliberately excludes tests and does not
  pull in Jest's global types.
- `tsconfig.test.json` — extends the above and adds `tests/` plus Jest types.

## Standards

- **TypeScript is strict**, with several additional checks enabled. Do not
  weaken `tsconfig.json` to make an error go away.
- **Coverage floors are enforced** (90% statements, 95% branches). New code
  needs tests.
- **A bug fix needs a regression test** — one that fails against the unfixed
  code. That is the point of it.
- **No runtime dependencies.** This package has none and should keep it that
  way. Development dependencies are fine.
- **Do not commit build output.** `dist/` is generated.

## Commit messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add recurring deadline support
fix: reject invalid now argument in isOverdue
chore: bump eslint to v9
docs: clarify isOverdue boundary behaviour
```

## Pull requests

1. Branch from `main`.
2. Keep the change focused; unrelated cleanups belong in their own PR.
3. Update `CHANGELOG.md` under `[Unreleased]`.
4. Make sure CI is green — it runs on Node 20, 22, and 24.

## Reporting bugs

Open an issue with the version, a minimal reproduction, and what you expected
instead. For security problems see [SECURITY.md](SECURITY.md) — please do not
use the public issue tracker.
