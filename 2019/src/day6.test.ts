import {
  createOrbitMap,
  countTotalOrbits,
  solvePart1,
  solvePart2,
} from './day6';
import { getInput } from './utils/getInput';

describe('DAY 6', () => {
  const EXAMPLE_INPUT = [
    'COM)B',
    'B)C',
    'C)D',
    'D)E',
    'E)F',
    'B)G',
    'G)H',
    'D)I',
    'E)J',
    'J)K',
    'K)L',
  ];

  describe('createOrbitMap()', () => {
    test('returns an orbit map', () => {
      expect(createOrbitMap([])).toEqual({});
    });

    test('returns orbit map with all map objects ', () => {
      const orbitMap = createOrbitMap(EXAMPLE_INPUT);
      expect(Object.keys(orbitMap)).toHaveLength(12);
    });
  });

  describe('countTotalOrbits()', () => {
    test('returns 42 for example', () => {
      const orbitMap = createOrbitMap(EXAMPLE_INPUT);
      expect(countTotalOrbits(orbitMap)).toEqual(42);
    });
  });

  const challengeInputPromise = getInput('day6.txt', /\r?\n/);

  test('Part 1', async () => {
    const input = await challengeInputPromise;
    expect(solvePart1(input)).toEqual(344238);
  });

  test('Part 2', async () => {
    const input = await challengeInputPromise;
    expect(solvePart2(input)).toEqual(0);
  });
});
