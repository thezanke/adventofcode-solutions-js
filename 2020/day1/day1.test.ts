import {
  assertEquals,
} from "https://deno.land/std@0.79.0/testing/asserts.ts";

import { readInputFile } from "../readInputFile.ts";

import { split } from "./day1.ts";

let [input] = readInputFile("day1/input.txt");

Deno.test("Day 1 - Part 1 - Example 1", () => {
  assertEquals(split("test"), ["t", "e", "s", "t"]);
});

Deno.test("Day 1 - Part 1 - Answer", () => {
  assertEquals(
    split(input),
    ["H", "e", "l", "l", "o", " ", "W", "o", "r", "l", "d", " ", "🎉"],
  );
});
