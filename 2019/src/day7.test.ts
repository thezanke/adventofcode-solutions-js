import { solvePart1, solvePart2, runAmplifiers, getPermutations } from './day7';
import { getInput } from './utils/getInput';
describe('DAY 7', () => {
  const challengeInputPromise = getInput('day7.txt', ',', n => Number(n));

  test('createAmplifier()', () => {
    // prettier-ignore
    const input = [
      3, 15, 3, 16, 1002, 16, 10, 16,
      1, 16, 15, 15, 4, 15, 99, 0, 0,
    ];

    expect(runAmplifiers(input, [4, 3, 2, 1, 0])).toEqual(43210);
  });

  test('getPermutations()', () => {
    // prettier-ignore
    expect(getPermutations([0, 1, 2])).toEqual([
      [0, 1, 2], [0, 2, 1], [1, 0, 2],
      [1, 2, 0], [2, 0, 1], [2, 1, 0],
    ]);
  });

  describe('Part 1', () => {
    test('solves challenge input', async () => {
      const input = (await challengeInputPromise) as number[];
      expect(solvePart1(input)).toEqual(273814);
    });
  });
  describe('Part 2', () => {
    test.skip('solves challenge input', async () => {
      const input = (await challengeInputPromise) as number[];
      expect(solvePart2(input)).toEqual(273814);
    });
  });
});
