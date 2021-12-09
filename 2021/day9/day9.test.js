// generated by prepare script
import { readInput } from "../../helpers/readInput.js";
import { part1, part2 } from "./day9.js";

const parseOpts = {
  transform: (o) => o.split("\n").map((l) => l.split("").map(Number)),
};

describe("2021 - Day 9", () => {
  describe("Part 1", () => {
    describe("Example Input", () => {
      const exampleInput = readInput("./2021/day9/example-input", parseOpts);

      it("returns the expected result", () => {
        expect(part1(exampleInput)).toEqual(15);
      });
    });

    describe("Final Input", () => {
      const input = readInput("./2021/day9/input", parseOpts);

      it("returns the expected result", () => {
        expect(part1(input)).toEqual(566);
      });
    });
  });

  describe("Part 2", () => {
    describe("Example Input", () => {
      const exampleInput = readInput("./2021/day9/example-input", parseOpts);

      it("returns the expected result", () => {
        expect(part2(exampleInput)).toEqual(1134);
      });
    });

    describe("Final Input", () => {
      const input = readInput("./2021/day9/input", parseOpts);

      it("returns the expected result", () => {
        expect(part2(input)).toEqual(1134);
      });
    });
  });
});
