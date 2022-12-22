const LINE_REGEX = /Valve ([A-Z]+) has flow rate=(-?\d+); tunnels? leads? to valves? (.+)$/
const MAX_TIME = 30

export type ValveData = [label: string, flowRate: number, ...adjacent: string[]]

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

export const determineValveOrder = (valves: ValveData[]): string[] => {
  const graph = new Graph(valves)
  console.log(graph)

  const getChoiceInfo = (
    current: keyof Graph['connections'],
    choice: keyof Graph['connections'],
    remainingTime: number
  ): {
    choice: keyof Graph['connections']
    distance: number
    score: number
    cost: number
  } => {
    const value = graph.values[choice]
    const distance = graph.getDistanceBetweenNodes(current, choice)
    const cost = 1 + distance
    const score = (remainingTime - cost) * value

    return { choice, distance, score, cost }
  }

  const unopened = { ...graph.values }
  console.log({ unopened })

  const path = []
  let i = 0
  let curr = 'AA'
  let total = 0

  do {
    const remainingTime = MAX_TIME - i

    const results = Object.keys(unopened).map((choice) =>
      getChoiceInfo(curr, choice, remainingTime)
    ).sort((a, b) => b.score - a.score)

    console.log({ curr, i, results })
    const [next] = results

    if (next === undefined || i + next.cost >= MAX_TIME) break
    total += next.score

    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete unopened[next.choice]

    path.push(next.choice)
    curr = next.choice
    i += next.cost
  } while (i < MAX_TIME)

  console.log(total)

  return path
}

export const part1 = (input: string): number => {
  const inputData = parseInput(input)
  console.log(inputData)
  return -1
}

export const part2 = (input: string): number => {
  console.log(input)
  return -1
}
