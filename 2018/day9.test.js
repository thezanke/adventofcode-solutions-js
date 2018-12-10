const { createMarbleCircle, playGame } = require('./lib/day9');

describe('day 9', () => {
  describe.skip('marbleCircle', () => {
    test('findForward', () => {
      const marbleCircle = createMarbleCircle([0, 1, 2, 3, 4, 5, 6]);
      expect(marbleCircle.findForward(4, 3)).toEqual(0);
      expect(marbleCircle.findForward(4, 10)).toEqual(0);
    });
    test('findReverse', () => {
      const marbleCircle = createMarbleCircle([0, 1, 2, 3, 4, 5, 6]);
      expect(marbleCircle.findReverse(4, 3)).toEqual(1);
      expect(marbleCircle.findReverse(4, 10)).toEqual(1);
    });
  });

  test('example 1', () => {
    expect(playGame({ playerCount: 9, max: 25 })).toEqual(32)
  });

  test('example 2', () => {
    expect(playGame({ playerCount: 10, max: 1618 })).toEqual(8317)
  });

  test('example 3', () => {
    expect(playGame({ playerCount: 13, max: 7999 })).toEqual(146373)
  });

  test('example 4', () => {
    expect(playGame({ playerCount: 17, max: 1104 })).toEqual(2764)
  });

  test('example 5', () => {
    expect(playGame({ playerCount: 21, max: 6111 })).toEqual(54718)
  });

  test('example 6', () => {
    expect(playGame({ playerCount: 30, max: 5807 })).toEqual(37305)
  });

  test.skip('part 1', () => {
    expect(playGame({ playerCount: 459, max: 72103 })).toEqual(388131)
  });

  test.skip('part 2', () => {
    expect(playGame({ playerCount: 459, max: 7210300 })).toEqual(3239376988)
  });
});
