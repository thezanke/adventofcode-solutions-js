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

export const amplifierReducer = (inputSignal: number, amplifier: Amplifier) => {
  return amplifier(inputSignal);
};

export const findOptimalPhasing = (
  initialMemory: number[],
  phases: number[],
  loopMode = false
) => {
  if (DEBUG) console.log('RUNNING AMPLIFIERS ', { phases });

  const amplifiers = phases.map(phase => createAmplifier(initialMemory, phase));

  if (!loopMode) {
    return amplifiers.reduce(amplifierReducer, 0);
  } else {
    const output = amplifiers.reduce(amplifierReducer, 0);
    return output
  }
};

export const solvePart1 = (intcode: number[], digits: number[]) => {
  const phasePerms = permute(digits) as number[][];
  const results = phasePerms.map(perm => findOptimalPhasing(intcode, perm));
  return Math.max(...results);
};

export const solvePart2 = (intcode: number[], digits: number[]) => {
  const phasePerms = permute(digits) as number[][];
  const results = phasePerms.map(perm => findOptimalPhasing(intcode, perm, true));
  return Math.max(...results);
};
