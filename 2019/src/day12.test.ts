import { Simulation } from './day12';
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
      const sim = new Simulation(EXAMPLE_INPUT);
      Array.from({ length: 10 }).forEach(() => {
        sim.next();
      });
      expect(sim.totalEnergy).toEqual(179);
    });
    test('Final', () => {
      const sim = new Simulation(FINAL_INPUT);
      Array.from({ length: 1000 }).forEach(() => {
        sim.next();
      });
      expect(sim.totalEnergy).toEqual(8362);
    });
  });
});
