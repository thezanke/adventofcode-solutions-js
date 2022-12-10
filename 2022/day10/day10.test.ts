import { part1, part2 } from './day10'

describe('Day 10', () => {
  describe('Examples', () => {
    const example1 =
`
`

    describe('Part 1', () => {
      test('Example 1', () => {
        expect(part1(example1)).toEqual(13)
      })
    })

    describe('Part 2', () => {
      test('Example 1', () => {
        expect(part2(example1)).toEqual(1)
      })

      const example2 =
`
`

      test('Example 2', () => {
        expect(part2(example2)).toEqual(36)
      })

      // test('Example 3', () => {
      //   expect(part2('nppdvjthqldpwncqszvftbrmjlhg')).toEqual(23);
      // });

      // test('Example 4', () => {
      //   expect(part2('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg')).toEqual(29);
      // });

      // test('Example 5', () => {
      //   expect(part2('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw')).toEqual(26);
      // });
    })
  })

  describe('Solutions', () => {
    const input =
`
`

    test('Part 1', () => {
      expect(part1(input)).toEqual(5735)
    })

    test('Part 2', () => {
      expect(part2(input)).toEqual(2478)
    })
  })
})
