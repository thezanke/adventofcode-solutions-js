import { Vec2d } from '../common/types'
import * as v from '../common/vecUtils'

const LOGGING = true

type LineList = Vec2d[][]

const parseInput = (input: string): LineList => {
  return input.split('\n').map(x => x.split(' -> ').map(x => x.split(',').map(Number) as Vec2d))
}

enum ObjectType {
  Air = ' ',
  Rock = '#',
  Sand = 'o'
}

class ScanGrid {
  private readonly data: Map<string, ObjectType> = new Map()
  private readonly fallingSand: Set<Vec2d> = new Set()
  private minX: number = Infinity
  private maxX: number = -Infinity
  private minY: number = 0
  private maxY: number = -Infinity

  constructor (lines: LineList, private readonly origin: Vec2d, private readonly hasFloor = false) {
    this.convertLinesToData(lines)
  }

  getPositionValue (pos: Vec2d, fallingSandKeys?: string[]): ObjectType {
    if (this.hasFloor && pos[1] === this.maxY) return ObjectType.Rock
    const posString = JSON.stringify(pos)
    if (fallingSandKeys === undefined) fallingSandKeys = this.getFallingSandKeys()
    if (fallingSandKeys.includes(posString)) return ObjectType.Sand
    return this.data.get(posString) ?? ObjectType.Air
  }

  adjustIfNeeded (pos: Vec2d, xOnly = false): void {
    const [x, y] = pos
    const maxY = this.hasFloor && xOnly ? y + 2 : y
    if (this.minX === undefined || x < this.minX) this.minX = x
    if (this.maxX === undefined || x > this.maxX) this.maxX = x
    if (!xOnly) {
      if (this.minY === undefined || y < this.minY) this.minY = y
      if (this.maxY === undefined || maxY > this.maxY) this.maxY = maxY
    }
  }

  setPositions (positions: Vec2d[], type: ObjectType | null): void {
    for (const pos of positions) {
      const posKey = JSON.stringify(pos)

      if (type === null) {
        this.data.delete(posKey)
      } else {
        this.data.set(posKey, type)
      }

      this.adjustIfNeeded(pos)
    }
  }

  convertLinesToData (lines: LineList): void {
    for (const line of lines) {
      for (let i = 0; i < line.length - 1; i += 1) {
        const [v1, v2] = line.slice(i, i + 2)
        const diff = v.subtract(v2, v1)
        const unitVec = v.getUnitVec(diff) as Vec2d<-1 | 0 | 1>

        let curr = v1
        const positions = [curr]

        while (curr.toString() !== v2.toString()) {
          curr = v.add(curr, unitVec)
          positions.push(curr)
        }

        this.setPositions(positions, ObjectType.Rock)
      }
    }
  }

  getFallingSandKeys (): string[] {
    return [...this.fallingSand.values()].map(s => JSON.stringify(s))
  }

  toString (): string {
    if (!isFinite(this.minX) || !isFinite(this.minY)) return 'impossible.'

    const fallingSandKeys = this.getFallingSandKeys()

    return Array.from({ length: this.maxY - this.minY + 1 }, (_v, gy) => {
      return Array.from({ length: this.maxX - this.minX + 1 }, (_v, gx) => {
        const [x, y] = [gx + this.minX, gy + this.minY]
        return this.getPositionValue([x, y], fallingSandKeys)
      }).join('')
    }).join('\n')
  }

  checkIfOutOfBounds (sand: Vec2d): boolean {
    const [x, y] = sand
    if (this.hasFloor) return x === this.origin[0] && y === this.origin[1]
    if (x > this.maxX) return true
    if (x < this.minX) return true
    if (y > this.maxY) return true
    return false
  }

  getNextMove (sand: Vec2d, fsk: string[]): Vec2d | null {
    const [x, y] = sand

    if (this.getPositionValue([x, y + 1], fsk) === ObjectType.Air) return [0, 1]
    if (this.getPositionValue([x - 1, y + 1], fsk) === ObjectType.Air) return [-1, 1]
    if (this.getPositionValue([x + 1, y + 1], fsk) === ObjectType.Air) return [1, 1]

    return null
  }

  dropSand (): boolean {
    const sand = [...this.origin] as Vec2d
    this.fallingSand.add(sand)
    this.print()

    let isAtRest = false

    for (let i = 0; i < 10000; i += 1) {
      const fallingSandKeys = this.getFallingSandKeys()
      const move = this.getNextMove(sand, fallingSandKeys)
      isAtRest = move === null

      if (isAtRest) {
        this.setPositions([sand], ObjectType.Sand)
        break
      } else {
        v.add(sand, move as Vec2d, true)
        this.adjustIfNeeded(sand, true)
        if (this.checkIfOutOfBounds(sand)) break
      }
      this.print()
    }

    return isAtRest
  }

  simulate (): void {
    let dropStabilized: boolean | undefined

    do {
      dropStabilized = this.dropSand()
    } while (dropStabilized)
  }

  countObject (objectType: ObjectType.Sand | ObjectType.Rock): number {
    return [...this.data.values()].filter(v => v === objectType).length
  }

  print (): void {
    if (LOGGING) console.log(this.toString())
  }
}

export const solve = (input: string, solveWithFloor = false): number => {
  const lines = parseInput(input)
  const grid = new ScanGrid(lines, [500, 0], solveWithFloor)

  grid.simulate()

  return grid.countObject(ObjectType.Sand)
}
