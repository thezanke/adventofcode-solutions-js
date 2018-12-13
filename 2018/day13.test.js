// const EXAMPLE_INPUT = require('./input/day13/example.txt');
const path = require('path');

const { readFile } = require('./lib/utils');
const { part1, part2 } = require('./lib/day13');

const inputDir = path.join(__dirname, 'input', 'day13');

describe('day 13', () => {
  test('example 1', async () => {
    const input = await readFile(path.join(inputDir, 'example.txt'));
    expect(part1(input)).toEqual(240);
  });

  test.skip('part 1', () => {});

  test.skip('part 2', () => {});
});
