import { getInput } from './utils/getInput';
import { runProgram } from './runProgram';

const challengeInputPromise = getInput('day2.txt', ',', n => Number(n));

export const solvePart1 = async () => {
  const initalMemory = await challengeInputPromise;
  const [output] = runProgram(initalMemory, { 1: 12, 2: 2 }).memory;
  return output;
};

export const solvePart2 = async (target: number) => {
  const initalMemory = await challengeInputPromise;

  for (let noun = 0; noun < 100; noun += 1) {
    for (let verb = 0; verb < 100; verb += 1) {
      const [output] = runProgram(initalMemory, { 1: noun, 2: verb }).memory;
      if (output === target) return 100 * noun + verb;
    }
  }

  throw Error('unsolvable');
};
