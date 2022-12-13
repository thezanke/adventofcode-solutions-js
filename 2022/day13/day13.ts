import { NestedArray } from '../common/types'

type NestedNumberArrayPair = [left: NestedArray<number>, right: NestedArray<number>]

const parseInput = (input: string): NestedNumberArrayPair[] => {
  return input.split('\n\n').map(chunk =>
    chunk.split('\n').map(line =>
      // eslint-disable-next-line no-eval
      eval(`${line}`) as NestedNumberArrayPair[0]
    ) as NestedNumberArrayPair
  )
}

export const determineIfCorrectOrder = (pair: NestedNumberArrayPair): boolean | null => {
  const [left, right] = pair

  const minLen = Math.min(left.length, right.length)

  for (let i = 0; i < minLen; i += 1) {
    const leftVal = left[i]
    const rightVal = right[i]

    const isNumericComparison = !Array.isArray(leftVal) && !Array.isArray(rightVal)
    if (isNumericComparison) {
      if (leftVal < rightVal) return true
      if (leftVal > rightVal) return false
    } else {
      const nestedCompareResult = determineIfCorrectOrder([[leftVal].flat(), [rightVal].flat()])
      if (nestedCompareResult !== null) return nestedCompareResult
    }
  }

  if (left.length < right.length) return true
  if (left.length > right.length) return false

  return null
}

export const part1 = (input: string): number => {
  const parsed = parseInput(input)
  const correct = parsed.map(determineIfCorrectOrder)

  return correct.reduce((t, v, i) => v === true ? t + i + 1 : t, 0)
}

export const part2 = (input: string): number => {
  const dividerPackets = [[[2]], [[6]]] as NestedNumberArrayPair

  const parsed = parseInput(input)
  parsed.push(dividerPackets)

  const flatParsed = parsed.flat()
  flatParsed.sort((a, b) => determineIfCorrectOrder([a, b]) === true ? -1 : 1)

  return flatParsed.reduce((t, p, i) => dividerPackets.includes(p) ? t * (i + 1) : t, 1)
}
