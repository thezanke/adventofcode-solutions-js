class Monkey {
  id: number
  items: number[]
  operation: [sign: string, valStr: string]
  tester: [testVal: number, trueMonkey: number, falseMonkey: number]
  inspections = 0

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

  inspectNextItem (monkeys: Monkey[]): void {
    this.inspections += 1
    // eslint-disable-next-line prefer-const, @typescript-eslint/no-non-null-assertion
    let itemVal = this.items.shift()!
    const [sign, valStr] = this.operation
    const val = valStr === 'old' ? itemVal : Number(valStr)
    // eslint-disable-next-line no-eval
    itemVal = eval(`itemVal ${sign} ${val}`)
    itemVal = Math.floor(itemVal / 3)
    const [testVal, trueMonkey, falseMonkey] = this.tester
    const receivingMonkey = itemVal % testVal === 0 ? trueMonkey : falseMonkey
    monkeys[receivingMonkey]?.items.push(itemVal)
  }

  takeTurn (monkeys: Monkey[]): void {
    const itemCount = this.items.length
    if (itemCount === 0) return
    for (let i = 0; i < itemCount; i += 1) {
      this.inspectNextItem(monkeys)
    }
  }
}

const parseInput = (input: string, isBig = false): Array<Monkey | BigMonkey> => {
  const MonkeyClass = isBig ? BigMonkey : Monkey
  return input.split('\n\n').map((c, i) => new MonkeyClass(c.split('\n'), i))
}

export const part1 = (input: string): number => {
  const monkeys = parseInput(input) as Monkey[]

  for (let i = 0; i < 20; i += 1) {
    for (const monkey of monkeys) {
      monkey.takeTurn(monkeys)
    }
  }

  const [x, y] = monkeys.map(({ inspections }) => inspections).sort((a, b) => b - a)

  return x * y
}

class BigMonkey {
  id: number
  items: bigint[]
  operation: [sign: string, valStr: string]
  tester: [testVal: bigint, trueMonkey: number, falseMonkey: number]
  inspections = 0

  constructor (monkeyLines: string[], i: number) {
    this.id = i
    const [,itemLine, opLine, ...testLines] = monkeyLines

    const [,itemsString] = itemLine.split(': ')
    this.items = itemsString.split(', ').map(BigInt)

    const [,opString] = opLine.split(': ')
    const [sign, valStr] = opString.split(' ').slice(-2)
    this.operation = [sign, valStr]

    const [testVal, trueMonkey, falseMonkey] = testLines.map(line => {
      const [last] = line.split(' ').slice(-1)
      return Number(last)
    }) as Monkey['tester']

    this.tester = [BigInt(testVal), trueMonkey, falseMonkey]
  }

  inspectNextItem (monkeys: BigMonkey[]): void {
    this.inspections += 1
    // eslint-disable-next-line prefer-const, @typescript-eslint/no-non-null-assertion
    let itemVal = this.items.shift()!
    const [sign, opValStr] = this.operation
    const opVal = opValStr === 'old' ? itemVal : BigInt(opValStr)
    if (sign === '+') {
      itemVal += opVal
    } else if (sign === '*') {
      itemVal *= opVal
    }
    // eslint-disable-next-line no-eval
    const [testVal, trueMonkey, falseMonkey] = this.tester
    const receivingMonkey = itemVal % testVal === 0n ? trueMonkey : falseMonkey
    monkeys[receivingMonkey]?.items.push(itemVal)
  }

  takeTurn (monkeys: BigMonkey[]): void {
    const itemCount = this.items.length
    if (itemCount === 0) return
    for (let i = 0; i < itemCount; i += 1) {
      this.inspectNextItem(monkeys)
    }
  }
}

export const part2 = (input: string): number => {
  const monkeys = parseInput(input, true) as BigMonkey[]

  for (let i = 0; i < 10000; i += 1) {
    console.log(`~ Round ${i + 1} ~`)
    for (const monkey of monkeys) {
      monkey.takeTurn(monkeys)
    }
  }

  const [x, y] = monkeys.map(({ inspections }) => inspections).sort((a, b) => b - a)

  return x * y
}
