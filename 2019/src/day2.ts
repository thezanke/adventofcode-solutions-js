import { chunk } from 'lodash';
import { getInput } from './utils/getInput';

export enum OP {
  ADD = 1,
  MULTIPLY = 2,
  EXT = 99,
}

export const runProgram = (initialMemory: number[]) => {
  const memory = [...initialMemory];

  let instructionPointer = 0;

  const nextInstruction = () => {
    instructionPointer += 4;
  };

  while (true) {
    const [op, xPointer, yPointer, savePointer] = memory.slice(
      instructionPointer,
      instructionPointer + 4
    );

    if (op === OP.EXT) break;

    const x = memory[xPointer];
    const y = memory[yPointer];

    switch (op) {
      case OP.ADD:
        memory[savePointer] = x + y;
        nextInstruction();
        break;
      case OP.MULTIPLY:
        memory[savePointer] = x * y;
        nextInstruction();
        break;
      default:
        throw Error('invalid op code: ' + op);
    }
  }

  return memory;
};

export const solvePart1 = async () => {
  const program = await getInput('day2.txt', ',', n => Number(n));

  /**
   * !! NOTICE !!
   * Before running the program, replace position 1 with the value 12
   * and replace position 2 with the value 2.
   */
  Object.assign(program, { 1: 12, 2: 2 });

  const output = runProgram(program);

  return output[0];
};
