import { solvePart1 } from './day11';
import { getInput } from './utils/getInput';

describe('DAY 11', () => {
  const challengeInputPromise = getInput('day11.txt', ',', n => Number(n));
  describe('Part 1', async () => {
    const input = await challengeInputPromise;
    expect(solvePart1(input)).toEqual(true);
  });
});
