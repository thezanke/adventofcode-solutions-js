import { assertEquals } from 'https://deno.land/std@0.79.0/testing/asserts.ts';
import { readInputFile } from '../common/readInputFile.ts';
import { parseInput, findNearbyErrorRate } from './day16.ts';

const exampleInput = readInputFile('day16/exampleInput.txt', parseInput);

// Deno.test("Day 16 - Part 1 - Example 1", () => {
//   console.log(exampleInput);
//   assertEquals(findNearbyErrorRate(exampleInput), 0);
// });
