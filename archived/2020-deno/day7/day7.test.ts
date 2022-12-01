import { assertEquals } from 'https://deno.land/std@0.79.0/testing/asserts.ts';
import { readInputFile } from '../common/readInputFile.ts';
import { buildRuleDetails, countContainers, countInnerBags } from './day7.ts';

const exampleRuleDetails = buildRuleDetails(
  readInputFile('day7/exampleInput.txt')
);

const inputRuleDetails = buildRuleDetails(
  readInputFile('day7/input.txt')
);

Deno.test('Day 7 - Part 1 - Example 1', () => {
  assertEquals(countContainers(exampleRuleDetails, 'shiny gold'), 4);
});

Deno.test('Day 7 - Part 1 - Answer', () => {
  assertEquals(countContainers(inputRuleDetails, 'shiny gold'), 268);
});

Deno.test('Day 7 - Part 2 - Example 1', () => {
  assertEquals(countInnerBags(exampleRuleDetails, 'shiny gold'), 32);
});

Deno.test('Day 7 - Part 2 - Answer', () => {
  assertEquals(countInnerBags(inputRuleDetails, 'shiny gold'), 7867);
});
