import { assertEquals } from 'https://deno.land/std@0.79.0/testing/asserts.ts';
import { readInputFile } from '../common/readInputFile.ts';
import { Vect } from '../common/Vect.ts';
import { countTrees } from './day3.ts';

const input = readInputFile('day3/input.txt');
const exampleInput = [
  '..##.......',
  '#...#...#..',
  '.#....#..#.',
  '..#.#...#.#',
  '.#...##..#.',
  '..#.##.....',
  '.#.#.#....#',
  '.#........#',
  '#.##...#...',
  '#...##....#',
  '.#..#...#.#'
];

Deno.test('Day 3 - Part 1 - Example 1', () => {
  assertEquals(countTrees(exampleInput, new Vect(3, 1)), 7);
});

Deno.test('Day 3 - Part 1 - Answer', () => {
  assertEquals(countTrees(input, new Vect(3, 1)), 250);
});

Deno.test('Day 3 - Part 2 - Answer', () => {
  let total = countTrees(input, new Vect(1, 1));
  total *= countTrees(input, new Vect(3, 1));
  total *= countTrees(input, new Vect(5, 1));
  total *= countTrees(input, new Vect(7, 1));
  total *= countTrees(input, new Vect(1, 2));

  assertEquals(total, 1592662500);
});
