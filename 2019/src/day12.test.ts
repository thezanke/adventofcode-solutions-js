import { solvePart1 } from './day12';

const EXAMPLE_INPUT = [
  '<x=-1, y=0, z=2>',
  '<x=2, y=-10, z=-7>',
  '<x=4, y=-8, z=8>',
  '<x=3, y=5, z=-1>',
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
      expect(solvePart1(EXAMPLE_INPUT, 10)).toEqual(179);
    });
    test('Final', () => {
      expect(solvePart1(FINAL_INPUT, 1000)).toEqual(8362);
    });
  });
});
