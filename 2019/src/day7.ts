import { runProgram } from './runProgram';

// INPUT phaseSetting
// INPUT inputSignal

const DEBUG = true;

export const applyAmplifiers = (
  intcode: number[],
  phases: [number, number, number, number, number]
) => {
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

  return phases.reduce((inputSignal: number, phase: number) => {
    console.log('AMPLIFYING: INPUT', { inputSignal, phase });
    const outputSignal = amplify(phase, inputSignal);
    console.log('AMPLIFYING: OUTPUT', { outputSignal });
    return outputSignal || 0;
  }, 0);
};

export const solvePart1 = (intcode: number[]) => {
  let output: number;
};
