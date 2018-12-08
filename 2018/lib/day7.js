const { partition, sortBy, map } = require('lodash');

const INPUT_PATTERN = /^Step ([A-Z]) must be finished before step ([A-Z]) can begin.$/;

const formatInput = input => input.split('\n').map(l => INPUT_PATTERN.exec(l).slice(1));

const createNode = id => {
  const node = { id, deps: new Set() };
  return node;
};

const loadInstruction = (state, [id1, id2]) => {
  if (!state[id1]) state[id1] = createNode(id1);
  if (!state[id2]) state[id2] = createNode(id2);

  const dep = state[id1];
  const target = state[id2];

  target.deps.add(dep);

  return state;
};

const getInitialState = instructions => {
  const [unavailable, available] = partition(Object.values(instructions), i => i.deps.size);
  return {
    complete: [],
    available: map(available, 'id'),
    unavailable: map(unavailable, 'id')
  };
};

const organizeInstructions = instructions => {
  const state = getInitialState(instructions);

  while (state.available.length) {
    const next = instructions[state.available.sort()[0]];

    state.unavailable
      .filter(id => instructions[id].deps.has(next))
      .forEach(id => {
        const child = instructions[id];
        child.deps.delete(next);
        if (!child.deps.size) {
          state.unavailable = state.unavailable.filter(id => id !== child.id);
          state.available.push(child.id);
        }
      });

    state.available = state.available.filter(id => id !== next.id);
    state.complete.push(next.id);
  }

  return state;
};

const part1 = input => {
  const instructions = formatInput(input).reduce(loadInstruction, {});
  const state = organizeInstructions(instructions);

  return state.complete.join('');
};

const part2 = a => a;

module.exports = { part1, part2 };