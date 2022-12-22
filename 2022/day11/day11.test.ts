import { describe, expect, test } from 'vitest'
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
      test('Example 1', () => {
        expect(part2(example1)).toEqual(2713310158)
      })
    })
  })

  describe('Solutions', () => {
    const input =
`Monkey 0:
Starting items: 75, 63
Operation: new = old * 3
Test: divisible by 11
  If true: throw to monkey 7
  If false: throw to monkey 2

Monkey 1:
Starting items: 65, 79, 98, 77, 56, 54, 83, 94
Operation: new = old + 3
Test: divisible by 2
  If true: throw to monkey 2
  If false: throw to monkey 0

Monkey 2:
Starting items: 66
Operation: new = old + 5
Test: divisible by 5
  If true: throw to monkey 7
  If false: throw to monkey 5

Monkey 3:
Starting items: 51, 89, 90
Operation: new = old * 19
Test: divisible by 7
  If true: throw to monkey 6
  If false: throw to monkey 4

Monkey 4:
Starting items: 75, 94, 66, 90, 77, 82, 61
Operation: new = old + 1
Test: divisible by 17
  If true: throw to monkey 6
  If false: throw to monkey 1

Monkey 5:
Starting items: 53, 76, 59, 92, 95
Operation: new = old + 2
Test: divisible by 19
  If true: throw to monkey 4
  If false: throw to monkey 3

Monkey 6:
Starting items: 81, 61, 75, 89, 70, 92
Operation: new = old * old
Test: divisible by 3
  If true: throw to monkey 0
  If false: throw to monkey 1

Monkey 7:
Starting items: 81, 86, 62, 87
Operation: new = old + 8
Test: divisible by 13
  If true: throw to monkey 3
  If false: throw to monkey 5`

    test('Part 1', () => {
      expect(part1(input)).toEqual(62491)
    })

    test('Part 2', () => {
      expect(part2(input)).toEqual(17408399184)
    })
  })
})
