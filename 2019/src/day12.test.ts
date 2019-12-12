import { solvePart1, solvePart2 } from './day12';

const EXAMPLE1_INPUT = [
  '<x=-1, y=0, z=2>',
  '<x=2, y=-10, z=-7>',
  '<x=4, y=-8, z=8>',
  '<x=3, y=5, z=-1>',
];
const EXAMPLE2_INPUT = [
  '<x=-8, y=-10, z=0>',
  '<x=5, y=5, z=10>',
  '<x=2, y=-7, z=3>',
  '<x=9, y=-8, z=-3>',
];

const FINAL_INPUT = [
  '<x=10, y=15, z=7>',
  '<x=15, y=10, z=0>',
  '<x=20, y=12, z=3>',
  '<x=0, y=-3, z=13>',
];

describe('DAY 12', () => {
  describe('Part 1', () => {
    test('Example', () => {
      expect(solvePart1(EXAMPLE1_INPUT, 10)).toEqual(179);
    });

    test('Final', () => {
      expect(solvePart1(FINAL_INPUT, 1000)).toEqual(8362);
    });
  });

  describe('Part 2', () => {
    test('Example 1', () => {
      expect(solvePart2(EXAMPLE1_INPUT, 2800)).toEqual(2772);
    });

    test('Example 2', () => {
      expect(solvePart2(EXAMPLE2_INPUT, 5000000000)).toEqual(4686774924);
    });

    test('Final', () => {
      expect(solvePart2(FINAL_INPUT)).toEqual(478373365921244);
    });
  });
});
