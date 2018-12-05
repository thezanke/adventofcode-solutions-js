const input = require('./input/day3');

const CLAIM_FORMAT = /^#(\d+) @ (\d+),(\d+): (\d+)x(\d+)$/;

const parseClaims = input =>
  input.map((line, i) => {
    let [, id, x1, y1, w, h] = CLAIM_FORMAT.exec(line).map(str => parseInt(str, 10));
    return { id, pos: { x1, y1, x2: x1 + w, y2: y1 + h }, w, h };
  });

const part1 = input => {
  const claims = parseClaims(input);
  console.log(claims);
};

test('part 1', () => {
  expect(part1(input)).toBeTruthy();
});
