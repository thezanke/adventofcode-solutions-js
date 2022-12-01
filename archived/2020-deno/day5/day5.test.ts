import { assertEquals } from 'https://deno.land/std@0.79.0/testing/asserts.ts';
import { readInputFile } from '../common/readInputFile.ts';
import { findSeat, getSeatId } from './day5.ts';

const input = readInputFile('day5/input.txt');

Deno.test('Day 5 - Part 1 - Example 1', () => {
  assertEquals(getSeatId('FBFBBFFRLR'), 357);
});

Deno.test('Day 5 - Part 1 - Example 2', () => {
  assertEquals(getSeatId('BFFFBBFRRR'), 567);
});

Deno.test('Day 5 - Part 1 - Example 3', () => {
  assertEquals(getSeatId('FFFBBBFRRR'), 119);
});

Deno.test('Day 5 - Part 1 - Example 4', () => {
  assertEquals(getSeatId('BBFFBBFRLL'), 820);
});

const ids = input.map((r: string) => getSeatId(r));

Deno.test('Day 5 - Part 1 - Answer', () => {
  assertEquals(Math.max(...ids), 896);
});

Deno.test('Day 5 - Part 2 - Answer', () => {
  assertEquals(findSeat(ids), 659);
});
