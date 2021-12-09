import _ from "lodash";

// generated by prepare script
export const part1 = (arr) => {
  let lows = 0;

  arr.forEach((line, y) =>
    line.forEach((currVal, x) => {
      const neighbors = [
        arr[y - 1]?.[x],
        arr[y + 1]?.[x],
        arr[y]?.[x - 1],
        arr[y]?.[x + 1],
      ].filter((n) => n !== undefined);

      const isLow = neighbors.every((n) => currVal < n);

      if (isLow) lows += 1 + currVal;
    })
  );

  return lows;
};

export const part2 = (arr) => {
  const lows = [];
  const m = arr.map((l, y) => l.map((val, x) => ({ x, y, val })));

  m.forEach((l, y) => {
    l.forEach((p, x) => {
      const neighbors = [
        m[y - 1]?.[x],
        m[y + 1]?.[x],
        m[y]?.[x - 1],
        m[y]?.[x + 1],
      ].filter((n) => n !== undefined);

      const isLow = neighbors.every((n) => p.val < n.val);

      if (isLow) lows.push(p);

      if (p.val < 9 && !isLow) {
        const lowers = neighbors.filter((n) => n.val < p.val);
        p.lowers = lowers;
      }
    });
  });

  const fm = _.flatten(m)
    .sort((a, b) => a.val - b.val)
    .filter((p) => p.val !== 9 && !lows.includes(p));

  const basins = lows.map((lp) => {
    let positions = new Set([lp]);

    fm.forEach((fmp) => {
      const isInBasin = fmp.lowers.some((lp) => positions.has(lp));
      if (isInBasin) positions.add(fmp);
    });

    return positions.size;
  });

  return basins
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((t, v) => t * v);
};
