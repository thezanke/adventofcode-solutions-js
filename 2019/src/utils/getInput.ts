import * as path from 'path';
import { readFile } from 'fs-extra';

type MapperFunction = (n: string) => any; // tslint:disable-line no-any

const DEFAULT_MAPPER: MapperFunction = (n) => n;

export const getInput = async (fileName: string, mapper: MapperFunction = DEFAULT_MAPPER) => {
  const inputPath = path.resolve(__dirname, '..', 'input', fileName);
  const input = await readFile(inputPath, 'utf8');
  return input.split('\n').map(mapper);
};
