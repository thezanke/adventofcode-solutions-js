const input = require('./input/day1');

const operations = {
  '+': (val, num) => val + num,
  '-': (val, num) => val - num
};

// part 1
let part1 = input => input.reduce((acc, line) => operations[line.slice(0, 1)](acc, parseInt(line.slice(1), 10)), 0);

// part 2
const parseChange = change => [change.slice(0, 1), parseInt(change.slice(1), 10)];

const part2 = input => {
  let frequency = 0;
  let i = 0;
  let cache = new Set();

  while (!cache.has(frequency)) {
    cache.add(frequency);

    const [sign, change] = parseChange(input[i]);

    frequency = operations[sign](frequency, change);
    if (cache.has(frequency)) locked = true;

    i = i === input.length - 1 ? 0 : i + 1;
  }

  return frequency;
};

describe('day 1', () => {
  test('part 1', () => {
    expect(part1(input)).toEqual(531);
  });

  test('part 2', () => {
    expect(part2(input)).toEqual(76787);
  });
});