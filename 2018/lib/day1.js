const operations = {
  '+': (val, num) => val + num,
  '-': (val, num) => val - num
};

const part1 = input =>
  input.reduce((acc, line) => operations[line.slice(0, 1)](acc, parseInt(line.slice(1), 10)), 0);

const parseChange = change => [change.slice(0, 1), parseInt(change.slice(1), 10)];

const part2 = input => {
  let frequency = 0;
  let i = 0;
  const cache = new Set();

  while (!cache.has(frequency)) {
    cache.add(frequency);

    let locked = false;
    const [sign, change] = parseChange(input[i]);

    frequency = operations[sign](frequency, change);
    if (cache.has(frequency)) locked = true;

    i = i === input.length - 1 ? 0 : i + 1;
  }

  return frequency;
};

module.exports = { part1, part2 };
