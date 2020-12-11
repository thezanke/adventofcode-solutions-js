export enum Seat {
  empty = "L",
  occupied = "#",
}

export const findStableSeating1 = (initial: string[][]) => {
  let state = [...initial.map((r) => [...r])];

  const countAdjacent = (x: number, y: number, type: Seat) => {
    return [
      state[y - 1]?.[x - 1],
      state[y - 1]?.[x],
      state[y - 1]?.[x + 1],
      state[y]?.[x + 1],
      state[y + 1]?.[x + 1],
      state[y + 1]?.[x],
      state[y + 1]?.[x - 1],
      state[y]?.[x - 1],
    ].filter((p) => {
      return p && p === type;
    });
  };

  let updated = true;

  while (updated) {
    updated = false;
    state = state.map((marks, y) => {
      return marks.map((mark, x) => {
        if (mark !== Seat.empty && mark !== Seat.occupied) {
          return mark;
        }

        const adjacentOccupied = countAdjacent(x, y, Seat.occupied);

        if (mark === Seat.empty) {
          if (!adjacentOccupied.length) {
            updated = true;
            return Seat.occupied;
          }
        }

        if (mark === Seat.occupied) {
          if (adjacentOccupied.length >= 4) {
            updated = true;
            return Seat.empty;
          }
        }

        return mark;
      });
    });
  }

  console.log(state.map((r) => r.join("")).join("\n"));

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
