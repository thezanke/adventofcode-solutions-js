import { assertEquals } from "https://deno.land/std@0.79.0/testing/asserts.ts";
import { findValueInSequence } from "./day15.ts";

Deno.test("Day 15 - Part 1 - Example 1", () => {
  assertEquals(findValueInSequence([0, 3, 6], 10), 0);
});

Deno.test("Day 15 - Part 1 - Example 2", () => {
  assertEquals(findValueInSequence([0, 3, 6], 2020), 436);
});

Deno.test("Day 15 - Part 1 - Answer", () => {
  assertEquals(findValueInSequence([16, 11, 15, 0, 1, 7], 2020), 662);
});

// UNCOMMENT TO BRUTE FORCE
// Deno.test("Day 15 - Part 2 - Answer", () => {
//   assertEquals(findValueInSequence([16, 11, 15, 0, 1, 7], 30000000), 175594);
// });
