import { assertEquals } from "https://deno.land/std@0.79.0/testing/asserts.ts";
import { readInputFile } from "../common/readInputFile.ts";
import { findCRT, findPart1, findPart2 } from "./day13.ts";

const example = readInputFile("day13/exampleInput.txt");
const input = readInputFile("day13/input.txt");

Deno.test("Day 13 - Part 1 - Example", () => {
  assertEquals(findPart1(example), 295);
});

Deno.test("Day 13 - Part 1 - Answer", () => {
  assertEquals(findPart1(input), 3789);
});

Deno.test("Day 13 - Part 2 - findCRT", () => {
  assertEquals(
    findCRT(
      [
        [2, 1],
        [3, 2],
        [5, 3],
        [7, 4],
      ],
    ),
    53,
  );
});

Deno.test("Day 13 - Part 2 - findCRT #2", () => {
  assertEquals(
    findCRT(
      [
        [5, 3],
        [6, 2],
        [7, 4],
      ],
    ),
    158,
  );
});

Deno.test("Day 13 - Part 2 - findCRT #3", () => {
  assertEquals(
    findCRT(
      [
        [3, 2],
        [4, 5],
        [7, -3],
      ],
    ),
    53,
  );
});

Deno.test("Day 13 - Part 2 - Example", () => {
  assertEquals(findPart2(example), 1068781);
});

Deno.test("Day 13 - Part 2 - Answer", () => {
  // 667437230788119 is too high
  // 667437230788022 wrong
  // 667437230787926 is too low???
  // 52109901002363 way too low
  assertEquals(findPart2(input), 1068781);
});
