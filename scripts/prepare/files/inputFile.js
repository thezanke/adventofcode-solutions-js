import * as path from "path";
import { fetchInput } from "../fetchInput.js";

export class InputFile {
  constructor(day, year) {
    this.fileName = this.createFileName(day);
    this.day = day;
    this.year = year;
  }

  createFileName(dayOfMonth) {
    return `input`;
  }

  createFileContents() {
    return fetchInput(this.year, this.day);
  }
}
