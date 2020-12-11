export enum Seat {
  empty = "L",
  occupied = "#",
  missing = ".",
}

export const printChart = (chart: string[][]) => {
  console.log(chart.map((r) => r.join("")).join("\n"));
};

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
    ].filter((p) => p === type);
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

export const findStableSeating2 = (initial: string[][]) => {
  let state = [...initial.map((r) => [...r])];

  const countAdjacent = (x: number, y: number, type: Seat) => {
    const maxY = state.length - 1;
    const maxX = state[0]?.length ?? 1 - 1;

    if (!(maxY && maxX)) return 0;

    const visible: string[] = [];

    // up-left
    if (y !== 0 && x !== 0) {
      for (let cy = y - 1; cy >= 0; cy -= 1) {
        for (let cx = x - 1; cx >= 0; cx -= 1) {
          let pos = state[cy]?.[cx];
          if (pos && pos !== Seat.missing) {
            visible.push(pos);
            break;
          }
        }
      }
    }

    // up
    if (y !== 0) {
      for (let cy = y - 1; cy >= 0; cy -= 1) {
        let pos = state[cy]?.[x];
        if (pos && pos !== Seat.missing) {
          visible.push(pos);
          break;
        }
      }
    }

    // up-right
    if (y !== 0 && x !== maxX) {
      for (let cy = y - 1; cy >= 0; cy -= 1) {
        for (let cx = x + 1; cx <= maxX; cx += 1) {
          let pos = state[cy]?.[cx];
          if (pos && pos !== Seat.missing) {
            visible.push(pos);
            break;
          }
        }
      }
    }

    // right
    if (x !== maxX) {
      for (let cx = x + 1; cx <= maxX; cx += 1) {
        let pos = state[y]?.[cx];
        if (pos && pos !== Seat.missing) {
          visible.push(pos);
          break;
        }
      }
    }

    // down-right
    if (y !== maxY && x !== maxX) {
      for (let cy = y + 1; cy <= maxY; cy += 1) {
        for (let cx = x + 1; cx <= maxX; cx += 1) {
          let pos = state[cy]?.[cx];
          if (pos && pos !== Seat.missing) {
            visible.push(pos);
            break;
          }
        }
      }
    }

    // down
    if (y !== maxY) {
      for (let cy = y + 1; cy <= maxY; cy += 1) {
        let pos = state[cy]?.[x];
        if (pos && pos !== Seat.missing) {
          visible.push(pos);
          break;
        }
      }
    }

    // down-left
    if (y !== maxY && x !== 0) {
      for (let cy = y + 1; cy <= maxY; cy += 1) {
        for (let cx = x - 1; cx >= 0; cx -= 1) {
          let pos = state[cy]?.[cx];
          if (pos && pos !== Seat.missing) {
            visible.push(pos);
            break;
          }
        }
      }
    }

    // left
    if (x !== 0) {
      for (let cx = x - 1; cx >= 0; cx -= 1) {
        let pos = state[y]?.[cx];
        if (pos && pos !== Seat.missing) {
          visible.push(pos);
          break;
        }
      }
    }

    return visible.filter((p) => p === type).length;
  };

  let updated = true;

  while (updated) {
    updated = false;
    state = state.map((marks, y) => {
      return marks.map((mark, x) => {
        if (mark !== Seat.empty && mark !== Seat.occupied) {
          return mark;
        }

        const visibleOccupiedCount = countAdjacent(x, y, Seat.occupied);

        if (mark === Seat.empty) {
          if (!visibleOccupiedCount) {
            updated = true;
            return Seat.occupied;
          }
        }

        if (mark === Seat.occupied) {
          if (visibleOccupiedCount >= 5) {
            updated = true;
            return Seat.empty;
          }
        }

        return mark;
      });
    });
  }

  return state;
};
