import { runProgram } from './runProgram';
import { permute } from './utils/permute';

// INPUT phaseSetting
// INPUT inputSignal

const DEBUG = false;

interface Amplifier {
  (inputSignal: number): number;
}

const createAmplifier = (initialMemory: number[], phase: number) => {
  const memory = [...initialMemory];

  return (inputSignal: number) => {
    let outputSignal: number = NaN;
    runProgram(
      memory,
      undefined,
      [phase, inputSignal],
      (_outputSignal: number) => {
        outputSignal = _outputSignal;
      },
      DEBUG
    );
    // console.log({ inputSignal, outputSignal });
    return outputSignal;
  };
};

export const runAmplifiers = (
  initialMemory: number[],
  phases: number[],
  loopMode = false
) => {
  if (DEBUG) console.log('RUNNING AMPLIFIERS ', { phases });

  const amplifiers = phases.map(phase => createAmplifier(initialMemory, phase));

  if (!loopMode) {
    return amplifiers.reduce((inputSignal: number, amplifier: Amplifier) => {
      return amplifier(inputSignal);
    }, 0);
  } else {
    let lastOutput: number | undefined;

    while (true) {
      const output = amplifiers.reduce(
        (inputSignal: number, amplifier: Amplifier) => {
          return amplifier(inputSignal);
        },
        lastOutput || 0
      );
      console.log({ lastOutput, output });

      if (output === lastOutput) return output;
      if (isNaN(output)) throw Error('what');

      lastOutput = output;
    }
  }
};

export const solvePart1 = (intcode: number[]) => {
  const perms = permute([0, 1, 2, 3, 4]) as number[][];
  const results = perms.map(phases => runAmplifiers(intcode, phases));
  return Math.max(...results);
};

export const solvePart2 = (intcode: number[]) => {
  const perms = permute([5, 6, 7, 8, 9]) as number[][];
  const results = perms.map(phases => runAmplifiers(intcode, phases, true));
  return Math.max(...results);
};
