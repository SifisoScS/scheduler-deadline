# Security Policy

## Supported versions

| Version | Supported |
| ------- | --------- |
| 1.x     | ✅        |
| < 1.0   | ❌        |

Only the latest 1.x release receives security fixes.

## Reporting a vulnerability

Please **do not open a public issue** for security problems.

Report privately through GitHub's
[private vulnerability reporting](https://github.com/SifisoScS/scheduler-deadline/security/advisories/new)
form. That opens a draft advisory visible only to the maintainers.

Please include:

- a description of the issue and why you believe it is a security problem,
- the affected version,
- steps to reproduce, ideally a minimal snippet,
- the impact you think it has.

## What to expect

- **Acknowledgement** within 7 days.
- **Initial assessment** within 14 days, including whether it is accepted.
- **Fix and release** for accepted reports as soon as practical, coordinated
  with you on disclosure timing.

You will be credited in the advisory and the changelog unless you ask otherwise.

## Scope

This package has **no runtime dependencies** and performs no file, network, or
process access. Its public surface is a small date-handling API. The most likely
classes of issue are therefore incorrect date comparison, unvalidated input
reaching a caller's scheduling logic, or a supply-chain problem in the published
tarball. Reports about development-only dependencies are welcome but will
usually be handled as ordinary issues.
