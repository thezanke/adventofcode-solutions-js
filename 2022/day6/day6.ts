const solve = (input: string, uniquesRequired: number) => {
  for (let i = uniquesRequired; i <= input.length; i += 1) {
    const set = new Set(input.slice(i - uniquesRequired, i));
    if (set.size === uniquesRequired) return i;
  }

  return null;
};

export const part1 = (input: string) => solve(input, 4);
export const part2 = (input: string) => solve(input, 14);
