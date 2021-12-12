// generated by prepare script
const createMap = (input) => {
  const map = {};
  for (const [a, b] of input) {
    if (!map[b]) map[b] = [];
    if (!map[a]) map[a] = [];
    map[b].push(a);
    map[a].push(b);
  }
  return map;
};

const END = "end";
const START = "start";

export const part1 = (input) => {
  const map = createMap(input);

  let paths = [];

  const findPaths = (label, path = []) => {
    const nextPath = [...path, label];

    if (label === END) {
      paths.push(nextPath);
      return;
    }

    map[label].forEach((l) => {
      if (l.charCodeAt(0) >= 97 && path.includes(l)) return;
      findPaths(l, nextPath);
    });
  };

  findPaths(START);

  return paths.length;
};

export const part2 = (input) => {
  const map = createMap(input);

  let paths = [];

  const findPaths = (label, path = [], _extraTimeSpent = false) => {
    const nextPath = [...path, label];

    if (label === END) {
      paths.push(nextPath);
      return;
    }

    map[label].forEach((l) => {
      if (l === START) return;

      let extraTimeSpent = _extraTimeSpent;

      const charCode = l.charCodeAt(0);
      if (charCode >= 97) {
        if (path.includes(l)) {
          if (extraTimeSpent) return;
          extraTimeSpent = true;
        }
      }

      findPaths(l, nextPath, extraTimeSpent);
    });
  };

  findPaths(START);

  return paths.length;
};
