import {
  assertEquals,
} from "https://deno.land/std@0.79.0/testing/asserts.ts";

import { readInputFile } from "../readInputFile.ts";

import { isValidPassword1, isValidPassword2 } from "./day2.ts";

let input = readInputFile("day2/input.txt");
let exampleInputs = [
  "1-3 a: abcde",
  "1-3 b: cdefg",
  "2-9 c: ccccccccc",
];

Deno.test("Day 2 - Part 1 - Example 1", () => {
  assertEquals(isValidPassword1(exampleInputs[0]), true);
  assertEquals(isValidPassword1(exampleInputs[1]), false);
  assertEquals(isValidPassword1(exampleInputs[2]), true);
});

Deno.test("Day 2 - Part 1 - Answer", () => {
  const valids = input.map(isValidPassword1).filter(Boolean).length;
  assertEquals(valids, 465);
});

Deno.test("Day 1 - Part 2 - Example 1", () => {
  assertEquals(isValidPassword2(exampleInputs[0]), true);
});

Deno.test("Day 1 - Part 2 - Example 2", () => {
  assertEquals(isValidPassword2(exampleInputs[1]), false);
});

Deno.test("Day 1 - Part 2 - Example 3", () => {
  assertEquals(isValidPassword2(exampleInputs[2]), false);
});

Deno.test("Day 1 - Part 2 - Answer", () => {
  const valids = input.map(isValidPassword2).filter(Boolean).length;
  assertEquals(valids, 465);
});
