import { File } from "./file.js";

export class ExampleInputFile extends File {
  get fileName() {
    return `example-input`;
  }

  createFileContents() {
    return "";
  }
}
