import { assertEquals } from "https://deno.land/std@0.79.0/testing/asserts.ts";
import { readInputFile } from "../common/readInputFile.ts";
import { findPart1, findPart2 } from "./day13.ts";

const example = readInputFile("day13/exampleInput.txt");
const input = readInputFile("day13/input.txt");

Deno.test("Day 13 - Part 1 - Example", () => {
  assertEquals(findPart1(example), 295);
});

Deno.test("Day 13 - Part 1 - Answer", () => {
  assertEquals(findPart1(input), 3789);
});

Deno.test("Day 13 - Part 2 - Example", () => {
  assertEquals(
    findPart2(
      ["", "x,2,3,5,7"],
    ),
    1103,
  );
});

// Deno.test("Day 13 - Part 2 - Example", () => {
//   assertEquals(findPart2(example), 1068781);
// });

// Deno.test("Day 13 - Part 2 - Answer", () => {
//   assertEquals(findPart2(input), 1068781);
// });
