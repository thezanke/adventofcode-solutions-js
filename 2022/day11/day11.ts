class Monkey {
  id: number
  items: number[]
  opString: string
  tester: [divBy: number, ifTrue: number, ifFalse: number]
  inspections = 0

  constructor (monkeyLines: string[], i: number) {
    this.id = i
    const [,itemLine, opLine, ...testLines] = monkeyLines

    const [,itemsString] = itemLine.split(': ')
    this.items = itemsString.split(', ').map(Number)

    const [,opString] = opLine.split(': ')
    this.opString = opString

    this.tester = testLines.map(line => {
      const [last] = line.split(' ').splice(-1)
      return Number(last)
    }) as Monkey['tester']
  }

  takeTurn () {}
}

const parseInput = (input: string): Monkey[] => {
  return input.split('\n\n').map((c, i) => new Monkey(c.split('\n'), i))
}

export const part1 = (input: string): number => {
  const monkeys = parseInput(input)

  for (let i = 0; i < 20; i += 1) {
    for (const monkey of monkeys) {
      monkey.takeTurn(monkeys)
    }
  }

  return -1
}

export const part2 = (input: string): number => -1
