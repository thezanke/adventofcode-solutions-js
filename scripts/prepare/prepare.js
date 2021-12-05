import * as fs from "fs";
import * as path from "path";
import { CodeFile } from "./files/codeFile.js";
import { ExampleInputFile } from "./files/exampleInputFile.js";
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

const filesToGenerate = [CodeFile, InputFile, ExampleInputFile, TestFile];

const writeOptions = { encoding: "utf-8" };

const createMissingFiles = async (workdir, day, year) => {
  const files = [];

  for (const File of filesToGenerate) {
    const file = new File(workdir, day, year, files);
    files.push(file);
  }

  for (const file of files) {
    const filePath = path.join(workdir, file.fileName);

    if (!fs.existsSync(filePath)) {
      try {
        const contents = await file.createFileContents();
        fs.writeFileSync(filePath, contents, writeOptions);
        console.log(`❗ File "${file.fileName}" created successfully.`);
      } catch (e) {
        let message = `❗ Could not create file "${file.fileName}", `;
        if (e.message) message += `reason="${e.message}", `;
        message += "skipping.";
        console.log(message);
      }
    } else {
      console.log(`❗ File "${file.fileName}" already exists, skipping.`);
    }
  }
};

export const prepare = async () => {
  const [, , ...args] = process.argv;
  const [year, day] = determineDay(...args);
  const workdir = path.resolve(".", year, `day${day}`);

  console.log(
    `❗ Preparing ${year} day ${day} in working directory "${workdir}".`
  );

  ensureDirectory(workdir);
  await createMissingFiles(workdir, day, year);
};
