// import _ from 'lodash'
import * as vecUtils from '../common/vecUtils'

import { Vec2d } from '../common/types'

type Direction = 'U' | 'D' | 'L' | 'R'

const dirVecMap: Record<Direction, Vec2d> = {
  U: [0, 1],
  D: [0, -1],
  L: [1, 0],
  R: [-1, 0]
}

const START: Vec2d = [0, 0]

const parseInput = (input: string): Array<[Vec2d, number]> => {
  return input
    .split('\n')
    .map(l => {
      const [dir, dist] = l.split(' ')
      return [dirVecMap[dir as Direction], parseInt(dist, 10)]
    })
}

type Positions = Vec2d[]

const determineMove = (positions: Positions): Vec2d => {
  const [last, current] = positions

  const displacementVector = vecUtils.subtract(last, current) as Vec2d
  const displacementDistance = vecUtils.sum(displacementVector.map(Math.abs))
  const displacementUnit = displacementVector.map((num: number) => num / Math.abs(num)) as Vec2d

  if (displacementDistance > 2) return displacementUnit

  const [diffX, diffY] = displacementVector
  if (Math.abs(diffX) > 1) return [displacementUnit[0], 0]
  if (Math.abs(diffY) > 1) return [0, displacementUnit[1]]

  return [0, 0]
}

const vecToKey = (vec: number[]): string => vec.join(',')

export const part1 = (input: string, length: number = 2): number => {
  const positions: Positions = Array.from({ length }, () => [...START])
  const tail = positions[positions.length - 1]
  const visited = new Set([vecToKey(START)])

  const headMoves = parseInput(input)

  for (const [vec, dist] of headMoves) {
    for (let d = 0; d < dist; d += 1) {
      const [head] = positions
      vecUtils.add(head, vec, true)

      for (let p = 1; p < positions.length; p += 1) {
        const [last, current] = positions.slice(p - 1)
        const move = determineMove([last, current])
        const isStalled = vecUtils.sum(move.map(Math.abs)) === 0
        if (isStalled) break
        vecUtils.add(current, move, true)
        if (current === tail) visited.add(vecToKey(current))
      }
    }
  }

  return visited.size
}

export const part2 = (input: string): number => {
  return part1(input, 10)
}
