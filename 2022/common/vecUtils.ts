export const add = <T extends number[]>(_a: T, b: T, shouldMutateOriginal = false): T => {
  const a = shouldMutateOriginal ? _a : [..._a] as T
  for (const [i, val] of _a.entries()) a[i] = val + (b[i] ?? 0)
  return a
}

export const subtract = (_a: number[], b: number[], shouldMutateOriginal = false): number[] => {
  const a = shouldMutateOriginal ? _a : [..._a]
  for (const [i, val] of _a.entries()) a[i] = val - (b[i] ?? 0)
  return a
}

export const sum = (vec: number[]): number => {
  return vec.reduce((t, v) => t + v)
}

export const sumAbs = (vec: number[]): number => sum(vec.map(Math.abs))

// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
export const getUnitVec = (vec: number[]): Array<-1 | 0 | 1> => vec.map((num) => num && (num / Math.abs(num)) as 1 | -1 | 0)
