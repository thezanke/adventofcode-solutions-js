import Graph from 'graphology'
import render from 'graphology-svg'
import * as shortest from 'graphology-shortest-path'
import { circular } from 'graphology-layout'
import * as fs from 'fs-extra'
import * as path from 'path'
import forceatlas2 from 'graphology-layout-forceatlas2'

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

export const renderGraph = (graph: Graph): void => {
  circular.assign(graph)
  forceatlas2.assign(graph, 50)

  const outputPath = './output/graph.svg'
  fs.ensureDirSync(path.dirname(outputPath))
  render(graph, outputPath, (err: Error) => console.error(err))
}

interface ValveAttributes { id: string, label: string, flow: number }

const buildGraph = (inputData: ValveData[]): Graph<ValveAttributes> => {
  const graph = new Graph<ValveAttributes>()

  for (const [valve, flow, ...edges] of inputData) {
    graph.addNode(valve, { id: valve, label: `${valve} (${flow})`, flow })

    for (const edge of edges) {
      try {
        graph.addUndirectedEdge(valve, edge)
      } catch {}
    }
  }

  return graph
}

type DistMap = Record<string, shortest.unweighted.ShortestPathLengthMapping>

const getInitialProblemState = (input: string): {
  graph: Graph<ValveAttributes>
  flowValves: string[]
  distMap: DistMap
} => {
  const inputData = parseInput(input)
  const graph = buildGraph(inputData)
  const flowValves = graph.filterNodes((_node, { flow }) => flow > 0)
  const distMap = graph.reduceNodes<DistMap>((map, node) => {
    map[node] = shortest.singleSourceLength(graph, node)
    return map
  }, {})

  return { graph, flowValves, distMap }
}

export const part1 = (input: string): number => {
  const { graph, flowValves, distMap } = getInitialProblemState(input)

  let best = 0

  const traverse = (
    current = 'AA',
    options = flowValves,
    remaining = MAX_TIME,
    total = 0
  ): void => {
    if (remaining === 0 || options.length === 0) {
      if (total > best) best = total
      return
    }

    for (const next of options) {
      const cost = distMap[current][next] + 1

      let remainingAfterDelay = remaining - cost
      if (remainingAfterDelay < 0) remainingAfterDelay = 0

      let nextTotal = total
      if (remainingAfterDelay > 0) {
        const flow = graph.getNodeAttribute(next, 'flow')
        nextTotal += remainingAfterDelay * flow
      }

      const nextOptions = options.filter(o => o !== next)

      traverse(next, nextOptions, remainingAfterDelay, nextTotal)
    }
  }

  traverse()

  return best
}

export const part2 = (input: string): number => {
  const { graph, flowValves, distMap } = getInitialProblemState(input)

  let best = 0

  const traverse = (
    current = 'AA',
    options = flowValves,
    remaining = MAX_TIME,
    total = 0
  ): void => {
    if (remaining === 0 || options.length === 0) {
      if (total > best) best = total
      return
    }

    for (const next of options) {
      const cost = distMap[current][next] + 1

      let remainingAfterDelay = remaining - cost
      if (remainingAfterDelay < 0) remainingAfterDelay = 0

      let nextTotal = total
      if (remainingAfterDelay > 0) {
        const flow = graph.getNodeAttribute(next, 'flow')
        nextTotal += remainingAfterDelay * flow
      }

      const nextOptions = options.filter(o => o !== next)

      traverse(next, nextOptions, remainingAfterDelay, nextTotal)
    }
  }

  traverse()

  return best
}
