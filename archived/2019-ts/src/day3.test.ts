import {
  solvePart1,
  getNextSegment,
  getWirePoints,
  findIntersections,
  determineClosestIntersection,
  solvePart2,
} from './day3';

import { getInput } from './utils/getInput';

describe('Day 3', () => {
  test('getNextSegment()', () => {
    expect(getNextSegment({ x: 0, y: 0 }, 'U3')).toEqual([
      { x: 0, y: -1 },
      { x: 0, y: -2 },
      { x: 0, y: -3 },
    ]);

    expect(getNextSegment({ x: 0, y: -3 }, 'R2')).toEqual([
      { x: 1, y: -3 },
      { x: 2, y: -3 },
    ]);
  });

  test('getWirePoints()', () => {
    expect(getWirePoints(['U3'])).toEqual([
      { x: 0, y: -1 },
      { x: 0, y: -2 },
      { x: 0, y: -3 },
    ]);

    expect(getWirePoints(['U3', 'D1', 'L2'])).toEqual([
      { x: 0, y: -1 },
      { x: 0, y: -2 },
      { x: 0, y: -3 },
      { x: 0, y: -2 },
      { x: -1, y: -2 },
      { x: -2, y: -2 },
    ]);
  });

  test('findIntersections()', () => {
    const wire1 = [
      { x: 0, y: -1 },
      { x: 0, y: -2 },
      { x: 0, y: -3 },
      { x: 0, y: -4 },
      { x: 1, y: -4 },
      { x: 2, y: -4 },
      { x: 3, y: -4 },
    ];

    const wire2 = [
      { x: -1, y: -2 },
      { x: 0, y: -2 },
      { x: 1, y: -2 },
      { x: 2, y: -2 },
      { x: 3, y: -2 },
      { x: 3, y: -3 },
      { x: 3, y: -4 },
    ];

    const intersections = findIntersections(wire1, wire2);
    expect(intersections).toEqual([
      { x: 0, y: -2, totalSteps: 4 },
      { x: 3, y: -4, totalSteps: 14 },
    ]);
  });

  test('determineClosestIntersection()', () => {
    expect(
      determineClosestIntersection([
        { x: 2, y: -5 },
        { x: 0, y: -10 },
      ])
    ).toEqual(7);
  });

  test('Part 1 - Examples', async () => {
    expect(
      solvePart1([
        ['R8', 'U5', 'L5', 'D3'],
        ['U7', 'R6', 'D4', 'L4'],
      ])
    ).toEqual(6);

    expect(
      solvePart1([
        ['R75', 'D30', 'R83', 'U83', 'L12', 'D49', 'R71', 'U7', 'L72'],
        ['U62', 'R66', 'U55', 'R34', 'D71', 'R55', 'D58', 'R83'],
      ])
    ).toEqual(159);

    expect(
      solvePart1([
        [
          'R98',
          'U47',
          'R26',
          'D63',
          'R33',
          'U87',
          'L62',
          'D20',
          'R33',
          'U53',
          'R51',
        ],
        ['U98', 'R91', 'D20', 'R16', 'D67', 'R40', 'U7', 'R15', 'U6', 'R7'],
      ])
    ).toEqual(135);
  });

  test.skip('Part 1 - Final Input', async () => {
    const finalInput = (await getInput('day3.txt', '\n', line =>
      line.split(',')
    )) as [string[], string[]];
    expect(solvePart1(finalInput)).toEqual(100);
  });

  test('Part 2 - Examples', () => {
    expect(
      solvePart2([
        ['R8', 'U5', 'L5', 'D3'],
        ['U7', 'R6', 'D4', 'L4'],
      ])
    ).toEqual(30);

    expect(
      solvePart2([
        ['R75', 'D30', 'R83', 'U83', 'L12', 'D49', 'R71', 'U7', 'L72'],
        ['U62', 'R66', 'U55', 'R34', 'D71', 'R55', 'D58', 'R83'],
      ])
    ).toEqual(610);

    expect(
      solvePart2([
        [
          'R98',
          'U47',
          'R26',
          'D63',
          'R33',
          'U87',
          'L62',
          'D20',
          'R33',
          'U53',
          'R51',
        ],
        ['U98', 'R91', 'D20', 'R16', 'D67', 'R40', 'U7', 'R15', 'U6', 'R7'],
      ])
    ).toEqual(410);
  });

  test.skip('Part 2 - Final Input', async () => {
    const finalInput = (await getInput('day3.txt', '\n', line =>
      line.split(',')
    )) as [string[], string[]];
    expect(solvePart2(finalInput)).toEqual(100);
  });
});
