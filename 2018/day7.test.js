const { EXAMPLE_INPUT, CHALLENGE_INPUT } = require('./input/day7');

const { part1 } = require('./lib/day7');

describe('day 7', () => {
  test('example', () => {
    expect(part1(EXAMPLE_INPUT)).toEqual('CABDFE');
  });

  test('part 1', () => {
    expect(part1(CHALLENGE_INPUT)).toEqual('FDSEGJLPKNRYOAMQIUHTCVWZXB');
  });

  test.skip('part 2', () => {});
});
