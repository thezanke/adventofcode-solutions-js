// generated by prepare script
import { readInput } from '../../helpers/readInput.js';
import { part1, part2 } from './day10.js';

const parseOpts = { transform: (o) => o.split(/\r?\n/) };

describe('2021 - Day 10', () => {
  describe('Part 1', () => {
    describe('Example Input', () => {
      const exampleInput = readInput('./2021/day10/example-input', parseOpts);

      it('returns the expected result', () => {
        expect(part1(exampleInput)).toEqual(26397);
      });
    });

    describe('Final Input', () => {
      const input = readInput('./2021/day10/input', parseOpts);

      it('returns the expected result', () => {
        expect(part1(input)).toEqual(367059);
      });
    });
  });

  describe('Part 2', () => {
    describe('Example Input', () => {
      const exampleInput = readInput('./2021/day10/example-input', parseOpts);

      it('returns the expected result', () => {
        expect(part2(exampleInput)).toEqual(288957);
      });
    });

    describe('Final Input', () => {
      const input = readInput('./2021/day10/input', parseOpts);

      it('returns the expected result', () => {
        expect(part2(input)).toEqual(1952146692);
      });
    });
  });
});
