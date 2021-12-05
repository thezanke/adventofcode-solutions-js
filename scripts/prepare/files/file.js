import * as path from "path";

export class File {
  constructor(workdir, day, year, files) {
    this.workdir = workdir;
    this.day = day;
    this.year = year;
    this.files = files;
  }

  get fileName() {
    throw Error("Missing custom fileName getter");
  }

  get filePath() {
    return path.join(this.workdir, this.fileName);
  }

  createFileContents() {
    throw Error("Missing custom createFileContents");
  }
}