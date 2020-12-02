import {
  assertEquals,
} from "https://deno.land/std@0.79.0/testing/asserts.ts";

import { readInputFile } from "../readInputFile.ts";

import { isValidPassword } from "./day2.ts";

let input = readInputFile("day2/input.txt");
let exampleInputs = [
  "1-3 a: abcde",
  "1-3 b: cdefg",
  "2-9 c: ccccccccc",
];

Deno.test("Day 2 - Part 1 - Example 1", () => {
  assertEquals(isValidPassword(exampleInputs[0]), true);
  assertEquals(isValidPassword(exampleInputs[1]), false);
  assertEquals(isValidPassword(exampleInputs[2]), true);
});

Deno.test("Day 2 - Part 1 - Answer", () => {
  const valids = input.map(isValidPassword).filter(Boolean).length;
  assertEquals(valids, 485739);
});

// Deno.test("Day 1 - Part 2 - Example 1", () => {
//   const [x, y, z] = findThreeEntries(exampleInput);
//   assertEquals(x * y * z, 241861950);
// });

// Deno.test("Day 1 - Part 2 - Answer", () => {
//   const [x, y, z] = findThreeEntries(input);
//   assertEquals(x * y * z, 161109702);
// });
