import { solvePart1, solvePart2 } from './day2';

describe('DAY 2', () => {
  test('Part 1', async () => {
    const res = await solvePart1();
    expect(res).toBe(6730673);
  });

  test.skip('Part 2', async () => {
    const res = await solvePart2(19690720);
    expect(res).toBe(3749);
  });
});
