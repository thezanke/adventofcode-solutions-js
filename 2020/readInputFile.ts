export const readInputFile = (
  path: string,
  splitter = "\n",
) => {
  const text = Deno.readTextFileSync(path);
  return text.split(splitter).filter((line) => line.length);
};
