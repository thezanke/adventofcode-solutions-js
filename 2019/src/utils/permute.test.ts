import { permute } from './permute';

test('permute()', () => {
  expect(permute([0, 1, 2])).toEqual([
    [0, 1, 2],
    [0, 2, 1],
    [1, 0, 2],
    [1, 2, 0],
    [2, 0, 1],
    [2, 1, 0],
  ]);
});
