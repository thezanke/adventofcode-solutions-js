import { assertEquals } from "https://deno.land/std@0.79.0/testing/asserts.ts";
import { readInputFile } from "../common/readInputFile.ts";
import { countTrees } from "./day5.ts";

const input = readInputFile("day5/input.txt");
const exampleInput = [true];

Deno.test("Day 5 - Part 1 - Example 1", () => {
  assertEquals(countTrees(), true);
});

Deno.test("Day 5 - Part 1 - Answer", () => {
  assertEquals(countTrees(), true);
});

Deno.test("Day 5 - Part 2 - Answer", () => {
  assertEquals(countTrees(), true);
});
