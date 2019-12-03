import { runProgram, solvePart1, solvePart2 } from './day2';

describe('DAY 2', () => {
  test('runProgram()', () => {
    expect(runProgram([1, 0, 0, 0, 99])).toEqual([2, 0, 0, 0, 99]);
    expect(runProgram([2, 0, 0, 3, 99], [3, 0])).toEqual([2, 3, 0, 6, 99]);
    expect(runProgram([2, 4, 4, 5, 99, 0])).toEqual([2, 4, 4, 5, 99, 9801]);

    const input = [1, 1, 1, 4, 99, 5, 6, 0, 99];
    const output = [30, 1, 1, 4, 2, 5, 6, 0, 99];
    expect(runProgram(input)).toEqual(output);
  });

  test('Part 1', async () => {
    const res = await solvePart1();
    expect(res).toBe(6730673);
  });

  test('Part 2', async () => {
    const res = await solvePart2(19690720);
    expect(res).toBe(3749);
  });
});
