const { countJumps } = require("./day5");
const { CHALLENGE_ONE } = require("./day5.input");

const CHALLENGE_ONE_INPUT = CHALLENGE_ONE.split("\n").map(num =>
  parseInt(num, 10)
);

test("counts jumps for challenge one example", () => {
  expect(countJumps([0, 3, 0, 1, -3])).toEqual(5);
});

test("counts jumps for challenge one", () => {
  expect(countJumps(CHALLENGE_ONE_INPUT)).toEqual(391540);
});

const CHALLENGE_TWO_INCREMENTER = offset => (offset >= 3 ? -1 : 1);

test("counts jumps for challenge two example", () => {
  expect(countJumps([0, 3, 0, 1, -3], CHALLENGE_TWO_INCREMENTER)).toEqual(10);
});

test("counts jumps for challenge two", () => {
  expect(countJumps(CHALLENGE_ONE_INPUT, CHALLENGE_TWO_INCREMENTER)).toEqual(
    391540
  );
});
