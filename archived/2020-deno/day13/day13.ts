import { xgcd } from '../common/xgcd.ts';

export const findPart1 = (input: string[]) => {
  const target = Number(input[0]);
  const ids = input[1]
    .split(',')
    .map((n) => n === 'x' ? null : Number(n))
    .filter(Boolean) as number[];

  let best: { id: number, wait: number } | null = null;

  if (ids.length === 0) return 0;

  ids.forEach((id) => {
    let mult = 1;
    while (id * mult < target) mult += 1;
    const total = id * mult;
    const wait = total - target;
    if ((best == null) || wait < best.wait) best = { id, wait };
  });

  if (!best) return 0;

  best = best as { id: number, wait: number };

  return best.id * best.wait;
};

const findInverse = (ni: number, mod: number) => {
  const ui = xgcd(ni, mod);
  if (!ui) return -1;
  return ui[1];
};

export const findCRT = (input: Array<[number, number]>) => {
  const N = input.reduce((t, [, mod]) => t * mod, 1);

  const T = Math.abs(
    input.reduce((t: number, [r, mod]) => {
      const ni = N / mod;
      const ui = findInverse(ni, mod);
      return t + r * ni * ui;
    }, 0)
  );

  return T % N;
};

export const findPart2 = (_input: string[]) => {
  const inputChars = _input[1].split(',');

  const input = inputChars
    .map((n, r) => {
      if (n === 'x') return null;
      const m = Number(n);
      return [r, m];
    })
    .filter(Boolean) as Array<[number, number]>;

  const total = findCRT(input);
  return total;
};

// Literally cheated. stolen/rewritten from reddit because I was done toiling
// with the true CRT way of doing things.
export const cheatPart2 = (_input: string[]) => {
  const inputChars = _input[1].split(',');

  const input = inputChars
    .map((n, r) => {
      if (n === 'x') return null;
      const m = Number(n);
      return [r, m];
    })
    .filter(Boolean) as Array<[number, number]>;

  let lcm = 1;
  let t = 0;

  for (let i = 0; i < input.length - 1; i += 1) {
    const [rn, mn] = input[i + 1];
    const [, m] = input[i];
    lcm *= m;
    while ((t + rn) % mn != 0) t += lcm;
  }

  return t;
};
