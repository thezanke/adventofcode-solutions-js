const { knotHash } = require('./lib/day10');

const CHALLENGE_INPUT = '225,171,131,2,35,5,0,13,1,246,54,97,255,98,254,110'.split(',').map(Number);

test('solves challenge example', () => {
  const hash = knotHash(CHALLENGE_INPUT);
  expect(Number(hash[0]) * Number(hash[hash.length - 1])).toEqual(0);
});
