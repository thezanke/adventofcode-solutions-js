// @flow
const countJumps = (instructions: number[]): number => {
  let jumps = 0;
  let index = 0;

  while (index >= 0 && index < instructions.length) {
    const current = index;
    jumps++;
    index += instructions[current];
    instructions[current]++;
  }

  return jumps;
};

module.exports = { countJumps };
