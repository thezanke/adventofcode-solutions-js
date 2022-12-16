import * as v from '../common/vecUtils'
import { Vec2d } from '../common/types'

const LINE_REGEX = /x=(?<x>-?\d+), y=(?<y>-?\d+)/g

interface MatchGroup { x: string, y: string }

type SensorBeaconData = [sensor: Vec2d, beacon: Vec2d, range: number]

const parseInput = (input: string): SensorBeaconData[] => {
  return input.split('\n').map(line => {
    const output: Array<Vec2d | number> = []

    for (const match of line.matchAll(LINE_REGEX)) {
      const { x, y } = match.groups as unknown as MatchGroup
      output.push([Number(x), Number(y)] as Vec2d)
    }

    const [sensor, beacon] = output as [Vec2d, Vec2d]
    output.push(v.manhattan(sensor, beacon))

    return output as [Vec2d, Vec2d, number]
  })
}

interface Bounds { min: number, max: number }
type PositionSet = Set<string>

const getXBounds = (data: SensorBeaconData[]): Bounds => {
  let min, max

  for (const [sensor, beacon, range] of data) {
    for (const [x] of [sensor, beacon]) {
      if (min === undefined || x - range < min) min = x - range
      if (max === undefined || x + range > max) max = x + range
    }
  }

  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  return { min, max } as Bounds
}

const getOccupiedPositions = (sensorBeaconData: SensorBeaconData[]): PositionSet => {
  const bps: PositionSet = new Set()
  for (const [, beacon] of sensorBeaconData) {
    // bps.add(sensor.toString())
    bps.add(beacon.toString())
  }
  return bps
}

const iteratePositions = function * (xBounds: Bounds, y: number): Generator<Vec2d> {
  for (let x = xBounds.min; x <= xBounds.max; x += 1) yield [x, y]
}

const getImpossibleBeaconPositionsInRow = (sensorBeaconData: SensorBeaconData[], beaconPositionSet: PositionSet, xBounds: Bounds, y: number, takenPositions: PositionSet = new Set()): PositionSet => {
  const impossiblePositions: PositionSet = new Set()

  for (const curr of iteratePositions(xBounds, y)) {
    const posKey = curr.toString()

    if (takenPositions.has(posKey)) {
      impossiblePositions.add(posKey)
      continue
    }

    if (beaconPositionSet.has(posKey)) continue

    for (const [sensor,,sensorClosestBeaconDistance] of sensorBeaconData) {
      const distance = v.manhattan(curr, sensor)
      if (distance <= sensorClosestBeaconDistance) {
        impossiblePositions.add(posKey)
        break
      }
    }
  }

  return impossiblePositions
}

export const part1 = (input: string, y: number): number => {
  const sensorBeaconData = parseInput(input)
  const beaconPositionSet = getOccupiedPositions(sensorBeaconData)
  const xBounds = getXBounds(sensorBeaconData)
  const impossiblePositions = getImpossibleBeaconPositionsInRow(sensorBeaconData, beaconPositionSet, xBounds, y)

  return impossiblePositions.size
}

const walkPerimeter = function * (sensor: Vec2d, range: number): Generator<Vec2d> {
  const [sx, sy] = sensor

  const position: Vec2d = [sx - range - 1, sy] // left point of diamond

  // up right
  while (position[0] < sx) {
    v.add(position, [1, -1], true)
    yield position
  }

  // down right
  while (position[1] < sy) {
    v.add(position, [1, 1], true)
    yield position
  }

  // down left
  while (position[0] > sx) {
    v.add(position, [-1, 1], true)
    yield position
  }

  // up left
  while (position[1] > sy) {
    v.add(position, [-1, -1], true)
    yield position
  }
}

const checkIfPositionDetected = (pos: Vec2d, sensors: SensorBeaconData[]): boolean => {
  for (const [sensor,,range] of sensors) {
    const distance = v.manhattan(pos, sensor)
    if (distance <= range) return true
  }

  return false
}

const findValidPosition = (sensorBeaconData: SensorBeaconData[], bounds: Bounds): Vec2d | null => {
  for (const [sensor, , range] of sensorBeaconData) {
    for (const pos of walkPerimeter(sensor, range)) {
      const [x, y] = pos
      if (x < bounds.min || x > bounds.max || y < bounds.min || y > bounds.max) continue
      if (!checkIfPositionDetected(pos, sensorBeaconData)) return pos
    }
  }

  return null
}

export const part2 = (input: string, maxBound: number): number => {
  const sensorBeaconData = parseInput(input)
  const bounds = { min: 0, max: maxBound }

  const validPosition = findValidPosition(sensorBeaconData, bounds)
  if (validPosition === null) return -1

  const [x, y] = validPosition
  return x * 4000000 + y
}
