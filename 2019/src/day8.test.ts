import { solvePart1, solvePart2 } from './day8';
import { getInput } from './utils/getInput';

describe('DAY 8', () => {
  test('example', () => {
    const input = '123456789012'.split('');
    expect(solvePart1(input, 3, 2)).toEqual(1);
  });
  const inputPromise = getInput('day8.txt', '');
  test('Part 1', async () => {
    const input = await inputPromise;
    expect(solvePart1(input, 25, 6)).toEqual(1792);
  });
  test('Part 2', async () => {
    const input = await inputPromise;
    // prettier-ignore
    expect(solvePart2(input, 25, 6)).toEqual(
      '#      ## ####  ##  #  # \n' +
      '#       # #    #  # #  # \n' +
      '#       # ###  #    #### \n' +
      '#       # #    #    #  # \n' +
      '#    #  # #    #  # #  # \n' +
      '####  ##  ####  ##  #  # '
    );
  });
});
