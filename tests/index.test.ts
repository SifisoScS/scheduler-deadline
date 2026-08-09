import { start, execute, validate, Deadline } from '../src/index.ts';

describe('Module functions', () => {
  test('start is a function', () => {
    expect(typeof start).toBe('function');
  });

  test('execute is a function', () => {
    expect(typeof execute).toBe('function');
  });

  test('validate is a function', () => {
    expect(typeof validate).toBe('function');
  });

  test('validate(1) returns true', () => {
    expect(validate(1)).toBe(true);
  });

  test('validate(undefined) returns false', () => {
    expect(validate(undefined)).toBe(false);
  });

  test('validate(null) returns false', () => {
    expect(validate(null)).toBe(false);
  });

  test('execute runs without throwing', () => {
    expect(() => execute()).not.toThrow();
  });
});

describe('Deadline class', () => {
  test('creates a valid deadline', () => {
    const due = new Date('2026-12-31');
    const deadline = new Deadline(due, 'Finish project');
    expect(deadline.getDueDate()).toEqual(due);
    expect(deadline.getDescription()).toBe('Finish project');
  });

  test('throws on invalid date', () => {
    expect(() => new Deadline(new Date('invalid'))).toThrow();
  });

  test('isOverdue returns true for past date', () => {
    const past = new Date('2020-01-01');
    const deadline = new Deadline(past);
    expect(deadline.isOverdue()).toBe(true);
  });

  test('isOverdue returns false for future date', () => {
    const future = new Date('2030-01-01');
    const deadline = new Deadline(future);
    expect(deadline.isOverdue()).toBe(false);
  });
});
