// deno-lint-ignore-file no-explicit-any
export function readInputFile<T extends any = string[]> (
  path: string,
  splitter: RegExp | string | ((input: string) => T) = /\r?\n/
): T {
  const text = Deno.readTextFileSync(path);
  if (typeof splitter === 'function') return splitter(text);
  return text.split(splitter).filter((line) => line.length) as T;
}
