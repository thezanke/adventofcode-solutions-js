const { CHALLENGE_INPUT } = require('./input/day9');
const { processStream, calculateTotal, countGroups, countGarbage } = require('./lib/day9');

test('process example input streams', () => {
  expect(countGroups(processStream('{}'))).toEqual(1);
  expect(countGroups(processStream('{{{}}}'))).toEqual(3);
  expect(countGroups(processStream('{{},{}}'))).toEqual(3);
  expect(countGroups(processStream('{{{},{},{{}}}}'))).toEqual(6);
  expect(countGroups(processStream('{<{},{},{{}}>}'))).toEqual(1);
  expect(countGroups(processStream('{<a>,<a>,<a>,<a>}'))).toEqual(1);
  expect(countGroups(processStream('{{<a>},{<a>},{<a>},{<a>}}'))).toEqual(5);
  expect(countGroups(processStream('{{<!>},{<!>},{<!>},{<a>}}'))).toEqual(2);
});

test('calculate total scores for examples', () => {
  expect(calculateTotal(processStream('{}'))).toEqual(1);
  expect(calculateTotal(processStream('{{{}}}'))).toEqual(6);
  expect(calculateTotal(processStream('{{},{}}'))).toEqual(5);
  expect(calculateTotal(processStream('{{{},{},{{}}}}'))).toEqual(16);
  expect(calculateTotal(processStream('{<a>,<a>,<a>,<a>}'))).toEqual(1);
  expect(calculateTotal(processStream('{{<ab>},{<ab>},{<ab>},{<ab>}}'))).toEqual(9);
  expect(calculateTotal(processStream('{{<!!>},{<!!>},{<!!>},{<!!>}}'))).toEqual(9);
  expect(calculateTotal(processStream('{{<a!>},{<a!>},{<a!>},{<ab>}}'))).toEqual(3);
});

test('calculate total score for challenge', () => {
  expect(calculateTotal(processStream(CHALLENGE_INPUT))).toEqual(12897);
})

test.only('count garbage for challenge', () => {
  expect(countGarbage(processStream(CHALLENGE_INPUT))).toEqual(7031);
})
