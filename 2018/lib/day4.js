const LOG_FORMAT = /^\[\d{4}-(\d{2})-(\d{2}) (\d{2}):(\d{2})\] (?:Guard #(\d+)\s)?(.+)$/;

const parseLogs = input => {
  return input
    .map(row => LOG_FORMAT.exec(row).slice(1))
    .map(parts => {
      const date = parseInt(parts.slice(0, 4).join(''));
      return [date, parseInt(parts[4]) || null, parts[5]];
    })
    .sort((a, b) => a[0] - b[0]);
};

const part1 = input => {
  const logs = parseLogs(input);
  const guards = {};

  let guard = null;

  logs.forEach(([, nextGuard, log]) => {
    if (nextGuard) {
      if (!guards[nextGuard]) guards[nextGuard] = {};
      guard = guards[nextGuard];
    }
  });

  console.log(logs);

  return false;
};

const part2 = a => a;

module.exports = { part1, part2 };
