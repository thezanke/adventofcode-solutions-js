// @flow
const redistribute = (blocks: number[]): number[] => {
  const largestIndex = blocks.findIndex(
    n => blocks.filter(m => n >= m).length === blocks.length
  );

  let amount = blocks[largestIndex];

  const newBlocks = [...blocks];
  newBlocks[largestIndex] = 0;

  let i = largestIndex + 1;

  while (amount > 0) {
    if (i === newBlocks.length) i = 0;
    newBlocks[i] += 1;
    amount -= 1;
    i += 1;
  }

  return newBlocks;
};

const countUniqueCycles = (blocks: number[]): number => {
  let current = [...blocks];
  let previous = [];
  let cycles = 0;
  let found = false;

  while (!found) {
    cycles += 1;
    previous.push(current.toString());
    current = redistribute(current);
    if (previous.includes(current.toString())) found = true;
  }

  return cycles;
};


const findLoopSize = (blocks: number[]): number => {
  let current = [...blocks];
  let previous = [];
  let cycles = 0;
  let found = false;

  while (!found) {
    cycles += 1;
    previous.push(current.toString());
    current = redistribute(current);
    if (previous.includes(current.toString())) found = true;
  }

  let last = current;
  let loopSize = 0;

  do {
    loopSize += 1;
    current = redistribute(current);
  } while (current.toString() !== last.toString());
  
  return loopSize;
};

module.exports = { redistribute, countUniqueCycles, findLoopSize };
