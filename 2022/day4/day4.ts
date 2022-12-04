// import _ from 'lodash';

type NumberRangePair = [[number, number], [number, number]];

const getPairsFromInput = (input: string) => input.split('\n').map(p => p.split(',').map(r => r.split('-').map(Number)) as NumberRangePair);

export const part1 = (input: string): number => {
  return getPairsFromInput(input).reduce((t, [[a1, a2], [b1, b2]]) => {
    const isContained = (a1 <= b1 && a2 >= b2) || (b1 <= a1 && b2 >= a2);
    return isContained ? t + 1 : t;
  }, 0);
};

export const part2 = (input: string) => {
  return getPairsFromInput(input).reduce((t, [[a1, a2], [b1, b2]]) => {
    const isContained =
      (a1 <= b2 && a2 >= b1) ||
      (b1 >= a2 && b2 <= a1);
    return isContained ? t + 1 : t;
  }, 0);
};
