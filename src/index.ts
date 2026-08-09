/**
 * Represents a deadline with a due date and optional description.
 */
export class Deadline {
  private readonly dueDate: Date;
  private readonly description?: string;

  /**
   * Creates a new Deadline.
   * @param dueDate - The date by which the task must be completed.
   * @param description - Optional description of the deadline.
   * @throws {Error} If dueDate is not a valid Date.
   */
  constructor(dueDate: Date, description?: string) {
    if (!(dueDate instanceof Date) || isNaN(dueDate.getTime())) {
      throw new Error('Invalid dueDate: must be a valid Date object.');
    }
    this.dueDate = dueDate;
    this.description = description;
  }

  /**
   * Returns the due date.
   */
  getDueDate(): Date {
    return this.dueDate;
  }

  /**
   * Returns the description, if any.
   */
  getDescription(): string | undefined {
    return this.description;
  }

  /**
   * Checks if the deadline has passed.
   * @param now - Optional current date (defaults to new Date()).
   * @returns true if the deadline is in the past.
   */
  isOverdue(now: Date = new Date()): boolean {
    return this.dueDate.getTime() < now.getTime();
  }
}

/**
 * Primary entry point for this module.
 * Calls execute() and exits cleanly.
 */
export function start(): void {
  console.log('📦 Module starting...');
  execute();
}

/**
 * Execute the module's primary workload.
 * Override or extend this function to add domain-specific behaviour.
 */
export function execute(): void {
  console.log('📦 Module executed');
}

/**
 * Validate that the given input is defined and not null.
 * @param input - Any value to check.
 * @returns true when input is not undefined or null.
 */
export function validate(input: unknown): boolean {
  return input !== undefined && input !== null;
}
