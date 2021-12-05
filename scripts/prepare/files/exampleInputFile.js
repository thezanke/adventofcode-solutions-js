import { fetchExampleInput } from "../fetchInput.js";
import { File } from "./file.js";

export class ExampleInputFile extends File {
  get fileName() {
    return `example-input`;
  }

  async createFileContents() {
    const exampleInput = await fetchExampleInput(this.day, this.year);

    return exampleInput;
  }
}
