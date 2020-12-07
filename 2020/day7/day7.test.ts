import { assertEquals } from "https://deno.land/std@0.79.0/testing/asserts.ts";
import { readInputFile } from "../common/readInputFile.ts";
import { buildRuleDetails, countContainers, countInnerBags } from "./day7.ts";

const example = readInputFile("day7/exampleInput.txt");
const input = readInputFile("day7/input.txt");

Deno.test("Day 7 - buildRuleTree", () => {
});

const exampleRuleDetails = buildRuleDetails(example);

Deno.test("Day 7 - Part 1 - Example 1", () => {
  assertEquals(countContainers(exampleRuleDetails, "shiny gold"), 4);
});

const inputRuleDetails = buildRuleDetails(input);

Deno.test("Day 7 - Part 1 - Answer", () => {
  assertEquals(countContainers(inputRuleDetails, "shiny gold"), 268);
});

Deno.test("Day 7 - Part 2 - Example 1", () => {
  assertEquals(countInnerBags(exampleRuleDetails, "shiny gold"), 32);
});

Deno.test("Day 7 - Part 2 - Answer", () => {
  assertEquals(countInnerBags(inputRuleDetails, "shiny gold"), 32);
});
