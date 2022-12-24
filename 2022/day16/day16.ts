const LINE_REGEX = /Valve ([A-Z]+) has flow rate=(-?\d+); tunnels? leads? to valves? (.+)$/
const MAX_TIME = 30

export type ValveData = [label: ValveLabel, flowRate: number, ...adjacent: string[]]

export const parseInput = (input: string): ValveData[] => {
  return input.split('\n').map(line => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const match = line.match(LINE_REGEX)!
    const [,pipe, flowRateStr, adjacentStr] = match
    return [pipe, Number(flowRateStr), ...adjacentStr.split(', ')]
  })
}

export class Graph {
  connections: Record<string, string[]> = {}
  values: Record<string, number> = {}
  distances: Record<string, Record<string, number>> = {}

  constructor (nodeData?: ValveData[]) {
    if (nodeData !== undefined) this.addNodes(nodeData)
  }

  addNode ([label, value, ...adjacent]: ValveData): void {
    this.connections[label] = adjacent
    this.cacheDistance(label)

    if (value > 0) this.values[label] = value
  }

  addNodes (nodeData: ValveData[]): void {
    for (const data of nodeData) {
      this.addNode(data)
    }
  }

  private cacheDistance (node: string): void {
    const connections = this.connections[node]

    this.distances[node] = Object.fromEntries(connections.map(conn => [conn, 1]))

    for (const node2 in this.connections) {
      if (node === node2) continue
      const distance = this.getDistanceBetweenNodes(node, node2)
      this.distances[node2][node] = distance
      this.distances[node][node2] = distance
    }
  }

  getDistanceBetweenNodes (node1: string, node2: string): number {
    if (this.distances[node1][node2] !== undefined) return this.distances[node1][node2]
    if (node1 === node2) return 0

    let current = [node1]
    let distance = 0
    const seen = new Set<string>()

    while (current.length > 0) {
      if (current.includes(node2)) break
      current.forEach(node => seen.add(node))
      current = current.flatMap(node => this.connections[node]).filter(node => !seen.has(node))
      distance += 1
    }

    return distance
  }
}

// const getPlanInit = (valves: ValveData[]): void => {
//   // const unopened = []
//   // const distances = {}
//   // const graph = {}
//   const graph = new Graph()

//   for (const data of valves) {
//     graph.addNode(data)
//   }

//   // for (const [valve, ])
// }

type ValveLabel = keyof Graph['connections']
interface ChoiceInfo {
  choice: ValveLabel
  distance: number
  score: number
  cost: number
}

export const findBestPath = (valves: ValveData[]): { path: ValveLabel[], value: number } => {
  const graph = new Graph(valves)
  // console.log(graph)

  const getChoiceInfo = (
    current: ValveLabel,
    choice: ValveLabel,
    remainingTime: number
  ): ChoiceInfo => {
    const value = graph.values[choice]
    const distance = graph.getDistanceBetweenNodes(current, choice)
    const cost = 1 + distance
    const score = (remainingTime - cost) * value

    return { choice, distance, score, cost }
  }

  const best: {
    path: ValveLabel[]
    value: number
  } = { path: [], value: 0 }

  const findNextBestPath = (
    current: ValveLabel,
    unopened: ValveLabel[],
    path: ValveLabel[] = [],
    totalScore: number = 0,
    remainingTime: number = MAX_TIME
  ): void => {
    if (remainingTime < 0) return

    const isBest = totalScore > best.value
    if (isBest) {
      best.path = path
      best.value = totalScore
    }

    if (unopened.length === 0) return

    for (const option of unopened) {
      const { score, cost } = getChoiceInfo(current, option, remainingTime)

      const nextRemainingTime = remainingTime - cost
      if (nextRemainingTime <= 0) continue

      findNextBestPath(option, unopened.filter(label => label !== option), [...path, option], totalScore + score, nextRemainingTime)
    }
  }

  findNextBestPath('AA', Object.keys(graph.values))

  return best
}

export const part1 = (input: string): number => {
  const inputData = parseInput(input)
  const best = findBestPath(inputData)
  return best.value
}

export const part2 = (input: string): number => {
  console.log(input)
  return -1
}
