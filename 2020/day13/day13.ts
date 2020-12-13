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

export const findPart2 = (input: string[]) => {
  const ids = input[1]
    .split(",")
    .map((n) => n === "x" ? null : Number(n));

  let mult = 1;
  while (true) {
    let curr = ids[0] as number * mult;
    let erry = ids.every((id, i) => {
      if (!(id && i)) return true;
      return id - curr % id === i;
    });

    if (erry) break;
    mult += 1;
  }

  return ids[0] as number * mult;
};
