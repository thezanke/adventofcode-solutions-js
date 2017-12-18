const { countJumps } = require('./day5');
const { CHALLENGE_INPUT } = require('./day5.input');

test('counts jumps for challenge one example', () => {
  expect(countJumps([0, 3, 0, 1, -3])).toEqual(5);
});

test('counts jumps for challenge one', () => {
  expect(countJumps(CHALLENGE_INPUT)).toEqual(391540);
});

const CHALLENGE_TWO_INCREMENTER = offset => (offset >= 3 ? -1 : 1);

test('counts jumps for challenge two example', () => {
  expect(countJumps([0, 3, 0, 1, -3], CHALLENGE_TWO_INCREMENTER)).toEqual(10);
});

test("counts jumps for challenge two", () => {
  expect(countJumps(CHALLENGE_INPUT, CHALLENGE_TWO_INCREMENTER)).toEqual(
    30513679
  );
});
