// generated by prepare script

import _ from 'lodash';
import { manhattan } from '../../helpers/manhattan';

const validHallXPositions = [0, 1, 3, 5, 7, 9, 10];
const finalXPositions = { A: 2, B: 4, C: 6, D: 8 };
const values = { A: 1, B: 10, C: 100, D: 1000 };

// type unit = { t: 'A'|'B'|'C'|'D', x: number, y: number };
// type move = { x: number, y: number, cost: number };

const createMove = _.memoize(
  (unit, x, y) => {
    let cost = values[unit.t];
    cost *= manhattan([unit.x, unit.y], [x, y]);
    return { x, y, cost };
  },
  (unit, x, y) => `${unit.t},${unit.x},${unit.y},${x},${y}`
);

const getUnitAtPos = (x, y, state) => {
  return state.units.find((u) => u.x === x && u.y === y);
};

const checkIfBlockedInHall = (u1, targetX, state) => {
  const x = [u1.x, targetX].sort((a, b) => a - b);
  return state.units.some(
    (u2) => u2 !== u1 && u2.y === 0 && u2.x >= x[0] && u2.x <= x[1]
  );
};

const checkIfBlocksAnother = (unit, state) => {
  return state.units.some(
    (u) => u.x === unit.x && u.y > unit.y && u.t !== unit.t
  );
};

const checkedIfBlockedByAnother = (unit, state) => {
  return state.units.some((u) => u.x === unit.x && u.y < unit.y);
};

const getPossibleMoves = (unit, state) => {
  const possibleMoves = [];

  if (unit.y) {
    if (unit.x === finalXPositions[unit.t]) {
      if (!checkIfBlocksAnother(unit, state)) return [];
    } else if (unit.y > 1) {
      if (checkedIfBlockedByAnother(unit, state)) return [];
    }

    for (const validX of validHallXPositions) {
      if (!checkIfBlockedInHall(unit, validX, state)) {
        possibleMoves.push(createMove(unit, validX, 0));
      }
    }
  } else {
    const finalX = finalXPositions[unit.t];
    const blockedInRoom = state.units.some(
      (u) => u.t !== unit.t && u.x === finalX
    );

    if (!blockedInRoom) {
      if (!checkIfBlockedInHall(unit, finalX, state)) {
        const maxRoomY = state.units.length / 4;

        for (let y = 1; y <= maxRoomY; y += 1) {
          if (y < maxRoomY) {
            const nextDown = getUnitAtPos(finalX, y + 1, state);
            if (!nextDown) continue;
          }

          possibleMoves.push(createMove(unit, finalX, y));
          break;
        }
      }
    }
  }

  return possibleMoves;
};

const reduceMove = (state, unitIndex, move) => {
  const score = state.score + move.cost;

  const units = [...state.units];
  units[unitIndex] = {
    ...units[unitIndex],
    x: move.x,
    y: move.y
  };

  return { score, units };
};

const checkForWin = ({ units }) => {
  return units.every((unit) => unit.x === finalXPositions[unit.t]);
};

const printState = (state) => {
  const grid = Array.from({ length: 3 }, (_v, y) =>
    Array.from({ length: 11 }, (_v, x) => {
      if (!y) return '.';
      return validHallXPositions.includes(x) ? '#' : '.';
    })
  );

  for (const unit of state.units) {
    grid[unit.y][unit.x] = unit.t;
  }

  console.log(grid.map((row) => row.join('')).join('\n'));
};

const createMemoKey = ({ score, units }) => {
  return [score, ...units.flatMap(({ x, y }) => [x, y])].join(',');
};

export const part1 = (input) => {
  let min = Infinity;

  const loop = _.memoize((state, depth = 1) => {
    if (state.score >= min) return;

    if (checkForWin(state)) {
      min = state.score;
      return;
    }

    const { units } = state;
    for (let i = 0; i < units.length; i += 1) {
      if (state.score >= min) return; // escape if min has shrank

      const unit = units[i];
      const possibleMoves = getPossibleMoves(unit, state);

      for (const move of possibleMoves) {
        if (state.score >= min) return; // escape if min has shrank

        const newState = reduceMove(state, i, move);
        loop(newState, depth + 1);
      }
    }
  }, createMemoKey);

  const initialState = { score: 0, units: input };
  loop(initialState);

  return min;
};

export const part2 = (input) => {
  return false;
};
