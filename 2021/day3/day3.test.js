import { readInput } from "../../helpers/readInput.js";
import { part1, part2 } from "./day3.js";

const parseOpts = { delimiter: ',', transform: (o) => o.map(([l]) => l) };

describe("2021 - Day 3", () => {
  describe("Part 1", () => {
    it("returns the expected result for example", () => {
      const exampleInput = readInput("./2021/day3/example-input", parseOpts);
      expect(part1(exampleInput)).toEqual(198);
    });

    it("returns the expected result", () => {
      const input = readInput("./2021/day3/input", parseOpts);
      expect(part1(input)).toEqual(845186);
    });
  });

  describe("Part 2", () => {
    it("returns the expected result for example", () => {
      const exampleInput = readInput("./2021/day3/example-input", parseOpts);
      expect(part2(exampleInput)).toEqual(230);
    });

    it("returns the expected result", () => {
      const input = readInput("./2021/day3/input", parseOpts);
      expect(part2(input)).toEqual(4636702);
    });
  });
});
