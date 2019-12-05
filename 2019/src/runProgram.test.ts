import { runProgram, getOpcode } from './runProgram';

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
});
