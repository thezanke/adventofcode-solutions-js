import { readInput } from '../../helpers/readInput.js';
import { part1, part2 } from './day3.js';

const parseOpts = { delimiter: ',', transform: (o) => o.map(([l]) => l) };

describe('2021 - Day 3', () => {
  describe('Part 1', () => {
    describe('Example Input', () => {
      const exampleInput = readInput('./2021/day3/example-input', parseOpts);

      it('returns the expected result', () => {
        expect(part1(exampleInput)).toEqual(198);
      });
    });

    describe('Final Input', () => {
      const input = readInput('./2021/day3/input', parseOpts);

      it('returns the expected result', () => {
        expect(part1(input)).toEqual(845186);
      });
    });
  });

  describe('Part 2', () => {
    describe('Example Input', () => {
      const exampleInput = readInput('./2021/day3/example-input', parseOpts);

      it('returns the expected result', () => {
        expect(part2(exampleInput)).toEqual(230);
      });
    });

    describe('Final Input', () => {
      const input = readInput('./2021/day3/input', parseOpts);

      it('returns the expected result', () => {
        expect(part2(input)).toEqual(4636702);
      });
    });
  });
});
