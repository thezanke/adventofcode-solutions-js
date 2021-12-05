import path from "path";
import fs from "fs";
import * as csv from "csv-parse/lib/sync";

/**
 * @param {string} fileInputPath
 * @param {sync.Options & { transform?: (input: any[]) => any }} options
 * @returns
 */
export const readInput = (fileInputPath, options = {}) => {
  const { transform, ...parseOptions } = options;
  const resolvedPath = path.resolve(fileInputPath);
  let contents = fs.readFileSync(resolvedPath, { encoding: "utf-8" });

  if (parseOptions.delimiter) {
    contents = csv.parse(contents, {
      skipEmptyLines: true,
      columns: false,
      ...parseOptions,
    });
  }

  return transform?.(contents) ?? contents;
};
