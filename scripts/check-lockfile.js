'use strict';

/**
 * Guards against a platform-pruned package-lock.json.
 *
 * A bare `npm install` resolves optional dependencies against the current
 * machine only and rewrites the lockfile without the native bindings for other
 * platforms. Jest 30 pulls in such bindings via jest-resolve, so committing a
 * lockfile produced that way breaks `npm ci` for everyone on a different OS.
 *
 * The check is deliberately generic: it looks for optional packages carrying an
 * `os` constraint and asserts that the platforms we build on are all still
 * represented. It never hardcodes a package name, so it keeps working when the
 * dependency tree changes. If the tree has no platform-scoped packages at all
 * there is nothing to prune, and the check passes.
 *
 * Usage:
 *   node scripts/check-lockfile.js [path-to-package-lock.json]
 */

const fs = require('node:fs');
const path = require('node:path');

const REQUIRED_PLATFORMS = ['linux', 'darwin', 'win32'];

const target = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.join(__dirname, '..', 'package-lock.json');

if (!fs.existsSync(target)) {
  console.error(`check-lockfile: no lockfile at ${target}`);
  process.exit(1);
}

let lock;
try {
  lock = JSON.parse(fs.readFileSync(target, 'utf8'));
} catch (error) {
  console.error(`check-lockfile: ${target} is not valid JSON — ${error.message}`);
  process.exit(1);
}

const scoped = Object.entries(lock.packages ?? {}).filter(([, meta]) => Array.isArray(meta.os));

if (scoped.length === 0) {
  console.log('check-lockfile: no platform-scoped packages — nothing to prune.');
  process.exit(0);
}

const present = new Set(scoped.flatMap(([, meta]) => meta.os));
const missing = REQUIRED_PLATFORMS.filter((platform) => !present.has(platform));

if (missing.length > 0) {
  console.error(
    [
      '',
      'check-lockfile: package-lock.json looks platform-pruned.',
      '',
      `  missing platforms : ${missing.join(', ')}`,
      `  present platforms : ${[...present].sort().join(', ') || '(none)'}`,
      `  platform-scoped   : ${scoped.length} package(s)`,
      '',
      'This happens when a bare `npm install` rewrites the lockfile using only',
      'the current machine, dropping native bindings other platforms need.',
      '`npm ci` on those platforms will then fail or silently misbehave.',
      '',
      'To fix:',
      '  git checkout -- package-lock.json   # discard the pruned lockfile',
      '  npm ci                              # install without rewriting it',
      '',
      'Let Dependabot or CI own package-lock.json. Use `npm ci` locally.',
      '',
    ].join('\n'),
  );
  process.exit(1);
}

console.log(
  `check-lockfile: ok — ${scoped.length} platform-scoped package(s) covering ${[...present]
    .sort()
    .join(', ')}.`,
);
