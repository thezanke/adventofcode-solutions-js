import { runProgram, solvePart1 } from './day2';

test('Day 2: runProgram()', () => {
  expect(runProgram([1, 0, 0, 0, 99])).toEqual([2, 0, 0, 0, 99]);
  expect(runProgram([2, 3, 0, 3, 99])).toEqual([2, 3, 0, 6, 99]);
  expect(runProgram([2, 4, 4, 5, 99, 0])).toEqual([2, 4, 4, 5, 99, 9801]);

  const input = [1, 1, 1, 4, 99, 5, 6, 0, 99];
  const output = [30, 1, 1, 4, 2, 5, 6, 0, 99];
  expect(runProgram(input)).toEqual(output);
});

test('Day 2: Part 1', async () => {
  const res = await solvePart1();
  expect(res).toBe(6730673);
});
