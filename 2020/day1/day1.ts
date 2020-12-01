export const split = (str: string) => [...str];

export const findTwoEntries = (input: number[], target = 2020) => {
  let x = 0;
  let y = 0;

  for (x of input) {
    y = target - x;
    if (input.includes(y)) {
      break;
    }
  }
  return [x, y];
};

export const findThreeEntries = (input: number[], target = 2020) => {
  let list = [...input];

  let found = false;
  let x = 0;
  let y = 0;
  let z = 0;

  while (!found && list.length) {
    x = list.pop() as number;
    for (y of list) {
      z = target - x - y;
      if (input.includes(z)) {
        found = true;
        break;
      }
    }
  }

  return [x, y, z];
};
