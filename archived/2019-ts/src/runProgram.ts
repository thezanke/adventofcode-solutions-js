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
  ADJUST_BASE = 9,
  EXT = 99,
}

export enum MODE {
  REFERENCE,
  IMMEDIATE,
  RELATIVE,
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

interface Instruction {
  opcode: number
  modes: number[]
  params: number[]
}

export class Program {
  private _memory: number[];
  private readonly inputs: number[];
  private iPointer = 0;
  private relativeBase = 0;
  private currentInstruction?: Instruction;

  waiting = false;
  exited = false;

  constructor (
    initialMemory: number[],
    overrides?: { [key: number]: number },
    initalInputs: number[] = [],
    private readonly outputHandler?: Function,
    private readonly debugging = false
  ) {
    this._memory = [...initialMemory];
    this.inputs = [...initalInputs];
    if (overrides != null) Object.assign(this._memory, overrides);
    this.run();
  }

  // tslint:disable-next-line no-any
  private debug (...args: any[]) {
    if (this.debugging) {
      console.log(`${this.iPointer}: `, ...args);
    }
  }

  readMemory (pointer: number) {
    let value = this.memory[pointer];
    if (!value) {
      value = this.memory[pointer] = 0;
    }
    return value;
  }

  getParameter (index: number, write = false) {
    if (this.currentInstruction == null) throw Error('no current instruction');

    const { modes, params } = this.currentInstruction;
    const value = params[index];
    const mode = modes[index] || 0;

    switch (mode) {
      case MODE.REFERENCE:
        if (write) return value;
        return this.readMemory(value);
      case MODE.IMMEDIATE:
        return value;
      case MODE.RELATIVE:
        const pointer = this.relativeBase + value;
        if (write) return pointer;
        return this.readMemory(pointer);
      default:
        throw Error('invalid mode');
    }
  }

  // z = x * 38 + y + 639
  // pointer = 566

  private nextInstruction () {
    const opVal = this._memory[this.iPointer];
    const [opcode, modes] = getOpcode(opVal);
    const params = this._memory.slice(this.iPointer + 1, this.iPointer + 4);
    this.currentInstruction = { opcode, modes, params };

    switch (opcode) {
      case OP.EXT: {
        this.debug('EXIT');
        this.exited = true;
        break;
      }
      case OP.ADD: {
        const x = this.getParameter(0);
        const y = this.getParameter(1);
        const writePointer = this.getParameter(2, true);
        const result = x + y;
        this._memory[writePointer] = result;
        this.debug('ADD', { x, y, result, writePointer });
        this.iPointer += 4;
        break;
      }
      case OP.MULTIPLY: {
        const x = this.getParameter(0);
        const y = this.getParameter(1);
        const writePointer = this.getParameter(2, true);
        const result = x * y;
        this._memory[writePointer] = result;
        this.debug('MULTIPLY', { x, y, result, writePointer });
        this.iPointer += 4;
        break;
      }
      case OP.SAVE_INPUT: {
        if (this.inputs.length === 0) {
          this.waiting = true;
          break;
        }

        const x = this.inputs.shift() as number;
        const writePointer = this.getParameter(0, true);
        this._memory[writePointer] = x;
        this.debug('SAVE_INPUT', { input: x, writePointer });
        this.iPointer += 2;
        this.run();
        break;
      }
      case OP.OUTPUT_VALUE: {
        if (this.outputHandler == null) {
          throw Error('output called with no handler');
        }

        const output = this.getParameter(0);
        this.outputHandler(output);
        this.debug('OUTPUT_VALUE', { output });
        this.iPointer += 2;
        break;
      }
      case OP.TRUE_JUMP: {
        const x = this.getParameter(0);
        const y = this.getParameter(1);
        this.debug('TRUE_JUMP', { x, y, truthy: !!x });
        this.iPointer = x ? y : this.iPointer + 3;
        break;
      }
      case OP.FALSE_JUMP: {
        const x = this.getParameter(0);
        const y = this.getParameter(1);
        this.debug('FALSE_JUMP', { x, y, falsy: !x });
        this.iPointer = !x ? y : this.iPointer + 3;
        break;
      }
      case OP.LESS_THAN: {
        const x = this.getParameter(0);
        const y = this.getParameter(1);
        const writePointer = this.getParameter(2, true);
        const result = Number(x < y);
        this._memory[writePointer] = result;
        this.debug('LESS_THAN', { x, y, result, writePointer });
        this.iPointer += 4;
        break;
      }
      case OP.EQUALS: {
        const x = this.getParameter(0);
        const y = this.getParameter(1);
        const writePointer = this.getParameter(2, true);
        const result = Number(x === y);
        this._memory[writePointer] = result;
        this.debug('LESS_THAN', { x, y, result, writePointer });
        this.iPointer += 4;
        break;
      }
      case OP.ADJUST_BASE: {
        const x = this.getParameter(0);
        this.relativeBase += x;
        this.debug('ADJUST_BASE', { x });
        this.iPointer += 2;
        break;
      }
      default:
        throw Error('invalid op code: ' + opcode);
    }
  }

  run () {
    if (this.exited) {
      throw Error('tried to run exited program');
    }

    this.waiting = false;

    while (!this.exited && !this.waiting) {
      this.nextInstruction();
    }
  }

  input (...input: number[]) {
    this.inputs.push(...input);
    if (this.waiting) this.run();
  }

  get memory () {
    return [...this._memory];
  }
}

export const runProgram = (
  initialMemory: number[],
  overrides?: { [key: number]: number },
  initalInputs?: number[],
  outputHandler?: Function,
  debugging?: boolean
) => {
  return new Program(
    initialMemory,
    overrides,
    initalInputs,
    outputHandler,
    debugging
  );
};
