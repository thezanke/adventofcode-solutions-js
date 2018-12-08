

const repeatCount = (input, test) => Array.from(input).filter(item => item === test).length;

const part1 = input => {
  const results = input
    .map(line => [...new Set(line)].reduce((acc, char) => ({ ...acc, [char]: repeatCount(line, char) }), {}))
    .map(charCounts => {
      const vals = Object.values(charCounts);
      return [repeatCount(vals, 2), repeatCount(vals, 3)];
    })
    .reduce((acc, val) => [val[0] ? acc[0] + 1 : acc[0], val[1] ? acc[1] + 1 : acc[1]], [0, 0]);

  return results.reduce((a, b) => a * b);
};

const part2 = input => {
  const results = input
    .map((line, i) => {
      sibling = input.slice(i + 1).find(line2 => {
        let count = 0;
        return !Array.from(line).some((letter, i) => {
          if (letter !== line2[i]) count += 1;
          return count > 1;
        });
      });

      return [line, sibling];
    })
    .find(([line, sibling]) => sibling);

  if (!results) return false;

  const [id1, id2] = results;

  return Array.from(id1).reduce((str, letter, i) => (id2[i] === letter ? str + letter : str), '');
};

module.exports = { part1, part2 };