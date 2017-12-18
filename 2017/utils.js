// @flow
exports.range = (start: number, end: number): number[] =>
  Array(end - start + 1)
    .fill()
    .map((_, idx) => start + idx);
