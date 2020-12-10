import { diff } from "https://deno.land/std@0.79.0/testing/_diff.ts";
import { memoize } from "../common/memoize.ts";

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

// export const countTotalArrangements = (inputs: number[]) => {
//   const max = Math.max(...inputs);
//   const sortedInput = [0, ...inputs, max + 3].sort((a, b) => a - b);
//   let totalArrangements = 1;
//   let i = 0;
//   while (i < sortedInput.length) {
//     const a = sortedInput[i];
//     let group = sortedInput.slice(i + 1, i + 4);
//     if (!group.length) return totalArrangements;
//     let arrangements = group.filter((b) => differences.includes(b - a)).length;
//     console.log(arrangements);
//     if (arrangements > 1) {
//       totalArrangements = Math.pow(arrangements, totalArrangements);
//     }
//     i += arrangements;
//   }
//   return totalArrangements;
// };

export const createArrangementTree = (inputs: number[]) => {
  const max = Math.max(...inputs);
  const sortedInput = [0, ...inputs, max + 3].sort((a, b) => a - b);
  const tree: { [key: number]: number[] } = {};
  for (let i = 0; i < sortedInput.length; i += 1) {
    let a = sortedInput[i];
    if (!tree[a]) tree[a] = [];
    [1, 2, 3].forEach((d) => {
      const b = a + d;
      if (sortedInput.includes(b)) {
        tree[a].push(b);
      }
    });
  }
  return tree;
};

export const countTotalArrangements = (inputs: number[]) => {
  const tree = createArrangementTree(inputs);
  // console.log(tree);

  const countPaths = memoize((curr: number, dest: number) => {
    let currentNodeValues = tree[curr];
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

  const arrangements = countPaths(0, Math.max(...inputs) + 3);

  // Object.values(tree).forEach((possibilities) => {
  //   const count = possibilities.length;
  //   if (count > 1) arrangements += count;
  // });
  return arrangements;
};
