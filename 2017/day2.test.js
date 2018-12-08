const { CHALLENGE_INPUT, EXAMPLE1_INPUT, EXAMPLE2_INPUT } = require('./input/day2');
const { calculateChecksum, calculateAdvancedChecksum } = require('./lib/day2');

test('calculates example checksum', () => {
  expect(calculateChecksum(EXAMPLE1_INPUT)).toBe(18);
});

test('calculates challenge checksum', () => {
  expect(calculateChecksum(CHALLENGE_INPUT)).toBe(53460);
});

test('calculates advanced example checksum', () => {
  expect(calculateAdvancedChecksum(EXAMPLE2_INPUT)).toEqual(9);
});

test('calculates advanced challenge checksum', () => {
  expect(calculateAdvancedChecksum(CHALLENGE_INPUT)).toEqual(282);
});
