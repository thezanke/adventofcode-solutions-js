const { flatten } = require('lodash');

const INPUT = require('./input/day5');

const hasReaction = (a, b) => b && a !== b && a.toLowerCase() === b.toLowerCase();

const performReactions = (inputPolymer) => {
  let unstable = inputPolymer.split(''),
    stack = [];

  while (unstable.length) {
    const next = unstable.shift();
    const reacted = hasReaction(next, stack[stack.length - 1]);

    if (reacted) {
      stack.pop();
    } else {
      stack.push(next);
    }
  }

  return stack.join('');
}

const part1 = input => {
  return performReactions(input).length;
};

const mutate = (inputPolymer, unit) => inputPolymer;

const createMutations = inputPolymer => {
  let mutations = [inputPolymer];
  let units = Array.from(new Set(inputPolymer.toLowerCase()));
  return units.map(unit => mutate(inputPolymer, unit));
}

const part2 = input => {
  const mutations = createMutations(input);
  return false;
};

describe.only('day 5', () => {
  test('example', () => {
    expect(performReactions('dabAcCaCBAcCcaDA')).toEqual('dabCBAcaDA');
  });


  test('part 1', () => {
    expect(part1(INPUT)).toEqual(1);
  });

  test('example 2', () => {
    expect(performReactions('dabAcCaCBAcCcaDA')).toEqual('dabCBAcaDA');
  });

  test.skip('part 2', () => {
    expect(part2(INPUT)).toEqual(1);
  });
})