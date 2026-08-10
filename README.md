# scheduler-deadline

A small TypeScript module for representing deadlines in a task scheduler.

Zero runtime dependencies. Ships both ESM and CommonJS builds with type
definitions for each. Requires Node.js 20 or newer.

## Installation

```bash
npm install scheduler-deadline
```

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

## API

### `new Deadline(dueDate: Date, description?: string)`

Creates a deadline. Throws if `dueDate` is not a valid `Date`.

Instances are **immutable**. The date is copied on the way in and on the way
out, so a caller cannot change a deadline through a reference it holds:

```typescript
const due = new Date('2030-01-01');
const deadline = new Deadline(due);

due.setFullYear(1990); // does not affect the deadline
deadline.getDueDate().setFullYear(1990); // nor does this

deadline.isOverdue(); // still false
```

#### `getDueDate(): Date`

Returns a copy of the due date.

#### `getDescription(): string | undefined`

Returns the description, or `undefined` if none was given.

#### `isOverdue(now?: Date): boolean`

Returns `true` when the deadline is **strictly** in the past. At the exact due
instant the result is `false`.

`now` defaults to the current time; pass it explicitly to make time-dependent
logic deterministic in tests. Throws if `now` is not a valid `Date`.

```typescript
const deadline = new Deadline(new Date('2025-06-01'));

deadline.isOverdue(new Date('2025-01-01')); // false
deadline.isOverdue(new Date('2026-01-01')); // true
```

### `validate(input: unknown): boolean`

Returns `true` when `input` is neither `undefined` nor `null`.

Note this is a defined-ness check, not a truthiness check: `validate(0)`,
`validate('')` and `validate(false)` all return `true`.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for setup and the checks CI runs. For
security reports see [SECURITY.md](SECURITY.md).

## License

MIT
