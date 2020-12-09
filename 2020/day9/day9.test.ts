import { assertEquals } from "https://deno.land/std@0.79.0/testing/asserts.ts";
import { readInputFile } from "../common/readInputFile.ts";
import { findEncryptionWeakness, findXmasError } from "./day9.ts";

const exampleInput = readInputFile("day9/exampleInput.txt").map(Number);
const input = readInputFile("day9/input.txt").map(Number);

Deno.test("Day 9 - Part 1 - Example 1", () => {
  assertEquals(findXmasError(exampleInput, 5), 127);
});

Deno.test("Day 9 - Part 1 - Answer", () => {
  assertEquals(findXmasError(input, 25), 1930745883);
});

Deno.test("Day 9 - Part 2 - Example 1", () => {
  assertEquals(findEncryptionWeakness(exampleInput, 127), 62);
});

Deno.test("Day 9 - Part 2 - Answer", () => {
  // wrong answer, too low
  assertEquals(findEncryptionWeakness(input, 1930745883), 200682420);
});
