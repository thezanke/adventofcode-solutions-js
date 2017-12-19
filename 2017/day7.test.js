const { sumBranch, buildTree } = require('./day7');
const { EXAMPLE_INPUT, CHALLENGE_INPUT } = require('./day7.input');

test('build tree for example input', () => {
  const root = buildTree(EXAMPLE_INPUT);
  expect(root.name).toEqual('tknk');
});

test('build tree for challenge input', () => {
  const root = buildTree(CHALLENGE_INPUT);
  expect(root.name).toEqual('vvsvez');
});

test('sum branch for example input', () => {
  const root = buildTree(EXAMPLE_INPUT);
  expect(sumBranch(root)).toEqual(778);
});