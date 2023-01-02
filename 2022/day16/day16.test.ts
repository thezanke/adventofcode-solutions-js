import { describe, expect, it } from 'vitest'
import { parseInput, part1, part2, ValveData } from './day16'

describe('Day 16', () => {
  const exampleInput =
`Valve AA has flow rate=0; tunnels lead to valves DD, II, BB
Valve BB has flow rate=13; tunnels lead to valves CC, AA
Valve CC has flow rate=2; tunnels lead to valves DD, BB
Valve DD has flow rate=20; tunnels lead to valves CC, AA, EE
Valve EE has flow rate=3; tunnels lead to valves FF, DD
Valve FF has flow rate=0; tunnels lead to valves EE, GG
Valve GG has flow rate=0; tunnels lead to valves FF, HH
Valve HH has flow rate=22; tunnel leads to valve GG
Valve II has flow rate=0; tunnels lead to valves AA, JJ
Valve JJ has flow rate=21; tunnel leads to valve II`

  const parsedExampleInput = [
    ['AA', 0, 'DD', 'II', 'BB'],
    ['BB', 13, 'CC', 'AA'],
    ['CC', 2, 'DD', 'BB'],
    ['DD', 20, 'CC', 'AA', 'EE'],
    ['EE', 3, 'FF', 'DD'],
    ['FF', 0, 'EE', 'GG'],
    ['GG', 0, 'FF', 'HH'],
    ['HH', 22, 'GG'],
    ['II', 0, 'AA', 'JJ'],
    ['JJ', 21, 'II']
  ] as ValveData[]

  describe('Helpers', () => {
    describe('parseInput()', () => {
      it('Returns expected order', () => {
        expect(parseInput(exampleInput)).toEqual(parsedExampleInput)
      })
    })
  })

  describe('Examples', () => {
    describe('Part 1', () => {
      describe('Example 1', () => {
        it('Returns correct result', () => {
          expect(part1(exampleInput)).toEqual(1651)
        })
      })
    })

    describe('Part 2', () => {
      describe('Example 1', () => {
        it('Returns correct result', () => {
          expect(part2(exampleInput)).toEqual(1707)
        })
      })
    })
  })

  describe('Solutions', () => {
    const input =
`Valve EG has flow rate=21; tunnels lead to valves WZ, OF, ZP, QD
Valve OR has flow rate=0; tunnels lead to valves QD, CR
Valve VO has flow rate=0; tunnels lead to valves FL, OY
Valve BV has flow rate=0; tunnels lead to valves AA, KK
Valve OF has flow rate=0; tunnels lead to valves EJ, EG
Valve YZ has flow rate=0; tunnels lead to valves EL, AW
Valve EL has flow rate=16; tunnels lead to valves YZ, RD
Valve EJ has flow rate=0; tunnels lead to valves YI, OF
Valve FM has flow rate=0; tunnels lead to valves VX, FX
Valve FL has flow rate=22; tunnels lead to valves VO, FH
Valve QD has flow rate=0; tunnels lead to valves OR, EG
Valve XC has flow rate=0; tunnels lead to valves UA, GV
Valve WZ has flow rate=0; tunnels lead to valves FH, EG
Valve AT has flow rate=0; tunnels lead to valves FX, OZ
Valve MZ has flow rate=0; tunnels lead to valves UA, YI
Valve WI has flow rate=0; tunnels lead to valves OH, WW
Valve YD has flow rate=0; tunnels lead to valves OZ, WW
Valve QX has flow rate=0; tunnels lead to valves OY, YI
Valve AA has flow rate=0; tunnels lead to valves BV, ZE, PE, XL
Valve VX has flow rate=0; tunnels lead to valves FM, GQ
Valve VN has flow rate=0; tunnels lead to valves TU, OQ
Valve RD has flow rate=0; tunnels lead to valves OY, EL
Valve QR has flow rate=0; tunnels lead to valves QQ, OZ
Valve CD has flow rate=0; tunnels lead to valves WW, RJ
Valve VA has flow rate=20; tunnel leads to valve DE
Valve RJ has flow rate=0; tunnels lead to valves CR, CD
Valve UA has flow rate=19; tunnels lead to valves XC, MZ, KY
Valve WW has flow rate=4; tunnels lead to valves YD, PE, WI, DY, CD
Valve MC has flow rate=0; tunnels lead to valves ZP, XY
Valve XY has flow rate=24; tunnel leads to valve MC
Valve FH has flow rate=0; tunnels lead to valves FL, WZ
Valve DE has flow rate=0; tunnels lead to valves VA, FX
Valve DY has flow rate=0; tunnels lead to valves WW, YI
Valve FX has flow rate=14; tunnels lead to valves DE, FM, AT, OQ
Valve UU has flow rate=0; tunnels lead to valves AR, AW
Valve OY has flow rate=13; tunnels lead to valves RD, VO, AR, GV, QX
Valve CS has flow rate=0; tunnels lead to valves MG, OZ
Valve KY has flow rate=0; tunnels lead to valves UA, AW
Valve KK has flow rate=0; tunnels lead to valves BV, TU
Valve GQ has flow rate=18; tunnel leads to valve VX
Valve ZV has flow rate=0; tunnels lead to valves YI, LS
Valve QQ has flow rate=0; tunnels lead to valves CR, QR
Valve AW has flow rate=25; tunnels lead to valves YZ, KY, UU
Valve OH has flow rate=0; tunnels lead to valves WI, TU
Valve CR has flow rate=8; tunnels lead to valves OR, ZE, RJ, LS, QQ
Valve TU has flow rate=7; tunnels lead to valves MG, VN, OH, KK
Valve ZP has flow rate=0; tunnels lead to valves EG, MC
Valve AR has flow rate=0; tunnels lead to valves UU, OY
Valve OZ has flow rate=10; tunnels lead to valves YD, XL, CS, AT, QR
Valve GV has flow rate=0; tunnels lead to valves XC, OY
Valve PE has flow rate=0; tunnels lead to valves WW, AA
Valve ZE has flow rate=0; tunnels lead to valves AA, CR
Valve XL has flow rate=0; tunnels lead to valves OZ, AA
Valve YI has flow rate=15; tunnels lead to valves QX, MZ, EJ, DY, ZV
Valve OQ has flow rate=0; tunnels lead to valves FX, VN
Valve MG has flow rate=0; tunnels lead to valves TU, CS
Valve LS has flow rate=0; tunnels lead to valves CR, ZV`

    describe('Part 1', () => {
      it('Returns correct result', () => {
        expect(part1(input)).toEqual(2087)
      })
    })

    describe.only('Part 2', () => {
      it('Returns correct result', () => {
        expect(part2(input)).toEqual(1)
      })
    })
  })
})
