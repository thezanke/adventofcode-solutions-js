// import _ from 'lodash';

type NumberRanges = [number, number, number, number];

const parseNumberRangesFromInput = (input: string) => input.split('\n').map(p => p.split(/,|-/).map(Number).flat() as NumberRanges);

export const part1 = (input: string): number => {
  return parseNumberRangesFromInput(input).reduce((t, [a, b, x, y]) => {
    const hasContainment = (a <= x && b >= y) || (x <= a && y >= b);
    return hasContainment ? t + 1 : t;
  }, 0);
};

export const part2 = (input: string) => {
  return parseNumberRangesFromInput(input).reduce((t, [a, b, x, y]) => {
    const hasOverlap = (a <= y && b >= x) || (x >= b && y <= a);
    return hasOverlap ? t + 1 : t;
  }, 0);
};
