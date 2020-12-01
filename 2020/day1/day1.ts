export const split = (str: string) => [...str];

export const findTwoEntries = (input: number[], target = 2020) => {
  let x = 0;
  let y = 0;

  for (x of input) {
    y = target - x;
    if (input.includes(y)) {
      return [x, y];
    }
  }

  return [];
};

export const findThreeEntries = (input: number[], target = 2020) => {
  let list = [...input];

  let x = 0;
  let y = 0;
  let z = 0;

  while (list.length) {
    x = list.pop() as number;
    for (y of list) {
      z = target - x - y;
      if (input.includes(z)) {
        return [x, y, z];
      }
    }
  }

  return [];
};
