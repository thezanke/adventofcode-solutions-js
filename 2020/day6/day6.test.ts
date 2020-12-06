import { assertEquals } from "https://deno.land/std@0.79.0/testing/asserts.ts";
import { readInputFile } from "../common/readInputFile.ts";
import {
  countGroupedAnswers,
  countGroupedAnswersWIntersection,
  countUniqueAnswers,
} from "./day6.ts";

const exampleInput = readInputFile("day6/exampleInput.txt", /\n\n/).map((g) =>
  g.split("\n")
);

const input = readInputFile("day6/input.txt", /\n\n/).map((g) => g.split("\n"));

Deno.test("Day 6 - Part 1 - Example 1", () => {
  assertEquals(countUniqueAnswers(exampleInput), 11);
});

Deno.test("Day 6 - Part 1 - Answer", () => {
  assertEquals(countUniqueAnswers(input), 6437);
});

Deno.test("Day 6 - Part 2 - Example 1", () => {
  assertEquals(countGroupedAnswers(exampleInput), 6);
});

Deno.test("Day 6 - Part 2 - Answer", () => {
  assertEquals(countGroupedAnswersWIntersection(input), 3229);
});
