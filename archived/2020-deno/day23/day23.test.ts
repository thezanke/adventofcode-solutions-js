import { assertEquals } from 'https://deno.land/std@0.79.0/testing/asserts.ts';
import { parseInput, performIterations } from './day23.ts';

const exampleInput = parseInput('389125467');
const input = parseInput('872495136');

Deno.test('Day 23 - Part 1 - Example 1', () => {
  const answer = performIterations(exampleInput, 10);
  assertEquals(answer, '92658374');
});

Deno.test('Day 23 - Part 1 - Example 2', () => {
  const answer = performIterations(exampleInput, 100);
  assertEquals(answer, '67384529');
});

Deno.test('Day 23 - Part 1 - Answer', () => {
  const answer = performIterations(input, 100);
  assertEquals(answer, '27865934');
});
