const { flatten } = require('lodash');

const INPUT = require('./input/day3');

const CLAIM_FORMAT = /^#(\d+) @ (\d+),(\d+): (\d+)x(\d+)$/;

const createMap = () => {
  const map = {};

  const markLocation = (id, x, y) => {
    const LOC_ID = `${x},${y}`;

    if (!map[LOC_ID]) map[LOC_ID] = { count: 0, ids: [] };

    map[LOC_ID].count += 1;
    map[LOC_ID].ids.push(id);
  };

  const mapClaim = claim => {
    for (let y = claim.y; y < claim.y2; y += 1) {
      for (let x = claim.x; x < claim.x2; x += 1) {
        markLocation(claim.id, x, y);
      }
    }
  };

  const getOverlaps = () => Object.values(map).filter(c => c.count >= 2);

  return { mapClaim, getOverlaps };
}

const parseClaims = input =>
  input.map((line, i) => {
    const parsed = CLAIM_FORMAT.exec(line).slice(1);
    const [id, x, y, w, h] = parsed.map(str => parseInt(str, 10));
    return { id, w, h, x, y, x2: x + w, y2: y + h, overlap: 0 };
  });
  
const part1 = input => {
  const map = createMap();
  const claims = parseClaims(input);

  claims.forEach(map.mapClaim);

  return map.getOverlaps().length;
};


test('part 1', () => {
  expect(part1(INPUT)).toEqual(107663);
});

const part2 = input => {
  const map = createMap();
  const claims = parseClaims(input);

  claims.forEach(map.mapClaim);

  const overlaps = map.getOverlaps();
  const ids = new Set(flatten(overlaps.map(o => o.ids)));
  const winner = claims.find(c => !ids.has(c.id));

  return winner.id;
};

test('part 2', () => {
  expect(part2(INPUT)).toEqual(1166);
});