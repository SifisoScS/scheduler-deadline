# scheduler-deadline

[![CI](https://github.com/SifisoScS/scheduler-deadline/actions/workflows/ci.yml/badge.svg)](https://github.com/SifisoScS/scheduler-deadline/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D20-brightgreen.svg)](https://nodejs.org)

A deadline you cannot corrupt, and an overdue check you can trust.

![How scheduler-deadline models a deadline: a timeline where isOverdue is false before the due date and true after it, and false at the exact instant](https://raw.githubusercontent.com/SifisoScS/scheduler-deadline/main/assets/overview.svg)

## What it does

`scheduler-deadline` models one thing — a **due date**, with an optional
description — and answers one question about it: **has it passed?**

That sounds trivial, and the arithmetic is. What is not trivial is getting the
surrounding details right, and those details are what this package exists to
guarantee:

- **A deadline can never hold an invalid date.** `new Deadline(new Date('oops'))`
  throws immediately, rather than producing an object whose every comparison
  silently returns `false` because `NaN` compares false against everything.
- **A deadline cannot be changed behind your back.** `Date` is mutable, so a
  naive implementation lets anyone holding the original date — or the one your
  getter returned — quietly move the deadline. This one copies on the way in and
  on the way out.
- **"Overdue" has a defined meaning at the boundary.** At the exact due instant
  the deadline is _not_ overdue; it becomes overdue one millisecond later.
- **The clock is an argument, not a global.** `isOverdue(now?)` lets you pass the
  current time in, so scheduling logic is testable without freezing timers.

It is a **value object**, not a scheduler. It does not run tasks, hold timers, or
touch the network, the filesystem, or the clock unless you ask. It is the piece
you build a scheduler _out of_ — the part where an off-by-one or a leaked
reference turns into a job that fires at the wrong time.

### When to use it

Reach for it when something in your system has a point in time it must happen
by, and you want that fact represented explicitly instead of as a bare `Date`
passed around and compared ad hoc.

If you need recurrence, cron expressions, intervals, priorities, or throttling,
this is not that package — it is one module in a wider `task-scheduler` family
(see `system.json`).

## Installation

```bash
npm install scheduler-deadline
```

Requires Node.js 20 or newer. Ships ESM and CommonJS builds with type
definitions for each, and has **zero runtime dependencies**.

## Usage

```typescript
import { Deadline, validate } from 'scheduler-deadline';

const deadline = new Deadline(new Date('2026-12-31'), 'Finish project');

deadline.getDueDate(); // 2026-12-31T00:00:00.000Z
deadline.getDescription(); // 'Finish project'
deadline.isOverdue(); // false

validate(42); // true
validate(0); // true  — defined, just falsy
validate(undefined); // false
```

CommonJS works the same way:

```javascript
const { Deadline, validate } = require('scheduler-deadline');
```

### Testing time-dependent logic

Pass the clock in and your tests stop depending on when they run:

```typescript
const deadline = new Deadline(new Date('2025-06-01'));

deadline.isOverdue(new Date('2025-01-01')); // false
deadline.isOverdue(new Date('2026-01-01')); // true
```

### Immutability in practice

```typescript
const due = new Date('2030-01-01');
const deadline = new Deadline(due);

due.setFullYear(1990); // does not affect the deadline
deadline.getDueDate().setFullYear(1990); // nor does this

deadline.isOverdue(); // still false
```

## API

### `new Deadline(dueDate: Date, description?: string)`

Creates a deadline. Throws if `dueDate` is not a valid `Date`. The date is
copied, so later changes to the argument do not affect the instance.

#### `getDueDate(): Date`

Returns a **copy** of the due date. Mutating it does not affect the deadline.

#### `getDescription(): string | undefined`

Returns the description, or `undefined` if none was given. An empty string is
preserved as an empty string.

#### `isOverdue(now?: Date): boolean`

Returns `true` when the deadline is **strictly** in the past. At the exact due
instant the result is `false`.

`now` defaults to the current time. Throws if `now` is not a valid `Date`.

### `validate(input: unknown): boolean`

Returns `true` when `input` is neither `undefined` nor `null`.

This is a defined-ness check, not a truthiness check: `validate(0)`,
`validate('')` and `validate(false)` all return `true`.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for setup and the checks CI runs. Security
reports go through [SECURITY.md](SECURITY.md), not the issue tracker.

## License

MIT © Sifiso Cyprian Shezi
