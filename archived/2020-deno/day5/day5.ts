const PASS_MATCHER = /(.{7})(.{3})/;

const findPosition = (
  part: string,
  _min: number,
  _max: number,
  shrink: string
) => {
  let min = _min;
  let max = _max;

  part.split('').forEach((c) => {
    const x = Math.ceil((max - min) / 2);
    if (c === shrink) {
      max -= x;
    } else {
      min += x;
    }
  });

  if (min === max) return max;

  return -1;
};

export const getSeatId = (boardingPass: string) => {
  const match = boardingPass.match(PASS_MATCHER);
  if (match == null) return -1;

  const [, rowInput, colInput] = match;
  const row = findPosition(rowInput, 0, 127, 'F');
  const col = findPosition(colInput, 0, 7, 'L');

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
