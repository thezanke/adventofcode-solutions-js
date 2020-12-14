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
  let y = 0;
  while (x * y % mod !== 1) y += 1;
  return y;
};

export const findCRT = (input: [number, number][]) => {
  let N = input.reduce((t, [mod]) => t * mod, 1) as number;

  return input.reduce((t: number, [mod, remainder]) => {
    const x = N / mod;
    const y = findY(x, mod);
    return t + remainder * x * y;
  }, 0);
};

export const findPart2 = (input: string[]) => {
  const inputChars = input[1].split(",");

  const crtInput = inputChars
    .map((n, i) => n === "x" ? null : [Number(n), i])
    .filter(Boolean) as [number, number][];

  const total = findCRT(crtInput);

  return total - (inputChars.length - 1);
};
