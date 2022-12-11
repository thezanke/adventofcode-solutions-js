import { part1, part2 } from './day11'

describe('Day 10', () => {
  describe('Examples', () => {
    const example1 =
`Monkey 0:
Starting items: 79, 98
Operation: new = old * 19
Test: divisible by 23
  If true: throw to monkey 2
  If false: throw to monkey 3

Monkey 1:
Starting items: 54, 65, 75, 74
Operation: new = old + 6
Test: divisible by 19
  If true: throw to monkey 2
  If false: throw to monkey 0

Monkey 2:
Starting items: 79, 60, 97
Operation: new = old * old
Test: divisible by 13
  If true: throw to monkey 1
  If false: throw to monkey 3

Monkey 3:
Starting items: 74
Operation: new = old + 3
Test: divisible by 17
  If true: throw to monkey 0
  If false: throw to monkey 1`

    describe('Part 1', () => {
      test('Example 1', () => {
        expect(part1(example1)).toEqual(10605)
      })
    })

    describe('Part 2', () => {
      test.skip('Example 1', () => {
        expect(part2(example1)).toEqual(1)
      })
    })
  })

  describe('Solutions', () => {
    const input =
`
`

    test.skip('Part 1', () => {
      expect(part1(input)).toEqual(1)
    })

    test.skip('Part 2', () => {
      expect(part2(input)).toEqual(1)
    })
  })
})
