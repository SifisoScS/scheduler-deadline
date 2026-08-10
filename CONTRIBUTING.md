# Contributing

Thanks for taking the time to contribute.

## Getting started

Requires Node.js 20 or newer (see `engines` in `package.json`).

```bash
git clone https://github.com/SifisoScS/scheduler-deadline.git
cd scheduler-deadline
npm ci
```

**Use `npm ci`, never a bare `npm install`.** Beyond giving you exactly the
locked tree that CI uses, `npm install` resolves optional dependencies against
_your_ machine and rewrites `package-lock.json` without the native bindings
other platforms need. Jest pulls in such bindings, so committing a lockfile
produced that way breaks CI for everyone on a different OS.

A pre-commit hook and a CI step both guard against this. Run `npm run prepare`
once to enable the hook (it points `core.hooksPath` at `.githooks/`); `npm ci`
does it for you. To check by hand:

```bash
npm run check-lockfile
```

Let Dependabot or CI own `package-lock.json`.

## Scripts

| Script                   | What it does                                    |
| ------------------------ | ----------------------------------------------- |
| `npm run build`          | Compiles `src/` to `dist/`                      |
| `npm test`               | Runs the Jest suite                             |
| `npm run test:coverage`  | Runs tests and enforces the coverage thresholds |
| `npm run lint`           | ESLint, including type-aware rules              |
| `npm run type-check`     | Type-checks the production and test projects    |
| `npm run format`         | Formats with Prettier                           |
| `npm run check-lockfile` | Fails if package-lock.json is platform-pruned   |

Before opening a pull request, run the same checks CI does:

```bash
npm run check-lockfile && npm run format:check && npm run lint && npm run type-check && npm run test:coverage && npm run build
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

## Releasing

Releases are driven by an annotated tag; there is no manual `npm publish`.

1. Move the `[Unreleased]` entries in `CHANGELOG.md` under a new version
   heading with today's date.
2. Bump the version: `npm version <major|minor|patch>`. This commits the change
   and creates a matching `vX.Y.Z` tag.
3. Push both: `git push && git push --tags`.

Pushing the tag triggers `.github/workflows/release.yml`, which re-runs every
CI check, verifies the tag matches `package.json`, and publishes with
[npm provenance](https://docs.npmjs.com/generating-provenance-statements) so the
tarball is cryptographically linked to the commit that produced it.

A tag whose version disagrees with `package.json` fails the workflow rather than
publishing something untraceable.

**One-time setup:** the workflow needs an `NPM_TOKEN` secret (an npm automation
token) on the `npm-publish` environment. Gating it behind an environment means a
publish can require review before it runs.

## Reporting bugs

Open an issue with the version, a minimal reproduction, and what you expected
instead. For security problems see [SECURITY.md](SECURITY.md) — please do not
use the public issue tracker.
