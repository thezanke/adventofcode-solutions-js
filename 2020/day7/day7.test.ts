import { assertEquals } from "https://deno.land/std@0.79.0/testing/asserts.ts";
import { readInputFile } from "../common/readInputFile.ts";
import { determinePossibleContainers } from "./day7.ts";

const exampleInput = readInputFile("day7/exampleInput.txt");
const input = readInputFile("day7/input.txt");

Deno.test("Day 7 - Part 1 - Example 1", () => {
  assertEquals(determinePossibleContainers(exampleInput, "shiny gold"), 4);
});

Deno.test("Day 7 - Part 1 - Answer", () => {
  assertEquals(determinePossibleContainers(input, "shiny gold"), 268);
});
