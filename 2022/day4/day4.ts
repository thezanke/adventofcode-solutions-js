// import _ from 'lodash';

type NumberRanges = [number, number, number, number];

const parseNumberRangesFromInput = (input: string) => input.split('\n').map(p => p.split(/,|-/).map(Number).flat() as NumberRanges);

export const part1 = (input: string): number => {
  return parseNumberRangesFromInput(input).reduce((t, [a, b, c, d]) => {
    const hasContainment = (a <= c && b >= d) || (c <= a && d >= b);
    return hasContainment ? t + 1 : t;
  }, 0);
};

export const part2 = (input: string) => {
  return parseNumberRangesFromInput(input).reduce((t, [a, b, c, d]) => {
    const hasOverlap = (a <= d && b >= c) || (c >= b && d <= a);
    return hasOverlap ? t + 1 : t;
  }, 0);
};
