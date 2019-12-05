import { runProgram, getOpcode } from './runProgram';

describe('getOpcode()', () => {
  test('handles single digit', () => {
    expect(getOpcode(2)).toEqual([2, []]);
  });

  test('handles 3 digits', () => {
    expect(getOpcode(112)).toEqual([12, [1]]);
  });

  test('handles 5 digits', () => {
    expect(getOpcode(12010)).toEqual([10, [0, 2, 1]]);
  });
});

describe('runProgram()', () => {
  test('handles basic intcodes', () => {
    expect(runProgram([1, 0, 0, 0, 99])).toEqual([2, 0, 0, 0, 99]);
    expect(runProgram([2, 4, 4, 5, 99, 0])).toEqual([2, 4, 4, 5, 99, 9801]);

    const overrides = { 1: 3, 2: 0 };
    expect(runProgram([2, 0, 0, 3, 99], overrides)).toEqual([2, 3, 0, 6, 99]);

    const input = [1, 1, 1, 4, 99, 5, 6, 0, 99];
    const output = [30, 1, 1, 4, 2, 5, 6, 0, 99];
    expect(runProgram(input)).toEqual(output);
  });

  test('handles negatives', () => {
    expect(runProgram([1101, 100, -1, 4, 0])).toEqual([1101, 100, -1, 4, 99]);
  });

  test('handles input', () => {
    expect(runProgram([3, 3, 99, 0], undefined, [1337])).toEqual([3, 3, 99, 1337]);
  });
});
