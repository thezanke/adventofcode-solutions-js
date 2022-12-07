const solve = (input: string, uniquesRequired: number): number => {
  for (let i = uniquesRequired; i <= input.length; i += 1) {
    const set = new Set(input.slice(i - uniquesRequired, i))
    if (set.size === uniquesRequired) return i
  }

  return -1
}

export const part1 = (input: string): number => solve(input, 4)
export const part2 = (input: string): number => solve(input, 14)
