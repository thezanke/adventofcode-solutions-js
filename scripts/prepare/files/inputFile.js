import { fetchInput } from "../fetchInput.js";
import { File } from "./file.js";

export class InputFile extends File {
  get fileName() {
    return `input`;
  }

  createFileContents() {
    return fetchInput(this.year, this.day);
  }
}
