import * as fs from "fs";
import * as path from "path";
import { CodeFile } from "./files/codeFile.js";
import { InputFile } from "./files/inputFile.js";
import { TestFile } from "./files/testFile.js";

const determineDay = (yearOrDay, suppliedDay) => {
  let year;
  let day;

  if (suppliedDay) {
    day = suppliedDay;
    year = yearOrDay;
  } else {
    const today = new Date();
    year = `${today.getFullYear()}`;

    if (yearOrDay) {
      day = yearOrDay;
    } else {
      day = `${today.getDate()}`;
    }
  }

  return [year, day];
};

const ensureDirectory = (path) => {
  if (!fs.existsSync(path)) fs.mkdirSync(path);
};

const filesToGenerate = [CodeFile, InputFile, TestFile];

const writeOptions = { encoding: "utf-8" };

const createMissingFiles = async (workdir, day, year) => {
  const files = [];

  for (const File of filesToGenerate) {
    const file = new File(workdir, day, year, files);
    files.push(file);
  }

  for (const file of files) {
    if (!fs.existsSync(file.fileName)) {
      try {
        const contents = await file.createFileContents();
        fs.writeFileSync(file.fileName, contents, writeOptions);
      } catch (e) {
        console.error(e);
        console.log(`Could not create "${file.fileName}", skipping...`);
      }
    } else {
      console.log(`${file.fileName} already exists, skipping...`);
    }
  }
};

export const prepare = async () => {
  const [, , ...args] = process.argv;
  const [year, day] = determineDay(...args);
  const workdir = path.resolve(".", year, `day${day}`);

  ensureDirectory(workdir);
  await createMissingFiles(workdir, day, year);

  console.log(workdir);
};
