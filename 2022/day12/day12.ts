import { Vec2d } from '../common/types'

const elevationMap = 'abcdefghijklmnopqrstuvwxyz'

class Position {
  public distance = Infinity
  public visited = false
  private _neighbors: Position[] | undefined

  constructor (
    public readonly position: Vec2d,
    public readonly value: number,
    private readonly grid: Grid
  ) {}

  get neighbors (): Position[] {
    if (this._neighbors == null) {
      const [x, y] = this.position

      this._neighbors = [
        this.grid.getPosition(x - 1, y),
        this.grid.getPosition(x + 1, y),
        this.grid.getPosition(x, y + 1),
        this.grid.getPosition(x, y - 1)
      ].filter(n => {
        if (n === null) return false
        return n.value <= this.value + 1
      }) as Position[]
    }

    return this._neighbors
  }
}

type HeightMap = number[][]

class Grid {
  public data: Position[][]
  public maxX: number
  public maxY: number

  constructor (input: HeightMap) {
    this.data = input.map((row, y) =>
      row.map((value, x) => new Position([x, y], value, this))
    )

    this.maxX = input[0].length - 1
    this.maxY = input.length - 1
  }

  getPosition (x: number, y: number): Position | null {
    return this.data[y]?.[x] ?? null
  }
}

const bfs = (grid: Grid, start: Position, end: Position): Map<Position, Position> | null => {
  // const open = new Heap<Position>((a, b) => a.distance - b.distance)
  const queue = []

  const parents: Map<Position, Position> = new Map()

  start.distance = 0
  queue.push(start)

  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  while (queue.length > 0) {
    const curr = queue.shift() as Position

    if (curr === end) return parents

    for (const pos of curr.neighbors) {
      if (pos.visited) continue

      parents.set(pos, curr)
      pos.distance = curr.distance + 1
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (!queue.includes(pos)) queue.push(pos)
    }

    curr.visited = true
  }

  return null
}

const parseInput = (input: string): { heightMap: HeightMap, start: Vec2d, end: Vec2d } => {
  let start: Vec2d = [0, 0]
  let end: Vec2d = [0, 0]

  const heightMap = input.split('\n').map((l, y) => l.split('').map((char, x) => {
    if (char === 'S') {
      start = [x, y]
      return elevationMap.indexOf('a')
    }

    if (char === 'E') {
      end = [x, y]
      return elevationMap.indexOf('z')
    }

    return elevationMap.indexOf(char)
  }))

  return { heightMap, start, end }
}

const getShortestPath = (end: Position, parents: Map<Position, Position>): Position[] => {
  const shortestPath = [end]

  let parent: Position | undefined = parents.get(end)
  while (parent != null) {
    shortestPath.push(parent)
    parent = parents.get(parent)
  }

  return shortestPath
}

export const part1 = (input: string): number => {
  const { heightMap, start, end } = parseInput(input)
  const grid = new Grid(heightMap)

  const startPos = grid.getPosition(...start)
  if (startPos === null) return -1

  const endPos = grid.getPosition(...end)
  if (endPos === null) return -1

  const parents = bfs(grid, startPos, endPos)
  if (parents === null) return -1

  const shortestPath = getShortestPath(endPos, parents)

  return shortestPath.length - 1
}

export const part2 = (input: string): number => {
  return -1
}
