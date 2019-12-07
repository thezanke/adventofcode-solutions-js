import * as _ from 'lodash';

export enum OP {
  ADD = 1,
  MULTIPLY = 2,
  SAVE_INPUT = 3,
  OUTPUT_VALUE = 4,
  TRUE_JUMP = 5,
  FALSE_JUMP = 6,
  LESS_THAN = 7,
  EQUALS = 8,
  EXT = 99,
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

const getParameter = (value: number, mode: number, memory: number[]) => {
  if (mode === 1) return value;
  return memory[value];
};

export const runProgram = (
  initialMemory: number[],
  overrides?: { [key: number]: number },
  input: number[] = [],
  outputHandler?: Function,
  debug = false
) => {
  const memory = [...initialMemory];
  if (overrides) Object.assign(memory, overrides);

  let iPointer = 0;
  let inputIndex = 0;

  while (true) {
    const opVal = memory[iPointer];
    const [opcode, modes] = getOpcode(opVal);
    const params = memory.slice(iPointer + 1, iPointer + 4);

    // console.log({ opcode: OP[opcode], modes, params });

    if (opcode === OP.EXT) break;

    switch (opcode) {
      case OP.ADD: {
        const x = getParameter(params[0], modes[0], memory);
        const y = getParameter(params[1], modes[1], memory);
        const writePointer = params[2];
        const result = x + y;
        memory[writePointer] = result;
        if (debug) {
          console.log('ADD', { x, y, result, writePointer, iPointer });
        }
        iPointer += 4;
        break;
      }
      case OP.MULTIPLY: {
        const x = getParameter(params[0], modes[0], memory);
        const y = getParameter(params[1], modes[1], memory);
        const writePointer = params[2];
        const result = x * y;
        memory[writePointer] = result;
        if (debug) {
          console.log('MULTIPLY', { x, y, result, writePointer, iPointer });
        }
        iPointer += 4;
        break;
      }
      case OP.SAVE_INPUT: {
        const x = input[inputIndex++];
        const [writePointer] = params;
        memory[writePointer] = x;
        if (debug) {
          console.log('SAVE_INPUT', { input: x, writePointer, iPointer });
        }
        iPointer += 2;
        break;
      }
      case OP.OUTPUT_VALUE: {
        if (!outputHandler) throw Error('output called with no handler');
        const output = getParameter(params[0], modes[0], memory);
        outputHandler(output);
        if (debug) {
          console.log('OUTPUT_VALUE', { output, iPointer });
        }
        iPointer += 2;
        break;
      }
      case OP.TRUE_JUMP: {
        const x = getParameter(params[0], modes[0], memory);
        const y = getParameter(params[1], modes[1], memory);
        if (debug) {
          console.log('TRUE_JUMP', { truthy: !!x, iPointer });
        }
        if (x) {
          iPointer = y;
        } else {
          iPointer += 3;
        }
        break;
      }
      case OP.FALSE_JUMP: {
        const x = getParameter(params[0], modes[0], memory);
        const y = getParameter(params[1], modes[1], memory);
        if (debug) {
          console.log('FALSE_JUMP', { falsy: !x, iPointer });
        }
        if (!x) {
          iPointer = y;
        } else {
          iPointer += 3;
        }
        break;
      }
      case OP.LESS_THAN: {
        const x = getParameter(params[0], modes[0], memory);
        const y = getParameter(params[1], modes[1], memory);
        const writePointer = params[2];
        const result = Number(x < y);
        memory[writePointer] = result;
        if (debug) {
          console.log('LESS_THAN', { x, y, result, writePointer, iPointer });
        }
        iPointer += 4;
        break;
      }
      case OP.EQUALS: {
        const x = getParameter(params[0], modes[0], memory);
        const y = getParameter(params[1], modes[1], memory);
        const writePointer = params[2];
        const result = Number(x === y);
        memory[writePointer] = result;
        if (debug) {
          console.log('LESS_THAN', { x, y, result, writePointer, iPointer });
        }
        iPointer += 4;
        break;
      }
      default:
        throw Error('invalid op code: ' + opcode);
    }
  }

  return memory;
};
