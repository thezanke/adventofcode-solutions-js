import { assertEquals } from "https://deno.land/std@0.79.0/testing/asserts.ts";
import { readInputFile } from "../common/readInputFile.ts";
import { followInstructions1 } from "./day12.ts";

const example = readInputFile("day12/exampleInput.txt");
const input = readInputFile("day12/input.txt");

Deno.test("Day 11 - Part 1 - Example", () => {
  const pos = followInstructions1(example);
  const answer = Math.abs(pos.x) + Math.abs(pos.y);
  assertEquals(answer, 25);
});

Deno.test("Day 11 - Part 1 - Answer", () => {
  const pos = followInstructions1(input);
  const answer = Math.abs(pos.x) + Math.abs(pos.y);
  assertEquals(answer, 2270);
});

Deno.test("Day 11 - Part 1 - Example", () => {
  const pos = followInstructions1(example);
  const answer = Math.abs(pos.x) + Math.abs(pos.y);
  assertEquals(answer, 25);
});

// Deno.test("Day 11 - Part 1 - Answer", () => {
//   const pos = followInstructions(input);
//   const answer = Math.abs(pos.x) + Math.abs(pos.y);
//   assertEquals(answer, 2270);
// });
