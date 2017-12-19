// @flow
type Branch = {
  name: string,
  weight: number,
  children: ?(Branch[]),
  childNames: ?(string[])
};

const PROGRAM_TEST = /^([a-z]+) \((\d+)\)(?: -> ((?:[a-z]+(?:, )?)+))?/;

const processRow = (row: string): Branch => {
  const [_, name, weightStr, childrenStr] = PROGRAM_TEST.exec(row);
  const weight = parseInt(weightStr, 10);
  const childNames = childrenStr && childrenStr.split(', ');
  return { name, weight, children: null, childNames };
};

const sumBranch = (branch: Branch) => {
  let total = branch.weight;
  if (branch.children) {
    total += branch.children.map(sumBranch).reduce((a, b) => a + b, 0);
  }
  return total;
};

const buildTree = (input: string[]): ?Branch => {
  const branches: Branch[] = input.map(processRow);
  const allChildNames: string[] = [].concat(...branches.map(r => r.childNames).filter(Boolean));
  const hash: { [string]: Branch } = branches.reduce((obj, row) => {
    obj[row.name] = row;
    return obj;
  }, {});

  branches.forEach(({ name, childNames }) => {
    if (childNames) hash[name].children = childNames.map((childName: string) => hash[childName]);
  });

  return branches.find(branch => !allChildNames.includes(branch.name));
};

module.exports = { buildTree, sumBranch };
