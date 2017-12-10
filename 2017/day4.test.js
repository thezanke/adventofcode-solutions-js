const CHALLENGE = require('./day4.input');

const { isValid } = require('./day4');

test('test validity of example passphrase', () => {
  expect(isValid('aa bb cc dd ee')).toBeTruthy();
});

test('test validity of example passphrase', () => {
  expect(isValid('aa bb cc dd aa')).toBeFalsy();
});

test('test validity of example passphrase', () => {
  expect(isValid('aa bb cc dd aaa')).toBeTruthy();
});

test('count valid passphrases in challenge input', () => {
  const inputArr = CHALLENGE.split('\n');
  expect(inputArr.map(isValid).filter(Boolean).length).toBe(477);
});

const { isValidAdv } = require('./day4');

test('test validity of example passphrase', () => {
  expect(isValidAdv('abcde fghij')).toBeTruthy();
});

test('test validity of example passphrase', () => {
  expect(isValidAdv('abcde xyz ecdab')).toBeFalsy();
});

test('test validity of example passphrase', () => {
  expect(isValidAdv('a ab abc abd abf abj')).toBeTruthy();
});

test('test validity of example passphrase', () => {
  expect(isValidAdv('iiii oiii ooii oooi oooo')).toBeTruthy();
});

test('test validity of example passphrase', () => {
  expect(isValidAdv('oiii ioii iioi iiio')).toBeFalsy();
});

test('count valid passphrases in challenge input', () => {
  const inputArr = CHALLENGE.split('\n');
  expect(inputArr.map(isValidAdv).filter(Boolean).length).toBe(167);
});