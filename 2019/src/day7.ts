import { runProgram } from './runProgram';

// INPUT phaseSetting
// INPUT inputSignal

const DEBUG = false;

export const runAmplifiers = (intcode: number[], phases: number[]) => {
  const amplify = (phase: number, inputSignal: number) => {
    let outputSignal: number | undefined;
    runProgram(
      [...intcode],
      undefined,
      [phase, inputSignal],
      (_outputSignal: number) => {
        outputSignal = _outputSignal;
      },
      DEBUG
    );
    return outputSignal;
  };

  if (DEBUG) console.log('RUNNING AMPLIFIERS ', { phases });

  return phases.reduce((inputSignal: number, phase: number) => {
    if (DEBUG) console.log('AMPLIFYING: INPUT', { inputSignal, phase });
    const outputSignal = amplify(phase, inputSignal);
    if (DEBUG) console.log('AMPLIFYING: OUTPUT', { outputSignal });
    return outputSignal || 0;
  }, 0);
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
