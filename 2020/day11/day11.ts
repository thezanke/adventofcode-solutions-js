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

  let unstable = true;

  while (unstable) {
    unstable = false;
    state = state.map((positions, y) => {
      return positions.map((pos, x) => {
        if (pos !== Seat.empty && pos !== Seat.occupied) {
          return pos;
        }

        const adjacentOccupied = countAdjacent(x, y, Seat.occupied);

        if (pos === Seat.empty) {
          if (!adjacentOccupied.length) {
            unstable = true;
            return Seat.occupied;
          }
        }

        if (pos === Seat.occupied) {
          if (adjacentOccupied.length >= 4) {
            unstable = true;
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

export const findStableSeating2 = (initial: string[][]) => {
  let state = [...initial.map((r) => [...r])];

  const countAdjacent = (x: number, y: number, type: Seat) => {
    const maxY = state.length - 1;
    const maxX = state[0]?.length ?? 1 - 1;

    if (!(maxY && maxX)) return 0;

    const visible: string[] = [];

    // up-left
    if (y !== 0 && x !== 0) {
      let diff = 1;
      while (true) {
        let pos = state[y + diff * -1]?.[x + diff * -1];
        if (!pos) break;
        if (pos !== Seat.missing) {
          visible.push(pos);
          break;
        }
        diff += 1;
      }
    }

    // up
    if (y !== 0) {
      let diff = 1;
      while (true) {
        let pos = state[y + diff * -1]?.[x];
        if (!pos) break;
        if (pos !== Seat.missing) {
          visible.push(pos);
          break;
        }
        diff += 1;
      }
    }

    // up-right
    if (y !== 0) {
      let diff = 1;
      while (true) {
        let pos = state[y + diff * -1]?.[x + diff];
        if (!pos) break;
        if (pos !== Seat.missing) {
          visible.push(pos);
          break;
        }
        diff += 1;
      }
    }

    // right
    if (x !== maxX) {
      let diff = 1;
      while (true) {
        let pos = state[y]?.[x + diff];
        if (!pos) break;
        if (pos !== Seat.missing) {
          visible.push(pos);
          break;
        }
        diff += 1;
      }
    }

    // down-right
    if (y !== maxY && x !== maxX) {
      let diff = 1;
      while (true) {
        let pos = state[y + diff]?.[x + diff];
        if (!pos) break;
        if (pos !== Seat.missing) {
          visible.push(pos);
          break;
        }
        diff += 1;
      }
    }

    // down
    if (y !== maxY) {
      let diff = 1;
      while (true) {
        let pos = state[y + diff]?.[x];
        if (!pos) break;
        if (pos !== Seat.missing) {
          visible.push(pos);
          break;
        }
        diff += 1;
      }
    }

    // down-left
    if (y !== maxY && x !== 0) {
      let diff = 1;
      while (true) {
        let pos = state[y + diff]?.[x + diff * -1];
        if (!pos) break;
        if (pos !== Seat.missing) {
          visible.push(pos);
          break;
        }
        diff += 1;
      }
    }

    // left
    if (x !== 0) {
      let diff = 1;
      while (true) {
        let pos = state[y]?.[x + diff * -1];
        if (!pos) break;
        if (pos !== Seat.missing) {
          visible.push(pos);
          break;
        }
        diff += 1;
      }
    }

    return visible.filter((p) => p === type).length;
  };

  let updated = true;

  while (updated) {
    updated = false;
    state = state.map((positions, y) => {
      return positions.map((pos, x) => {
        if (pos !== Seat.empty && pos !== Seat.occupied) {
          return pos;
        }

        const visibleOccupiedCount = countAdjacent(x, y, Seat.occupied);

        if (pos === Seat.empty) {
          if (!visibleOccupiedCount) {
            updated = true;
            return Seat.occupied;
          }
        }

        if (pos === Seat.occupied) {
          if (visibleOccupiedCount >= 5) {
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
