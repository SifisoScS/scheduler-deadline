# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Initial project setup with TypeScript, Jest, ESLint, and Prettier.
- `Deadline` class with validation and `isOverdue` method.
- `start`, `execute`, and `validate` functions.
- CI workflow covering the supported Node.js versions.
- MIT license and changelog.
- Package metadata: `exports` map, `engines`, `sideEffects: false`, and a
  `prepublishOnly` gate that lints, tests, and builds before publishing.
- `CONTRIBUTING.md` describing setup, scripts, standards, and the PR process.

### Fixed

- Removed a stray `smoke-test` runtime dependency that pointed at a deleted local
  directory. It shipped in the published manifest and broke installation for consumers.
- `Deadline` now copies dates defensively on construction and in `getDueDate()`.
  Instances could previously be mutated through a reference held by the caller.
- `isOverdue()` now validates its `now` argument instead of silently returning
  `false` when given an invalid `Date`.

### Removed

- Stale compiled `src/index.js` artifact, which had diverged from `src/index.ts`
  and disagreed with it on `validate(null)`.
- Self-reported `quality` and `regressionReport` blocks from `system.json`.
  Nothing generated them and they did not reflect the state of the code.

### Changed

- Minimum supported Node.js is now 20 (was 18, which is end-of-life). CI runs on
  Node 20, 22, and 24.
- ESLint upgraded to v9 with flat config and type-aware linting enabled.
- Tests are now type-checked. `tsconfig.test.json` covers `tests/`, while the
  production `tsconfig.json` no longer pulls in Jest's global types.
- Enabled `noUncheckedIndexedAccess`, `noUnusedLocals`, `noUnusedParameters`,
  and `noImplicitOverride`.
- Coverage thresholds are enforced (90% statements, 95% branches); the suite
  currently sits at 100% on every metric.
- Tautological tests replaced with behavioural ones covering `start`, falsy-but-
  defined `validate` inputs, empty descriptions, and the `isOverdue` boundary.
- CI hardened: least-privilege `permissions`, actions pinned to commit SHAs, a
  dependency audit step, and a smoke test that asserts on the built output.

### Security

- Added `SECURITY.md` with a private vulnerability reporting process.
- Added Dependabot for npm and GitHub Actions updates.
