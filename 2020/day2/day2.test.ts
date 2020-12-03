import { assertEquals } from "https://deno.land/std@0.79.0/testing/asserts.ts";
import { readInputFile } from "../common/readInputFile.ts";
import { isValidPassword, policy2 } from "./day2.ts";

const input = readInputFile("day2/input.txt");
const exampleInputs = [
  "1-3 a: abcde",
  "1-3 b: cdefg",
  "2-9 c: ccccccccc",
];

Deno.test("Day 2 - Part 1 - Example 1", () => {
  assertEquals(isValidPassword(exampleInputs[0]), true);
});

Deno.test("Day 2 - Part 1 - Example 2", () => {
  assertEquals(isValidPassword(exampleInputs[1]), false);
});

Deno.test("Day 2 - Part 1 - Example 3", () => {
  assertEquals(isValidPassword(exampleInputs[2]), true);
});

Deno.test("Day 2 - Part 1 - Answer", () => {
  const valids = input.map((i) => isValidPassword(i)).filter(Boolean);
  assertEquals(valids.length, 465);
});

Deno.test("Day 2 - Part 2 - Example 1", () => {
  assertEquals(isValidPassword(exampleInputs[0], policy2), true);
});

Deno.test("Day 2 - Part 2 - Example 2", () => {
  assertEquals(isValidPassword(exampleInputs[1], policy2), false);
});

Deno.test("Day 2 - Part 2 - Example 3", () => {
  assertEquals(isValidPassword(exampleInputs[2], policy2), false);
});

Deno.test("Day 2 - Part 2 - Answer", () => {
  const valids = input.map((i) => isValidPassword(i, policy2)).filter(Boolean);
  assertEquals(valids.length, 294);
});
