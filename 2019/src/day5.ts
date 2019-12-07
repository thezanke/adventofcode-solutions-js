import { runProgram } from './runProgram';

export const solvePart1 = async (
  challengeInput: number[],
  outputHandler: Function
) => {
  return runProgram([...challengeInput], undefined, [1], outputHandler);
};
export const solvePart2 = async (
  challengeInput: number[],
  outputHandler: Function
) => {
  return runProgram([...challengeInput], undefined, [5], outputHandler);
};
