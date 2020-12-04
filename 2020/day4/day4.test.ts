import { assertEquals } from "https://deno.land/std@0.79.0/testing/asserts.ts";
import { readInputFile } from "../common/readInputFile.ts";
import {
  hasAllRequiredFields,
  isPassportValid,
  parsePassport,
} from "./day4.ts";

const exampleInput = readInputFile("day4/exampleInput.txt", /\n\n/);

const input = readInputFile("day4/input.txt", /\n\n/);

Deno.test("Day 4 - Part 1 - Example 1", () => {
  const passport = parsePassport(exampleInput[0]);
  assertEquals(hasAllRequiredFields(passport), true);
});

Deno.test("Day 4 - Part 1 - Example 2", () => {
  const passport = parsePassport(exampleInput[2]);
  assertEquals(hasAllRequiredFields(passport), true);
});

Deno.test("Day 4 - Part 1 - Example 3", () => {
  const passport = parsePassport(exampleInput[3]);
  assertEquals(hasAllRequiredFields(passport), false);
});

Deno.test("Day 4 - Part 1 - Answer", () => {
  const checks = input.map((raw) => {
    const passport = parsePassport(raw);
    return hasAllRequiredFields(passport);
  });

  assertEquals(checks.filter(Boolean).length, 216);
});

Deno.test("Day 4 - Part 2 - Example 1", () => {
  const passport = parsePassport(exampleInput[4]);
  assertEquals(isPassportValid(passport), false);
});

Deno.test("Day 4 - Part 2 - Example 2", () => {
  const passport = parsePassport(exampleInput[5]);
  assertEquals(isPassportValid(passport), false);
});

Deno.test("Day 4 - Part 2 - Example 3", () => {
  const passport = parsePassport(exampleInput[6]);
  assertEquals(isPassportValid(passport), true);
});

Deno.test("Day 4 - Part 2 - Example 4", () => {
  const passport = parsePassport(exampleInput[7]);
  assertEquals(isPassportValid(passport), true);
});

Deno.test("Day 4 - Part 2 - Answer", () => {
  const checks = input.map((raw) => {
    const passport = parsePassport(raw);
    return isPassportValid(passport);
  });

  assertEquals(checks.filter(Boolean).length, 150);
});
