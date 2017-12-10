// @flow
const countJumps = (
  instructions: number[],
  incrementer: (offset: number) => number = () => 1
): number => {
  let jumps = 0;
  let offset = 0;

  while (offset >= 0 && offset < instructions.length) {
    const currentOffset = offset;
    const currentValue = instructions[currentOffset];

    jumps++;
    offset += currentValue;
    instructions[currentOffset] += incrementer(currentValue);
  }

  return jumps;
};

module.exports = { countJumps };
