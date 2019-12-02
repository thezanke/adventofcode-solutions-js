import {
  calculateAdditionalFuel,
  calculateRequiredFuel,
  day1part1,
  day1part2,
  getInput,
} from './day1';

test('getInput', async () => {
  const input = await getInput();
  expect(input).toBeInstanceOf(Array);
  expect(input.length).toEqual(100);
});

test('calculateRequiredFuel', () => {
  expect(calculateRequiredFuel(12)).toEqual(2);
  expect(calculateRequiredFuel(14)).toEqual(2);
  expect(calculateRequiredFuel(1969)).toEqual(654);
  expect(calculateRequiredFuel(100756)).toEqual(33583);
});

test('day1part1', async () => {
  const res = await day1part1();
  expect(res).toEqual(3210097);
});

test('calculateAdditionalFuel', async () => {
  expect(calculateAdditionalFuel(calculateRequiredFuel(1969))).toEqual(312);
  expect(calculateAdditionalFuel(calculateRequiredFuel(100756))).toEqual(16763);
});

test('day1part2', async () => {
  const res = await day1part2();
  expect(res).toEqual(4812287);
});
