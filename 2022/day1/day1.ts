const parseInput = (input: string): number[] => input.split('\n\n').map(c => c.split('\n').map(Number).reduce((x, y) => x + y))

export const part1 = (input: string): number => {
  const chunkValues = parseInput(input)
  return Math.max(...chunkValues)
}

export const part2 = (input: string): number => {
  const chunkValues = parseInput(input).sort((a, b) => b - a)
  const topChunks = chunkValues.slice(0, 3)
  return topChunks.reduce((x, y) => x + y)
}
