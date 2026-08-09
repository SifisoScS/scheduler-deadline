# scheduler-deadline

A TypeScript module for managing deadlines in a task scheduler.

## Installation

```bash
npm install scheduler-deadline
```

## Usage

```typescript
import { Deadline, validate } from 'scheduler-deadline';

// Create a deadline
const deadline = new Deadline(new Date('2026-12-31'), 'Finish project');
console.log(deadline.getDueDate()); // 2026-12-31T00:00:00.000Z
console.log(deadline.isOverdue()); // false

// Validate input
console.log(validate(42)); // true
console.log(validate(undefined)); // false
```

## API

### `Deadline`

- `constructor(dueDate: Date, description?: string)` – Creates a new deadline.
- `getDueDate(): Date` – Returns the due date.
- `getDescription(): string | undefined` – Returns the description.
- `isOverdue(now?: Date): boolean` – Checks if the deadline has passed.

### `start()`

Logs a start message and calls `execute()`.

### `execute()`

Logs a message indicating the module executed.

### `validate(input: unknown): boolean`

Returns `true` if `input` is not `undefined` or `null`.

## Development

```bash
npm install
npm run build
npm test
npm run lint
```

## License

MIT
