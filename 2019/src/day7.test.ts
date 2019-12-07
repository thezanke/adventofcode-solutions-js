import { solvePart1, solvePart2, runAmplifiers, Amplifier } from './day7';
import { getInput } from './utils/getInput';

describe('DAY 7', () => {
  const challengeInputPromise = getInput('day7.txt', ',', n => Number(n));

  describe('Amplifier', () => {
    test('waits for input, produces output, exits', () => {
      // prettier-ignore
      const initialMemory = [3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0];
      const amp = new Amplifier(initialMemory, 1);
      expect(amp.outputSignal).toBeNaN();
      expect(amp.exited).toBeFalsy();
      amp.inputSignal = 1;
      expect(amp.outputSignal).toEqual(11);
      expect(amp.exited).toBeTruthy();
    });
  });

  describe('runAmplifiers()', () => {
    test('solves linear problem', () => {
      // prettier-ignore
      const initalMemory = [3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0];
      expect(runAmplifiers(initalMemory, [4, 3, 2, 1, 0])).toEqual(43210);
    });

    test('solves loopback problem', () => {
      // prettier-ignore
      const input = [3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5];
      expect(runAmplifiers(input, [9, 8, 7, 6, 5], true)).toEqual(139629729);
    });
  });

  describe('Part 1', () => {
    test('solves challenge input', async () => {
      const input = await challengeInputPromise;
      expect(solvePart1(input, [0, 1, 2, 3, 4])).toEqual(273814);
    });
  });

  describe('Part 2', () => {
    test('solves challenge input', async () => {
      const input = await challengeInputPromise;
      expect(solvePart2(input, [5, 6, 7, 8, 9])).toEqual(34579864);
    });
  });
});
