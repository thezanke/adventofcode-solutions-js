export const add = (_a: number[], b: number[], shouldMutateOriginal = false): number[] => {
  const a = shouldMutateOriginal ? _a : [..._a]
  for (const [i, val] of _a.entries()) a[i] = val + (b[i] ?? 0)
  return a
}

export const subtract = (_a: number[], b: number[], shouldMutateOriginal = false): number[] => {
  const a = shouldMutateOriginal ? _a : [..._a]
  for (const [i, val] of _a.entries()) a[i] = val - (b[i] ?? 0)
  return a
}

export const sum = (a: number[]): number => {
  return a.reduce((t, v) => t + v)
}
