const path = require('path');

const { readFile } = require('./lib/utils');
const { part1, part2 } = require('./lib/day13');

const inputDir = path.join(__dirname, 'input', 'day13');

describe('day 13', () => {
  test.skip('example 1', async () => {
    const input = await readFile(path.join(inputDir, 'example.txt'));
    expect(part1(input)).toEqual('7,3');
  });

  test.skip('part 1', async () => {
    const input = await readFile(path.join(inputDir, 'challenge.txt'));
    expect(part1(input)).toEqual('91,69');
  });

  test('part 2', async () => {
    const input = await readFile(path.join(inputDir, 'challenge.txt'));
    expect(part2(input)).toEqual('44,87');
  });
});
