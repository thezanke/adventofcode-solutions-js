import { readInput } from "../helpers/readInput";
import { part1, part2 } from "./day3";

const parseOpts = { transform: (o) => o.map(([l]) => l) };
const exampleInput = readInput("./2021/day3/example-input.csv", parseOpts);
const input = readInput("./2021/day3/input.csv", parseOpts);

describe("2021 - Day 3", () => {
  describe("Part 1", () => {
    it("returns the expected result for example", () => {
      expect(part1(exampleInput)).toEqual(198);
    });

    it("returns the expected result", () => {
      expect(part1(input)).toEqual(845186);
    });
  });

  describe("Part 2", () => {
    it("returns the expected result for example", () => {
      expect(part2(exampleInput)).toEqual(230);
    });

    it("returns the expected result", () => {
      expect(part2(input)).toEqual(230);
    });
  });
});
