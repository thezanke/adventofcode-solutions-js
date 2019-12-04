// password
// It is a six-digit number.
// The value is within the range given in your puzzle input.
// Two adjacent digits are the same (like 22 in 122345).
// Going from left to right, the digits never decrease; they only ever increase or stay the same (like 111123 or 135679).
//
// Other than the range rule, the following are true:
//
// 111111 meets these criteria (double 11, never decreases).
// 223450 does not meet these criteria (decreasing pair of digits 50).
// 123789 does not meet these criteria (no double)
//
// How many different passwords within the range given in your puzzle input meet these criteria?

const getDigits = (n: number) => `${n}`.split('').map(Number);

const testDigitSequence = (digits: number[]) => {
  let [last] = digits;
  return digits.every(d => {
    const pass = d >= last;
    last = d;
    return pass;
  });
};

export const findMatchingPairs = (digits: number[]) => {
  let last: number;

  return digits.some(d => {
    const pass = d === last;
    last = d;
    return pass;
  });
};

const findMatchingNumbers = (start: number, end: number) => {
  const matchingNumbers: number[] = [];

  for (let i = start; i < end + 1; i += 1) {
    const digits = getDigits(i);
    if (!testDigitSequence(digits)) continue;
    if (!findMatchingPairs(digits)) continue;
    matchingNumbers.push(i);
  }

  return matchingNumbers;
};

export const solvePart1 = () => {
  return findMatchingNumbers(193651, 649729).length;
};

export const solvePart2 = () => {};
