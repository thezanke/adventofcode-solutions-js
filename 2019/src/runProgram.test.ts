import { runProgram, getOpcode } from './runProgram';
import { getInput } from './utils/getInput';

describe('getOpcode()', () => {
  test('handles single digit', () => {
    expect(getOpcode(2)).toEqual([2, []]);
  });

  test('handles 3 digits', () => {
    expect(getOpcode(112)).toEqual([12, [1]]);
  });

  test('handles 5 digits', () => {
    expect(getOpcode(12010)).toEqual([10, [0, 2, 1]]);
  });
});

describe('runProgram()', () => {
  test('handles basic intcodes', () => {
    expect(runProgram([1, 0, 0, 0, 99])).toEqual([2, 0, 0, 0, 99]);
    expect(runProgram([2, 4, 4, 5, 99, 0])).toEqual([2, 4, 4, 5, 99, 9801]);

    const overrides = { 1: 3, 2: 0 };
    expect(runProgram([2, 0, 0, 3, 99], overrides)).toEqual([2, 3, 0, 6, 99]);

    const initialMemory = [1, 1, 1, 4, 99, 5, 6, 0, 99];
    const finalMemory = [30, 1, 1, 4, 2, 5, 6, 0, 99];
    expect(runProgram(initialMemory)).toEqual(finalMemory);
  });

  test('handles negatives', () => {
    expect(runProgram([1101, 100, -1, 4, 0])).toEqual([1101, 100, -1, 4, 99]);
  });

  test('OP: SAVE_INPUT', () => {
    const initialMemory = [3, 3, 99, 0];
    const finalMemory = [3, 3, 99, 1337];
    expect(runProgram(initialMemory, undefined, [1337])).toEqual(finalMemory);
  });

  test('OP: OUTPUT_VALUE', () => {
    const mockFn = jest.fn();
    const res = runProgram([104, 2, 4, 2, 99], undefined, undefined, mockFn);
    expect(res).toEqual([104, 2, 4, 2, 99]);
    expect(mockFn).toBeCalledTimes(2);
    expect(mockFn).nthCalledWith(1, 2);
    expect(mockFn).nthCalledWith(2, 4);
  });

  describe('OP: TRUE_JUMP', () => {
    test('jumps if True', () => {
      const mockFn = jest.fn();
      const initialMemory = [105, 1, 4, 104, 5, 99];
      const res = runProgram(initialMemory, undefined, undefined, mockFn);
      expect(res).toEqual(initialMemory);
      expect(mockFn).not.toHaveBeenCalled();
    });

    test('does nothing if not true', () => {
      const mockFn = jest.fn();
      const initialMemory = [105, 0, 4, 4, 2, 99];
      const res = runProgram(initialMemory, undefined, undefined, mockFn);
      expect(res).toEqual(initialMemory);
      expect(mockFn).toHaveBeenCalled();
      expect(mockFn).toHaveBeenCalledWith(4);
    });
  });

  describe('OP: FALSE_JUMP', () => {
    test('jumps if False', () => {
      const mockFn = jest.fn();
      const initialMemory = [106, 0, 4, 104, 5, 99];
      const res = runProgram(initialMemory, undefined, undefined, mockFn);
      expect(res).toEqual(initialMemory);
      expect(mockFn).not.toHaveBeenCalled();
    });

    test('does nothing if not true', () => {
      const mockFn = jest.fn();
      const initialMemory = [106, 1, 4, 4, 2, 99];
      const res = runProgram(initialMemory, undefined, undefined, mockFn);
      expect(res).toEqual(initialMemory);
      expect(mockFn).toHaveBeenCalled();
      expect(mockFn).toHaveBeenCalledWith(4);
    });
  });

  describe('OP: LESS_THAN', () => {
    test('stores 1 if less than', () => {
      const inital = [1107, 1, 2, 5, 99, 99];
      const expected = [1107, 1, 2, 5, 99, 1];
      expect(runProgram(inital)).toEqual(expected);
    });

    test('stores 0 if not less than', () => {
      const inital = [1107, 3, 2, 5, 99, 99];
      const expected = [1107, 3, 2, 5, 99, 0];
      expect(runProgram(inital)).toEqual(expected);
    });
  });

  describe('OP: EQUALS', () => {
    test('stores 1 if equal', () => {
      const inital = [1108, 1, 1, 5, 99, 99];
      const expected = [1108, 1, 1, 5, 99, 1];
      expect(runProgram(inital)).toEqual(expected);
    });

    test('stores 0 if not equal', () => {
      const inital = [1108, 3, 2, 5, 99, 99];
      const expected = [1108, 3, 2, 5, 99, 0];
      expect(runProgram(inital)).toEqual(expected);
    });
  });

  test('Advanced', async () => {
    const input = await getInput('day5-2-example.txt', ',', n => Number(n));
    const mockFn = jest.fn();
    runProgram(input, undefined, [5], mockFn);
    expect(mockFn).toHaveBeenCalledWith(999);
    runProgram(input, undefined, [8], mockFn);
    expect(mockFn).toHaveBeenCalledWith(1000);
    runProgram(input, undefined, [10], mockFn);
    expect(mockFn).toHaveBeenCalledWith(1001);
  });
});
