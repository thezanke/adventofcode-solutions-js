import { createOrbitMap, solvePart1, solvePart2, isOrbitedBy } from './day6';
import { getInput } from './utils/getInput';

describe('DAY 6', () => {
  // prettier-ignore
  const EXAMPLE_INPUT = [
    'COM)B', 'B)C', 'C)D', 'D)E','E)F', 'B)G',
    'G)H', 'D)I','E)J', 'J)K', 'K)L'
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

  const challengeInputPromise = getInput('day6.txt', /\r?\n/);

  describe('Part 1', () => {
    test('solves example', () => {
      expect(solvePart1(EXAMPLE_INPUT)).toEqual(42);
    });

    test('solves challenge input', async () => {
      const input = await challengeInputPromise;
      expect(solvePart1(input)).toEqual(344238);
    });
  });

  describe('isOrbitedBy()', () => {
    test('returns true', () => {
      const orbitMap = createOrbitMap(EXAMPLE_INPUT);
      expect(isOrbitedBy(orbitMap.COM, orbitMap.I)).toBeTruthy();
    });

    test('returns false', () => {
      const orbitMap = createOrbitMap(EXAMPLE_INPUT);
      expect(isOrbitedBy(orbitMap.L, orbitMap.K)).toBeFalsy();
    });
  });

  describe('Part 2', () => {
    test('solves example', async () => {
      const input = [...EXAMPLE_INPUT, 'K)YOU', 'I)SAN'];
      expect(solvePart2(input)).toEqual(4);
    });

    test('solves challenge input', async () => {
      const input = await challengeInputPromise;
      expect(solvePart2(input)).toEqual(436);
    });
  });
});
