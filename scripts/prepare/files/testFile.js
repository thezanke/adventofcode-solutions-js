import * as path from "path";
import { CodeFile } from "./codeFile.js";
import { ExampleInputFile } from "./exampleInputFile.js";
import { File } from "./file.js";
import { InputFile } from "./inputFile.js";

export class TestFile extends File {
  fileName = `day${this.day}.test.js`;

  codeFilePath = path.relative(
    ".",
    this.files.find((f) => f instanceof CodeFile).fileName
  );

  inputFilePath = path.relative(
    ".",
    this.files.find((f) => f instanceof InputFile).filePath
  );

  exampleInputFilePath = path.relative(
    ".",
    this.files.find((f) => f instanceof ExampleInputFile).filePath
  );

  createFileContents() {
    return `// generated by prepare script
import { readInput } from "../../helpers/readInput.js";
import { part1, part2 } from "./${this.codeFilePath}";

const parseOpts = { delimiter: ',', transform: o => o };

describe("${this.year} - Day ${this.day}", () => {
  describe("Part 1", () => {
    it("returns the expected result for example", () => {
      const exampleInput = readInput("./${this.exampleInputFilePath}", parseOpts);
      expect(part1(exampleInput)).toEqual(true);
    });

    it.skip("returns the expected result", () => {
      const input = readInput("./${this.inputFilePath}", parseOpts);
      expect(part1(input)).toEqual(true);
    });
  });

  describe("Part 2", () => {
    it.skip("returns the expected result for example", () => {
      const exampleInput = readInput("./${this.exampleInputFilePath}", parseOpts);
      expect(part2(exampleInput)).toEqual(true);
    });

    it.skip("returns the expected result", () => {
      const input = readInput("./${this.inputFilePath}", parseOpts);
      expect(part2(input)).toEqual(true);
    });
  });
});\n`;
  }
}
