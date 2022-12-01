import { assertEquals } from 'https://deno.land/std@0.79.0/testing/asserts.ts';
import { readInputFile } from '../common/readInputFile.ts';
import { countDifferences, countTotalArrangements2 } from './day10.ts';

const smallExample = readInputFile('day10/smallExample.txt').map(Number);
const exampleInput = readInputFile('day10/exampleInput.txt').map(Number);
const input = readInputFile('day10/input.txt').map(Number);

Deno.test('Day 10 - Part 1 - Example 1', () => {
  assertEquals(countDifferences(exampleInput), [22, 10]);
});

Deno.test('Day 10 - Part 1 - Answer', () => {
  const [a, b] = countDifferences(input);
  assertEquals(a * b, 2030);
});

Deno.test('Day 10 - Part 2 - Example 1', () => {
  assertEquals(countTotalArrangements2(smallExample), 8);
});

Deno.test('Day 10 - Part 2 - Example 2', () => {
  assertEquals(countTotalArrangements2(exampleInput), 19208);
});

Deno.test('Day 10 - Part 2 - Answer', () => {
  assertEquals(countTotalArrangements2(input), 42313823813632);
});
