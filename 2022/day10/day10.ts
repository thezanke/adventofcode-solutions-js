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
    switch (command) {
      case 'addx': {
        const [,val] = instruction
        if (val !== undefined) this.x += val
        break
      }
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

export const part1 = (input: string, cycles = [20, 60, 100, 140, 180, 220]): number => {
  const [maxCycles] = cycles.slice(-1)

  const instructions = parseInput(input)
  const processor = new Processor(instructions)

  let total = 0

  processor.startProcessing(maxCycles, (cycle, x) => {
    if (cycles.includes(cycle)) total += cycle * x
  })

  return total
}

export const part2 = (input: string): string => {
  const instructions = parseInput(input)
  const processor = new Processor(instructions)

  const positionMap = new Map<number, number>()

  processor.startProcessing(240, (cycle, x) => {
    positionMap.set(cycle, x)
  })

  const render = chunk(Array.from({ length: 240 }, (_v, i) => {
    const spritePos = positionMap.get(i + 1)!
    const renderPos = i % 40
    const isLit = (renderPos >= spritePos - 1) && (renderPos <= spritePos + 1)
    return isLit ? '#' : ' '
  }), 40).map(x => x.join('')).join('\n')

  console.log(render)

  return render
}
