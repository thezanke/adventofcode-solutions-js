import { xgcd } from "../common/xgcd.ts";

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

const findInverse = (ni: number, mod: number) => {
  const ui = xgcd(ni, mod);
  if (!ui) return -1;
  return ui[1];
};

export const findCRT = (input: [number, number][]) => {
  const N = input.reduce((t, [, mod]) => t * mod, 1);

  const T = Math.abs(
    input.reduce((t: number, [r, mod]) => {
      const ni = N / mod;
      const ui = findInverse(ni, mod);
      return t + r * ni * ui;
    }, 0),
  );

  return T % N;
};

export const findPart2 = (input: string[]) => {
  const inputChars = input[1].split(",");

  const crtInput = inputChars
    .map((n, r) => {
      if (n === "x") return null;
      const m = Number(n);
      return [r, m];
    })
    .filter(Boolean) as [number, number][];

  const total = findCRT(crtInput);
  return total;
};
