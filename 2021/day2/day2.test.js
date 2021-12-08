import { readInput } from "../../helpers/readInput.js";
import { part1, part2 } from "./day2.js";

const parseOpts = {
  delimiter: " ",
  transform: (directions) => {
    return directions.map((d) => {
      const [direction, distance] = d;
      return [direction, parseInt(distance, 10)];
    });
  },
};

describe("2021 - Day 1", () => {
  describe("Part 1", () => {
    describe("Example Input", () => {
      const exampleInput = readInput("./2021/day2/example-input", parseOpts);

      it("returns the expected result for the example", () => {
        const pos = part1(exampleInput);
        expect(pos.x * pos.y).toEqual(150);
      });
    });

    describe("Final Input", () => {
      const input = readInput("./2021/day2/input", parseOpts);

      it("returns the expected result for input", () => {
        const pos = part1(input);
        expect(pos.x * pos.y).toEqual(1383564);
      });
    });
  });

  describe("Part 2", () => {
    describe("Final Input", () => {
      const input = readInput("./2021/day2/input", parseOpts);

      it("returns the expected result", () => {
        const pos = part2(input);
        expect(pos.x * pos.y).toEqual(1488311643);
      });
    });
  });
});
