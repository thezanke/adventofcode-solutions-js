const { CHALLENGE_INPUT } = require('./input/day5');
const { performReactions, part1, part2 } = require('./lib/day5');

describe('day 5', () => {
  test('example 1', () => {
    expect(performReactions('dabAcCaCBAcCcaDA')).toEqual('dabCBAcaDA');
  });

  test('part 1', () => {
    expect(part1(CHALLENGE_INPUT)).toEqual(10564);
  });

  test('example 2', () => {
    expect(part2('dabAcCaCBAcCcaDA')).toEqual(4);
  });

  test('part 2', () => {
    expect(part2(CHALLENGE_INPUT)).toEqual(6336);
  });
})