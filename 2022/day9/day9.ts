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

const determineSegmentMove = (positions: Positions): Vec2d => {
  const [last, current] = positions

  const displacement = vecUtils.subtract(last, current) as Vec2d
  const distance = vecUtils.sum(displacement.map(Math.abs))
  const unit = displacement.map((num: number) => num / Math.abs(num)) as Vec2d

  if (distance > 2) return unit

  const [diffX, diffY] = displacement
  if (Math.abs(diffX) > 1) return [unit[0], 0]
  if (Math.abs(diffY) > 1) return [0, unit[1]]

  return [0, 0]
}

const vecToKey = (vec: number[]): string => vec.join(',')

export const solve = (input: string, length: number = 2): number => {
  const moves = parseInput(input)
  const positions: Positions = Array.from({ length }, () => [...START])
  const [tail] = positions.slice(-1)
  const visited = new Set([vecToKey(START)])

  for (const [vec, dist] of moves) {
    for (let d = 0; d < dist; d += 1) {
      const [head] = positions
      vecUtils.add(head, vec, true)

      for (let p = 1; p < positions.length; p += 1) {
        const [prevSegment, currSegment] = positions.slice(p - 1)
        const segmentMove = determineSegmentMove([prevSegment, currSegment])

        const isStalled = vecUtils.sum(segmentMove.map(Math.abs)) === 0
        if (isStalled) break

        vecUtils.add(currSegment, segmentMove, true)
        if (currSegment === tail) visited.add(vecToKey(currSegment))
      }
    }
  }

  return visited.size
}

export const part1 = (input: string): number => solve(input)
export const part2 = (input: string): number => solve(input, 10)
