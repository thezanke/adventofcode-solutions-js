import { part1, part2 } from "./day4";
import * as fs from "fs";

const readOpts = { encoding: "utf-8" };

describe("2021 - Day 3", () => {
  describe("Part 1", () => {
    it("returns the expected result for example", () => {
      const exampleInput = fs.readFileSync("./2021/day4/example-input", readOpts);
      expect(part1(exampleInput)).toEqual(4512);
    });

    it("returns the expected result", () => {
      const input = fs.readFileSync("./2021/day4/input", readOpts);
      expect(part1(input)).toEqual(82440);
    });
  });

  describe("Part 2", () => {
    it("returns the expected result for example", () => {
      const exampleInput = fs.readFileSync("./2021/day4/example-input", readOpts);
      expect(part2(exampleInput)).toEqual(1924);
    });

    it("returns the expected result", () => {
      const input = fs.readFileSync("./2021/day4/input", readOpts);
      expect(part2(input)).toEqual(20774);
    });
  });
});
