import { getInput } from './utils/getInput';

export enum OP {
  ADD = 1,
  MULTIPLY = 2,
  EXT = 99,
}

export const runProgram = (initialArr: number[]) => {
  const arr = [...initialArr];

  let last: number;
  let i = 0;

  const next = () => (i += 4);
  const getArguments = () => [arr[arr[i + 1]], arr[arr[i + 2]], arr[i + 3]];

  while (true) {
    last = i;
    const op = arr[i];

    if (op === OP.EXT) break;

    const [x, y, t] = getArguments();
    switch (op) {
      case OP.ADD:
        arr[t] = x + y;
        next();
        break;
      case OP.MULTIPLY:
        arr[t] = x * y;
        next();
        break;
      default:
        throw Error('invalid op code: ' + op);
    }

    if (i <= last) break;
  }

  return arr;
};

export const solvePart1 = async () => {
  const input = await getInput('day2.txt', ',', n => Number(n));

  /**
   * "before running the program, replace position 1 with the value 12 and replace position 2 with the value 2"
   */
  input[1] = 12;
  input[2] = 2;

  const output = runProgram(input);

  return output[0];
};
