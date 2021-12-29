// generated by prepare script
const reduceState = (state) => {
  let state1 = state.map((row) => [...row]);

  for (let y = state.length - 1; y >= 0; y -= 1) {
    const row = state[y];
    for (let x = 0; x < row.length; x += 1) {
      const pos = row[x];
      if (pos !== ">") continue;
      const nextXPos = (x + 1) % row.length;
      if (row[nextXPos] !== ".") continue;
      state1[y][x] = ".";
      state1[y][nextXPos] = ">";
    }
  }

  let state2 = state1.map((row) => [...row]);

  for (let y = state1.length - 1; y >= 0; y -= 1) {
    const row = state1[y];
    for (let x = 0; x < row.length; x += 1) {
      const pos = row[x];
      if (pos !== "v") continue;
      const nextYPos = (y + 1) % state1.length;
      if (state1[nextYPos][x] !== ".") continue;
      state2[y][x] = ".";
      state2[nextYPos][x] = "v";
    }
  }

  return state2;
};

const createSnapshot = (state) => state.map((row) => row.join("")).join("\n");

export const part1 = (input) => {
  let state = input;
  let lastSnapshot = createSnapshot(input);

  for (let i = 1; ; i += 1) {
    state = reduceState(state);
    const snapshot = createSnapshot(state);

    if (lastSnapshot === snapshot) return i;
    else lastSnapshot = snapshot;
  }
};

export const part2 = (input) => {
  return false;
};