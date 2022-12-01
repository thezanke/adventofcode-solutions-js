import { solvePart1, solvePart2 } from './day11';
import { getInput } from './utils/getInput';

describe('DAY 11', () => {
  const challengeInputPromise = getInput('day11.txt', ',', n => Number(n));
  test('Part 1', async () => {
    const input = await challengeInputPromise;
    expect(solvePart1(input)).toEqual(2336);
  });
  test('Part 2', async () => {
    const input = await challengeInputPromise;
    // prettier-ignore
    expect(solvePart2(input)).toEqual([
      ' #  # ####  ##  #### #  # ###  #    ###    ',
      ' #  #    # #  # #    # #  #  # #    #  #   ',
      ' #  #   #  #  # ###  ##   ###  #    #  #   ',
      ' #  #  #   #### #    # #  #  # #    ###    ',
      ' #  # #    #  # #    # #  #  # #    #      ',
      '  ##  #### #  # #### #  # ###  #### #      '
    ].join('\n'));
  });
});
