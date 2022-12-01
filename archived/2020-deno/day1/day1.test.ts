import { assertEquals } from 'https://deno.land/std@0.79.0/testing/asserts.ts';
import { readInputFile } from '../common/readInputFile.ts';
import { findThreeEntries, findTwoEntries } from './day1.ts';

const exampleInput = [1721, 979, 366, 299, 675, 1456];
const input = readInputFile('day1/input.txt').map(Number);

Deno.test('Day 1 - Part 1 - Example 1', () => {
  const [x, y] = findTwoEntries(exampleInput);
  assertEquals(x * y, 514579);
});

Deno.test('Day 1 - Part 1 - Answer', () => {
  const [x, y] = findTwoEntries(input);
  assertEquals(x * y, 485739);
});

Deno.test('Day 1 - Part 2 - Example 1', () => {
  const [x, y, z] = findThreeEntries(exampleInput);
  assertEquals(x * y * z, 241861950);
});

Deno.test('Day 1 - Part 2 - Answer', () => {
  const [x, y, z] = findThreeEntries(input);
  assertEquals(x * y * z, 161109702);
});
