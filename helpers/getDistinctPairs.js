// source: https://stackoverflow.com/a/43241287
export const getDistinctPairs = (input) =>
  input.flatMap((v, i) => input.slice(i + 1).map((w) => [w, v]));
