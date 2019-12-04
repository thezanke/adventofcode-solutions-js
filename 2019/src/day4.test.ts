import { solvePart1, solvePart2, findMatchingPairs } from './day4';

describe('Day 4', () => {
  test('findMatchingPairs', () => {
    const pairs = findMatchingPairs([0,1,2,3,4]);
    expect(pairs).toBeFalsy();
  })

  test('Part 1', async () => {
    expect(solvePart1()).toEqual(1605);
  });

  test.skip('Part 2 - Final Input', async () => {
    expect(solvePart2()).toBeUndefined();
  });
});
