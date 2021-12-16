// generated by prepare script
import { readInput } from "../../helpers/readInput.js";
import { hexToBin, part1, part2 } from "./day16.js";

const parseOpts = { transform: (o) => o };

describe("2021 - Day 16", () => {
  describe("hexToBin()", () => {
    it("returns the expected result", () => {
      expect(hexToBin("D2FE28")).toEqual("110100101111111000101000");
    });

    it("returns the expected result", () => {
      expect(hexToBin("38006F45291200")).toEqual(
        "00111000000000000110111101000101001010010001001000000000"
      );
    });

    it("returns the expected result", () => {
      expect(hexToBin("EE00D40C823060")).toEqual(
        "11101110000000001101010000001100100000100011000001100000"
      );
    });
  });

  describe("Part 1", () => {
    describe("Example Input", () => {
      it("returns the expected result", () => {
        expect(part1("D2FE28")).toEqual(6);
      });

      it("returns the expected result", () => {
        expect(part1("38006F45291200")).toEqual(9);
      });

      it("returns the expected result", () => {
        expect(part1("EE00D40C823060")).toEqual(14);
      });

      it("returns the expected result", () => {
        expect(part1("8A004A801A8002F478")).toEqual(16);
      });

      it("returns the expected result", () => {
        expect(part1("620080001611562C8802118E34")).toEqual(12);
      });

      it("returns the expected result", () => {
        expect(part1("C0015000016115A2E0802F182340")).toEqual(23);
      });

      it("returns the expected result", () => {
        expect(part1("A0016C880162017C3686B18A3D4780")).toEqual(31);
      });
    });

    describe("Final Input", () => {
      const input = readInput("./2021/day16/input", parseOpts);

      it("returns the expected result", () => {
        expect(part1(input)).toEqual(854);
      });
    });
  });

  describe("Part 2", () => {
    describe("Example Input", () => {
      it("returns the expected result", () => {
        expect(part2('C200B40A82')).toEqual(3);
      });

      it("returns the expected result", () => {
        expect(part2('04005AC33890')).toEqual(54);
      });

      it("returns the expected result", () => {
        expect(part2('880086C3E88112')).toEqual(7);
      });

      it("returns the expected result", () => {
        expect(part2('CE00C43D881120')).toEqual(9);
      });

      it("returns the expected result", () => {
        expect(part2('D8005AC2A8F0')).toEqual(1);
      });

      it("returns the expected result", () => {
        expect(part2('F600BC2D8F')).toEqual(0);
      });

      it("returns the expected result", () => {
        expect(part2('9C005AC2F8F0')).toEqual(0);
      });
    });

    describe("Final Input", () => {
      const input = readInput("./2021/day16/input", parseOpts);

      it("returns the expected result", () => {
        expect(part2(input)).toEqual(186189840660);
      });
    });
  });
});
