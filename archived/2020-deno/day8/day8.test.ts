import { assertEquals } from 'https://deno.land/std@0.79.0/testing/asserts.ts';
import { readInputFile } from '../common/readInputFile.ts';
import { GameConsole, parseBootCode, findWorkingConsole } from './day8.ts';

const exampleInput = readInputFile('day8/exampleInput.txt');

const input = readInputFile('day8/input.txt');

Deno.test('Day 8 - Part 1 - Example 1', () => {
  const gc = new GameConsole(parseBootCode(exampleInput));
  gc.boot();
  assertEquals(gc.error, true);
  assertEquals(gc.accumulator, 5);
});

Deno.test('Day 8 - Part 1 - Answer', () => {
  const gc = new GameConsole(parseBootCode(input));
  gc.boot();
  assertEquals(gc.error, true);
  assertEquals(gc.accumulator, 1832);
});

Deno.test('Day 8 - Part 2 - Example 1', () => {
  const gc = findWorkingConsole(parseBootCode(exampleInput));
  assertEquals(gc?.error, false);
  assertEquals(gc?.accumulator, 8);
});

Deno.test('Day 8 - Part 2 - Answer', () => {
  const gc = findWorkingConsole(parseBootCode(input));
  assertEquals(gc?.error, false);
  assertEquals(gc?.accumulator, 662);
});
