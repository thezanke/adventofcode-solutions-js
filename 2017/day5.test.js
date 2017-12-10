const { countJumps } = require('./day5');
const { CHALLENGE_ONE } = require('./day5.input');

test('counts jumps', () => {
  expect(countJumps([0,3,0,1,-3])).toEqual(5);
});

test('counts jumps', () => {
  const input = CHALLENGE_ONE.split('\n').map(num => parseInt(num, 10));
  expect(countJumps(input)).toEqual(391540);
});