import { solvePart1, solvePart2, containsTwinDigits } from './day4';

const INPUT = [193651, 649729];

describe('Day 4', () => {
  test('containsTwinDigits()', () => {
    expect(containsTwinDigits([0, 1, 2, 3, 4])).toBeFalsy();
    expect(containsTwinDigits([0, 1, 1, 3, 4])).toBeTruthy();
    expect(containsTwinDigits([0, 1, 1, 1, 4])).toBeTruthy();
  });

  test('containsTwinDigits():strict', () => {
    expect(containsTwinDigits([0, 1, 1, 1, 4], true)).toBeFalsy();
    expect(containsTwinDigits([0, 1, 1, 1, 4, 4, 4, 4], true)).toBeFalsy();
    expect(
      containsTwinDigits([0, 1, 1, 1, 4, 2, 2, 4, 4, 4], true)
    ).toBeTruthy();
  });

  test('Part 1', () => {
    expect(solvePart1(INPUT)).toEqual(1605);
  });

  test('Part 2', () => {
    expect(solvePart2(INPUT)).toEqual(1102);
  });
});
