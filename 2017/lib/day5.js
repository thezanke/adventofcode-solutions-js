// @flow
const countJumps = (
  _instructions: number[],
  incrementer: (offset: number) => number = () => 1
): number => {
  const instructions = [..._instructions];
  let jumps = 0;
  let index = 0;

  while (index >= 0 && index < instructions.length) {
    const currentIndex = index;
    const offset = instructions[currentIndex];

    jumps++;
    index += offset;
    instructions[currentIndex] += incrementer(offset);
  }

  return jumps;
};

module.exports = { countJumps };
