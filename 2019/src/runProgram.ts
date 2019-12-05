import * as _ from 'lodash';

export enum OP {
  ADD = 1,
  MULTIPLY = 2,
  SAVE = 3,
  OUTPUT = 4,
  EXT = 99,
}

interface OpcodeInfo {
  arguments: number;
}

export const getOpcode = (value: number): [number, number[]] => {
  const str = _.padStart(`${value}`, 5);
  const opcode = Number(str.slice(3));
  const args = _.map(
    str
      .slice(0, 3)
      .split('')
      .reverse(),
    n => (n !== ' ' ? Number(n) : null)
  ).filter(_.isNumber);

  return [opcode, args];
};

export const getParameter = (value: number, mode: number, memory: number[]) => {
  if (mode === 1) return value;
  return memory[value];
};

export const getParams = (
  params: number[],
  modes: number[],
  memory: number[]
) => {
  return params.map((p, i) => getParameter(p, modes[i], memory));
};

export const runProgram = (
  initialMemory: number[],
  overrides?: { [key: number]: number },
  input?: [number, number]
) => {
  const memory = [...initialMemory];

  console.log({ overrides });
  if (overrides) {
    Object.assign(memory, overrides);
  }

  let iPointer = 0;

  while (true) {
    const opVal = memory[iPointer];
    const [opcode, modes] = getOpcode(opVal);
    const params = memory.slice(iPointer + 1, iPointer + 4);

    if (opcode === OP.EXT) break;

    switch (opcode) {
      case OP.ADD: {
        const x = getParameter(params[0], modes[0], memory);
        const y = getParameter(params[1], modes[1], memory);
        const writePointer = params[2];
        memory[writePointer] = x + y;
        iPointer += 4;
        break;
      }
      case OP.MULTIPLY: {
        const x = getParameter(params[0], modes[0], memory);
        const y = getParameter(params[1], modes[1], memory);
        const writePointer = params[2];
        memory[writePointer] = x * y;
        iPointer += 4;
        break;
      }
      default:
        throw Error('invalid op code: ' + opcode);
    }
  }

  return memory;
};
