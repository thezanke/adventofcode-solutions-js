import { getInput } from './utils/getInput';
import { solvePart1, solvePart2 } from './day5';

describe('DAY 5', () => {
  const challengeInputPromise = getInput('day5.txt', ',', n => Number(n));

  test('Part 1', async () => {
    const challengeInput = await challengeInputPromise;
    const mockFn = jest.fn();
    solvePart1(challengeInput, mockFn);
    expect(mockFn).toHaveBeenLastCalledWith(16348437);
  });

  test('Part 2', async () => {
    const challengeInput = await challengeInputPromise;
    const mockFn = jest.fn();
    solvePart2(challengeInput, mockFn);
    expect(mockFn).toHaveBeenLastCalledWith(6959377);
  });
});
