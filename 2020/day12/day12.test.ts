import { assertEquals } from "https://deno.land/std@0.79.0/testing/asserts.ts";
import { readInputFile } from "../common/readInputFile.ts";
import { followInstructions, Ship2 } from "./day12.ts";

const example = readInputFile("day12/exampleInput.txt");
const input = readInputFile("day12/input.txt");

Deno.test("Day 12 - Part 1 - Example", () => {
  assertEquals(followInstructions(example), 25);
});

Deno.test("Day 12 - Part 1 - Answer", () => {
  assertEquals(followInstructions(input), 2270);
});

Deno.test("Day 12 - Part 2 - Example", () => {
  assertEquals(followInstructions(example, new Ship2()), 286);
});

Deno.test("Day 12 - Part 2 - Answer", () => {
  assertEquals(followInstructions(input, new Ship2()), 138669);
});
