import { assertEquals } from "https://deno.land/std@0.79.0/testing/asserts.ts";
import { readInputFile } from "../common/readInputFile.ts";
import { followInstructions, Ship2 } from "./day12.ts";

const example = readInputFile("day12/exampleInput.txt");
const input = readInputFile("day12/input.txt");

Deno.test("Day 12 - Part 1 - Example", () => {
  const pos = followInstructions(example);
  const answer = Math.abs(pos.x) + Math.abs(pos.y);
  assertEquals(answer, 25);
});

Deno.test("Day 12 - Part 1 - Answer", () => {
  const pos = followInstructions(input);
  const answer = Math.abs(pos.x) + Math.abs(pos.y);
  assertEquals(answer, 2270);
});

Deno.test("Day 12 - Part 2 - Example", () => {
  const pos = followInstructions(example, new Ship2());
  const answer = Math.abs(pos.x) + Math.abs(pos.y);
  assertEquals(answer, 286);
});

Deno.test("Day 12 - Part 2 - Answer", () => {
  const pos = followInstructions(input, new Ship2());
  const answer = Math.ceil(Math.abs(pos.x) + Math.abs(pos.y));
  assertEquals(answer, 138669);
});

// Deno.test("Day 12 - Part 1 - Answer", () => {
//   const pos = followInstructions(input);
//   const answer = Math.abs(pos.x) + Math.abs(pos.y);
//   assertEquals(answer, 2270);
// });
