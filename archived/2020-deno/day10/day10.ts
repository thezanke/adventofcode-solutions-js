import { memoize } from '../common/memoize.ts';

export const countDifferences = (inputs: number[]) => {
  const sortedInput = [...inputs].sort((a, b) => a - b);
  const differences = [1, 3];

  return differences.map((d) => {
    let count = 0;

    sortedInput.forEach((a, i) => {
      const b = sortedInput[i + 1];
      if (!b) return;
      if (b - a === d) count += 1;
    });

    return count + 1;
  });
};

export const createArrangementTree = (inputs: number[]) => {
  const max = Math.max(...inputs);
  const sortedInput = [0, ...inputs, max + 3].sort((a, b) => a - b);
  const tree: { [key: number]: number[] } = {};

  for (let i = 0; i < sortedInput.length; i += 1) {
    const a = sortedInput[i];
    if (!tree[a]) tree[a] = [];

    [1, 2, 3].forEach((d) => {
      const b = a + d;
      if (sortedInput.includes(b)) tree[a].push(b);
    });
  }

  return tree;
};

/*
* Thanks to a friend of mine, Anna (https://github.com/annapoulakos), for
* giving me a nudge in the right direction when this wasn't clicking for me.
*/
export const countTotalArrangements = (inputs: number[]) => {
  const tree = createArrangementTree(inputs);

  console.log(tree);

  const countPaths = memoize((curr: number, dest: number) => {
    const currentNodeValues = tree[curr];
    let arrangements = 0;

    if (currentNodeValues.includes(dest)) {
      arrangements = 1;
    } else {
      currentNodeValues.forEach((n) => {
        arrangements += countPaths(n, dest);
      });
    }

    return arrangements;
  });

  return countPaths(0, Math.max(...inputs) + 3);
};

/*
* This version is essentially my implementation of what I learned after reading
* Anna's solution (after I wrote mine above).
*/
export const countTotalArrangements2 = (input: number[]) => {
  const dest = Math.max(...input) + 3;

  const countPaths = memoize((x: number) => {
    if (x === dest) return 1;
    if (x && !input.includes(x)) return 0;
    return [1, 2, 3].reduce((t, n) => t + countPaths(x + n), 0);
  });

  return countPaths(0);
};
