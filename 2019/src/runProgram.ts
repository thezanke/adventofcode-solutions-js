import * as _ from 'lodash';

export enum OP {
  ADD = 1,
  MULTIPLY = 2,
  EXT = 99,
}

const getOpcode = (value: number) => {
  const str = _.padStart(`${value}`, 5);
  const args = _.filter(_.map(str.slice(0, 3).split(''), Number), _.isNumber);
  const opcode = Number(str.slice(3));
  return [opcode, args];
};

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
    const [opcodeValue, xPointer, yPointer, writePointer] = memory.slice(
      iPointer
    );
    const [opcode, ...args] = getOpcode(opcodeValue);

    if (opcode === OP.EXT) break;

    const x = memory[xPointer];
    const y = memory[yPointer];

    switch (opcode) {
      case OP.ADD:
        memory[writePointer] = x + y;
        break;
      case OP.MULTIPLY:
        memory[writePointer] = x * y;
        break;
      default:
        throw Error('invalid op code: ' + opcode);
    }

    iPointer += 4;
  }

  return memory;
};
