// generated by prepare script
import { readInput } from '../../helpers/readInput.js';
import { determineEffectOfFish, solve } from './day6.js';

const parseOpts = { transform: (o) => o.split(',').map(Number) };

describe('2021 - Day 6', () => {
  describe('determineEffectOfFish', () => {
    it('returns the expected result for 1,0', () => {
      expect(determineEffectOfFish(1, 0)).toEqual(1);
    });

    it('returns the expected result for 1,1', () => {
      expect(determineEffectOfFish(1, 1)).toEqual(1);
    });

    it('returns the expected result for 1,2', () => {
      expect(determineEffectOfFish(1, 2)).toEqual(2);
    });

    it('returns the expected result for 1,2', () => {
      expect(determineEffectOfFish(1, 9)).toEqual(3);
    });

    it('returns the expected result for 1,2', () => {
      expect(determineEffectOfFish(1, 10)).toEqual(3);
    });
  });

  describe('Part 1', () => {
    describe('Example Input', () => {
      const exampleInput = readInput('./2021/day6/example-input', parseOpts);

      it('returns the expected result', () => {
        expect(solve(exampleInput, 18)).toEqual(26);
        expect(solve(exampleInput, 80)).toEqual(5934);
      });
    });

    describe('Final Input', () => {
      const input = readInput('./2021/day6/input', parseOpts);

      it('returns the expected result', () => {
        expect(solve(input, 80)).toEqual(380612);
      });
    });
  });

  describe('Part 2', () => {
    describe('Example Input', () => {
      const exampleInput = readInput('./2021/day6/example-input', parseOpts);

      it('returns the expected result', () => {
        expect(solve(exampleInput, 256)).toEqual(26984457539);
      });
    });

    describe('Final Input', () => {
      const input = readInput('./2021/day6/input', parseOpts);

      it('returns the expected result', () => {
        expect(solve(input, 256)).toEqual(1710166656900);
      });
    });
  });
});
