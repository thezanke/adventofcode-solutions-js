import {
  calculateAdditionalFuel,
  calculateRequiredFuel,
  solvePart1,
  solvePart2
} from './day1';

describe('DAY 1', () => {
  test('calculateRequiredFuel()', () => {
    expect(calculateRequiredFuel(12)).toEqual(2);
    expect(calculateRequiredFuel(14)).toEqual(2);
    expect(calculateRequiredFuel(1969)).toEqual(654);
    expect(calculateRequiredFuel(100756)).toEqual(33583);
  });

  test('Part 1', async () => {
    const res = await solvePart1();
    expect(res).toEqual(3210097);
  });

  test('calculateAdditionalFuel()', async () => {
    expect(calculateAdditionalFuel(calculateRequiredFuel(1969))).toEqual(312);
    expect(calculateAdditionalFuel(calculateRequiredFuel(100756))).toEqual(
      16763
    );
  });

  test('Part 2', async () => {
    const res = await solvePart2();
    expect(res).toEqual(4812287);
  });
});
