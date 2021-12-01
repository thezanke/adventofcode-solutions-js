import { part1, part2 } from "./day1";
import input from "./input/day1.json";

describe("2021 - Day 1", () => {
  describe("Part 1", () => {
    it("returns the expected result", () => {
      expect(part1(input)).toEqual(1298);
    });
  });

  describe("Part 2", () => {
    it("returns the expected result", () => {
      expect(part2(input)).toEqual(1248);
    });
  });
});
