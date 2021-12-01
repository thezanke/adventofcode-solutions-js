const { CHALLENGE_INPUT } = require('./input/day2');
const { part1, part2 } = require('./lib/day2');

describe('day 2', () => {
  test('part 1', () => {
    expect(part1(CHALLENGE_INPUT)).toEqual(5658);
  });

  test('part 2', () => {
    expect(part2(CHALLENGE_INPUT)).toEqual('nmgyjkpruszlbaqwficavxneo');
  });
})
