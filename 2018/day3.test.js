const { CHALLENGE_INPUT } = require('./input/day3');
const { part1, part2 } = require('./lib/day3');

describe('day 3', () => {
  test('part 1', () => {
    expect(part1(CHALLENGE_INPUT)).toEqual(107663);
  });

  test('part 2', () => {
    expect(part2(CHALLENGE_INPUT)).toEqual(1166);
  });
})