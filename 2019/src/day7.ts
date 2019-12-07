import { runProgram } from './runProgram';

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
    let lastOutput: number = 0;

    do {
      const output = amplifiers.reduce(
        (inputSignal: number, amplifier: Amplifier) => {
          return amplifier(inputSignal);
        },
        lastOutput
      );
      if (output === lastOutput) return output;
      if (isNaN(output) || isNaN(lastOutput)) throw Error('what');
      lastOutput = output;
    } while (true);
  }
};

export const getPermutations = (inputArr: any[]): number[] | number[][] => {
  const results: number[] = [];

  const permute = (arr: any[], memo: any = []) => {
    let current;

    for (var i = 0; i < arr.length; i++) {
      current = arr.splice(i, 1);
      if (arr.length === 0) results.push(memo.concat(current));
      permute(arr.slice(), memo.concat(current));
      arr.splice(i, 0, current[0]);
    }

    return results;
  };

  return permute(inputArr);
};

export const solvePart1 = (intcode: number[]) => {
  const perms = getPermutations([0, 1, 2, 3, 4]) as number[][];
  const results = perms.map(phases => runAmplifiers(intcode, phases));
  return Math.max(...results);
};

export const solvePart2 = (intcode: number[]) => {
  const perms = getPermutations([5, 6, 7, 8, 9]) as number[][];
  const results = perms.map(phases => runAmplifiers(intcode, phases, true));
  return Math.max(...results);
};
