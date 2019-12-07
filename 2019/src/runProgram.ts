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

export class Program {
  private _memory: number[];
  private inputs: number[];
  private iPointer = 0;

  waiting = false;
  exited = false;

  constructor(
    initialMemory: number[],
    overrides?: { [key: number]: number },
    initalInputs: number[] = [],
    private outputHandler?: Function,
    private debugging = false
  ) {
    this._memory = [...initialMemory];
    this.inputs = [...initalInputs];
    if (overrides) Object.assign(this._memory, overrides);
    this.run();
  }
  
  // tslint:disable-next-line no-any
  private debug(...args: any[]) {
    if (this.debugging) {
      console.log(`${this.iPointer}: `, ...args);
    }
  }

  private next(): OP {
    const opVal = this._memory[this.iPointer];
    const [opcode, modes] = getOpcode(opVal);
    const params = this._memory.slice(this.iPointer + 1, this.iPointer + 4);

    // console.log({ opcode: OP[opcode], modes, params });

    switch (opcode) {
      case OP.EXT: {
        this.exited = true;
        break;
      }
      case OP.ADD: {
        const x = getParameter(params[0], modes[0], this._memory);
        const y = getParameter(params[1], modes[1], this._memory);
        const writePointer = params[2];
        const result = x + y;

        this._memory[writePointer] = result;

        this.debug('ADD', { x, y, result, writePointer });

        this.iPointer += 4;
        break;
      }
      case OP.MULTIPLY: {
        const x = getParameter(params[0], modes[0], this._memory);
        const y = getParameter(params[1], modes[1], this._memory);
        const writePointer = params[2];
        const result = x * y;
        this._memory[writePointer] = result;

        this.debug('MULTIPLY', { x, y, result, writePointer });

        this.iPointer += 4;
        break;
      }
      case OP.SAVE_INPUT: {
        // wait for the input to exist
        if (!this.inputs.length) {
          this.waiting = true;
          break;
        }

        const x = this.inputs.shift() as number;
        const [writePointer] = params;
        this._memory[writePointer] = x;

        this.debug('SAVE_INPUT', { input: x, writePointer });

        this.iPointer += 2;
        break;
      }
      case OP.OUTPUT_VALUE: {
        if (!this.outputHandler) throw Error('output called with no handler');

        const output = getParameter(params[0], modes[0], this._memory);
        this.outputHandler(output);

        this.debug('OUTPUT_VALUE', { output });
        this.iPointer += 2;
        break;
      }
      case OP.TRUE_JUMP: {
        const x = getParameter(params[0], modes[0], this._memory);
        const y = getParameter(params[1], modes[1], this._memory);

        this.debug('TRUE_JUMP', { truthy: !!x });

        if (x) {
          this.iPointer = y;
        } else {
          this.iPointer += 3;
        }
        break;
      }
      case OP.FALSE_JUMP: {
        const x = getParameter(params[0], modes[0], this._memory);
        const y = getParameter(params[1], modes[1], this._memory);

        this.debug('FALSE_JUMP', { falsy: !x });

        if (!x) {
          this.iPointer = y;
        } else {
          this.iPointer += 3;
        }
        break;
      }
      case OP.LESS_THAN: {
        const x = getParameter(params[0], modes[0], this._memory);
        const y = getParameter(params[1], modes[1], this._memory);
        const writePointer = params[2];
        const result = Number(x < y);
        this._memory[writePointer] = result;

        this.debug('LESS_THAN', { x, y, result, writePointer });

        this.iPointer += 4;
        break;
      }
      case OP.EQUALS: {
        const x = getParameter(params[0], modes[0], this._memory);
        const y = getParameter(params[1], modes[1], this._memory);
        const writePointer = params[2];
        const result = Number(x === y);
        this._memory[writePointer] = result;

        this.debug('LESS_THAN', { x, y, result, writePointer });

        this.iPointer += 4;
        break;
      }
      default:
        throw Error('invalid op code: ' + opcode);
    }

    return opcode;
  }

  run() {
    if (this.exited) throw Error('tried to run exited program');

    this.waiting = false;

    while (true) {
      const opcode = this.next();
      if (opcode === OP.EXT) break;
      if (opcode === OP.SAVE_INPUT && this.waiting) break;
    }
  }

  input(...input: number[]) {
    this.inputs.push(...input);
    if (this.waiting) this.run();
  }

  get memory() {
    return [...this._memory];
  }
}

export const runProgram = (
  initialMemory: number[],
  overrides?: { [key: number]: number },
  initalInputs?: number[],
  outputHandler?: Function,
  debugging = false
) => {
  return new Program(
    initialMemory,
    overrides,
    initalInputs,
    outputHandler,
    debugging
  );
};
