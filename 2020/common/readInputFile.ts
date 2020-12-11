// deno-lint-ignore-file no-explicit-any
export const readInputFile = (
  path: string,
  splitter: RegExp | string | ((text: string) => any) = /\r?\n/,
) => {
  const text = Deno.readTextFileSync(path);
  if (typeof splitter === "function") return splitter(text);
  return text.split(splitter).filter((line) => line.length);
};
