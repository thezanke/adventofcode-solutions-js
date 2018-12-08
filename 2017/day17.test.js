const { Spinlock, findSolution } = require('./lib/day17');

test('step through example', () => {
  const spinlock = new Spinlock(3);

  spinlock.next();
  expect(spinlock.buffer).toEqual([0, 1]);
  expect(spinlock.pos).toEqual(1);

  spinlock.next();
  expect(spinlock.buffer).toEqual([0, 2, 1]);
  expect(spinlock.pos).toEqual(1);

  spinlock.next();
  expect(spinlock.buffer).toEqual([0, 2, 3, 1]);
  expect(spinlock.pos).toEqual(2);

  spinlock.next();
  expect(spinlock.buffer).toEqual([0, 2, 4, 3, 1]);
  expect(spinlock.pos).toEqual(2);

  spinlock.next();
  expect(spinlock.buffer).toEqual([0, 5, 2, 4, 3, 1]);
  expect(spinlock.pos).toEqual(1);

  spinlock.next();
  expect(spinlock.buffer).toEqual([0, 5, 2, 4, 3, 6, 1]);
  expect(spinlock.pos).toEqual(5);

  spinlock.next();
  expect(spinlock.buffer).toEqual([0, 5, 7, 2, 4, 3, 6, 1]);
  expect(spinlock.pos).toEqual(2);

  spinlock.next();
  expect(spinlock.buffer).toEqual([0, 5, 7, 2, 4, 3, 8, 6, 1]);
  expect(spinlock.pos).toEqual(6);

  spinlock.next();
  expect(spinlock.buffer).toEqual([0, 9, 5, 7, 2, 4, 3, 8, 6, 1]);
  expect(spinlock.pos).toEqual(1);
});

test('find value after 2017 for example', () => {
  const spinlock = new Spinlock(3);

  for (let i = 0; i < 2017; i += 1) {
    spinlock.next();
  }

  expect(spinlock.buffer[spinlock.pos + 1]).toEqual(638);
});

test('find value for challenge part 1', () => {
  const spinlock = new Spinlock(344);

  for (let i = 0; i < 2017; i += 1) {
    spinlock.next();
  }

  expect(spinlock.buffer[spinlock.pos + 1]).toEqual(996);
});

test('find solution for challenge part 2', () => {
  expect(findSolution(344, 50000000)).toEqual(1898341);
});