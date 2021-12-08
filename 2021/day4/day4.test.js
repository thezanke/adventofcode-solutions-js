import { readInput } from "../../helpers/readInput.js";
import { part1, part2 } from "./day4.js";

describe("2021 - Day 3", () => {
  describe("Part 1", () => {
    describe("Example Input", () => {
      const exampleInput = readInput("./2021/day4/example-input");

      it("returns the expected result for example", () => {
        expect(part1(exampleInput)).toEqual(4512);
      });
    });

    describe("Final Input", () => {
      const input = readInput("./2021/day4/input");

      it("returns the expected result", () => {
        expect(part1(input)).toEqual(82440);
      });
    });
  });

  describe("Part 2", () => {
    describe("Example Input", () => {
      const exampleInput = readInput("./2021/day4/example-input");

      it("returns the expected result for example", () => {
        expect(part2(exampleInput)).toEqual(1924);
      });
    });

    describe("Final Input", () => {
      const input = readInput("./2021/day4/input");

      it("returns the expected result", () => {
        expect(part2(input)).toEqual(20774);
      });
    });
  });
});
