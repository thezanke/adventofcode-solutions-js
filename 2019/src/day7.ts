import { runProgram, Computer } from './runProgram';
import { permute } from './utils/permute';

// INPUT phaseSetting
// INPUT inputSignal

const DEBUG = false;

// interface Amplifier {
//   (inputSignal: number): number;
//   input(n: number): void;
// }

export class Amplifier {
  private _outputSignal = NaN;
  private computer: Computer;

  constructor(initialMemory: number[] = [], phase: number) {
    this.computer = runProgram(
      initialMemory,
      undefined,
      [phase],
      (_outputSignal: number) => {
        this._outputSignal = _outputSignal;
      },
      DEBUG
    );
  }

  set inputSignal(n: number) {
    this.computer.input(n);
    if (this.computer.waiting) this.computer.run();
  }

  get outputSignal() {
    return this._outputSignal;
  }

  get exited() {
    return this.computer.exited;
  }
}

const amplifierReducer = (inputSignal: number, amplifier: Amplifier) => {
  amplifier.inputSignal = inputSignal;
  return amplifier.outputSignal;
};

export const findOptimalPhasing = (
  initialMemory: number[],
  phases: number[],
  loopMode = false
) => {
  if (DEBUG) console.log('RUNNING AMPLIFIERS ', { phases });

  const amplifiers = phases.map(phase => new Amplifier(initialMemory, phase));

  if (!loopMode) {
    return amplifiers.reduce(amplifierReducer, 0);
  } else {
    let lastOutput: number | undefined;
    let output = amplifiers.reduce<number>(amplifierReducer, 0);

    while (amplifiers.map(a => a.exited).includes(false)) {
      lastOutput = output;
      output = amplifiers.reduce(amplifierReducer, lastOutput);
    }
    return output;
  }
};

export const solvePart1 = (intcode: number[], digits: number[]) => {
  const phasePerms = permute(digits);
  const results = phasePerms.map(perm => findOptimalPhasing(intcode, perm));
  return Math.max(...results);
};

export const solvePart2 = (intcode: number[], digits: number[]) => {
  const phasePerms = permute(digits);
  const results = phasePerms.map(perm => {
    return findOptimalPhasing(intcode, perm, true);
  });
  return Math.max(...results);
};
