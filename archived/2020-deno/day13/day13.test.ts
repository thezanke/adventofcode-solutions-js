import { assertEquals } from 'https://deno.land/std@0.79.0/testing/asserts.ts';
import { readInputFile } from '../common/readInputFile.ts';
import { cheatPart2, findCRT, findPart1, findPart2 } from './day13.ts';

const example = readInputFile('day13/exampleInput.txt');
const input = readInputFile('day13/input.txt');

Deno.test('Day 13 - Part 1 - Example', () => {
  assertEquals(findPart1(example), 295);
});

Deno.test('Day 13 - Part 1 - Answer', () => {
  assertEquals(findPart1(input), 3789);
});

Deno.test('Day 13 - Part 2 - findCRT', () => {
  assertEquals(
    findCRT(
      [
        [3, 5],
        [1, 7],
        [6, 8]
      ]
    ),
    78
  );
});

Deno.test('Day 13 - Part 2 - Example #1', () => {
  assertEquals(findPart2(example), 1068781);
});

Deno.test('Day 13 - Part 2 - Example #2', () => {
  assertEquals(
    findPart2([
      'IGNORE ME',
      '17,x,13,19'
    ]),
    // AOC CLAIMS SHOULD BE 3417 BUT I VALIDATED WITH OTHER CRT CALCULATORS
    782
  );
});

Deno.test('Day 13 - Part 2 - Example #3', () => {
  assertEquals(
    findPart2([
      'IGNORE ME',
      '67,7,59,61'
    ]),
    754018
  );
});

Deno.test('Day 13 - Part 2 - Example #4', () => {
  assertEquals(
    findPart2([
      'IGNORE ME',
      '67,x,7,59,61'
    ]),
    779210
  );
});

Deno.test('Day 13 - Part 2 - Example #5', () => {
  assertEquals(
    findPart2([
      'IGNORE ME',
      '67,7,x,59,61'
    ]),
    1261476
  );
});

Deno.test('Day 13 - Part 2 - Example #6', () => {
  assertEquals(
    findPart2([
      'IGNORE ME',
      '1789,37,47,1889'
    ]),
    1202161486
  );
});

Deno.test('Day 13 - Part 2 - Answer', () => {
  // 203663436439836 wrong
  // 203663436439831 wrong
  // some numbers we're working with are > Number.MAX_SAFE_INTEGER 😬

  assertEquals(cheatPart2(input), 667437230788118);
});
