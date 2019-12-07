import { runProgram } from './runProgram';
import { permute } from './utils/permute';

// INPUT phaseSetting
// INPUT inputSignal

const DEBUG = true;

// interface Amplifier {
//   (inputSignal: number): number;
//   input(n: number): void;
// }

export class Amplifier {
  private memory: number[];
  private inputs: number[] = [];
  private _outputSignal: number | undefined;

  constructor(initialMemory: number[] = [], phase: number) {
    this.memory = [...initialMemory];
    this.inputs.push(phase);

    console.log('creat amplifier', { amplifier: this });

    runProgram(
      this.memory,
      undefined,
      this.inputs,
      (_outputSignal: number) => {
        this._outputSignal = _outputSignal;
      },
      DEBUG
    );
  }

  set inputSignal(n: number) {
    console.log('set inputSignal', n);
    this.inputs.push(n);
  }

  get outputSignal() {
    return this._outputSignal;
  }
}

const amplifierReducer = (inputSignal: number, amplifier: Amplifier) => {
  amplifier.inputSignal = inputSignal;
  return amplifier.outputSignal || 0;
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
    // let lastOutput: number | undefined;
    let output = amplifiers.reduce(amplifierReducer, 0);
    console.log({ output });
    // // while (output !== lastOutput) {
    // console.log({ lastOutput, output });
    // lastOutput = output;
    // output = amplifiers.reduce(amplifierReducer, lastOutput);
    // console.log({ lastOutput, output });
    // // }
    // return output;
    return 0;
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
