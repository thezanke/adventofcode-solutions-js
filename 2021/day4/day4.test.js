import { part1, part2 } from "./day4";
import * as fs from "fs";

const readOpts = { encoding: "utf-8" };
const exampleInput = fs.readFileSync("./2021/day4/example-input.csv", readOpts);
const input = fs.readFileSync("./2021/day4/input.csv", readOpts);

describe("2021 - Day 3", () => {
  describe("Part 1", () => {
    it("returns the expected result for example", () => {
      expect(part1(exampleInput)).toEqual(4512);
    });

    it("returns the expected result", () => {
      expect(part1(input)).toEqual(82440);
    });
  });

  describe("Part 2", () => {
    it("returns the expected result for example", () => {
      expect(part2(exampleInput)).toEqual(1924);
    });

    it("returns the expected result", () => {
      expect(part2(input)).toEqual(20774);
    });
  });
});
