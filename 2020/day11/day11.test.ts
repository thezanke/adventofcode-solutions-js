import { assertEquals } from "https://deno.land/std@0.79.0/testing/asserts.ts";
import { readInputFile } from "../common/readInputFile.ts";
import {
  countType,
  findStableSeating1,
  findStableSeating2,
  Seat,
} from "./day11.ts";

const example = readInputFile("day11/exampleInput.txt").map((l) => l.split(""));
const input = readInputFile("day11/input.txt").map((l) => l.split(""));

Deno.test("Day 11 - Part 1 - Example", () => {
  const stableSeating = findStableSeating1(example);
  assertEquals(countType(stableSeating, Seat.occupied), 37);
});

Deno.test("Day 11 - Part 1 - Answer", () => {
  const stableSeating = findStableSeating1(input);
  assertEquals(countType(stableSeating, Seat.occupied), 2361);
});

Deno.test("Day 11 - Part 2 - Example", () => {
  const stableSeating = findStableSeating2(example);
  assertEquals(countType(stableSeating, Seat.occupied), 26);
});

Deno.test("Day 11 - Part 2 - Example", () => {
  const stableSeating = findStableSeating2(input);
  assertEquals(countType(stableSeating, Seat.occupied), 26);
});
