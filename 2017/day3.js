exports.calculateSteps = target => {
  let x = 0;
  let y = 0;
  let dx = 1;
  let dy = 0;

  for (let i = 1; i < target; i += 1) {
    [x, y] = [x + dx, y + dy];

    if (x === y || (x < 0 && x === -y) || (x > 0 && x === 1 - y)) {
      [dx, dy] = [-dy, dx];
    }
  }

  return Math.abs(x) + Math.abs(y);
};

const sumOrOne = (positions, x, y) => {
  if (x === 0 && y === 0) return 1;

  return [
    positions.get(`${x + 1},${y + 1}`),
    positions.get(`${x + 1},${y}`),
    positions.get(`${x + 1},${y - 1}`),
    positions.get(`${x},${y - 1}`),
    positions.get(`${x - 1},${y - 1}`),
    positions.get(`${x - 1},${y}`),
    positions.get(`${x - 1},${y + 1}`),
    positions.get(`${x},${y + 1}`)
  ]
    .filter(Boolean)
    .reduce((a, b) => a + b, 0);
};

exports.calculateLargerThan = target => {
  let x = 0;
  let y = 0;
  let dx = 1;
  let dy = 0;

  const positions = new Map();

  while (true) {
    const value = sumOrOne(positions, x, y);

    if (value > target) return value;

    positions.set(`${x},${y}`, value);

    [x, y] = [x + dx, y + dy];

    if (x === y || (x < 0 && x === -y) || (x > 0 && x === 1 - y)) {
      [dx, dy] = [-dy, dx];
    }
  }
};
