const CHALLENGE_INPUT = 347991;

const { calculateSteps } = require('./day3');

test('calculate steps for example', () => {
  expect(calculateSteps(1)).toEqual(0);
});

test('calculate steps for example', () => {
  expect(calculateSteps(12)).toEqual(3);
});

test('calculate steps for example', () => {
  expect(calculateSteps(23)).toEqual(2);
});

test('calculate steps for example', () => {
  expect(calculateSteps(1024)).toEqual(31);
});

test('calculate steps for challenge', () => {
  expect(calculateSteps(CHALLENGE_INPUT)).toEqual(480);
});

const { calculateLargerThan } = require('./day3');

test('calculate first large value for example', () => {
  expect(calculateLargerThan(1)).toEqual(2);
});

test('calculate first large value for example', () => {
  expect(calculateLargerThan(2)).toEqual(4);
});

test('calculate first large value for example', () => {
  expect(calculateLargerThan(30)).toEqual(54);
});

test('calculate first large value for example', () => {
  expect(calculateLargerThan(100)).toEqual(122);
});

test('calculate first large value for example', () => {
  expect(calculateLargerThan(300)).toEqual(304);
});

test('calculate first large value for challenge', () => {
  expect(calculateLargerThan(CHALLENGE_INPUT)).toEqual(349975);
});
