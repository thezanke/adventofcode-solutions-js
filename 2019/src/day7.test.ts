import { solvePart1, applyAmplifiers } from './day7';
import { getInput } from './utils/getInput';
describe('DAY 7', () => {
//   const challengeInputPromise = getInput('day5.txt', ',', n => Number(n));

  test('applyAmplifiers()', () => {
    const input = [3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0]; // prettier-ignore
    expect(applyAmplifiers(input, [4,3,2,1,0])).toEqual(43210);
  });

  // describe('Part 1', () => {
  //     test('solves Example input', async () => {
  //         const input = await challengeInputPromise as number[];
  //         expect(solvePart1(input)).toEqual(true);
  //     });
  // })
});
