import { getInput } from './utils/getInput';
import { solvePart1 } from './day9';

describe('DAY 9', () => {
  const inputPromise = getInput('day9.txt', ',', n => Number(n));
  test('Part 1', async () => {
    const input = await inputPromise;
    expect(solvePart1(input, 1)).toEqual(3063082071);
  });

  test.skip('Part 2', async () => {
    const input = await inputPromise;
    expect(solvePart1(input, 2)).toEqual(81348);
  });
});
