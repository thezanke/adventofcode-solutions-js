const { flatten } = require('lodash');

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

const mutate = (inputPolymer, unit) => inputPolymer.split('').filter(u => u.toLowerCase() !== unit).join('');

const createMutations = inputPolymer => {
  let mutations = [inputPolymer];
  let units = Array.from(new Set(inputPolymer.toLowerCase()));
  return units.map(unit => mutate(inputPolymer, unit));
}

const part2 = input => {
  const mutations = createMutations(input).map(m => performReactions(m));
  return Math.min(...mutations.map(p => p.length));
};

module.exports = { performReactions, part1, part2 };