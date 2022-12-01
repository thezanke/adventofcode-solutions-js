const { CHALLENGE_INPUT } = require('./input/day1');
const { part1, part2 } = require('./lib/day1');

describe('day 1', () => {
  test('part 1', () => {
    expect(part1(CHALLENGE_INPUT)).toEqual(531);
  });

  test('part 2', () => {
    expect(part2(CHALLENGE_INPUT)).toEqual(76787);
  });
});
