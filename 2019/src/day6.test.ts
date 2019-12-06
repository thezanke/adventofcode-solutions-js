import {
  createOrbitMap,
  countTotalOrbits,
  solvePart1,
  solvePart2,
  isOrbitedBy,
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

  describe('isOribitedBy()', () => {
    test('returns true', () => {
      const orbitMap = createOrbitMap(EXAMPLE_INPUT);
      expect(isOrbitedBy(orbitMap.COM, orbitMap.I)).toBeTruthy();
    });

    test('returns false', () => {
      const orbitMap = createOrbitMap(EXAMPLE_INPUT);
      expect(isOrbitedBy(orbitMap.L, orbitMap.K)).toBeFalsy();
    });
  });

  test('Part 2 - Example', async () => {
    const input = [...EXAMPLE_INPUT, 'K)YOU', 'I)SAN'];
    expect(solvePart2(input)).toEqual(4);
  });

  test('Part 2', async () => {
    const input = await challengeInputPromise;
    expect(solvePart2(input)).toEqual(436);
  });
});
