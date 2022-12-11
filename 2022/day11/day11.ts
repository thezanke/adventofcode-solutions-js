class Monkey {
  id: number
  items: number[]
  operation: [sign: string, valStr: string]
  tester: [testVal: number, trueMonkey: number, falseMonkey: number]
  inspections = 0
  mod: number | undefined

  constructor (monkeyLines: string[], i: number) {
    this.id = i
    const [,itemLine, opLine, ...testLines] = monkeyLines

    const [,itemsString] = itemLine.split(': ')
    this.items = itemsString.split(', ').map(Number)

    const [,opString] = opLine.split(': ')
    const [sign, valStr] = opString.split(' ').slice(-2)
    this.operation = [sign, valStr]

    this.tester = testLines.map(line => {
      const [last] = line.split(' ').slice(-1)
      return Number(last)
    }) as Monkey['tester']
  }

  inspectNextItem (monkeys: Monkey[], mod?: number): void {
    this.inspections += 1
    // eslint-disable-next-line prefer-const, @typescript-eslint/no-non-null-assertion
    let itemVal = this.items.shift()!
    const [sign, valStr] = this.operation
    const val = valStr === 'old' ? itemVal : Number(valStr)
    // eslint-disable-next-line no-eval
    itemVal = eval(`itemVal ${sign} ${val}`)

    if (mod === undefined) {
      itemVal = Math.floor(itemVal / 3)
    } else {
      itemVal %= mod
    }

    const [testVal, trueMonkey, falseMonkey] = this.tester
    const receivingMonkey = itemVal % testVal === 0 ? trueMonkey : falseMonkey
    monkeys[receivingMonkey]?.items.push(itemVal)
  }

  takeTurn (monkeys: Monkey[], mod?: number): void {
    const itemCount = this.items.length
    if (itemCount === 0) return
    for (let i = 0; i < itemCount; i += 1) {
      this.inspectNextItem(monkeys, mod)
    }
  }
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

  const [x, y] = monkeys.map(({ inspections }) => inspections).sort((a, b) => b - a)

  return x * y
}

export const part2 = (input: string): number => {
  const monkeys = parseInput(input)
  const specialMod = monkeys.reduce((T, monkey) => T * monkey.tester[0], 1)

  for (let i = 0; i < 10000; i += 1) {
    for (const monkey of monkeys) {
      monkey.takeTurn(monkeys, specialMod)
    }
  }

  const [x, y] = monkeys.map(({ inspections }) => inspections).sort((a, b) => b - a)

  return x * y
}
