import { assertEquals } from 'https://deno.land/std@0.79.0/testing/asserts.ts';
import { readInputFile } from '../common/readInputFile.ts';
import { Program, Program2 } from './day14.ts';

const input = readInputFile('day14/input.txt');

Deno.test('Day 14 - Part 1 - Example', () => {
  const p = new Program(
    [
      'mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X',
      'mem[8] = 11',
      'mem[7] = 101',
      'mem[8] = 0'
    ]
  );
  p.run();
  assertEquals(p.sumMemory(), 165);
});

Deno.test('Day 14 - Part 1 - Answer', () => {
  const p = new Program(input);
  p.run();
  assertEquals(p.sumMemory(), 10885823581193);
});

Deno.test('Day 14 - Part 1 - Example', () => {
  const p = new Program2(
    [
      'mask = 000000000000000000000000000000X1001X',
      'mem[42] = 100',
      'mask = 00000000000000000000000000000000X0XX',
      'mem[26] = 1'
    ]
  );
  p.run();
  assertEquals(p.sumMemory(), 208);
});

Deno.test('Day 14 - Part 1 - Answer', () => {
  const p = new Program2(input);
  p.run();
  assertEquals(p.sumMemory(), 3816594901962);
});
