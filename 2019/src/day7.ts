import { runProgram, Program } from './runProgram';
import { permute } from './utils/permute';

const DEBUG = false;

export class Amplifier {
  private _outputSignal = NaN;
  private program: Program;

  constructor(initialMemory: number[] = [], phase: number) {
    this.program = runProgram(
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
    this.program.input(n);
  }

  get outputSignal() {
    return this._outputSignal;
  }

  get exited() {
    return this.program.exited;
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
  if (DEBUG) console.log('RUNNING AMPLIFIERS ', { phases, loopMode });

  const amplifiers = phases.map(phase => new Amplifier(initialMemory, phase));
  let output = amplifiers.reduce(amplifierReducer, 0);

  if (loopMode) {
    while (amplifiers.find(a => !a.exited)) {
      output = amplifiers.reduce(amplifierReducer, output);
    }
  }

  return output;
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
