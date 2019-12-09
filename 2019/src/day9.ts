import { runProgram } from './runProgram';

const DEBUG = false;

export const solvePart1 = (initialMemory: number[], input: number) => {
  let output: number | undefined;
  runProgram(
    initialMemory,
    undefined,
    [input],
    (o: number) => {
      console.log(o);
      output = o;
    },
    DEBUG
  );
  return output;
};
