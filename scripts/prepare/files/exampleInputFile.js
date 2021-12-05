import { fetchExampleInput } from "../fetchInput.js";
import { File } from "./file.js";

export class ExampleInputFile extends File {
  get fileName() {
    return `example-input`;
  }

  async createFileContents() {
    try {
      const input = await fetchExampleInput(this.day, this.year);
      return input;
    } catch {
      console.log('❗ Could not fetch example input, stubbing blank file instead.')

      return '';
    }
  }
}
