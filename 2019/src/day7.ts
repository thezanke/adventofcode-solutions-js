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
    if (inputSignal === undefined || Number.isNaN(inputSignal)) {
      throw Error('bad input signal');
    }

    let outputSignal: number | undefined;

    runProgram(
      memory,
      undefined,
      [phase, inputSignal],
      (_outputSignal: number) => {
        outputSignal = _outputSignal;
      },
      DEBUG
    );
  
    return outputSignal || 0;
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
