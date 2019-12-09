import { runProgram } from './runProgram';

export const solvePart1 = (initialMemory: number[], input: number) => {
  let output: number | undefined;
  runProgram(
    initialMemory,
    undefined,
    [input],
    (o: number) => {
      output = o;
    }
  );
  return output;
};
