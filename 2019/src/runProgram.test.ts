import { runProgram } from './runProgram';

describe('runProgram', () => {
  test('basic intcodes', () => {
    expect(runProgram([1, 0, 0, 0, 99])).toEqual([2, 0, 0, 0, 99]);
    expect(runProgram([2, 0, 0, 3, 99], [3, 0])).toEqual([2, 3, 0, 6, 99]);
    expect(runProgram([2, 4, 4, 5, 99, 0])).toEqual([2, 4, 4, 5, 99, 9801]);

    const input = [1, 1, 1, 4, 99, 5, 6, 0, 99];
    const output = [30, 1, 1, 4, 2, 5, 6, 0, 99];
    expect(runProgram(input)).toEqual(output);
  });
});
