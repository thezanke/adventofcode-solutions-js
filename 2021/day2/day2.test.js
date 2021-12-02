import { readInput } from "../helpers/readInput";
import { part1, part2 } from "./day2";
import { transformInput } from "./transformInput";

const parseOpts = { delimiter: " ", transform: transformInput };
const exampleInput = readInput("./2021/day2/example-input.csv", parseOpts);
const input = readInput("./2021/day2/input.csv", parseOpts);

describe("2021 - Day 1", () => {
  describe("Part 1", () => {
    it("returns the expected result for the example", () => {
      const pos = part1(exampleInput);
      expect(pos.x * pos.y).toEqual(150);
    });

    it("returns the expected result for input", () => {
      const pos = part1(input);
      expect(pos.x * pos.y).toEqual(1383564);
    });
  });

  describe("Part 2", () => {
    it("returns the expected result", () => {
      const pos = part2(input);
      expect(pos.x * pos.y).toEqual(1488311643);
    });
  });
});
