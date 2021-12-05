import { readInput } from "../../helpers/readInput.js";
import { part1, part2 } from "./day2.js";
import { transformInput } from "./transformInput.js";

const parseOpts = { delimiter: " ", transform: transformInput };

describe("2021 - Day 1", () => {
  describe("Part 1", () => {
    it("returns the expected result for the example", () => {
      const exampleInput = readInput("./2021/day2/example-input", parseOpts);
      const pos = part1(exampleInput);
      expect(pos.x * pos.y).toEqual(150);
    });

    it("returns the expected result for input", () => {
      const input = readInput("./2021/day2/input", parseOpts);
      const pos = part1(input);
      expect(pos.x * pos.y).toEqual(1383564);
    });
  });

  describe("Part 2", () => {
    it("returns the expected result", () => {
      const input = readInput("./2021/day2/input", parseOpts);
      const pos = part2(input);
      expect(pos.x * pos.y).toEqual(1488311643);
    });
  });
});
