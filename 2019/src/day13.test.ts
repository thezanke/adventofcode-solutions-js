import { getInput } from './utils/getInput';
import { solvePart1, solvePart2 } from './day13';

describe('DAY 13', () => {
  test('Part 1', async () => {
    const input = await getInput('day13.txt', ',', Number);
    expect(solvePart1(input)).toEqual(253);
  });

  test('Part 2', async () => {
    const input = await getInput('day13.txt', ',', Number);
    expect(solvePart2(input)).toEqual(253);
  });
});
