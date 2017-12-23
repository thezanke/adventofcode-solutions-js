const { countUniqueCycles, findLoopSize } = require('./day6');
const { CHALLENGE_INPUT } = require('./day6.input');

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
