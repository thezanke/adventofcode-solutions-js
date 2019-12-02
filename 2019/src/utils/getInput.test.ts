import { getInput } from './getInput';

test(`DAY 1: getInput()`, async () => {
  const input = await getInput('day1.txt');
  expect(input).toBeInstanceOf(Array);
  expect(input.length).toEqual(100);
});
