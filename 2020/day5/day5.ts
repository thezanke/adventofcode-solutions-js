const MAX_ROWS = 128;

const PASS_MATCHER = /(.{7})(.{3})/;

export const determineRow = (part: string) => {
  let min = 0;
  let max = 127;

  part.split("").forEach((c) => {
    if (c === "F") {
      max -= Math.ceil((max - min) / 2);
    } else {
      min += Math.ceil((max - min) / 2);
    }
  });

  return max;
};

export const determineCol = (part: string) => {
  let min = 0;
  let max = 7;

  part.split("").forEach((c) => {
    if (c === "L") {
      max -= Math.ceil((max - min) / 2);
    } else {
      min += Math.ceil((max - min) / 2);
    }
  });

  return max;
};

export const getSeatId = (boardingPass: string) => {
  const match = boardingPass.match(PASS_MATCHER);
  if (!match) return 0;
  const [, rowInput, colInput] = match;
  const row = determineRow(rowInput);
  const col = determineCol(colInput);
  return row * 8 + col;
};

export const findSeat = (ids: number[]) => {
  const min = Math.min(...ids);
  const max = Math.max(...ids);
  for (let i = min; i < max; i += 1) {
    if (!ids.includes(i)) return i;
  }
  return -1;
};
