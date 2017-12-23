const { processInstructions, findLargestValue } = require('./day8');
const { EXAMPLE_INPUT, CHALLENGE_INPUT } = require('./day8.input');

test('process instructions for example input', () => {
  expect(processInstructions(EXAMPLE_INPUT)).toEqual({ a: 1, b: 0, c: -10 });
});

test('find largest value for example input', () => {
  const registers = processInstructions(EXAMPLE_INPUT);
  expect(findLargestValue(registers)).toEqual(1);
});

test('find largest value for challenge input', () => {
  const registers = processInstructions(CHALLENGE_INPUT);
  expect(findLargestValue(registers)).toEqual(8022);
});

test('process instructions with history for example input', () => {
  const { registers, history } = processInstructions(EXAMPLE_INPUT, true);
  expect(registers).toEqual({ a: 1, b: 0, c: -10 });
  expect(history[0]).toEqual({ a: 0, b: 0, c: 0 });
  expect(history[1]).toEqual({ a: 1, b: 0, c: 0 });
  expect(history[2]).toEqual({ a: 1, b: 0, c: 10 });
  expect(history[3]).toEqual(registers);
});

test('find largest value in history for example input', () => {
  const { history } = processInstructions(EXAMPLE_INPUT, true);
  expect(findLargestValue(history.map(findLargestValue))).toEqual(10);
});

test('find largest value in history for example input', () => {
  const { history } = processInstructions(CHALLENGE_INPUT, true);
  expect(findLargestValue(history.map(findLargestValue))).toEqual(10);
});
