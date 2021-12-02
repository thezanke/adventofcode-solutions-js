import path from "path";
import fs from "fs";
import * as csv from "csv-parse/lib/sync";

/**
 * @param {string} fileInputPath
 * @param {sync.Options & { transform?: (input: any[]) => any }} options
 * @returns
 */
export const readInput = (fileInputPath, options) => {
  const { transform, ...parseOptions } = options;
  const resolvedPath = path.resolve(fileInputPath);
  const contents = fs.readFileSync(resolvedPath);

  const parsed = csv.parse(contents, {
    skipEmptyLines: true,
    columns: false,
    ...parseOptions,
  });

  return transform?.(parsed) ?? parsed;
};
