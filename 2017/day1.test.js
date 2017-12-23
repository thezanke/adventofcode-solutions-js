const { solveCaptcha } = require('./day1');
const { CHALLENGE_INPUT } = require('./day1.input');

test('solves example captcha', () => {
  expect(solveCaptcha('1122')).toEqual(3);
});

test('solves example captcha', () => {
  expect(solveCaptcha('1111')).toEqual(4);
});

test('solves example captcha', () => {
  expect(solveCaptcha('1234')).toEqual(0);
});

test('solves example captcha', () => {
  expect(solveCaptcha('91212129')).toEqual(9);
});

test('solves challenge captcha', () => {
  expect(solveCaptcha(CHALLENGE_INPUT)).toEqual(1031);
});

const { solveAdvancedCaptcha } = require('./day1');

test('solves advanced example captcha', () => {
  expect(solveAdvancedCaptcha('1212')).toEqual(6);
});

test('solves advanced example captcha', () => {
  expect(solveAdvancedCaptcha('1221')).toEqual(0);
});

test('solves advanced example captcha', () => {
  expect(solveAdvancedCaptcha('123425')).toEqual(4);
});

test('solves advanced example captcha', () => {
  expect(solveAdvancedCaptcha('123123')).toEqual(12);
});

test('solves advanced example captcha', () => {
  expect(solveAdvancedCaptcha('12131415')).toEqual(4);
});

test('solves advanced challenge captcha', () => {
  expect(solveAdvancedCaptcha(CHALLENGE_INPUT)).toEqual(1080);
});
