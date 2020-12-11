export enum Seat {
  empty = "L",
  occupied = "#",
  missing = ".",
}

export const printChart = (chart: string[][]) => {
  console.log(chart.map((r) => r.join("")).join("\n"));
};

export const findStableSeating = (
  initial: string[][],
  overpop: number,
  countFn: CountFunc,
) => {
  let state = [...initial.map((r) => [...r])];

  let updated = true;

  while (updated) {
    updated = false;
    state = state.map((positions, y) => {
      return positions.map((pos, x) => {
        if (pos !== Seat.empty && pos !== Seat.occupied) {
          return pos;
        }

        const visibleOccupiedCount = countFn(x, y, Seat.occupied, state);

        if (pos === Seat.empty) {
          if (!visibleOccupiedCount) {
            updated = true;
            return Seat.occupied;
          }
        }

        if (pos === Seat.occupied) {
          if (visibleOccupiedCount >= overpop) {
            updated = true;
            return Seat.empty;
          }
        }

        return pos;
      });
    });
  }

  return state;
};

export const countType = (chart: string[][], type: string) => {
  return chart.reduce((t: number, r) => {
    return t + r.reduce((t2: number, p) => {
      if (p === type) return t2 + 1;
      return t2;
    }, 0);
  }, 0);
};

interface CountFunc {
  (x: number, y: number, type: Seat, state: string[][]): number;
}

export const countAdjacent: CountFunc = (x, y, type, state) => {
  return [
    state[y - 1]?.[x - 1],
    state[y - 1]?.[x],
    state[y - 1]?.[x + 1],
    state[y]?.[x + 1],
    state[y + 1]?.[x + 1],
    state[y + 1]?.[x],
    state[y + 1]?.[x - 1],
    state[y]?.[x - 1],
  ].filter((p) => p === type).length;
};

export const countVisibles: CountFunc = (x, y, type, state) => {
  const maxY = state.length - 1;
  const maxX = state[0]?.length ?? 1 - 1;

  if (!(maxY && maxX)) return 0;

  const visible: string[] = [];

  const findVisibleByVector = (vx: number, vy: number) => {
    let diff = 1;
    while (true) {
      let pos = state[y + diff * vy]?.[x + diff * vx];
      if (!pos) return;
      if (pos !== Seat.missing) {
        visible.push(pos);
        return;
      }
      diff += 1;
    }
  };

  if (y !== 0 && x !== 0) findVisibleByVector(-1, -1);
  if (y !== 0) findVisibleByVector(0, -1);
  if (y !== 0 && x !== maxX) findVisibleByVector(1, -1);
  if (x !== maxX) findVisibleByVector(1, 0);
  if (y !== maxY && x !== maxX) findVisibleByVector(1, 1);
  if (y !== maxY) findVisibleByVector(0, 1);
  if (y !== maxY && x !== 0) findVisibleByVector(-1, 1);
  if (x !== 0) findVisibleByVector(-1, 0);

  return visible.filter((p) => p === type).length;
};
