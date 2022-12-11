import { chunk } from 'lodash'

/* eslint-disable @typescript-eslint/no-non-null-assertion */
type Command = 'addx' | 'noop'
type Instruction = [command: Command, value?: number]

const parseInput = (input: string): Instruction[] => {
  return input.split('\n').map(l => {
    const [command, val] = l.split(' ')
    if (val === undefined) return [command as Command]
    return [command as Command, parseInt(val, 10)]
  })
}

const instructionCosts = {
  noop: 1,
  addx: 2
}

class Processor {
  cycle = 0
  x = 1
  current: null | [instruction: Instruction, cost: number] = null
  instructions: Instruction[] = []

  constructor (instructions: Instruction[]) {
    this.instructions = [...instructions].reverse()
  }

  handleCurrentInstruction (): void {
    if (this.current === null) return

    this.current[1] -= 1

    const [instruction, cost] = this.current
    if (cost > 0) return

    this.current = null

    const [command] = instruction

    if (command === 'addx') {
      const [,val] = instruction
      if (val !== undefined) this.x += val
    }
  }

  startProcessing (maxCycles: number, callback: (cycle: number, signal: number) => void): void {
    while (this.cycle <= maxCycles) {
      this.cycle += 1

      callback(this.cycle, this.x)

      if (this.current === null) {
        const next = this.instructions.pop()
        if (next !== undefined) {
          this.current = [next, instructionCosts[next[0]]]
        }
      }

      this.handleCurrentInstruction()
    }
  }
}

export const part1 = (input: string): number => {
  const instructions = parseInput(input)
  const processor = new Processor(instructions)
  const cycles = [20, 60, 100, 140, 180, 220]
  const [maxCycles] = cycles.slice(-1)
  let total = 0

  processor.startProcessing(maxCycles, (cycle, x) => {
    if (cycles.includes(cycle)) total += cycle * x
  })

  return total
}

const maxCrtCycles = 240

const renderCrt = (positionMap: Map<number, number>): string => {
  return chunk(Array.from({ length: maxCrtCycles }, (_v, i) => {
    const cycle = i + 1
    const spritePos = positionMap.get(cycle)!
    const hPos = i % 40
    const isPixelLit = (hPos >= spritePos - 1) && (hPos <= spritePos + 1)

    return isPixelLit ? '#' : ' '
  }), 40).map(x => x.join('')).join('\n')
}

export const part2 = (input: string): string => {
  const instructions = parseInput(input)
  const processor = new Processor(instructions)
  const positionMap = new Map<number, number>()

  processor.startProcessing(maxCrtCycles, (cycle, x) => {
    positionMap.set(cycle, x)
  })

  return renderCrt(positionMap)
}
