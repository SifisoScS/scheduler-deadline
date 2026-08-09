const { start, execute, validate, Deadline } = require('scheduler-deadline');

// Exercise start
start();

// Exercise execute
execute();

// Exercise validate
console.log('validate(1):', validate(1));
console.log('validate(undefined):', validate(undefined));
console.log('validate(null):', validate(null));

// Exercise Deadline
const deadline = new Deadline(new Date('2030-01-01'), 'Finish project');
console.log('deadline.getDueDate():', deadline.getDueDate());
console.log('deadline.getDescription():', deadline.getDescription());
console.log('deadline.isOverdue():', deadline.isOverdue());
