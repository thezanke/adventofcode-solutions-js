const { createProgram, findFirstRecovered } = require('./day18');
const { EXAMPLE_INPUT, CHALLENGE_INPUT } = require('./day18.input');

test('find first recovered value for example input', () => {
  const program = createProgram(EXAMPLE_INPUT);
  expect(findFirstRecovered(program)).toEqual(4);
});

test('find first recovered value for challenge input', () => {
  const program = createProgram(CHALLENGE_INPUT);
  expect(findFirstRecovered(program)).toEqual(1187);
});
