import {
  solvePart1,
  asteroidsFromInput,
  findBestStationAsteroid,
  solvePart2,
} from './day10';
import { getInput } from './utils/getInput';

describe('DAY 10', () => {
  describe('Part 1', () => {
    test('Example 1', () => {
      // prettier-ignore
      const input = [
        '.#..#',
        '.....',
        '#####',
        '....#',
        '...##',
      ];

      const asteroids = asteroidsFromInput(input);
      const bestLocation = findBestStationAsteroid(asteroids);
      expect(bestLocation.coordinates).toEqual('3,4');
    });

    test('Example 2', () => {
      const input = [
        '......#.#.',
        '#..#.#....',
        '..#######.',
        '.#.#.###..',
        '.#..#.....',
        '..#....#.#',
        '#..#....#.',
        '.##.#..###',
        '##...#..#.',
        '.#....####',
      ];

      const asteroids = asteroidsFromInput(input);
      const bestLocation = findBestStationAsteroid(asteroids);
      expect(bestLocation.coordinates).toEqual('5,8');
    });

    test('Example 3', () => {
      const input = [
        '#.#...#.#.',
        '.###....#.',
        '.#....#...',
        '##.#.#.#.#',
        '....#.#.#.',
        '.##..###.#',
        '..#...##..',
        '..##....##',
        '......#...',
        '.####.###.',
      ];

      const asteroids = asteroidsFromInput(input);
      const bestLocation = findBestStationAsteroid(asteroids);
      expect(bestLocation.coordinates).toEqual('1,2');
    });

    test('Example 4', () => {
      const input = [
        '.#..#..###',
        '####.###.#',
        '....###.#.',
        '..###.##.#',
        '##.##.#.#.',
        '....###..#',
        '..#.#..#.#',
        '#..#.#.###',
        '.##...##.#',
        '.....#.#..',
      ];

      const asteroids = asteroidsFromInput(input);
      const bestLocation = findBestStationAsteroid(asteroids);
      expect(bestLocation.coordinates).toEqual('6,3');
    });

    test.skip('Example 5', () => {
      const input = [
        '.#..##.###...#######',
        '##.############..##.',
        '.#.######.########.#',
        '.###.#######.####.#.',
        '#####.##.#.##.###.##',
        '..#####..#.#########',
        '####################',
        '#.####....###.#.#.##',
        '##.#################',
        '#####.##.###..####..',
        '..######..##.#######',
        '####.##.####...##..#',
        '.#####..#.######.###',
        '##...#.##########...',
        '#.##########.#######',
        '.####.#.###.###.#.##',
        '....##.##.###..#####',
        '.#.#.###########.###',
        '#.#.#.#####.####.###',
        '###.##.####.##.#..##',
      ];

      const asteroids = asteroidsFromInput(input);
      const bestLocation = findBestStationAsteroid(asteroids);
      expect(bestLocation.coordinates).toEqual('11,13');
    });

    test.skip('Challenge Input', async () => {
      const input = await getInput('day10.txt', '\n');
      expect(solvePart1(input)).toEqual('11,13');
    });
  });

  describe('Part 2', () => {
    test('Example', async () => {
      const input = [
        '.#..##.###...#######',
        '##.############..##.',
        '.#.######.########.#',
        '.###.#######.####.#.',
        '#####.##.#.##.###.##',
        '..#####..#.#########',
        '####################',
        '#.####....###.#.#.##',
        '##.#################',
        '#####.##.###..####..',
        '..######..##.#######',
        '####.##.####...##..#',
        '.#####..#.######.###',
        '##...#.##########...',
        '#.##########.#######',
        '.####.#.###.###.#.##',
        '....##.##.###..#####',
        '.#.#.###########.###',
        '#.#.#.#####.####.###',
        '###.##.####.##.#..##',
      ];
      expect(solvePart2(input, { x: 11, y: 13 })).toEqual(802);
    });

    test.only('Final Input', async () => {
      const input = await getInput('day10.txt', '\n');
      expect(solvePart2(input, { x: 17, y: 22 })).toEqual(616);
    });
  });
});
