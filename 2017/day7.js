// @flow
type Branch = {
  name: string,
  weight: number,
  children: Branch[],
  childNames: string[],
  parent: ?Branch,
  siblings: ?(Branch[]),
  root: boolean,
  totalWeight: number
};

type BranchHash = { [string]: Branch };

const PROGRAM_TEST = /^([a-z]+) \((\d+)\)(?: -> ((?:[a-z]+(?:, )?)+))?/;

const processRow = (row: string): Branch => {
  const [_, name, weightStr, childrenStr] = PROGRAM_TEST.exec(row);
  const weight = parseInt(weightStr, 10);
  const childNames = childrenStr && childrenStr.split(', ');

  return { name, weight, children: [], parent: null, root: false, totalWeight: 0, childNames };
};

const buildTree = (input: string[]): BranchHash => {
  const branches: Branch[] = input.map(processRow);
  const hash: { [string]: Branch } = branches.reduce((obj, row) => {
    obj[row.name] = row;
    return obj;
  }, {});

  branches.forEach(branch => {
    const { name, childNames } = branch;

    if (childNames) {
      branch.children = childNames.map((childName: string) => {
        const child = hash[childName];
        child.parent = branch;
        child.siblings = childNames.filter(name => name !== childName).map(name => hash[name]);

        return child;
      });
    }

    branch.totalWeight = sumBranch(branch);
  });

  const rootBranch = Object.keys(hash)
    .map(key => hash[key])
    .find(branch => !branch.parent);

  if (rootBranch) rootBranch.root = true;

  return hash;
};

const sumBranch = (branch: Branch): number => {
  let total = branch.weight;
  total += branch.children.map(sumBranch).reduce((a, b) => a + b, 0);
  return total;
};

type FindImbalancedBranchCallback = (branch: Branch, difference: number) => void;

const allSameValue = (arr: number[]): boolean => new Set(arr).size === 1;

const isProblemBranch = (branch: Branch): boolean => {
  const hasChildren = !!branch.children && branch.children.length > 0;
  const branchWeight = sumBranch(branch);

  if (!branch.siblings) return false;

  const siblingWeights = branch.siblings.map(sumBranch);
  const outlier = allSameValue(siblingWeights) && branchWeight !== siblingWeights[0];

  if (!outlier) return false;
  if (hasChildren) return allSameValue(branch.children.map(sumBranch));
  return true;
};

const findImbalancedBranch = (hash: BranchHash): ?Branch =>
  Object.keys(hash)
    .map(key => hash[key])
    .find(isProblemBranch);

module.exports = { buildTree, sumBranch, findImbalancedBranch };
