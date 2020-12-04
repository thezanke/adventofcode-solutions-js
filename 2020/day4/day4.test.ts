import { assertEquals } from "https://deno.land/std@0.79.0/testing/asserts.ts";
import { readInputFile } from "../common/readInputFile.ts";
import { echo } from "./day4.ts";

const exampleInput = "Hello world";
const [input] = readInputFile("day4/input.txt");

Deno.test("Day 3 - Part 1 - Example 1", () => {
  assertEquals(echo(exampleInput), "Hello world");
});

Deno.test("Day 3 - Part 2 - Answer", () => {
  assertEquals(echo(input), "Hello world");
});
