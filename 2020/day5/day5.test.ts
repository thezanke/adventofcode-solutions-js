import { assertEquals } from "https://deno.land/std@0.79.0/testing/asserts.ts";
import { readInputFile } from "../common/readInputFile.ts";
import { findSeat, getSeatId } from "./day5.ts";

const input = readInputFile("day5/input.txt");

Deno.test("Day 5 - Part 1 - Example 1", () => {
  assertEquals(getSeatId("FBFBBFFRLR"), 357);
});

Deno.test("Day 5 - Part 1 - Answer", () => {
  const ids = input.map((r) => getSeatId(r));
  assertEquals(Math.max(...ids), 896);
});

Deno.test("Day 5 - Part 2 - Answer", () => {
  const ids = input.map((r) => getSeatId(r));
  assertEquals(findSeat(ids), 1);
});
