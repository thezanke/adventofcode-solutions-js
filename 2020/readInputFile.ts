export const readInputFile = (
  path: string,
  splitter = "\n",
) => {
  let text = Deno.readTextFileSync(path);
  return text.split(splitter).filter((line) => line.length);
};
