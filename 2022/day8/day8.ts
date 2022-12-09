import { Vec2d } from '../common/types'
import * as vecUtils from '../common/vecUtils'

const parseInput = (input: string): number[][] => {
  return input.split('\n').map(l => l.split('').map(Number))
}

const determineIfEdge = (treeGrid: number[][], [x, y]: Vec2d): boolean => {
  if (y === 0) return true
  if (x === 0) return true
  if (y === treeGrid.length - 1) return true
  const [row1] = treeGrid
  if (x === row1.length - 1) return true
  return false
}

const determineIfShadedInDirection = (treeGrid: number[][], pos: Vec2d, height: number, direction: Vec2d): boolean => {
  const currentPos: Vec2d = [...pos]

  do {
    vecUtils.add(currentPos, direction, true)

    const nextTreeHeight = treeGrid[currentPos[1]]?.[currentPos[0]]
    if (nextTreeHeight === undefined) break

    if (nextTreeHeight >= height) return true
  } while (!determineIfEdge(treeGrid, currentPos))

  return false
}

const directions: Vec2d[] = [[1, 0], [0, 1], [-1, 0], [0, -1]]

const determineIfVisible = (treeGrid: number[][], pos: Vec2d, height: number): boolean => {
  return directions.some(direction => !determineIfShadedInDirection(treeGrid, pos, height, direction))
}

export const part1 = (input: string): number => {
  const treeGrid = parseInput(input)

  let visible = 0

  for (const [y, row] of treeGrid.entries()) {
    for (const [x, height] of row.entries()) {
      visible += Number(determineIfVisible(treeGrid, [x, y], height))
    }
  }

  return visible
}

const determineDirectionScore = (treeGrid: number[][], pos: Vec2d, height: number, direction: Vec2d): number => {
  let score = 0
  const currentPos: Vec2d = [...pos]

  do {
    vecUtils.add(currentPos, direction, true)

    const nextTreeHeight = treeGrid[currentPos[1]]?.[currentPos[0]]
    if (nextTreeHeight === undefined) break

    score += 1

    if (nextTreeHeight >= height) break
  } while (!determineIfEdge(treeGrid, currentPos))

  return score
}

const determineScenicScore = (treeGrid: number[][], pos: Vec2d, height: number): number => {
  return directions.reduce((t, dir) => t * determineDirectionScore(treeGrid, pos, height, dir), 1)
}

export const part2 = (input: string): number => {
  const treeGrid = parseInput(input)

  let best = 0

  for (const [y, row] of treeGrid.entries()) {
    for (const [x, height] of row.entries()) {
      const score = determineScenicScore(treeGrid, [x, y], height)
      if (score > best) best = score
    }
  }

  return best
}
