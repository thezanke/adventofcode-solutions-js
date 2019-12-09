import { runProgram, getOpcode, Program } from './runProgram';
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
    let program: Program;

    program = runProgram([1, 0, 0, 0, 99]);
    expect(program.memory).toEqual([2, 0, 0, 0, 99]);

    program = runProgram([2, 4, 4, 5, 99, 0]);
    expect(program.memory).toEqual([2, 4, 4, 5, 99, 9801]);

    program = runProgram([1, 1, 1, 4, 99, 5, 6, 0, 99]);
    expect(program.memory).toEqual([30, 1, 1, 4, 2, 5, 6, 0, 99]);
  });

  test('handles overrides', () => {
    const program = runProgram([2, 0, 0, 3, 99], { 1: 3, 2: 0 });
    expect(program.memory).toEqual([2, 3, 0, 6, 99]);
  });

  test('handles negatives', () => {
    const program = runProgram([1101, 100, -1, 4, 0]);
    expect(program.memory).toEqual([1101, 100, -1, 4, 99]);
  });

  describe('OP: SAVE_INPUT', () => {
    test('saves existing input and exits', () => {
      const program = runProgram([3, 3, 99, 0], undefined, [1337]);
      expect(program.memory).toEqual([3, 3, 99, 1337]);
    });

    test("waits for input if ones doesn't exist", () => {
      const program = runProgram([3, 3, 99, 0], undefined);
      expect(program.memory).toEqual([3, 3, 99, 0]);
      expect(program.waiting).toBeTruthy();

      program.input(1337);

      expect(program.memory).toEqual([3, 3, 99, 1337]);
      expect(program.waiting).toBeFalsy();
      expect(program.exited).toBeTruthy();
    });
  });

  test('OP: OUTPUT_VALUE', () => {
    const mockFn = jest.fn();
    const program = runProgram(
      [104, 2, 4, 2, 99],
      undefined,
      undefined,
      mockFn
    );

    expect(program.memory).toEqual([104, 2, 4, 2, 99]);
    expect(mockFn).toBeCalledTimes(2);
    expect(mockFn).nthCalledWith(1, 2);
    expect(mockFn).nthCalledWith(2, 4);
  });

  describe('OP: TRUE_JUMP', () => {
    test('jumps if True', () => {
      const mockFn = jest.fn();
      const initialMemory = [105, 1, 4, 104, 5, 99];
      const program = runProgram(initialMemory, undefined, undefined, mockFn);
      expect(program.memory).toEqual(initialMemory);
      expect(mockFn).not.toHaveBeenCalled();
    });

    test('does nothing if not true', () => {
      const mockFn = jest.fn();
      const initialMemory = [105, 0, 4, 4, 2, 99];
      const program = runProgram(initialMemory, undefined, undefined, mockFn);
      expect(program.memory).toEqual(initialMemory);
      expect(mockFn).toHaveBeenCalled();
      expect(mockFn).toHaveBeenCalledWith(4);
    });
  });

  describe('OP: FALSE_JUMP', () => {
    test('jumps if False', () => {
      const mockFn = jest.fn();
      const initialMemory = [106, 0, 4, 104, 5, 99];
      const program = runProgram(initialMemory, undefined, undefined, mockFn);
      expect(program.memory).toEqual(initialMemory);
      expect(mockFn).not.toHaveBeenCalled();
    });

    test('does nothing if not true', () => {
      const mockFn = jest.fn();
      const initialMemory = [106, 1, 4, 4, 2, 99];
      const program = runProgram(initialMemory, undefined, undefined, mockFn);
      expect(program.memory).toEqual(initialMemory);
      expect(mockFn).toHaveBeenCalled();
      expect(mockFn).toHaveBeenCalledWith(4);
    });
  });

  describe('OP: LESS_THAN', () => {
    test('stores 1 if less than', () => {
      const program = runProgram([1107, 1, 2, 5, 99, 99]);
      expect(program.memory).toEqual([1107, 1, 2, 5, 99, 1]);
    });

    test('stores 0 if not less than', () => {
      const program = runProgram([1107, 3, 2, 5, 99, 99]);
      expect(program.memory).toEqual([1107, 3, 2, 5, 99, 0]);
    });
  });

  describe('OP: EQUALS', () => {
    test('stores 1 if equal', () => {
      const program = runProgram([1108, 1, 1, 5, 99, 99]);
      expect(program.memory).toEqual([1108, 1, 1, 5, 99, 1]);
    });

    test('stores 0 if not equal', () => {
      const program = runProgram([1108, 3, 2, 5, 99, 99]);
      expect(program.memory).toEqual([1108, 3, 2, 5, 99, 0]);
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

  test('Handles large numbers', () => {
    const mockFn = jest.fn();
    runProgram([104,1125899906842624,99], undefined, undefined, mockFn);
    expect(mockFn).toHaveBeenCalledWith(1125899906842624);
  });

  test('Should output 16-digit number', () => {
    const mockFn = jest.fn(n => n);
    runProgram([1102,34915192,34915192,7,4,7,99,0], undefined, undefined, mockFn);
    expect(`${mockFn.mock.results[0].value}`.length).toEqual(16);
  });
});
