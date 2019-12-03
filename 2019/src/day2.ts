import { getInput } from './utils/getInput';

export enum OP {
  ADD = 1,
  MULTIPLY = 2,
  EXT = 99,
}

export const runProgram = (
  initialMemory: number[],
  input?: [number, number]
) => {
  const memory = [...initialMemory];

  if (input) {
    Object.assign(memory, { 1: input[0], 2: input[1] });
  }

  let iPointer = 0;

  while (true) {
    const [op, xPointer, yPointer, writePointer] = memory.slice(iPointer);

    if (op === OP.EXT) break;

    const x = memory[xPointer];
    const y = memory[yPointer];

    switch (op) {
      case OP.ADD:
        memory[writePointer] = x + y;
        break;
      case OP.MULTIPLY:
        memory[writePointer] = x * y;
        break;
      default:
        throw Error('invalid op code: ' + op);
    }

    iPointer += 4;
  }

  return memory;
};

const challengeInputPromise = getInput('day2.txt', ',', n => Number(n));

export const solvePart1 = async () => {
  const initalMemory = await challengeInputPromise;
  const [output] = runProgram(initalMemory, [12, 2]);
  return output;
};

export const solvePart2 = async (target: number) => {
  const initalMemory = await challengeInputPromise;

  for (let noun = 0; noun < 100; noun += 1) {
    for (let verb = 0; verb < 100; verb += 1) {
      const [output] = runProgram(initalMemory, [noun, verb]);
      if (output === target) return 100 * noun + verb;
    }
  }

  throw Error('unsolvable');
};
