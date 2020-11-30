import {
  assertEquals,
} from "https://deno.land/std@0.79.0/testing/asserts.ts";

import { readInputFile } from "../readInputFile.ts";

import {
  calculateFuelRequiredForMass,
  calculateFuelRequiredForMassAndFuel,
  calculateTotalFuelRequired,
} from "./day-1.ts";

let input = readInputFile("2019-day-1/input.txt").map(Number);

Deno.test("Part 1 - Example 1", () => {
  assertEquals(calculateFuelRequiredForMass(12), 2);
});

Deno.test("Part 1 - Example 2", () => {
  assertEquals(calculateFuelRequiredForMass(14), 2);
});

Deno.test("Part 1 - Example 3", () => {
  assertEquals(calculateFuelRequiredForMass(1969), 654);
});

Deno.test("Part 1 - Example 4", () => {
  assertEquals(calculateFuelRequiredForMass(100756), 33583);
});

Deno.test("Part 1 - Answer", () => {
  assertEquals(calculateTotalFuelRequired(input), 3210097);
});

Deno.test("Part 2 - Example 1", () => {
  const result = calculateFuelRequiredForMassAndFuel(12);
  assertEquals(result, 2);
});

Deno.test("Part 2 - Example 2", () => {
  const result = calculateFuelRequiredForMassAndFuel(1969);
  assertEquals(result, 966);
});

Deno.test("Part 2 - Example 3", () => {
  const result = calculateFuelRequiredForMassAndFuel(100756);
  assertEquals(result, 50346);
});

Deno.test("Part 2 - Answer", () => {
  const result = calculateTotalFuelRequired(
    input,
    calculateFuelRequiredForMassAndFuel,
  );
  assertEquals(result, 4812287);
});
