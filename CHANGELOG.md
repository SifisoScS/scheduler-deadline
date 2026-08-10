# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2026-08-10

First release. Nothing was published before this version.

### Added

- `Deadline` — an immutable deadline with a due date and optional description.
  - Rejects an invalid `dueDate` at construction.
  - Copies dates in and out, so an instance cannot be mutated through a
    reference the caller holds.
  - `isOverdue(now?)` takes an optional clock, which makes time-dependent logic
    deterministic in tests. It is `false` at the exact due instant and throws on
    an invalid `now`.
- `validate(input)` — a defined-ness check. `0`, `''` and `false` are all valid;
  only `undefined` and `null` are not.
- Dual **ESM and CommonJS** builds, each with its own type definitions and
  source maps, resolved through the `exports` map.
- **Zero runtime dependencies.** Requires Node.js 20 or newer.

### Notes

Quality gates enforced in CI on Node 20, 22 and 24: 100% test coverage against
enforced thresholds, type-checking of both source and tests, type-aware linting,
formatting, a dependency audit, smoke tests against both build formats, and a
check that the published package resolves correctly for `import` and `require`.

Releases are published from CI with
[npm provenance](https://docs.npmjs.com/generating-provenance-statements).

[unreleased]: https://github.com/SifisoScS/scheduler-deadline/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/SifisoScS/scheduler-deadline/releases/tag/v1.0.0
