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
    } catch (e) {
      let message = "❗ Could not fetch example input, ";
      if (e.message) message += `reason="${e.message}", `;
      message += "stubbing blank file instead.";
      console.log(message);

      return "";
    }
  }
}
