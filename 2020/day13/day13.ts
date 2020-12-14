import { lcm } from "../common/lcm.ts";

export const findPart1 = (input: string[]) => {
  const target = Number(input[0]);
  const ids = input[1]
    .split(",")
    .map((n) => n === "x" ? null : Number(n))
    .filter(Boolean) as number[];

  let best: { id: number; wait: number } | null = null;

  if (!ids.length) return 0;

  ids.forEach((id) => {
    let mult = 1;
    while (id * mult < target) mult += 1;
    const total = id * mult;
    const wait = total - target;
    if (!best || wait < best.wait) best = { id, wait };
  });

  if (!best) return 0;

  best = best as { id: number; wait: number };

  return best.id * best.wait;
};

const findY = (x: number, mod: number) => {
  let y = 1;
  while (x * y % mod !== 1) y += 1;
  return y;
};

export const findPart2 = (input: string[]) => {
  const ids = input[1]
    .split(",")
    .map((n) => n === "x" ? null : Number(n));

  let N = (ids.filter(Boolean) as number[]).reduce((t, id) => t * id) as number;

  console.log(N);

  let total = ids.reduce((t: number, id, i) => {
    if (!id) return t;
    const x = N / id;
    const y = findY(x, id);
    return t + i * x * y;
  }, 0);

  return total;
};
