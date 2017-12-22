const { sumBranch, buildTree, findImbalancedBranch } = require('./day7');
const { EXAMPLE_INPUT, CHALLENGE_INPUT } = require('./day7.input');

test('build tree for example input', () => {
  const tree = buildTree(EXAMPLE_INPUT);
  const root = Object.values(tree).find(b => b.root);
  expect(root.name).toEqual('tknk');
});

test('build tree for challenge input', () => {
  const tree = buildTree(CHALLENGE_INPUT);
  const root = Object.values(tree).find(b => b.root);
  expect(root.name).toEqual('vvsvez');
});

test('sum branch for example input', () => {
  const tree = buildTree(EXAMPLE_INPUT);
  const root = Object.values(tree).find(b => b.root);
  expect(sumBranch(root)).toEqual(778);
});

test('sum branch for challenge input', () => {
  const tree = buildTree(CHALLENGE_INPUT);
  const root = Object.values(tree).find(b => b.root);
  expect(sumBranch(root)).toEqual(402167);
});

test('find imbalanced branch for example input', () => {
  const tree = buildTree(EXAMPLE_INPUT);
  const branch = findImbalancedBranch(tree);
  const difference = sumBranch(branch.siblings[0]) - sumBranch(branch);
  expect(branch.weight + difference).toEqual(60);
});

test('find imbalanced branch for challenge input', () => {
  const tree = buildTree(CHALLENGE_INPUT);
  const branch = findImbalancedBranch(tree);
  const difference = sumBranch(branch.siblings[0]) - sumBranch(branch);
  expect(branch.weight + difference).toEqual(60);
});
