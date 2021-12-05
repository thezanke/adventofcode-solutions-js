import { fetchInput } from "../fetchInput.js";
import { File } from "./file.js";

export class InputFile extends File {
  fileName = `input`;

  createFileContents() {
    return fetchInput(this.day, this.year);
  }
}
