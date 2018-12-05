const input = require('./input/day1').split('\n');

const operations = {
  '+': (val, num) => val + num,
  '-': (val, num) => val - num
};

// part 1
let calibrate = input => input.reduce((acc, line) => operations[line.slice(0, 1)](acc, parseInt(line.slice(1), 10)), 0);

test('part 1', () => {
  expect(calibrate(input)).toEqual(531);
});

// part 2
const parseChange = change => [change.slice(0, 1), parseInt(change.slice(1), 10)];

const calibrateFinal = input => {
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

test('part 2', () => {
  expect(calibrateFinal(input)).toEqual(76787);
});
