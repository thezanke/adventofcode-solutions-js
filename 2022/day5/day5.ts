// import _ from 'lodash';

const DIR_REGEX = /move (\d+) from (\d) to (\d)/;

const parseInput = (input: string) => {
  const [asciiStacksWLegend, directions] = input.split('\n\n').map(c => c.split('\n'));
  const legend = asciiStacksWLegend[asciiStacksWLegend.length - 1];
  const digits = legend.trim().split(/ +/);
  const asciiStacks = asciiStacksWLegend.slice(0, asciiStacksWLegend.length - 1);

  const stacks = Array.from(digits, (d) => {
    const digitIndex = legend.indexOf(d);
    return asciiStacks.map(row => row[digitIndex]).filter(c => c !== ' ');
  });

  const parsedDirections = directions.map(d => {
    const result = DIR_REGEX.exec(d)?.slice(1, 4).map(Number) ?? [];
    return [result[0], ...result.slice(1, 4).map(d => d - 1)];
  });

  return [stacks, parsedDirections] as [string[][], number[][]];
};

const solve = (input: string, multiMove = false) => {
  const [stacks, parsedDirections] = parseInput(input);

  parsedDirections.forEach(([count, start, end]) => {
    const els = stacks[start].splice(0, count);
    if (!multiMove) els.reverse();
    stacks[end].unshift(...els);
  });

  return stacks.map(([top]) => top).join('');
};

export const part1 = (input: string) => solve(input);
export const part2 = (input: string) => solve(input, true);
