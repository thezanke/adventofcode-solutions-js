import { part1, part2 } from './day1.js';
import { readInput } from '../../helpers/readInput.js';

const parseOpts = { transform: (r) => r.split(/\r?\n/).map(Number) };

describe('2021 - Day 1', () => {
  describe('Part 1', () => {
    const input = readInput('./2021/day1/input', parseOpts);

    it('returns the expected result', () => {
      expect(part1(input)).toEqual(1298);
    });
  });

  describe('Part 2', () => {
    const input = readInput('./2021/day1/input', parseOpts);

    it('returns the expected result', () => {
      expect(part2(input)).toEqual(1248);
    });
  });
});
