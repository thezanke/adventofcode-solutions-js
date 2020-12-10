import { assertEquals } from "https://deno.land/std@0.79.0/testing/asserts.ts";
import { readInputFile } from "../common/readInputFile.ts";
import { countDifferences, countTotalArrangements } from "./day10.ts";

const smallExample = readInputFile("day10/smallExample.txt").map(Number);
const exampleInput = readInputFile("day10/exampleInput.txt").map(Number);
const input = readInputFile("day10/input.txt").map(Number);

Deno.test("Day 10 - Part 1 - Example 1", () => {
  assertEquals(countDifferences(exampleInput), [22, 10]);
});

Deno.test("Day 10 - Part 1 - Answer", () => {
  const [a, b] = countDifferences(input);
  assertEquals(a * b, 2030);
});

Deno.test("Day 10 - Part 2 - Example 1", () => {
  // 2147483648 is too low
  assertEquals(countTotalArrangements(smallExample), 8);
});

Deno.test("Day 10 - Part 2 - Example 2", () => {
  // 2147483648 is too low
  assertEquals(countTotalArrangements(exampleInput), 19208);
});

Deno.test("Day 10 - Part 2 - Answer", () => {
  // 2147483648 is too low
  assertEquals(countTotalArrangements(input), 42313823813632);
});
