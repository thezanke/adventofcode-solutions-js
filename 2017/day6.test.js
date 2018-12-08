const { CHALLENGE_INPUT } = require('./input/day6');
const { countUniqueCycles, findLoopSize } = require('./lib/day6');

test('countUniqueCycles for example', () => {
  expect(countUniqueCycles([0, 2, 7, 0])).toEqual(5);
});

test('countUniqueCycles for challenge', () => {
  expect(countUniqueCycles(CHALLENGE_INPUT)).toEqual(3156);
});

test('findLoopSize for example', () => {
  expect(findLoopSize([0, 2, 7, 0])).toEqual(4);
});

test('findLoopSize for example', () => {
  expect(findLoopSize(CHALLENGE_INPUT)).toEqual(1610);
});
